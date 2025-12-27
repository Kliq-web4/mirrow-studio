import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedFolder } from "@/components/ui/animated-folder";

const communityGalleries = [
  {
    title: "Morning Rituals",
    projects: [
      { id: "m1", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop", title: "Golden Hour Glow" },
      { id: "m2", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", title: "Fresh & Radiant" },
      { id: "m3", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop", title: "Soft Light Magic" },
      { id: "m4", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop", title: "Studio Ready" },
    ]
  },
  {
    title: "Content Creator",
    projects: [
      { id: "c1", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop", title: "Perfect Lighting" },
      { id: "c2", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&h=600&fit=crop", title: "Ring Light Vibes" },
      { id: "c3", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop", title: "Selfie Station" },
      { id: "c4", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop", title: "Mirror Moment" },
    ]
  },
  {
    title: "Evening Glow",
    projects: [
      { id: "e1", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=600&fit=crop", title: "Date Night" },
      { id: "e2", image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=600&fit=crop", title: "Soft Ambiance" },
      { id: "e3", image: "https://images.unsplash.com/photo-1581182800629-7d90925ad072?w=600&h=600&fit=crop", title: "Warm Tones" },
    ]
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 bg-card/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Community
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-foreground">
            Real Stories from
            <span className="block gradient-text">#MIRROWWorld</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Thousands of creators trust MIRROW for their daily rituals. Explore their stories and join the movement.
          </p>
        </div>

        {/* 3D Folder Gallery */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-24">
          {communityGalleries.map((gallery) => (
            <AnimatedFolder
              key={gallery.title}
              title={gallery.title}
              projects={gallery.projects}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6 text-sm">
            Share your MIRROW moment and get featured
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-8 py-6 glow-border"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow @MIRROWWorld
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
