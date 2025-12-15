import Link from "next/link";
import { Button } from "../ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance">
              Gerencie e reserve espaços de inovação com{" "}
              <span className="text-primary">rapidez e controle</span>
            </h1>

            <p className="text-lg leading-relaxed text-slate-600 text-pretty">
              Agenda inteligente que previne conflitos automaticamente.
              Simplifique a gestão do seu hub de inovação com verificação em
              tempo real e controle total sobre todas as reservas.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="bg-orange-600 hover:bg-orange-700 text-base transition-all duration-300 shadow-lg shadow-orange-600/25"
              >
                <Link href="/login">
                  Entrar para reservar
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base border-slate-300 hover:bg-slate-50 bg-transparent"
              >
                <Link href="#funcionalidades">Ver funcionalidades</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={
                  "https://lh3.googleusercontent.com/pw/AP1GczNpJ2GLDNBw8oduT9iTZVx7F2olULGa_ReUflXWJG5OKEYiOm5NTIASNeUwp_W8i-CcIaEPtQW48HqH2NXyBIw-L_S1M0vLEKuQdCtERP75e3yJcw4cPQnd-Ix8JQMF1jvaTDK2CJzrW_INuXqPOhOw9A=w640-h427-s-no-gm?authuser=0"
                }
                width={640}
                height={427}
                alt="Espaço de coworking moderno"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-xl border border-slate-100 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Reserva confirmada
                  </div>
                  <div className="text-xs text-slate-600">
                    Sem conflitos detectados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
