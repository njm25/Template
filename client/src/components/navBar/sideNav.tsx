import Link from "next/link";
import { FaTimes } from "react-icons/fa"

interface SideNavProps {
  navItems: { name: string, href: string }[],
  toggleSideNav: () => void,
  isOpen: boolean
}

export default function SideNav(
  { navItems, 
    toggleSideNav, 
    isOpen 
  } : SideNavProps) 
{
  return (
    <div 
      className={`
        fixed top-0 left-0 w-full h-full transition-all duration-300 ease-in-out 
        ${isOpen ? 'bg-black/50 pointer-events-auto' : 'bg-transparent pointer-events-none'}
      `} 
      onClick={toggleSideNav}
    >

        <div 
          className={`
            background-secondary flex flex-col gap-4 p-4 fixed top-0 left-0 w-80 h-full transition-transform duration-300 ease-in-out 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `} 
          onClick={(e) => e.stopPropagation()}
        >

        <div onClick={toggleSideNav}>
            <FaTimes className="cursor-pointer"/>
        </div>

        <div className="flex flex-col gap-4">
            {navItems.map((item) => (
                <Link onClick={toggleSideNav} key={item.href} href={item.href}>{item.name}</Link>
            ))}
        </div>

      </div>
    </div>
  )
}