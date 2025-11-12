import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentChartProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const SentimentChart = ({ data }: SentimentChartProps) => {
  const chartData = [
    { name: "Positive", value: data.positive, color: "hsl(var(--success))" },
    { name: "Neutral", value: data.neutral, color: "hsl(var(--warning))" },
    { name: "Negative", value: data.negative, color: "hsl(var(--destructive))" },
  ];

  const total = data.positive + data.neutral + data.negative;

  return (
    <Card className="glass-strong p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
        
        {total > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div>
                <div className="w-3 h-3 rounded-full bg-success mb-2" />
                <div className="text-2xl font-bold">{data.positive}%</div>
                <div className="text-xs text-muted-foreground">Positive</div>
              </div>
              <div>
                <div className="w-3 h-3 rounded-full bg-warning mb-2" />
                <div className="text-2xl font-bold">{data.neutral}%</div>
                <div className="text-xs text-muted-foreground">Neutral</div>
              </div>
              <div>
                <div className="w-3 h-3 rounded-full bg-destructive mb-2" />
                <div className="text-2xl font-bold">{data.negative}%</div>
                <div className="text-xs text-muted-foreground">Negative</div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            No sentiment data available yet
          </div>
        )}
      </div>
    </Card>
  );
};

export default SentimentChart;
