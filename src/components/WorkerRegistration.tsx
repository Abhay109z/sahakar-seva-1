import React, { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  Building2,
  User,
  Phone,
  MapPin,
  IndianRupee,
  FileCheck,
} from "lucide-react";
import { COOPERATIVE_SOCIETIES } from "../data/workersData";

interface WorkerRegistrationProps {
  onRegisterSuccess?: () => void;
}

export const WorkerRegistration: React.FC<WorkerRegistrationProps> = ({
  onRegisterSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    trade: "Electrician",
    experienceYears: 4,
    societyId: COOPERATIVE_SOCIETIES[0].id,
    district: "South Delhi",
    certIssuingBody: "NCVT / ITI",
    certTitle: "Electrician Grade A Certification",
    certNumber: "NCVT-DL-2022-8419",
    bankAccount: "100984128912",
    ifscCode: "SBIN0001234",
    hasPoliceVerification: true,
    agreesToCooperativeBylaws: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const workerPayload = {
      id: `wrk-${Date.now()}`,
      name: formData.fullName,
      trade: formData.trade,
      experienceYears: Number(formData.experienceYears),
      societyId: formData.societyId,
      societyName:
        COOPERATIVE_SOCIETIES.find((s) => s.id === formData.societyId)?.name ||
        "Cooperative Society",
      district: formData.district,
      rating: 5.0,
      completedJobs: 0,
      policeVerificationStatus: formData.hasPoliceVerification
        ? "VERIFIED"
        : "IN_PROGRESS",
      avatar:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=256",
      phone: formData.phone,
      isAvailable: true,
      tier: "L1_SKILLED",
      certificates: [
        {
          id: `cert-${Date.now()}`,
          title: formData.certTitle,
          issuingBody: formData.certIssuingBody,
          issueDate: "2023",
          credentialId: formData.certNumber,
          verificationHash: "sha256-verified-coop",
        },
      ],
      socialSecurity: {
        pmsbyEnrolled: true,
        pmjayEnrolled: true,
        pensionFundBalanceRupees: 500,
        monthlyWelfareContributionRupees: 350,
      },
      currentGeoLocation: {
        lat: 28.5355,
        lng: 77.241,
        address: formData.district,
      },
    };

    try {
      await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workerPayload),
      });
    } catch (e) {
      console.warn("Backend registration endpoint fallback:", e);
    }

    setLoading(false);
    setSubmitted(true);
    if (onRegisterSuccess) {
      setTimeout(onRegisterSuccess, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 border border-[#E8DFD5] shadow-xs max-w-2xl mx-auto my-8 text-center space-y-4 animate-in fade-in text-[#231715]">
        <div className="w-14 h-14 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="px-3 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] text-xs font-semibold border border-[#F0CCD3]">
            Cooperative Registration Provisional Approval
          </span>
          <h2 className="text-2xl font-bold text-[#231715]">
            Welcome to Sahakar Seva, {formData.fullName}!
          </h2>
          <p className="text-xs text-[#5A4D4A] max-w-md mx-auto">
            Your profile has been registered under{" "}
            <strong className="text-[#231715]">
              {COOPERATIVE_SOCIETIES.find((s) => s.id === formData.societyId)?.name}
            </strong>
            . You will now receive direct customer dispatches with guaranteed 92% fair wages and
            PMSBY insurance coverage.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-xl p-4 text-left text-xs space-y-2 border border-[#E8DFD5]">
          <div className="flex justify-between">
            <span className="text-[#847571]">Provisional Member ID:</span>
            <span className="font-mono font-bold text-[#8B1D31]">
              COOP-{formData.trade.slice(0, 3).toUpperCase()}-9401
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#847571]">Welfare & PMSBY Linkage:</span>
            <span className="font-semibold text-[#8B1D31]">Enrolled (Zero Premium)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#847571]">Direct Payout Account:</span>
            <span className="font-mono font-bold text-[#231715]">
              •••• {formData.bankAccount.slice(-4)} ({formData.ifscCode})
            </span>
          </div>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          Register Another Worker / Society Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Banner */}
      <div className="bg-white border border-[#E8DFD5] text-[#231715] rounded-xl p-6 sm:p-8 space-y-2 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] text-[#8B1D31] text-xs font-semibold border border-[#F0CCD3]">
          <UserPlus className="w-3.5 h-3.5 text-[#8B1D31]" />
          Service Provider Onboarding & Society Affiliation
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#231715]">
          Join the Cooperative Service Movement
        </h1>
        <p className="text-xs sm:text-sm text-[#5A4D4A] leading-relaxed">
          Stop paying 25-30% cuts to private gig aggregators. As a member of a registered Labour
          Cooperative Society, you keep 92% direct fair wages, receive ₹5 Lakh insurance, and gain
          society retirement dividends.
        </p>
      </div>

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs space-y-6 text-[#231715]"
      >
        <div className="text-sm font-bold text-[#231715] border-b border-[#E8DFD5] pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-[#8B1D31]" />
          Personal & Trade Profiling
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#5A4D4A]">Full Legal Name (as on Aadhaar):</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Ramesh Chandra Verma"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Mobile Number (Aadhaar linked):</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 00000"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#5A4D4A]">Primary Skilled Trade:</label>
            <select
              value={formData.trade}
              onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-medium"
            >
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Painter">Painter</option>
              <option value="AC & Appliance Technician">AC & Appliance Technician</option>
              <option value="Domestic Housekeeper">Domestic Housekeeper</option>
              <option value="Caregiver & Elder Aide">Caregiver & Elder Aide</option>
              <option value="Gardener">Gardener</option>
              <option value="Commercial Cleaner">Commercial Cleaner</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Years of Field Experience:</label>
            <input
              type="number"
              min={1}
              max={40}
              value={formData.experienceYears}
              onChange={(e) =>
                setFormData({ ...formData, experienceYears: Number(e.target.value) })
              }
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-medium"
            />
          </div>
        </div>

        {/* Cooperative Affiliation */}
        <div className="text-sm font-bold text-[#231715] border-b border-[#E8DFD5] pb-3 pt-2 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#8B1D31]" />
          Primary Labour Cooperative Society Affiliation
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#5A4D4A]">Affiliated Society:</label>
            <select
              value={formData.societyId}
              onChange={(e) => setFormData({ ...formData, societyId: e.target.value })}
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-medium"
            >
              {COOPERATIVE_SOCIETIES.map((soc) => (
                <option key={soc.id} value={soc.id}>
                  {soc.name} ({soc.district})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Operating District / Cluster:</label>
            <input
              type="text"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="e.g. South Delhi / Andheri West"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>
        </div>

        {/* Certification & Skill Profiling */}
        <div className="text-sm font-bold text-[#231715] border-b border-[#E8DFD5] pb-3 pt-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#8B1D31]" />
          Skill Certification & Police Verification
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#5A4D4A]">Certifying Body:</label>
            <select
              value={formData.certIssuingBody}
              onChange={(e) => setFormData({ ...formData, certIssuingBody: e.target.value })}
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-medium"
            >
              <option value="NCVT / ITI">NCVT / ITI Certificate</option>
              <option value="NSDC">NSDC / Skill India L4</option>
              <option value="Cooperative Federation Academy">Cooperative Federation Academy</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Certificate Title:</label>
            <input
              type="text"
              required
              value={formData.certTitle}
              onChange={(e) => setFormData({ ...formData, certTitle: e.target.value })}
              placeholder="e.g. Electrician Grade A"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Certificate / Roll Number:</label>
            <input
              type="text"
              required
              value={formData.certNumber}
              onChange={(e) => setFormData({ ...formData, certNumber: e.target.value })}
              placeholder="e.g. ITI-DL-99120"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
            />
          </div>
        </div>

        {/* Direct Bank Account */}
        <div className="text-sm font-bold text-[#231715] border-b border-[#E8DFD5] pb-3 pt-2 flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-[#8B1D31]" />
          Direct Fair-Wage Payout Account
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#5A4D4A]">Cooperative / Bank Account Number:</label>
            <input
              type="text"
              required
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              placeholder="Enter bank or cooperative credit account"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-[#5A4D4A]">Bank IFSC Code:</label>
            <input
              type="text"
              required
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
              placeholder="e.g. SBIN0001234"
              className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none font-mono uppercase"
            />
          </div>
        </div>

        {/* Verifications Checklist */}
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5] space-y-2.5 text-xs">
          <label className="flex items-center gap-2 font-medium text-[#5A4D4A] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasPoliceVerification}
              onChange={(e) =>
                setFormData({ ...formData, hasPoliceVerification: e.target.checked })
              }
              className="w-4 h-4 accent-[#8B1D31] rounded cursor-pointer"
            />
            <span>
              I possess a clear District Police Character Verification certificate (or agree to cooperative federation biometrics audit).
            </span>
          </label>

          <label className="flex items-center gap-2 font-medium text-[#5A4D4A] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreesToCooperativeBylaws}
              onChange={(e) =>
                setFormData({ ...formData, agreesToCooperativeBylaws: e.target.checked })
              }
              className="w-4 h-4 accent-[#8B1D31] rounded cursor-pointer"
            />
            <span>
              I agree to the Labour Cooperative Federation fair-wage charter (92% direct payout), welfare fund deductions (5%), and zero price gouging.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.agreesToCooperativeBylaws}
          className="w-full py-3 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Registering on Cooperative Federation Ledger...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              Submit Service Provider Registration
            </>
          )}
        </button>
      </form>
    </div>
  );
};
