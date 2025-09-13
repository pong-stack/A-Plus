'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col ${
      isAdminRoute 
        ? 'bg-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {!isAdminRoute && <Navigation />}
      
      <main className="flex-grow">{children}</main>
      
      {!isAdminRoute && <Footer />}
    </div>
  );
}