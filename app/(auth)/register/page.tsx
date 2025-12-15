"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { useState } from "react";
import { registerAdminSchema } from "@/validators/auth";

type Form = z.infer<typeof registerAdminSchema>;

export default function RegisterPageAdmin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<Form>({
    resolver: zodResolver(registerAdminSchema),
    defaultValues: {
      fullName: "",
      hubName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      plan: "HUB",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: Form) {
    const res = await fetch("/api/auth/register-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      form.setError("root", {
        message: data?.error ?? "Falha ao cadastrar admin",
      });
      return;
    }

    toast("Conta criada com sucesso!", {
      description: "Você já pode fazer login com suas credenciais.",
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar toast"),
      },
    });
    router.push("/login");
  }

  const rootError = (form.formState.errors as any)?.root?.message;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 text-slate-600 group-hover:text-orange-600 transition-colors" />
            <span className="text-sm font-medium text-slate-600 group-hover:text-orange-600 transition-colors">
              Voltar
            </span>
          </Link>
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Caju</span>
            <span className="text-2xl font-bold text-foreground">Reserva</span>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 bg-transparent"
            >
              Entrar
            </Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
                Crie sua conta CajuReserva
              </h1>
              <p className="mt-3 text-lg text-slate-600 text-pretty">
                Comece a gerenciar as reservas do seu hub de inovação hoje
                mesmo.
              </p>
            </div>

            <Card className="border-slate-200 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label>Nome completo *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 h-11"
                        {...form.register("fullName")}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.fullName?.message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Nome do espaço/hub *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 h-11"
                        {...form.register("hubName")}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.hubName?.message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 h-11"
                        type="email"
                        {...form.register("email")}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.email?.message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 h-11"
                        {...form.register("phone")}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.phone?.message}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Cidade *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          className="pl-10 h-11"
                          {...form.register("city")}
                        />
                      </div>
                      <p className="text-xs text-red-600">
                        {form.formState.errors.city?.message}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Estado (UF) *</Label>
                      <Input
                        className="h-11"
                        placeholder="SE"
                        {...form.register("state")}
                      />
                      <p className="text-xs text-red-600">
                        {form.formState.errors.state?.message}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Plano *</Label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { key: "STARTER", label: "Starter" },
                        { key: "HUB", label: "Hub" },
                        { key: "ENTERPRISE", label: "Enterprise" },
                      ].map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => form.setValue("plan", p.key as any)}
                          className={`rounded-lg border-2 p-3 text-left transition-all ${
                            form.watch("plan") === p.key
                              ? "border-orange-600 bg-orange-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-semibold text-sm text-slate-900">
                            {p.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 pr-12 h-11"
                        type={showPassword ? "text" : "password"}
                        {...form.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.password?.message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Confirmar senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 pr-12 h-11"
                        type={showConfirmPassword ? "text" : "password"}
                        {...form.register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-red-600">
                      {form.formState.errors.confirmPassword?.message}
                    </p>
                  </div>

                  {rootError && (
                    <p className="text-sm text-red-600">{rootError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 h-11 text-base font-semibold"
                  >
                    {form.formState.isSubmitting
                      ? "Criando..."
                      : "Criar conta e começar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block lg:fixed lg:right-0 lg:w-1/3 lg:mr-40">
            <div className="hidden lg:block">
              <div className="sticky top-8 space-y-6">
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      O que você ganha ao se cadastrar
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Teste grátis de 14 dias
                          </div>
                          <div className="text-sm text-slate-600 mt-0.5">
                            Experimente todos os recursos sem compromisso
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Configuração guiada
                          </div>
                          <div className="text-sm text-slate-600 mt-0.5">
                            Tutorial passo a passo para começar rapidamente
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Suporte dedicado
                          </div>
                          <div className="text-sm text-slate-600 mt-0.5">
                            Equipe pronta para ajudar na implementação
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">
                            Sem cartão de crédito
                          </div>
                          <div className="text-sm text-slate-600 mt-0.5">
                            Não precisa cadastrar forma de pagamento agora
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-orange-900 mb-2">
                      Confiado por
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      500+ hubs
                    </div>
                    <div className="text-sm text-slate-600">
                      em todo o Brasil
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-600">
            © 2025 CajuReserva. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
function toast(
  arg0: string,
  arg1: { description: string; action: { label: string; onClick: () => void } }
) {
  throw new Error("Function not implemented.");
}
