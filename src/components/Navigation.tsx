"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAbout from "@/hooks/useAbout";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const { aboutData } = useAbout();
  const [isOpen, setIsOpen] = useState(false);
  
  const logoUrl = aboutData?.logo || "https://i.ibb.co/JWPpTbt9/hlssa-optimized-1000.png";
  const phoneRaw = aboutData?.contact || "+91 79939 94704";
  const telHref = `tel:${phoneRaw.replace(/\s+/g, "")}`;
  
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/achievements", label: "Achievements" },
    { href: "/matches", label: "Matches" },
    { href: "/news", label: "News" },
    { href: "/team", label: "Our Team" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px] md:h-[84px] items-center">
          <Link
            href="/"
            className="flex items-center flex-shrink-0 transition-transform duration-200 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            <img 
              src={logoUrl} 
              alt="Little Stars Football Academy Logo" 
              className="h-[40px] w-[56px] sm:h-[46px] sm:w-[64px] md:h-[68px] md:w-[94px] object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://i.ibb.co/JWPpTbt9/hlssa-optimized-1000.png";
              }}
            />
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                  pathname === link.href ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={telHref}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              Call Now
            </a>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 pt-1">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-2 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={telHref}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}