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
  Target,
  Sparkles,
  Trophy,
  Rocket,
  Brain,
  Code2,
  BarChart3,
  Users,
  Star,
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
          className="mb-8 tracking-tight text-white leading-[1.1]"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light">
            Build and
          </span>
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic font-semibold text-white">
            Growth
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light">
            with Scalable Tools
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base md:text-lg text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
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
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/login"
              className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all duration-200 shadow-2xl shadow-black/30 inline-block"
              style={{
                boxShadow: "0 0 40px rgba(17, 24, 39, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              Get Started
            </Link>
          </motion.div>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.95)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-white/80 text-gray-800 font-semibold text-sm border border-white/60 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer inline-block"
            style={{ backdropFilter: "blur(12px)" }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>

      {/* Floating dashboard cards — positioned above clouds, below hero top */}
      <div
        className="relative w-full max-w-5xl mx-auto px-6"
        style={{ zIndex: 4, marginTop: "32px", paddingBottom: "60px" }}
      >
        <div className="relative h-[280px] sm:h-[320px] md:h-[360px]">

          {/* Left card — Topics Completed */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="absolute left-[2%] sm:left-[6%] bottom-0 w-52 sm:w-60 cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-5 shadow-2xl shadow-black/15 border border-gray-100/50 backdrop-filter backdrop-blur-sm"
            >
              <p className="text-gray-400 text-xs mb-1 font-medium tracking-wide">PROGRESS</p>
              <h3 className="text-gray-800 font-semibold text-base mb-3">Topics Completed</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gray-800">85%</span>
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
              {/* Weekly progress bars */}
              <div className="flex gap-0.5 h-10 items-end">
                {[30, 50, 35, 65, 45, 70, 55, 80, 40, 65, 75, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 + i * 0.04, ease: "easeOut" }}
                    style={{ height: `${h}%`, background: "linear-gradient(to top, #3b82f6, #60a5fa)", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Center card — Your Progress */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 bottom-8 sm:bottom-12 w-60 sm:w-68 cursor-grab active:cursor-grabbing"
            style={{ translateX: "-50%", zIndex: 10 }}
            whileHover={{ scale: 1.03, y: -6 }}
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/15 border border-gray-100/50 backdrop-filter backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-800 font-semibold text-base">Your Progress</h3>
                <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  This Week
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

          {/* Right card — Weekly stats */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            className="absolute right-[2%] sm:right-[6%] bottom-4 w-40 sm:w-44 cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white rounded-3xl p-4 shadow-2xl shadow-black/15 border border-gray-100/50 backdrop-filter backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-xs font-medium">This Week</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { dot: "#3b82f6", label: "Hours",    val: "12.4h" },
                  { dot: "#10b981", label: "Progress", val: "+24%"  },
                  { dot: "#f59e0b", label: "Topics",   val: "8"     },
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

// ─── Infinite Ticker Section ──────────────────────────────────────────────────
function TickerSection() {
  const tickerItems = [
    { icon: <Brain className="w-5 h-5" />, text: "Machine Learning" },
    { icon: <Code2 className="w-5 h-5" />, text: "Web Development" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Data Science" },
    { icon: <Rocket className="w-5 h-5" />, text: "Cloud Computing" },
    { icon: <Target className="w-5 h-5" />, text: "Cybersecurity" },
    { icon: <Sparkles className="w-5 h-5" />, text: "AI & Deep Learning" },
    { icon: <Users className="w-5 h-5" />, text: "10K+ Learners" },
    { icon: <Trophy className="w-5 h-5" />, text: "Career Growth" },
    { icon: <Star className="w-5 h-5" />, text: "Expert Roadmaps" },
  ]

  return (
    <section className="py-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 overflow-hidden relative">
      {/* Animated glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      {/* Double ticker for seamless loop */}
      <div className="flex">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-2"
            >
              <div className="text-white/90">{item.icon}</div>
              <span className="text-white font-semibold text-sm tracking-wide uppercase">
                {item.text}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 ml-6" />
            </div>
          ))}
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

  const featureColors = [
    { bg: "from-blue-500 to-cyan-400", glow: "rgba(59, 130, 246, 0.3)" },
    { bg: "from-emerald-500 to-teal-400", glow: "rgba(16, 185, 129, 0.3)" },
    { bg: "from-purple-500 to-pink-400", glow: "rgba(168, 85, 247, 0.3)" },
    { bg: "from-orange-500 to-amber-400", glow: "rgba(249, 115, 22, 0.3)" },
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </motion.div>
          <h2 className="text-4xl md:text-5xl leading-tight mb-4 tracking-tight">
            <span className="font-light text-gray-800">Everything you need to </span>
            <span className="font-serif italic bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">succeed</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Comprehensive tools designed to accelerate your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-6 border border-gray-100 transition-all duration-500 cursor-pointer"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${featureColors[idx].glow} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
              
              {/* Icon with gradient */}
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${featureColors[idx].bg} text-white flex items-center justify-center mb-5 shadow-lg`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: `0 8px 24px ${featureColors[idx].glow}`,
                }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              
              {/* Learn more link */}
              <motion.div
                className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </motion.div>
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
    { 
      number: "01", 
      title: "Choose Your Goal", 
      description: "Select from Data Science, ML, Web Dev, Cloud, or Cybersecurity.",
      icon: <Target className="w-7 h-7" />,
      gradient: "from-blue-500 to-cyan-400",
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
    { 
      number: "02", 
      title: "Get Your Roadmap", 
      description: "Receive a personalized learning path based on your skill level.",
      icon: <Map className="w-7 h-7" />,
      gradient: "from-purple-500 to-pink-400",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    { 
      number: "03", 
      title: "Track Progress", 
      description: "Complete weekly goals and watch your skills grow every week.",
      icon: <TrendingUp className="w-7 h-7" />,
      gradient: "from-emerald-500 to-teal-400",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    { 
      number: "04", 
      title: "Achieve Success", 
      description: "Master new skills and advance your tech career confidently.",
      icon: <Trophy className="w-7 h-7" />,
      gradient: "from-amber-500 to-orange-400",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
  ]

  return (
    <section id="how-it-works" className="py-28 bg-gradient-to-b from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold mb-6"
          >
            <Rocket className="w-4 h-4" />
            Simple 4-Step Process
          </motion.div>
          <h2 className="text-4xl md:text-6xl leading-tight mb-4 tracking-tight">
            <span className="font-light text-gray-800">How it </span>
            <span className="font-serif italic bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">works</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Transform your learning journey in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line with gradient and glow */}
          <div className="hidden lg:block absolute top-24 h-1 rounded-full overflow-hidden" style={{ left: "10%", right: "10%" }}>
            <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 via-emerald-400 to-amber-400 opacity-30" />
            <motion.div
              className="absolute inset-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-amber-500"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Animated dots on the line */}
          <div className="hidden lg:flex absolute top-[92px] justify-between" style={{ left: "10%", right: "10%" }}>
            {steps.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-4 h-4 rounded-full bg-white border-2"
                style={{ borderColor: idx === 0 ? "#3b82f6" : idx === 1 ? "#a855f7" : idx === 2 ? "#10b981" : "#f59e0b" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.2, type: "spring" }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring" }}
                className="relative text-center group"
              >
                {/* Glowing card */}
                <motion.div
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 transition-all duration-500"
                  whileHover={{ y: -12, scale: 1.03 }}
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at center, ${step.glowColor} 0%, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                  />
                  
                  {/* Step number badge */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gray-900 text-white text-xs font-bold"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                  >
                    STEP {step.number}
                  </motion.div>
                  
                  {/* Icon container with animated gradient */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: `0 12px 32px ${step.glowColor}`,
                    }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  
                  {/* Animated arrow for next step */}
                  {idx < 3 && (
                    <motion.div
                      className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg items-center justify-center z-20"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Journey Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
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

// ─── Footer ─────���─────────────────────────────────────────────────────────────
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
      <TickerSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  )
}
