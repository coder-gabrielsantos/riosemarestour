"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Destinations({ destinations }) {
  const [cardsPerPage, setCardsPerPage] = useState(5);
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
    const mobileQuery = window.matchMedia("(max-width: 639px)");

    function updateCardsPerPage(event) {
      setCardsPerPage(event.matches ? 4 : 5);
    }

    setCardsPerPage(mobileQuery.matches ? 4 : 5);
    mobileQuery.addEventListener("change", updateCardsPerPage);

    return () => mobileQuery.removeEventListener("change", updateCardsPerPage);
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

  useEffect(() => {
    if (currentPageIndex > totalPages - 1) {
      setCurrentPageIndex(totalPages - 1);
    }
  }, [currentPageIndex, totalPages]);

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
  const topDestinations = visibleDestinations.slice(0, 2);
  const bottomDestinations = visibleDestinations.slice(2, 5);

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
    const roteiroText = roteiroLine
      ? roteiroLine.replace(/^Roteiro Base:\s*/i, "").trim()
      : "";

    return (
      <div className="space-y-5 text-slate-700">
        {roteiroText && (
          <p className="text-[15px] leading-7 text-slate-700 md:text-base md:leading-8">
            {roteiroText}
          </p>
        )}

        {saidaLine && (
          <p className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            <span className="font-semibold text-[#1f3266]">Saída</span>
            <span className="mx-1.5 text-slate-300">•</span>
            <span className="text-slate-700">
              {saidaLine.replace(/^sa[ií]da:\s*/i, "")}
            </span>
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <section id="destinos" className="mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
            Conheça Camocim
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Explore nossos destinos
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-2.5">
            {topDestinations.map((destination, index) => (
              <button
                key={`${destination.id}-${cardsAnimationCycle}`}
                type="button"
                onClick={() => openDestination(destination)}
              className={`group relative overflow-hidden rounded-sm border border-slate-200 text-left shadow-sm transition duration-300 hover:scale-[1.015] hover:shadow-md ${
                  cardsAnimationCycle > 0 ? "destination-card-enter" : ""
                }`}
                style={{ animationDelay: `${index * 85}ms` }}
              >
                <div className="relative h-56 sm:h-64 lg:h-[255px]">
                  {destination.images?.[0] ? (
                    <Image
                      src={destination.images[0]}
                      alt={destination.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                      Adicione a imagem 01 deste destino.
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 p-4 sm:p-5">
                  <h3 className="text-base font-medium text-white/95 drop-shadow sm:text-lg">
                    {destination.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2.5">
            {bottomDestinations.map((destination, index) => (
              <button
                key={`${destination.id}-${cardsAnimationCycle}`}
                type="button"
                onClick={() => openDestination(destination)}
              className={`group relative overflow-hidden rounded-sm border border-slate-200 text-left shadow-sm transition duration-300 hover:scale-[1.015] hover:shadow-md ${
                  cardsAnimationCycle > 0 ? "destination-card-enter" : ""
                }`}
                style={{ animationDelay: `${(index + topDestinations.length) * 85}ms` }}
              >
                <div className="relative h-52 sm:h-56 lg:h-[230px]">
                  {destination.images?.[0] ? (
                    <Image
                      src={destination.images[0]}
                      alt={destination.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                      Adicione a imagem 01 deste destino.
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 p-4 sm:p-5">
                  <h3 className="text-base font-medium text-white/95 drop-shadow sm:text-lg">
                    {destination.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fallback: quando houver menos de 5 itens na página */}
        {visibleDestinations.length < 3 && (
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            {visibleDestinations.map((destination, index) => (
            <button
              key={`${destination.id}-${cardsAnimationCycle}`}
              type="button"
              onClick={() => openDestination(destination)}
                className={`group relative overflow-hidden rounded-sm border border-slate-200 text-left shadow-sm transition duration-300 hover:scale-[1.015] hover:shadow-md ${
                  cardsAnimationCycle > 0 ? "destination-card-enter" : ""
                }`}
                style={{ animationDelay: `${index * 85}ms` }}
              >
                <div className="relative h-52 sm:h-56">
                  {destination.images?.[0] ? (
                    <Image
                      src={destination.images[0]}
                      alt={destination.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                      Adicione a imagem 01 deste destino.
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 p-4 sm:p-5">
                  <h3 className="text-base font-medium text-white/95 drop-shadow sm:text-lg">
                    {destination.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={currentPageIndex === 0}
              className="rounded-full border border-[#b8e6f9] bg-white px-3.5 py-2 text-sm font-semibold text-[#1f3266] transition hover:border-[#2a6eb9] hover:text-[#2a6eb9] disabled:cursor-not-allowed disabled:opacity-45 sm:px-4"
              aria-label="Página anterior"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`dest-page-${index}`}
                type="button"
                onClick={() => goToPage(index)}
                className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition sm:h-10 sm:min-w-10 ${
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
              className="rounded-full border border-[#b8e6f9] bg-white px-3.5 py-2 text-sm font-semibold text-[#1f3266] transition hover:border-[#2a6eb9] hover:text-[#2a6eb9] disabled:cursor-not-allowed disabled:opacity-45 sm:px-4"
              aria-label="Próxima página"
            >
              Próximo
            </button>
          </div>
        )}
      </section>

      {selectedDestination && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-2 py-4 backdrop-blur-sm sm:px-4 sm:py-8"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-6xl rounded-l-2xl rounded-r-none bg-transparent shadow-[0_28px_90px_-30px_rgba(15,23,42,0.8)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-scroll max-h-[90vh] overflow-auto rounded-l-2xl rounded-r-none border border-slate-200/90 bg-white p-4 sm:p-5 md:p-7">
              <div className="relative mb-4 border-b border-slate-100 pb-4 sm:mb-6 sm:pb-5">
                <div className="max-w-2xl pr-12 sm:pr-0">
                  <h3 className="text-[30px] font-bold leading-tight text-slate-900 sm:text-2xl md:text-3xl">
                    {selectedDestination.title}
                  </h3>
                  <p className="mt-1.5 text-base text-slate-600 sm:mt-2 sm:text-sm md:text-base">
                    {selectedDestination.shortDescription || "Passeio privativo e personalizado para o seu roteiro."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
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

              <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
                <div>
                  <div className="relative -mx-4 sm:mx-0">
                    <div className="relative h-[235px] overflow-hidden rounded-none border-0 bg-slate-100 sm:h-[330px] sm:rounded-2xl sm:border sm:border-slate-200 lg:h-[460px]">
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
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
                          aria-label="Imagem anterior"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 12H6"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M11 7L6 12L11 17"
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
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
                          aria-label="Próxima imagem"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H18"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M13 7L18 12L13 17"
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
                    <>
                      <div className="mt-4 flex items-center justify-center">
                        <p className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                          {currentImageIndex + 1} de {selectedDestination.images.length}
                        </p>
                      </div>

                      <div className="-mx-4 mt-4 grid grid-cols-4 gap-2 px-4 sm:mx-0 sm:grid-cols-6 sm:px-0">
                        {selectedDestination.images.map((image, index) => (
                          <button
                            key={`${selectedDestination.id}-thumb-${image}`}
                            type="button"
                            onClick={() => {
                              setSlideDirection(index > currentImageIndex ? "next" : "prev");
                              setCurrentImageIndex(index);
                            }}
                            className={`relative h-14 overflow-hidden rounded-none border-0 transition sm:h-16 sm:rounded-lg sm:border ${
                              index === currentImageIndex
                                ? "sm:border-[#2a6eb9] sm:ring-2 sm:ring-[#2a6eb9]/20"
                                : "sm:border-slate-200 sm:hover:border-slate-300"
                            }`}
                            aria-label={`Visualizar imagem ${index + 1}`}
                          >
                            <Image
                              src={image}
                              alt={`${selectedDestination.title} - foto ${index + 1}`}
                              fill
                              className="object-contain"
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#dcecf8] bg-gradient-to-b from-[#f8fcff] to-white p-5">
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1f3266]">
                        Roteiro
                      </p>
                    </div>
                    {formatDetailedDescription(selectedDestination.detailedDescription)}
                  </div>
                  <a
                    href={`https://wa.me/558899855698?text=${encodeURIComponent(
                      `Olá! Tenho interesse no roteiro ${selectedDestination.title}. Pode me passar mais informações?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#2a6eb9] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#205e98]"
                  >
                    Quero conhecer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
