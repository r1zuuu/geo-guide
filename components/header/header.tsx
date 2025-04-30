import Image from "next/image"
export default function Header(){
    return(
        <header className="bg-white shadow-md mb-6">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Image src="/logo.png" alt="Logo" width={250} height={50}/>
            </div>
        </header>
    )
}