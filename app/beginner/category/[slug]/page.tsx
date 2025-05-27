"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [tips, setTips] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("level", "beginner");

      if (error) {
        console.error(error.message);
      } else {
        const filtered = data.filter((tip) => slugify(tip.category) === slug);
        setTips(filtered);
        setCurrentPage(1);
      }
    };

    fetchTips();
  }, [slug]);

  const totalPages = Math.ceil(tips.length / ITEMS_PER_PAGE);
  const paginatedTips = tips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center">
        🌍 Poziom Beginner
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {tip.image_url && (
              <div className="w-full h-[300px] overflow-hidden rounded-md border border-blue-300 mb-4">
                <img
                  src={tip.image_url}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {tip.title}
            </h2>
            {tip.content && <p className="text-blue-800">{tip.content}</p>}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300 transition"
          >
            ◀ Wstecz
          </button>
          <span className="text-blue-800 font-semibold text-lg">
            Strona {currentPage} z {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300 transition"
          >
            Dalej ▶
          </button>
        </div>
      )}
    </main>
  );
}
