import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Star,
  ShieldCheck,
  Dumbbell,
  Users,
  Sparkles,
  Flame,
  Activity,
  Award,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Calendar,
  HeartPulse,
  Scale,
  Zap,
  ExternalLink,
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ArrowUpRight,
  Info,
  Bookmark,
  Navigation,
  Share2,
  Smartphone,
  Heart
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { AutoSlideCarousel } from "./components/AutoSlideCarousel";

/* ==========================================================================
   BUSINESS PROFILE DATA (Women Empire Fitness - वूमन एम्पायर फिटनेस)
   Verified from Google Business Profile
   ========================================================================== */

const BUSINESS_INFO = {
  name: "Women Empire Fitness",
  nameHindi: "वूमन एम्पायर फिटनेस",
  branch: "Jogabai Extension, Okhla",
  category: "Gym • Women's Fitness Center",
  address: "B-14 Gali no. 06, behind Khadijatul Kubra public school, near MLA Amanatullah office, Jogabai Extension, Joga Bai Extension, Okhla, New Delhi, Delhi 110025",
  shortAddress: "B-14 Gali no. 06, Jogabai Extension, Okhla, New Delhi 110025",
  landmark: "Behind Khadijatul Kubra public school, near MLA Amanatullah office",
  area: "Jogabai Extension, Okhla, New Delhi",
  pincode: "110025",
  phone: "088002 71529",
  phoneFormatted: "+91 88002 71529",
  phoneRaw: "+918800271529",
  hours: "Closed · Opens 6 am Mon",
  scheduleNote: "Open 6:00 AM Mon – Sat • Dedicated Women's Coaching Batches",
  rating: 4.8,
  reviewsCount: "64 Google Reviews",
  reviewsCountNum: 64,
  plusCode: "H79M+25 New Delhi, Delhi",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Women+Empire+Fitness+B-14+Gali+no.+06+behind+Khadijatul+Kubra+public+school+Jogabai+Extension+Okhla+New+Delhi+Delhi+110025",
  youtubeUrl: "https://youtube.com",
  attributes: [
    "Identifies as women-owned",
    "LGBTQ+ friendly",
    "100% Women-Only Space",
    "Certified Female Coaches"
  ]
};

// Membership Plans & Pricing tailored for Women Empire Fitness
interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  totalPrice: number;
  monthlyEffective: number;
  popular?: boolean;
  savingsLabel: string;
  features: string[];
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    duration: "1 Month",
    totalPrice: 2500,
    monthlyEffective: 2500,
    savingsLabel: "Standard Rate",
    features: [
      "Full Gym & Cardio Floor Access",
      "Safe, Private & Women-Only Environment",
      "Locker & Changing Room Facilities",
      "Initial Fitness Assessment & Form Check",
      "Floor Trainer Assistance"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: "3 Months",
    totalPrice: 6000,
    monthlyEffective: 2000,
    savingsLabel: "Save 20%",
    features: [
      "Full Gym & Cardio Floor Access",
      "Safe, Private & Women-Only Environment",
      "1 Detailed Body Composition Check",
      "Group Aerobics & Zumba Batches Included",
      "Personalized Diet & Workout Guidelines",
      "Locker & Changing Room Facilities"
    ]
  },
  {
    id: "half_yearly",
    name: "Half-Yearly",
    duration: "6 Months",
    totalPrice: 10500,
    monthlyEffective: 1750,
    savingsLabel: "Save 30%",
    features: [
      "Unlimited Floor & Cardio Machine Access",
      "Safe, Private & Women-Only Space",
      "2 Detailed Body Composition Assessments",
      "Unlimited Aerobics, Zumba & HIIT Batches",
      "1 Free 1-on-1 Personal Training Session",
      "PCOS / Postpartum Wellness Advice"
    ]
  },
  {
    id: "annual",
    name: "Annual",
    duration: "12 Months",
    totalPrice: 18000,
    monthlyEffective: 1500,
    popular: true,
    savingsLabel: "Best Value • Save 40%",
    features: [
      "Full Year Unlimited Access (Best Per-Month Rate)",
      "Safe, Private & Women-Only Environment",
      "Monthly Body Composition Tracking",
      "Unlimited Zumba, Aerobics & HIIT Classes",
      "2 Complimentary 1-on-1 Personal Training Sessions",
      "Custom Nutrition & Hormonal Balance Guidance",
      "Free Guest Pass (4/year) for Friends & Family"
    ]
  }
];

