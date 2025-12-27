import { Sparkles, Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const moods = [
  {
    name: "Soft Date",
    description: "Warm, flattering glow for evening moments",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-rose-500/20",
  },
  {
    name: "Studio",
    description: "Crisp, even lighting for content creation",
    icon: Sun,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    name: "After Midnight",
    description: "Subtle ambiance for late-night rituals",
    icon: Moon,
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
];

const benefits = [
  "Soft gradient LEDs that flatter every skin tone",
  "Detachable phone holder for perfect angles",
  "Travel-friendly rechargeable base",
  "Touch-sensitive mood switching",
];

const StorySection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="story" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Ritual
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Every Morning, Every Video,
            <span className="block gradient-text">Every Detail Matters</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your mirror isn't just a tool. It's a moment. The moment before you step into the world. 
            The moment you capture your content. The moment you see yourself in perfect light.
          </p>
        </div>

        {/* Mood cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {moods.map((mood, index) => (
            <div
              key={mood.name}
              className="group glass-card glass-card-hover p-8 text-center cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${mood.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <mood.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-display text-2xl mb-3 text-foreground">{mood.name}</h3>
              <p className="text-muted-foreground">{mood.description}</p>
            </div>
          ))}
        </div>

        {/* Feature highlight with CTA */}
        <div className="glass-card p-12 md:p-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Your Ritual, Your Way</p>
              <h3 className="font-display text-3xl md:text-4xl mb-6 text-foreground">
                Tap-to-Change Lighting Moods
              </h3>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium glow-border transition-all duration-300 hover:scale-105"
                onClick={scrollToProducts}
              >
                Get Your MIRROW
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-32 h-40 rounded-full border-4 border-primary/50 shadow-glow animate-glow-pulse" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2">
                <p className="text-sm font-medium text-foreground">⚡ Instant mood switch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
