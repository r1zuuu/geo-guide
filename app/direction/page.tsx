import Image from "next/image";
import Link from "next/link";

export default function DirectionPage() {
    return (
        
        <div className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-4xl font-bold text-center mb-6">Which Side of the Road Do You Drive On?</h1>
            <div className="relative w-full max-w-2xl h-150 mb-6">
                <Image
                    src="https://zapfwshgivuvnzoosdym.supabase.co/storage/v1/object/public/geo-images//Which-Side-of-the-Roed-Do-You-Drive-On.png"
                    alt="Which Side of the Road Do You Drive On"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <p className="text-xl text-center mb-6 font-bold">
                Zasady ruchu drogowego różnią się na całym świecie. W niektórych krajach jeździ się po lewej stronie, w innych po prawej. Upewnij się, zanim wyruszysz w podróż!
            </p>
            <Link href="/" className="text-blue-500 underline text-lg mt-6">
                Jesteś gotowy? Sprawdź więcej wskazówek na stronie głównej!
            </Link>
        </div>
    );
}