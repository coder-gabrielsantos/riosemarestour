export default function Testimonials({ testimonials }) {
  return (
    <section id="depoimentos" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
        Depoimentos
      </p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        Quem viaja com a gente recomenda
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm leading-relaxed text-slate-700">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-6 font-semibold text-slate-900">{testimonial.name}</p>
            <p className="text-sm text-[#205e98]">Viagem para {testimonial.trip}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
