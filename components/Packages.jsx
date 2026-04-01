export default function Packages({ packagesData }) {
  return (
    <section id="pacotes" className="bg-[#1f3266] py-14 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#42e8df]">
          Passeios / roteiros
        </p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          Experiencias para cada estilo de viagem
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packagesData.map((travelPackage) => (
            <article
              key={travelPackage.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold sm:text-xl">{travelPackage.title}</h3>
              <p className="mt-3 text-sm text-slate-200">{travelPackage.description}</p>
              <p className="mt-4 text-lg font-semibold text-[#42e8df]">
                {travelPackage.price}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-100">
                {travelPackage.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42e8df]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
