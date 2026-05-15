import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../App";
import cataractImg from "../assets/images/cataract.jpg";
import cherryEyeImg from "../assets/images/cherry-eye.jpg";
import conjunctivitisImg from "../assets/images/conjunctivitis.jpg";
import cornealUlcerImg from "../assets/images/corneal-ulcer.jpg";
import entropionImg from "../assets/images/entropion.webp";
import healthyImg from "../assets/images/healthy.jpg";

function Diseases() {
  const t = useTranslation();

  const diseases = [
    {
      key: "cataract",
      icon: "blur_on",
      badgeClass: "bg-red-100 text-red-800",
      image: cataractImg,
    },
    {
      key: "cherryEye",
      icon: "emergency",
      badgeClass: "bg-[#F4B400] text-[#32190b]",
      image: cherryEyeImg,
    },
    {
      key: "conjunctivitis",
      icon: "medical_services",
      badgeClass: "bg-[#e9e2d2] text-[#50443f]",
      image: conjunctivitisImg,
    },
    {
      key: "cornealUlcer",
      icon: "healing",
      badgeClass: "bg-red-100 text-red-800",
      image: cornealUlcerImg,
    },
    {
      key: "entropion",
      icon: "unfold_less",
      badgeClass: "bg-[#ffdcc5] text-[#301400]",
      image: entropionImg,
    },
    {
      key: "healthy",
      icon: "stars",
      badgeClass: "bg-[#ffdea3] text-[#261900]",
      image: healthyImg,
    },
  ];

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <main className="min-h-screen relative">
        <header className="max-w-7xl mx-auto px-8 pt-16 pb-12 text-center">
          <h1 className="text-5xl font-bold text-[#32190b] mb-6">{t.diseases.title}</h1>
          <p className="text-lg text-[#50443f] max-w-2xl mx-auto leading-relaxed">{t.diseases.subtitle}</p>
        </header>

        <section className="max-w-7xl mx-auto px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease) => (
              <DiseaseCard
                key={disease.key}
                name={t.diseases[disease.key].name}
                diseaseKey={disease.key}
                badge={t.diseases[disease.key].badge}
                desc={t.diseases[disease.key].description}
                icon={disease.icon}
                badgeClass={disease.badgeClass}
                image={disease.image}
                action={
                  disease.key === "healthy"
                    ? t.diseases.preventiveCare
                    : t.diseases.detailedSymptoms
                }
              />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 mb-24">
          <div className="bg-[#4B2E1E] rounded-xl p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold text-white mb-2">{t.diseases.ctaTitle}</h2>
              <p className="text-stone-300">{t.diseases.ctaSubtitle}</p>
            </div>

            <Link
              to="/upload"
              className="bg-[#F4B400] text-[#32190b] px-20 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all active:scale-95 shadow-lg relative z-10"
            >
              {t.diseases.ctaButton}
            </Link>

            <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[240px] text-white opacity-[0.03]">pets</span>
          </div>
        </section>
      </main>
    </div>
  );
}

function DiseaseCard({
  name,
  badge,
  icon,
  badgeClass,
  desc,
  action,
  diseaseKey,
  image
}) {
  return (
    <div className="bg-white border border-[#8B5E3C]/20 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">

      <div className="flex items-start gap-4 mb-4 relative z-10">

        {/* image icon (small square) */}
        <div className="w-14 h-14 bg-[#f4eddd] rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-[#32190b]">{name}</h3>
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
            {badge}
          </span>
        </div>

      </div>

      <p className="text-[#50443f] leading-relaxed relative z-10">{desc}</p>

      <div className="mt-6 pt-6 border-t border-[#f4eddd] relative z-10">
        <Link
          to={`/diseases/${
            diseaseKey === "cherryEye"
              ? "cherry-eye"
              : diseaseKey === "cornealUlcer"
              ? "corneal-ulcer"
              : diseaseKey
          }`}
          className="text-[#7a5900] font-semibold flex items-center gap-1 hover:gap-2 transition-all"
        >
          {action}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-[#8B5E3C] opacity-[0.03] select-none">
        pets
      </span>
    </div>
  );
}

export default Diseases;