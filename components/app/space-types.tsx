import { Monitor, Users, Wifi, Wind, Zap } from "lucide-react";
import Image from "next/image";

const spaces = [
  {
    title: "Sala de Reunião",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMZtQE1b37rbxQ3y-xAubhofpHjBpCxBX4Mn_qeCaPY8bwvbVi6WJZ9fWPytZOf_oTNfru0wnjTRBwAhI1AFB6YgBhsR_YQQFcbiBvJJ1x2z7KiFyHU6GIq9rDONiwCfBUO4UocsLUMpv11B8zf-22sxw=w640-h427-s-no-gm?authuser=0",
    tags: [
      { icon: Users, label: "8 pessoas" },
      { icon: Monitor, label: "Projetor" },
      { icon: Wind, label: "Ar condicionado" },
    ],
  },
  {
    title: "Coworking",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczPp89aEgrN50VHp6NOIaCGuafzfBYI3IVVyUji9UAwsHqlfP-C3x7vo2N-pmdM5PZUoR4q074G_yCQZpZoLgXUC9i1mKbZWJ47jD9AyDjFt4CvoNvLMGKRyTg5dAwJSkg83UAWBX8YGWFduDK6DnIkcCg=w640-h480-s-no-gm?authuser=0",
    tags: [
      { icon: Users, label: "20 lugares" },
      { icon: Wifi, label: "Internet rápida" },
      { icon: Wind, label: "Ar condicionado" },
    ],
  },
  {
    title: "Auditório",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczNIkkmgL9q-PMwqDExm2BX8lbQSGtHaRICVYHKFq6-OOc3xDdsYrq4xoeyqzEoucqyWra19L9hNGNmRg5rEuQ77iakblH00vbJorbufV33gK_1RVYNjCln7P9sFabtsAA1VAf4pHZfl3q-SIVbrWpQrHA=w1000-h564-s-no-gm?authuser=0",
    tags: [
      { icon: Users, label: "100 pessoas" },
      { icon: Monitor, label: "Sistema de som" },
      { icon: Wind, label: "Ar condicionado" },
    ],
  },
  {
    title: "Lab Tech",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczN61MRBA6suqq29d-NzG-W0sF7yFOZZv1ybsHGnDI4jo9-fboBCMUr64ZJZueP5Io6ibqsUL7sqmoeZK9IqQYeD5MGXlHVZVkm6kxcaAIx8Z5qEvLgGyoPicgoPlotX6TnFKRqGOMtKOauDo7Al0jiX1Q=w640-h427-s-no-gm?authuser=0",
    tags: [
      { icon: Users, label: "12 pessoas" },
      { icon: Monitor, label: "Equipamentos" },
      { icon: Wifi, label: "Internet dedicada" },
    ],
  },
];

export default function SpaceTypes() {
  return (
    <section id="espacos" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Tipos de espaços disponíveis
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-pretty">
            Ambientes versáteis para cada necessidade do seu hub de inovação
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space) => (
            <div
              key={space.title}
              className="group overflow-hidden rounded-2xl bg-background border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-4/3">
                <Image
                  src={space.image}
                  width={640}
                  height={427}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-background">
                  {space.title}
                </h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {space.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-lg text-xs font-medium text-muted-foreground"
                  >
                    <tag.icon className="w-3.5 h-3.5" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
