import Link from "next/link";

interface ProBannerProps {
  link: string;
}
export default function Pro({ link }: ProBannerProps) {
  return (
    <Link href="/pro">
      <div
        className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
        style={{
          backgroundImage: "url('/hard.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 p-6 text-white text-center">
          <h2 className="text-xl font-bold">Pro</h2>
        </div>
      </div>
    </Link>
  );
}
