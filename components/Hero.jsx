"use client";

import { useState } from "react";
import Image from "next/image";
import heroBanner from "@/app/util/hero.jpeg";
import logo from "@/app/util/logo.png";

export default function Hero({ navLinks }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleAnchorClick(event, href) {
    if (!href?.startsWith("#")) return;

    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    setIsMobileMenuOpen(false);
  }

  return (
    <header>
      <div className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
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
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
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

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 px-4 pb-4 pt-3 sm:px-6 lg:hidden">
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={`mobile-${link.href}`}>
                  <a
                    className="block rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-[0.06em] text-[#1f3266] transition hover:bg-[#eef7ff] hover:text-[#2a6eb9]"
                    href={link.href}
                    onClick={(event) => handleAnchorClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <section className="mb-8 w-full py-0 sm:mx-auto sm:mb-10 sm:max-w-7xl sm:px-6 sm:py-6 lg:px-8">
        <div className="overflow-hidden sm:rounded-2xl">
          <Image
            src={heroBanner}
            alt="Imagem principal da Rios e Mares Tour"
            sizes="100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </section>
    </header>
  );
}
