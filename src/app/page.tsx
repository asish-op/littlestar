"use client";

import Hero from "@/components/LandingPage/Hero";
import QuickAbout from "@/components/LandingPage/QuickAbout";
import ReelsShowcase from "@/components/LandingPage/ReelsShowcase";
import UpcomingMatches from "@/components/LandingPage/UpcomingMatches";
import Coaches from "@/components/LandingPage/Coaches";
import Programs from "@/components/LandingPage/Programs";
import AchievementsShowcase from "@/components/LandingPage/AchievementsShowcase";
import Testimonials from "@/components/LandingPage/Testimonials";
import OurPartners from "@/components/LandingPage/OurPartners";
import Locations from "@/components/LandingPage/Locations";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <QuickAbout />
      <ReelsShowcase />
      <UpcomingMatches />
      <Coaches />
      <Programs />
      <AchievementsShowcase />
      <Testimonials />
      <OurPartners />
      <Locations />
    </div>
  );
}
