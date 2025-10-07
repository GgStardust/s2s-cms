'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function PublicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFieldSystemsOpen, setIsFieldSystemsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Orb Explorer', href: '/orbs' },
    { name: 'Scrollstream', href: '/scrollstream' },
    { name: 'Resonance Library', href: '/library' },
    {
      name: 'Field Systems',
      href: '#',
      children: [
        { name: 'Star Love', href: '/fieldsystems/star-love' },
        { name: 'Quantum Architecture', href: '/fieldsystems/quantum' },
        { name: 'Galactic Structuring', href: '/fieldsystems/galactic' },
        { name: 'Sonic Architecture', href: '/fieldsystems/sonic' },
      ],
    },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-deep-navy/90 backdrop-blur-sm border-b border-deep-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-deep-gold rounded-full flex items-center justify-center">
              <span className="text-deep-navy font-bold text-sm">S2S</span>
            </div>
            <span className="text-creamy-white font-montserrat font-semibold">
              Stardust to Sovereignty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative group">
                    <button
                      className="flex items-center space-x-1 text-creamy-white hover:text-deep-gold transition-colors"
                      onMouseEnter={() => setIsFieldSystemsOpen(true)}
                      onMouseLeave={() => setIsFieldSystemsOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isFieldSystemsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-deep-navy/95 backdrop-blur-sm rounded-lg shadow-lg border border-deep-gold/20 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-creamy-white hover:text-deep-gold hover:bg-deep-gold/10 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-creamy-white hover:text-deep-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-creamy-white hover:text-deep-gold transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-deep-navy/95 backdrop-blur-sm border-t border-deep-gold/20">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setIsFieldSystemsOpen(!isFieldSystemsOpen)}
                        className="flex items-center justify-between w-full px-3 py-2 text-creamy-white hover:text-deep-gold transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isFieldSystemsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isFieldSystemsOpen && (
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-3 py-2 text-creamy-white/80 hover:text-deep-gold transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-creamy-white hover:text-deep-gold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
