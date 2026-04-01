"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome.";
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      nextErrors.email = "Informe um e-mail valido.";
    }
    if (!form.message.trim()) nextErrors.message = "Escreva uma mensagem curta.";

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);
    setSent(false);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Não foi possível enviar sua mensagem.");
      }

      setSent(true);
      setForm(initialForm);
    } catch (error) {
      setSubmitError(error.message || "Não foi possível enviar sua mensagem.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="bg-[#f8fbff] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 sm:p-7 md:p-8">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10">
            <div className="self-start">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contato</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                Conte com a Rios&amp;Mares Tour para criar um roteiro sob medida para
                você. Nosso atendimento é rápido, atencioso e totalmente
                personalizado.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700 sm:text-[15px]">
                <a
                  href="mailto:riosemarestour@gmail.com"
                  className="flex items-center gap-3.5 transition hover:text-[#2a6eb9]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e8f7] bg-[#f6fbff] text-[#2a6eb9]">
                    <FiMail className="h-5 w-5" />
                  </span>
                  <span>riosemarestour@gmail.com</span>
                </a>

                <a
                  href="https://wa.me/558899855698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 transition hover:text-[#2a6eb9]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e8f7] bg-[#f6fbff] text-[#2a6eb9]">
                    <FaWhatsapp className="h-5 w-5" />
                  </span>
                  <span>+55 88 99855-5698</span>
                </a>

                <a
                  href="https://instagram.com/riosemarestour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 transition hover:text-[#2a6eb9]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e8f7] bg-[#f6fbff] text-[#2a6eb9]">
                    <FaInstagram className="h-5 w-5" />
                  </span>
                  <span>@riosemarestour</span>
                </a>
              </div>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Nome
                </span>
                <input
                  className="w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2a6eb9]"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Seu nome"
                />
                {errors.name && (
                  <small className="mt-1 block text-[#2a6eb9]">{errors.name}</small>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  E-mail
                </span>
                <input
                  className="w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2a6eb9]"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="contato@email.com"
                />
                {errors.email && (
                  <small className="mt-1 block text-[#2a6eb9]">{errors.email}</small>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Mensagem
                </span>
                <textarea
                  className="h-32 w-full resize-none rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2a6eb9]"
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Quero um roteiro para..."
                />
                {errors.message && (
                  <small className="mt-1 block text-[#2a6eb9]">{errors.message}</small>
                )}
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#2a6eb9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#205e98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>

              {sent && (
                <p className="text-sm text-emerald-600">
                  Mensagem enviada com sucesso. Nosso time entrará em contato.
                </p>
              )}
              {submitError && (
                <p className="text-sm text-rose-600">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
