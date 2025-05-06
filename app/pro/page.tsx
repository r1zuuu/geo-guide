'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function ProPage() {
  const [tips, setTips] = useState<any[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("level", "pro");

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
      <h1 className="text-3xl font-bold mb-6">🌍 Poziom Pro</h1>
      <p className="text-lg mb-6">
        <strong>
          Jeśli jesteś doświadczonym graczem GeoGuessr i szukasz wyzwań na najwyższym poziomie, ta sekcja jest dla Ciebie. Znajdziesz tu zaawansowane wskazówki, które pomogą Ci osiągnąć mistrzostwo w precyzyjnym określaniu lokalizacji.
        </strong>
      </p>      
      <p className="text-lg mb-6">
        Na tym poziomie kluczowe jest łączenie wiedzy z różnych dziedzin i szybkie podejmowanie decyzji. Każdy szczegół może być istotny, a doświadczenie i intuicja odgrywają ogromną rolę.
      </p>
      
      <p className="text-lg font-semibold mb-6">
        🏆 Pamiętaj – mistrzostwo wymaga czasu i zaangażowania. Nieustannie doskonal swoje umiejętności i podejmuj nowe wyzwania, aby osiągnąć perfekcję.
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
