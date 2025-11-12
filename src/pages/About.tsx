import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, Brain, TrendingUp, MessageSquare, Shield, Zap } from "lucide-react";

const About = () => {
  const agents = [
    {
      icon: Activity,
      name: "Monitoring Agent",
      description: "The Monitoring Agent is your 24/7 digital scout, continuously scanning platforms like Twitter, Reddit, and review sites for any mention of your brand. Using sophisticated web scraping and API integrations, it collects real-time data and feeds it to other agents for analysis.",
      capabilities: [
        "Multi-platform monitoring (Twitter, Reddit, Google Reviews, Facebook)",
        "Real-time data collection and indexing",
        "Intelligent keyword and context matching",
        "Duplicate detection and filtering"
      ]
    },
    {
      icon: Brain,
      name: "Sentiment Agent",
      description: "The Sentiment Agent uses advanced natural language processing to understand the emotional tone behind every mention. It doesn't just count positive vs. negative words—it understands context, sarcasm, and nuance to provide accurate sentiment analysis.",
      capabilities: [
        "Context-aware sentiment analysis",
        "Multi-language support",
        "Emotion detection (joy, anger, fear, trust)",
        "Trend identification over time"
      ]
    },
    {
      icon: TrendingUp,
      name: "Analytics Agent",
      description: "The Analytics Agent is your data scientist, crunching numbers and identifying patterns. It calculates your reputation score, tracks changes over time, and predicts potential issues before they become crises.",
      capabilities: [
        "Reputation score calculation (0-100)",
        "Trend analysis and forecasting",
        "Platform comparison metrics",
        "Alert threshold monitoring"
      ]
    },
    {
      icon: MessageSquare,
      name: "Report Agent",
      description: "The Report Agent leverages large language models (GPT-5, Claude) to generate human-quality summaries and response recommendations. It understands your brand voice and suggests appropriate replies to both positive and negative feedback.",
      capabilities: [
        "Executive summary generation",
        "Context-aware response drafting",
        "Brand voice consistency",
        "Crisis communication templates"
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-text">About ReputaWise AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the multi-agent intelligence system that protects your brand reputation
          </p>
        </div>

        {/* Overview */}
        <Card className="glass-strong p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              What is ReputaWise AI?
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              ReputaWise AI is an autonomous, multi-agent intelligence system designed to monitor, analyze, and manage your brand's reputation across the internet. Unlike traditional monitoring tools that simply collect data, our AI agents work together—coordinating tasks, sharing insights, and generating actionable recommendations in real-time.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Think of it as having a team of expert analysts working 24/7: one constantly scanning for mentions, another analyzing sentiment, a third calculating trends, and a fourth drafting responses. All coordinated by AI, all working toward protecting and enhancing your brand reputation.
            </p>
          </div>
        </Card>

        {/* Agent Details */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Meet the AI Agents</h2>
          
          {agents.map((agent, idx) => (
            <Card key={idx} className="glass-strong p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <agent.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{agent.name}</h3>
                </div>
                
                <p className="text-foreground/90 leading-relaxed">
                  {agent.description}
                </p>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {agent.capabilities.map((capability, capIdx) => (
                      <li key={capIdx} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="glass-strong p-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">How the Agents Work Together</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Data Collection</h4>
                  <p className="text-foreground/80">The Monitoring Agent scans platforms and collects mentions of your brand in real-time.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Sentiment Analysis</h4>
                  <p className="text-foreground/80">The Sentiment Agent analyzes each mention to determine emotional tone and context.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success font-bold">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Score Calculation</h4>
                  <p className="text-foreground/80">The Analytics Agent processes all data to calculate your reputation score and identify trends.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning font-bold">4</div>
                <div>
                  <h4 className="font-semibold mb-1">Report Generation</h4>
                  <p className="text-foreground/80">The Report Agent uses AI to create summaries and draft response recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="glow-primary">
            <Link to="/dashboard">Try the Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
