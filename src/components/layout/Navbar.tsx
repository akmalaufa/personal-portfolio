"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Logic Pintar: Kalau lagi di Home, pakai hash (#) biar bisa smooth scroll.
  // Kalau lagi di halaman lain, arahkan kembali ke route Root (/) lalu lompat ke hash-nya.
  // Khusus CONTACT, dibiarkan pakai hash saja karena Footer bersifat global (ada di semua halaman).
  const navLinks = [
    { name: "SKILLS", href: isHome ? "#skills" : "/#skills" },
    { name: "EXPERIENCE", href: isHome ? "#experience" : "/#experience" },
    { name: "PROJECTS", href: isHome ? "#projects" : "/#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center mix-blend-difference text-white transition-all duration-300">
      
      {/* LOGO */}
      <Link 
        href="/" 
        className="font-[family-name:var(--font-space-grotesk)] font-bold text-xl tracking-tighter hover:opacity-60 transition-opacity"
      >
        AKMAL
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* MOBILE HAMBURGER BUTTON */}
      <button 
        className="md:hidden flex flex-col gap-1.5 p-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
        <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
      </button>

      {/* MOBILE MENU DROPDOWN */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black transition-all duration-300 overflow-hidden flex flex-col ${isOpen ? 'max-h-64 py-6' : 'max-h-0 py-0'}`}
      >
        <div className="flex flex-col items-center gap-6 text-sm tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
