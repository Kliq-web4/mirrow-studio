import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import StorySection from "@/components/StorySection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductSection from "@/components/ProductSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import TrustSignals from "@/components/TrustSignals";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofNotification from "@/components/SocialProofNotification";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LUXEMIRRORS | Premium Hollywood, Baroque & Statement Mirrors</title>
        <meta 
          name="description" 
          content="The world's premier mirror destination. Shop Hollywood vanity mirrors, ornate baroque designs, statement pieces & LED mirrors. Free shipping, 5-year warranty." 
        />
        <meta name="keywords" content="luxury mirrors, Hollywood mirror, baroque mirror, vanity mirror, LED mirror, statement mirror, ornate mirror, full length mirror" />
        <link rel="canonical" href="https://luxemirrors.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-[36px]">
          <HeroSection />
          <CategorySection />
          <ProductSection />
          <StorySection />
          <FeaturesSection />
          <NewsletterSection />
        </main>
        <Footer />
        
        <TrustSignals />
        <ExitIntentPopup />
        <SocialProofNotification />
      </div>
    </>
  );
};

export default Index;