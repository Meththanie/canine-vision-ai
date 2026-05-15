import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation, useLanguage } from "../App";

function Navbar() {
  const t = useTranslation();
  const { changeLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: t.nav.home },
    { path: "/upload", label: t.nav.upload },
    { path: "/diseases", label: t.nav.diseases },
    { path: "/clinics", label: t.nav.clinics },
    { path: "/about", label: t.nav.about },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#4B2E1E] sticky top-0 z-50 border-b border-[#8B5E3C]/20 shadow-lg shadow-[#4B2E1E]/10">
      <nav className="flex justify-between items-center px-8 h-20 w-full max-w-7xl mx-auto">
        <Link
          to="/"
          className="font-manrope text-2xl font-black text-stone-50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[#F4B400] text-3xl">
            pets
          </span>
          CanineVision
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-manrope text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors rounded-lg ${
                isActive(link.path)
                  ? "text-[#F4B400] border-b-2 border-[#F4B400] pb-1"
                  : "text-stone-200/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => changeLanguage("")}
            className="flex items-center gap-2 text-stone-200/80 hover:text-white transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">language</span>
            <span className="font-manrope text-sm tracking-wide hidden sm:inline">
              {t.nav.language}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-200/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#4B2E1E] border-t border-[#8B5E3C]/20 px-8 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 font-manrope text-sm tracking-wide border-b border-[#8B5E3C]/10 ${
                isActive(link.path)
                  ? "text-[#F4B400] font-bold"
                  : "text-stone-200/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;