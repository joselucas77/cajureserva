import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const registerClientSchema = z
  .object({
    fullName: z.string().min(3, "Informe seu nome completo"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const registerAdminSchema = z
  .object({
    fullName: z.string().min(3, "Informe seu nome completo"),
    hubName: z.string().min(2, "Informe o nome do espaço/hub"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(8, "Informe um telefone válido"),
    city: z.string().min(2, "Informe a cidade"),
    state: z.string().length(2, "UF inválida"),
    plan: z.enum(["STARTER", "HUB", "ENTERPRISE"]),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });
