"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Map,
  CalendarDays,
  TrendingUp,
  MessageSquare,
  Zap,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// ─── Pill Navbar ─────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`flex items-center gap-1 pl-2 pr-2 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-xl shadow-black/10 backdrop-blur-xl"
            : "bg-white/80 shadow-lg shadow-black/5 backdrop-blur-md"
        }`}
      >
        {/* Logo mark */}
        <Link href="/" className="flex items-center gap-2 pl-1 pr-2">
          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center">
          {["Home", "About us", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100/80 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100/80 flex items-center gap-1">
            Pages
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="ml-1 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-200 whitespace-nowrap"
        >
          Get Started
        </Link>
      </motion.nav>
    </header>
  )
}

// ─── Cloud Layer (pure CSS + SVG, no scroll transforms) ───────────────────────
function CloudLayer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        {/* Back cloud row */}
        <ellipse cx="180"  cy="260" rx="180" ry="80"  fill="white" opacity="0.7" />
        <ellipse cx="420"  cy="230" rx="200" ry="100" fill="white" opacity="0.8" />
        <ellipse cx="700"  cy="250" rx="220" ry="90"  fill="white" opacity="0.75" />
        <ellipse cx="980"  cy="235" rx="190" ry="95"  fill="white" opacity="0.8" />
        <ellipse cx="1250" cy="255" rx="180" ry="85"  fill="white" opacity="0.7" />

        {/* Front cloud row (denser, bigger) */}
        <ellipse cx="80"   cy="300" rx="130" ry="60"  fill="white" />
        <ellipse cx="300"  cy="285" rx="200" ry="80"  fill="white" />
        <ellipse cx="560"  cy="290" rx="230" ry="85"  fill="white" />
        <ellipse cx="850"  cy="280" rx="240" ry="90"  fill="white" />
        <ellipse cx="1130" cy="285" rx="220" ry="80"  fill="white" />
        <ellipse cx="1380" cy="295" rx="160" ry="65"  fill="white" />

        {/* Ground fill */}
        <rect x="0" y="295" width="1440" height="25" fill="white" />
      </svg>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "linear-gradient(180deg, #5BB8D4 0%, #7EC8E3 25%, #A8D8EA 55%, #D4EDF7 80%, #EEF7FB 100%)",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      {/* Hero text + buttons — sits above clouds */}
      <div className="relative pt-36 pb-8 px-6 text-center" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
          style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}
        >
          <span style={{ color: "#f59e0b", fontSize: "1rem" }}>&#9733;</span>
          <span className="text-sm font-semibold text-gray-700 tracking-widest uppercase">
            From Strategy to Success
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl leading-[1.08] mb-8 tracking-tight text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
        >
          <span className="font-light">Build and </span>
          <span className="font-serif italic font-normal">Growth</span>
          <span className="font-light"> with</span>
          <br />
          <span className="font-light">Scalable Tools</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Easily adapt to changes and scale your operations with our flexible
          infrastructure, designed to support your business growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/login"
            className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors shadow-xl shadow-black/20"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-full bg-white text-gray-800 font-semibold text-sm border border-white/60 hover:bg-gray-50 transition-colors shadow-lg"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Floating dashboard cards — positioned above clouds, below hero top */}
      <div
        className="relative w-full max-w-5xl mx-auto px-6"
        style={{ zIndex: 4, marginTop: "32px", paddingBottom: "60px" }}
      >
        <div className="relative h-[280px] sm:h-[320px] md:h-[360px]">

          {/* Left card — Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute left-[2%] sm:left-[6%] bottom-0 w-52 sm:w-60"
            style={{ rotate: "-6deg" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-5 shadow-2xl border border-gray-100"
            >
              <p className="text-gray-400 text-xs mb-1 font-medium tracking-wide">OVERVIEW</p>
              <h3 className="text-gray-800 font-semibold text-base mb-3">Transactions</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gray-800">85%</span>
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
              {/* Bar chart */}
              <div className="flex gap-0.5 h-10 items-end">
                {[30, 50, 35, 65, 45, 70, 55, 80, 40, 65, 75, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ background: "linear-gradient(to top, #3b82f6, #60a5fa)" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 + i * 0.04, ease: "easeOut" }}
                    style={{ height: `${h}%`, background: "linear-gradient(to top, #3b82f6, #60a5fa)", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Center card — Card user */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="absolute left-1/2 bottom-8 sm:bottom-12 w-60 sm:w-68"
            style={{ translateX: "-50%", zIndex: 10 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-800 font-semibold text-base">Card user</h3>
                <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  Monthly
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Circular progress */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 50.24 }}
                    transition={{ duration: 1.8, delay: 1.3, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-3xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    80%
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right card — Monthly stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute right-[2%] sm:right-[6%] bottom-4 w-40 sm:w-44"
            style={{ rotate: "4deg" }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-xs font-medium">Monthly</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { dot: "#3b82f6", label: "Revenue", val: "$12.4k" },
                  { dot: "#10b981", label: "Growth",  val: "+24%"  },
                  { dot: "#f59e0b", label: "Users",   val: "1.2k"  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.dot }} />
                    <span className="text-xs text-gray-600">{row.label}</span>
                    <span className="ml-auto text-xs font-semibold text-gray-800">{row.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cloud layer rendered last so it sits in front of cards at the bottom edge */}
      <CloudLayer />

      {/* Scroll chevron */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center" style={{ zIndex: 5 }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features Section ─────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Map className="w-6 h-6" />,
      title: "Personalized Roadmap",
      description:
        "Get a tailored learning path for Data Science, ML, Web Dev, Cloud, or Cybersecurity based on your current skill level.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Tracking",
      description:
        "Visualize your growth with streak tracking, completion rates, milestone badges, and weekly progress analytics.",
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Weekly Planner",
      description:
        "Break your roadmap into manageable weekly goals. Stay on track with a clear schedule designed around your pace.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Mentor Chat",
      description:
        "Get instant answers, project ideas, resource recommendations, and career guidance from your personal AI mentor.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 leading-snug">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Choose Your Goal", description: "Select from Data Science, ML, Web Dev, Cloud, or Cybersecurity." },
    { number: "02", title: "Get Your Roadmap", description: "Receive a personalized learning path based on your skill level." },
    { number: "03", title: "Track Progress", description: "Complete weekly goals and watch your skills grow every week." },
    { number: "04", title: "Achieve Success", description: "Master new skills and advance your tech career confidently." },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl leading-tight mb-4 tracking-tight">
            <span className="font-light text-gray-800">How it </span>
            <span className="font-serif italic text-gray-800">works</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Four simple steps to transform your learning journey
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line — positioned manually to align with step circles */}
          <div
            className="hidden md:block absolute top-10 h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200"
            style={{ left: "12.5%", right: "12.5%" }}
          />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-sky-200 font-bold text-xl text-sky-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-sky-100 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-gray-900 relative">
      {/* Static decorative blobs — no animation to prevent layout jank */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(56,189,248,0.12)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.12)" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl leading-tight mb-6 tracking-tight">
            <span className="font-light text-white">Ready to start your </span>
            <span className="font-serif italic text-white">journey</span>
            <span className="font-light text-white">?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of learners who have transformed their careers with personalized skill roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-full bg-transparent text-white font-semibold text-sm border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-colors"
            >
              View Features
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            {["Free forever", "No credit card", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-800">SkillReactor</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a key={item} href="#" className="hover:text-gray-800 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-400">&copy; 2026 SkillReactor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  )
}
