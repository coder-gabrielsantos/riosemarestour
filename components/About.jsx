"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const ROTATE_INTERVAL_MS = 5000;
const VISIBLE_IMAGES = 5;
const collageLayout = [
  "col-span-4 row-span-2",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
  "col-span-3 row-span-2",
  "col-span-3 row-span-2",
];

function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function pickRandomUnique(items, amount) {
  return shuffle(items).slice(0, amount);
}

function buildNextImageSet(currentImages, availableImages, count) {
  if (count === 0) return [];
  if (availableImages.length <= count) return pickRandomUnique(availableImages, count);

  let next = pickRandomUnique(availableImages, count);
  let attempts = 0;

  while (
    attempts < 6 &&
    next.every((src, index) => src === currentImages[index])
  ) {
    next = pickRandomUnique(availableImages, count);
    attempts += 1;
  }

  return next;
}

export default function About({ images = [] }) {
  const availableImages = useMemo(
    () => images.filter(Boolean).map((item) => `/assets/sobre/${item}`),
    [images]
  );

  const visibleCount = Math.min(VISIBLE_IMAGES, availableImages.length);
  const [visibleImages, setVisibleImages] = useState(() =>
    pickRandomUnique(availableImages, visibleCount)
  );
  const [incomingImages, setIncomingImages] = useState(() =>
    Array.from({ length: visibleCount }, () => null)
  );
  const [fadingSlots, setFadingSlots] = useState(() =>
    Array.from({ length: visibleCount }, () => false)
  );
  const visibleImagesRef = useRef(visibleImages);

  useEffect(() => {
    visibleImagesRef.current = visibleImages;
  }, [visibleImages]);

  useEffect(() => {
    if (availableImages.length <= visibleCount || visibleCount === 0) return undefined;

    const timers = [];
    let cancelled = false;

    function replaceSlotsInSequence(nextImages) {
      const animationStepMs = 210;
      const fadeDurationMs = 520;

      for (let index = 0; index < visibleCount; index += 1) {
        const startDelay = index * animationStepMs;
        const fadeStartDelay = startDelay + 20;
        const commitDelay = fadeStartDelay + fadeDurationMs;

        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;

            setIncomingImages((previous) =>
              previous.map((value, slotIndex) => (slotIndex === index ? nextImages[index] : value))
            );
          }, startDelay)
        );

        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;

            setFadingSlots((previous) =>
              previous.map((value, slotIndex) => (slotIndex === index ? true : value))
            );
          }, fadeStartDelay)
        );

        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;

            setVisibleImages((previous) =>
              previous.map((src, slotIndex) =>
                slotIndex === index ? nextImages[index] : src
              )
            );
            setIncomingImages((previous) =>
              previous.map((value, slotIndex) => (slotIndex === index ? null : value))
            );
            setFadingSlots((previous) =>
              previous.map((value, slotIndex) => (slotIndex === index ? false : value))
            );
          }, commitDelay)
        );
      }
    }

    const intervalId = window.setInterval(() => {
      if (cancelled) return;

      const nextSet = buildNextImageSet(
        visibleImagesRef.current,
        availableImages,
        visibleCount
      );
      replaceSlotsInSequence(nextSet);
    }, ROTATE_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [availableImages, visibleCount]);

  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7 md:p-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2a6eb9]">
            Quem somos nós
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            A leveza de viajar com a Rios&amp;Mares Tour
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          <div className="space-y-4 text-[15px] leading-7 text-slate-700 md:text-base md:leading-8">
            <p>
              A Rios&amp;Mares Tour é uma agência de turismo camocinense que propõe a
              leveza de viajar. Ela surgiu em maio de 2021, e esse nome foi
              escolhido porque, em Camocim, localizado no estado do Ceará, é
              possível apreciar o encontro do rio com o mar.
            </p>
            <p>
              O rio, por sua vez, representa purificação, proteção e cura; o mar
              representa transformação, renascimento e vida. As ondas nascem, crescem
              e morrem em um constante vai e vem, como a vida.
            </p>
            <p>
              Trabalhamos com passeios, transfers, hospedagem, indicações e roteiros
              padronizados e personalizados.
            </p>
            <p className="font-semibold text-[#1f3266]">
              Venha conhecer e se encantar por CAMOCIM, uma das 14 belas cidades que
              compõem a ROTA DAS EMOÇÕES.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
            <div className="grid grid-cols-6 auto-rows-[84px] gap-px sm:auto-rows-[100px]">
            {visibleImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={`relative overflow-hidden bg-slate-100 ${
                  collageLayout[index] ?? "col-span-3 row-span-1"
                }`}
              >
                <Image
                  src={src}
                  alt={`Imagem sobre a Rios e Mares Tour ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-500 ease-in-out ${
                    fadingSlots[index] ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 32vw"
                />
                {incomingImages[index] && (
                  <Image
                    src={incomingImages[index]}
                    alt={`Imagem sobre a Rios e Mares Tour ${index + 1}`}
                    fill
                    className={`pointer-events-none object-cover transition-opacity duration-500 ease-in-out ${
                      fadingSlots[index] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 32vw"
                  />
                )}
              </div>
            ))}

            {visibleImages.length === 0 && (
              <div className="col-span-6 bg-slate-50 p-6 text-sm text-slate-500">
                Adicione imagens em <code>public/assets/sobre</code> (ex.: 01.jpg,
                02.jpg, 03.jpg...) para ativar a galeria dinâmica.
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
