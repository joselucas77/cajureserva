import { CheckCircle2, Target } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="planos"
      className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Planos para cada tamanho de hub
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-pretty">
            Escolha o plano ideal para o seu espaço de inovação
          </p>
        </div>

        <div className="mb-16 rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-slate-900">
            Todos os planos incluem:
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Verificação anti-conflito automática
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Agenda visual intuitiva
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Painel administrativo completo
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Gestão de perfis e permissões
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Relatórios e exportação de dados
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm leading-relaxed text-slate-700">
                Suporte técnico especializado
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Para hubs iniciantes
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    R$ 299
                  </span>
                  <span className="text-slate-600">/mês</span>
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Até 3 espaços cadastrados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>50 reservas por mês</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Até 20 usuários ativos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Relatórios básicos</span>
                </li>
              </ul>
              <Button
                className="w-full bg-slate-900 hover:bg-slate-800"
                asChild
              >
                <Link href="/register">Entrar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative border-orange-300 hover:shadow-2xl transition-all duration-300 ring-2 ring-orange-600">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
                <Target className="h-3 w-3" />
                Mais popular
              </span>
            </div>
            <CardContent className="p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">Hub</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Para hubs em crescimento
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-orange-600">
                    R$ 599
                  </span>
                  <span className="text-slate-600">/mês</span>
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Até 10 espaços cadastrados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Reservas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Até 100 usuários ativos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Integrações API</span>
                </li>
              </ul>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                asChild
              >
                <Link href="/register">Entrar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Para grandes operações
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    Custom
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Sob consulta</p>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Espaços ilimitados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Reservas ilimitadas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Usuários ilimitados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Dashboards personalizados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Suporte prioritário 24/7</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>Treinamento personalizado</span>
                </li>
              </ul>
              <Button
                className="w-full bg-slate-900 hover:bg-slate-800"
                asChild
              >
                <Link href="/register">Entrar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
