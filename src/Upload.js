import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, useLanguage } from "../App";
import exampleEye from "../assets/images/example-eye.png";

function Upload() {
  const t = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    setError("");
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!validTypes.includes(file.type)) {
      setError(t.upload.errorFormat);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t.upload.errorSize);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsAnalyzing(false);
        return;
      }

      if (data.status === "rejected") {
        const msg = language === "si" ? data.message_si : data.message;
        setError(msg || t.upload.errorFormat);
        setIsAnalyzing(false);
        return;
      }

      setIsAnalyzing(false);
      navigate("/results", {
        state: {
          image: preview,
          prediction: {
            disease: data.prediction,
            confidence: data.confidence,
            urgency: data.urgency,
            gradcam_image: data.gradcam_image,
          },
          diseaseInfo: {
            name: data.disease_name,
            name_si: data.disease_name_si,
            description: data.description,
            description_si: data.description_si,
            symptoms: data.symptoms,
            symptoms_si: data.symptoms_si,
            action: data.action,
            action_si: data.action_si,
          },
        },
      });
    } catch (err) {
      setError("Could not connect to the server. Make sure Flask is running on port 5000.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen paw-pattern text-[#1e1c12]">
      <main className="flex items-center justify-center py-20 px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-[#ffdea3]/40 text-[#7a5900] rounded-full border border-[#7a5900]/20">
              <span className="material-symbols-outlined text-[18px] mr-2">lightbulb</span>
              <span className="text-sm uppercase tracking-wider">{t.upload.badge}</span>
            </div>

            <h1 className="text-5xl font-bold text-[#32190b]">{t.upload.title}</h1>

            <p className="text-lg text-[#50443f] max-w-md leading-relaxed">{t.upload.subtitle}</p>

            <ul className="space-y-4 pt-2">
              <Tip number="1" title={t.upload.tip1Title} text={t.upload.tip1Desc} />
              <Tip number="2" title={t.upload.tip2Title} text={t.upload.tip2Desc} />
              <Tip number="3" title={t.upload.tip3Title} text={t.upload.tip3Desc} />
            </ul>

            <div className="p-6 bg-[#f4eddd] rounded-lg border border-[#d4c3bc] flex gap-6 items-center">
              <img src={exampleEye} alt="Example dog eye" className="w-20 h-20 rounded-lg object-cover shadow-sm border border-white" />
              <div>
                <p className="text-xs text-[#50443f] uppercase tracking-widest">{t.upload.tip3Title}</p>
                <p className="text-sm font-medium text-[#32190b]">{t.upload.tip3Desc}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[120px] text-[#32190b]">pets</span>
            </div>

            <div className="bg-white p-12 rounded-xl shadow-sm border border-[#d4c3bc] relative z-10">
              <div
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                  isDragging ? "border-[#F4B400] bg-[#F4B400]/10" : "border-[#8B5E3C] hover:bg-[#faf3e2]"
                }`}
              >
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/jpg,image/webp" onChange={(e) => handleFile(e.target.files[0])} className="hidden" />

                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="max-h-60 rounded-xl shadow-sm object-contain mb-4" />
                    <p className="text-sm text-[#50443f] mb-2">{selectedFile?.name}</p>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreview(null); setError(""); }} className="text-red-600 text-sm underline">
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-[#f4eddd] rounded-full flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-[#8B5E3C] text-3xl">cloud_upload</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#32190b] mb-2">{t.upload.dropzoneTitle}</h3>
                    <p className="text-[#50443f] mb-8">{t.upload.dropzoneSubtitle}</p>
                    <div className="px-12 py-4 border-2 border-[#361800] text-[#361800] rounded-lg hover:bg-[#361800] hover:text-white transition-colors">
                      Browse Files
                    </div>

                    <p className="mt-3 text-xs text-[#50443f]">
                      Supported: JPG, PNG, WEBP • Max size: 10MB • Eye images only
                    </p>
                    <p className="mt-6 text-xs text-[#50443f]">{t.upload.dropzoneSubtitle}</p>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-4 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</div>
              )}

              <div className="mt-10">
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  className={`w-full py-5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                    selectedFile && !isAnalyzing
                      ? "bg-[#F4B400] text-[#32190b] hover:shadow-lg hover:scale-[1.02]"
                      : "bg-[#fdbc13]/50 text-[#50443f]/60 cursor-not-allowed"
                  }`}
                >
                  <span className="material-symbols-outlined">analytics</span>
                  {isAnalyzing ? t.upload.analyzing : t.upload.analyzeButton}
                </button>

                <p className="text-center text-xs text-[#50443f] mt-4">{t.upload.disclaimer}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function Tip({ number, title, text }) {
  return (
    <li className="flex items-start gap-3">
      <div className="bg-[#ffdea3] text-[#261900] w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1">
        <span className="font-bold text-xs">{number}</span>
      </div>
      <div>
        <p className="font-bold text-[#32190b]">{title}</p>
        <p className="text-[#50443f] text-sm">{text}</p>
      </div>
    </li>
  );
}

export default Upload;