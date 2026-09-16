export type LanguageCode = "en" | "hi" | "mr" | "bn" | "ta" | "te" | "gu" | "kn";

export type NavigationTab =
  | "SERVICES"
  | "WORKERS"
  | "WELFARE"
  | "FEDERATION_ADMIN"
  | "JOIN_COOP";


export interface ServiceCategory {

  id: string;
  name: string;
  nameKey: string;
  iconName: string;
  badge?: string;
  description: string;
  startingPrice: number;
  bannerImage: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  estimatedDurationMins: number;
  basePriceRupees: number;
  fairWagePercent: number; // e.g. 85%
  rating: number;
  totalBookings: number;
  included: string[];
  excluded?: string[];
  popular?: boolean;
}

export interface CooperativeSociety {
  id: string;
  name: string;
  registrationNumber: string;
  district: string;
  state: string;
  federationAffiliation: string;
  totalMembers: number;
  verifiedArtisans: number;
  foundedYear: number;
  rating: number;
  contactPerson: string;
  phone: string;
  welfareDisbursementsYTD: number;
}

export interface SkillCertificate {
  title: string;
  issuingBody: "NSDC" | "Skill India" | "NCVT / ITI" | "Cooperative Federation Academy";
  certificateNo: string;
  validUntil: string;
  verified: boolean;
}

export interface CooperativeWorker {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  trade: string;
  subTrades: string[];
  experienceYears: number;
  societyId: string;
  societyName: string;
  district: string;
  skillScore: number; // 0 - 100
  rating: number;
  totalJobsCompleted: number;
  policeVerified: boolean;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  cooperativeMemberId: string;
  insuranceCardNo: string; // PMSBY / Ayushman Bharat
  certificates: SkillCertificate[];
  availability: "AVAILABLE" | "ON_JOB" | "EMERGENCY_READY" | "OFF_DUTY";
  languages: string[];
  hourlyRateRupees: number;
  coordinates: { lat: number; lng: number };
}

export interface BookingItem {
  subCategory: SubCategory;
  categoryTitle: string;
  quantity: number;
  date: string;
  timeSlot: string;
  serviceAddress: string;
  isEmergency?: boolean;
}

export interface Booking {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  items: BookingItem[];
  totalAmountRupees: number;
  workerPayoutRupees: number;
  welfarePoolRupees: number;
  emergencyReserveRupees: number;
  platformCommissionRupees: number; // Always 0
  status: "CONFIRMED" | "DISPATCHED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  assignedWorker?: CooperativeWorker;
  isEmergency: boolean;
  scheduledDate: string;
  scheduledTime: string;
  paymentMethod: "UPI" | "CARD" | "NET_BANKING" | "CASH_ON_SERVICE";
  paymentStatus: "PAID" | "PENDING_CASH";
  otp: string;
  rating?: number;
  reviewComment?: string;
  workerTipRupees?: number;
}

export interface AIDemandForecast {
  projectedDemandGrowthPct: number;
  peakDays: string[];
  highDemandTrades: {
    trade: string;
    projectedJobs: number;
    availableCoopWorkers: number;
    recommendedAction: string;
    priorityLevel: "CRITICAL" | "HIGH" | "NORMAL";
  }[];
  welfareFundImpact: string;
  aiInsightSummary: string;
}

export interface WelfareMetric {
  title: string;
  amount: string;
  change: string;
  beneficiariesCount: number;
  description: string;
  icon: string;
}
