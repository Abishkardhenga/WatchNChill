import Customer from "@/components/Customer"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import Features from "@/components/Features"
import CTAFooter from "@/components/CTAFooter"
import React from "react"

const page = () => {
  return (
    <div className="bg-gradient-to-b from-black via-black to-gray-950">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
      </div>
      <Customer />
      <Features />
      <CTAFooter />
    </div>
  )
}

export default page
