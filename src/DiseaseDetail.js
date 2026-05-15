import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation, useLanguage } from "../App";
import cataractImg from "../assets/images/cataract.jpg";
import cherryEyeImg from "../assets/images/cherry-eye.jpg";
import conjunctivitisImg from "../assets/images/conjunctivitis.jpg";
import cornealUlcerImg from "../assets/images/corneal-ulcer.jpg";
import entropionImg from "../assets/images/entropion.webp";
import healthyImg from "../assets/images/healthy.jpg";

const diseaseData = {
  cataract: {
    icon: "blur_on",
    image: cataractImg,
    badgeClass: "bg-red-100 text-red-800",
    urgency: "moderate",
    urgencyWidth: "w-[65%]",
    urgencyColor: "from-[#F4B400] to-[#fdbc13]",
    tags: ["Treatment: Surgical", "Common in Senior Dogs"],
    tagIcons: ["medical_services", "pets"],
    symptoms: [
      "Cloudy or bluish-white appearance in the eye",
      "Bumping into objects or furniture",
      "Reluctance to climb stairs or jump",
      "Difficulty seeing in dim light",
      "Changes in eye color"
    ],
    causes: [
      "Aging (most common cause in senior dogs)",
      "Diabetes mellitus",
      "Genetic predisposition",
      "Eye trauma or injury",
      "Nutritional deficiencies"
    ],
    immediateCare: "Monitor vision changes and keep your dog's environment safe. Remove obstacles and avoid rearranging furniture.",
    professionalTreatment: "Surgical removal of the affected lens (phacoemulsification) is the most effective treatment. Early detection significantly improves outcomes.",
    prevention: "Regular veterinary eye checkups, manage diabetes if present, and ensure proper nutrition with eye-supporting vitamins.",
    vetWarning: "If you notice sudden cloudiness, visible whitening of the pupil, or your dog starts bumping into things frequently.",
    related: ["cherryEye", "conjunctivitis", "cornealUlcer"]
  },
  cherryEye: {
    icon: "emergency",
    image: cherryEyeImg,
    badgeClass: "bg-[#F4B400] text-[#32190b]",
    urgency: "moderate",
    urgencyWidth: "w-[65%]",
    urgencyColor: "from-[#F4B400] to-[#fdbc13]",
    tags: ["Treatment: 2-4 Hours", "Common in Young Dogs"],
    tagIcons: ["timer", "pets"],
    symptoms: [
      "Red or pink fleshy mass in the inner corner of the eye",
      "Excessive tearing (epiphora)",
      "Pawing or rubbing at the affected eye",
      "Swelling of the third eyelid",
      "Possible dry eye if gland is compromised"
    ],
    causes: [
      "Weak connective tissue holding the gland",
      "Genetic predisposition in certain breeds",
      "Breed-specific flat-faced (brachycephalic) structure",
      "May occur spontaneously in young dogs"
    ],
    immediateCare: "Monitor the mass and keep the eye area clean using saline wipes. Avoid attempting to push the gland back yourself.",
    professionalTreatment: "Surgical repositioning is the standard. Modern techniques 'pocket' the gland back in place rather than removing it entirely.",
    prevention: "Being aware of breed-specific risks allows for early detection. Maintain general ocular health through regular vet checkups.",
    vetWarning: "If you notice a sudden red mass in the corner of the eye, schedule a visit immediately. Delaying can lead to dry eye (KCS) or permanent damage.",
    related: ["cataract", "conjunctivitis", "cornealUlcer"]
  },
  conjunctivitis: {
    icon: "medical_services",
    image: conjunctivitisImg,
    badgeClass: "bg-[#e9e2d2] text-[#50443f]",
    urgency: "low",
    urgencyWidth: "w-[35%]",
    urgencyColor: "from-green-500 to-green-400",
    tags: ["Common Condition", "Usually Treatable"],
    tagIcons: ["info", "healing"],
    symptoms: [
      "Redness in the white of the eye",
      "Excessive discharge (clear, yellow, or green)",
      "Squinting or holding the eye partially closed",
      "Pawing at the affected eye",
      "Swollen eyelids",
      "Frequent blinking"
    ],
    causes: [
      "Bacterial or viral infections",
      "Allergies (environmental or food)",
      "Foreign bodies or irritants (dust, smoke)",
      "Dry eye condition",
      "Parasitic infections"
    ],
    immediateCare: "Keep the eye area clean by gently wiping with a warm, damp cloth. Remove any visible foreign bodies carefully.",
    professionalTreatment: "Bacterial infections require antibiotic eye drops. Allergic conjunctivitis may need antihistamines or steroid drops.",
    prevention: "Keep your dog's living area clean, avoid known allergens, and schedule regular eye checkups.",
    vetWarning: "If discharge becomes thick, green, or bloody, or if symptoms persist more than 48 hours despite home care.",
    related: ["cataract", "cornealUlcer", "entropion"]
  },
  cornealUlcer: {
    icon: "healing",
    image: cornealUlcerImg,
    badgeClass: "bg-red-100 text-red-800",
    urgency: "high",
    urgencyWidth: "w-[90%]",
    urgencyColor: "from-red-600 to-red-400",
    tags: ["Emergency Care", "Extremely Painful"],
    tagIcons: ["emergency", "warning"],
    symptoms: [
      "Severe squinting or holding the eye closed",
      "Excessive tearing and watery discharge",
      "Redness around the eye",
      "Cloudiness or blue-white haze on the cornea",
      "Visible depression or divot on the eye surface",
      "Extreme sensitivity to light",
      "Rubbing face on floor or furniture"
    ],
    causes: [
      "Trauma or scratches from rough play or plants",
      "Foreign bodies stuck in the eye",
      "Chronic dry eye condition",
      "Bacterial or fungal infections",
      "Chemical burns or irritants",
      "Eyelid abnormalities like entropion"
    ],
    immediateCare: "Prevent your dog from rubbing the eye immediately. Use an Elizabethan collar. Do NOT apply any drops without vet guidance.",
    professionalTreatment: "Antibiotic eye drops are essential to prevent infection. Severe or deep ulcers may require surgical intervention.",
    prevention: "Protect eyes during outdoor activities, treat underlying conditions like dry eye, and keep nails trimmed to prevent scratches.",
    vetWarning: "IMMEDIATELY if your dog is squinting severely, has a cloudy eye, or shows signs of eye pain. Corneal ulcers can perforate within 24-48 hours.",
    related: ["conjunctivitis", "entropion", "cataract"]
  },
  entropion: {
    icon: "unfold_less",
    image: entropionImg,
    badgeClass: "bg-[#ffdcc5] text-[#301400]",
    urgency: "moderate",
    urgencyWidth: "w-[75%]",
    urgencyColor: "from-orange-500 to-amber-400",
    tags: ["Surgical Correction", "Breed-Specific"],
    tagIcons: ["medical_services", "pets"],
    symptoms: [
      "Excessive squinting or blinking",
      "Excessive tearing and watery eyes",
      "Mucoid or thick discharge from the eye",
      "Redness and inflammation of the eye",
      "Rubbing face on surfaces frequently",
      "Corneal ulceration in severe cases",
      "Visible inward rolling of the eyelid"
    ],
    causes: [
      "Genetic predisposition (breeds with loose facial skin)",
      "Common in: Shar Pei, Bulldog, Chow Chow, Rottweiler, Mastiff",
      "Chronic eye infections causing scarring",
      "Previous eye injuries or surgical complications"
    ],
    immediateCare: "Apply lubricating eye drops to reduce friction. Use an Elizabethan collar if your dog is pawing at the eye.",
    professionalTreatment: "Surgical correction (eyelid tacking or reshaping) is usually required. Temporary tacking sutures may be used in puppies.",
    prevention: "Research breed-specific risks before getting a dog. Regular eye exams for predisposed breeds.",
    vetWarning: "If you notice the eyelid curling inward, chronic tearing, or your dog constantly squinting. Early surgical correction prevents corneal scarring.",
    related: ["cornealUlcer", "conjunctivitis", "cherryEye"]
  },
  healthy: {
    icon: "stars",
    image: healthyImg,
    badgeClass: "bg-[#ffdea3] text-[#261900]",
    urgency: "none",
    urgencyWidth: "w-[10%]",
    urgencyColor: "from-green-500 to-green-300",
    tags: ["Optimal Health", "Regular Monitoring"],
    tagIcons: ["check_circle", "schedule"],
    symptoms: [
      "Clear and bright eyes with good focus",
      "No excessive tearing or discharge",
      "White sclera (not red, yellow, or bloodshot)",
      "Equal pupil size in both eyes",
      "No cloudiness, spots, or film on the lens",
      "Alert and responsive eye movement"
    ],
    causes: [
      "Regular veterinary eye checkups",
      "Good balanced nutrition with eye-supporting vitamins",
      "Clean living environment",
      "Breed-appropriate health monitoring",
      "Protection from UV exposure"
    ],
    immediateCare: "Continue regular eye cleaning with gentle wipes. Monitor for any changes in appearance.",
    professionalTreatment: "Schedule routine checkups every 6-12 months. Annual comprehensive eye exams for senior dogs.",
    prevention: "Maintain good nutrition, regular exercise, protect eyes during outdoor activities, and keep vaccinations up to date.",
    vetWarning: "Schedule regular annual checkups even when eyes appear healthy. Early detection of subtle changes is key.",
    related: ["cataract", "conjunctivitis", "entropion"]
  }
};

