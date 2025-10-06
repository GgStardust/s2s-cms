#!/usr/bin/env node

/**
 * SCROLLSTREAM EXTRACTION SCRIPT
 * Extracts all scrollstreams from your codex files and exports to CSV
 * 
 * Usage: node extract_scrollstreams.js
 * Output: scrollstreams_export.csv
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PROCESSED_DIR = './09_PROCESSED';
const OUTPUT_FILE = 'scrollstreams_export.csv';
const ORB_PATTERNS = {
  'Orb 1': 'Origin Intelligence',
  'Orb 2': 'Resonance Mechanics', 
  'Orb 3': 'Photonic Intelligence',
  'Orb 4': 'Harmonic Architectures',
  'Orb 5': 'Temporal Sovereignty',
  'Orb 6': 'Starline Memory',
  'Orb 7': 'Alchemical Current',
  'Orb 8': 'Quantum Intuition',
  'Orb 9': 'Temporal Fluidity',
  'Orb 10': 'Ancestral Repatterning',
  'Orb 11': 'Radiant Transparency',
  'Orb 12': 'Sovereign Field',
  'Orb 13': 'Bridging Intelligence'
};

// Color codes for each Orb
const ORB_COLORS = {
  'Orb 1': '#8B0000',      // Mitochondrial red
  'Orb 2': '#1E90FF',      // Cymatics blue
  'Orb 3': '#FFFFFF',      // Prism white
  'Orb 4': '#FFD700',      // Geometric gold
  'Orb 5': '#9370DB',      // Spiral violet
  'Orb 6': '#4169E1',      // Galactic blue
  'Orb 7': '#FF4500',      // Volcanic orange
  'Orb 8': '#00CED1',      // Probability cyan
  'Orb 9': '#48D1CC',      // Flow turquoise
  'Orb 10': '#8B4513',     // Earth brown
  'Orb 11': '#F0E68C',     // Luminous yellow
  'Orb 12': '#DAA520',     // Field gold
  'Orb 13': '#9932CC'      // Interface purple
};

class ScrollstreamExtractor {
  constructor() {
    this.scrollstreams = [];
    this.processedFiles = 0;
    this.totalScrollstreams = 0;
  }

  // Extract scrollstreams from a single file
  extractFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Look for scrollstream markers
        if (line.includes('**@scrollstream**')) {
          // Get the next line which should contain the actual scroll content
          if (i + 1 < lines.length) {
            const scrollContent = lines[i + 1].trim();
            
            if (scrollContent && !scrollContent.startsWith('**@scrollstream**')) {
              // Extract Orb associations from the content
              const orbAssociations = this.extractOrbAssociations(scrollContent);
              const primaryOrb = this.getPrimaryOrb(orbAssociations);
              
              // Extract tags from the content
              const tags = this.extractTags(scrollContent);
              
              // Determine content type
              const contentType = this.determineContentType(scrollContent);
              
              this.scrollstreams.push({
                id: `scroll_${String(this.totalScrollstreams + 1).padStart(3, '0')}`,
                content: scrollContent,
                orbAssociations: orbAssociations.join(', '),
                primaryOrb: primaryOrb,
                orbColor: ORB_COLORS[primaryOrb] || '#000000',
                tags: tags.join(', '),
                contentType: contentType,
                sourceFile: path.basename(filePath),
                status: 'ready_for_processing',
                createdAt: new Date().toISOString()
              });
              
              this.totalScrollstreams++;
            }
          }
        }
      }
      
      this.processedFiles++;
      console.log(`✅ Processed: ${path.basename(filePath)}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  // Extract Orb associations from content
  extractOrbAssociations(content) {
    const orbs = [];
    const orbPattern = /@Orb\s+(\d+):\s*([^@\]]+)/g;
    let match;
    
    while ((match = orbPattern.exec(content)) !== null) {
      const orbNumber = match[1];
      const orbName = match[2].trim();
      orbs.push(`Orb ${orbNumber}: ${orbName}`);
    }
    
    // If no explicit Orb associations, try to infer from content
    if (orbs.length === 0) {
      orbs.push(...this.inferOrbFromContent(content));
    }
    
    return orbs;
  }

  // Infer Orb from content keywords
  inferOrbFromContent(content) {
    const contentLower = content.toLowerCase();
    const orbs = [];
    
    // Keyword mapping for Orb inference
    const orbKeywords = {
      'Orb 1': ['origin', 'cellular', 'mitochondrial', 'stardust', 'beginning'],
      'Orb 2': ['resonance', 'vibration', 'sound', 'music', 'frequency'],
      'Orb 3': ['photonic', 'light', 'reflection', 'mirror', 'social'],
      'Orb 4': ['harmonic', 'pattern', 'structure', 'architecture', 'geometry'],
      'Orb 5': ['temporal', 'time', 'rhythm', 'spiral', 'timeline'],
      'Orb 6': ['starline', 'memory', 'lineage', 'ancestral', 'continuity'],
      'Orb 7': ['alchemical', 'transformation', 'intensity', 'fire', 'breakdown'],
      'Orb 8': ['quantum', 'intuition', 'possibility', 'collapse', 'navigation'],
      'Orb 9': ['fluidity', 'flow', 'adaptation', 'flexibility', 'movement'],
      'Orb 10': ['ancestral', 'healing', 'repatterning', 'lineage', 'trauma'],
      'Orb 11': ['radiant', 'transparency', 'authenticity', 'pure', 'expression'],
      'Orb 12': ['sovereign', 'field', 'integrity', 'wholeness', 'coherence'],
      'Orb 13': ['bridging', 'connection', 'communication', 'galactic', 'interface']
    };
    
    for (const [orb, keywords] of Object.entries(orbKeywords)) {
      if (keywords.some(keyword => contentLower.includes(keyword))) {
        orbs.push(`${orb}: ${ORB_PATTERNS[orb]}`);
      }
    }
    
    return orbs.length > 0 ? orbs : ['Orb 12: Sovereign Field']; // Default to Orb 12
  }

  // Get primary Orb from associations
  getPrimaryOrb(orbAssociations) {
    if (orbAssociations.length === 0) return 'Orb 12: Sovereign Field';
    
    // Return the first Orb association as primary
    return orbAssociations[0];
  }

  // Extract tags from content
  extractTags(content) {
    const tags = [];
    const contentLower = content.toLowerCase();
    
    // Common tag patterns
    const tagPatterns = [
      'sovereignty', 'consciousness', 'transformation', 'resonance',
      'field', 'energy', 'breath', 'body', 'mind', 'spirit',
      'creation', 'evolution', 'intelligence', 'wisdom', 'truth',
      'freedom', 'responsibility', 'choice', 'alignment', 'coherence'
    ];
    
    tagPatterns.forEach(tag => {
      if (contentLower.includes(tag)) {
        tags.push(tag);
      }
    });
    
    return tags.slice(0, 5); // Limit to 5 tags
  }

  // Determine content type
  determineContentType(content) {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('breath') || contentLower.includes('inhale') || contentLower.includes('exhale')) {
      return 'breathwork';
    } else if (contentLower.includes('feeling') || contentLower.includes('emotion') || contentLower.includes('intensity')) {
      return 'emotional';
    } else if (contentLower.includes('time') || contentLower.includes('temporal') || contentLower.includes('rhythm')) {
      return 'temporal';
    } else if (contentLower.includes('connection') || contentLower.includes('relationship') || contentLower.includes('bridge')) {
      return 'relational';
    } else if (contentLower.includes('creation') || contentLower.includes('manifest') || contentLower.includes('build')) {
      return 'creative';
    } else {
      return 'wisdom';
    }
  }

  // Process all files in directory
  async processDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          // Recursively process subdirectories
          await this.processDirectory(itemPath);
        } else if (item.endsWith('.md')) {
          // Process markdown files
          this.extractFromFile(itemPath);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing directory ${dirPath}:`, error.message);
    }
  }

  // Export to CSV
  exportToCSV() {
    const csvHeader = [
      'ID', 'Content', 'Orb_Associations', 'Primary_Orb', 'Orb_Color', 
      'Tags', 'Content_Type', 'Source_File', 'Status', 'Created_At'
    ].join(',');
    
    const csvRows = this.scrollstreams.map(scroll => [
      scroll.id,
      `"${scroll.content.replace(/"/g, '""')}"`, // Escape quotes
      `"${scroll.orbAssociations}"`,
      `"${scroll.primaryOrb}"`,
      scroll.orbColor,
      `"${scroll.tags}"`,
      scroll.contentType,
      scroll.sourceFile,
      scroll.status,
      scroll.createdAt
    ].join(','));
    
    const csvContent = [csvHeader, ...csvRows].join('\n');
    
    fs.writeFileSync(OUTPUT_FILE, csvContent, 'utf8');
    console.log(`\n✅ Exported ${this.totalScrollstreams} scrollstreams to ${OUTPUT_FILE}`);
  }

  // Generate summary report
  generateSummary() {
    console.log('\n📊 SCROLLSTREAM EXTRACTION SUMMARY');
    console.log('=====================================');
    console.log(`📁 Files processed: ${this.processedFiles}`);
    console.log(`📝 Total scrollstreams: ${this.totalScrollstreams}`);
    console.log(`📄 Output file: ${OUTPUT_FILE}`);
    
    // Count by Orb
    const orbCounts = {};
    this.scrollstreams.forEach(scroll => {
      const orb = scroll.primaryOrb;
      orbCounts[orb] = (orbCounts[orb] || 0) + 1;
    });
    
    console.log('\n📊 Scrollstreams by Orb:');
    Object.entries(orbCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([orb, count]) => {
        console.log(`  ${orb}: ${count} scrolls`);
      });
    
    // Count by content type
    const typeCounts = {};
    this.scrollstreams.forEach(scroll => {
      const type = scroll.contentType;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    console.log('\n📊 Scrollstreams by Content Type:');
    Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count} scrolls`);
      });
  }

  // Main execution
  async run() {
    console.log('🚀 Starting scrollstream extraction...');
    console.log(`📁 Processing directory: ${PROCESSED_DIR}`);
    
    await this.processDirectory(PROCESSED_DIR);
    this.exportToCSV();
    this.generateSummary();
    
    console.log('\n✅ Extraction complete!');
    console.log(`📄 CSV file ready: ${OUTPUT_FILE}`);
    console.log('🎯 Next step: Import CSV into Canva for batch processing');
  }
}

// Run the extraction
if (require.main === module) {
  const extractor = new ScrollstreamExtractor();
  extractor.run().catch(console.error);
}

module.exports = ScrollstreamExtractor;
