import ContactForm from "@/components/ContactForm";
import Destinations from "@/components/Destinations";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import { camocimDestinations } from "@/data/camocimDestinations";
import {
  faqs,
  navLinks,
  packages,
} from "@/data/mockData";

export default function Home() {
  return (
    <div id="topo" className="bg-white text-slate-900">
      <main>
        <Hero navLinks={navLinks} />
        <Destinations destinations={camocimDestinations} />
        <Packages packagesData={packages} />
        <Faq faqs={faqs} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
