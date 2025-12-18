export default function Footer() {
    return (
        <footer className="mt-12 border-t">
            <div className="container py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>
                    @ {new Date().getFullYear()} AuroraStore. Todos os direitos reservados .

                </p>

                <div className="flex gap-4">
                    <a href="#" className="hover:text-gray-800">Termos</a>
                    <a href="#" className="hover:text-gray-800">Privacidade</a>
                    <a href="#" className="hover:text-gray-800">Contatos</a>
                </div>
            </div>
        </footer>
    );
}