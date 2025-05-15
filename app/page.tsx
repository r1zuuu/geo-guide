import Beginner from "@/components/diffbanners/BeginnerBanner";
import Intermediate from "@/components/diffbanners/IntermediateBanner";
import Pro from "@/components/diffbanners/ProBanner";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-4">🎯 Wybierz swoją GeoMetę! 🌍</h1>
      <p className="text-lg mb-6">Ucz się sprytniej, zgaduj trafniej.</p>
      <p className="text-md mb-8">
        👋 Witamy w aplikacji, która robi z Ciebie geo-mistrza! <br />
        Wybierz jeden z trzech poziomów trudności i wskocz do świata map,
        znaków, krajobrazów i mety słupów elektrycznych...
      </p>

      <h2 className="text-2xl font-semibold mb-4">🗺️ Co Cię czeka?</h2>
      <p className="text-lg font-semibold mb-2">Trzy poziomy trudności:</p>
      <ul className="list-disc list-inside mb-8">
        <li>
          ✨ <strong>Beginner</strong> – dla świeżaków, co jeszcze mylą Skandynawię z Kanadą
        </li>
        <li>
          💥 <strong>Intermediate</strong> – kiedy już znasz różnicę między drogą w Malezji a Tajlandii
        </li>
        <li>
          🔥 <strong>Pro</strong> – meta, gdzie liczy się cień słupa, krzaki przy drodze i kod pocztowy na śmietniku
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Beginner link="/beginner" />
        <Intermediate link="/intermediate" />
        <Pro link="/pro" />
      </div>

      <div className="mb-10 mt-10 text-black font-semibold text-3xl text-center flex flex-col items-center space-y-6">
        <p>A na początek może?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link href="/license-plates">
            <div
              className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-100 hover:scale-105 w-full h-64 flex items-center justify-center"
              style={{
          backgroundImage: "url('/tablica.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
              }}
            >
              <div className="relative p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Tablice rejestracyjne</h2>
              </div>
            </div>
          </Link>

          <Link href="/direction">
            <div
              className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-100 hover:scale-105 w-full h-64 flex items-center justify-center"
              style={{
          backgroundImage: "url('/car.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
              }}
            >
              <div className="relative p-6 text-white text-center">
          <h2 className="text-2xl font-bold text-black">Ruch lewo i prawo stronny</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
