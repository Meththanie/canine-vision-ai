import React from "react";
import { useTranslation } from "../App";
import aboutCareImage from "../assets/images/about-care.png";
import sriLankaDogImage from "../assets/images/sri-lanka-dog.png";

function About() {
  const t = useTranslation();

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-24">

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <h1 className="text-4xl font-bold text-[#32190b] mb-6">{t.about.heroTitle}</h1>
            <p className="text-lg text-[#50443f] leading-relaxed mb-8">{t.about.heroSubtitle}</p>

            <div className="flex gap-4">
              <div className="bg-[#F4B400] text-[#32190b] px-6 py-4 rounded-xl shadow-sm">
                <span className="text-2xl font-bold block">{t.about.accuracy}</span>
                <span className="text-xs uppercase tracking-wide">{t.about.accuracyLabel}</span>
              </div>
              <div className="bg-[#f4eddd] text-[#32190b] px-6 py-4 rounded-xl shadow-sm border border-[#d4c3bc]">
                <span className="text-2xl font-bold block">{t.about.availability}</span>
                <span className="text-xs uppercase tracking-wide">{t.about.availabilityLabel}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img src={aboutCareImage} alt="Compassionate care for dogs" className="rounded-3xl shadow-2xl border-4 border-white object-cover aspect-[4/3] w-full" />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block max-w-[200px]">
              <span className="material-symbols-outlined text-[#F4B400] text-4xl block mb-2">verified</span>
              <p className="text-sm text-[#32190b] font-bold">CanineVision</p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-[#32190b] mb-10 text-center">{t.about.commitmentTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CommitmentCard icon="health_and_safety" title={t.about.commitment1Title} text={t.about.commitment1Desc} />
            <CommitmentCard icon="location_on" title={t.about.commitment2Title} text={t.about.commitment2Desc} />
            <CommitmentCard icon="school" title={t.about.commitment3Title} text={t.about.commitment3Desc} />
          </div>
        </section>

        {/* AI Engine */}
        <section className="mb-24 bg-[#f4eddd] rounded-[2.5rem] px-10 py-14">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm text-[#7a5900] tracking-widest uppercase block mb-2">{t.about.engineSubtitle}</span>
              <h2 className="text-3xl font-semibold text-[#32190b]">{t.about.engineTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
              <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#361800]">neurology</span>
                  <span className="font-semibold text-[#32190b]">{t.about.engine1}</span>
                </div>
                <p className="text-[#50443f]">{t.about.engine1Desc}</p>
              </div>

              <div className="md:col-span-2 bg-[#7a5900] text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined">cloud_sync</span>
                  <span className="font-semibold">{t.about.engine2}</span>
                </div>
                <p className="text-white/90">{t.about.engine2Desc}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-[#F4B400] mb-2">storage</span>
                <p className="text-sm font-bold text-[#32190b] uppercase">{t.about.engine3}</p>
              </div>

              <div className="md:col-span-3 bg-[#4B2E1E] text-white rounded-2xl p-6 shadow-lg flex items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.about.engine4}</h4>
                  <p className="text-white/80">{t.about.engine4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sri Lanka Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <img src={sriLankaDogImage} alt="Street dog in Sri Lanka" className="w-full h-[400px] object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 bg-[#F4B400] text-[#32190b] px-6 py-2 rounded-full font-bold shadow-lg">
              {t.about.whySriLankaTitle}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-[#32190b] mb-6">{t.about.whySriLankaTitle}</h2>
            <p className="text-[#50443f] mb-4 leading-relaxed">{t.about.whySriLankaDesc1}</p>
            <p className="text-[#50443f] mb-6 leading-relaxed">{t.about.whySriLankaDesc2}</p>

            <ul className="space-y-3">
              <ListItem text={t.about.whySriLankaPoint1} />
              <ListItem text={t.about.whySriLankaPoint2} />
              <ListItem text={t.about.whySriLankaPoint3} />
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function CommitmentCard({ icon, title, text }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-[#8B5E3C]/10 shadow hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-[#faf3e2] rounded-lg flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#7a5900]">{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-[#32190b] mb-3">{title}</h3>
      <p className="text-[#50443f] leading-relaxed">{text}</p>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex items-center gap-3">
      <span className="material-symbols-outlined text-[#F4B400]">check_circle</span>
      <span>{text}</span>
    </li>
  );
}

export default About;