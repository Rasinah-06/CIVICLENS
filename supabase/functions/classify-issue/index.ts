import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `You are a civic issue classifier. Analyze this image and classify the civic/urban issue shown.

You MUST respond by calling the classify_issue function with the correct parameters based on what you see in the image.

If the image does not show a civic issue, still classify it with the closest matching type and set severity to "low".`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64.startsWith("data:")
                      ? imageBase64
                      : `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "classify_issue",
                description:
                  "Classify a civic issue from an image into type, severity, and description",
                parameters: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: [
                        "pothole",
                        "garbage",
                        "water-leak",
                        "broken-streetlight",
                        "encroachment",
                        "fallen-tree",
                        "open-drain",
                        "vandalism",
                      ],
                      description: "The type of civic issue detected",
                    },
                    severity: {
                      type: "string",
                      enum: ["high", "mid", "low"],
                      description:
                        "high = immediate danger, mid = inconvenient but not dangerous, low = minor issue",
                    },
                    description: {
                      type: "string",
                      description:
                        "A 1-2 sentence description of the detected issue, what it looks like, and potential impact",
                    },
                  },
                  required: ["type", "severity", "description"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "classify_issue" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("AI did not return a classification");
    }

    const classification = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(classification), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("classify-issue error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
