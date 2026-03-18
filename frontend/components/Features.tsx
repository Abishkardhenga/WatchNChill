"use client"

import React from "react"
import { FiShare2, FiClock, FiMessageSquare, FiLock, FiZap, FiGlobe } from "react-icons/fi"

const Features = () => {
  const features = [
    {
      icon: FiShare2,
      title: "One-Click Sharing",
      description: "Generate a unique link and share instantly. Your friends join in seconds.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiClock,
      title: "Perfect Sync",
      description: "Millisecond-level synchronization ensures everyone watches in unison.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FiMessageSquare,
      title: "Real-time Chat",
      description: "Comment, react, and share moments while the video plays.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: FiLock,
      title: "Privacy First",
      description: "Encrypted rooms. Only invited guests can join your watch parties.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FiZap,
      title: "No Setup Required",
      description: "Works in any browser. Zero installations, zero complications.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: FiGlobe,
      title: "Works Globally",
      description: "Connect with friends across time zones and continents seamlessly.",
      gradient: "from-indigo-500 to-blue-500"
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-black dark:via-blue-950/20 dark:to-blue-950/10 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-semibold">
            ✨ Powerful Capabilities
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Built for the Perfect
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Watch Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to transform how you watch videos together with others.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl p-8 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-blue-500/10"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon container */}
                <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={32} className={`text-gray-900 dark:text-blue-400`} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`} />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to experience the future of watch parties?
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
            Get Started Now
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features

import { FiArrowRight } from "react-icons/fi"
