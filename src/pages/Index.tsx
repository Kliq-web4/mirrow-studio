import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductSection from "@/components/ProductSection";
import CommunitySection from "@/components/CommunitySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import TrustSignals from "@/components/TrustSignals";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotification from "@/components/SocialProofNotification";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MIRROW World | Studio-Grade LED Mirror for Creators</title>
        <meta 
          name="description" 
          content="Step into MIRROW World. Studio-grade LED lighting meets elegant design. Tap-to-change lighting moods, creator-ready phone clip, and 30+ routines per charge." 
        />
        <meta name="keywords" content="LED mirror, makeup mirror, vanity mirror, ring light, content creator, beauty mirror, MIRROW" />
        <link rel="canonical" href="https://mirrowworld.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <StorySection />
          <FeaturesSection />
          <ProductSection />
          <CommunitySection />
          <NewsletterSection />
        </main>
        <Footer />
        
        {/* Conversion Optimization Components */}
        <TrustSignals />
        <ExitIntentPopup />
        <SocialProofNotification />
      </div>
    </>
  );
};

export default Index;
