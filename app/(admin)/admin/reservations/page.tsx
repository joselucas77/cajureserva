"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Trash2,
} from "lucide-react";

type Reservation = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED";
  startAt: string;
  endAt: string;
  durationMinutes: number;
  totalPriceCents: number;
  space: { name: string; type: string; location: string };
  client: { fullName: string; email: string };
};

const typeLabel: Record<string, string> = {
  MEETING_ROOM: "Sala de reunião",
  AUDITORIUM: "Auditório",
  COWORKING: "Coworking",
  LAB_TECH: "Laboratório",
};

function centsToBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdminReservations() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  async function load() {
    const qs = new URLSearchParams();
    if (searchTerm) qs.set("q", searchTerm);
    if (filterStatus && filterStatus !== "all") qs.set("status", filterStatus);
    if (filterDate) qs.set("date", format(filterDate, "yyyy-MM-dd"));

    const res = await fetch(`/api/admin/reservations?${qs.toString()}`);
    const data = await res.json();
    setItems(data.reservations ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterDate]);

  const filtered = useMemo(() => {
    // busca local adicional (opcional)
    if (!searchTerm) return items;
    const q = searchTerm.toLowerCase();
    return items.filter((r) => {
      return (
        r.space.name.toLowerCase().includes(q) ||
        r.client.fullName.toLowerCase().includes(q) ||
        r.client.email.toLowerCase().includes(q)
      );
    });
  }, [items, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSlice = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  async function confirm(id: string) {
    const res = await fetch(`/api/admin/reservations/${id}/confirm`, {
      method: "POST",
    });
    if (!res.ok) alert("Falha ao confirmar");
    await load();
  }

  async function cancel(id: string) {
    const res = await fetch(`/api/admin/reservations/${id}/cancel`, {
      method: "POST",
    });
    if (!res.ok) alert("Falha ao cancelar");
    await load();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 text-balance">
          Gestão de Reservas
        </h1>
        <p className="mt-2 text-slate-600">
          Visualize e gerencie reservas do seu hub.
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Todas as Reservas
          </CardTitle>
          <CardDescription>
            Filtros por espaço/cliente, status e data
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar por espaço ou cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-44">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmada</SelectItem>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="CANCELED">Cancelada</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-56 justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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

              <Button
                variant="outline"
                className="bg-transparent"
                onClick={load}
              >
                Atualizar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Espaço</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Data e hora</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pageSlice.map((r) => {
                  const start = new Date(r.startAt);
                  const end = new Date(r.endAt);

                  return (
                    <TableRow key={r.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">
                            {r.space.name}
                          </p>
                          <p className="text-xs text-slate-600">
                            {typeLabel[r.space.type] ?? r.space.type}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {r.space.location}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium text-slate-900">
                        {r.client.fullName}
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {r.client.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">
                            {format(start, "dd/MM/yyyy")}
                          </p>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(start, "HH:mm")} - {format(end, "HH:mm")}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {Math.round(r.durationMinutes / 60)}h
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">
                        {centsToBRL(r.totalPriceCents)}
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell className="text-right">
                        {r.status === "PENDING" && (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => confirm(r.id)}
                              className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 bg-transparent"
                              title="Confirmar"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancel(r.id)}
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                              title="Cancelar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filtered.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