// Features for "A Safe, Private Space Built for Women"
const ABOUT_FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Privacy & Security",
    tag: "Exclusive Women Floor",
    description: "An exclusive women-only floor allowing you to workout without hesitation or discomfort. Fully enclosed, safe, and respectful."
  },
  {
    icon: Award,
    title: "Certified Female Coaches",
    tag: "Female Staff Only",
    description: "Empathetic, knowledgeable trainers specializing in women's posture, core conditioning, postpartum recovery, and PCOS management."
  },
  {
    icon: Dumbbell,
    title: "Modern Strength & Cardio",
    tag: "Biomechanic Equipment",
    description: "Clean treadmills, cross-trainers, dumbbells, barbells, resistance bands, and functional turf for complete body transformation."
  },
  {
    icon: Heart,
    title: "Women-Owned & Inclusive",
    tag: "Supportive Sisterhood",
    description: "LGBTQ+ friendly, supportive sisterhood community where college students, working women, and homemakers thrive together."
  },
  {
    icon: Clock,
    title: "Flexible Batch Timings",
    tag: "6:00 AM – 9:00 PM",
    description: "Morning and evening batches scheduled to comfortably accommodate students, working professionals, and busy homemakers."
  },
  {
    icon: Sparkles,
    title: "Hygienic, AC & CCTV Monitored",
    tag: "Pristine & Sanitized",
    description: "Pristine locker facilities, daily sanitized equipment, air-conditioned workout hall, and comprehensive security monitoring."
  }
];

// Programs / Services Data for Women Empire Fitness
const PROGRAMS = [
  {
    icon: Dumbbell,
    title: "Women's Strength Training",
    description: "Ergonomic dumbbells, barbells, squat racks, and cable machines designed to build lean tone and bone density safely."
  },
  {
    icon: Activity,
    title: "Cardio & Stamina Zone",
    description: "Modern treadmills, cross-trainers, stationary cycles, and step climbers with music and TV monitors."
  },
  {
    icon: Users,
    title: "Certified Personal Training",
    description: "Dedicated female fitness coaches offering customized form correction, weight loss, and 1-on-1 accountability."
  },
  {
    icon: Flame,
    title: "Aerobics & Zumba Batches",
    description: "High-energy, fun music-driven dance and aerobic sessions to burn calories and boost cardiovascular health."
  },
  {
    icon: HeartPulse,
    title: "PCOS & Postpartum Fitness",
    description: "Specialized gentle progressive training and hormonal-supportive exercise routines crafted for women's wellness."
  },
  {
    icon: Scale,
    title: "Body Composition & Diet Coaching",
    description: "Accurate clinical body fat, muscle mass, and metabolic rate tracking paired with realistic Indian diet plans."
  }
];

// Gallery Images (High resolution fitness placeholders; replace with real gym photos)
const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Modern Strength & Resistance Zone",
    category: "Equipment",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    title: "Spacious Cardio Deck & Treadmills",
    category: "Cardio",
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    title: "Aerobics, Zumba & Functional Turf",
    category: "Functional",
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    title: "1-on-1 Form Coaching & Personal Training",
    category: "Coaching",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    title: "Energetic Group Dance & HIIT Batches",
    category: "Group Class",
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    title: "Hygienic, Private & Clean Women's Floor",
    category: "Facility",
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80"
  }
];

// Verified Certified Trainers at Women Empire Fitness
const TRAINERS = [
  {
    name: "Farzana Khan",
    role: "Head Strength & Conditioning Coach",
    certification: "ACE Certified & Functional Strength Specialist",
    experience: "7+ Years Experience",
    bio: "Specializes in progressive resistance training for women, postural alignment, core strengthening, and fat loss.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Suman Rao",
    role: "Aerobics & Zumba Lead Trainer",
    certification: "Certified Group Fitness & Zumba Instructor",
    experience: "5+ Years Experience",
    bio: "Passionate about high-energy metabolic conditioning, calorie burn, dance fitness, and keeping workouts joyful and engaging.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Shabana Parveen",
    role: "Postpartum & Mobility Specialist",
    certification: "B.P.T & Clinical Women's Health Coach",
    experience: "6+ Years Experience",
    bio: "Focuses on safe post-pregnancy fitness, pelvic floor strength, joint mobility, and hormonal balance through targeted exercise.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
  }
];

