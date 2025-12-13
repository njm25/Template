import Link from "next/link";
import { FaTimes } from "react-icons/fa"

interface SideNavProps {
	navItems: { name: string, href: string }[],
	toggleSideNav: () => void,
	isOpen: boolean
}

export default function SideNav(
	{
		navItems,
		toggleSideNav,
		isOpen
	}: SideNavProps
) {
	return (
		<div
			className={`
				sidenav-overlay transition-all duration-300 ease-in-out
				${isOpen ? "bg-black/50 pointer-events-auto" : "bg-transparent pointer-events-none"}
			`}
			onClick={toggleSideNav}
		>
			<div
				className={`
					sidenav-panel fixed top-0 left-0 h-full w-80
					flex flex-col gap-4 p-4
					transition-transform duration-300 ease-in-out
					${isOpen ? "translate-x-0" : "-translate-x-full"}
				`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between">
					<p className="font-semibold text-white">Menu</p>
					<div onClick={toggleSideNav}>
						<FaTimes className="cursor-pointer text-gray-200 hover:text-white transition-colors" />
					</div>
				</div>

				<div className="h-px w-full bg-white/10" />

				<div className="flex flex-col">
					{navItems.map((item, index) => (
						<Link
							className="side-nav-content rounded-md px-3 py-2 text-gray-200 hover:bg-white/5 hover:text-white transition-colors"
							onClick={toggleSideNav}
							key={item.href}
							href={item.href}
						>
							{item.name}
              
              {index !== navItems.length - 1 && (
                <div className="h-px mt-5 w-full bg-white/5" />
              )}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
