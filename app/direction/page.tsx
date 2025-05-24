'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DirectionPage() {
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
            <h1 className="text-4xl font-bold text-center mb-6">Which Side of the Road Do You Drive On?</h1>
            <div
                className="relative w-full max-w-2xl h-auto mb-6 border overflow-hidden"
                onMouseMove={handleDrag}
            >
                <div
                    className="cursor-grab"
                    style={{
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        transition: "transform 0.2s ease",
                    }}
                >
                    <Image
                        src="https://zapfwshgivuvnzoosdym.supabase.co/storage/v1/object/public/geo-images//Which-Side-of-the-Roed-Do-You-Drive-On.png"
                        alt="Which Side of the Road Do You Drive On"
                        width={800}
                        height={600}
                        draggable="false"
                    />
                </div>
            </div>
            <div className="flex space-x-4 mb-4">
                <button onClick={zoomIn} className="px-4 py-2 bg-blue-500 text-white rounded">+</button>
                <button onClick={zoomOut} className="px-4 py-2 bg-blue-500 text-white rounded">-</button>
                <button onClick={resetZoom} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
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