import React, { useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  Award,
  Star,
  MapPin,
  CheckCircle2,
  FileCheck,
  Calendar,
  X,
  Phone,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { CooperativeWorker, LanguageCode } from "../types";
import { COOPERATIVE_WORKERS, COOPERATIVE_SOCIETIES } from "../data/workersData";

interface WorkerDirectoryProps {
  language: LanguageCode;
  onBookWorker?: (worker: CooperativeWorker) => void;
}

export const WorkerDirectory: React.FC<WorkerDirectoryProps> = ({
  language,
  onBookWorker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [selectedWorkerForCert, setSelectedWorkerForCert] = useState<CooperativeWorker | null>(null);

  const TRADES = [
    "All",
    "Electrician",
    "Plumber",
    "Carpenter",
    "House Cleaner",
    "Caregiver & Nursing",
    "AC & Appliance Technician",
  ];

  const filteredWorkers = COOPERATIVE_WORKERS.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.societyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrade =
      selectedTrade === "All" ||
      worker.trade.toLowerCase().includes(selectedTrade.toLowerCase());

    return matchesSearch && matchesTrade;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-4 text-[#231715]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#8B1D31]" />
              National Skill Development (NSDC) & Labour Cooperative Certified
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#231715]">
              Cooperative Artisan & Worker Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4D4A] max-w-2xl leading-relaxed">
              Every worker on Sahakar Seva is an authenticated member of a registered Labour
              Cooperative Society, verified by local police and earning guaranteed 92% fair wages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-[#FBF0F2] text-[#8B1D31] text-xs font-bold border border-[#F0CCD3]">
              {COOPERATIVE_WORKERS.length} Certified Profiles in Roster
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#847571] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by worker name, trade, cooperative society, or district..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#231715] placeholder:text-[#847571] focus:border-[#8B1D31] focus:bg-white focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {TRADES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrade(t)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTrade === t
                    ? "bg-[#8B1D31] text-white shadow-xs font-bold"
                    : "bg-white border border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            id={`worker-card-${worker.id}`}
            className="bg-white rounded-xl border border-[#E8DFD5] hover:border-[#8B1D31]/40 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 text-[#231715] shadow-xs"
          >
            <div className="space-y-3">
              {/* Profile Top Row */}
              <div className="flex items-start gap-3">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#E8DFD5] shadow-xs shrink-0"
                />

                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#231715] truncate">{worker.name}</h3>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#8B1D31] bg-[#FBF0F2] px-1.5 py-0.5 rounded border border-[#F0CCD3]">
                      <Star className="w-3 h-3 fill-[#8B1D31] text-[#8B1D31]" />
                      {worker.rating}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#8B1D31]">{worker.trade}</p>

                  <div className="text-[11px] text-[#847571] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#847571]" />
                    <span>{worker.district}</span>
                  </div>
                </div>
              </div>

              {/* Cooperative Society Badge */}
              <div className="bg-[#FAF7F2] rounded-lg p-3 border border-[#E8DFD5] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#5A4D4A]">Society Affiliation:</span>
                  <span className="font-mono text-[#8B1D31] font-bold text-[10px]">
                    {worker.cooperativeMemberId}
                  </span>
                </div>
                <div className="text-xs text-[#231715] font-medium leading-snug line-clamp-2">
                  {worker.societyName}
                </div>

                <div className="pt-2 border-t border-[#E8DFD5] grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#847571]">Experience:</span>
                    <span className="font-bold text-[#231715] ml-1">{worker.experienceYears} yrs</span>
                  </div>
                  <div>
                    <span className="text-[#847571]">Jobs Done:</span>
                    <span className="font-bold text-[#231715] ml-1">{worker.totalJobsCompleted}+</span>
                  </div>
                </div>
              </div>

              {/* Badges and Verification Checklist in matching colors */}
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {worker.policeVerified && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] font-semibold border border-[#F0CCD3] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#8B1D31]" />
                    Police Verified
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] font-semibold border border-[#F0CCD3] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#8B1D31]" />
                  PMSBY Insured
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] font-semibold border border-[#F0CCD3] flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#8B1D31]" />
                  NSDC / ITI
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedWorkerForCert(worker)}
                className="text-xs font-semibold text-[#8B1D31] hover:text-[#731627] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5" />
                View Skill Passport
              </button>

              <span className="text-xs font-bold text-[#231715]">
                ₹{worker.hourlyRateRupees}/hr (92% wage)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Passport & Certification Modal */}
      {selectedWorkerForCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#E8DFD5] rounded-xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in zoom-in-95 text-[#231715]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedWorkerForCert.avatar}
                  alt={selectedWorkerForCert.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#E8DFD5] shadow-xs"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B1D31]">
                    Cooperative Skill Passport
                  </div>
                  <h3 className="text-lg font-bold text-[#231715]">
                    {selectedWorkerForCert.name}
                  </h3>
                  <div className="text-xs text-[#847571]">
                    Member ID: {selectedWorkerForCert.cooperativeMemberId}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkerForCert(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#847571] hover:text-[#231715] hover:bg-[#F5EFE8] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certification Details */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-[#5A4D4A] uppercase tracking-wider">
                Government & Accredited Certifications:
              </div>

              <div className="space-y-2">
                {selectedWorkerForCert.certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FBF0F2] border border-[#F0CCD3] space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#8B1D31]">
                      <span>{cert.title}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#8B1D31] text-white text-[10px]">
                        VERIFIED
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5A4D4A]">
                      Issuing Body: <span className="font-semibold">{cert.issuingBody}</span>
                    </div>
                    <div className="text-[10px] text-[#847571] font-mono">
                      Certificate No: {cert.certificateNo} • Valid: {cert.validUntil}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security & Insurance Details */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#847571]">Police Character Verification:</span>
                <span className="font-bold text-[#8B1D31] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B1D31]" />
                  Clear & Signed by District SP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#847571]">Insurance ID (PMSBY):</span>
                <span className="font-mono font-bold text-[#231715]">
                  {selectedWorkerForCert.insuranceCardNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#847571]">Cooperative Society:</span>
                <span className="font-bold text-[#231715] text-right">
                  {selectedWorkerForCert.societyName}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedWorkerForCert(null)}
              className="w-full py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Close Skill Passport
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
