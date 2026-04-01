"use client";

import { useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import heroBanner from "@/app/util/hero.jpeg";
import logo from "@/app/util/logo.png";

export default function Hero({ navLinks }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  function handleAnchorClick(event, href) {
    if (!href?.startsWith("#")) return;

    event.preventDefault();
    setIsMobileMenuOpen(false);

    window.requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (!target) return;

      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });
      window.history.replaceState(null, "", href);
    });
  }

  return (
    <>
      <div
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-[#9ec7e4]/80 bg-white/70 shadow-[0_8px_24px_-18px_rgba(31,50,102,0.55)] backdrop-blur-xl"
      >
        <nav className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#topo"
            onClick={(event) => handleAnchorClick(event, "#topo")}
            className="inline-flex items-center"
          >
            <Image
              src={logo}
              alt="Logo Rios e Mares Tour"
              priority
              className="h-11 w-auto sm:h-14 md:h-16"
            />
          </a>

          <ul className="ml-auto hidden items-center gap-7 text-sm font-medium uppercase tracking-[0.08em] text-[#1f3266] lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="relative transition hover:text-[#2a6eb9] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#2a6eb9] after:transition-all hover:after:w-full"
                  href={link.href}
                  onClick={(event) => handleAnchorClick(event, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#9ec7e4]/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:scale-[1.02] hover:bg-white lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        <div
          className={`overflow-hidden border-t border-[#9ec7e4]/70 bg-white/85 backdrop-blur-md transition-all duration-300 ease-out lg:hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-3 sm:px-6">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={`mobile-${link.href}`}>
                  <a
                    className="flex items-center justify-between rounded-xl border border-transparent bg-white/75 px-4 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-[#1f3266] transition hover:border-[#b8e6f9] hover:bg-[#eef7ff] hover:text-[#2a6eb9]"
                    href={link.href}
                    onClick={(event) => handleAnchorClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mb-8 w-full py-0 sm:mb-10">
        <div className="overflow-hidden">
          <Image
            src={heroBanner}
            alt="Imagem principal da Rios e Mares Tour"
            sizes="100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </section>
    </>
  );
}
