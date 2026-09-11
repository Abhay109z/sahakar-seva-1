import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Zap,
  Droplets,
  Wrench,
  Search,
  Sparkles,
  Phone,
  Clock,
  CheckCircle2,
  Users,
} from "lucide-react";
import { COOPERATIVE_WORKERS, COOPERATIVE_SOCIETIES } from "../data/workersData";
import { CooperativeWorker } from "../types";

interface GeoSpatialMapProps {
  selectedLocation: string;
  onSelectWorker?: (worker: CooperativeWorker) => void;
}

export const GeoSpatialMap: React.FC<GeoSpatialMapProps> = ({
  selectedLocation,
  onSelectWorker,
}) => {
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [activeWorker, setActiveWorker] = useState<CooperativeWorker | null>(COOPERATIVE_WORKERS[0]);

  const TRADES = ["All", "Electrician", "Plumber", "Carpenter", "House Cleaner", "Caregiver"];

  const filteredWorkers = COOPERATIVE_WORKERS.filter(
    (w) => selectedTrade === "All" || w.trade.toLowerCase().includes(selectedTrade.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-[#E8DFD5] shadow-xs overflow-hidden space-y-0 text-[#231715]">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-[#E8DFD5] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-xs font-semibold">
            <Navigation className="w-3.5 h-3.5 text-[#8B1D31]" />
            Geo-Spatial Cooperative Dispatch Engine
          </div>
          <h2 className="text-xl font-bold text-[#231715] mt-1">
            Real-Time Cluster Map & Artisan Availability
          </h2>
          <p className="text-xs text-[#5A4D4A]">
            Current Cluster: <strong className="text-[#231715]">{selectedLocation}</strong> • Geo-matched to
            prevent dead kilometers and ensure arrival within 30 minutes.
          </p>
        </div>

        {/* Trade Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {TRADES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrade(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTrade === t
                  ? "bg-[#8B1D31] text-white shadow-xs"
                  : "bg-[#FAF7F2] hover:bg-[#F5EFE8] text-[#5A4D4A] border border-[#E8DFD5]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Visual Map Area */}
        <div className="lg:col-span-2 relative min-h-[380px] bg-[#FAF7F2] overflow-hidden flex items-center justify-center p-4">
          {/* Simulated Vector Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8DFD5_1px,transparent_1px),linear-gradient(to_bottom,#E8DFD5_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />

          {/* Radial radar wave around selected hub */}
          <div className="absolute w-80 h-80 rounded-full border border-[#8B1D31]/20 animate-ping pointer-events-none" />
          <div className="absolute w-56 h-56 rounded-full border border-[#8B1D31]/30 animate-pulse pointer-events-none" />

          {/* Central Customer Location Pin */}
          <div className="absolute z-20 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#8B1D31] text-white flex items-center justify-center shadow-md ring-4 ring-[#FBF0F2]">
              <MapPin className="w-5 h-5 fill-white" />
            </div>
            <span className="text-[10px] font-bold text-[#231715] bg-white px-2 py-0.5 rounded-full mt-1 border border-[#E8DFD5] shadow-xs">
              Your Location ({selectedLocation.split(" - ")[0]})
            </span>
          </div>

          {/* Worker Pins mapped radially */}
          {filteredWorkers.map((worker, idx) => {
            const angle = (idx / filteredWorkers.length) * 2 * Math.PI;
            const distanceOffset = 80 + (idx % 3) * 45;
            const x = Math.cos(angle) * distanceOffset;
            const y = Math.sin(angle) * distanceOffset;

            const isSelected = activeWorker?.id === worker.id;

            return (
              <button
                key={worker.id}
                onClick={() => setActiveWorker(worker)}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute z-30 group transition-all transform hover:scale-110 cursor-pointer ${
                  isSelected ? "scale-110" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className={`w-9 h-9 rounded-full object-cover border-2 transition-all shadow-xs ${
                      isSelected
                        ? "border-[#8B1D31] ring-4 ring-[#F0CCD3]"
                        : "border-[#8B1D31] hover:border-[#731627]"
                    }`}
                  />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#8B1D31] border-2 border-white" />
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#231715] text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {worker.name} ({worker.trade.split(" ")[0]})
                </div>
              </button>
            );
          })}

          {/* Map Controls Overlay */}
          <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-xs text-[#231715] p-2.5 rounded-lg text-[11px] border border-[#E8DFD5] shadow-xs flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#8B1D31] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8B1D31] animate-pulse" />
              {filteredWorkers.length} Standby Artisans
            </span>
            <span className="text-[#E8DFD5]">|</span>
            <span className="text-[#5A4D4A]">Avg Response: 18 mins</span>
          </div>
        </div>

        {/* Selected Worker Info Sidebar */}
        <div className="p-5 bg-[#FAF7F2]/80 border-t lg:border-t-0 lg:border-l border-[#E8DFD5] flex flex-col justify-between space-y-4">
          {activeWorker ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={activeWorker.avatar}
                  alt={activeWorker.name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#E8DFD5] shadow-xs shrink-0"
                />
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-[#231715] truncate">
                      {activeWorker.name}
                    </h3>
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#FBF4E8] border border-[#ECD9B8] text-[#8F5B12]">
                      ★ {activeWorker.rating}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#8B1D31]">{activeWorker.trade}</p>
                  <p className="text-[11px] text-[#847571] truncate">
                    {activeWorker.societyName}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E8DFD5] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#847571]">Live Distance:</span>
                  <span className="font-semibold text-[#231715]">1.8 km (Sector Hub)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Cooperative Society ID:</span>
                  <span className="font-mono font-bold text-[#8B1D31]">
                    {activeWorker.cooperativeMemberId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Certification:</span>
                  <span className="font-medium text-[#5A4D4A] truncate max-w-[160px]">
                    {activeWorker.certificates[0]?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Police KYC:</span>
                  <span className="font-semibold text-[#8B1D31] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B1D31]" />
                    Verified & Cleared
                  </span>
                </div>
              </div>

              <div className="bg-[#FBF0F2] rounded-lg p-3 border border-[#F0CCD3] text-[11px] text-[#231715] leading-snug">
                <strong className="text-[#8B1D31]">Cooperative Dispatch Guarantee:</strong> 92% goes directly to this artisan.
                No middleman surcharge.
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`tel:${activeWorker.phone}`}
                  className="flex-1 py-2 rounded-lg bg-white hover:bg-[#FAF7F2] border border-[#E8DFD5] text-[#5A4D4A] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Artisan
                </a>

                <button
                  onClick={() => onSelectWorker && onSelectWorker(activeWorker)}
                  className="flex-1 py-2 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Request Dispatch
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#847571] text-xs">
              Select a marker on the map to inspect artisan credentials
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
