import { Card } from "@/components/ui/card";
import { Sparkles, MessageSquare } from "lucide-react";

interface AIReportSectionProps {
  summary: string;
  replies: string[];
}

const AIReportSection = ({ summary, replies }: AIReportSectionProps) => {
  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <Card className="glass-strong p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Executive Summary</h3>
        </div>
        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{summary}</p>
      </Card>

      {/* AI Reply Suggestions */}
      {replies.length > 0 && (
        <Card className="glass-strong p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold">AI-Generated Response Recommendations</h3>
          </div>
          <div className="space-y-4">
            {replies.map((reply, idx) => (
              <div key={idx} className="p-4 rounded-lg glass border border-border/50">
                <div className="text-xs text-muted-foreground mb-2">Response Option {idx + 1}</div>
                <p className="text-foreground/90">{reply}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIReportSection;
