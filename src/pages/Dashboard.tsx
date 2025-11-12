import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MonitoringConsole from "@/components/dashboard/MonitoringConsole";
import ReputationScore from "@/components/dashboard/ReputationScore";
import SentimentChart from "@/components/dashboard/SentimentChart";
import AIReportSection from "@/components/dashboard/AIReportSection";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [agentLogs, setAgentLogs] = useState<Array<{ agent: string; message: string; timestamp: Date }>>([]);
  const [sentimentData, setSentimentData] = useState({ positive: 0, neutral: 0, negative: 0 });
  const [reputationScore, setReputationScore] = useState(0);
  const [aiSummary, setAiSummary] = useState("");
  const [aiReplies, setAiReplies] = useState<string[]>([]);

  const handlePlatformToggle = (platform: string) => {
    setPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const addLog = (agent: string, message: string) => {
    setAgentLogs(prev => [...prev, { agent, message, timestamp: new Date() }]);
  };

  const startMonitoring = async () => {
    if (!brandName || platforms.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please enter a brand name and select at least one platform.",
        variant: "destructive",
      });
      return;
    }

    setIsMonitoring(true);
    setAgentLogs([]);
    
    // Simulate multi-agent coordination
    addLog("System", `Initializing monitoring for "${brandName}" across ${platforms.join(", ")}`);
    
    // Monitoring Agent
    setTimeout(() => {
      addLog("Monitoring Agent", `Scanning ${platforms[0]}...`);
    }, 1000);

    setTimeout(() => {
      addLog("Monitoring Agent", `Found 127 mentions on ${platforms[0]}`);
    }, 2500);

    // Sentiment Agent
    setTimeout(() => {
      addLog("Sentiment Agent", "Analyzing sentiment patterns...");
    }, 3000);

    setTimeout(() => {
      const mockSentiment = {
        positive: Math.floor(Math.random() * 30) + 60,
        neutral: Math.floor(Math.random() * 20) + 15,
        negative: Math.floor(Math.random() * 15) + 5,
      };
      setSentimentData(mockSentiment);
      addLog("Sentiment Agent", `Analysis complete: ${mockSentiment.positive}% positive, ${mockSentiment.neutral}% neutral, ${mockSentiment.negative}% negative`);
    }, 4500);

    // Analytics Agent
    setTimeout(() => {
      addLog("Analytics Agent", "Calculating reputation score...");
    }, 5000);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70;
      setReputationScore(score);
      addLog("Analytics Agent", `Reputation Score: ${score}/100`);
    }, 6000);

    // Report Agent - Call AI to generate summary
    setTimeout(async () => {
      addLog("Report Agent", "Generating AI-powered insights...");
      
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            brandName,
            platforms,
            sentiment: sentimentData,
            score: reputationScore,
          }),
        });

        const data = await response.json();
        
        if (data.summary) {
          setAiSummary(data.summary);
          addLog("Report Agent", "Executive summary generated");
        }
        
        if (data.replies) {
          setAiReplies(data.replies);
          addLog("Report Agent", `Generated ${data.replies.length} response recommendations`);
        }
      } catch (error) {
        console.error("Error generating report:", error);
        addLog("Report Agent", "Error generating AI report");
      }
    }, 6500);

    setTimeout(() => {
      addLog("System", "All agents completed successfully");
      setIsMonitoring(false);
    }, 8000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text">ReputaWise AI Dashboard</h1>
            <p className="text-muted-foreground mt-2">Multi-Agent Reputation Intelligence System</p>
          </div>
        </div>

        {/* Configuration Card */}
        <Card className="glass-strong p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="brand">Brand Name</Label>
              <Input
                id="brand"
                placeholder="Enter brand name to monitor"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="mt-2 glass"
              />
            </div>

            <div>
              <Label>Select Platforms</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Twitter", "Reddit", "Google Reviews", "Facebook"].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={platforms.includes(platform)}
                      onCheckedChange={() => handlePlatformToggle(platform)}
                    />
                    <label
                      htmlFor={platform}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={startMonitoring}
              disabled={isMonitoring}
              className="w-full glow-primary"
              size="lg"
            >
              {isMonitoring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agents Working...
                </>
              ) : (
                "Start Monitoring"
              )}
            </Button>
          </div>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ReputationScore score={reputationScore} />
            <SentimentChart data={sentimentData} />
          </div>

          {/* Right Column */}
          <div>
            <MonitoringConsole logs={agentLogs} />
          </div>
        </div>

        {/* AI Report Section */}
        {aiSummary && (
          <AIReportSection summary={aiSummary} replies={aiReplies} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
