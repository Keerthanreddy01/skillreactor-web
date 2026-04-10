"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Map,
  CalendarDays,
  TrendingUp,
  MessageSquare,
  Zap,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react"
import Link from "next/link"

// Floating pill navbar like Catalis
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav
        className={`flex items-center gap-2 px-2 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-xl shadow-black/5 backdrop-blur-xl"
            : "bg-white/80 shadow-lg shadow-black/5 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pl-2">
          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 px-4">
          {["Home", "About us", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              {item}
            </a>
          ))}
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 flex items-center gap-1">
            Pages
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105"
        >
          Get Started
        </Link>
      </nav>
    </motion.header>
  )
}

// Realistic cloud SVG component
function CloudSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className={className}
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="150" cy="220" rx="120" ry="60" />
      <ellipse cx="280" cy="180" rx="140" ry="80" />
      <ellipse cx="450" cy="200" rx="160" ry="70" />
      <ellipse cx="600" cy="170" rx="130" ry="75" />
      <ellipse cx="720" cy="210" rx="100" ry="55" />
      <ellipse cx="200" cy="250" rx="80" ry="40" />
      <ellipse cx="380" cy="240" rx="100" ry="50" />
      <ellipse cx="550" cy="250" rx="90" ry="45" />
      <ellipse cx="680" cy="260" rx="70" ry="35" />
    </svg>
  )
}

// Hero Section with Catalis-style design
function HeroSection() {
  const { scrollY } = useScroll()
  const cloudsY = useTransform(scrollY, [0, 500], [0, 100])
  const cardsY = useTransform(scrollY, [0, 500], [0, 50])
  const contentY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #7EC8E3 0%, #A8D8EA 30%, #C5E3F0 60%, #E8F4F8 100%)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cloud layer at bottom */}
      <motion.div
        style={{ y: cloudsY }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <CloudSVG className="w-full h-auto min-h-[200px] opacity-95" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 pt-36 pb-40 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-400/20 backdrop-blur-sm mb-10"
          >
            <span className="text-amber-500 text-lg">&#9733;</span>
            <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
              From Strategy to Success
            </span>
          </motion.div>

          {/* Heading with mixed typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-8 tracking-tight"
          >
            <span className="font-light text-gray-800">Build and </span>
            <span className="font-serif italic font-normal text-gray-800">Growth</span>
            <span className="font-light text-gray-800"> with</span>
            <br />
            <span className="font-light text-gray-800">Scalable Tools</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Easily adapt to changes and scale your operations with our flexible
            infrastructure, designed to support your business growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-gray-900/20"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-full bg-white text-gray-800 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-lg shadow-black/5"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Floating Dashboard Cards */}
        <motion.div
          style={{ y: cardsY }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="max-w-5xl mx-auto mt-20 relative h-[300px] md:h-[350px]"
        >
          {/* Left Card - Transactions */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[5%] md:left-[10%] bottom-0 w-56 md:w-64"
            style={{ transform: "rotate(-6deg)" }}
          >
            <div className="bg-white rounded-3xl p-5 shadow-2xl shadow-gray-400/20 border border-gray-100">
              <p className="text-gray-400 text-sm mb-1">M</p>
              <h3 className="text-gray-800 font-semibold text-lg mb-4">Transactions</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gray-800">85%</span>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
              {/* Mini bar chart */}
              <div className="flex gap-1 h-12 items-end">
                {[30, 50, 35, 60, 45, 70, 55, 80, 40, 65, 75, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-sky-300 to-sky-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 1.2 + i * 0.05 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center Card - Card User with Circular Progress */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 w-64 md:w-72 z-10"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-gray-400/30 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-800 font-semibold text-lg">Card user</h3>
                <button className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  Monthly
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Circular Progress */}
              <div className="relative w-36 h-36 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.2 }}
                    transition={{ duration: 2, delay: 1.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    80%
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Monthly Stats */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[5%] md:right-[10%] bottom-4 w-44 md:w-48"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="bg-white rounded-3xl p-5 shadow-2xl shadow-gray-400/20 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-xs">Monthly</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="ml-auto text-sm font-semibold text-gray-800">$12.4k</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="ml-auto text-sm font-semibold text-gray-800">+24%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-600">Users</span>
                  <span className="ml-auto text-sm font-semibold text-gray-800">1.2k</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <Map className="w-6 h-6" />,
      title: "Budgeting and expense tracking",
      description:
        "Take control of your finances with our intuitive budgeting and expense-tracking solution. Easily manage your income",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Investment management",
      description:
        "Take control of your finances with our intuitive budgeting and expense-tracking solution. Easily manage your income",
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "The digital transformation journey",
      description:
        "involves integrating digital technologies into all areas of a business, fundamentally changing how it operates",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Market expansion strategy",
      description:
        "A market expansion strategy involves identifying and entering new markets to increase a company's customer base and revenue",
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
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How it works section
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Choose Your Goal", description: "Select from Data Science, ML, Web Dev, Cloud, or Cybersecurity" },
    { number: "02", title: "Get Your Roadmap", description: "Receive a personalized learning path based on your skill level" },
    { number: "03", title: "Track Progress", description: "Complete weekly goals and watch your skills grow" },
    { number: "04", title: "Achieve Success", description: "Master new skills and advance your tech career" },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl leading-tight mb-4 tracking-tight">
            <span className="font-light text-gray-800">How it </span>
            <span className="font-serif italic text-gray-800">works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-2xl bg-white border-2 border-sky-200 text-sky-600 font-bold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-sky-100 relative z-10"
              >
                {step.number}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl leading-tight mb-6 tracking-tight">
            <span className="font-light text-white">Ready to start your </span>
            <span className="font-serif italic text-white">journey</span>
            <span className="font-light text-white">?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
            Join thousands of learners who have transformed their careers with personalized skill roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-4 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-8 py-4 rounded-full bg-transparent text-white font-semibold text-sm border border-gray-700 hover:border-gray-600 hover:bg-white/5 transition-all"
            >
              View Features
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              No credit card
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
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

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Contact</a>
          </div>

          <p className="text-sm text-gray-400">
            &copy; 2026 SkillReactor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
