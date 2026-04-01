"use client";

import { useState } from "react";

export default function Faq({ faqs }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-[#e5ffff] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
          Quem somos nós
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          Dicas rapidas antes de fechar seu pacote
        </h2>

        <div className="mt-8 space-y-3">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-[#b8e6f9] bg-white p-4 sm:p-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">
                    {item.question}
                  </span>
                  <span className="text-[#2a6eb9]">{isOpen ? "-" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
