import { ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-orange-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
          <TrendingUp className="h-4 w-4" />
          Comece agora mesmo
        </div>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
          Pronto para organizar suas reservas com eficiência?
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-600 text-pretty">
          Junte-se aos hubs de inovação que já transformaram sua gestão de
          espaços com o CajuReserva. Sistema completo, seguro e fácil de usar.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            asChild
            className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6 shadow-xl shadow-orange-600/25 transition-all duration-300"
          >
            <Link href="/login">
              Entrar no CajuReserva
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          14 dias de teste grátis • Sem cartão de crédito • Suporte em português
        </p>
      </div>
    </section>
  );
}