const SLUG_TO_KEY = {
  "cataract": "cataract",
  "cherry-eye": "cherryEye",
  "conjunctivitis": "conjunctivitis",
  "corneal-ulcer": "cornealUlcer",
  "entropion": "entropion",
  "healthy": "healthy"
};

const KEY_TO_SLUG = {
  "cataract": "cataract",
  "cherryEye": "cherry-eye",
  "conjunctivitis": "conjunctivitis",
  "cornealUlcer": "corneal-ulcer",
  "entropion": "entropion",
  "healthy": "healthy"
};

function DiseaseDetail() {
  const { slug } = useParams();
  const t = useTranslation();
  const { language } = useLanguage();

  const diseaseKey = SLUG_TO_KEY[slug];
  if (!diseaseKey) return <Navigate to="/diseases" replace />;

  const data = diseaseData[diseaseKey];
  const disease = t.diseases[diseaseKey];

  const urgencyLabels = {
  high: { label: language === "si" ? "ඉහළ" : language === "ta" ? "உயர்" : "High", color: "bg-red-100 text-red-800" },
  moderate: { label: language === "si" ? "මධ්‍යම" : language === "ta" ? "மிதமான" : "Moderate", color: "bg-yellow-100 text-yellow-800" },
  low: { label: language === "si" ? "අඩු" : language === "ta" ? "குறைவு" : "Low", color: "bg-green-100 text-green-800" },
  none: { label: language === "si" ? "නැත" : language === "ta" ? "இல்லை" : "None", color: "bg-green-100 text-green-800" },
};

  const urg = urgencyLabels[data.urgency];

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#50443f]">
          <Link to="/" className="hover:text-[#7a5900]">{t.nav.home}</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/diseases" className="hover:text-[#7a5900]">{t.nav.diseases}</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[#32190b] font-semibold">{disease.name}</span>
        </nav>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs tracking-wider font-bold ${data.badgeClass}`}>
              {disease.badge}
            </span>
            <h1 className="text-4xl font-bold text-[#32190b]">{disease.name}</h1>
            <p className="text-lg text-[#50443f] leading-relaxed">{disease.description}</p>
            <div className="flex items-center gap-4 pt-2">
              {data.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#f4eddd] rounded-lg border border-[#d4c3bc]">
                  <span className="material-symbols-outlined text-[#7a5900]">{data.tagIcons[i]}</span>
                  <span className="text-sm font-medium text-[#32190b]">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={data.image}
              alt={disease.name}
              className="rounded-3xl w-full h-[400px] object-cover shadow-2xl border-4 border-white"
            />
          </div>
        </section>

        {/* Overview & Urgency */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold text-[#32190b] mb-6">{t.diseases.overview}</h2>
            <p className="text-[#50443f] leading-relaxed">{disease.description}</p>
          </div>

          <div className="bg-[#e9e2d2] p-8 rounded-3xl border border-[#d4c3bc]">
            <h3 className="text-xs text-[#50443f] uppercase tracking-widest mb-4">{t.diseases.urgencyLevel}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-semibold text-[#32190b]">{urg.label}</span>
              <span className="material-symbols-outlined text-[#7a5900] text-3xl">warning</span>
            </div>
            <div className="w-full h-3 bg-[#faf3e2] rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${data.urgencyColor} ${data.urgencyWidth} rounded-full`}></div>
            </div>
          </div>
        </div>

        {/* Symptoms, Causes, When to See Vet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Symptoms */}
          <div className="bg-[#faf3e2] p-8 rounded-3xl border border-[#d4c3bc] shadow-sm relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[#32190b] opacity-5 text-8xl">visibility</span>
            <h3 className="text-2xl font-semibold text-[#32190b] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7a5900]">checklist</span>
              {t.diseases.keySymptoms}
            </h3>
            {/* Symptoms */}
            <ul className="space-y-4">
              {(disease.symptoms ? disease.symptoms.split(", ") : data.symptoms).map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#7a5900]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="bg-white p-8 rounded-3xl border border-[#d4c3bc] shadow-sm relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[#32190b] opacity-5 text-8xl">genetics</span>
            <h3 className="text-2xl font-semibold text-[#32190b] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7a5900]">biotech</span>
              {t.diseases.commonCauses}
            </h3>
            <ul className="space-y-4">
              {(disease.causes ? disease.causes.split(", ") : data.causes).map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7a5900] mt-2.5 shrink-0"></div>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to See Vet */}
          <div className="bg-[#FFF9EC] p-8 rounded-3xl border-2 border-[#fdbc13] shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#ffdea3] p-2 rounded-xl">
                <span className="material-symbols-outlined text-[#32190b]">notification_important</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#32190b]">{t.diseases.whenToSeeVet}</h3>
            </div>
            <p className="text-[#50443f] mb-6">{disease.vetWarning || data.vetWarning}</p>
            <Link
              to="/clinics"
              className="inline-flex items-center justify-center w-full bg-[#fdbc13] text-[#32190b] font-semibold h-12 rounded-xl hover:shadow-lg transition-all active:scale-95"
            >
              {t.diseases.findClinic}
            </Link>
          </div>
        </div>

        {/* Treatment Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#32190b] mb-8 text-center">{t.diseases.treatmentOptions}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TreatmentCard icon="health_and_safety" title={t.diseases.immediateCare} text={disease.immediateCare || data.immediateCare} />
            <TreatmentCard icon="medical_services" title={t.diseases.professionalTreatment} text={disease.professionalTreatment || data.professionalTreatment} />
            <TreatmentCard icon="shield" title={t.diseases.prevention} text={disease.preventionText || data.prevention} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#4B2E1E] p-16 rounded-[40px] text-center relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-10 paw-pattern"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-white mb-4">{t.diseases.ctaTitle}</h2>
            <p className="text-[#bf957f] mb-8 max-w-2xl mx-auto">{t.diseases.ctaSubtitle}</p>
            <Link
              to="/upload"
              className="inline-flex items-center bg-[#fdbc13] text-[#32190b] font-semibold px-10 py-5 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              {t.diseases.ctaButton}
            </Link>
          </div>
        </section>

        {/* Related Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#32190b] mb-8">{t.diseases.otherConditions}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.related.map((key) => {
              const rel = t.diseases[key];
              const relData = diseaseData[key];
              return (
                <Link
                  key={key}
                  to={`/diseases/${KEY_TO_SLUG[key]}`}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-[#f4eddd]">
                    <img
                      src={relData.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h4 className="text-2xl font-semibold text-[#32190b] group-hover:text-[#7a5900]">{rel.name}</h4>
                  <p className="text-[#50443f] text-sm mt-1 line-clamp-2">{rel.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

function TreatmentCard({ icon, title, text }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#d4c3bc] hover:shadow-xl transition-all group">
      <div className="w-12 h-12 rounded-full bg-[#f4eddd] flex items-center justify-center mb-6 group-hover:bg-[#ffdea3] transition-colors">
        <span className="material-symbols-outlined text-[#7a5900]">{icon}</span>
      </div>
      <h4 className="text-xl font-semibold text-[#32190b] mb-4">{title}</h4>
      <p className="text-[#50443f]">{text}</p>
    </div>
  );
}

export default DiseaseDetail;