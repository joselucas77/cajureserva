"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CalendarDays,
  Clock,
  DollarSign,
  Filter,
  Search,
  Users,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { centsToBRL, SpaceTypeLabel, timeSlots } from "@/lib/time";
import { reservationSchema } from "@/validators/reservation";
import { toast } from "sonner";

type Space = {
  id: string;
  name: string;
  type: keyof typeof SpaceTypeLabel;
  capacity: number;
  pricePerHourCents: number;
  location: string;
  imageUrl?: string | null;
  isActive?: boolean;
  hub?: { name: string; city: string; state: string };
};

type ReservationFormInput = z.input<typeof reservationSchema>;
type ReservationFormOutput = z.output<typeof reservationSchema>;

export default function ClientSpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>(
    new Date()
  );

  const form = useForm<ReservationFormInput, any, ReservationFormOutput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      spaceId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      durationHours: 2,
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/spaces");
      const data = await res.json();
      setSpaces(data.spaces ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return spaces.filter((s) => {
      const matchesType = filterType === "all" || s.type === filterType;
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [spaces, filterType, search]);

  async function submit(values: ReservationFormOutput) {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      form.setError("root", { message: data?.error ?? "Falha ao reservar" });
      return;
    }
    toast.success("Reserva realizada com sucesso!");
    setOpen(false);
    setSelectedSpace(null);
    form.reset({
      spaceId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      durationHours: 2,
    });
  }

  function openReserve(space: Space) {
    setSelectedSpace(space);
    form.setValue("spaceId", space.id);
    const d = selectedDateObj ?? new Date();
    form.setValue("date", format(d, "yyyy-MM-dd"));
    setOpen(true);
  }

  const calculatePrice = (pricePerHour: number, hours: number) => {
    return pricePerHour * hours;
  };

  const rootError = (form.formState.errors as any)?.root?.message;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Reservar Espaço</h1>
        <p className="mt-2 text-slate-600">
          Selecione um espaço e faça sua reserva.
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Espaços disponíveis
          </CardTitle>
          <CardDescription>
            Filtre por tipo e encontre o espaço ideal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar por nome do espaço..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-52">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipo de espaço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="MEETING_ROOM">Sala de Reunião</SelectItem>
                  <SelectItem value="COWORKING">Coworking</SelectItem>
                  <SelectItem value="AUDITORIUM">Auditório</SelectItem>
                  <SelectItem value="LAB_TECH">Lab Tech</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 min-w-52 justify-start bg-transparent"
                  >
                    <CalendarDays className="w-4 h-4" />
                    {selectedDateObj
                      ? format(selectedDateObj, "dd/MM/yyyy")
                      : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDateObj}
                    onSelect={(d) => {
                      setSelectedDateObj(d);
                      if (d) form.setValue("date", format(d, "yyyy-MM-dd"));
                    }}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-600">Carregando espaços...</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-600">Nenhum espaço encontrado.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((space) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={space.imageUrl || "/space-placeholder.jpg"}
                      alt={space.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-white">
                      Disponível
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {SpaceTypeLabel[space.type]}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {space.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {space.capacity} pessoas
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">
                          {centsToBRL(space.pricePerHourCents)}/h
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => space.isActive && openReserve(space)}
                      disabled={!space.isActive}
                      className="w-full"
                      variant={space.isActive ? "default" : "secondary"}
                    >
                      {space.isActive ? "Reservar" : "Indisponível"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Confirmar Reserva</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
              <p className="font-semibold text-slate-900">
                {selectedSpace?.name}
              </p>
              <p className="text-sm text-slate-600">
                {selectedSpace ? SpaceTypeLabel[selectedSpace.type] : ""}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Horário de início</Label>
                <Select
                  value={form.watch("startTime")}
                  onValueChange={(v) => form.setValue("startTime", v)}
                >
                  <SelectTrigger className="w-full">
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
                <p className="text-xs text-red-600">
                  {form.formState.errors.startTime?.message}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Duração (horas)</Label>
                <Select
                  value={String(form.watch("durationHours"))}
                  onValueChange={(v) =>
                    form.setValue("durationHours", Number(v))
                  }
                >
                  <SelectTrigger className="w-full">
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
                <p className="text-xs text-red-600">
                  {form.formState.errors.durationHours?.message as any}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Valor total</span>
                <span className="text-xl font-bold text-green-600">
                  {centsToBRL(
                    calculatePrice(
                      selectedSpace?.pricePerHourCents || 0,
                      form.watch("durationHours") || 0
                    )
                  )}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Data:{" "}
                {selectedDateObj
                  ? format(selectedDateObj, "EEEE, dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })
                  : form.watch("date")}
              </p>
            </div>

            {rootError && <p className="text-sm text-red-600">{rootError}</p>}

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700"
              >
                {form.formState.isSubmitting ? "Reservando..." : "Confirmar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
