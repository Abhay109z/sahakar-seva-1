import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  Clock,
  MapPin,
  ShieldAlert,
  Phone,
  CheckCircle2,
  Navigation,
  Zap,
  Droplets,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { Booking } from "../types";
import { COOPERATIVE_WORKERS } from "../data/workersData";

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  onEmergencyBookingCreated: (booking: Booking) => void;
}

const EMERGENCY_TYPES = [
  {
    id: "electrical-hazard",
    title: "Electrical Spark / Short Circuit",
    icon: <Zap className="w-5 h-5 text-[#8B1D31]" />,
    desc: "Main MCB tripping, burning smell, wire sparks",
    rate: 499,
  },
  {
    id: "plumbing-burst",
    title: "Major Pipe Burst / Flooding",
    icon: <Droplets className="w-5 h-5 text-[#8B1D31]" />,
    desc: "Overhead tank pipe rupture, bathroom flood",
    rate: 499,
  },
  {
    id: "lock-door",
    title: "Lockout / Broken Main Door Lock",
    icon: <ShieldAlert className="w-5 h-5 text-[#8B1D31]" />,
    desc: "Key broken inside cylinder, latch jammed",
    rate: 449,
  },
  {
    id: "appliance-leak",
    title: "Gas / Geyser Fire Hazard",
    icon: <Flame className="w-5 h-5 text-[#8B1D31]" />,
    desc: "Gas pipe smell, geyser electrical spark",
    rate: 499,
  },
];

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onEmergencyBookingCreated,
}) => {
  const [emergencyType, setEmergencyType] = useState(EMERGENCY_TYPES[0].title);
  const [urgencyNotes, setUrgencyNotes] = useState("");
  const [step, setStep] = useState<"SELECT" | "DISPATCHING" | "CONFIRMED">("SELECT");
  const [matchedWorker, setMatchedWorker] = useState<any>(null);
  const [etaMinutes, setEtaMinutes] = useState(18);

  const handleStartDispatch = () => {
    setStep("DISPATCHING");

    setTimeout(() => {
      // Auto-assign nearest emergency stand-by worker
      const worker = COOPERATIVE_WORKERS[0];
      setMatchedWorker(worker);
      setStep("CONFIRMED");

      const newBooking: Booking = {
        id: `SOS-COOP-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        customerName: "Cooperative Citizen",
        customerPhone: "+91 98765 43210",
        customerAddress: `Emergency Site, Block C, ${selectedLocation.split(" - ")[0]}`,
        customerCity: selectedLocation.split(" - ")[0],
        items: [
          {
            categoryTitle: "Emergency 30-Min SOS",
            subCategory: {
              id: "sos-urgent",
              categoryId: "cat-emergency",
              title: emergencyType,
              description: urgencyNotes,
              estimatedDurationMins: 45,
              basePriceRupees: 499,
              fairWagePercent: 92,
              rating: 5.0,
              totalBookings: 120,
              included: ["Priority 30-min on-site arrival", "Immediate safety hazard isolation"],
            },
            quantity: 1,
            date: "Today (Immediate Dispatch)",
            timeSlot: "Within 30 Minutes",
            serviceAddress: `Emergency Site, Block C, ${selectedLocation.split(" - ")[0]}`,
            isEmergency: true,
          },
        ],
        totalAmountRupees: 499,
        workerPayoutRupees: Math.round(499 * 0.92),
        welfarePoolRupees: Math.round(499 * 0.05),
        emergencyReserveRupees: Math.round(499 * 0.03),
        platformCommissionRupees: 0,
        status: "DISPATCHED",
        assignedWorker: worker,
        isEmergency: true,
        scheduledDate: "Today",
        scheduledTime: "Immediate Dispatch",
        paymentMethod: "CASH_ON_SERVICE",
        paymentStatus: "PENDING_CASH",
        otp: Math.floor(1000 + Math.random() * 9000).toString(),
      };

      onEmergencyBookingCreated(newBooking);
    }, 2400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white border border-[#E8DFD5] rounded-xl shadow-2xl overflow-hidden text-[#231715] animate-in zoom-in-95">
        {/* Emergency Header */}
        <div className="bg-[#8B1D31] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#F5EFE8]/80">
                Cooperative Rapid Response Unit
              </div>
              <h3 className="text-lg font-bold text-white">Emergency 30-Min On-Demand Dispatch</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {step === "SELECT" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#231715]">
                  Select Emergency Trade / Hazard:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                  {EMERGENCY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmergencyType(type.title)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        emergencyType === type.title
                          ? "bg-[#FBF0F2] border-[#8B1D31] ring-1 ring-[#8B1D31] shadow-2xs"
                          : "bg-white border-[#E8DFD5] hover:border-[#8B1D31]/40 hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[#FAF7F2] shrink-0 border border-[#E8DFD5]">{type.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-[#231715]">{type.title}</div>
                        <div className="text-[10px] text-[#847571] mt-0.5">{type.desc}</div>
                        <div className="text-[11px] font-bold text-[#8B1D31] mt-1">
                          ₹{type.rate} flat emergency fee
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#231715]">Location for Emergency Arrival:</label>
                <div className="flex items-center gap-2 mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#231715]">
                  <MapPin className="w-4 h-4 text-[#8B1D31] shrink-0" />
                  <span className="font-semibold">{selectedLocation}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#231715]">Emergency Details / Symptoms:</label>
                <input
                  type="text"
                  value={urgencyNotes}
                  onChange={(e) => setUrgencyNotes(e.target.value)}
                  placeholder="e.g. Main switchboard smoking, water gushing from pipe"
                  className="w-full text-xs p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none mt-1"
                />
              </div>

              <div className="bg-[#FBF4E8] border border-[#ECD9B8] rounded-xl p-3 text-xs text-[#8F5B12] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#8F5B12]">
                  <ShieldAlert className="w-4 h-4 text-[#8F5B12]" />
                  No Predatory Surge Pricing
                </div>
                <p className="text-[11px] text-[#8F5B12]/90 leading-relaxed">
                  Commercial gig apps hike prices 2x–3x during emergencies. Sahakar Seva charges only a
                  modest standard fee, of which 92% goes directly to the on-call artisan.
                </p>
              </div>

              <button
                id="confirm-emergency-dispatch-btn"
                onClick={handleStartDispatch}
                className="w-full py-3 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                Dispatch Nearest Cooperative Artisan Now
              </button>
            </div>
          )}

          {step === "DISPATCHING" && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#F0CCD3] animate-ping" />
                <div className="w-14 h-14 rounded-full bg-[#8B1D31] text-white flex items-center justify-center shadow-md">
                  <Navigation className="w-6 h-6 animate-spin" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-[#231715]">
                  Scanning Cooperative Sector Hubs...
                </h4>
                <p className="text-xs text-[#847571] max-w-sm mx-auto">
                  Locating verified standby artisans affiliated with Indraprastha Labour Cooperative
                  Society within a 4 km radius.
                </p>
              </div>
            </div>
          )}

          {step === "CONFIRMED" && matchedWorker && (
            <div className="space-y-4">
              <div className="bg-[#FBF0F2] border border-[#F0CCD3] rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#8B1D31] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8B1D31]">
                    Artisan Dispatched Successfully
                  </div>
                  <div className="text-sm font-extrabold text-[#231715]">
                    Estimated Arrival in ~{etaMinutes} Minutes
                  </div>
                </div>
              </div>

              {/* Matched Worker Card */}
              <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-3.5 flex items-center gap-3.5">
                <img
                  src={matchedWorker.avatar}
                  alt={matchedWorker.name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#E8DFD5] shrink-0"
                />
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#231715]">
                      {matchedWorker.name}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3]">
                      ON ROUTE
                    </span>
                  </div>
                  <div className="text-xs text-[#847571] truncate">{matchedWorker.societyName}</div>
                  <div className="text-[11px] text-[#8B1D31] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8B1D31]" />
                    Distance: 1.8 km • Direct Line: {matchedWorker.phone}
                  </div>
                </div>
              </div>

              {/* Security OTP Verification */}
              <div className="bg-[#FBF4E8] border border-[#ECD9B8] text-[#8F5B12] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8F5B12]">
                    Cooperative Safety OTP
                  </div>
                  <div className="text-xs text-[#8F5B12]/80">
                    Share only with the worker upon physical arrival
                  </div>
                </div>
                <div className="text-2xl font-mono font-bold text-[#8F5B12] tracking-widest bg-white border border-[#ECD9B8] px-3 py-1 rounded-lg">
                  {Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${matchedWorker.phone}`}
                  className="flex-1 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Artisan
                </a>

                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-white hover:bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Track in My Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
