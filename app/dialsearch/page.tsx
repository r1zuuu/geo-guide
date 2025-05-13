'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DialSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ official_name_en: string; dial: string }[]>([]);

  const fetchData = async () => {
    if (search.trim() === '') {
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from('phone_codes')
      .select('official_name_en, dial')
      .ilike('dial', `%${search}%`);

    if (!error && data) {
      setResults(data);
    } else {
      console.error(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#196BEB]">Wyszukaj kraj po numerze kierunkowym</h1>
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Wpisz numer kierunkowy..."
          className="w-full py-3 pl-12 pr-4 rounded-lg border border-[#458DEA] focus:outline-none focus:ring-2 focus:ring-[#196BEB]"
        />
        <button
          onClick={fetchData}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#458DEA] hover:text-[#196BEB]"
          aria-label="Search"
        >
          <Image src="/search.svg" alt="Search" width={24} height={24} />
        </button>
      </div>
      <ul className="space-y-3">
        {results.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 rounded-lg border border-[#458DEA] bg-[#F0F8FF]"
          >
            <span className="text-black font-medium">{item.official_name_en}</span>
            <span className="text-[#196BEB] font-semibold">{item.dial}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
