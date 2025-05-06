'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function IntermediatePage() {
  const [tips, setTips] = useState<any[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("level", "intermediate");

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
      <h1 className="text-3xl font-bold mb-6">🌍 Poziom Intermediate</h1>
      <p className="text-lg mb-6">
        <strong>
          Jeśli masz już podstawowe doświadczenie z GeoGuessr, ta sekcja jest dla Ciebie. Znajdziesz tu bardziej zaawansowane porady, które pomogą Ci precyzyjniej określić lokalizację i poprawić swoje wyniki.
        </strong>
      </p>
      
      <p className="text-lg mb-4">
        Skupiamy się tu na wskazówkach, które wymagają większej uwagi i analizy, takich jak:
      </p>
      
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Znaki drogowe i ich szczegóły</strong> – kształty, kolory i język na znakach mogą być kluczowe.
        </li>
        <li>
          <strong>Styl architektury</strong> – różnice w budynkach mogą wskazywać na konkretne regiony.
        </li>
        <li>
          <strong>Roślinność i krajobraz</strong> – analiza przyrody może pomóc w zawężeniu lokalizacji.
        </li>
      </ul>
      
      <p className="text-lg mb-6">
        Na tym poziomie ważne jest, aby zwracać uwagę na szczegóły i łączyć różne wskazówki w całość. To pozwoli Ci na bardziej świadome i trafne zgadywanie.
      </p>
      
      <p className="text-lg font-semibold mb-6">
        🔎 Pamiętaj – praktyka czyni mistrza. Im więcej rund rozegrasz, tym lepiej nauczysz się rozpoznawać subtelne różnice między regionami.
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
