"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-orange-50/30 to-white">
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Brand */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Animated ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-orange-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-2xl border-4 border-orange-500 animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">CajuReserva</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
          </div>
          <p className="text-sm text-slate-600">Carregando...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-orange-500 to-orange-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 75%;
            margin-left: 0%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
