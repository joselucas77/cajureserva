import { BarChart3, Calendar, MapPin, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Features() {
  return (
    <section
      id="funcionalidades"
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Funcionalidades completas para gestão eficiente
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-pretty">
            Tudo que você precisa para gerenciar espaços de inovação em um só
            lugar
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Cadastro de espaços
              </h3>
              <p className="leading-relaxed text-slate-600">
                Registre todos os seus espaços com detalhes completos,
                capacidade e recursos disponíveis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Verificação anti-conflito
              </h3>
              <p className="leading-relaxed text-slate-600">
                Sistema inteligente que previne reservas duplicadas
                automaticamente em tempo real.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Agenda visual intuitiva
              </h3>
              <p className="leading-relaxed text-slate-600">
                Visualize todas as reservas em calendário interativo com filtros
                avançados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Gestão de perfis
              </h3>
              <p className="leading-relaxed text-slate-600">
                Controle total sobre usuários, permissões e acesso diferenciado
                por tipo de perfil.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Relatórios detalhados
              </h3>
              <p className="leading-relaxed text-slate-600">
                Analytics completo com exportação de dados e insights sobre uso
                dos espaços.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Painel administrativo
              </h3>
              <p className="leading-relaxed text-slate-600">
                Dashboard completo para gestores com visão geral de todas as
                operações do hub.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
