import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ReputationScoreProps {
  score: number;
}

const ReputationScore = ({ score }: ReputationScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", icon: TrendingUp, color: "text-success" };
    if (score >= 60) return { text: "Good", icon: Minus, color: "text-warning" };
    return { text: "Needs Attention", icon: TrendingDown, color: "text-destructive" };
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  return (
    <Card className="glass-strong p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reputation Score</h3>
          <div className={`flex items-center gap-1 ${status.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{status.text}</span>
          </div>
        </div>

        <div className="text-center py-8">
          <div className={`text-6xl font-bold ${getScoreColor(score)} animate-pulse-glow`}>
            {score}
          </div>
          <div className="text-muted-foreground mt-2">out of 100</div>
        </div>

        <Progress value={score} className="h-3" />

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div>
            <div className="text-2xl font-bold text-success">+12</div>
            <div className="text-xs text-muted-foreground">vs Last Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <div className="text-xs text-muted-foreground">Total Mentions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">87%</div>
            <div className="text-xs text-muted-foreground">Engagement</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReputationScore;
