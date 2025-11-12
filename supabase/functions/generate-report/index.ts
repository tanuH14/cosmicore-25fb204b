import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brandName, platforms, sentiment, score } = await req.json();
    console.log('Generating report for:', brandName);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Generate executive summary
    const summaryPrompt = `As an AI reputation analyst, create a concise executive summary (2-3 paragraphs) for brand "${brandName}" based on the following data:
    
Platforms monitored: ${platforms.join(', ')}
Reputation Score: ${score}/100
Sentiment Distribution:
- Positive: ${sentiment.positive}%
- Neutral: ${sentiment.neutral}%
- Negative: ${sentiment.negative}%

Focus on:
1. Overall brand health assessment
2. Key trends and patterns
3. Immediate action items if reputation score is below 80

Write in a professional, actionable tone.`;

    const summaryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a professional brand reputation analyst with expertise in social media monitoring and crisis management.'
          },
          {
            role: 'user',
            content: summaryPrompt
          }
        ],
      }),
    });

    if (!summaryResponse.ok) {
      const errorText = await summaryResponse.text();
      console.error('Lovable AI error:', summaryResponse.status, errorText);
      throw new Error(`Failed to generate summary: ${summaryResponse.status}`);
    }

    const summaryData = await summaryResponse.json();
    const summary = summaryData.choices[0]?.message?.content || "Unable to generate summary at this time.";

    // Generate response recommendations for negative mentions
    let replies: string[] = [];
    
    if (sentiment.negative > 10) {
      const repliesPrompt = `Generate 2 professional response templates for addressing negative feedback about "${brandName}". 
      
Requirements:
1. Acknowledge the concern with empathy
2. Offer a constructive solution or next steps
3. Maintain brand voice (professional, helpful, human)
4. Keep each response under 100 words

Format: Return each response separately, numbered 1 and 2.`;

      const repliesResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: 'You are a customer service expert specializing in crisis communication and reputation management.'
            },
            {
              role: 'user',
              content: repliesPrompt
            }
          ],
        }),
      });

      if (repliesResponse.ok) {
        const repliesData = await repliesResponse.json();
        const repliesText = repliesData.choices[0]?.message?.content || "";
        
        // Parse the numbered responses
        replies = repliesText
          .split(/\d+\./)
          .filter((text: string) => text.trim().length > 0)
          .map((text: string) => text.trim())
          .slice(0, 2);
      }
    }

    console.log('Report generated successfully');
    return new Response(
      JSON.stringify({ summary, replies }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-report function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
