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
    <nav className="w-[95%] mx-auto border-b h-[8vh] flex items-center justify-between px-4 rounded-bl-3xl rounded-br-3xl shadow-md shadow-slate-200">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/Logo2.jpg"
            alt="logo"
            width={150}
            height={50}
            className="w-[150px] h-[50%]"
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="flex-grow flex justify-center">
        <div className="flex flex-row items-center gap-10 px-4">
          {[
            { name: "Home", href: "/" },
            { name: "Dogs", href: "/dogs" },
            { name: "Cats", href: "/cats" },
            { name: "About Us", href: "/about-us" },
            { name: "Contact Us", href: "/contact-us" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <h3
                className={`font-semibold ${
                  isActive(link.href)
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black"
                }`}
              >
                {link.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-x-5">
        <Link href="/sign-in">
          <button className="bg-blue-400 font-extrabold text-white py-1 px-4 rounded hover:bg-blue-500">
            Sign In
          </button>
        </Link>
        <Link href="/sign-up">
          <button className="bg-white text-pink-400 border-2 font-extrabold border-pink-400 py-1 px-4 rounded hover:bg-pink-50">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
