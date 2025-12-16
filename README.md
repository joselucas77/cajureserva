# CajuReserva

<img src="https://lh3.googleusercontent.com/pw/AP1GczNtHROLJ6f-FMWiffmzqmKrtqaHM77v-6UorfMrnr3bkgvE6A5YHne0408YMiIRxeSCCjW3uw7kGYfr6sjI8buiR9rJscClEiuEz0umZfH0lnoGE7icEGMJDHcyEe23vZ5fi9WHKjT-RwR-J-1oMRD6yA=w1895-h970-s-no-gm?authuser=0" alt="landing page"/>

Sistema de gerenciamento de locação/reserva de espaços (salas de reunião, coworking, auditório e laboratório) inspirado em hubs de inovação como o CAJUHUB.

O sistema foi pensado para **dois tipos de usuários**:

- **CLIENT**: navega pelos espaços, realiza reservas, visualiza/edita/cancela suas reservas.
- **ADMIN**: cadastra/edita espaços, gerencia reservas (confirmar/cancelar), visualiza dashboard com métricas.

---

## ✅ Funcionalidades

### Cliente (CLIENT)
- Listagem de espaços com **filtros** (tipo e busca por nome)
- Reserva de espaço com:
  - data
  - horário de início
  - duração (em horas)
  - cálculo de valor total (baseado em preço/hora)
- Validação de formulário com **React Hook Form + Zod**
- Página **Minhas Reservas**:
  - listar reservas com paginação
  - editar
  - cancelar
  - filtros por nome e data
- **Logout**

### Administrador (ADMIN)
- Dashboard:
  - total de espaços cadastrados
  - total de reservas do dia
  - gráfico (Pie Chart) de ocupação por tipo de espaço
- Gestão de reservas:
  - filtros por nome do espaço, status e data
  - confirmar/cancelar reservas pendentes
  - tabela paginada
- Gestão de espaços:
  - criar, editar (modal) e deletar
  - campos: nome, tipo, capacidade, preço/hora, localização e imagem (opcional)
  - filtros por nome e tipo
  - tabela paginada
- **Logout**

---

## 🧱 Tecnologias

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (Neon)
- **shadcn/ui + Tailwind CSS**
- **lucide-react**
- **React Hook Form**
- **Zod**
- **JWT + Cookies HttpOnly**
- **Middleware (RBAC por role)**
- **Recharts** (gráficos do dashboard)

---

## 🔐 Autenticação & Autorização

- Sessão baseada em **JWT armazenado em cookie HttpOnly**
- O `middleware.ts` protege rotas privadas:
  - `/app/*` → apenas **CLIENT**
  - `/admin/*` → apenas **ADMIN**
- Redirecionamento automático pós-login:
  - ADMIN → `/admin`
  - CLIENT → `/app`

### Cookie de sessão
- Nome padrão: `cajureserva_token` (configurável via `.env`)
- Flags recomendadas:
  - `httpOnly: true`
  - `sameSite: "lax"`
  - `secure: true` apenas em produção
  - `path: "/"`

---

## ⚙️ Pré-requisitos

- Node.js **18+** (recomendado 20+)
- Banco **PostgreSQL** (local ou na nuvem)

---

## 🚀 Como rodar o projeto

### 1) Instalar dependências
```bash
pnpm install
```

### 2) Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
JWT_SECRET="uma_chave_forte"
SESSION_COOKIE_NAME="cajureserva_token"
```

### 3) Prisma: gerar client e aplicar migrations
Crie um arquivo .env na raiz do projeto:
```bash
npx prisma generate
npx prisma migrate dev
```

### 4) Rodar o projeto
Crie um arquivo .env na raiz do projeto:
```bash
pnpm dev
```
