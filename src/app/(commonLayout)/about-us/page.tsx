import { AboutHeroBanner } from "@/components/aboutUs/AboutBanner";
import MissionVision from "@/components/aboutUs/MissionVision";
import WhatWeOffer from "@/components/aboutUs/WhatWeOffer";
import WhoWeAre from "@/components/aboutUs/WhoWeAre";
import React from "react";

export default function page() {
  return (
    <div>
      <AboutHeroBanner />
      <WhoWeAre />
      <MissionVision />
      <WhatWeOffer />
    </div>
  );
}
