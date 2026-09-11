import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  QrCode,
  CreditCard,
  Banknote,
  Printer,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { BookingItem, Booking, LanguageCode } from "../types";
import { COOPERATIVE_WORKERS } from "../data/workersData";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: BookingItem[];
  customerLocation: string;
  onBookingConfirmed: (booking: Booking) => void;
  language: LanguageCode;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  customerLocation,
  onBookingConfirmed,
  language,
}) => {
  const [customerName, setCustomerName] = useState("Ananya Sharma");
  const [customerPhone, setCustomerPhone] = useState("+91 98765 43210");
  const [serviceAddress, setServiceAddress] = useState(
    "Flat 402, Block B, Green Valley Apartments, " + customerLocation.split(" - ")[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NET_BANKING" | "CASH_ON_SERVICE">("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.subCategory.basePriceRupees * item.quantity,
    0
  );
  const workerPayout = Math.round(totalAmount * 0.92);
  const welfarePool = Math.round(totalAmount * 0.05);
  const emergencyReserve = Math.round(totalAmount * 0.03);

  const handlePayAndConfirm = async () => {
    setIsProcessing(true);

    // Pick an appropriate verified cooperative worker from trade
    const sampleWorker = COOPERATIVE_WORKERS[0];
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const bookingPayload: Booking = {
      id: `SHK-COOP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customerName,
      customerPhone,
      customerAddress: serviceAddress,
      customerCity: customerLocation.split(" - ")[0],
      items,
      totalAmountRupees: totalAmount,
      workerPayoutRupees: workerPayout,
      welfarePoolRupees: welfarePool,
      emergencyReserveRupees: emergencyReserve,
      platformCommissionRupees: 0,
      status: "CONFIRMED",
      assignedWorker: sampleWorker,
      isEmergency: items.some((i) => i.isEmergency),
      scheduledDate: items[0]?.date || "Today",
      scheduledTime: items[0]?.timeSlot || "10:00 AM - 12:00 PM",
      paymentMethod,
      paymentStatus: paymentMethod === "CASH_ON_SERVICE" ? "PENDING_CASH" : "PAID",
      otp: generatedOtp,
    };

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
    } catch (e) {
      console.warn("Backend booking store fallback:", e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedBooking(bookingPayload);
      onBookingConfirmed(bookingPayload);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#E8DFD5] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl text-[#231715] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] flex items-center justify-between bg-[#FAF7F2]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B1D31] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              SS
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#231715]">
                {confirmedBooking ? "Cooperative Service Confirmed" : "Cart & Order Review"}
              </h2>
              <p className="text-[11px] text-[#847571]">
                {confirmedBooking
                  ? "Official Cooperative Tax Invoice & Worker Dispatch"
                  : "Transparent cooperative checkout • 92% direct worker wage"}
              </p>
            </div>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F5EFE8] text-[#847571] hover:text-[#231715] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmedBooking ? (
          <>
            <div className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Selected Services Summary */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-[#5A4D4A] uppercase tracking-wider">
                  Selected Services ({items.length})
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#231715]">{item.subCategory.title}</div>
                        <div className="text-[11px] text-[#847571]">
                          Qty: {item.quantity} • Slot: {item.date} ({item.timeSlot})
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-[#231715]">
                          ₹{item.subCategory.basePriceRupees * item.quantity}
                        </div>
                        <div className="text-[10px] text-[#8B1D31] font-semibold">
                          92% to worker (₹{Math.round(item.subCategory.basePriceRupees * item.quantity * 0.92)})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#5A4D4A]">Customer Full Name:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A4D4A]">Contact Mobile (For SMS & Safety OTP):</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                  />
                </div>
              </div>

              {/* Service Address */}
              <div className="text-xs space-y-1">
                <label className="font-bold text-[#5A4D4A]">Service Delivery Address:</label>
                <textarea
                  rows={2}
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] outline-none focus:bg-white focus:border-[#8B1D31] focus:ring-1 focus:ring-[#8B1D31] font-medium"
                />
              </div>

              {/* Transparent Cooperative Fee Decomposition (92 / 5 / 3) */}
              <div className="bg-[#FBF0F2] border border-[#F0CCD3] rounded-xl p-4 space-y-2.5 text-xs">
                <div className="font-bold text-[#8B1D31] flex items-center justify-between">
                  <span>Transparent Price Breakdown (92 / 5 / 3 Charter):</span>
                  <span className="text-base font-extrabold text-[#231715]">₹{totalAmount}</span>
                </div>

                <div className="space-y-1.5 text-[#5A4D4A] pt-1.5 border-t border-[#F0CCD3]">
                  <div className="flex justify-between">
                    <span>Direct Skilled Worker Fair Wage (92%):</span>
                    <span className="font-bold text-[#8B1D31]">₹{workerPayout}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primary Society Welfare & Pension Fund (5%):</span>
                    <span className="font-bold text-[#231715]">₹{welfarePool}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medical & Emergency Reserve (3%):</span>
                    <span className="font-bold text-[#8F5B12]">₹{emergencyReserve}</span>
                  </div>
                  <div className="flex justify-between text-[#847571] line-through">
                    <span>Private Gig Corporate Extraction Cut (0%):</span>
                    <span>₹0</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#5A4D4A] uppercase tracking-wider">
                  Select Digital Payment Mode:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-3 rounded-lg border text-center font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "UPI"
                        ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                        : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#8B1D31]" />
                    <span>Instant UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
                    className={`p-3 rounded-lg border text-center font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "CARD"
                        ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                        : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#8B1D31]" />
                    <span>Debit / Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("NET_BANKING")}
                    className={`p-3 rounded-lg border text-center font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "NET_BANKING"
                        ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                        : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-[#8B1D31]" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH_ON_SERVICE")}
                    className={`p-3 rounded-lg border text-center font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === "CASH_ON_SERVICE"
                        ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold ring-1 ring-[#8B1D31]"
                        : "bg-white border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#8B1D31]" />
                    <span>Cash on Service</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-5 bg-[#FAF7F2]/80 border-t border-[#E8DFD5] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#847571]">Total Payable</div>
                <div className="text-2xl font-extrabold text-[#231715]">₹{totalAmount}</div>
              </div>

              <button
                id="submit-payment-and-book-btn"
                onClick={handlePayAndConfirm}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Processing Cooperative Order...</span>
                ) : (
                  <>
                    <span>Confirm & Generate Digital Invoice</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Confirmation & Cooperative Tax Invoice View */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FBF0F2] text-[#8B1D31] flex items-center justify-center mx-auto border border-[#F0CCD3]">
                <CheckCircle2 className="w-6 h-6 text-[#8B1D31]" />
              </div>
              <span className="px-3 py-0.5 rounded-full bg-[#FBF0F2] text-[#8B1D31] text-xs font-semibold border border-[#F0CCD3]">
                Booking Successfully Placed
              </span>
              <h2 className="text-2xl font-bold text-[#231715]">Service Scheduled & Confirmed</h2>
              <p className="text-xs text-[#5A4D4A] max-w-sm mx-auto">
                A verified artisan from Indraprastha Labour Cooperative Society has been notified.
              </p>
            </div>

            {/* Digital Cooperative Tax Invoice Card */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                <div>
                  <div className="text-sm font-bold text-[#231715]">
                    SAHAKAR SEVA DIGITAL INVOICE
                  </div>
                  <div className="text-[10px] text-[#847571]">
                    Issued under Multi-State Cooperative Societies Act
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-[#8B1D31]">
                    ID: {confirmedBooking.id}
                  </div>
                  <div className="text-[10px] text-[#847571]">
                    {new Date(confirmedBooking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#847571]">Customer:</span>
                  <span className="font-bold text-[#231715]">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Contact:</span>
                  <span className="font-bold text-[#231715]">{confirmedBooking.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Service Slot:</span>
                  <span className="font-bold text-[#231715]">
                    {confirmedBooking.scheduledDate} ({confirmedBooking.scheduledTime})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#847571]">Payment Status:</span>
                  <span className="font-bold text-[#8B1D31]">
                    {confirmedBooking.paymentMethod} • {confirmedBooking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Secret Safety OTP */}
              <div className="bg-[#FBF4E8] border border-[#ECD9B8] text-[#8F5B12] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#8F5B12]">
                    Customer Safety Verification OTP
                  </div>
                  <div className="text-xs text-[#8F5B12]/80">
                    Show to artisan only when work begins
                  </div>
                </div>
                <div className="text-2xl font-mono font-bold text-[#8F5B12] tracking-widest bg-white border border-[#ECD9B8] px-3 py-1 rounded-lg">
                  {confirmedBooking.otp}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8DFD5] flex justify-between text-sm font-bold text-[#231715]">
                <span>Total Amount Paid:</span>
                <span>₹{confirmedBooking.totalAmountRupees}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-lg border border-[#E8DFD5] bg-white hover:bg-[#FAF7F2] text-[#231715] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#847571]" />
                Print / Save Invoice
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                View in My Bookings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
