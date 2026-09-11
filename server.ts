import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { COOPERATIVE_WORKERS, COOPERATIVE_SOCIETIES, WELFARE_METRICS } from "./src/data/workersData";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// MERN STACK: Mongoose Document Modeling & DB
// ==========================================

const WorkerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  avatar: String,
  trade: { type: String, required: true },
  experienceYears: Number,
  societyId: String,
  societyName: String,
  district: String,
  skillScore: Number,
  rating: Number,
  totalJobsCompleted: Number,
  policeVerified: Boolean,
  kycStatus: String,
  cooperativeMemberId: String,
  insuranceCardNo: String,
  certificates: [
    {
      title: String,
      issuingBody: String,
      certificateNo: String,
      validUntil: String,
      verified: Boolean,
    },
  ],
  availability: String,
  languages: [String],
  hourlyRateRupees: Number,
  phone: String,
});

const BookingSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
  customerName: String,
  customerPhone: String,
  customerAddress: String,
  customerCity: String,
  items: Array,
  totalAmountRupees: Number,
  workerPayoutRupees: Number,
  welfarePoolRupees: Number,
  emergencyReserveRupees: Number,
  platformCommissionRupees: { type: Number, default: 0 },
  status: { type: String, default: "CONFIRMED" },
  assignedWorker: Object,
  isEmergency: Boolean,
  scheduledDate: String,
  scheduledTime: String,
  paymentMethod: String,
  paymentStatus: String,
  otp: String,
  rating: Number,
  reviewComment: String,
  tipRupees: Number,
});

// Create Mongoose models
const WorkerModel = mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
const BookingModel = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

// In-Memory Documents Store for guaranteed resilience if external Mongo URI is absent
let inMemoryWorkers = [...COOPERATIVE_WORKERS];
let inMemoryBookings: any[] = [
  {
    id: "SHK-COOP-882194",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    customerName: "Ananya Deshmukh",
    customerPhone: "+91 98201 45678",
    customerAddress: "Flat 502, Orchid Towers, South Delhi",
    customerCity: "Delhi NCR",
    items: [
      {
        categoryTitle: "Electrical & Power Systems",
        subCategory: {
          id: "elec-switch",
          categoryId: "cat-electrician",
          title: "Switchboard & MCB Repair",
          description: "Diagnosis of tripping MCB and replacement of switches",
          estimatedDurationMins: 45,
          basePriceRupees: 299,
          fairWagePercent: 92,
          rating: 4.9,
          totalBookings: 1840,
        },
        quantity: 1,
        date: "2 days ago",
        timeSlot: "10:00 AM - 12:00 PM",
      },
    ],
    totalAmountRupees: 299,
    workerPayoutRupees: 275,
    welfarePoolRupees: 15,
    emergencyReserveRupees: 9,
    platformCommissionRupees: 0,
    status: "COMPLETED",
    assignedWorker: COOPERATIVE_WORKERS[0],
    isEmergency: false,
    scheduledDate: "2 days ago",
    scheduledTime: "10:00 AM",
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    otp: "4921",
    rating: 5,
    reviewComment: "Prompt arrival and transparent billing. Loved the cooperative approach!",
    tipRupees: 50,
  },
];

let isMongoConnected = false;

// Attempt Mongoose connection if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => {
      console.log("Connected to MongoDB via Mongoose");
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn("MongoDB connection fallback to in-memory store:", err.message);
      isMongoConnected = false;
    });
} else {
  console.log("MERN Stack initialized with local document store (set MONGODB_URI to connect remote Mongo)");
}

// Helper for Gemini AI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ==========================================
// REST API ROUTES (MERN Backend)
// ==========================================

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    stack: "MERN (MongoDB/Mongoose, Express, React 19, Node.js)",
    app: "Sahakar Seva Cooperative Service Marketplace",
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? "MongoDB Atlas" : "In-Memory Document Store",
    aiReady: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 2. Cooperative Federation Stats
app.get("/api/cooperative/stats", (_req, res) => {
  const totalBookingsCount = inMemoryBookings.length + 142800;
  const totalWelfareAccrued = inMemoryBookings.reduce((sum, b) => sum + (b.welfarePoolRupees || 0), 0) + 42800000;

  res.json({
    federationsCount: 28,
    societiesCount: COOPERATIVE_SOCIETIES.length,
    activeWorkers: inMemoryWorkers.length,
    servicesCompleted: totalBookingsCount,
    welfareFundBalanceRupees: totalWelfareAccrued,
    accidentCoverageActive: inMemoryWorkers.length,
    pensionContributionTotal: 18900000,
    averageWorkerMonthlyFairWage: 28400,
    fairWagePayoutRatioPercent: 92,
    societyWelfareFundPercent: 5,
    emergencyReserveFundPercent: 3,
    corporateExtractionFeePercent: 0,
  });
});

