export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Rios e Mares Tour. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href="#topo" className="hover:text-[#2a6eb9]">
            Voltar ao topo
          </a>
          <a href="#contato" className="hover:text-[#2a6eb9]">
            Fale conosco
          </a>
        </div>
      </div>
    </footer>
  );
}
