"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Building2, Calendar, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Loading from "@/app/loading";
import { SpaceTypeLabel } from "@/lib/time";

const COLORS = ["#fb923c", "#fdba74", "#fed7aa", "#f59e0b"];

type DashboardStats = {
  totalSpaces: number;
  totalReservations: number;
  occupationByType: { type: string; value: number; percentage: number }[];
};

const EMPTY_STATS: DashboardStats = {
  totalSpaces: 0,
  totalReservations: 0,
  occupationByType: [],
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao carregar dashboard");

        const data = await res.json();

        const normalized: DashboardStats = {
          totalSpaces: Number(data?.totalSpaces ?? 0),
          totalReservations: Number(data?.totalReservations ?? 0),
          occupationByType: Array.isArray(data?.occupationByType)
            ? data.occupationByType
            : [],
        };

        if (!cancelled) setStats(normalized);
      } catch {
        // Em caso de falha, evita quebrar o dashboard
        if (!cancelled) setStats(EMPTY_STATS);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return <Loading />;

  const chartData = (stats.occupationByType ?? []).map((x) => ({
    name: SpaceTypeLabel[x.type] ?? x.type,
    value: Number(x.value ?? 0),
    percentage: Number(x.percentage ?? 0),
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 text-balance">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Visão geral do seu hub e das reservas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de espaços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalSpaces}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Cadastrados no sistema
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/spaces">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Gerenciar Espaços
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600">
              Reservas do dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalReservations}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Pendentes/Confirmadas
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/reservations">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Ver Reservas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Ocupação por Tipo de Espaço
          </CardTitle>
          <CardDescription>
            Distribuição dos espaços cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }: any) =>
                    `${name}: ${percentage}%`
                  }
                  outerRadius={90}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
