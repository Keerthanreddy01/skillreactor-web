"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Zap, Eye, EyeOff, ArrowRight, User, Mail, Lock, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function AuthPage() {
  const { login, register } = useApp()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    if (mode === "register" && !name) {
      setError("Please enter your name.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      if (mode === "login") {
        login(email.split("@")[0], email, password)
      } else {
        register(name, email, password)
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        animate={{ scale: [1.2, 1, 1.2], rotate: [180, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <motion.div className="inline-flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillReactor
            </span>
          </motion.div>
          <p className="text-gray-600 text-sm font-medium">Master skills with personalized roadmaps</p>
        </div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass rounded-2xl p-8 border border-white/40"
        >
          {/* Tabs */}
          <div className="flex rounded-lg p-1 mb-6 bg-gray-100">
            {(["login", "register"] as const).map((m) => (
              <motion.button
                key={m}
                onClick={() => { setMode(m); setError("") }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                  mode === m
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden"
              >
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-500 text-sm input-glow focus:outline-none"
                />
              </motion.div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-500 text-sm input-glow focus:outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-500 text-sm input-glow focus:outline-none"
              />
              <motion.button
                type="button"
                onClick={() => setShowPass(!showPass)}
                whileHover={{ scale: 1.1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 px-1 font-medium"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="gradient-btn w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            {mode === "login" ? "No account? " : "Already have one? "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors underline"
            >
              {mode === "login" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </motion.div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Demo app — data stored locally in your browser
        </p>
      </motion.div>
    </div>
  )
}
