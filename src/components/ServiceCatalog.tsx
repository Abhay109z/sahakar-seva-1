import React, { useState } from "react";
import {
  Zap,
  Droplets,
  Hammer,
  Sparkles,
  HeartPulse,
  UtensilsCrossed,
  Car,
  Trees,
  Paintbrush,
  Wrench,
  Search,
  Star,
  ShieldCheck,
  Clock,
  Plus,
  Check,
  BadgeCheck,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { ServiceCategory, SubCategory, LanguageCode } from "../types";
import { SERVICE_CATEGORIES } from "../data/servicesData";
import { TRANSLATIONS } from "../data/translations";

interface ServiceCatalogProps {
  language: LanguageCode;
  onSelectSubCategory: (cat: ServiceCategory, sub: SubCategory) => void;
  openEmergency: () => void;
  cartItemIds: string[];
}

// Unified Costa Crimson & Warm Cream icon styling for harmonious matching color
const ICON_MAP: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  Zap: {
    icon: <Zap className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Droplets: {
    icon: <Droplets className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Hammer: {
    icon: <Hammer className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Sparkles: {
    icon: <Sparkles className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  HeartPulse: {
    icon: <HeartPulse className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Soup: {
    icon: <UtensilsCrossed className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Car: {
    icon: <Car className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Trees: {
    icon: <Trees className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Paintbrush: {
    icon: <Paintbrush className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
  Wrench: {
    icon: <Wrench className="w-5 h-5" />,
    bg: "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3] group-hover:bg-[#8B1D31] group-hover:text-white transition-colors",
    color: "text-[#8B1D31]",
  },
};

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  language,
  onSelectSubCategory,
  openEmergency,
  cartItemIds,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("cat-electrician");
  const [showFairWageExplanation, setShowFairWageExplanation] = useState(false);

  const activeCategory =
    SERVICE_CATEGORIES.find((c) => c.id === activeCategoryId) || SERVICE_CATEGORIES[0];

  // Filter subcategories by search query across all categories or active
  const filteredSubcategories = searchQuery.trim()
    ? SERVICE_CATEGORIES.flatMap((c) =>
        c.subCategories
          .filter(
            (s) =>
              s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((s) => ({ sub: s, cat: c }))
      )
    : activeCategory.subCategories.map((s) => ({ sub: s, cat: activeCategory }));

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Clean Professional Hero & Category Grid */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFD5] shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#8B1D31] animate-pulse" />
            Verified Labour Cooperative Federations Network
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#231715] tracking-tight">
            Trusted home services by certified artisans
          </h1>

          <p className="text-xs sm:text-sm text-[#5A4D4A] max-w-xl mx-auto leading-relaxed">
            Directly connect with certified electricians, plumbers, carpenters, and technicians. Guaranteed{" "}
            <strong className="text-[#231715] font-bold">92% fair wages</strong> with zero corporate commissions.
          </p>

          {/* Clean Search Input */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center bg-[#FAF7F2] rounded-xl p-1 border border-[#E8DFD5] focus-within:border-[#8B1D31] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F0CCD3] transition-all">
              <Search className="w-4 h-4 text-[#847571] ml-3 shrink-0" />
              <input
                id="main-service-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for 'Switchboard repair', 'Deep cleaning', 'AC service'..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent outline-none placeholder:text-[#847571] font-medium text-[#231715]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-2.5 text-xs font-bold text-[#847571] hover:text-[#231715] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Search Pills */}
            <div className="flex items-center justify-center gap-2 mt-2.5 flex-wrap text-[11px] text-[#847571]">
              <span className="font-semibold text-[#5A4D4A]">Popular:</span>
              {["Switchboard", "Tap Leakage", "AC Service", "Deep Cleaning", "Elder Care"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSearchQuery(chip)}
                  className="px-2.5 py-0.5 rounded-full bg-[#F5EFE8] hover:bg-[#EFE6DC] text-[#5A4D4A] border border-[#E5DDD2] transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Icon Grid */}
        <div className="mt-8 pt-6 border-t border-[#E8DFD5]">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-3">
            {SERVICE_CATEGORIES.map((category) => {
              const isSelected = category.id === activeCategoryId && !searchQuery;
              const iconData = ICON_MAP[category.iconName] || {
                icon: <Wrench className="w-5 h-5" />,
                bg: "bg-[#F5EFE8] text-[#5A4D4A] border border-[#E5DDD2]",
                color: "text-[#5A4D4A]",
              };

              return (
                <button
                  key={category.id}
                  id={`category-icon-btn-${category.id}`}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setSearchQuery("");
                  }}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all group cursor-pointer ${
                    isSelected
                      ? "bg-[#FBF0F2] border border-[#F0CCD3] shadow-xs"
                      : "hover:bg-[#FAF7F2] border border-transparent"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      iconData.bg
                    }`}
                  >
                    {iconData.icon}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 line-clamp-2 leading-tight ${
                      isSelected ? "text-[#8B1D31] font-bold" : "text-[#5A4D4A]"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Trust Bar (Clean, authoritative indicators in matching Costa palette) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD5] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FBF0F2] text-[#8B1D31] flex items-center justify-center font-bold text-sm shrink-0 border border-[#F0CCD3]">
            ★
          </div>
          <div>
            <div className="text-xs font-bold text-[#231715]">4.86 / 5 Rating</div>
            <div className="text-[11px] text-[#5A4D4A]">24,000+ happy households</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD5] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FBF0F2] text-[#8B1D31] flex items-center justify-center shrink-0 border border-[#F0CCD3]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#231715]">Police Verified</div>
            <div className="text-[11px] text-[#5A4D4A]">NSDC certified artisans</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD5] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FBF0F2] text-[#8B1D31] flex items-center justify-center shrink-0 border border-[#F0CCD3]">
            <BadgeCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#231715]">92% Direct Wage</div>
            <div className="text-[11px] text-[#8B1D31] font-semibold">Zero corporate markups</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD5] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FBF0F2] text-[#8B1D31] flex items-center justify-center shrink-0 border border-[#F0CCD3]">
            <CheckCircle2 className="w-4 h-4 text-[#8B1D31]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#231715]">₹5L PMSBY Insured</div>
            <div className="text-[11px] text-[#5A4D4A]">30-day service warranty</div>
          </div>
        </div>
      </section>

      {/* 3. Main Service Packages List */}
      <section className="space-y-4">
        {/* Category Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD5] pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#231715]">
              {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory.name}
            </h2>
            <p className="text-xs text-[#847571]">
              {searchQuery
                ? `Showing verified cooperative service packages`
                : activeCategory.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFairWageExplanation(!showFairWageExplanation)}
              className="text-xs text-[#8B1D31] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              92% Fair Wage Charter
            </button>
            <span className="text-[#DACCC0]">•</span>
            <button
              onClick={openEmergency}
              className="text-xs text-[#8B1D31] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Need 30-min SOS?
            </button>
          </div>
        </div>

        {/* Fair Wage Explanation Pill if toggled */}
        {showFairWageExplanation && (
          <div className="bg-[#FBF0F2] rounded-xl p-4 border border-[#F0CCD3] text-xs text-[#231715] space-y-1.5 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-[#8B1D31]">
              <ShieldCheck className="w-4 h-4 text-[#8B1D31]" />
              How 92% Cooperative Pricing Works:
            </div>
            <p className="text-[11px] text-[#5A4D4A] leading-relaxed">
              Unlike private aggregators charging 25–40% commissions, Sahakar Seva distributes{" "}
              <strong className="text-[#231715]">92% directly to the artisan</strong>, 5% to the Primary Labour Society
              welfare & pension fund, and 3% to the emergency health & accident reserve.{" "}
              <strong className="text-[#8B1D31]">Zero corporate shareholder extraction.</strong>
            </p>
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubcategories.map(({ sub, cat }) => {
            const isAddedToCart = cartItemIds.includes(sub.id);
            const workerCut = Math.round(sub.basePriceRupees * 0.92);

            return (
              <div
                key={sub.id}
                id={`service-card-${sub.id}`}
                className="bg-white rounded-xl p-5 border border-[#E8DFD5] shadow-xs hover:shadow-md hover:border-[#DACCC0] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#231715]">{sub.title}</h3>
                        {sub.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FBF0F2] border border-[#F0CCD3] text-[#8B1D31] text-[10px] font-bold">
                            BESTSELLER
                          </span>
                        )}
                      </div>

                      {/* Rating & Duration */}
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#847571]">
                        <span className="inline-flex items-center gap-0.5 font-bold text-[#8B1D31] bg-[#FBF0F2] border border-[#F0CCD3] px-1.5 py-0.5 rounded text-[11px]">
                          ★ {sub.rating}
                        </span>
                        <span>({sub.totalBookings.toLocaleString()} booked)</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#847571]">
                          <Clock className="w-3 h-3 text-[#847571]" />
                          {sub.estimatedDurationMins} mins
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A4D4A] leading-relaxed">{sub.description}</p>

                  {/* What is included bullet points */}
                  <div className="pt-1 space-y-1">
                    {sub.included.slice(0, 3).map((inc, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-[#5A4D4A] flex items-start gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#8B1D31] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-3 border-t border-[#F5EFE8] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#231715]">
                        ₹{sub.basePriceRupees}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8B1D31] bg-[#FBF0F2] border border-[#F0CCD3] px-1.5 py-0.5 rounded">
                        92% to artisan (₹{workerCut})
                      </span>
                    </div>
                    <div className="text-[10px] text-[#847571] mt-0.5">Fixed cooperative transparent rate</div>
                  </div>

                  {/* Urban Company Action Button */}
                  {isAddedToCart ? (
                    <button
                      id={`added-btn-${sub.id}`}
                      onClick={() => onSelectSubCategory(cat, sub)}
                      className="px-4 py-2 rounded-lg bg-[#8B1D31] text-white text-xs font-bold shadow-xs flex items-center gap-1 hover:bg-[#731627] transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </button>
                  ) : (
                    <button
                      id={`add-service-btn-${sub.id}`}
                      onClick={() => onSelectSubCategory(cat, sub)}
                      className="px-4 py-2 rounded-lg bg-white hover:bg-[#FBF0F2] text-[#8B1D31] border border-[#8B1D31] text-xs font-bold shadow-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
