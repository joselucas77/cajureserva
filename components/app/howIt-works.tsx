"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CalendarCheck,
  Bell,
  Plus,
  Settings,
  CheckCircle,
  FileText,
} from "lucide-react";

const clientSteps = [
  {
    icon: Search,
    title: "1. Escolher",
    description:
      "Navegue pelos espaços disponíveis e encontre o ideal para sua necessidade.",
  },
  {
    icon: CalendarCheck,
    title: "2. Reservar",
    description:
      "Selecione data, horário e confirme sua reserva em poucos cliques.",
  },
  {
    icon: Bell,
    title: "3. Acompanhar",
    description:
      "Receba confirmações e lembretes automáticos das suas reservas.",
  },
];

const adminSteps = [
  {
    icon: Plus,
    title: "1. Cadastrar",
    description:
      "Adicione espaços com fotos, capacidade e recursos disponíveis.",
  },
  {
    icon: Settings,
    title: "2. Gerenciar",
    description: "Configure regras de uso, horários e permissões de acesso.",
  },
  {
    icon: CheckCircle,
    title: "3. Aprovar",
    description: "Revise e aprove solicitações de reserva quando necessário.",
  },
  {
    icon: FileText,
    title: "4. Relatórios",
    description: "Acompanhe métricas de uso e gere relatórios detalhados.",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"client" | "admin">("client");

  const steps = activeTab === "client" ? clientSteps : adminSteps;

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent text-primary text-sm font-medium rounded-full mb-4">
            Como funciona
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simples para todos os perfis
          </h2>
          <p className="text-lg text-muted-foreground">
            Fluxos intuitivos tanto para quem reserva quanto para quem
            administra.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-muted rounded-xl">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "client"
                  ? "bg-background text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Para Clientes
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-background text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Para Administradores
            </button>
          </div>
        </div>

        <div className="relative w-sm md:w-6xl mx-auto">
          <div
            className={
              activeTab === "client"
                ? "hidden lg:block absolute top-8 left-8 right-8 h-0.5 bg-border"
                : "hidden lg:block absolute top-8 left-8 right-8 h-0.5 bg-border"
            }
          />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={
              activeTab === "client"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
            }
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative z-10"
              >
                <div className="flex h-full flex-col items-center text-center p-6 sm:p-8 bg-background rounded-2xl border border-border shadow-card">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground max-w-[28ch]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
