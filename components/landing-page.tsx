"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Map,
  CalendarDays,
  TrendingUp,
  MessageSquare,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
  Star,
  Github,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

// Floating cloud component
function Cloud({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 0.7, x: 0 }}
      transition={{ duration: 2, delay }}
    >
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 20 + delay * 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full fill-white/30">
          <ellipse cx="60" cy="60" rx="50" ry="30" />
          <ellipse cx="100" cy="50" rx="60" ry="35" />
          <ellipse cx="150" cy="60" rx="45" ry="25" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// Animated counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className={`font-bold text-lg ${scrolled ? "text-gray-900" : "text-gray-800"}`}>
            SkillReactor
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it Works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-medium transition-colors hover:text-sky-600 ${
                scrolled ? "text-gray-600" : "text-gray-700"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors hover:text-sky-600 ${
              scrolled ? "text-gray-600" : "text-gray-700"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

// Hero section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-white">
      {/* Clouds background */}
      <Cloud className="w-64 top-20 left-[5%]" delay={0} />
      <Cloud className="w-48 top-32 right-[10%]" delay={0.5} />
      <Cloud className="w-56 top-48 left-[20%]" delay={1} />
      <Cloud className="w-40 top-16 right-[30%]" delay={1.5} />
      <Cloud className="w-72 top-64 right-[5%]" delay={0.8} />

      <motion.div style={{ y, opacity }} className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-sky-200/50 mb-8"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium text-gray-700">FROM LEARNING TO SUCCESS</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 leading-tight mb-6"
          >
            Build and{" "}
            <span className="font-serif italic text-gray-900">Grow</span> with
            <br />
            Scalable Skills
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Your personalized roadmap to master any tech career with clarity and direction.
            Easily adapt to changes and scale your learning journey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-full bg-white text-gray-800 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Floating dashboard cards */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-5xl mx-auto mt-16 relative"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">
            {/* Progress Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-sky-500/10 border border-white/50 w-64"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-semibold">Progress</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Weekly</span>
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#progressGradientHero)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * 0.2 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="progressGradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">
                    <AnimatedNumber value={80} suffix="%" />
                  </span>
                </div>
              </div>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                  <p className="text-xs text-gray-500">Remaining</p>
                </div>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-sky-500/10 border border-white/50 w-72"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-semibold">Skills Mastered</span>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-4">
                <AnimatedNumber value={85} suffix="%" />
              </div>
              <div className="flex gap-1 h-16 items-end">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-400 to-blue-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 1 + i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  )
}

// Features section
function FeaturesSection() {
  const features = [
    {
      icon: <Map className="w-6 h-6" />,
      title: "Personalized Roadmap",
      description:
        "Get a custom learning path tailored to your career goals, skill level, and available time commitment.",
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Weekly Planner",
      description:
        "Break down your learning into manageable weekly goals with smart scheduling and progress tracking.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Tracking",
      description:
        "Visualize your growth with detailed analytics, milestone achievements, and completion metrics.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Mentor",
      description:
        "Get personalized guidance, answer questions, and receive motivation from your AI learning companion.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Everything you need to{" "}
            <span className="font-serif italic">succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to accelerate your learning journey and help you achieve your career goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.15)" }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sky-200 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
    { number: "04", title: "Achieve Career", description: "Master new skills and advance your tech career" },
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
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            How it <span className="font-serif italic">works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200" />

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
                className="w-16 h-16 rounded-2xl bg-white border-2 border-sky-200 text-sky-600 font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-100 relative z-10"
              >
                {step.number}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Demo preview section
function DemoSection() {
  return (
    <section className="py-24 bg-sky-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Powerful <span className="font-serif italic">dashboard</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress, manage your schedule, and stay motivated with our beautiful interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          {/* Mock dashboard */}
          <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl shadow-gray-900/30 max-w-4xl mx-auto">
            {/* Browser bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-gray-800 rounded-lg h-8 flex items-center px-4">
                <span className="text-gray-500 text-xs">skillreactor.app/dashboard</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-gray-950 rounded-xl p-6 grid md:grid-cols-3 gap-4">
              {/* Sidebar mock */}
              <div className="hidden md:block bg-gray-900 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-sky-500" />
                  <span className="text-white font-semibold text-sm">SkillReactor</span>
                </div>
                {["Dashboard", "Roadmap", "Planner", "Progress", "Mentor"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      i === 0 ? "bg-sky-500/20 text-sky-400" : "text-gray-400"
                    }`}
                  >
                    <div className="w-4 h-4 rounded bg-current opacity-50" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content mock */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Good morning</p>
                    <h3 className="text-white font-semibold text-lg">Welcome back, Developer</h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs">
                    Data Science Track
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Completed", value: "12" },
                    { label: "Progress", value: "75%" },
                    { label: "Streak", value: "7" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-900 rounded-xl p-4">
                      <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                      <p className="text-white text-xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Overall Progress</span>
                    <span className="text-sky-400 text-sm font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating glow effect */}
          <div className="absolute -inset-10 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-sky-400/20 blur-3xl -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}

// CTA section
function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Start Your Learning{" "}
            <span className="font-serif italic">Journey</span> Today
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are already building their dream careers with personalized roadmaps.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800">SkillReactor</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-900 transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 SkillReactor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main landing page component
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <CTASection />
      <Footer />
    </div>
  )
}
