'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [tips, setTips] = useState<any[]>([]);

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
        .select("*")
        .eq("level", "pro");

      if (error) {
        console.error(error.message);
      } else {
        const filtered = data.filter((tip) => slugify(tip.category) === slug);
        setTips(filtered);
      }
    };

    fetchTips();
  }, [slug]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🌍 Poziom Pro</h1>
      <div className="space-y-4">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-gray-100 p-4 rounded shadow flex flex-col md:flex-row items-center md:items-start gap-4"
          >
            {tip.image_url && (
              <img
                src={tip.image_url}
                alt={tip.title}
                className="w-full md:w-1/2 h-auto rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-2">{tip.title}</h2>
              {tip.content && <p className="text-base">{tip.content}</p>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}