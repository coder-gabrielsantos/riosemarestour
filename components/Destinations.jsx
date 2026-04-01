import Image from "next/image";

export default function Destinations({ destinations }) {
  return (
    <section id="destinos" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
            Conheça Camocim
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Escolha seu proximo destino
          </h2>
        </div>
        <a href="#contato" className="text-sm font-semibold text-slate-700 hover:text-[#205e98]">
          Falar com consultor
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {destinations.map((destination) => (
          <article
            key={destination.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-56">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">
                  {destination.name}
                </h3>
                <span className="rounded-full bg-[#e5ffff] px-3 py-1 text-xs font-semibold text-[#1f3266]">
                  {destination.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {destination.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
