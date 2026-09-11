import React, { useState } from "react";
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Printer,
  ShieldCheck,
  Phone,
  ThumbsUp,
  HeartHandshake,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Booking } from "../types";

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onAddReview: (bookingId: string, rating: number, comment: string, tip: number) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onAddReview,
}) => {
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [tipRupees, setTipRupees] = useState(0);

  if (!isOpen) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingForReview) {
      onAddReview(selectedBookingForReview.id, reviewRating, reviewComment, tipRupees);
      setSelectedBookingForReview(null);
      setReviewComment("");
      setTipRupees(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8DFD5] overflow-hidden my-6 animate-in zoom-in-95 text-[#231715]">
        {/* Header */}
        <div className="bg-[#FAF7F2]/80 text-[#231715] p-5 sm:p-6 flex items-start justify-between border-b border-[#E8DFD5]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B1D31]">
              Customer Portal
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#231715]">My Cooperative Bookings</h2>
            <p className="text-xs text-[#847571] mt-0.5">
              {bookings.length} recorded booking(s) • Direct artisan assistance & 92% fair wage transparency
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#F5EFE8] text-[#847571] hover:text-[#231715] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Clock className="w-12 h-12 text-[#847571] mx-auto" />
              <h3 className="text-base font-bold text-[#231715]">No active bookings yet</h3>
              <p className="text-xs text-[#847571] max-w-xs mx-auto">
                Explore our catalog of certified cooperative electricians, plumbers, cleaners, and
                carpenters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD5] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#231715]">
                          {booking.id}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            booking.status === "COMPLETED"
                              ? "bg-[#FBF0F2] text-[#8B1D31] border border-[#F0CCD3]"
                              : booking.status === "DISPATCHED"
                              ? "bg-[#FBF4E8] text-[#8F5B12] border border-[#ECD9B8] animate-pulse"
                              : "bg-[#FBF4E8] text-[#8F5B12] border border-[#ECD9B8]"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#847571] mt-0.5">
                        Slot: {booking.scheduledDate} ({booking.scheduledTime})
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-[#231715]">
                        ₹{booking.totalAmountRupees}
                      </div>
                      <div className="text-[10px] text-[#8B1D31] font-medium">
                        Worker gets ₹{booking.workerPayoutRupees} (92%)
                      </div>
                    </div>
                  </div>

                  {/* Items in booking */}
                  <div className="space-y-1 text-xs">
                    {booking.items.map((item, i) => (
                      <div key={i} className="flex justify-between font-medium text-[#5A4D4A]">
                        <span>
                          {item.subCategory.title} (x{item.quantity})
                        </span>
                        <span className="font-bold text-[#231715]">
                          ₹{item.subCategory.basePriceRupees * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Assigned Worker Info & OTP */}
                  {booking.assignedWorker && (
                    <div className="bg-white p-3.5 rounded-lg border border-[#E8DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.assignedWorker.avatar}
                          alt={booking.assignedWorker.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#E8DFD5] shrink-0"
                        />
                        <div>
                          <div className="font-bold text-[#231715]">
                            {booking.assignedWorker.name}
                          </div>
                          <div className="text-[10px] text-[#847571] truncate max-w-xs">
                            {booking.assignedWorker.societyName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[10px] text-[#847571] font-bold">SAFETY OTP</div>
                          <div className="font-mono font-bold text-sm text-[#8F5B12] bg-[#FBF4E8] px-2 py-0.5 rounded border border-[#ECD9B8]">
                            {booking.otp}
                          </div>
                        </div>

                        <a
                          href={`tel:${booking.assignedWorker.phone}`}
                          className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F5EFE8] text-[#231715] flex items-center justify-center transition-colors border border-[#E8DFD5]"
                          title="Call Worker"
                        >
                          <Phone className="w-4 h-4 text-[#8B1D31]" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Rating / Review Action */}
                  <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between">
                    {booking.rating ? (
                      <div className="text-xs text-[#231715] font-semibold flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        <span>
                          Rated {booking.rating}/5 stars • "{booking.reviewComment}"
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedBookingForReview(booking)}
                        className="text-xs font-semibold text-[#8B1D31] hover:text-[#731627] flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Leave Worker Feedback & Compliment
                      </button>
                    )}

                    <span className="text-[11px] text-[#847571]">
                      Payment: {booking.paymentMethod} ({booking.paymentStatus})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating & Feedback Sub-Modal */}
        {selectedBookingForReview && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#231715]/60 backdrop-blur-xs">
            <div className="bg-white border border-[#E8DFD5] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in text-[#231715]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#231715]">
                    Rate Worker & Cooperative Service
                  </h3>
                  <p className="text-xs text-[#847571]">
                    Your direct review builds the artisan's cooperative trust score.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBookingForReview(null)}
                  className="p-1 text-[#847571] hover:text-[#231715] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        reviewRating >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-[#E8DFD5]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs font-bold text-[#5A4D4A]">Service Feedback & Compliment:</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="e.g. Master workmanship, very polite, transparent with materials..."
                  className="w-full mt-1 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] text-[#231715] placeholder:text-[#847571] text-xs outline-none focus:bg-white focus:border-[#8B1D31] font-medium"
                />
              </div>

              {/* Direct Artisan Tip */}
              <div>
                <label className="text-xs font-bold text-[#5A4D4A]">
                  Optional Direct Artisan Tip (100% to worker):
                </label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[0, 50, 100, 200].map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setTipRupees(tip)}
                      className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        tipRupees === tip
                          ? "bg-[#FBF0F2] border-[#8B1D31] text-[#8B1D31] font-bold"
                          : "bg-[#FAF7F2] border-[#E8DFD5] text-[#5A4D4A] hover:bg-[#F5EFE8]"
                      }`}
                    >
                      {tip === 0 ? "None" : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmitReview}
                className="w-full py-2.5 rounded-lg bg-[#8B1D31] hover:bg-[#731627] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
