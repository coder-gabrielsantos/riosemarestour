export const navLinks = [
  { href: "#destinos", label: "Conheça Camocim" },
  { href: "#faq", label: "Quem somos nós" },
  { href: "#contato", label: "Contato" },
];

export const heroData = {
  badge: "Especialistas em experiencias inesqueciveis",
  title: "Explore o mundo com roteiros planejados para voce.",
  description:
    "Crie viagens com suporte completo, destinos selecionados e pacotes sob medida para casais, familias e grupos.",
  primaryCta: { href: "#contato", label: "Quero planejar minha viagem" },
  secondaryCta: { href: "#pacotes", label: "Ver pacotes" },
  stats: [
    { value: "15+", label: "anos de mercado" },
    { value: "4.9/5", label: "media de avaliacao" },
    { value: "20k+", label: "viajantes atendidos" },
  ],
  image:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
};

export const destinations = [
  {
    id: 1,
    name: "Patagonia, Argentina",
    description: "Lagos glaciais, trilhas e paisagens de tirar o folego.",
    duration: "7 dias",
    image:
      "https://images.unsplash.com/photo-1531168556467-80aace4d4792?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Santorini, Grecia",
    description: "Pores do sol romanticos e vistas panoramicas no Egeu.",
    duration: "6 dias",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Kyoto, Japao",
    description: "Templos historicos, gastronomia local e cultura viva.",
    duration: "8 dias",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Fernando de Noronha, Brasil",
    description: "Praias cristalinas e experiencias exclusivas no litoral.",
    duration: "5 dias",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

export const packages = [
  {
    id: 1,
    title: "Lua de Mel Premium",
    description:
      "Hospedagem boutique, experiencias gastronomicas e passeios privativos.",
    price: "A partir de R$ 8.900",
    includes: ["Passagens", "Hotel 4 estrelas", "Transfer in/out"],
  },
  {
    id: 2,
    title: "Aventura em Grupo",
    description:
      "Roteiro dinamico com trilhas, city tours e atividades ao ar livre.",
    price: "A partir de R$ 5.200",
    includes: ["Seguro viagem", "Guia local", "Passeios principais"],
  },
  {
    id: 3,
    title: "Familia sem Stress",
    description:
      "Planejamento completo com foco em conforto e atividades para criancas.",
    price: "A partir de R$ 6.700",
    includes: ["Hospedagem", "Roteiro personalizado", "Suporte 24h"],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Camila e Rafael",
    trip: "Italia",
    quote:
      "Tudo foi impecavel. A equipe montou um roteiro perfeito para nossa lua de mel.",
  },
  {
    id: 2,
    name: "Fernanda M.",
    trip: "Chile",
    quote:
      "Atendimento rapido, transparente e com excelentes indicacoes de passeio.",
  },
  {
    id: 3,
    name: "Familia Souza",
    trip: "Nordeste",
    quote:
      "Nossa viagem em familia foi tranquila do inicio ao fim. Super recomendamos.",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Vocês montam roteiros personalizados?",
    answer:
      "Sim. Entendemos seu perfil e montamos um roteiro sob medida com datas, estilo de viagem e budget.",
  },
  {
    id: 2,
    question: "Posso parcelar meu pacote?",
    answer:
      "Sim. Trabalhamos com opcoes de parcelamento e diferentes formas de pagamento.",
  },
  {
    id: 3,
    question: "A empresa oferece suporte durante a viagem?",
    answer:
      "Sim. Nosso time oferece suporte antes, durante e depois da viagem para garantir tranquilidade.",
  },
];
