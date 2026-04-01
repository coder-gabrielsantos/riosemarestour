"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Destinations({ destinations }) {
  const cardsPerPage = 4;
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [cardsAnimationCycle, setCardsAnimationCycle] = useState(0);

  const totalPages = Math.max(1, Math.ceil(destinations.length / cardsPerPage));
  const startIndex = currentPageIndex * cardsPerPage;
  const visibleDestinations = destinations.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        setSelectedDestination(null);
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const { body, documentElement } = document;

    if (selectedDestination) {
      body.classList.add("modal-open");
      documentElement.classList.add("modal-open");
    } else {
      body.classList.remove("modal-open");
      documentElement.classList.remove("modal-open");
    }

    return () => {
      body.classList.remove("modal-open");
      documentElement.classList.remove("modal-open");
    };
  }, [selectedDestination]);

  function openDestination(destination) {
    setSelectedDestination(destination);
    setSlideDirection("next");
    setCurrentImageIndex(0);
  }

  function closeModal() {
    setSelectedDestination(null);
  }

  function showPrevImage() {
    if (!selectedDestination?.images?.length) return;

    setSlideDirection("prev");
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedDestination.images.length - 1 : prev - 1
    );
  }

  function showNextImage() {
    if (!selectedDestination?.images?.length) return;

    setSlideDirection("next");
    setCurrentImageIndex((prev) =>
      prev === selectedDestination.images.length - 1 ? 0 : prev + 1
    );
  }

  function goToPrevPage() {
    goToPage(currentPageIndex - 1);
  }

  function goToNextPage() {
    goToPage(currentPageIndex + 1);
  }

  function goToPage(index) {
    const boundedIndex = Math.min(Math.max(index, 0), totalPages - 1);
    if (boundedIndex !== currentPageIndex) {
      setCurrentPageIndex(boundedIndex);
      setCardsAnimationCycle((prev) => prev + 1);
    }
  }

  const modalImage = selectedDestination?.images?.[currentImageIndex];

  function formatDetailedDescription(description) {
    if (!description?.trim()) {
      return (
        <p className="text-sm leading-relaxed text-slate-700">
          Preencha a descrição detalhada deste destino no arquivo
          {" "}
          <code>data/camocimDestinations.js</code>.
        </p>
      );
    }

    const lines = description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const roteiroLine = lines.find((line) => line.startsWith("Roteiro Base:"));
    const saidaLine = lines.find((line) => /^sa[ií]da:/i.test(line));
    const observationLines = lines.filter((line) => /^\d+\./.test(line));

    return (
      <div className="space-y-4 text-slate-700">
        {roteiroLine && (
          <p className="text-sm leading-7 md:text-[15px]">
            <span className="font-semibold text-[#1f3266]">Roteiro Base:</span>{" "}
            <span>{roteiroLine.replace("Roteiro Base:", "").trim()}</span>
          </p>
        )}

        {saidaLine && (
          <p className="text-sm leading-relaxed md:text-[15px]">
            <span className="font-semibold text-[#1f3266]">Saída:</span>{" "}
            <span className="text-slate-700">
              {saidaLine.replace(/^sa[ií]da:\s*/i, "")}
            </span>
          </p>
        )}

        {observationLines.length > 0 && (
          <ul className="space-y-2 text-sm leading-7 md:text-[15px]">
            {observationLines.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#2a6eb9]" />
                <span>{item.replace(/^\d+\.\s*/, "")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <>
      <section id="destinos" className="mx-auto max-w-6xl px-6 pb-20 pt-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
              Conheça Camocim
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Escolha seu proximo destino
            </h2>
          </div>
          <a
            href="#contato"
            className="text-sm font-semibold text-slate-700 hover:text-[#205e98]"
          >
            Falar com consultor
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {visibleDestinations.map((destination, index) => (
            <button
              key={`${destination.id}-${cardsAnimationCycle}`}
              type="button"
              onClick={() => openDestination(destination)}
              className={`overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                cardsAnimationCycle > 0 ? "destination-card-enter" : ""
              }`}
              style={{ animationDelay: `${index * 85}ms` }}
            >
              <div className="relative h-56">
                {destination.images?.[0] ? (
                  <Image
                    src={destination.images[0]}
                    alt={destination.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                    Adicione a imagem 01 deste destino.
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {destination.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={currentPageIndex === 0}
              className="rounded-full border border-[#b8e6f9] bg-white px-4 py-2 text-sm font-semibold text-[#1f3266] transition hover:border-[#2a6eb9] hover:text-[#2a6eb9] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Página anterior"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`dest-page-${index}`}
                type="button"
                onClick={() => goToPage(index)}
                className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                  index === currentPageIndex
                    ? "bg-[#2a6eb9] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#2a6eb9] hover:text-[#2a6eb9]"
                }`}
                aria-label={`Ir para página ${index + 1}`}
                aria-current={index === currentPageIndex ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="rounded-full border border-[#b8e6f9] bg-white px-4 py-2 text-sm font-semibold text-[#1f3266] transition hover:border-[#2a6eb9] hover:text-[#2a6eb9] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Próxima página"
            >
              Próximo
            </button>
          </div>
        )}
      </section>

      {selectedDestination && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-white p-2 shadow-2xl md:p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-scroll max-h-[90vh] overflow-auto rounded-xl bg-white p-4 md:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
                    Conheça Camocim
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {selectedDestination.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/558899855698?text=${encodeURIComponent(
                      `Olá! Tenho interesse no roteiro ${selectedDestination.title}. Pode me passar mais informações?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#2a6eb9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#205e98]"
                  >
                    Quero conhecer
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                    aria-label="Fechar modal"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6L18 18M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[260px] overflow-hidden rounded-xl border border-[#b8e6f9] bg-[#eef7ff] md:h-[420px]">
                  {modalImage ? (
                    <div
                      key={`${selectedDestination.id}-${currentImageIndex}-${slideDirection}`}
                      className={`absolute inset-0 ${
                        slideDirection === "next"
                          ? "carousel-slide-next"
                          : "carousel-slide-prev"
                      }`}
                    >
                      <Image
                        src={modalImage}
                        alt={selectedDestination.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      Adicione imagens neste destino para visualizar o carrossel.
                    </div>
                  )}
                </div>

                {selectedDestination.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevImage}
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-slate-900/55 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900/70"
                      aria-label="Imagem anterior"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 6L8.5 12L14.5 18"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-slate-900/55 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900/70"
                      aria-label="Próxima imagem"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5 6L15.5 12L9.5 18"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {selectedDestination.images.length > 1 && (
                <div className="mt-4 flex items-center justify-center">
                  <p className="rounded-full border border-[#b8e6f9] bg-white px-4 py-1.5 text-sm font-semibold text-[#1f3266]">
                    {currentImageIndex + 1} de {selectedDestination.images.length}
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-xl bg-[#f2f8ff] p-5 md:p-6">
                {formatDetailedDescription(selectedDestination.detailedDescription)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
