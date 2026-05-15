import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../App";
import vetDisclaimer from "../assets/images/vet-disclaimer.png";

function Disclaimer() {
  const t = useTranslation();

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-12 pb-24">

        <nav className="flex items-center gap-2 mb-6 text-[#50443f] text-sm">
          <Link to="/" className="hover:text-[#32190b]">{t.nav.home}</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-[#32190b] font-semibold">{t.nav.disclaimer}</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#32190b] mb-4">{t.disclaimer.title}</h1>
          <p className="text-lg text-[#50443f] leading-relaxed">{t.disclaimer.subtitle}</p>
        </div>

        <div className="bg-[#F4B400]/10 border-2 border-[#F4B400] rounded-xl p-6 md:p-10 mb-12 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">pets</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#F4B400] flex items-center justify-center text-[#32190b] flex-shrink-0">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#32190b] mb-2">{t.disclaimer.mainWarning}</h2>
              <p className="text-[#32190b]/80 mb-4 leading-relaxed">{t.disclaimer.mainText}</p>

              <div className="bg-white/70 p-4 rounded-lg border border-[#F4B400]/20">
                <p className="text-[#32190b] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  {t.disclaimer.acceptance}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon="science"
            title={t.disclaimer.limitations}
            text={t.disclaimer.limitationsText}
          />

          <div className="bg-white border border-[#d4c3bc] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-600">emergency</span>
              <h3 className="text-2xl font-semibold text-[#32190b]">{t.disclaimer.whenToSeeVet}</h3>
            </div>
            <ul className="space-y-2 text-[#50443f]">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm mt-1">check</span>
                {t.disclaimer.vetPoint1}
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm mt-1">check</span>
                {t.disclaimer.vetPoint2}
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm mt-1">check</span>
                {t.disclaimer.vetPoint3}
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm mt-1">check</span>
                {t.disclaimer.vetPoint4}
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm mt-1">check</span>
                {t.disclaimer.vetPoint5}
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#d4c3bc] p-6 rounded-xl shadow-sm md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#7a5900]">lock</span>
              <h3 className="text-2xl font-semibold text-[#32190b]">{t.disclaimer.dataPrivacy}</h3>
            </div>
            <p className="text-[#50443f] leading-relaxed">{t.disclaimer.dataPrivacyText}</p>
          </div>

          <div className="md:col-span-2 mt-4 rounded-xl overflow-hidden h-64 relative group">
            <img
              src={vetDisclaimer}
              alt="Veterinarian examining dog"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#32190b]/60 to-transparent flex items-end p-6">
              <p className="text-white italic">{t.disclaimer.mainWarning}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#d4c3bc] pt-12">
          <div className="max-w-md">
            <h4 className="text-2xl font-semibold text-[#32190b]">{t.clinics.title}</h4>
            <p className="text-[#50443f]">{t.clinics.subtitle}</p>
          </div>

          <Link
            to="/clinics"
            className="inline-flex items-center gap-2 bg-[#F4B400] text-[#32190b] font-semibold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            {t.results.findClinic}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-[#d4c3bc] p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-[#7a5900]">{icon}</span>
        <h3 className="text-2xl font-semibold text-[#32190b]">{title}</h3>
      </div>
      <p className="text-[#50443f] leading-relaxed">{text}</p>
    </div>
  );
}

export default Disclaimer;