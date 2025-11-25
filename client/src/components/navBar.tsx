import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="background-secondary flex justify-start items-center py-4 px-80 drop-shadow-md">
        <h1 className="mr-4 text-2xl font-bold">njm25 Template</h1>
        <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </div>
    </nav>
  )
}