import { z } from "zod";

export const reservationCreateSchema = z.object({
  spaceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
  durationHours: z.number().min(1).max(24),
});

export const reservationUpdateSchema = reservationCreateSchema
  .omit({ spaceId: true })
  .partial()
  .refine((d) => Object.keys(d).length > 0, "Nada para atualizar");

export const reservationSchema = z.object({
  spaceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  durationHours: z.number().min(1).max(24),
});
