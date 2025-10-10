'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function PublicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFieldSystemsOpen, setIsFieldSystemsOpen] = useState(false);

  const navigation = [
    { name: 'Field Input', href: '/field-input' },
    { name: 'Living Intelligence', href: '/orb-explorer' },
    { name: 'Resonance Library', href: '/library' },
    {
      name: 'Field Systems',
      href: '#',
      children: [
        { name: 'Quantum Architecture', href: '/field-systems/quantum' },
        { name: 'Galactic Structuring', href: '/field-systems/galactic' },
        { name: 'Somatic Signal Tracker', href: '/field-systems/somatic' },
      ],
    },
  ];

  return (
    <nav className="bg-midnight/95 backdrop-blur-md border-b border-bright-orange/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-creamy-white font-montserrat font-semibold tracking-wide">
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
                      className="flex items-center space-x-1 text-creamy-white hover:text-bright-orange transition-all duration-300 relative group font-montserrat text-sm tracking-wide"
                      onMouseEnter={() => setIsFieldSystemsOpen(true)}
                      onMouseLeave={() => setIsFieldSystemsOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-bright-orange to-deep-gold group-hover:w-full transition-all duration-300"></span>
                    </button>

                    {isFieldSystemsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-midnight/98 backdrop-blur-md rounded-lg shadow-xl border border-bright-orange/30 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-creamy-white hover:text-bright-orange hover:bg-bright-orange/10 transition-all duration-200 font-lora text-sm"
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
                    className="relative text-creamy-white hover:text-bright-orange transition-all duration-300 group font-montserrat text-sm tracking-wide"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-bright-orange to-deep-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-creamy-white hover:text-bright-orange transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-midnight/98 backdrop-blur-md border-t border-bright-orange/20">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setIsFieldSystemsOpen(!isFieldSystemsOpen)}
                        className="flex items-center justify-between w-full px-3 py-2 text-creamy-white hover:text-bright-orange transition-all duration-200 font-montserrat text-sm"
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
                              className="block px-3 py-2 text-creamy-white/80 hover:text-bright-orange hover:bg-bright-orange/5 rounded transition-all duration-200 font-lora text-sm"
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
                      className="block px-3 py-2 text-creamy-white hover:text-bright-orange transition-all duration-200 font-montserrat text-sm"
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
