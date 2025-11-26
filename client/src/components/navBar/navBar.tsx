"use client";
import SideNav from "./sideNav";
import TopNav from "./topNav";
import { useState } from "react";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav>

      <TopNav navItems={navItems} toggleSideNav={toggleSideNav} />

      {isOpen && 
        <SideNav navItems={navItems} toggleSideNav={toggleSideNav} />
      }

    </nav>
  )
}