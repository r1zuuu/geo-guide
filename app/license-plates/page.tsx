'use client'
import Link from "next/link";
import { useState } from "react";

export default function RegisterPlatesPage() {
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 5));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 1));
    const resetZoom = () => {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.buttons !== 1) return; 
        setTranslateX((prev) => prev + e.movementX);
        setTranslateY((prev) => prev + e.movementY);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-4xl font-bold text-center mb-6">Mapa z Tablicami Rejestracyjnymi</h1>
            <div className="relative w-full max-w-2xl h-auto mb-6 border overflow-hidden">
                <div
                    className="cursor-grab"
                    onMouseMove={handleDrag}
                    style={{
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        transition: "transform 0.2s ease",
                    }}
                >
                    <img
                        src="https://zapfwshgivuvnzoosdym.supabase.co/storage/v1/object/public/geo-images//i8pd0zzakst91.webp"
                        alt="Mapa z tablicami rejestracyjnymi"
                        className="w-full h-auto"
                        draggable="false"
                    />
                </div>
            </div>
            <div className="flex space-x-4 mb-4">
                <button onClick={zoomIn} className="px-4 py-2 bg-blue-500 text-white rounded">+</button>
                <button onClick={zoomOut} className="px-4 py-2 bg-blue-500 text-white rounded">-</button>
                <button onClick={resetZoom} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
            </div>
            <p className="text-lg text-center mb-6 font-bold">
                Powyżej znajduje się obrazek przedstawiający mapę z tablicami rejestracyjnymi. Możesz zobaczyć różne regiony i ich oznaczenia na mapie.
            </p>
            <Link href="/" className="text-blue-500 underline text-lg mt-6">
                Jesteś gotowy? Sprawdź więcej wskazówek na stronie głównej!
            </Link>
        </div>
    );
}