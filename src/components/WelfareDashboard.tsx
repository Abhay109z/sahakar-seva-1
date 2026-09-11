import React, { useState } from "react";
import {
  ShieldCheck,
  HeartHandshake,
  PiggyBank,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  IndianRupee,
  HeartPulse,
  Award,
} from "lucide-react";
import { WELFARE_METRICS } from "../data/workersData";
import { LanguageCode } from "../types";

interface WelfareDashboardProps {
  language: LanguageCode;
}

export const WelfareDashboard: React.FC<WelfareDashboardProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<"METRICS" | "SCHEMES" | "BENEFICIARIES">("METRICS");
  const [simulationSpend, setSimulationSpend] = useState<number>(1000);

  const calculatedWelfare = Math.round(simulationSpend * 0.05);
  const calculatedEmergency = Math.round(simulationSpend * 0.03);
  const calculatedWorkerWage = Math.round(simulationSpend * 0.92);

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white text-[#231715] rounded-xl p-6 sm:p-8 shadow-xs border border-[#E8DFD5] space-y-3">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-[#8B1D31]" />
            Social Security & Worker Welfare Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231715]">
            Dignity, 92% Fair Wages & Universal Social Protection
          </h1>
          <p className="text-[#5A4D4A] text-xs sm:text-sm leading-relaxed">
            Unlike commercial aggregators charging 25–40% commissions that treat blue-collar workers as disposable contractors,
            Sahakar Seva automatically allocates <strong className="text-[#231715] font-bold">92% directly to the artisan</strong>, reserving 5% for
            member-owned welfare, accident insurance, and retirement funds.
          </p>
        </div>
      </div>

      {/* Welfare Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WELFARE_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-5 border border-[#E8DFD5] shadow-xs hover:border-[#8B1D31]/40 hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#847571] uppercase tracking-wider">
                {metric.title}
              </span>
              <div className="p-2 rounded-lg bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31]">
                {idx === 0 && <ShieldCheck className="w-4 h-4" />}
                {idx === 1 && <HeartPulse className="w-4 h-4" />}
                {idx === 2 && <PiggyBank className="w-4 h-4" />}
                {idx === 3 && <GraduationCap className="w-4 h-4" />}
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-[#231715]">{metric.amount}</div>
              <div className="text-xs text-[#8B1D31] font-semibold mt-0.5">{metric.change}</div>
            </div>

            <p className="text-xs text-[#5A4D4A] leading-relaxed border-t border-[#E8DFD5] pt-2">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Booking Welfare Impact Simulator */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#8B1D31] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8B1D31]" />
            Interactive Transparency Calculator
          </div>
          <h2 className="text-xl font-bold text-[#231715]">
            See Direct Social Impact per Customer Booking
          </h2>
          <p className="text-xs text-[#847571]">
            Slide the order amount to calculate exact worker fair wage payout vs welfare fund allocations.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-[#5A4D4A]">Customer Booking Value:</span>
            <span className="text-2xl text-[#8B1D31] font-extrabold">₹{simulationSpend}</span>
          </div>

          <input
            type="range"
            min={300}
            max={5000}
            step={50}
            value={simulationSpend}
            onChange={(e) => setSimulationSpend(Number(e.target.value))}
            className="w-full accent-[#8B1D31] cursor-pointer h-2 bg-[#E8DFD5] rounded-lg"
          />

          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-4 rounded-xl bg-[#FBF0F2] border border-[#F0CCD3]">
              <div className="text-xs text-[#8B1D31] font-semibold">Worker Direct Payout</div>
              <div className="text-xl font-extrabold text-[#8B1D31] mt-1">₹{calculatedWorkerWage}</div>
              <div className="text-[10px] text-[#8B1D31]/80 font-medium">92% to artisan account</div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
              <div className="text-xs text-[#231715] font-semibold">Welfare & Pension</div>
              <div className="text-xl font-extrabold text-[#231715] mt-1">₹{calculatedWelfare}</div>
              <div className="text-[10px] text-[#5A4D4A] font-medium">5% to society pool</div>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF4E8] border border-[#ECD9B8]">
              <div className="text-xs text-[#8F5B12] font-semibold">Accident & Health</div>
              <div className="text-xl font-extrabold text-[#8F5B12] mt-1">₹{calculatedEmergency}</div>
              <div className="text-[10px] text-[#8F5B12]/80 font-medium">3% to emergency pool</div>
            </div>
          </div>
        </div>
      </div>

      {/* Government & Statutory Social Security Tie-Ups */}
      <div className="bg-white border border-[#E8DFD5] rounded-xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div>
          <div className="text-xs font-bold text-[#8B1D31] uppercase tracking-wider">
            Institutional Linkages
          </div>
          <h3 className="text-xl font-bold mt-1 text-[#231715]">
            Government Social Protection Program Integrations
          </h3>
          <p className="text-xs text-[#5A4D4A] mt-1">
            Sahakar Seva seamlessly links registered labour cooperatives with national social security
            architectures:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DFD5] space-y-2">
            <div className="font-bold text-[#231715] text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B1D31]" />
              PMSBY (Accidental Insurance)
            </div>
            <p className="text-[#5A4D4A] leading-relaxed">
              Every active artisan on the roster receives ₹5 Lakh accidental disability & death cover,
              with annual premiums sponsored by the cooperative federation welfare reserve.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DFD5] space-y-2">
            <div className="font-bold text-[#231715] text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8F5B12]" />
              Ayushman Bharat (PM-JAY)
            </div>
            <p className="text-[#5A4D4A] leading-relaxed">
              Assisting cooperative worker households with e-card generation for ₹5,00,000 per family
              cashless hospitalization in empaneled hospitals across India.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DFD5] space-y-2">
            <div className="font-bold text-[#231715] text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5A4D4A]" />
              e-Shram & Labour Welfare Board
            </div>
            <p className="text-[#5A4D4A] leading-relaxed">
              Direct linkage of Universal Account Number (UAN) ensuring maternity benefits, disability
              aid, and tool-kit subsidies flow directly without middleman cuts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
