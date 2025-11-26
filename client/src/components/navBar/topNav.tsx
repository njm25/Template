import Link from "next/link";
import { FaBars } from "react-icons/fa"

interface TopNavProps {
  navItems: { name: string, href: string }[],
  toggleSideNav: () => void
}   

export default function TopNav({ navItems, toggleSideNav }: TopNavProps) {
  return (
    <div className="background-secondary flex justify-between items-center py-4 px-4 md:px-8 lg:px-16 xl:px-80 drop-shadow-md w-full">

      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">njm25 Template</h1>
        <div className="hidden sm:flex gap-4">
          {navItems.map((item: { name: string, href: string }) => (
            <Link key={item.href} href={item.href}>{item.name}</Link>
          ))}
        </div>
      </div>

      <div 
        className="sm:hidden cursor-pointer"
        onClick={toggleSideNav}
      >
        <FaBars />
      </div>

    </div>
  )
}