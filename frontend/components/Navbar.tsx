"use client"

import Link from "next/link"
import { ModeToggle } from "./togglebutton"
import { FiVideo, FiMenu } from "react-icons/fi"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
            <FiVideo className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">WatchNChill</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-white/70 hover:text-white transition text-sm font-medium">
            Features
          </Link>
          <Link href="#" className="text-white/70 hover:text-white transition text-sm font-medium">
            How It Works
          </Link>
          <Link href="#" className="text-white/70 hover:text-white transition text-sm font-medium">
            Pricing
          </Link>
          <Link href="#" className="text-white/70 hover:text-white transition text-sm font-medium">
            Docs
          </Link>
        </div>

        {/* Right: Theme Toggle & CTA */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className="hidden sm:inline-flex px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
          <button 
            className="md:hidden text-white/70 hover:text-white transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-4">
            <Link href="#" className="block text-white/70 hover:text-white transition">
              Features
            </Link>
            <Link href="#" className="block text-white/70 hover:text-white transition">
              How It Works
            </Link>
            <Link href="#" className="block text-white/70 hover:text-white transition">
              Pricing
            </Link>
            <Link href="#" className="block text-white/70 hover:text-white transition">
              Docs
            </Link>
            <button className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
