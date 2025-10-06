/**
 * OpenAI Content Analysis Service
 *
 * Analyzes S2S content following PROCESSING_WORKFLOW.md rules:
 * - Suggests Orb associations (1-13)
 * - Suggests tags from TAG_REGISTRY only
 * - Extracts scrollstreams
 * - Scores resonance metrics
 * - Preserves every word (no edits)
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Canonical Orb System (from PROCESSING_WORKFLOW.md)
const ORB_SYSTEM = [
  { number: 1, name: "Origin Intelligence", synthesis: "Photonic blueprinting meets biological activation" },
  { number: 2, name: "Resonance Mechanics", synthesis: "Sovereign signal enters form and becomes architecture" },
  { number: 3, name: "Photonic Intelligence", synthesis: "Reflection initiates coherence through light webs" },
  { number: 4, name: "Harmonic Architectures", synthesis: "Chaos becomes rhythm through harmonic law" },
  { number: 5, name: "Temporal Sovereignty", synthesis: "Exit time as container and reclaim it as tool" },
  { number: 6, name: "Starline Memory", synthesis: "Memory returns as signal across galactic networks" },
  { number: 7, name: "Alchemical Current", synthesis: "Density becomes light through heat and compression" },
  { number: 8, name: "Quantum Intuition", synthesis: "Intuition becomes infrastructure for decision-making" },
  { number: 9, name: "Temporal Fluidity", synthesis: "Attunement across time without fragmentation" },
  { number: 10, name: "Ancestral Repatterning", synthesis: "Body becomes myth; field becomes form" },
  { number: 11, name: "Radiant Transparency", synthesis: "Inner architecture emitted outward with clarity" },
  { number: 12, name: "Sovereign Field", synthesis: "Structural indivisibility; coherence made field" },
  { number: 13, name: "Bridging Intelligence", synthesis: "Communication pathways between human and nonhuman" },
];

// Valid tags from TAG_REGISTRY.md (canonical tags only)
const VALID_TAGS = [
  // Core System
  "orb1", "orb2", "orb3", "orb4", "orb5", "orb6", "orb7", "orb8", "orb9", "orb10", "orb11", "orb12", "orb13",
  "satellite_primordial_creativity", "satellite_creative_infrastructure", "satellite_skeletal_memory",
  "satellite_nature_attunement", "satellite_dream_navigation",
  "domain_music_field", "domain_galactic_quantum", "domain_relational_systems",
  "domain_codex_architecture", "domain_scrollstream", "domain_consulting_system",

  // Biological Technology
  "bioelectricity", "mitochondria", "dna", "vagus_nerve", "biophotons", "fascia", "bone_memory",

  // Energetic Field
  "resonance", "resonance_mechanics", "field_resonance", "signal_integrity",
  "photonic_intelligence", "cymatics", "harmonics", "sacred_geometry",

  // Temporal and Consciousness
  "temporal_sovereignty", "temporal_fluidity", "spiral_time", "timeline_navigation",
  "consciousness", "sovereignty", "sovereign_field", "quantum_intuition", "nonlinear",

  // Relational and Creative
  "star_love", "constellation_dynamics", "mirror_work", "alchemical_current",
  "creative_cycle", "primordial_creativity", "scrollstream", "scrollstream_cartography",

  // Ancestral and Memory
  "ancestral_repatterning", "myth_lineage", "epigenetic", "starline_memory", "transmutation",

  // System and Integration
  "codex_alive", "dashboard_component", "integration_points", "book_fragments",
  "codex_scrolls", "consulting_system", "orbs_framework",

  // AI and Technology
  "ai_consciousness", "algorithmic_cave", "augmented_intelligence", "organic_intelligence",
  "philosopher_oracle_mirror", "direct_perception", "origin_signal", "light_language",
  "inner_knowing", "coherence_field", "temporal_collapse", "ego_dissolution",
  "signal_memory", "paradigm_turning", "cellular_knowing", "stars_pathway",
  "perception_architecture",
];

export interface ContentAnalysisResult {
  orb_associations: number[];
  tags: string[];
  scrollstreams: string[];
  resonance_rating: number;
  resonance_metrics: {
    strength: number;
    clarity: number;
    coherence: number;
    pattern: number;
  };
  analysis_notes?: string;
}

const SYSTEM_PROMPT = `You are an AI assistant analyzing content for the Stardust to Sovereignty (S2S) Codex system.

# CRITICAL RULES (from PROCESSING_WORKFLOW.md):
1. **Preserve every word** — You are ONLY analyzing, not editing. Never suggest content changes.
2. **Use canonical Orb names** — Only reference Orbs 1-13 by their canonical names.
3. **Tags from TAG_REGISTRY ONLY** — You can ONLY suggest tags that exist in the provided valid tags list.
4. **Snake_case format** — All tags use lowercase with underscores (e.g., "sovereign_field" not "Sovereign Field").
5. **Affirmative definitions only** — When analyzing, describe what things ARE, not what they are NOT.
6. **Scrollstreams must be resonant** — Only extract lines that pulse as standalone transmissions.

# 13-ORB SYSTEM:
${ORB_SYSTEM.map(orb => `Orb ${orb.number}: ${orb.name} — ${orb.synthesis}`).join('\n')}

# VALID TAGS (from TAG_REGISTRY.md):
${VALID_TAGS.map(tag => `@${tag}`).join(', ')}

# YOUR TASK:
Analyze the provided content and return a JSON object with:
1. **orb_associations**: Array of Orb numbers (1-13) that relate to this content
2. **tags**: Array of tags (from VALID TAGS ONLY) that describe key concepts
3. **scrollstreams**: Array of particularly resonant lines that work as standalone transmissions
4. **resonance_rating**: Overall resonance score 1-10 (how coherent, clear, and powerful is this transmission?)
5. **resonance_metrics**: Object with strength, clarity, coherence, pattern scores (each 1-10)

# SCROLLSTREAM EXTRACTION RULES:
- Must be a complete, standalone thought
- Should pulse with resonance when read alone
- Typically 1-2 sentences maximum
- Embodies core transmission essence
- Examples of good scrollstreams:
  * "Density becomes light through compression"
  * "Every human body is architecture of layers"
  * "Sovereignty is signal integrity"

# RESPONSE FORMAT:
Return ONLY valid JSON (no markdown, no explanation):
{
  "orb_associations": [7, 4, 12],
  "tags": ["alchemical_current", "transformation", "density"],
  "scrollstreams": [
    "Density becomes light through compression",
    "The alchemy of experience transforms everything"
  ],
  "resonance_rating": 8,
  "resonance_metrics": {
    "strength": 9,
    "clarity": 8,
    "coherence": 8,
    "pattern": 7
  }
}`;

export async function analyzeContent(
  content: string,
  existingTitle?: string
): Promise<ContentAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analyze this S2S content:\n\nTitle: ${existingTitle || 'Untitled'}\n\nContent:\n${content.substring(0, 8000)}`
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // Validate and filter tags to only include valid ones
    const validatedTags = (result.tags || [])
      .filter((tag: string) => VALID_TAGS.includes(tag.replace('@', '')))
      .slice(0, 15); // Limit to 15 tags per PROCESSING_WORKFLOW

    // Validate Orb associations (1-13 only)
    const validatedOrbs = (result.orb_associations || [])
      .filter((orb: number) => orb >= 1 && orb <= 13);

    return {
      orb_associations: validatedOrbs,
      tags: validatedTags,
      scrollstreams: (result.scrollstreams || []).slice(0, 10), // Limit to 10 scrollstreams
      resonance_rating: Math.min(10, Math.max(1, result.resonance_rating || 5)),
      resonance_metrics: {
        strength: Math.min(10, Math.max(1, result.resonance_metrics?.strength || 7)),
        clarity: Math.min(10, Math.max(1, result.resonance_metrics?.clarity || 7)),
        coherence: Math.min(10, Math.max(1, result.resonance_metrics?.coherence || 7)),
        pattern: Math.min(10, Math.max(1, result.resonance_metrics?.pattern || 7)),
      },
      analysis_notes: `AI analyzed with GPT-4. ${validatedOrbs.length} Orbs, ${validatedTags.length} tags, ${result.scrollstreams?.length || 0} scrollstreams extracted.`,
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw new Error('Failed to analyze content with AI');
  }
}

export function getOrbName(orbNumber: number): string {
  const orb = ORB_SYSTEM.find(o => o.number === orbNumber);
  return orb ? `Orb ${orb.number}: ${orb.name}` : `Orb ${orbNumber}`;
}

export function getOrbSynthesis(orbNumber: number): string {
  const orb = ORB_SYSTEM.find(o => o.number === orbNumber);
  return orb?.synthesis || '';
}

export { VALID_TAGS, ORB_SYSTEM };
