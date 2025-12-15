export function parseHHMM(hhmm: string) {
  const [h, m] = hhmm.split(":").map((v) => Number(v));
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { h, m };
}

export function buildStartEnd(
  dateStr: string,
  startTime: string,
  durationHours: number
) {
  const parsed = parseHHMM(startTime);
  if (!parsed) throw new Error("Horário inválido");

  const [yyyy, mm, dd] = dateStr.split("-").map((v) => Number(v));
  if (!yyyy || !mm || !dd) throw new Error("Data inválida");

  const start = new Date(yyyy, mm - 1, dd, parsed.h, parsed.m, 0, 0);
  if (Number.isNaN(start.getTime())) throw new Error("Data inválida");

  const minutes = Math.round(durationHours * 60);
  const end = new Date(start.getTime() + minutes * 60_000);

  return {
    startAt: start,
    endAt: end,
    durationMinutes: minutes,
  };
}

export function centsToBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function brlToCents(value: number) {
  return Math.round(value * 100);
}

export const SpaceTypeLabel: Record<string, string> = {
  MEETING_ROOM: "Sala de Reunião",
  COWORKING: "Coworking",
  AUDITORIUM: "Auditório",
  LAB_TECH: "Lab Tech",
};

export const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
