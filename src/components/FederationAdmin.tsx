import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  BrainCircuit,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Clock,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Filter,
} from "lucide-react";
import { AIDemandForecast, CooperativeSociety } from "../types";
import { COOPERATIVE_SOCIETIES } from "../data/workersData";

interface PendingWorkerApproval {
  id: string;
  name: string;
  trade: string;
  society: string;
  experience: number;
  certification: string;
  policeCheckUploaded: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const FederationAdmin: React.FC = () => {
  const [adminTab, setAdminTab] = useState<"AI_FORECAST" | "VERIFICATION_QUEUE" | "SOCIETIES">("AI_FORECAST");

  // AI Forecasting state
  const [selectedRegion, setSelectedRegion] = useState("Delhi NCR - Indraprastha Cluster");
  const [selectedSeason, setSelectedSeason] = useState("Pre-Diwali Renovation & Electrical Surge");
  const [selectedTradeCategory, setSelectedTradeCategory] = useState("Electricians & Home Wiring");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [forecastResult, setForecastResult] = useState<AIDemandForecast | null>(null);

  // Worker verification queue state
  const [pendingWorkers, setPendingWorkers] = useState<PendingWorkerApproval[]>([
    {
      id: "APP-901",
      name: "Bhagwan Das Prajapati",
      trade: "Carpenter & Joinery",
      society: "Indraprastha Labour Cooperative Federation Ltd.",
      experience: 12,
      certification: "ITI Woodcraft National Trade Certificate",
      policeCheckUploaded: true,
      status: "PENDING",
    },
    {
      id: "APP-902",
      name: "Lakshmi Narayanan",
      trade: "Electrician",
      society: "Bengaluru Kaigarika Mattu Karmika Sahakara Sangha",
      experience: 9,
      certification: "NSDC Solar Rooftop & Domestic Wiring L4",
      policeCheckUploaded: true,
      status: "PENDING",
    },
    {
      id: "APP-903",
      name: "Pushpa Rani",
      trade: "Caregiver & Elderly Aide",
      society: "Indraprastha Labour Cooperative Federation Ltd.",
      experience: 7,
      certification: "St. John Ambulance First Aid & Geriatric Care",
      policeCheckUploaded: true,
      status: "PENDING",
    },
  ]);

  const handleRunAiForecast = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region: selectedRegion,
          category: selectedTradeCategory,
          season: selectedSeason,
          timeHorizonDays: 14,
        }),
      });
      const data = await res.json();
      if (data && data.forecast) {
        setForecastResult(data.forecast);
      }
    } catch (err) {
      console.error("AI forecast call error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleWorkerAction = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setPendingWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-4 text-[#231715]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-[#8B1D31]" />
              National & State Labour Cooperative Federation Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#231715]">
              Federation Administration & AI Workforce Allocation
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4D4A]">
              Cooperative governance dashboard overseeing primary societies, artisan onboarding
              approvals, 92% fair-wage dispatches, and Gemini-driven regional demand forecasting.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-[#FBF0F2] text-[#8B1D31] text-xs font-bold border border-[#F0CCD3]">
              28 Federations • 412 Societies Connected
            </span>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E8DFD5] flex-wrap">
          <button
            onClick={() => setAdminTab("AI_FORECAST")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === "AI_FORECAST"
                ? "bg-[#8B1D31] text-white shadow-xs"
                : "bg-[#FAF7F2] border border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#F5EFE8]"
            }`}
          >
            <BrainCircuit className={`w-4 h-4 ${adminTab === "AI_FORECAST" ? "text-white" : "text-[#8B1D31]"}`} />
            AI Demand Forecasting & Allocation
          </button>

          <button
            onClick={() => setAdminTab("VERIFICATION_QUEUE")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === "VERIFICATION_QUEUE"
                ? "bg-[#8B1D31] text-white shadow-xs"
                : "bg-[#FAF7F2] border border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#F5EFE8]"
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${adminTab === "VERIFICATION_QUEUE" ? "text-white" : "text-[#8B1D31]"}`} />
            Worker Onboarding Queue
            <span className="px-1.5 py-0.2 rounded-full bg-[#FBF4E8] text-[#8F5B12] border border-[#ECD9B8] text-[10px] font-bold">
              {pendingWorkers.filter((w) => w.status === "PENDING").length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab("SOCIETIES")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              adminTab === "SOCIETIES"
                ? "bg-[#8B1D31] text-white shadow-xs"
                : "bg-[#FAF7F2] border border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#F5EFE8]"
            }`}
          >
            <Building2 className={`w-4 h-4 ${adminTab === "SOCIETIES" ? "text-white" : "text-[#8B1D31]"}`} />
            Affiliated Societies ({COOPERATIVE_SOCIETIES.length})
          </button>
        </div>
      </div>

      {/* Tab 1: AI Demand Forecasting & Workforce Allocation */}
      {adminTab === "AI_FORECAST" && (
        <div className="space-y-6">
          <div className="bg-white text-[#231715] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs border border-[#E8DFD5]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] text-[#8B1D31] text-xs font-semibold border border-[#F0CCD3]">
                <BrainCircuit className="w-4 h-4 text-[#8B1D31]" />
                Gemini 3.8 Flash Cooperative Intelligence Engine
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#231715]">
                AI Demand Forecasting & Predictive Workforce Allocation
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4D4A] max-w-2xl">
                Prevent artisan underutilization and service bottlenecks without surge pricing.
                Gemini analyzes upcoming weather, festival seasons, and historical cooperative bookings
                to recommend precise cross-cluster worker mobilization.
              </p>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#5A4D4A]">Cooperative Region / Cluster:</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] text-xs outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                >
                  <option value="Delhi NCR - Indraprastha Cluster">Delhi NCR - Indraprastha Cluster</option>
                  <option value="Mumbai Metropolitan - Shramik Cluster">Mumbai Metropolitan - Shramik Cluster</option>
                  <option value="Bengaluru Urban - Karmika Cluster">Bengaluru Urban - Karmika Cluster</option>
                  <option value="Kolkata & Howrah - Sramik Cluster">Kolkata & Howrah - Sramik Cluster</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A4D4A]">Seasonal / Cyclical Event:</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] text-xs outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                >
                  <option value="Pre-Diwali Renovation & Electrical Surge">Pre-Diwali Renovation & Electrical Surge</option>
                  <option value="Monsoon Wall Seepage & Plumbing Emergency">Monsoon Wall Seepage & Plumbing Emergency</option>
                  <option value="Summer Heatwave AC Jet Cleaning Peak">Summer Heatwave AC Jet Cleaning Peak</option>
                  <option value="Wedding Season Caregiver & Chauffeur High Demand">Wedding Season Caregiver & Chauffeur Demand</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A4D4A]">Target Trade Focus:</label>
                <select
                  value={selectedTradeCategory}
                  onChange={(e) => setSelectedTradeCategory(e.target.value)}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] text-xs outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                >
                  <option value="All Skilled Cooperative Trades">All Skilled Cooperative Trades</option>
                  <option value="Electricians & Wiring">Electricians & Wiring</option>
                  <option value="Plumbing & Sanitation">Plumbing & Sanitation</option>
                  <option value="Deep Cleaning & Sanitization">Deep Cleaning & Sanitization</option>
                  <option value="Painters & Waterproofing">Painters & Waterproofing</option>
                </select>
              </div>
            </div>

            <button
              id="run-ai-forecast-btn"
              onClick={handleRunAiForecast}
              disabled={isAiLoading}
              className="px-6 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isAiLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Generating Predictive AI Model...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  Run AI Demand & Allocation Simulation
                </>
              )}
            </button>
          </div>

          {/* AI Forecast Results Display */}
          {forecastResult && (
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-6 animate-in fade-in text-[#231715]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD5] pb-4">
                <div>
                  <div className="text-xs font-bold text-[#8B1D31] uppercase tracking-wider">
                    Prediction Horizon: Next 14 Days
                  </div>
                  <h3 className="text-xl font-bold text-[#231715]">
                    Cooperative Workforce Demand & Dispatch Directives
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-xs font-bold">
                    +{forecastResult.projectedDemandGrowthPct}% Projected Volume Surge
                  </span>
                </div>
              </div>

              {/* AI Strategic Summary */}
              <div className="p-4 rounded-xl bg-[#FBF0F2] border border-[#F0CCD3] text-xs text-[#231715] leading-relaxed font-medium">
                <span className="font-bold text-[#8B1D31]">AI Strategic Rationale: </span>
                {forecastResult.aiInsightSummary}
              </div>

              {/* High Demand Trades Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#5A4D4A] uppercase tracking-wider">
                  Trade-Level Cooperative Mobilization Plan:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {forecastResult.highDemandTrades.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-[#E8DFD5] bg-[#FAF7F2] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#231715] text-sm">{item.trade}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            item.priorityLevel === "CRITICAL"
                              ? "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3]"
                              : item.priorityLevel === "HIGH"
                              ? "bg-[#FBF4E8] text-[#8F5B12] border border-[#ECD9B8]"
                              : "bg-[#FAF7F2] text-[#231715] border border-[#E8DFD5]"
                          }`}
                        >
                          {item.priorityLevel} PRIORITY
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2 rounded-lg border border-[#E8DFD5]">
                          <div className="text-[10px] text-[#847571]">Projected Jobs</div>
                          <div className="font-bold text-[#231715]">{item.projectedJobs} bookings</div>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-[#E8DFD5]">
                          <div className="text-[10px] text-[#847571]">Available Roster</div>
                          <div className="font-bold text-[#8B1D31]">
                            {item.availableCoopWorkers} artisans
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[#5A4D4A] bg-white p-2.5 rounded-lg border border-[#E8DFD5]">
                        <span className="font-bold text-[#8B1D31]">Action Plan: </span>
                        {item.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Welfare Fund Generation projection */}
              <div className="bg-[#FAF7F2] border border-[#E8DFD5] p-4 rounded-xl text-xs text-[#231715] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-[#231715]">Projected Welfare & Pension Accrual</div>
                  <div className="text-[#5A4D4A]">{forecastResult.welfareFundImpact}</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer">
                  Issue Dispatch Directive to Societies
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Worker Verification Queue */}
      {adminTab === "VERIFICATION_QUEUE" && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-6 text-[#231715]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#231715]">
                Artisan KYC & Police Verification Queue
              </h2>
              <p className="text-xs text-[#847571]">
                Review and approve new member applications from affiliated primary labour societies.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#E8DFD5]">
            {pendingWorkers.map((worker) => (
              <div
                key={worker.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#231715]">{worker.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#5A4D4A] border border-[#E8DFD5]">
                      {worker.trade}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        worker.status === "APPROVED"
                          ? "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3]"
                          : worker.status === "REJECTED"
                          ? "bg-white text-[#847571] border border-[#E8DFD5]"
                          : "bg-[#FBF4E8] text-[#8F5B12] border border-[#ECD9B8]"
                      }`}
                    >
                      {worker.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#847571]">{worker.society}</div>
                  <div className="text-xs text-[#5A4D4A] flex items-center gap-3">
                    <span>Cert: <strong>{worker.certification}</strong></span>
                    <span>Exp: <strong>{worker.experience} Years</strong></span>
                    <span className="text-[#8B1D31] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1D31]" />
                      Police Verification Document Attached
                    </span>
                  </div>
                </div>

                {worker.status === "PENDING" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleWorkerAction(worker.id, "APPROVED")}
                      className="px-3 py-1.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve & Issue Badge
                    </button>
                    <button
                      onClick={() => handleWorkerAction(worker.id, "REJECTED")}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF7F2] border border-[#E8DFD5] text-[#5A4D4A] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[#847571]">Decision Recorded</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Affiliated Cooperative Societies */}
      {adminTab === "SOCIETIES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COOPERATIVE_SOCIETIES.map((soc) => (
            <div
              key={soc.id}
              className="bg-white rounded-xl border border-[#E8DFD5] p-6 shadow-xs space-y-4 text-[#231715]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31]">
                    Reg: {soc.registrationNumber}
                  </span>
                  <h3 className="text-base font-bold text-[#231715] mt-1">{soc.name}</h3>
                  <div className="text-xs text-[#847571]">
                    {soc.district}, {soc.state}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#8F5B12] bg-[#FBF4E8] border border-[#ECD9B8] px-2 py-1 rounded-lg">
                    ★ {soc.rating}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-[#E8DFD5]">
                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFD5]">
                  <div className="text-[10px] text-[#847571]">Total Members</div>
                  <div className="font-bold text-[#231715]">{soc.totalMembers}</div>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFD5]">
                  <div className="text-[10px] text-[#847571]">Active Artisans</div>
                  <div className="font-bold text-[#8B1D31]">{soc.verifiedArtisans}</div>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFD5]">
                  <div className="text-[10px] text-[#847571]">Welfare Paid</div>
                  <div className="font-bold text-[#8B1D31]">₹{(soc.welfareDisbursementsYTD / 100000).toFixed(1)}L</div>
                </div>
              </div>

              <div className="text-xs text-[#5A4D4A] flex items-center justify-between pt-2">
                <span>Contact: {soc.contactPerson}</span>
                <span className="font-bold text-[#231715]">{soc.phone}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
