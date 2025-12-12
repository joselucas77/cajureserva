import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4 border rounded-lg p-6">
        <h1 className="text-2xl font-semibold">CajuReserva</h1>
        <p className="text-sm text-muted-foreground">
          Sistema de locação de espaços (salas, cowork, auditório e labs).
        </p>
        <div className="flex gap-2">
          <Link className="underline" href="/login">
            Entrar
          </Link>
          <span>•</span>
          <Link className="underline" href="/register">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
