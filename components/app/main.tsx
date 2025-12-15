import HeroSection from "./hero-section";
import SocialProof from "./social-proof";
import Features from "./features";
import HowItWorks from "./howIt-works";
import SpaceTypes from "./space-types";
import Pricing from "./pricing";
import FAQ from "./faq";
import CTASection from "./cta-section";

export default function Main() {
  return (
    <main>
      <HeroSection />
      <SocialProof />
      <Features />
      <HowItWorks />
      <SpaceTypes />
      <Pricing />
      <FAQ />
      <CTASection />
    </main>
  );
}
