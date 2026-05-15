import React, { useState } from "react";
import { useTranslation } from "../App";
import clinicColombo from "../assets/images/clinic-colombo.png";
import clinicKandy from "../assets/images/clinic-kandy.png";
import clinicNegombo from "../assets/images/clinic-negombo.png";
import clinicRoyal from "../assets/images/clinic-royal.png";
import clinicNetwork from "../assets/images/clinic-network.png";

const clinics = [
  { name: "Colombo Pet Hospital", region: "Colombo", address: "124 Bullers Rd, Colombo 00700, Sri Lanka", phone: "+94 11 258 1234", rating: 4.9, badge: "Open Now", image: clinicColombo },
  { name: "Kandy Vets Care", region: "Kandy", address: "15 Peradeniya Rd, Kandy 20000, Sri Lanka", phone: "+94 81 223 4567", rating: 4.7, badge: "24/7 Service", image: clinicKandy },
  { name: "Southern Paws Center", region: "Galle", address: "88 Matara Rd, Galle 80000, Sri Lanka", phone: "+94 91 445 6789", rating: 4.5, badge: "Closes 6PM", image: null },
  { name: "Negombo Pet Sanctuary", region: "Colombo", address: "200 Main St, Negombo 11500, Sri Lanka", phone: "+94 31 222 1111", rating: 4.8, badge: "Premium", image: clinicNegombo },
  { name: "Royal Vet Hospital", region: "Kandy", address: "12 Library Rd, Kurunegala 60000, Sri Lanka", phone: "+94 37 455 2222", rating: 4.6, badge: "Open Now", image: clinicRoyal },
];

const regions = ["All Regions", "Colombo", "Kandy", "Galle"];

function Clinics() {
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filteredClinics = clinics.filter((clinic) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      clinic.name.toLowerCase().includes(search) ||
      clinic.address.toLowerCase().includes(search);
    const matchesRegion =
      selectedRegion === "All Regions" || clinic.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <main className="pt-12 pb-20 px-8 max-w-7xl mx-auto">
        <header className="mb-12 space-y-6">
          <h1 className="text-4xl font-bold text-[#32190b]">{t.clinics.title}</h1>
          <p className="text-lg text-[#50443f] max-w-2xl leading-relaxed">{t.clinics.subtitle}</p>
        </header>

        <section className="mb-12 bg-[#f4eddd] p-6 rounded-xl border border-[#d4c3bc]/60 flex flex-col md:flex-row gap-6 shadow-sm">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#82746e]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#82746e] rounded-lg outline-none focus:ring-2 focus:ring-[#7a5900]"
              placeholder={t.clinics.searchPlaceholder}
              type="text"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? "bg-[#7a5900] text-white shadow-md"
                    : "border border-[#82746e] text-[#50443f] hover:bg-[#e9e2d2]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <ClinicCard key={clinic.name} clinic={clinic} t={t} />
          ))}
          <EmergencyCard t={t} />
        </section>

        <section className="mt-20 p-12 bg-[#f4eddd] rounded-2xl border border-[#d4c3bc]/60 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold text-[#32190b]">{t.clinics.networkTitle}</h2>
            <p className="text-[#50443f] leading-relaxed">{t.clinics.networkDesc}</p>
            <div className="flex gap-8">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="material-symbols-outlined text-[#7a5900]">verified_user</span>
                {t.clinics.vettedStaff}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="material-symbols-outlined text-[#7a5900]">share</span>
                {t.clinics.instantSharing}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden shadow-lg">
            <img src={clinicNetwork} alt="Clinic network" className="w-full h-full object-cover" />
          </div>
        </section>
      </main>
    </div>
  );
}

function ClinicCard({ clinic, t }) {
  return (
    <div className="bg-white border border-[#d4c3bc] rounded-xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
      <div>
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          {clinic.image ? (
            <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-[#e9e2d2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#4B2E1E]/20 text-6xl">map</span>
            </div>
          )}
          <span className="absolute top-3 right-3 bg-[#F4B400]/90 text-[#32190b] text-xs font-bold px-3 py-1 rounded-full">{clinic.badge}</span>
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-semibold text-[#32190b] group-hover:text-[#7a5900]">{clinic.name}</h3>
          <div className="flex items-center text-[#7a5900]">
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="font-bold text-sm ml-1">{clinic.rating}</span>
          </div>
        </div>

        <div className="space-y-3 text-[#50443f] mb-6">
          <p className="flex items-start gap-2 text-sm">
            <span className="material-symbols-outlined text-[#7a5900] shrink-0">location_on</span>
            {clinic.address}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-[#7a5900] shrink-0">call</span>
            {clinic.phone}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}className="flex-1 py-3 bg-[#7a5900] text-white rounded-lg text-sm text-center hover:opacity-90 active:scale-95 transition-all">
          {t.clinics.contact}
        </a>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border border-[#82746e] text-[#7a5900] rounded-lg hover:bg-[#e9e2d2]"
        >
  <span className="material-symbols-outlined">map</span>
</a>
      </div>
    </div>
  );
}

function EmergencyCard({ t }) {
  return (
    <div className="bg-[#4B2E1E] rounded-xl p-8 shadow-lg border-2 border-[#7a5900] flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
      <div className="absolute -bottom-4 -right-4 opacity-10">
        <span className="material-symbols-outlined text-9xl">emergency</span>
      </div>

      <div className="w-16 h-16 bg-[#7a5900]/20 rounded-full flex items-center justify-center mb-6 border-2 border-[#7a5900]">
        <span className="material-symbols-outlined text-[#F4B400] text-3xl">emergency_home</span>
      </div>

      <h3 className="text-2xl font-semibold mb-3">{t.clinics.emergencyTitle}</h3>
      <p className="text-sm text-white/80 mb-8 max-w-[220px]">{t.clinics.emergencyDesc}</p>

      <a
        href="https://www.google.com/maps/search/emergency+veterinary+clinic+near+me"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 bg-[#7a5900] text-white rounded-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all block text-center"
      >
  {t.clinics.emergencyButton}
</a>
    </div>
  );
}

export default Clinics;