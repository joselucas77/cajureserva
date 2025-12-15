"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MapPin,
  Users,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Coffee,
  Laptop,
} from "lucide-react";
import { spaceCreateSchema } from "@/validators/space";
import { toast } from "sonner";
import { centsToBRL, SpaceTypeLabel } from "@/lib/time";

type SpaceFormInput = z.input<typeof spaceCreateSchema>;
type SpaceFormOutput = z.output<typeof spaceCreateSchema>;

type Space = {
  id: string;
  name: string;
  type: SpaceFormOutput["type"];
  capacity: number;
  pricePerHourCents: number;
  location: string;
  imageUrl?: string | null;
  isActive: boolean;
};

const getIconForType = (type: string) => {
  switch (type) {
    case "Sala de reunião":
      return <Presentation className="h-5 w-5 text-orange-600" />;
    case "Auditório":
      return <Users className="h-5 w-5 text-orange-600" />;
    case "Coworking":
      return <Coffee className="h-5 w-5 text-orange-600" />;
    case "Laboratório":
      return <Laptop className="h-5 w-5 text-orange-600" />;
    default:
      return <Building2 className="h-5 w-5 text-orange-600" />;
  }
};

export default function AdminSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Space | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const form = useForm<Form>({
  const form = useForm<SpaceFormInput, any, SpaceFormOutput>({
    resolver: zodResolver(spaceCreateSchema),
    defaultValues: {
      name: "",
      type: "MEETING_ROOM",
      capacity: 1,
      pricePerHour: 0,
      location: "",
      imageUrl: "",
      isActive: true,
    },
  });

  async function load() {
    const res = await fetch("/api/admin/spaces");
    const data = await res.json();
    setSpaces(data.spaces ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((s) => {
      const matchesSearch = s.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || s.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [spaces, searchTerm, filterType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSpaces.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredSpaces.slice(startIndex, endIndex);

  function openCreate() {
    setEditing(null);
    form.reset({
      name: "",
      type: "MEETING_ROOM",
      capacity: 1,
      pricePerHour: 0,
      location: "",
      imageUrl: "",
      isActive: true,
    });
    setIsDialogOpen(true);
  }

  function openEdit(space: Space) {
    setEditing(space);
    form.reset({
      name: space.name,
      type: space.type,
      capacity: space.capacity,
      pricePerHour: Number((space.pricePerHourCents / 100).toFixed(2)),
      location: space.location,
      imageUrl: space.imageUrl ?? "",
      isActive: space.isActive,
    });
    setIsDialogOpen(true);
  }

  async function submit(values: SpaceFormOutput) {
    const payload = { ...values };
    console.log("Payload:", payload);

    if (editing) {
      const res = await fetch(`/api/admin/spaces/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) alert("Falha ao atualizar espaço");
      toast("Espaço atualizado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    } else {
      const res = await fetch("/api/admin/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) alert("Falha ao criar espaço");
      toast("Espaço criado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }

    setIsDialogOpen(false);
    setEditing(null);
    await load();
  }

  async function remove(spaceId: string) {
    const res = await fetch(`/api/admin/spaces/${spaceId}`, {
      method: "DELETE",
    });
    if (!res.ok) alert("Falha ao deletar");
    await load();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 text-balance">
          Gestão de Espaços
        </h1>
        <p className="mt-2 text-slate-600">
          Cadastre, edite, visualize e exclua os espaços.
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Todos os Espaços
              </CardTitle>
              <CardDescription>
                Total de {spaces.length} espaços cadastrados
              </CardDescription>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={openCreate}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Espaço
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-slate-900">
                    {editing ? "Editar Espaço" : "Cadastrar Novo Espaço"}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados do espaço e salve.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="space-y-4 py-2"
                >
                  <div className="space-y-2">
                    <Label>Nome do Espaço</Label>
                    <Input
                      {...form.register("name")}
                      placeholder="Ex: Sala de Reunião A"
                    />
                    <p className="text-xs text-red-600">
                      {form.formState.errors.name?.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select
                        value={form.watch("type")}
                        onValueChange={(v) => form.setValue("type", v as any)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MEETING_ROOM">
                            Sala de reunião
                          </SelectItem>
                          <SelectItem value="AUDITORIUM">Auditório</SelectItem>
                          <SelectItem value="COWORKING">Coworking</SelectItem>
                          <SelectItem value="LAB_TECH">Laboratório</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-red-600">
                        {form.formState.errors.type?.message}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Ativo</Label>
                      <Select
                        value={form.watch("isActive") ? "true" : "false"}
                        onValueChange={(v) =>
                          form.setValue("isActive", v === "true")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-red-600">
                        {form.formState.errors.isActive?.message as any}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Capacidade</Label>
                      <Input
                        type="number"
                        {...form.register("capacity", { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço/Hora (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...form.register("pricePerHour", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Localização</Label>
                    <Input
                      {...form.register("location")}
                      placeholder="Ex: 1º Andar"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem (URL opcional)</Label>
                    <Input
                      {...form.register("imageUrl")}
                      placeholder="https://..."
                    />
                    <p className="text-xs text-red-600">
                      {form.formState.errors.imageUrl?.message as any}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar por espaço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-56">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="MEETING_ROOM">Sala de reunião</SelectItem>
                <SelectItem value="AUDITORIUM">Auditório</SelectItem>
                <SelectItem value="COWORKING">Coworking</SelectItem>
                <SelectItem value="LAB_TECH">Laboratório</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-900">
                    Espaço
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Tipo
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Capacidade
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Preço/Hora
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Localização
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((s) => (
                  <TableRow key={s.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
                          {getIconForType(s.type)}
                        </div>
                        <span className="font-medium text-slate-900">
                          {s.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {SpaceTypeLabel[s.type]}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {s.capacity}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {centsToBRL(s.pricePerHourCents)}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {s.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(s)}
                          className="hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => remove(s.id)}
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSpaces.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Mostrando {startIndex + 1} a{" "}
                {Math.min(endIndex, filteredSpaces.length)} de{" "}
                {filteredSpaces.length} espaços
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

          {filteredSpaces.length === 0 && (
            <div className="py-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-lg font-medium text-slate-900">
                Nenhum espaço encontrado
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Tente ajustar os filtros ou cadastre um novo espaço.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
