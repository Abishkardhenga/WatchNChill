"use client"

import React from "react"
import Link from "next/link"
import { FiVideo, FiGithub, FiTwitter, FiMail, FiArrowRight } from "react-icons/fi"

const CTAFooter = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "How it works", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "FAQ", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black via-black to-gray-950">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main CTA Section */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <div className="relative rounded-4xl border border-blue-500/20 overflow-hidden">
          {/* CTA Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 backdrop-blur-xl" />

          {/* CTA Content */}
          <div className="relative p-12 md:p-20 text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-300 text-sm font-semibold">
              🚀 Get Started Today
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Ready to Watch?
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of people watching together right now. Create a room, share the link, and start your synchronized watch party instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 active:scale-95">
                <span>Create Your Room</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105 active:scale-95">
                View Docs
              </button>
            </div>

            <p className="text-white/50 text-sm">
              No credit card required • Free forever • Join in seconds
            </p>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <FiVideo size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">WatchNChill</span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                The easiest way to watch YouTube together with friends, teams, and communities worldwide.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FiTwitter, label: "Twitter" },
                  { icon: FiGithub, label: "GitHub" },
                  { icon: FiMail, label: "Email" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href="#"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide opacity-70">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide opacity-70">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide opacity-70">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-white/50 mb-4 sm:mb-0">
              © {currentYear} WatchNChill. Built with ❤️ for the internet.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <Link href="#" className="hover:text-white transition">
                Status
              </Link>
              <Link href="#" className="hover:text-white transition">
                API
              </Link>
              <Link href="#" className="hover:text-white transition">
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CTAFooter
