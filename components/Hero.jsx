import Image from "next/image";
import heroBanner from "@/app/util/hero.jpeg";
import logo from "@/app/util/logo.png";

export default function Hero({ navLinks }) {
  return (
    <header>
      <div className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center px-6 py-4 lg:px-8">
          <a href="#topo" className="inline-flex items-center">
            <Image
              src={logo}
              alt="Logo Rios e Mares Tour"
              priority
              className="h-14 w-auto md:h-16"
            />
          </a>
          <ul className="ml-auto hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.08em] text-[#1f3266] md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="relative transition hover:text-[#2a6eb9] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#2a6eb9] after:transition-all hover:after:w-full"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl">
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
