import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../App";

function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-stone-50 w-full border-t border-stone-200 pt-12 pb-8 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">

        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            medical_services
          </span>
          <span className="text-xl font-bold text-[#4B2E1E] font-manrope">
            CanineVision
          </span>
        </div>

        {/* CENTER - Copyright */}
        <p className="font-manrope text-xs uppercase tracking-widest text-stone-500 opacity-80">
          {t.footer.copyright}
        </p>

        {/* RIGHT - Links */}
        <div className="flex gap-8">
          <Link
            to="/disclaimer"
            className="font-manrope text-xs uppercase tracking-widest text-stone-500 hover:text-[#8B5E3C] transition-colors opacity-80 hover:opacity-100"
          >
            {t.nav.disclaimer}
          </Link>

          <Link
            to="/about"
            className="font-manrope text-xs uppercase tracking-widest text-stone-500 hover:text-[#8B5E3C] transition-colors opacity-80 hover:opacity-100"
          >
            {t.nav.about}
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;