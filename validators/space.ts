import { z } from "zod";

export const spaceTypeSchema = z.enum([
  "MEETING_ROOM",
  "COWORKING",
  "AUDITORIUM",
  "LAB_TECH",
]);

const capacitySchema = z.coerce
  .number()
  .refine((v) => Number.isFinite(v), "Capacidade inválida")
  .refine((v) => Number.isInteger(v), "Capacidade deve ser um número inteiro")
  .refine((v) => v >= 1, "Capacidade inválida");

const priceSchema = z.coerce
  .number()
  .refine((v) => Number.isFinite(v), "Preço inválido")
  .refine((v) => v >= 0, "Preço inválido");

export const spaceCreateSchema = z.object({
  name: z.string().trim().min(2, "Nome do espaço obrigatório"),

  type: spaceTypeSchema,

  capacity: capacitySchema,

  pricePerHour: priceSchema,

  location: z.string().trim().min(2, "Localização obrigatória"),

  imageUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined))
    .refine((v) => (v ? /^https?:\/\//.test(v) : true), "URL inválida"),

  isActive: z.coerce.boolean().default(true),
});

export const spaceUpdateSchema = z
  .object({
    name: spaceCreateSchema.shape.name.optional(),
    type: spaceCreateSchema.shape.type.optional(),
    capacity: spaceCreateSchema.shape.capacity.optional(),
    pricePerHour: spaceCreateSchema.shape.pricePerHour.optional(),
    location: spaceCreateSchema.shape.location.optional(),
    imageUrl: spaceCreateSchema.shape.imageUrl.optional(),
    isActive: z.coerce.boolean().optional(),
  })
  .strict()
  .refine((obj) => Object.keys(obj).length > 0, "Envie ao menos um campo");
