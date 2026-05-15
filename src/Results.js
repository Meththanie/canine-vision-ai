import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useTranslation, useLanguage } from "../App";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Results() {
  const t = useTranslation();
  const { language } = useLanguage();
  const location = useLocation();
  const state = location.state;

  if (!state) return <Navigate to="/upload" replace />;

  const { image, prediction, diseaseInfo } = state;
  const gradcamImage = prediction?.gradcam_image || null;
  
  const confidence = prediction?.confidence || 0;
  const urgency = prediction?.urgency || "low";

  // Use Sinhala/Tamil disease info if available
  const disease =
    language === "si"
      ? (diseaseInfo?.name_si || diseaseInfo?.name)
      : language === "ta"
      ? (diseaseInfo?.name_ta || diseaseInfo?.name)
      : (diseaseInfo?.name || prediction?.disease || "Unknown");

  const description =
    language === "si"
      ? (diseaseInfo?.description_si || diseaseInfo?.description)
      : language === "ta"
      ? (diseaseInfo?.description_ta || diseaseInfo?.description)
      : (diseaseInfo?.description || "");

  const symptoms =
    language === "si"
      ? (diseaseInfo?.symptoms_si || diseaseInfo?.symptoms)
      : language === "ta"
      ? (diseaseInfo?.symptoms_ta || diseaseInfo?.symptoms)
      : (diseaseInfo?.symptoms || "");

  const action =
    language === "si"
      ? (diseaseInfo?.action_si || diseaseInfo?.action)
      : language === "ta"
      ? (diseaseInfo?.action_ta || diseaseInfo?.action)
      : (diseaseInfo?.action || "");

  const urgencyConfig = {
    high: {
      bg: "bg-red-100 text-red-800",
      icon: "warning",
      title: t.results.urgencyHigh,
      msg: t.results.urgencyHighDesc,
    },
    moderate: {
      bg: "bg-yellow-100 text-yellow-800",
      icon: "warning",
      title: t.results.urgencyModerate,
      msg: t.results.urgencyModerateDesc,
    },
    low: {
      bg: "bg-green-100 text-green-800",
      icon: "check_circle",
      title: t.results.urgencyLow,
      msg: t.results.urgencyLowDesc,
    },
    none: {
      bg: "bg-green-100 text-green-800",
      icon: "check_circle",
      title: t.results.urgencyNone,
      msg: t.results.urgencyNoneDesc,
    },
  };

  const urg = urgencyConfig[urgency] || urgencyConfig.low;

  const symptomList = symptoms
    ? symptoms.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
    : [];

  const handleDownload = async () => {
    const element = document.getElementById("report-area");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("caninevision-report.pdf");
  };

  const handleShare = async () => {
    const text = `CanineVision\n${t.results.detectedCondition}: ${disease}\n${t.results.confidence}: ${confidence}%\n${urg.title}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "CanineVision", text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Report copied to clipboard.");
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen text-[#1e1c12]">
      <main className="max-w-7xl mx-auto px-8 py-14 min-h-screen">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#32190b]">{t.results.title}</h1>
          <p className="text-lg text-[#50443f]">{t.results.subtitle}</p>
        </div>

        <div className={`${urg.bg} p-6 rounded-lg flex items-center gap-4 mb-12 shadow-sm`}>
          <span className="material-symbols-outlined text-3xl">{urg.icon}</span>
          <div>
            <span className="font-semibold">{urg.title}</span>
            <p className="text-sm">{urg.msg}</p>
          </div>
        </div>

        <div id="report-area" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-[#d4c3bc] overflow-hidden shadow-sm">
              <img src={image} alt="Uploaded dog analysis" className="w-full aspect-square object-cover" />
              <div className="p-6 flex justify-between items-center">
                <span className="text-sm text-[#82746e]">{t.results.uploaded}: Today</span>
                <div className="flex gap-2">
                  <button onClick={handleDownload} className="p-2 hover:bg-[#f4eddd] rounded-full" title="Download">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button onClick={handleShare} className="p-2 hover:bg-[#f4eddd] rounded-full" title="Share">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>

            {gradcamImage && (
              <div className="bg-white rounded-xl border border-[#d4c3bc] overflow-hidden shadow-sm mt-4">
                <img src={gradcamImage} alt="Grad-CAM heatmap" className="w-full aspect-square object-cover" />
                <div className="p-4">
                  <p className="text-sm text-[#82746e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7a5900]">visibility</span>
                    {t.results.gradcamTitle}
                </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white p-10 rounded-xl border border-[#d4c3bc] shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <span className="text-sm text-[#7a5900] uppercase tracking-widest">{t.results.detectedCondition}</span>
                  <h2 className="text-4xl font-semibold text-[#32190b] capitalize">{disease}</h2>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-semibold text-[#7a5900]">{confidence}%</span>
                  <p className="text-sm text-[#82746e]">{t.results.confidence}</p>
                </div>
              </div>

              <div className="w-full h-3 bg-[#f4eddd] rounded-full mb-6">
                <div className="h-full bg-gradient-to-r from-[#4B2E1E] to-[#F4B400] rounded-full" style={{ width: `${confidence}%` }} />
              </div>

              {description && (
                <div className="mb-8 p-4 bg-[#faf3e2] rounded-lg border border-[#d4c3bc]">
                  <p className="text-[#50443f]">{description}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex gap-2">
                    <span className="material-symbols-outlined text-[#7a5900]">checklist</span>
                    {t.results.keySymptoms}
                  </h3>
                  <ul className="space-y-3">
                    {symptomList.length > 0 ? (
                      symptomList.map((s, i) => <Symptom key={i} text={s} />)
                    ) : (
                      <li className="text-[#82746e]">-</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex gap-2">
                    <span className="material-symbols-outlined text-[#7a5900]">medical_services</span>
                    {t.results.recommendedActions}
                  </h3>
                  {action ? (
                    <div className="p-4 bg-[#f4eddd] border-l-4 border-[#7a5900] rounded">
                      <p className="text-sm">{action}</p>
                    </div>
                  ) : (
                    <p className="text-[#82746e]">-</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#eee8d7] p-6 rounded-xl border border-[#d4c3bc] flex gap-4">
              <span className="material-symbols-outlined text-[#82746e]">info</span>
              <p className="text-sm italic">
                <strong>{t.results.disclaimer}</strong> {t.results.disclaimerText}
              </p>
            </div>

            <div className="flex gap-6">
              <Link to="/clinics" className="flex-1 bg-[#F4B400] py-5 rounded-lg text-center font-semibold">
                {t.results.findClinic}
              </Link>
              <Link to="/upload" className="flex-1 border-2 border-[#32190b] py-5 rounded-lg text-center hover:bg-[#32190b] hover:text-white transition-colors">
                {t.results.analyzeAnother}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Symptom({ text }) {
  return (
    <li className="flex gap-2">
      <span className="w-2 h-2 bg-[#7a5900] rounded-full mt-2 shrink-0" />
      {text}
    </li>
  );
}

export default Results;