'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Image } from 'next/image';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wyszukaj kraj po numerze kierunkowym</h1>
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Wyszukaj nr kierunkowy"
          className="w-full p-2 pl-10 border rounded"
        />
        <button
          onClick={fetchData}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          aria-label="Search"
        >
          <Image src="/search.svg" alt="Search" width={20} height={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {results.map((item, index) => (
          <li key={index} className="border p-2 rounded">
            <strong>{item.official_name_en}</strong> — {item.dial}
          </li>
        ))}
      </ul>
    </div>
  );
}
