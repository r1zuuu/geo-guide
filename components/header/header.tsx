import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md mb-6">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/">
          <Image src="/logo.png" alt="Logo" width={200} height={50} />
        </a>
        <div className="flex space-x-6">
          <a
            href="/dialsearch"
            className="text-[#196BEB] hover:text-[#458DEA] font-semibold"
          >
            Dial Search
          </a>
          <a
            href="/domains"
            className="text-[#196BEB] hover:text-[#458DEA] font-semibold"
          >
            Domeny
          </a>
        </div>
      </div>
    </header>
  );
}
