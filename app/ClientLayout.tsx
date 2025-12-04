// app/ClientLayout.tsx
"use client";

import { usePathname } from 'next/navigation';
import NavBar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Pages où la navbar doit être cachée
  const noNavbarPages = ['/signIn', '/SignUp'];
  const showNavbar = !noNavbarPages.includes(pathname || '');

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}