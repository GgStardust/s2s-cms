import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI only when needed to avoid build-time errors
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export async function POST(request: NextRequest) {
  try {
    const { content, targetOrb } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const systemPrompt = `You are an AI assistant specialized in processing content for the Stardust to Sovereignty (S2S) system. Your role is to:

1. Analyze raw content and identify which of the 13 Orbs it relates to
2. Extract key themes and concepts
3. Suggest @orbX tags and cross-orb connections
4. Identify potential scrollstream extractions (short, high-frequency wisdom phrases)
5. Structure the content for the S2S Codex format

The 13 Orbs are:
1. Origin Intelligence - Photonic blueprinting and biological activation
2. Resonance Mechanics - Signal becomes architecture through vibration
3. Photonic Intelligence - Light as medium of consciousness
4. Harmonic Architectures - Chaos becomes rhythm through sacred geometry
5. Temporal Sovereignty - Time as living medium
6. Starline Memory - Etheric body as living archive
7. Alchemical Current - Density becomes light through transformation
8. Quantum Intuition - Intuition as coherence architecture
9. Temporal Fluidity - Multidimensional time navigation
10. Ancestral Repatterning - Clearing inherited patterns
11. Radiant Transparency - Authentic self-expression
12. Sovereign Field - Personal energetic sovereignty
13. Bridging Intelligence - Integration and synthesis

Target Orb: ${targetOrb || 'Not specified'}

Process this content and provide:
- Primary Orb association
- Secondary Orb connections
- Suggested @orbX tags
- Key themes extracted
- Potential scrollstream phrases
- Codex structure suggestions`;

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: content }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({ 
      success: true, 
      processedContent: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing content:', error);
    return NextResponse.json(
      { error: 'Failed to process content' }, 
      { status: 500 }
    );
  }
}
