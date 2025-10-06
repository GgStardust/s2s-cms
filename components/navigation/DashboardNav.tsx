'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explorer', label: 'Field Map' },
    { href: '/consulting', label: 'Consulting' }
  ];

  return (
    <nav className="bg-deep-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-creamy-white hover:opacity-80 transition-opacity duration-200">
            Stardust to Sovereignty
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-deep-gold text-deep-navy'
                    : 'text-creamy-white hover:text-creamy-white hover:bg-deep-gold/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/consulting"
              className="px-4 py-2 bg-deep-gold text-deep-navy rounded-lg font-medium text-sm hover:bg-creamy-white transition-colors duration-200"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
