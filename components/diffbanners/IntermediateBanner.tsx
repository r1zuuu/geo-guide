import Link from "next/link";

interface IntermediateBannerProps {
  link: string;
}
export default function Intermediate({ link }: IntermediateBannerProps) {
  return (
    <Link href="/intermediate">
      <div
        className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
        style={{
          backgroundImage: "url('/medium.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 p-6 text-white text-center">
          <h2 className="text-xl font-bold">Intermediate</h2>
        </div>
      </div>
    </Link>
  );
}
