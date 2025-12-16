"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { loginSchema, registerClientSchema } from "@/validators/auth";

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerClientSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const schema = useMemo(
    () => (isLogin ? loginSchema : registerClientSchema),
    [isLogin]
  );

  const form = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: any) {
    if (isLogin) {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        form.setError("root", { message: data?.error ?? "Falha ao entrar" });
        return;
      }

      let role: string | undefined;

      try {
        role = data?.user?.role ?? data?.role;
      } catch {
        form.setError("root", { message: data?.error ?? "Falha ao entrar" });
        return;
      }

      if (!role) {
        const meRes = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (meRes.ok) {
          const me = await meRes.json();
          role = me?.user?.role ?? me?.role;
        }
      }

      const normalizedRole = String(role ?? "").toUpperCase();

      if (normalizedRole === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/app");
      }
      router.refresh();
      return;
    }

    const res = await fetch("/api/auth/register-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      form.setError("root", { message: data?.error ?? "Falha ao cadastrar" });
      return;
    }

    toast("Conta criada com sucesso!", {
      description: "Você já pode fazer login com suas credenciais.",
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar toast"),
      },
    });
    setIsLogin(true);
    form.reset({ email: values.email, password: values.password } as any);
  }

  const rootError = (form.formState.errors as any)?.root?.message;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 flex flex-col">
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
          <div></div>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="border-slate-200 shadow-xl">
            <CardHeader className="space-y-2 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">
                {isLogin ? "Entrar" : "Criar conta"}
              </CardTitle>
              <p className="text-sm text-slate-600">
                {isLogin
                  ? "Acesse para reservar espaços."
                  : "Crie sua conta para fazer reservas em hubs de inovação."}
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        className="pl-10 h-12"
                        {...form.register("fullName" as any)}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {(form.formState.errors as any)?.fullName?.message}
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      className="pl-10 h-12"
                      {...form.register("email" as any)}
                    />
                  </div>
                  <p className="text-xs text-red-600">
                    {(form.formState.errors as any)?.email?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 h-12"
                      {...form.register("password" as any)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-red-600">
                    {(form.formState.errors as any)?.password?.message}
                  </p>
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 h-12"
                        {...form.register("confirmPassword" as any)}
                      />
                    </div>
                    <p className="text-xs text-red-600">
                      {(form.formState.errors as any)?.confirmPassword?.message}
                    </p>
                  </div>
                )}
                {rootError && (
                  <p className="text-sm text-red-600">{rootError}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {form.formState.isSubmitting
                    ? "Aguarde..."
                    : isLogin
                    ? "Entrar"
                    : "Criar conta"}
                </Button>
                <p className="text-center text-sm text-slate-600">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin((v) => !v);
                      form.reset();
                    }}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    {isLogin ? "Criar conta" : "Fazer login"}
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
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
