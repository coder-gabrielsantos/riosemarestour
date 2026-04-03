export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
        <p>© {new Date().getFullYear()} Rios e Mares Tour. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://coder-gabrielsantos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2a6eb9] transition hover:text-[#205e98]"
          >
            Gabriel Santos
          </a>
        </p>
      </div>
    </footer>
  );
}
