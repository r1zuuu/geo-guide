import Link from "next/link";

export default function Beginner() {
    return (
        <Link href="/beginner">
            <div
                className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
                style={{
                    backgroundImage: "url('/easy.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="relative p-6 text-white text-center">
                    <h2 className="text-xl font-bold">Beginner</h2>
                </div>
            </div>
        </Link>
    );
}