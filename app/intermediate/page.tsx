'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function IntermediatePage() {
  const [categories, setCategories] = useState<{ category: string; slug: string }[]>([]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("category")
        .eq("level", "intermediate");

      if (error) {
        console.error(error.message);
      } else {
        const unique = new Map();
        data.forEach((tip) => {
          const slug = slugify(tip.category);
          if (!unique.has(slug)) {
            unique.set(slug, { category: tip.category, slug });
          }
        });
        setCategories(Array.from(unique.values()));
      }
    };

    fetchTips();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🌍 Poziom Intermiediate</h1>
      <p className="text-lg mb-6">
        <strong>
          Masz już podstawy za sobą? W tej sekcji znajdziesz bardziej zaawansowane porady, które pomogą Ci doskonalić swoje umiejętności w GeoGuessr i lepiej rozpoznawać szczegóły geograficzne.
        </strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(({ category, slug }) => (
          <Link
            key={slug}
            href={`/intermediate/category/${slug}`}
            className="block bg-blue-100 rounded-lg shadow-md p-4 text-center hover:bg-blue-200 transition"
          >
            <h2 className="text-lg font-semibold">{category}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
