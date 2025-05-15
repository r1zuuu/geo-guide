import Image from "next/image";
import Link from "next/link";

export default function RegisterPlatesPage() {
    return (
        
        <div className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-4xl font-bold text-center mb-6">Mapa z Tablicami Rejestracyjnymi</h1>
            <div className="relative w-full max-w-2xl h-150 mb-6">
                <Image
                    src="https://zapfwshgivuvnzoosdym.supabase.co/storage/v1/object/public/geo-images//i8pd0zzakst91.webp"
                    alt="Mapa z tablicami rejestracyjnymi"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <p className="text-lg text-center mb-6 font-bold">
                Poniżej znajduje się obrazek przedstawiający mapę z tablicami rejestracyjnymi. Możesz zobaczyć różne regiony i ich oznaczenia na mapie.
            </p>
            <Link href="/" className="text-blue-500 underline text-lg mt-6">
                Jesteś gotowy? Sprawdź więcej wskazówek na stronie głównej!
            </Link>
        </div>
    );
}