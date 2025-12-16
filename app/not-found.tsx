import Link from "next/link";
import { Calendar, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-orange-50/30 to-orange-100/20 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 relative">
          <div className="text-[180px] md:text-[240px] font-bold text-orange-600/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-orange-600 rounded-3xl p-8 shadow-lg shadow-orange-600/20 animate-bounce-slow">
              <Calendar className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 text-balance">
            Página não encontrada
          </h1>
          <p className="text-lg md:text-xl text-slate-600 text-pretty max-w-lg mx-auto">
            Desculpe, não conseguimos encontrar a página que você está
            procurando. Ela pode ter sido movida ou não existe mais.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-200 shadow-lg shadow-orange-600/20 hover:shadow-xl hover:shadow-orange-600/30 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Voltar para Home
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-orange-600 hover:text-orange-600 transition-all duration-200 hover:scale-105"
          >
            <Search className="w-5 h-5" />
            Fazer Login
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto opacity-50">
          <div
            className="h-2 bg-orange-200 rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="h-2 bg-orange-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
