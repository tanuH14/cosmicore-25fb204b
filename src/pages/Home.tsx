import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, Brain, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-[100px]" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-8 animate-slide-up">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Reputation Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">ReputaWise AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up">
            Multi-agent intelligence system that monitors, analyzes, and protects your brand reputation across the internet in real-time
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button asChild size="lg" className="text-lg px-8 glow-primary">
              <Link to="/dashboard">Launch Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 glass">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Autonomous AI Agents Working for You
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Monitoring Agent",
                description: "Continuously scans Twitter, Reddit, and review platforms for brand mentions in real-time",
                color: "text-primary"
              },
              {
                icon: Brain,
                title: "Sentiment Agent",
                description: "Analyzes emotional tone and context using advanced NLP to detect reputation shifts",
                color: "text-secondary"
              },
              {
                icon: TrendingUp,
                title: "Analytics Agent",
                description: "Calculates reputation scores and identifies trends across multiple data sources",
                color: "text-success"
              },
              {
                icon: MessageSquare,
                title: "Report Agent",
                description: "Generates AI-powered summaries and drafts intelligent response recommendations",
                color: "text-warning"
              },
              {
                icon: Shield,
                title: "Alert System",
                description: "Detects reputation threats early and notifies you before issues escalate",
                color: "text-destructive"
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description: "Watch agents coordinate and process data live with transparent activity feeds",
                color: "text-primary"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center glass-strong rounded-2xl p-12 gradient-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your Brand?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the power of AI-driven reputation management
          </p>
          <Button asChild size="lg" className="text-lg px-8 glow-primary">
            <Link to="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
