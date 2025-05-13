'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Domeny() {
  const [results, setResults] = useState<{ country_name: string; koncowka: string }[]>([]);

  useEffect(() => {
    supabase
      .from('country_domains')
      .select('country_name, koncowka')
      .order('country_name', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setResults(data || []);
      });
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#196BEB]">Lista Domen</h1>
      <ul className="space-y-3">
        {results.map((item: any, index: number) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 rounded-lg border border-[#458DEA] bg-[#F0F8FF]"
          >
            <span className="text-black font-medium">{item.country_name}</span>
            <span className="text-[#196BEB] font-semibold">{item.koncowka}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
