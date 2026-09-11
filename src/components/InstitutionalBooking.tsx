import React, { useState } from "react";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Send,
} from "lucide-react";

export const InstitutionalBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    institutionName: "Greenwood Heights Cooperative Housing Society (RWA)",
    contactPerson: "Dr. Arvind Mehta",
    email: "management@greenwoodrwa.org",
    phone: "+91 98112 34567",
    institutionType: "RWA / Residential Society",
    servicePackage: "Annual Society Plumbing & Overhead Tank Maintenance",
    estimatedUnits: "240 Apartments",
    clusterLocation: "Delhi NCR - Indraprastha Cluster",
    requirements: "Need 4 certified plumbers and 2 electricians for comprehensive annual safety audit and monthly maintenance.",
  });

  const [submitted, setSubmitted] = useState(false);

  const INSTITUTIONAL_PACKAGES = [
    {
      id: "pkg-rwa",
      title: "RWA & Housing Society AMC",
      desc: "Dedicated on-campus cooperative technicians (plumber, electrician, gardener) on monthly retainer.",
      startingRate: "₹14,999 / month",
      popular: true,
    },
    {
      id: "pkg-audit",
      title: "Commercial Safety & Energy Audit",
      desc: "Thermal imaging of switchboards, fire-safety compliance, earthing and transformer check.",
      startingRate: "₹8,499 / audit",
      popular: false,
    },
    {
      id: "pkg-campus",
      title: "Campus Facility Cleaning & Sanitization",
      desc: "Daily or weekly mechanized cleaning for schools, colleges, community halls, and hospitals.",
      startingRate: "₹19,500 / month",
      popular: false,
    },
    {
      id: "pkg-green",
      title: "Landscape & Community Gardening",
      desc: "Certified cooperative horticulturists for tree pruning, organic soil composting, and lawn care.",
      startingRate: "₹9,999 / month",
      popular: false,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="bg-white text-[#231715] rounded-xl p-6 sm:p-8 shadow-xs border border-[#E8DFD5]">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-[#8B1D31]" />
            Institutional & B2B Service Procurement
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#231715]">
            Cooperative Facility Management for RWAs & Institutions
          </h1>
          <p className="text-[#5A4D4A] text-xs sm:text-sm leading-relaxed">
            Eliminate private contractor markups. Contract directly with Labour Cooperative
            Federations for residential societies, universities, hospitals, and commercial campuses.
            100% statutory compliant, police-verified, and guaranteed 92% fair wages for all technicians.
          </p>
        </div>
      </div>

      {/* Package Offerings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INSTITUTIONAL_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl p-5 border border-[#E8DFD5] shadow-xs hover:border-[#8B1D31]/40 hover:shadow-sm transition-all flex flex-col justify-between space-y-3 text-[#231715]"
          >
            <div>
              {pkg.popular && (
                <span className="px-2 py-0.5 rounded-full bg-[#FBF4E8] text-[#8F5B12] text-[10px] font-bold border border-[#ECD9B8]">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-sm font-bold text-[#231715] mt-2">{pkg.title}</h3>
              <p className="text-xs text-[#5A4D4A] mt-1 leading-relaxed">{pkg.desc}</p>
            </div>

            <div className="pt-3 border-t border-[#E8DFD5] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#847571]">Starting at</span>
                <div className="text-xs font-bold text-[#8B1D31]">{pkg.startingRate}</div>
              </div>
              <button
                onClick={() => setFormData({ ...formData, servicePackage: pkg.title })}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F5EFE8] text-[#5A4D4A] hover:text-[#231715] text-xs font-semibold transition-colors border border-[#E8DFD5] cursor-pointer"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Procurement Form */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs max-w-3xl mx-auto text-[#231715]">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-[#E8DFD5] pb-3">
              <h2 className="text-lg font-bold text-[#231715]">
                Request Institutional Quotation & Federation SLA
              </h2>
              <p className="text-xs text-[#847571]">
                Federation officers will draft a customized service agreement with dedicated artisans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-[#5A4D4A]">Institution / RWA Name:</label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31]"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A4D4A]">Institution Type:</label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                >
                  <option value="RWA / Residential Society">RWA / Residential Society</option>
                  <option value="Commercial Office / IT Park">Commercial Office / IT Park</option>
                  <option value="Educational Campus / School">Educational Campus / School</option>
                  <option value="Hospital / Healthcare Center">Hospital / Healthcare Center</option>
                  <option value="Government Department">Government Department</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#5A4D4A]">Contact Official / Secretary:</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31]"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A4D4A]">Official Mobile / Landline:</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31]"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A4D4A]">Official Email:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31]"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A4D4A]">Selected Service Package:</label>
                <input
                  type="text"
                  required
                  value={formData.servicePackage}
                  onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-[#5A4D4A]">Specific Facility Scope & Details:</label>
              <textarea
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full mt-1.5 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
              />
            </div>

            <div className="bg-[#FBF0F2] rounded-xl p-4 border border-[#F0CCD3] text-xs text-[#231715] space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#8B1D31]">
                <ShieldCheck className="w-4 h-4 text-[#8B1D31]" />
                Statutory Cooperative Guarantee for Institutions
              </div>
              <p className="text-[11px] text-[#5A4D4A] leading-relaxed">
                All deployed cooperative personnel are covered by PMSBY accidental insurance, PF/ESIC
                standards, and police verification. Direct wage payout ensures high technician retention.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Request Formal Federation Quotation & SLA
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#231715]">
              Institutional Request Logged!
            </h3>
            <p className="text-xs text-[#5A4D4A] max-w-md mx-auto">
              Thank you, {formData.contactPerson}. The Regional Coordinator of Indraprastha Labour
              Cooperative Federation has received the RFP for {formData.institutionName}. An official
              SLA proposal will be emailed to {formData.email} within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