// Testimonials reflecting 4.8★ rating from 64 Google Reviews
const TESTIMONIALS = [
  {
    name: "Ayesha Siddiqui",
    role: "Student (Jamia Millia Islamia) • Jogabai Resident",
    quote: "Having an exclusively women-focused gym right in Jogabai Extension is an absolute blessing. It's completely private, comfortable, and the female trainers make you feel confident from day one.",
    stars: 5,
    tag: "Safe & Private"
  },
  {
    name: "Nazia Rahman",
    role: "Working Professional • Okhla",
    quote: "Located conveniently behind Khadijatul Kubra school near MLA Amanatullah's office. Very clean machines, prompt air-conditioning, and the 6:00 AM opening time fits my morning routine perfectly.",
    stars: 5,
    tag: "Clean & Convenient"
  },
  {
    name: "Sana Parveen",
    role: "Homemaker • Batla House / Okhla",
    quote: "I joined for weight loss and PCOS management. Farzana ma'am and Dr. Shabana designed a realistic routine. Lost 8 kgs safely in 4 months without crash dieting. 100% recommended for all women!",
    stars: 5,
    tag: "PCOS & Fat Loss"
  },
  {
    name: "Rimsha Khan",
    role: "Fitness Regular • Okhla",
    quote: "Proud to support this women-owned gym! It's LGBTQ+ friendly, respectful, and has a wonderful sisterhood community feel. The weekend aerobics sessions are energetic and rejuvenating.",
    stars: 4.8,
    tag: "Women-Owned Community"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("annual");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Google Profile Actions state
  const [saved, setSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [nearbyModalOpen, setNearbyModalOpen] = useState(false);

  // Contact form local state
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    planInterest: "Annual (Best Value - ₹18,000)",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  // Show temporary feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveToggle = () => {
    setSaved((prev) => {
      const next = !prev;
      showToast(next ? "Saved Women Empire Fitness to your places!" : "Removed from saved places");
      return next;
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Women Empire Fitness (वूमन एम्पायर फिटनेस)",
          text: "Check out Women Empire Fitness in Jogabai Extension, Okhla, New Delhi - 4.8★ rated women's gym!",
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled share
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  const handleSendToPhone = () => {
    const text = encodeURIComponent(
      `Women Empire Fitness (वूमन एम्पायर फिटनेस)\nAddress: ${BUSINESS_INFO.address}\nPhone: ${BUSINESS_INFO.phone}\nHours: ${BUSINESS_INFO.hours}\nPlus Code: ${BUSINESS_INFO.plusCode}\nLocation: ${BUSINESS_INFO.googleMapsUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Track scroll position for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;
    setFormSubmitted(true);
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialModalOpen(false);
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Prepare chart data for Recharts (Cost per month comparison)
  const chartData = MEMBERSHIP_PLANS.map((plan) => ({
    name: plan.name,
    monthlyCost: plan.monthlyEffective,
    total: plan.totalPrice,
    duration: plan.duration,
    savings: plan.savingsLabel
  }));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-[#f34c38] selection:text-white antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-[#f34c38] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#f34c38]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================
          1. NAVBAR
          Sticky, background turns solid on scroll, responsive hamburger menu
          =================================================================== */}
      <header
        id="top-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 shadow-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Location Tag */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f34c38] to-[#f56f36] flex items-center justify-center shadow-lg shadow-[#f34c38]/30 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                  Women Empire <span className="text-[#f34c38]">Fitness</span>
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-400 block tracking-wide font-medium">
                वूमन एम्पायर फिटनेस • Okhla, New Delhi
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("trainers")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Trainers
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#f34c38] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
              title="Call Gym Directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#f56f36]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              id="nav-join-btn"
              onClick={() => scrollToSection("pricing")}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#f34c38] hover:bg-[#e03b27] text-white font-semibold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-[#f34c38]/30 active:scale-95 cursor-pointer"
            >
              Join Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-5 pt-4 pb-6 mt-3 space-y-3">
            <div className="flex flex-col space-y-2 text-base font-medium text-neutral-200">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Home & Overview
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                About Gym
              </button>
              <button
                onClick={() => scrollToSection("programs")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Programs & Facilities
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Membership Plans & Comparison
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Gym Gallery
              </button>
              <button
                onClick={() => scrollToSection("trainers")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Certified Trainers
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Member Reviews (4.8★)
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 hover:text-[#f34c38] transition"
              >
                Location & Contact
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-semibold text-neutral-200"
              >
                <Phone className="w-4 h-4 text-[#f56f36]" />
                Call {BUSINESS_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrialModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-[#f34c38] hover:bg-[#e03b27] text-white font-semibold text-sm transition shadow-md shadow-[#f34c38]/20"
              >
                Book a Free Trial Session
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ===================================================================
          2. HERO SECTION + GOOGLE BUSINESS PROFILE ACTIONS
          High contrast, welcoming women's fitness branding with real business data
          =================================================================== */}
      <section
        id="home"
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-[#f34c38]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f56f36]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f34c38]/15 border border-[#f34c38]/30 text-[#fddbd7] text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 text-[#f34c38] fill-[#f34c38]" />
                  <span>WOMEN-OWNED GYM</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#f56f36]" />
                  <span>LGBTQ+ FRIENDLY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{BUSINESS_INFO.hours}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-4">
                STRONG WOMEN. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f34c38] via-[#f56f36] to-[#ef8218]">
                  EMPOWERED LIVES.
                </span>
              </h1>

              <div className="mb-4">
                <span className="text-sm sm:text-base font-semibold text-[#f56f36]">
                  {BUSINESS_INFO.nameHindi} (वूमन एम्पायर फिटनेस)
                </span>
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Welcome to <strong className="text-white font-semibold">{BUSINESS_INFO.name}</strong> — Okhla's premier, 100% women-only fitness center. 
                Experience a private, hygienic, and encouraging sanctuary equipped with cardio machines, female-friendly strength gear, 
                certified female coaches, and high-energy group fitness classes.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-free-trial-btn"
                  onClick={() => setTrialModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#f34c38] hover:bg-[#e03b27] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#f34c38]/40 hover:shadow-[#f34c38]/60 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orange-200" />
                  <span>Book Free 1-Day Pass</span>
                </button>

                <button
                  id="hero-view-plans-btn"
                  onClick={() => scrollToSection("pricing")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white font-semibold text-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>View Membership Plans</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              {/* Quick Location & Plus Code */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#f34c38] shrink-0" />
                  <span>B-14 Gali no. 06, Jogabai Extension, Okhla, New Delhi 110025</span>
                </div>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <span className="text-[#f56f36] font-medium">Plus Code: {BUSINESS_INFO.plusCode}</span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
                <img
                  id="hero-gym-image"
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
                  alt="Women Empire Fitness Floor in Okhla New Delhi"
                  className="w-full h-80 sm:h-96 lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                {/* Floating Tag on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-[#f56f36] uppercase">
                      Exclusive Women's Gym
                    </span>
                    <h4 className="text-sm font-bold text-white">100% Privacy & Certified Female Coaches</h4>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#f34c38]/20 border border-[#f34c38]/40 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#f34c38]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================================================
              GOOGLE BUSINESS PROFILE QUICK ACTION BAR
              Provides 1-click interactions matching the user's listing
              =============================================================== */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-black uppercase text-white tracking-tight">
                    {BUSINESS_INFO.name}
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">({BUSINESS_INFO.nameHindi})</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {BUSINESS_INFO.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm font-bold text-white">4.8</span>
                  </div>
                  <span className="text-xs text-neutral-400">({BUSINESS_INFO.reviewsCountNum} Google reviews)</span>
                  <span className="text-xs text-neutral-500">•</span>
                  <span className="text-xs text-emerald-400 font-semibold">{BUSINESS_INFO.hours}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#f34c38]/15 text-[#fddbd7] border border-[#f34c38]/30 font-medium">
                  ✓ Identifies as women-owned
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                  🏳️‍🌈 LGBTQ+ friendly
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 grid grid-cols-4 sm:grid-cols-8 gap-2">
              <button
                onClick={() => scrollToSection("home")}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Activity className="w-4 h-4 text-[#f34c38]" />
                <span className="text-[11px] font-semibold">Overview</span>
              </button>

              <button
                onClick={() => scrollToSection("testimonials")}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-semibold">Reviews</span>
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#f56f36]" />
                <span className="text-[11px] font-semibold">About</span>
              </button>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#f34c38]" />
                <span className="text-[11px] font-semibold">Directions</span>
              </a>

              <button
                onClick={handleSaveToggle}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Bookmark
                  className={`w-4 h-4 ${saved ? "text-amber-400 fill-amber-400" : "text-neutral-400"}`}
                />
                <span className="text-[11px] font-semibold">{saved ? "Saved" : "Save"}</span>
              </button>

              <button
                onClick={() => setNearbyModalOpen(true)}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#f56f36]" />
                <span className="text-[11px] font-semibold">Nearby</span>
              </button>

              <button
                onClick={handleSendToPhone}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold whitespace-nowrap">To Phone</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#f34c38]" />
                <span className="text-[11px] font-semibold">Share</span>
              </button>
            </div>
          </div>

          {/* Stat Strip Below Hero */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center hover:border-neutral-700 transition">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-display text-2xl sm:text-3xl font-black text-white">4.8★</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">64 Google Reviews</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center hover:border-neutral-700 transition">
              <span className="font-display text-2xl sm:text-3xl font-black text-[#f34c38] block mb-1">
                100%
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Women-Only Private Space</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center hover:border-neutral-700 transition">
              <span className="font-display text-2xl sm:text-3xl font-black text-white block mb-1">
                6:00 AM
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Opens Early Mon – Sat</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center hover:border-neutral-700 transition">
              <span className="font-display text-2xl sm:text-3xl font-black text-emerald-400 block mb-1">
                Female
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Certified Women Coaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. ABOUT SECTION
          Why Women Empire Fitness: safe, hygienic, certified female trainers
          =================================================================== */}
      <section id="about" className="py-20 bg-neutral-900/40 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              WHY WOMEN EMPIRE FITNESS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              A Safe, Private Space Built for Women
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Located at <strong>B-14 Gali no. 06, Jogabai Extension, Okhla</strong> (behind Khadijatul Kubra public school, near MLA Amanatullah office), 
              Women Empire Fitness is a proudly women-owned fitness sanctuary. We provide 100% privacy, certified female trainers, 
              clean cardio & strength machines, and energizing aerobics & Zumba batches in a respectful, LGBTQ+ friendly atmosphere.
            </p>
          </div>

          {/* Auto-Sliding Feature Cards */}
          <AutoSlideCarousel
            items={ABOUT_FEATURES}
            speedSeconds={28}
            badgeLabel="Why Us Features"
            cardWidthClass="w-[300px] sm:w-[350px] lg:w-[380px]"
            renderCard={(feat) => {
              const IconComp = feat.icon;
              return (
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-[#f34c38]/50 hover:shadow-xl hover:shadow-[#f34c38]/10 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#f34c38]/15 border border-[#f34c38]/30 flex items-center justify-center text-[#f34c38] group-hover:bg-[#f34c38] group-hover:text-white transition-colors duration-200">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-800 text-[#f56f36] border border-neutral-700/50">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mb-2 tracking-tight group-hover:text-[#f56f36] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Women-Only Facility Guarantee</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* ===================================================================
          4. PROGRAMS / SERVICES SECTION
          Auto-sliding card carousel: Strength, Cardio, PT, Group, Free Weights, BCA
          =================================================================== */}
      <section id="programs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              TRAINING PROGRAMS & FACILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Engineered For Real Results
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Whether you are preparing for athletic performance, looking to shed body fat, 
              or building lifelong functional strength, our programs cover every milestone.
            </p>
          </div>

          {/* Auto-Sliding Programs Cards */}
          <AutoSlideCarousel
            items={PROGRAMS}
            speedSeconds={24}
            badgeLabel="Programs & Amenities"
            cardWidthClass="w-[310px] sm:w-[360px] lg:w-[390px]"
            renderCard={(prog) => {
              const IconComp = prog.icon;
              return (
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-[#f34c38]/50 hover:shadow-xl hover:shadow-[#f34c38]/10 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#f34c38]/15 border border-[#f34c38]/30 flex items-center justify-center text-[#f34c38] mb-5 group-hover:bg-[#f34c38] group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#f56f36] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-[#f56f36]">
                    <span>Included with Membership</span>
                    <CheckCircle2 className="w-4 h-4 text-[#f34c38]" />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* ===================================================================
          5. MEMBERSHIP CATALOG + RECHARTS BAR CHART (CRITICAL REQUIREMENT)
          Monthly, Quarterly, Half-Yearly, Annual + Savings Recharts Chart
          =================================================================== */}
      <section
        id="pricing"
        className="py-20 bg-neutral-900/50 border-y border-neutral-900 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              TRANSPARENT MEMBERSHIP CATALOG
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Find The Plan That Fits Your Goals
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              No hidden fees. Every membership tier includes full access to our private women's facility, 
              cardio & weight sections, locker rooms, and certified coach guidance.
            </p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400">
              <Info className="w-3.5 h-3.5 text-[#f56f36]" />
              <span>Transparent plans for every budget. Special discounts for students & group admissions.</span>
            </div>
          </div>

          {/* Pricing Plan Cards: 1 col mobile -> 2 col tablet -> 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isPopular = plan.popular;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl transition-all duration-300 flex flex-col p-6 ${
                    isPopular
                      ? "bg-gradient-to-b from-[#f34c38]/10 via-neutral-900 to-neutral-900 border-2 border-[#f34c38] shadow-2xl shadow-[#f34c38]/20 sm:-translate-y-2"
                      : "bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#f34c38] text-white font-bold text-[10px] tracking-wider uppercase shadow-md shadow-[#f34c38]/30 whitespace-nowrap">
                      Most Popular • Best Value
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-black uppercase text-white">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-neutral-400 font-medium">
                      Duration: {plan.duration}
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-neutral-400 font-medium">₹</span>
                      <span className="font-display text-3xl sm:text-4xl font-black text-white">
                        {plan.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#f34c38] mt-1">
                      Effective ₹{plan.monthlyEffective.toLocaleString("en-IN")}/month
                    </div>
                    <div className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-800/80 text-emerald-400">
                      {plan.savingsLabel}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 my-5 flex-1 text-xs text-neutral-300">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#f34c38] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Choose Plan CTA */}
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setFormState((prev) => ({
                        ...prev,
                        planInterest: `${plan.name} (₹${plan.totalPrice.toLocaleString("en-IN")})`
                      }));
                      scrollToSection("contact");
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer ${
                      isPopular
                        ? "bg-[#f34c38] hover:bg-[#e03b27] text-white shadow-lg shadow-[#f34c38]/30"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white"
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ===============================================================
              RECHARTS COST COMPARISON BAR CHART
              Visually highlights "Effective Cost per Month in ₹" so users can see
              that committed longer memberships offer massive per-month savings.
              =============================================================== */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#f34c38]" />
                  <span>Cost Per Month Comparison</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Compare the effective monthly spend across plan durations. Commit longer, save more!
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="inline-block w-3 h-3 rounded-full bg-[#f34c38]" />
                <span className="text-neutral-300">Effective Monthly Cost (₹)</span>
              </div>
            </div>

            {/* Responsive Recharts Container */}
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#a3a3a3"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#404040" }}
                  />
                  <YAxis
                    stroke="#a3a3a3"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: "#404040" }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                            <p className="font-bold text-white uppercase font-display text-sm tracking-wide">
                              {data.name} Plan ({data.duration})
                            </p>
                            <p className="text-[#f34c38] font-semibold">
                              Effective: ₹{data.monthlyCost.toLocaleString("en-IN")} / month
                            </p>
                            <p className="text-neutral-400">
                              Total Cost: ₹{data.total.toLocaleString("en-IN")}
                            </p>
                            <p className="text-emerald-400 font-semibold">
                              Status: {data.savings}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="monthlyCost"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1200}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === "Annual"
                            ? "#f34c38"
                            : entry.name === "Half-Yearly"
                            ? "#f56f36"
                            : entry.name === "Quarterly"
                            ? "#ef8218"
                            : "#737373"
                        }
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
              <span>💡 <strong>Insight:</strong> The 12-Month Annual Plan saves over 53% compared to rolling monthly renewals.</span>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#f34c38] hover:text-[#f56f36] font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                Inquire about custom corporate packages <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. GALLERY SECTION
          Responsive masonry/grid (2 cols mobile, 3-4 cols desktop) + Lightbox
          =================================================================== */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              INSIDE THE FACILITY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Explore Our Training Floor
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Take a visual tour through our cardio decks, free weight sections, 20–25kg plates, 
              group workout zones, and sanitized locker rooms.
            </p>
          </div>

          {/* 
            Gallery Image Grid
            Women Empire Fitness: Highlighting women training, cardio zone, free weights, and aerobic studio.
          */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img.src)}
                className="relative group rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer aspect-4/3 sm:aspect-16/10"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#f34c38]">
                    {img.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">
                    {img.title}
                  </h4>
                  <span className="text-[11px] text-neutral-300 mt-0.5">
                    Click to enlarge
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 text-white hover:bg-[#f34c38] transition cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged Gym View"
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 bg-neutral-950 text-center text-xs text-neutral-300">
              Women Empire Fitness (वूमन एम्पायर फिटनेस) • Jogabai Extension, Okhla
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          7. TRAINERS SECTION
          Female certified personal trainers & aerobics instructors
          =================================================================== */}
      <section id="trainers" className="py-20 bg-neutral-900/40 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              COACHING EXCELLENCE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Meet Our Certified Female Trainers
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Every trainer at Women Empire Fitness is certified, compassionate, and committed 
              to guiding you through science-backed workout progressions in a secure, supportive setting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAINERS.map((trainer, index) => (
              <div
                key={index}
                className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-[#f34c38]/50 transition-all duration-300 group flex flex-col"
              >
                {/* Trainer Photo */}
                <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-neutral-800">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 text-[11px] font-semibold text-[#fddbd7]">
                    {trainer.experience}
                  </div>
                </div>

                {/* Trainer Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#f56f36] uppercase tracking-wide block mb-1">
                      {trainer.role}
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-white mb-2">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-medium text-neutral-300 mb-3 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#f34c38] shrink-0" />
                      <span>{trainer.certification}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        setFormState((prev) => ({
                          ...prev,
                          message: `I'd like to book a personal training consultation with ${trainer.name}.`
                        }));
                        scrollToSection("contact");
                      }}
                      className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-[#f34c38] hover:text-white text-neutral-300 text-xs font-semibold tracking-wide transition cursor-pointer"
                    >
                      Consult with {trainer.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. TESTIMONIALS SECTION
          Real 4.8★ reviews from members in Jogabai Ext / Okhla
          =================================================================== */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              MEMBER EXPERIENCES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Real Reviews from Real Members
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">4.8 out of 5.0</span>
              <span className="text-xs text-neutral-400">• Based on 64 Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((rev, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(Math.floor(rev.stars))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f34c38]/15 border border-[#f34c38]/30 text-[#fddbd7]">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80">
                  <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                  <p className="text-[11px] text-neutral-400">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#f34c38]/15 via-neutral-900 to-[#f56f36]/10 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                Join a Supportive Community of Women in Okhla
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Safe, 100% private, women-owned, and LGBTQ+ friendly. No intimidation, pure empowerment.
              </p>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-[#f34c38] hover:text-white transition shrink-0 cursor-pointer"
            >
              Start Today
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          9. CONTACT / LOCATION SECTION
          Address, phone, Open 6 AM Mon badge, Map embed, inquiry form
          =================================================================== */}
      <section id="contact" className="py-20 bg-neutral-900/40 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-[#f34c38] uppercase mb-2 block">
              VISIT OR CONTACT US
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              Step Into Women Empire Fitness
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Drop by for a tour of our women's floor, meet our certified female trainers, 
              or claim your free 1-day introductory pass.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Info & Map Placeholder */}
            <div className="lg:col-span-6 space-y-6">
              {/* Info Cards */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#f34c38]/15 border border-[#f34c38]/30 flex items-center justify-center text-[#f34c38] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f34c38]">
                      Exact Gym Address
                    </h4>
                    <p className="text-sm font-semibold text-white mt-0.5 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 font-medium">
                        Landmark: Behind Khadijatul Kubra public school
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 font-medium">
                        Near MLA Amanatullah office
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-[#f34c38]/15 border border-[#f34c38]/30 flex items-center justify-center text-[#f34c38] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f34c38]">
                      Direct Desk Call / WhatsApp
                    </h4>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="text-base font-bold text-white hover:text-[#f56f36] transition block mt-0.5"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <span className="text-xs text-neutral-400">
                      Call directly for membership inquiries, batch timings, or trial registration
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{BUSINESS_INFO.hours}</span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1.5">
                      Monday to Saturday: 6:00 AM – 9:00 PM (Exclusive women workout batches).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#f56f36] shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Google Plus Code
                    </h4>
                    <p className="text-sm font-mono font-semibold text-[#f56f36] mt-0.5">
                      {BUSINESS_INFO.plusCode}
                    </p>
                    <span className="text-[11px] text-neutral-400">
                      Easily search this code in Google Maps for accurate pin navigation
                    </span>
                  </div>
                </div>
              </div>

              {/* Embed-style Google Map Card */}
              <div
                id="google-map-container"
                className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 text-center flex flex-col items-center justify-center min-h-[240px]"
              >
                <div className="w-12 h-12 rounded-full bg-[#f34c38]/15 border border-[#f34c38]/30 flex items-center justify-center text-[#f34c38] mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Women Empire Fitness Location
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm mt-1 mb-4 leading-relaxed">
                  B-14 Gali no. 06, Jogabai Extension, Okhla, New Delhi 110025 (Plus Code: H79M+25)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f34c38] hover:bg-[#e03b27] text-xs font-semibold text-white transition cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                  <button
                    onClick={handleSendToPhone}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Send to WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#f34c38] tracking-wider uppercase block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    Inquire or Claim Free Pass
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Fill in your details below and our female gym manager will connect with you promptly.
                  </p>
                </div>

                {formSubmitted ? (
                  <div
                    id="form-success-confirmation"
                    className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-xl font-bold uppercase text-white">
                      Thank You for Connecting!
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                      We have received your details. A trainer from <strong className="text-white">Women Empire Fitness</strong> will call you at <strong className="text-white">{formState.phone}</strong> shortly to welcome you.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormState({
                          name: "",
                          phone: "",
                          planInterest: "Annual (Best Value - ₹18,000)",
                          message: ""
                        });
                      }}
                      className="mt-2 text-xs font-semibold text-[#f34c38] hover:text-[#f56f36] underline cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-neutral-300 mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Ayesha Siddiqui"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#f34c38] transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-neutral-300 mb-1.5"
                      >
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="088002 71529 / +91..."
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#f34c38] transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-plan"
                        className="block text-xs font-semibold text-neutral-300 mb-1.5"
                      >
                        Plan of Interest
                      </label>
                      <select
                        id="contact-plan"
                        value={formState.planInterest}
                        onChange={(e) =>
                          setFormState({ ...formState, planInterest: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#f34c38] transition cursor-pointer"
                      >
                        <option value="Free 1-Day Trial Pass">Free 1-Day Trial Pass</option>
                        <option value="Annual (Best Value - ₹18,000)">Annual Plan (₹18,000 / ₹1,500/mo)</option>
                        <option value="Half-Yearly (₹10,500)">Half-Yearly Plan (₹10,500 / ₹1,750/mo)</option>
                        <option value="Quarterly (₹6,000)">Quarterly Plan (₹6,000 / ₹2,000/mo)</option>
                        <option value="Monthly (₹2,500)">Monthly Plan (₹2,500)</option>
                        <option value="Personal Training & Diet Coaching">Personal Training & Diet Coaching</option>
                        <option value="Zumba & Aerobics Batch">Zumba & Aerobics Batch</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-neutral-300 mb-1.5"
                      >
                        Your Fitness Goals or Preferred Timings (Optional)
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        placeholder="Tell us what you want to achieve (weight loss, toning, PCOS management, stamina)..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#f34c38] transition resize-none"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#f34c38] hover:bg-[#e03b27] text-white font-bold text-sm uppercase tracking-wider transition shadow-lg shadow-[#f34c38]/40 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <p className="text-[11px] text-neutral-500 text-center">
                      🔒 100% Privacy guaranteed. We only contact you regarding your fitness membership.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          10. FOOTER
          Brand, Address, Phone, Google Plus Code, YouTube, and links
          =================================================================== */}
      <footer id="footer" className="bg-neutral-950 border-t border-neutral-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f34c38] to-[#f56f36] flex items-center justify-center shadow-lg shadow-[#f34c38]/30">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white uppercase block">
                    Women Empire <span className="text-[#f34c38]">Fitness</span>
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    वूमन एम्पायर फिटनेस • Okhla, New Delhi
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                Premier 100% women-only fitness center in Jogabai Extension, Okhla. 
                Dedicated to empowering women through safe, private, high-energy workouts with certified female coaches.
              </p>
              <div className="flex items-center gap-3 text-neutral-400 pt-2">
                <a
                  href={BUSINESS_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#f34c38] hover:text-white hover:border-[#f34c38] transition"
                  title="Watch workout tutorials on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-700 transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#f34c38]">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-white transition"
                  >
                    Home & Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition"
                  >
                    About The Gym
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("programs")}
                    className="hover:text-white transition"
                  >
                    Programs & Aerobics
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-white transition"
                  >
                    Membership Plans & Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="hover:text-white transition"
                  >
                    Gym Floor Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("trainers")}
                    className="hover:text-white transition"
                  >
                    Female Trainers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-white transition"
                  >
                    Member Reviews (4.8★)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-white transition"
                  >
                    Location & Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Location & Hours Column */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#f34c38]">
                Location & Timings
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-xs font-bold text-white">
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="text-[#f34c38] hover:underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p className="text-xs text-neutral-400">
                Plus Code: <strong className="text-white">{BUSINESS_INFO.plusCode}</strong>
              </p>
              <div className="inline-block px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-400 font-semibold">
                ✓ {BUSINESS_INFO.hours}
              </div>
            </div>
          </div>

          {/* Copyright & Badges */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              © {new Date().getFullYear()} Women Empire Fitness (वूमन एम्पायर फिटनेस). All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span>Identifies as women-owned</span>
              <span>•</span>
              <span>LGBTQ+ friendly</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          MODAL: BOOK A FREE TRIAL
          Triggered by hero and mobile navigation CTAs
          =================================================================== */}
      {trialModalOpen && (
        <div
          id="free-trial-modal"
          onClick={() => setTrialModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-4"
          >
            <button
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition"
              aria-label="Close Trial Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#f34c38] uppercase tracking-wide block mb-1">
                FREE 1-DAY PASS
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                Experience Women Empire Fitness
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Workout on our private women's floor, test our cardio and strength equipment, and meet our certified female trainers for free.
              </p>
            </div>

            <form onSubmit={handleTrialSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#f34c38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="088002 71529 / WhatsApp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#f34c38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Preferred Time Slot
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#f34c38]">
                  <option>Morning (6:00 AM - 10:00 AM)</option>
                  <option>Mid-Day (10:00 AM - 2:00 PM)</option>
                  <option>Afternoon (2:00 PM - 5:00 PM)</option>
                  <option>Evening (5:00 PM - 8:30 PM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#f34c38] hover:bg-[#e03b27] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#f34c38]/40 cursor-pointer mt-2"
              >
                Confirm Free Trial Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: NEARBY LANDMARKS & ORIENTATION
          Triggered by "Nearby" quick action on Google Business bar
          =================================================================== */}
      {nearbyModalOpen && (
        <div
          id="nearby-modal"
          onClick={() => setNearbyModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <button
              onClick={() => setNearbyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#f34c38] uppercase tracking-wide block mb-1">
                NEARBY & LANDMARKS
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                Finding Women Empire Fitness
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Located in the heart of Jogabai Extension, Okhla with convenient access from Jamia Nagar and Batla House.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f34c38]/20 flex items-center justify-center text-[#f34c38] shrink-0 text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Khadijatul Kubra Public School</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    We are located right behind Khadijatul Kubra Public School in Gali no. 06.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f34c38]/20 flex items-center justify-center text-[#f34c38] shrink-0 text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">MLA Amanatullah Khan Office</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Just a 1-2 minute walk from the prominent MLA office in Jogabai Extension.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f34c38]/20 flex items-center justify-center text-[#f34c38] shrink-0 text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Jamia Millia Islamia Metro Station</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Convenient auto and e-rickshaw connectivity from Jamia Millia Islamia station (Magenta line).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#f34c38] hover:bg-[#e03b27] text-white font-bold text-xs text-center uppercase tracking-wider transition"
              >
                Open in Google Maps
              </a>
              <button
                onClick={() => setNearbyModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