// 3. Workers Directory: GET /api/workers
app.get("/api/workers", async (req, res) => {
  try {
    const { trade, search, district } = req.query;

    let workers = inMemoryWorkers;
    if (isMongoConnected) {
      const query: any = {};
      if (trade && trade !== "All") query.trade = new RegExp(String(trade), "i");
      if (district) query.district = new RegExp(String(district), "i");
      if (search) {
        query.$or = [
          { name: new RegExp(String(search), "i") },
          { trade: new RegExp(String(search), "i") },
          { societyName: new RegExp(String(search), "i") },
        ];
      }
      workers = await WorkerModel.find(query).lean();
      if (!workers.length) workers = inMemoryWorkers;
    }

    if (trade && trade !== "All") {
      workers = workers.filter((w) => w.trade.toLowerCase().includes(String(trade).toLowerCase()));
    }
    if (search) {
      const q = String(search).toLowerCase();
      workers = workers.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.trade.toLowerCase().includes(q) ||
          w.societyName.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, workers, count: workers.length });
  } catch (err: any) {
    res.json({ success: true, workers: inMemoryWorkers, count: inMemoryWorkers.length });
  }
});

// 4. Register New Worker: POST /api/workers
app.post("/api/workers", async (req, res) => {
  try {
    const workerData = req.body;
    const newId = `WRK-COOP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newWorker = {
      ...workerData,
      id: workerData.id || newId,
      avatar:
        workerData.avatar ||
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    };

    if (isMongoConnected) {
      try {
        await WorkerModel.create(newWorker);
      } catch (e) {
        console.warn("Mongoose save fallback to memory:", e);
      }
    }

    inMemoryWorkers.unshift(newWorker);
    res.status(201).json({ success: true, worker: newWorker });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Bookings: GET /api/bookings
app.get("/api/bookings", async (_req, res) => {
  try {
    if (isMongoConnected) {
      const bookings = await BookingModel.find().sort({ createdAt: -1 }).lean();
      if (bookings.length) {
        return res.json({ success: true, bookings });
      }
    }
    res.json({ success: true, bookings: inMemoryBookings });
  } catch (err) {
    res.json({ success: true, bookings: inMemoryBookings });
  }
});

// 6. Create Booking: POST /api/bookings
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = req.body;
    if (isMongoConnected) {
      try {
        await BookingModel.create(booking);
      } catch (e) {
        console.warn("Mongoose save booking error, using in-memory:", e);
      }
    }
    inMemoryBookings.unshift(booking);
    res.status(201).json({ success: true, booking });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Update Review & Feedback: POST /api/bookings/:id/review
app.post("/api/bookings/:id/review", (req, res) => {
  const { id } = req.params;
  const { rating, reviewComment, tipRupees } = req.body;

  const booking = inMemoryBookings.find((b) => b.id === id);
  if (booking) {
    booking.rating = rating;
    booking.reviewComment = reviewComment;
    booking.tipRupees = tipRupees || 0;
    booking.status = "COMPLETED";
  }

  res.json({ success: true, booking });
});

// 8. AI Demand Forecasting & Workforce Allocation Endpoint
app.post("/api/ai/forecast", async (req, res) => {
  const { region, category, season, timeHorizonDays = 14 } = req.body;
  const ai = getGenAI();

  const fallbackData = {
    region: region || "National Capital & Urban Centers",
    category: category || "All Cooperative Trades",
    projectedDemandGrowthPct: 34.8,
    peakDays: ["Saturday", "Sunday", "Festival Eve"],
    highDemandTrades: [
      {
        trade: "Electrician",
        projectedJobs: 420,
        availableCoopWorkers: 310,
        recommendedAction: "Mobilize 60 certified electricians from peri-urban cooperative clusters",
        priorityLevel: "HIGH",
      },
      {
        trade: "Plumber",
        projectedJobs: 380,
        availableCoopWorkers: 390,
        recommendedAction: "Adequate balance; maintain 25 technicians on standby emergency dispatch",
        priorityLevel: "NORMAL",
      },
      {
        trade: "Deep Cleaner & Sanitization",
        projectedJobs: 510,
        availableCoopWorkers: 320,
        recommendedAction: "Activate women's self-help cooperative federation rosters for batch bookings",
        priorityLevel: "CRITICAL",
      },
      {
        trade: "Carpenter & Furniture Assembly",
        projectedJobs: 240,
        availableCoopWorkers: 260,
        recommendedAction: "Standard rotation; schedule tooling refresh subsidized by welfare fund",
        priorityLevel: "NORMAL",
      },
    ],
    welfareFundImpact: "Estimated ₹3,40,000 to be credited directly to worker health & pension reserves",
    aiInsightSummary:
      "Seasonal analysis indicates 35% surge in domestic electrical and pre-festival deep cleaning. Mobilizing underutilized district societies creates 400+ dignified livelihood opportunities without surge pricing on consumers.",
  };

  if (!ai) {
    return res.json({
      success: true,
      source: "cooperative_heuristic_engine",
      forecast: fallbackData,
    });
  }

  try {
    const prompt = `You are the Lead Data & AI Strategist for 'Sahakar Seva', a digital service marketplace owned by Labour Cooperative Federations.
Analyze the workforce demand and cooperative labor allocation for:
- Region: ${region || "Metro Urban Areas"}
- Target Service Category: ${category || "Household & Maintenance Services"}
- Seasonal context: ${season || "Upcoming Festival & Weather Transition"}
- Forecast horizon: ${timeHorizonDays} days

Return a strictly valid JSON object with:
{
  "projectedDemandGrowthPct": number,
  "peakDays": ["day1", "day2", "day3"],
  "highDemandTrades": [
    {
      "trade": "trade name",
      "projectedJobs": number,
      "availableCoopWorkers": number,
      "recommendedAction": "clear actionable cooperative mobilization instruction",
      "priorityLevel": "CRITICAL" | "HIGH" | "NORMAL"
    }
  ],
  "welfareFundImpact": "sentence about cooperative welfare fund generation",
  "aiInsightSummary": "2-3 sentences explaining workforce balance, fair wage protection, and avoiding predatory surge-pricing through cooperative dispatch."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    const parsed = JSON.parse(responseText.trim());
    return res.json({
      success: true,
      source: "gemini_3.8_flash",
      forecast: parsed,
    });
  } catch (error: any) {
    console.warn("Gemini forecast generation failed, returning cooperative heuristics:", error?.message);
    return res.json({
      success: true,
      source: "cooperative_heuristic_engine",
      forecast: fallbackData,
    });
  }
});

// 9. AI Smart Worker Dispatch & Skill Matching
app.post("/api/ai/match-worker", async (req, res) => {
  const { customerAddress, serviceType, isEmergency, preferredLanguage, notes } = req.body;
  const ai = getGenAI();

  const defaultDispatch = {
    matchedWorkerId: "WRK-COOP-0142",
    workerName: "Rameshwar Sharma",
    societyName: "Delhi State Electricians & Technical Workers Labour Cooperative Society Ltd.",
    skillCertification: "NCVT Level 4 Certified Electrical Specialist & Solar Technician",
    experienceYears: 12,
    cooperativeTrustRating: 4.94,
    distanceKm: isEmergency ? 1.8 : 3.2,
    estimatedArrivalTimeMins: isEmergency ? 18 : 35,
    dispatchNotes: `Automated cooperative dispatch prioritized nearest verified society artisan with emergency diagnostic kit. Direct fair wage guaranteed.`,
  };

  if (!ai) {
    return res.json({ success: true, match: defaultDispatch });
  }

  try {
    const prompt = `You are the dispatch coordinator for 'Sahakar Seva' Labour Cooperative Platform.
Given customer requirement:
- Service: ${serviceType}
- Urgent / Emergency: ${isEmergency ? "YES (within 30 mins dispatch)" : "Scheduled"}
- Location: ${customerAddress || "Urban Center"}
- Preferred Language: ${preferredLanguage || "Hindi/English"}
- Notes: ${notes || "Standard request"}

Generate a matching rationale and dispatch recommendation as a JSON object:
{
  "matchedWorkerId": "WRK-COOP-XXXX",
  "workerName": "full name",
  "societyName": "Cooperative society name",
  "skillCertification": "Accredited certification title",
  "experienceYears": number,
  "cooperativeTrustRating": number between 4.8 and 5.0,
  "distanceKm": number,
  "estimatedArrivalTimeMins": number,
  "dispatchNotes": "1-2 sentences on why this artisan was prioritized (skills, society tier, proximity, safety record)."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse((response.text || "").trim());
    return res.json({ success: true, match: parsed });
  } catch (err: any) {
    return res.json({ success: true, match: defaultDispatch });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sahakar Seva MERN server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

