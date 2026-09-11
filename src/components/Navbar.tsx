import React, { useState } from "react";
import {
  ShieldCheck,
  MapPin,
  Globe2,
  AlertTriangle,
  Users,
  Building2,
  UserPlus,
  ShoppingBag,
  Clock,
  ChevronDown,
  Briefcase,
  Check,
} from "lucide-react";
import { LanguageCode, NavigationTab } from "../types";
import { TRANSLATIONS } from "../data/translations";

interface NavbarProps {
  currentTab: NavigationTab | string;
  setCurrentTab: (tab: any) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  cartCount: number;
  openCart?: () => void;
  onOpenCart?: () => void;
  openEmergency?: () => void;
  onOpenEmergency?: () => void;
  openMyBookings?: () => void;
  onOpenMyBookings?: () => void;
}

const LOCATIONS = [
  "Delhi NCR - Indraprastha Cluster",
  "Mumbai Metropolitan - Shramik Cluster",
  "Bengaluru Urban - Karmika Cluster",
  "Kolkata & Howrah - Sramik Cluster",
  "Hyderabad - Sahakara Cluster",
  "Chennai - Thozhilalar Cluster",
  "Pune & Pimpri Chinchwad",
  "Ahmedabad & Gandhinagar",
];

const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  selectedLocation,
  setSelectedLocation,
  cartCount,
  openCart,
  onOpenCart,
  openEmergency,
  onOpenEmergency,
  openMyBookings,
  onOpenMyBookings,
}) => {
  const handleOpenCart = onOpenCart || openCart || (() => {});
  const handleOpenEmergency = onOpenEmergency || openEmergency || (() => {});
  const handleOpenMyBookings = onOpenMyBookings || openMyBookings || (() => {});

  const t = TRANSLATIONS[language];
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8DFD5] shadow-xs text-[#231715]">
      {/* Top Value Ticker (Signature Costa Espresso Bar) */}
      <div className="bg-[#231715] text-[#D8CDC5] px-4 py-1.5 text-[11px] font-medium border-b border-[#382622]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F1A2B2]" />
              Multi-State Co-operative Societies Act, 2002
            </span>
            <span className="text-[#5A4D4A] hidden sm:inline">•</span>
            <span className="text-[#D8CDC5] font-medium hidden sm:inline">
              Guaranteed <strong className="text-white font-bold">92% Direct Fair Wages</strong> to Artisans • Zero Corporate Markups
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#D8CDC5] text-[11px]">
            <span className="hidden md:inline text-[#A89A92]">Toll-Free: <strong className="text-white">1800-200-7242</strong></span>
            <span className="hidden md:inline text-[#5A4D4A]">•</span>
            <button
              onClick={handleOpenEmergency}
              className="text-[#F1A2B2] hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              30-Min Emergency SOS
            </button>
          </div>
        </div>
      </div>

      {/* Main Professional Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => setCurrentTab("SERVICES")}
              className="flex items-center gap-2.5 text-left group select-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#8B1D31] text-white flex items-center justify-center font-extrabold text-base tracking-tight shadow-xs group-hover:bg-[#731627] transition-colors">
                SS
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-lg sm:text-xl text-[#231715] tracking-tight">
                    Sahakar <span className="text-[#8B1D31]">Seva</span>
                  </span>
                </div>
                <div className="text-[10px] text-[#847571] font-semibold tracking-wider uppercase mt-0.5">
                  Labour Cooperative Platform
                </div>
              </div>
            </button>

            {/* Location Selector (Clean Dropdown Pill) */}
            <div className="relative">
              <button
                id="location-selector-btn"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 bg-[#F5EFE8] hover:bg-[#EFE6DC] border border-[#E5DDD2] px-3 py-1.5 rounded-full text-xs font-semibold text-[#231715] transition-colors max-w-[155px] sm:max-w-[220px] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8B1D31] shrink-0" />
                <span className="truncate">{selectedLocation.split(" - ")[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#847571] shrink-0" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E8DFD5] py-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#847571] uppercase tracking-wider">
                    Select Cooperative Cluster
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                        selectedLocation === loc
                          ? "font-bold text-[#8B1D31] bg-[#FBF0F2]"
                          : "text-[#5A4D4A]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8B1D31] shrink-0" />
                        <span>{loc}</span>
                      </div>
                      {selectedLocation === loc && (
                        <Check className="w-3.5 h-3.5 text-[#8B1D31] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            <button
              id="nav-services-btn"
              onClick={() => setCurrentTab("SERVICES")}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === "SERVICES" || currentTab === "marketplace"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              Services Catalog
            </button>

            <button
              id="nav-workers-btn"
              onClick={() => setCurrentTab("WORKERS")}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === "WORKERS" || currentTab === "workers"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#847571]" />
              Verified Artisans
            </button>

            <button
              id="nav-welfare-btn"
              onClick={() => setCurrentTab("WELFARE")}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === "WELFARE" || currentTab === "welfare"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B1D31]" />
              Welfare Fund
            </button>

            <button
              id="nav-institutional-btn"
              onClick={() => setCurrentTab("INSTITUTIONAL")}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === "INSTITUTIONAL"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#847571]" />
              Institutional / RWA AMC
            </button>

            <button
              id="nav-admin-btn"
              onClick={() => setCurrentTab("FEDERATION_ADMIN")}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === "FEDERATION_ADMIN" || currentTab === "admin"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#847571]" />
              Federation Portal
            </button>

            <button
              id="nav-join-btn"
              onClick={() => setCurrentTab("JOIN_COOP")}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === "JOIN_COOP" || currentTab === "register"
                  ? "text-[#8B1D31] bg-[#FBF0F2] font-bold border border-[#F0CCD3]"
                  : "text-[#5A4D4A] hover:text-[#231715] hover:bg-[#F5EFE8]"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-[#847571]" />
              Join as Artisan
            </button>
          </nav>

          {/* Right Action Controls (Language, My Bookings, Cart) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 bg-[#F5EFE8] hover:bg-[#EFE6DC] text-[#231715] px-2.5 py-1.5 rounded-full text-xs font-semibold border border-[#E5DDD2] transition-colors cursor-pointer"
                title="Change Language"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#847571]" />
                <span className="uppercase text-[11px] font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#847571]" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#E8DFD5] py-1.5 z-50 max-h-72 overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                        language === l.code ? "font-bold text-[#8B1D31] bg-[#FBF0F2]" : "text-[#5A4D4A]"
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-[#847571] uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* My Bookings */}
            <button
              id="my-bookings-nav-btn"
              onClick={handleOpenMyBookings}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#231715] hover:text-[#8B1D31] bg-[#F5EFE8] hover:bg-[#EFE6DC] px-3 py-1.5 rounded-full border border-[#E5DDD2] transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#847571]" />
              <span>My Orders</span>
            </button>

            {/* Cart Trigger */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={handleOpenCart}
              className="relative flex items-center gap-2 bg-[#8B1D31] hover:bg-[#731627] text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-black bg-white text-[#8B1D31] rounded-full shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-[#E8DFD5] scrollbar-none text-xs font-semibold text-[#5A4D4A]">
          <button
            onClick={() => setCurrentTab("SERVICES")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "SERVICES" || currentTab === "marketplace"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setCurrentTab("WORKERS")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "WORKERS" || currentTab === "workers"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            Artisans
          </button>
          <button
            onClick={() => setCurrentTab("WELFARE")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "WELFARE" || currentTab === "welfare"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            Welfare Fund
          </button>
          <button
            onClick={() => setCurrentTab("INSTITUTIONAL")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "INSTITUTIONAL"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            RWAs & B2B
          </button>
          <button
            onClick={() => setCurrentTab("FEDERATION_ADMIN")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "FEDERATION_ADMIN" || currentTab === "admin"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            Federation Portal
          </button>
          <button
            onClick={() => setCurrentTab("JOIN_COOP")}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentTab === "JOIN_COOP" || currentTab === "register"
                ? "bg-[#8B1D31] text-white font-bold"
                : "bg-[#F5EFE8] text-[#5A4D4A]"
            }`}
          >
            Join as Artisan
          </button>
          <button
            onClick={handleOpenMyBookings}
            className="px-3 py-1 rounded-full whitespace-nowrap bg-[#F5EFE8] text-[#5A4D4A]"
          >
            My Orders
          </button>
        </div>
      </div>
    </header>
  );
};
