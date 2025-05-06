'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function EasyPage() {
  const [tips, setTips] = useState<any[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("level", "beginner");

      if (error) {
        console.error(error.message);
      } else {
        setTips(data);
      }
    };

    fetchTips();
  }, []);

  const categories = [...new Set(tips.map((tip) => tip.category))];

  const toggle = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🌍 Poziom Beginner</h1>
    <p className="text-lg mb-6">
      <strong>
        Jeśli dopiero zaczynasz przygodę z GeoGuessr, ta sekcja jest dla Ciebie. Znajdziesz tu podstawowe porady, które pomogą Ci szybko rozpoznać kraj lub region, nawet bez znajomości mapy.
      </strong>
    </p>
    
    <p className="text-lg mb-4">
      Skupiamy się tu na najłatwiejszych i najbardziej rozpoznawalnych wskazówkach, takich jak:
    </p>
    
    <ul className="list-disc list-inside mb-6">
      <li>
        <strong>Strona ruchu drogowego</strong> – czyli czy samochody jeżdżą po lewej, czy po prawej stronie.
      </li>
      <li>
        <strong>Wygląd języka i alfabetu</strong> – bo często można wiele zgadnąć tylko po kształcie liter!
      </li>
    </ul>
    
    <p className="text-lg mb-6">
      To wszystko są rzeczy, które można zauważyć już w pierwszych kilku sekundach rundy – bez konieczności klikania dalej.
    </p>
    
    <p className="text-lg font-semibold mb-6">
      🔎 Pamiętaj – na tym poziomie nie chodzi o perfekcję, tylko o łapanie ogólnych tropów. Naucz się rozpoznawać podstawowe schematy, a szybciej przejdziesz do wyższych poziomów.
    </p>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <button
            className="text-xl font-semibold mb-2 hover:underline"
            onClick={() => toggle(category)}
          >
            {openCategories.includes(category) ? "▼" : "▶"} {category}
          </button>

          {openCategories.includes(category) &&
            tips
              .filter((tip) => tip.category === category)
              .map((tip) => (
                <div key={tip.id} className="mt-2 mb-4 border p-4 rounded">
                  <h2 className="text-lg font-medium mb-1">{tip.title}</h2>
                  <p className="text-gray-700 mb-2 whitespace-pre-line">{tip.content}</p>
                  {tip.image_url && (
                    <div className="relative w-full h-64">
                      <Image
                        src={tip.image_url}
                        alt={tip.title}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
        </div>
      ))}
    </main>
  );
}
