import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { ServiceCategory, SubCategory, BookingItem } from "../types";
import { COOPERATIVE_WORKERS } from "../data/workersData";

interface BookingModalProps {
  category: ServiceCategory;
  subCategory: SubCategory;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: BookingItem) => void;
  onInstantBook: (item: BookingItem) => void;
  selectedLocation: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  category,
  subCategory,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBook,
  selectedLocation,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Today, Immediate / Next Slot");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM - 12:00 PM");
  const [customAddress, setCustomAddress] = useState(
    "Flat 402, Block B, Green Valley Apartments, " + selectedLocation.split(" - ")[0]
  );
  const [specialNotes, setSpecialNotes] = useState("");

  if (!isOpen) return null;

  const TIME_SLOTS = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  const DATE_OPTIONS = [
    "Today, Immediate / Next Slot",
    "Tomorrow, Morning",
    "Day After Tomorrow",
    "Select Weekend Slot",
  ];

  const totalBasePrice = subCategory.basePriceRupees * quantity;
  const workerPayout = Math.round(totalBasePrice * 0.92);
  const platformMaintenance = Math.round(totalBasePrice * 0.05);
  const insurancePool = Math.round(totalBasePrice * 0.03);

  // Find a matching sample verified worker from this trade
  const sampleWorker = COOPERATIVE_WORKERS.find(
    (w) =>
      category.name.toLowerCase().includes(w.trade.toLowerCase()) ||
      w.trade.toLowerCase().includes(category.name.toLowerCase())
  ) || COOPERATIVE_WORKERS[0];

  const handleAddToCart = () => {
    const item: BookingItem = {
      subCategory,
      categoryTitle: category.name,
      quantity,
      date: selectedDate,
      timeSlot: selectedSlot,
      serviceAddress: customAddress,
    };
    onAddToCart(item);
    onClose();
  };

  const handleInstantBook = () => {
    const item: BookingItem = {
      subCategory,
      categoryTitle: category.name,
      quantity,
      date: selectedDate,
      timeSlot: selectedSlot,
      serviceAddress: customAddress,
    };
    onInstantBook(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#E8DFD5] rounded-xl max-w-xl w-full overflow-hidden shadow-2xl text-[#231715] animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] flex items-start justify-between bg-[#FAF7F2]/80">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B1D31]">
              {category.name}
            </div>
            <h2 className="text-xl font-bold text-[#231715] mt-0.5">{subCategory.title}</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#847571]">
              <span className="text-[#8B1D31] font-bold bg-[#FBF0F2] border border-[#F0CCD3] px-1.5 py-0.5 rounded text-[11px]">
                ★ {subCategory.rating}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#847571]" />
                Approx. {subCategory.estimatedDurationMins} minutes
              </span>
            </div>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F5EFE8] text-[#847571] hover:text-[#231715] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Clean Customer Price & Trust Card */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B1D31]">
                  <ShieldCheck className="w-4 h-4 text-[#8B1D31]" />
                  Fixed Fair Price Guarantee
                </div>
                <div className="text-[11px] text-[#5A4D4A] mt-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1D31] shrink-0" />
                  <span>Police-Verified Artisan • 30-Day Workmanship Warranty</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl font-extrabold text-[#231715]">₹{totalBasePrice}</span>
                <div className="text-[10px] text-[#847571]">Standard rate (All inclusive)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-[11px] text-[#5A4D4A]">
              <span className="font-semibold text-[#8B1D31]">Transparent Cooperative Split:</span>
              <span>
                <strong className="text-[#231715]">92% Worker</strong> (₹{workerPayout}) •{" "}
                <strong className="text-[#231715]">5% Platform & Maintenance</strong> (₹{platformMaintenance}) •{" "}
                <strong className="text-[#231715]">3% Insurance</strong> (₹{insurancePool})
              </span>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5]">
            <div>
              <div className="text-xs font-bold text-[#231715]">Number of Units / Fixtures</div>
              <div className="text-[11px] text-[#847571]">Adjust quantity for multiple installations or rooms</div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#E8DFD5] px-3 py-1.5 rounded-lg shadow-2xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="text-[#847571] hover:text-[#231715] disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-[#231715] w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[#5A4D4A] hover:text-[#231715] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#231715]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8B1D31]" />
                Select Preferred Date
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DATE_OPTIONS.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    selectedDate === date
                      ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                      : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#231715]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8B1D31]" />
                Select Time Slot
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                      : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Address & Service Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#231715] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#8B1D31]" />
              Service Address & Cooperative Sector
            </label>
            <textarea
              rows={2}
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="w-full text-xs p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] outline-none"
              placeholder="Enter complete door number, apartment, street, landmark"
            />
          </div>

          {/* Sample Artisan Preview from this Cooperative */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-3.5 flex items-center gap-3.5">
            <img
              src={sampleWorker.avatar}
              alt={sampleWorker.name}
              className="w-12 h-12 rounded-lg object-cover border border-[#E8DFD5] shrink-0"
            />
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#231715] truncate">
                  {sampleWorker.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3]">
                  {sampleWorker.societyId}
                </span>
              </div>
              <div className="text-[11px] text-[#847571] truncate">
                {sampleWorker.societyName}
              </div>
              <div className="text-[10px] text-[#8B1D31] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#8B1D31]" />
                Police Verified • {sampleWorker.certificates[0]?.title.split(" - ")[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2]/80 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <div className="text-[11px] text-[#847571]">Total Payable Amount</div>
            <div className="text-2xl font-extrabold text-[#231715]">₹{totalBasePrice}</div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="add-to-cart-modal-btn"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold border border-[#E8DFD5] bg-white text-[#231715] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              Add to Cart
            </button>

            <button
              id="instant-checkout-modal-btn"
              onClick={handleInstantBook}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold bg-[#8B1D31] hover:bg-[#731627] text-white shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              Proceed to Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
