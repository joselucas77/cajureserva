export default function SocialProof() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">+500</div>
            <div className="mt-2 text-sm font-medium text-slate-600">
              Reservas realizadas
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">Zero</div>
            <div className="mt-2 text-sm font-medium text-slate-600">
              Conflitos de agenda
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">100%</div>
            <div className="mt-2 text-sm font-medium text-slate-600">
              Gestão simplificada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
