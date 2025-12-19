import Link from "next/link";
import { FaBars } from "react-icons/fa"

interface TopNavProps {
  navItems: { name: string, href: string }[],
  toggleSideNav: () => void
}   

export default function TopNav({ navItems, toggleSideNav }: TopNavProps) {
  return (
    <div 
      className="
        gradient-background drop-shadow-md 
        flex justify-between items-center flex-row-reverse sm:flex-row
        w-full py-4 px-4 md:px-8 lg:px-16 xl:px-80 
      "
    >
      <div className="sm:hidden"></div>
      
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">njm25 Template</h1>
        <div className="hidden sm:flex gap-4">
          {navItems.map((item) => (
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