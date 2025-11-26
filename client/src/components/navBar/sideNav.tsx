import Link from "next/link";
import { FaTimes } from "react-icons/fa"

interface SideNavProps {
  navItems: { name: string, href: string }[],
  toggleSideNav: () => void
}

export default function SideNav({ navItems, toggleSideNav }: SideNavProps) {
  return (
  <div className="fixed top-0 left-0 w-full h-full bg-black/50" onClick={toggleSideNav}>
    <div className="background-secondary flex flex-col gap-4 p-4 fixed top-0 left-0 w-80 h-full" onClick={(e) => e.stopPropagation()}>

      <div 
          onClick={toggleSideNav} 
      >
          <FaTimes className="cursor-pointer"/>
      </div>

      <div className="flex flex-col gap-4">
          {navItems.map((item: { name: string, href: string }) => (
              <Link onClick={toggleSideNav} key={item.href} href={item.href}>{item.name}</Link>
          ))}
      </div>

      </div>
    </div>
    
  )
}