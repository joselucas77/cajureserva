"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Clock, Pencil, Trash2, Search } from "lucide-react";
import { centsToBRL, SpaceTypeLabel, timeSlots } from "@/lib/time";
import { toast } from "sonner";

type Reservation = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED";
  startAt: string;
  endAt: string;
  durationMinutes: number;
  totalPriceCents: number;
  space: {
    id: string;
    name: string;
    type: string;
    location: string;
    pricePerHourCents: number;
  };
};

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>();

  const [page, setPage] = useState(1);
  const perPage = 6;

  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState<Reservation | null>(null);

  const [editDate, setEditDate] = useState<Date | undefined>(undefined);
  const [editTime, setEditTime] = useState<string>("09:00");
  const [editDuration, setEditDuration] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/reservations");
    const data = await res.json();
    setReservations(data.reservations ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return reservations.filter((r) => {
      const matchesSearch =
        r.space.name.toLowerCase().includes(q) ||
        SpaceTypeLabel[r.space.type]?.toLowerCase().includes(q);

      const matchesDate =
        !filterDate ||
        format(new Date(r.startAt), "yyyy-MM-dd") ===
          format(filterDate, "yyyy-MM-dd");

      return matchesSearch && matchesDate;
    });
  }, [reservations, search, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  function openEditModal(r: Reservation) {
    setEditing(r);
    const d = new Date(r.startAt);
    setEditDate(d);
    setEditTime(format(d, "HH:mm"));
    setEditDuration(Math.round(r.durationMinutes / 60));
    setError(null);
    setOpenEdit(true);
  }

  async function saveEdit() {
    if (!editing) return;
    setError(null);

    const payload = {
      date: editDate ? format(editDate, "yyyy-MM-dd") : undefined,
      startTime: editTime,
      durationHours: editDuration,
    };

    const res = await fetch(`/api/reservations/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error ?? "Falha ao editar reserva");
      return;
    }
    toast.success("Reserva editada com sucesso!");
    setOpenEdit(false);
    setEditing(null);
    await load();
  }

  async function cancelReservation(r: Reservation) {
    const res = await fetch(`/api/reservations/${r.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data?.error ?? "Falha ao cancelar");
      return;
    }
    toast.success("Reserva cancelada com sucesso!");
    await load();
  }

  const editTotalPreview = useMemo(() => {
    if (!editing) return 0;
    const hours = editDuration;
    return editing.space.pricePerHourCents * hours;
  }, [editing, editDuration]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Minhas Reservas</h1>
        <p className="mt-2 text-slate-600">
          Visualize, edite (pendentes) ou cancele suas reservas.
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Reservas
          </CardTitle>
          <CardDescription>Filtros por nome e data</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar por nome do espaço ou tipo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 min-w-52 justify-start bg-transparent"
                >
                  <CalendarDays className="w-4 h-4" />
                  {filterDate
                    ? format(filterDate, "dd/MM/yyyy")
                    : "Filtrar por data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>

            {(search || filterDate) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearch("");
                  setFilterDate(undefined);
                }}
              >
                Limpar
              </Button>
            )}
          </div>

          {loading ? (
            <p className="text-slate-600">Carregando...</p>
          ) : reservations.length === 0 ? (
            <div className="text-center py-16">
              <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma reserva encontrada
              </h2>
              <p className="text-muted-foreground mb-6">
                Você ainda não fez nenhuma reserva de espaço.
              </p>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/app">Explorar Espaços</Link>
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-slate-600">
              Nenhuma reserva bate com os filtros.
            </p>
          ) : (
            <>
              <div className="grid gap-4">
                {slice.map((r) => {
                  const start = new Date(r.startAt);
                  const end = new Date(r.endAt);
                  const isPending = r.status === "PENDING";

                  return (
                    <div
                      key={r.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {r.space.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {SpaceTypeLabel[r.space.type]} • {r.space.location}
                          </p>
                          <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4" />
                            {format(start, "dd/MM/yyyy")} •{" "}
                            {format(start, "HH:mm")} - {format(end, "HH:mm")}•{" "}
                            {Math.round(r.durationMinutes / 60)}h
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            {centsToBRL(r.totalPriceCents)}
                          </p>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              r.status === "CONFIRMED"
                                ? "bg-green-100 text-green-700"
                                : r.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {r.status === "CONFIRMED"
                              ? "Confirmada"
                              : r.status === "PENDING"
                              ? "Pendente"
                              : "Cancelada"}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          disabled={!isPending}
                          onClick={() => openEditModal(r)}
                          title={
                            isPending
                              ? "Editar"
                              : "Apenas reservas pendentes podem ser editadas"
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                          onClick={() => cancelReservation(r)}
                          disabled={r.status === "CANCELED"}
                          title="Cancelar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Página {page} de {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Editar Reserva</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                <p className="font-semibold text-slate-900">
                  {editing.space.name}
                </p>
                <p className="text-sm text-slate-600">
                  {SpaceTypeLabel[editing.space.type]}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">Data</p>
                  <Calendar
                    mode="single"
                    selected={editDate}
                    onSelect={setEditDate}
                    locale={ptBR}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">
                      Horário
                    </p>
                    <Select value={editTime} onValueChange={setEditTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">
                      Duração
                    </p>
                    <Select
                      value={String(editDuration)}
                      onValueChange={(v) => setEditDuration(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 6, 8].map((h) => (
                          <SelectItem key={h} value={String(h)}>
                            {h}h
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Novo valor total
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {centsToBRL(editTotalPreview)}
                      </span>
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => setOpenEdit(false)}
                    >
                      Fechar
                    </Button>
                    <Button
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={saveEdit}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
