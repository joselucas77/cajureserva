"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const revenueByMonth = [
  { month: "Jan", revenue: 12500 },
  { month: "Fev", revenue: 15800 },
  { month: "Mar", revenue: 18200 },
  { month: "Abr", revenue: 16900 },
  { month: "Mai", revenue: 21300 },
  { month: "Jun", revenue: 24500 },
];

const reservationsByType = [
  { type: "Sala de reunião", count: 45, revenue: 13500 },
  { type: "Auditório", count: 12, revenue: 28800 },
  { type: "Coworking", count: 78, revenue: 11700 },
  { type: "Laboratório", count: 25, revenue: 10000 },
];

const COLORS = ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"];

const topClients = [
  { name: "João Silva", reservations: 12, spent: 3600 },
  { name: "Maria Santos", reservations: 10, spent: 8000 },
  { name: "Pedro Costa", reservations: 8, spent: 3200 },
  { name: "Ana Oliveira", reservations: 7, spent: 2800 },
  { name: "Carlos Mendes", reservations: 6, spent: 1920 },
];

const occupancyRate = [
  { day: "Seg", rate: 75 },
  { day: "Ter", rate: 82 },
  { day: "Qua", rate: 88 },
  { day: "Qui", rate: 91 },
  { day: "Sex", rate: 85 },
  { day: "Sáb", rate: 45 },
  { day: "Dom", rate: 30 },
];

export default function AdminReports() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 text-balance">
            Relatórios e Análises
          </h1>
          <p className="mt-2 text-slate-600">
            Acompanhe o desempenho do seu hub de inovação.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              Receita por Mês
            </CardTitle>
            <CardDescription>
              Evolução da receita nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              Reservas por Tipo de Espaço
            </CardTitle>
            <CardDescription>
              Distribuição das reservas por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reservationsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) =>
                    `${type}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {reservationsByType.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">
            Taxa de Ocupação Semanal
          </CardTitle>
          <CardDescription>
            Percentual de ocupação por dia da semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="rate" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              Top 5 Clientes
            </CardTitle>
            <CardDescription>
              Clientes com mais reservas no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {client.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {client.reservations} reservas
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-900">
                    R$ {client.spent.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              Receita por Tipo de Espaço
            </CardTitle>
            <CardDescription>
              Desempenho financeiro por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservationsByType.map((type, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <p className="font-medium text-slate-900">{type.type}</p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      R$ {type.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <p>{type.count} reservas</p>
                    <p>Média: R$ {(type.revenue / type.count).toFixed(0)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
