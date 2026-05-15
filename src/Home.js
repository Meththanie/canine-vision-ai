import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../App';
import heroDog from '../assets/images/hero-dog.png';
import dogCheckImage from '../assets/images/vet-dog-exam.png';

function Home() {
  const t = useTranslation();

  // Function to handle opening the project walkthrough video cleanly
  const handleWatchTutorial = () => {
    window.open(
      "https://drive.google.com/file/d/15UdbCfNsUP8Rse4RU5Pe2hg_VrjyEeZx/view?usp=drive_link", // Replace this with your copied view link from OneDrive
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
      <main className="relative overflow-hidden">
        
        {/* Ambient Decorative Paw */}
        <div className="absolute top-40 right-[-100px] opacity-[0.03] pointer-events-none">
          <span className="material-symbols-outlined text-[400px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative pt-12 pb-24 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/20 text-secondary rounded-full border border-secondary/10">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="font-label-md text-label-md">
                  {t.home.badge || "Sri Lanka's First Veterinary AI Tool"}
                </span>
              </div>
              
              <h1 className="font-h1 text-h1 text-primary leading-tight">
                {t.home.title1 || "Detect Dog "}{' '}
                <span className="text-secondary italic">{t.home.titleHighlight || "Eye Diseases"}</span>{' '}
                {t.home.title2 || "with AI Precision"}
              </h1>
              
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                {t.home.subtitle || "Providing compassionate veterinary insights through advanced image recognition."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/upload"
                  className="bg-[#F4B400] text-[#4B2E1E] font-button text-button px-8 py-4 rounded-lg shadow-lg shadow-[#7a5900]/10 hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center justify-center gap-2"
                >
                  {t.home.getStarted || "Get Started"}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button 
                  onClick={handleWatchTutorial}
                  className="border border-outline text-primary font-button text-button px-8 py-4 rounded-lg hover:bg-surface-container transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  {t.home.watchTutorial || "Watch Tutorial"}
                </button>
              </div>
              
              {/* Trust Avatars */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-stone-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-stone-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-stone-500"></div>
                </div>
                <p className="text-label-md font-label-md text-on-surface-variant">
                  Built for Sri Lankan Pet Owners
                </p>
              </div>
            </div>

            {/* Hero Right Media (AI Card) */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white/50">
                <img src={heroDog} alt="Labrador with healthy eyes" className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-background/70 backdrop-blur-xl border border-outline-variant/30 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-label-md font-label-md text-primary">AI Diagnostic Analysis</span>
                    <span className="text-xs font-bold text-secondary">89%+ Accuracy</span>
                  </div>
                  <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-tertiary to-[#F4B400] w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-fixed opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl"></div>
            </div>

          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-8 bg-surface-container-low relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="font-h2 text-h2 text-primary mb-4">
                {t.home.whyTitle || "Why CanineVision?"}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                {t.home.whySubtitle || "We combine cutting-edge artificial intelligence with local veterinary expertise."}
              </p>
            </div>

            {/* Grid Container Setup (Fixed Tags Here) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 (Spans 2 columns) */}
              <div className="md:col-span-2 group bg-white p-12 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-[#F4B400] mb-6">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <h3 className="font-h3 text-h3 text-primary mb-3">{t.home.feature1Title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{t.home.feature1Desc}</p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[160px]">visibility</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-secondary-fixed-dim/10 p-12 rounded-xl border border-secondary-fixed/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-secondary mb-6 shadow-sm">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <h3 className="font-h3 text-h3 text-primary mb-3">{t.home.feature2Title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t.home.feature2Desc}</p>
                </div>
                <Link to="/clinics" className="mt-6 text-secondary font-bold flex items-center gap-1 group">
                  {t.home.feature2Link || "Explore Map"}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    north_east
                  </span>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-primary text-white p-12 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-h3 text-h3 mb-3">{t.home.feature3Title}</h3>
                  <p className="font-body-md opacity-80">{t.home.feature3Desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <span className="text-label-md font-label-md">{t.home.feature3Badge || "Always available"}</span>
                </div>
              </div>

              {/* Card 4 (Spans 2 columns) */}
              <div className="md:col-span-2 bg-white p-12 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h3 className="font-h3 text-h3 text-primary mb-3">{t.home.feature4Title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">{t.home.feature4Desc}</p>
                  <Link to="/about" className="text-primary font-button border-b-2 border-[#F4B400] pb-1">
                    {t.home.feature4Link || "Learn about our AI accuracy"}
                  </Link>
                </div>
                <div className="w-full md:w-1/3">
                  <img src={dogCheckImage} alt="Vet examining dog" className="rounded-lg shadow-sm w-full object-cover" />
                </div>
              </div>

            </div> {/* End of Bento Grid Container */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto bg-primary-container rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-6xl text-white">pets</span>
            </div>
            <div className="absolute bottom-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-9xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
            </div>

            <div className="relative z-10 space-y-6">
              <h2 className="font-h1 text-h1 text-stone-50">{t.home.ctaTitle}</h2>
              <p className="font-body-lg text-body-lg text-stone-300 max-w-2xl mx-auto">{t.home.ctaSubtitle}</p>
              <div className="flex justify-center pt-4">
                <Link 
                  to="/upload" 
                  className="bg-[#F4B400] text-[#4B2E1E] font-button text-button px-12 py-4 rounded-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  {t.home.ctaButton || "Start Your Free Scan"}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;