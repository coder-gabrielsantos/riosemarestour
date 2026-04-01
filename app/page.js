import fs from "node:fs/promises";
import path from "node:path";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { camocimDestinations } from "@/data/camocimDestinations";
import {
  navLinks,
} from "@/data/mockData";

async function getAboutImageFiles() {
  const aboutDir = path.join(process.cwd(), "public", "assets", "sobre");

  try {
    const entries = await fs.readdir(aboutDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && /\.(png|jpe?g|webp|gif)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const aboutImages = await getAboutImageFiles();

  return (
    <div id="topo" className="bg-white text-slate-900">
      <main>
        <Hero navLinks={navLinks} />
        <About images={aboutImages} />
        <Destinations destinations={camocimDestinations} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
