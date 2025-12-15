import { z } from "zod";

export const spaceCreateSchema = z.object({
  name: z.string().min(2, "Nome do espaço obrigatório"),
  type: z.enum(["MEETING_ROOM", "COWORKING", "AUDITORIUM", "LAB_TECH"]),
  capacity: z.coerce.number().int().min(1, "Capacidade inválida"),
  pricePerHour: z.coerce.number().min(0, "Preço inválido"), // em reais
  location: z.string().min(2, "Localização obrigatória"),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export const spaceUpdateSchema = spaceCreateSchema.partial();
