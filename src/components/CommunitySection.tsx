import { Instagram, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

const communityPosts = [
  { id: 1, placeholder: true },
  { id: 2, placeholder: true },
  { id: 3, placeholder: true },
  { id: 4, placeholder: true },
  { id: 5, placeholder: true },
  { id: 6, placeholder: true },
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 bg-card/20">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Join the Community
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-foreground">
            Share Your Glow with
            <span className="block gradient-text">#MIRROWWorld</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            MIRROW isn't just for your room — it's for your feed. Join thousands of creators and dreamers showing off their rituals.
          </p>
        </div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {communityPosts.map((post, index) => (
            <div
              key={post.id}
              className="group aspect-square rounded-2xl glass-card glass-card-hover overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Placeholder content */}
                <div className="text-center p-4">
                  <Instagram className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-xs text-muted-foreground/50">Community photo</p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Hash className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-8 py-6"
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
