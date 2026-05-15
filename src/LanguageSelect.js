import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../App";

function LanguageSelect() {
  const { changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang) => {
    changeLanguage(lang);
    navigate("/");
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen flex flex-col text-[#1e1c12] relative overflow-hidden">
      <header className="w-full h-24 flex items-center justify-center px-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#7a5900] text-4xl">
            pets
          </span>
          <h1 className="text-3xl font-bold text-[#32190b]">CanineVision</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-8 py-12 relative">
        <div className="absolute -bottom-16 -right-16 opacity-5 pointer-events-none rotate-12">
          <span className="material-symbols-outlined text-[380px] text-[#32190b]">
            pets
          </span>
        </div>

        <div className="text-center mb-12 max-w-2xl relative z-10">
          <h2 className="text-5xl font-bold text-[#32190b] mb-4">
            Select Your Language
          </h2>
          <p className="text-lg text-[#50443f]">
            Choose your preferred language to proceed with veterinary AI diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
          <LanguageCard
            icon="language"
            title="English"
            subtitle="Global Standard"
            buttonText="Continue in English"
            onClick={() => handleSelect("en")}
          />

          <LanguageCard
            icon="home_health"
            title="සිංහල"
            subtitle="Sinhala"
            buttonText="සිංහලෙන් ඉදිරියට"
            onClick={() => handleSelect("si")}
          />

          <LanguageCard
            icon="medical_services"
            title="தமிழ்"
            subtitle="Tamil"
            buttonText="தமிழில் தொடரவும்"
            onClick={() => handleSelect("ta")}
          />
        </div>

        <div className="mt-20 text-center z-10">
          <p className="text-[#50443f]">
            Need help?{" "}
            <a
              href="mailto:support@caninevision.lk"
              className="text-[#7a5900] font-bold hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </main>

      <footer className="w-full border-t border-stone-200 bg-stone-50 pt-12 pb-8 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="text-xl font-bold text-[#4B2E1E] flex items-center gap-2">
            <span className="material-symbols-outlined">pets</span>
            CanineVision
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/about"
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-[#8B5E3C]"
            >
              About
            </Link>
            <Link
              to="/disclaimer"
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-[#8B5E3C]"
            >
              Disclaimer
            </Link>
          </div>

          <p className="text-xs uppercase tracking-widest text-stone-500">
            © 2026 CanineVision Veterinary AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function LanguageCard({ icon, title, subtitle, buttonText, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center p-12 bg-white border border-[#d4c3bc]/50 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-[#eee8d7] flex items-center justify-center mb-8 group-hover:bg-[#F4B400] transition-colors">
        <span className="material-symbols-outlined text-5xl text-[#32190b]">
          {icon}
        </span>
      </div>

      <h3 className="text-4xl font-semibold text-[#32190b] mb-3">{title}</h3>

      <p className="text-sm text-[#50443f] uppercase tracking-[0.3em] mb-14">
        {subtitle}
      </p>

      <div className="w-full py-3 px-4 rounded-lg border border-[#d4c3bc] text-lg text-[#32190b] group-hover:bg-[#F4B400] group-hover:border-[#F4B400] transition-all">
        {buttonText}
      </div>

      <div className="absolute bottom-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <span className="material-symbols-outlined text-6xl">pets</span>
      </div>
    </button>
  );
}

export default LanguageSelect;