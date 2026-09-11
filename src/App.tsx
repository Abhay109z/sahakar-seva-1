/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ServiceCatalog } from "./components/ServiceCatalog";
import { WorkerDirectory } from "./components/WorkerDirectory";
import { WelfareDashboard } from "./components/WelfareDashboard";
import { FederationAdmin } from "./components/FederationAdmin";
import { WorkerRegistration } from "./components/WorkerRegistration";
import { BookingModal } from "./components/BookingModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { EmergencySOSModal } from "./components/EmergencySOSModal";
import { MyBookingsModal } from "./components/MyBookingsModal";
import { GeoSpatialMap } from "./components/GeoSpatialMap";
import { InstitutionalBooking } from "./components/InstitutionalBooking";
import {
  NavigationTab,
  LanguageCode,
  ServiceCategory,
  SubCategory,
  BookingItem,
  Booking,
} from "./types";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function App() {
  // Navigation & Localization state
  const [currentTab, setCurrentTab] = useState<NavigationTab>("SERVICES");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [selectedLocation, setSelectedLocation] = useState("Delhi NCR - Indraprastha Cluster");

  // Cart & Booking Items
  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modals & Map state
  const [selectedForBooking, setSelectedForBooking] = useState<{
    cat: ServiceCategory;
    sub: SubCategory;
  } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [showGeoMap, setShowGeoMap] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch initial bookings from MERN backend
  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      })
      .catch((err) => console.warn("Initial bookings load:", err));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (item: BookingItem) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`Added "${item.subCategory.title}" to cart`);
  };

  const handleInstantBook = (item: BookingItem) => {
    setCartItems([item]);
    setSelectedForBooking(null);
    setIsCheckoutOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setCartItems([]);
    showToast("Booking confirmed! Safety OTP generated.");
  };

  const handleEmergencyBookingCreated = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast("Emergency artisan dispatched! Estimated arrival 18 mins.");
  };

  const handleAddReview = async (
    bookingId: string,
    rating: number,
    comment: string,
    tip: number
  ) => {
    try {
      await fetch(`/api/bookings/${bookingId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, reviewComment: comment, tipRupees: tip }),
      });
    } catch (e) {
      console.warn("Review API error:", e);
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, rating, reviewComment: comment, tipRupees: tip, status: "COMPLETED" }
          : b
      )
    );
    showToast("Thank you for supporting cooperative artisans with your feedback!");
  };

  const totalCartAmount = cartItems.reduce(
    (sum, i) => sum + i.subCategory.basePriceRupees * i.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231715] flex flex-col font-sans selection:bg-[#8B1D31] selection:text-white">
      {/* Clean Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#231715] text-white px-4 py-3 rounded-xl shadow-xl border border-[#3A2A26] flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-[#F1A2B2] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Urban Company-Style Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCheckoutOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
        {currentTab === "SERVICES" && (
          <>
            {/* Map Radar Toggle Bar */}
            <div className="flex items-center justify-between px-1 text-xs">
              <div className="flex items-center gap-2 text-[#5A4D4A]">
                <MapPin className="w-3.5 h-3.5 text-[#8B1D31]" />
                <span>Active Cooperative Sector: <strong className="text-[#231715] font-semibold">{selectedLocation}</strong></span>
              </div>
              <button
                id="toggle-live-geo-map-btn"
                onClick={() => setShowGeoMap(!showGeoMap)}
                className="text-xs font-bold text-[#8B1D31] hover:text-[#731627] underline flex items-center gap-1 cursor-pointer"
              >
                {showGeoMap ? "Hide Artisan Cluster Map" : "View Live Artisans on Map"}
              </button>
            </div>

            {/* Interactive Geo-Spatial Map (Collapsible) */}
            {showGeoMap && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <GeoSpatialMap selectedLocation={selectedLocation} />
              </div>
            )}

            {/* Primary Urban Company Storefront */}
            <ServiceCatalog
              language={language}
              onSelectSubCategory={(cat, sub) => setSelectedForBooking({ cat, sub })}
              openEmergency={() => setIsEmergencyOpen(true)}
              cartItemIds={cartItems.map((i) => i.subCategory.id)}
            />
          </>
        )}

        {currentTab === "WORKERS" && (
          <WorkerDirectory
            language={language}
            onBookWorker={() => {
              setCurrentTab("SERVICES");
            }}
          />
        )}

        {currentTab === "WELFARE" && <WelfareDashboard language={language} />}

        {currentTab === "FEDERATION_ADMIN" && <FederationAdmin />}

        {currentTab === "INSTITUTIONAL" && <InstitutionalBooking />}

        {currentTab === "JOIN_COOP" && (
          <WorkerRegistration
            onRegisterSuccess={() => {
              showToast("Registration submitted for Cooperative Society verification!");
              setCurrentTab("WORKERS");
            }}
          />
        )}
      </main>

      {/* Floating Cart Pill (Signature Sticky Bottom Bar) */}
      {cartItems.length > 0 && !isCheckoutOpen && (
        <aside
          aria-label="Shopping Cart Summary"
          className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-40 bg-[#231715] text-white p-3 rounded-xl shadow-2xl border border-[#3A2A26] flex items-center justify-between animate-in slide-in-from-bottom-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#382522] text-[#F1A2B2] flex items-center justify-center font-bold text-xs">
              {cartItems.length}
            </div>
            <div>
              <div className="text-xs font-bold text-white">₹{totalCartAmount}</div>
              <div className="text-[11px] text-[#F1A2B2] font-medium">
                92% (₹{Math.round(totalCartAmount * 0.92)}) direct to artisans
              </div>
            </div>
          </div>

          <button
            id="floating-checkout-btn"
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>Review & Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Modals */}
      {selectedForBooking && (
        <BookingModal
          category={selectedForBooking.cat}
          subCategory={selectedForBooking.sub}
          isOpen={Boolean(selectedForBooking)}
          onClose={() => setSelectedForBooking(null)}
          onAddToCart={handleAddToCart}
          onInstantBook={handleInstantBook}
          selectedLocation={selectedLocation}
        />
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        customerLocation={selectedLocation}
        onBookingConfirmed={handleBookingConfirmed}
        language={language}
      />

      <EmergencySOSModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        selectedLocation={selectedLocation}
        onEmergencyBookingCreated={handleEmergencyBookingCreated}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onAddReview={handleAddReview}
      />

      {/* High-Credibility Institutional Footer with Costa Coffee Palette */}
      <footer className="bg-[#231715] border-t border-[#382622] text-[#C4B7AF] text-xs py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 border-b border-[#382622]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B1D31] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  SS
                </div>
                <div className="font-extrabold text-sm text-white tracking-tight">
                  Sahakar <span className="text-[#F1A2B2]">Seva</span>
                </div>
              </div>
              <p className="text-[#A89A92] text-xs leading-relaxed">
                National digital marketplace governed by Labour Cooperative Federations. Ensuring dignified livelihoods, statutory social security, and zero corporate intermediary fees.
              </p>
              <div className="text-[11px] text-[#8E8078] font-medium">
                Registration: Multi-State Co-op Societies Act, 2002
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Consumer Safeguards</div>
              <ul className="space-y-1.5 text-[#B3A49C]">
                <li>• 30-Day Workmanship Warranty</li>
                <li>• Police-Verified & KYC Audited Artisans</li>
                <li>• Digital Safety OTP on Job Arrival</li>
                <li>• Standardized Transparent Labor Rates</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Worker Welfare Architecture</div>
              <ul className="space-y-1.5 text-[#B3A49C]">
                <li>• 92% Direct Fair-Wage Share</li>
                <li>• PMSBY ₹5 Lakh Accidental Cover</li>
                <li>• Gratuity, Pension & Medical Relief</li>
                <li>• Tool Replacement & Upskilling Subsidy</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Helpline & Governance</div>
              <div className="text-[#B3A49C] space-y-1">
                <div>National Toll-Free: <strong className="text-white">1800-200-7242</strong></div>
                <div>Support Hours: 08:00 AM – 08:00 PM IST</div>
                <div>e-Shram & NSDC Portal Interoperability</div>
                <div>Grievance Redressal: grievance@sahakarseva.org.in</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8E8078] text-[11px]">
            <div>
              © 2026 Sahakar Seva National Labour Cooperative Federation. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Bylaws & Governance</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Fair Wage Charter</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Audit & Compliance Reports</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
