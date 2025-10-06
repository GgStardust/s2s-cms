/**
 * Fix Book Structure Script
 *
 * Adds missing chapter 3 (Metabolic Intelligence) and renumbers all subsequent chapters
 * Adds Conclusion as a special chapter
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Complete chapter structure from the outline
const COMPLETE_CHAPTER_STRUCTURE = [
  // Part 1: The Cosmic Tapestry — Our Origins and Fundamental Nature
  {
    number: 1,
    title: 'The Stardust Within',
    part: 1,
    part_title: 'The Cosmic Tapestry',
    notes: `- Introduction to the "Stardust to Sovereignty" premise
- We are made of stardust, animated by bioelectric forces
- The concept of being an integral part of the cosmos
- "To feast on the galaxy is to absorb the vibrations of stars"`
  },
  {
    number: 2,
    title: 'The Body as Advanced Biological Technology',
    part: 1,
    part_title: 'The Cosmic Tapestry',
    notes: `- Exploring the human body as a sophisticated instrument
- "Somatic Codex": Organs as interdimensional interfaces
  - Lungs as breath-bridges
  - Liver as timeline filter
  - Bones as crystalline storage
- Mitochondrial energy regulation and its role`
  },
  {
    number: 3,
    title: 'Metabolic Intelligence: Beyond Physical Nourishment',
    part: 1,
    part_title: 'The Cosmic Tapestry',
    notes: `- The body's capacity to digest emotions, filter timelines, and transmute density
- The "gut, liver, and system-wide digestion of signal"
- The connection between inner processing and outer reality`
  },
  {
    number: 4,
    title: 'Resonance and the Energetic Universe',
    part: 1,
    part_title: 'The Cosmic Tapestry',
    notes: `- Introduction to resonance mechanics and vibrational intelligence
- How we exist as both matter and waveform
- The electromagnetic symphony that connects all things
- Galactic intelligence and rhythmic cycles (charge-release patterns)`
  },

  // Part 2: The Sovereign Self — Awakening to Our Power
  {
    number: 5,
    title: 'Defining Energetic Sovereignty',
    part: 2,
    part_title: 'The Sovereign Self',
    notes: `- Sovereignty as active engagement with the universal field of consciousness
- Not isolation, but deep interconnectedness
- "Full responsibility for thought, word, and action"
- Aligning with universal rhythms and natural laws of energy`
  },
  {
    number: 6,
    title: 'Stepping Beyond Limitations',
    part: 2,
    part_title: 'The Sovereign Self',
    notes: `- Identifying and transcending externally imposed limitations (social, political, temporal)
- The challenge of inherited reality constructs
- The "cosmic cry for transformation"`
  },
  {
    number: 7,
    title: 'Temporal Fluidity: Living in the Now',
    part: 2,
    part_title: 'The Sovereign Self',
    notes: `- Challenging linear time
- Accessing states of awareness where past, present, and future converge
- Creativity, consciousness, and evolution through temporal fluidity`
  },
  {
    number: 8,
    title: 'Sovereign Disintegration: The Power of Unmaking',
    part: 2,
    part_title: 'The Sovereign Self',
    notes: `- The essential creative functions of releasing, grieving, and consciously allowing dissolution
- Creation through unmaking
- Embracing transformation through letting go`
  },

  // Part 3: Architecting Reality — Consciousness and Creation
  {
    number: 9,
    title: 'Consciousness Networks: The Web of Awareness',
    part: 3,
    part_title: 'Architecting Reality',
    notes: `- The intricate web of awareness, intelligence, and perception
- Evolution across individual, collective, galactic, and cosmic scales
- Photonic intelligence and quantum intuition as pathways to knowledge`
  },
  {
    number: 10,
    title: 'Language as a Sonic Grid',
    part: 3,
    part_title: 'Architecting Reality',
    notes: `- Language as a structuring field and its sacred geometry
- The impact of tone, syntax, etymology, and resonance
- Conscious communication as a tool for shaping reality`
  },
  {
    number: 11,
    title: 'Sacred Architecture: The Organizing Principle',
    part: 3,
    part_title: 'Architecting Reality',
    notes: `- Reality's vibrational structure and fractal intelligence
- How sacred geometry governs existence from cellular to planetary
- Aligning with the grid as a network of resonance and communication`
  },
  {
    number: 12,
    title: 'AI and Bridging Intelligence',
    part: 3,
    part_title: 'Architecting Reality',
    notes: `- AI as a mirror and tool, reflecting our evolutionary edge
- The interface between human sovereignty and non-human signal
- Defining how we engage with technology to maintain our sovereignty`
  },

  // Part 4: Embodying Sovereignty — The Living Blueprint
  {
    number: 13,
    title: 'The Living Blueprint for Transformation',
    part: 4,
    part_title: 'Embodying Sovereignty',
    notes: `- Integrating science, spirituality, and cosmology
- Our bioelectromagnetic fields in constant exchange with cosmic forces
- The matrix of light and consciousness as a living intelligence system`
  },
  {
    number: 14,
    title: 'Architects of Our Own Evolution',
    part: 4,
    part_title: 'Embodying Sovereignty',
    notes: `- "We are not passive participants in existence — we are its architects"
- Sovereignty as mastery of coherence and creative reorientation of perception
- A call to action for readers to step into this new paradigm`
  },

  // Conclusion (special chapter)
  {
    number: 15,
    title: 'Beyond Stardust — The Infinite Becoming',
    part: 4,
    part_title: 'Embodying Sovereignty',
    notes: `- Recap of the journey from cosmic origins to conscious co-creation
- The ongoing nature of evolution and sovereignty
- Final reflections on living a sovereign life in an interconnected universe`
  },
];

async function fixBookStructure() {
  console.log('📚 Fixing Book Structure - Adding missing sections\n');

  try {
    // Get non-fiction book
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('*')
      .eq('type', 'non_fiction');

    if (booksError || !books || books.length === 0) {
      console.error('Error fetching non-fiction book:', booksError);
      return;
    }

    const nonFictionBook = books[0];

    // Delete all existing chapters to rebuild with correct structure
    console.log('🗑️  Removing existing chapters to rebuild...');
    const { error: deleteError } = await supabase
      .from('chapters')
      .delete()
      .eq('book_id', nonFictionBook.id);

    if (deleteError) {
      console.error('Error deleting chapters:', deleteError);
      return;
    }

    // Import all chapters with correct structure
    console.log(`\n📖 Importing ${COMPLETE_CHAPTER_STRUCTURE.length} chapters with correct structure...\n`);

    for (const chapter of COMPLETE_CHAPTER_STRUCTURE) {
      const { error } = await supabase
        .from('chapters')
        .insert({
          book_id: nonFictionBook.id,
          chapter_number: chapter.number,
          title: chapter.title,
          part_number: chapter.part,
          part_title: chapter.part_title,
          status: 'outline',
          notes: chapter.notes,
          content: null,
          word_count: 0,
        });

      if (error) {
        console.log(`⚠️  Chapter ${chapter.number} error:`, error.message);
      } else {
        console.log(`✅ Chapter ${chapter.number}: ${chapter.title}`);
      }
    }

    console.log('\n✅ Book structure fixed!');
    console.log(`\nTotal chapters: ${COMPLETE_CHAPTER_STRUCTURE.length} (14 chapters + 1 conclusion)`);
    console.log('\nPart 1: The Cosmic Tapestry (4 chapters)');
    console.log('Part 2: The Sovereign Self (4 chapters)');
    console.log('Part 3: Architecting Reality (4 chapters)');
    console.log('Part 4: Embodying Sovereignty (2 chapters + conclusion)');

  } catch (err) {
    console.error('❌ Fix failed:', err);
  }
}

fixBookStructure();
