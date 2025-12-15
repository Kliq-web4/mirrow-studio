import { Sparkles, Sun, Moon } from "lucide-react";

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

const StorySection = () => {
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
              className="group glass-card glass-card-hover p-8 text-center"
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

        {/* Feature highlight */}
        <div className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto">
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Your Ritual, Your Way</p>
          <h3 className="font-display text-3xl md:text-4xl mb-6 text-foreground">
            Tap-to-Change Lighting Moods
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soft gradient LEDs that flatter every skin tone. Designed for creators with a detachable phone holder 
            and travel-friendly base. Film, post, and shine — effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
