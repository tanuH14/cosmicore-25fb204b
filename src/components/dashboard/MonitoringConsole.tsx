import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Brain, LineChart, FileText } from "lucide-react";
import { useEffect, useRef } from "react";

interface Log {
  agent: string;
  message: string;
  timestamp: Date;
}

interface MonitoringConsoleProps {
  logs: Log[];
}

const MonitoringConsole = ({ logs }: MonitoringConsoleProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getAgentIcon = (agent: string) => {
    if (agent.includes("Monitoring")) return <Activity className="w-4 h-4 text-primary" />;
    if (agent.includes("Sentiment")) return <Brain className="w-4 h-4 text-secondary" />;
    if (agent.includes("Analytics")) return <LineChart className="w-4 h-4 text-success" />;
    if (agent.includes("Report")) return <FileText className="w-4 h-4 text-warning" />;
    return <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  const getAgentColor = (agent: string) => {
    if (agent.includes("Monitoring")) return "text-primary";
    if (agent.includes("Sentiment")) return "text-secondary";
    if (agent.includes("Analytics")) return "text-success";
    if (agent.includes("Report")) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card className="glass-strong h-[600px] flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          Agent Activity Feed
        </h3>
        <p className="text-sm text-muted-foreground mt-1">Live multi-agent coordination</p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3 font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No activity yet. Start monitoring to see agents in action.
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg glass hover:bg-card/60 transition-colors animate-slide-up"
              >
                <div className="mt-0.5">{getAgentIcon(log.agent)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${getAgentColor(log.agent)}`}>
                      {log.agent}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-foreground/90 break-words">{log.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MonitoringConsole;
