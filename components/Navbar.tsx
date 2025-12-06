"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  return (
    <nav className="w-full border-b border-gray-100 h-16 flex items-center justify-between px-6 md:px-8 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/Logo1.png"
            alt="AniMa Logo"
            width={160}
            height={64}
            className="w-32 md:w-36 h-auto hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="hidden md:flex flex-grow justify-center">
        <div className="flex items-center gap-10">
          {[
            { name: "Home", href: "/" },
            { name: "Animals", href: "/animaux" },
            
            { name: "Dashboard", href: "/Dashboards" },
            { name: "Contact Us", href: "/contact-us" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="relative group">
                <span
                  className={`font-medium text-gray-700 text-sm transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-[#549aeb]"
                      : "hover:text-[#549aeb]"
                  }`}
                >
                  {link.name}
                </span>
                
                {/* Indicator for active link */}
                {isActive(link.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#549aeb] to-[#dc559c] rounded-full" />
                )}
                
                {/* Hover effect */}
                <div className="absolute -bottom-1 left-1/2 right-1/2 h-[1.5px] bg-gradient-to-r from-[#549aeb] to-[#dc559c] rounded-full group-hover:left-0 group-hover:right-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Auth buttons - Compact Design */}
      <div className="flex items-center gap-3">
        <Link href="/sign-in">
          <button className="relative overflow-hidden bg-gradient-to-r from-[#549aeb] to-[#4788d9] 
                           text-white font-semibold py-2 px-5 rounded-lg 
                           hover:shadow-md hover:shadow-blue-200 
                           transition-all duration-300 hover:scale-[1.02]
                           active:scale-[0.98] group text-sm"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span className="relative">Sign In</span>
          </button>
        </Link>
        
        <Link href="/sign-up">
          <button className="relative overflow-hidden bg-white 
                           border border-[#dc559c]
                           text-[#dc559c] font-semibold py-2 px-5 rounded-lg 
                           hover:bg-gradient-to-r hover:from-[#dc559c] hover:to-[#c94a8a]
                           hover:text-white hover:border-transparent
                           hover:shadow-md hover:shadow-pink-200
                           transition-all duration-300 hover:scale-[1.02]
                           active:scale-[0.98] group text-sm"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <span className="relative">Sign Up</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;