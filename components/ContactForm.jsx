"use client";

import { useState } from "react";

const initialForm = {
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const nextErrors = {};

    if (!form.email.trim() || !form.email.includes("@")) {
      nextErrors.email = "Informe um e-mail valido.";
    }
    if (!form.message.trim()) nextErrors.message = "Escreva uma mensagem curta.";

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);
    setSent(false);

    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      setForm(initialForm);
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2200&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 text-white sm:gap-8 md:grid-cols-2">
          <div className="self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#42e8df]">
              Fale com a equipe
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Vamos planejar sua proxima viagem?
            </h2>
            <p className="mt-4 max-w-md text-sm text-slate-100/90">
              Envie uma mensagem e retornamos com opcoes de roteiro sob medida.
            </p>
          </div>

          <form
            className="space-y-4 rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:p-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="block">
              <span className="mb-2 block text-sm">E-mail</span>
              <input
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 outline-none transition placeholder:text-slate-200/70 focus:border-[#42e8df]"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="voce@email.com"
              />
              {errors.email && (
                <small className="mt-1 block text-[#b8e6f9]">{errors.email}</small>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm">Mensagem</span>
              <textarea
                className="h-32 w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 outline-none transition placeholder:text-slate-200/70 focus:border-[#42e8df]"
                value={form.message}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                }
                placeholder="Quero um roteiro para..."
              />
              {errors.message && (
                <small className="mt-1 block text-[#b8e6f9]">{errors.message}</small>
              )}
            </label>

            <button
              type="submit"
              className="rounded-full bg-[#2a6eb9] px-6 py-3 text-sm font-semibold transition hover:bg-[#205e98]"
            >
              Enviar mensagem
            </button>

            {sent && (
              <p className="text-sm text-emerald-200">
                Mensagem enviada com sucesso. Nosso time entrara em contato.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
