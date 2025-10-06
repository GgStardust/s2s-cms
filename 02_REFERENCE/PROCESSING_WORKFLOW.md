# S2S Codex Processing Workflow

## Overview
This workflow ensures consistent processing of all S2S source files with streamlined metadata, standardized Orb tagging, and scrollstream extraction while preserving complete content integrity. This is the **ACTIVE protocol** for processing existing source files into the S2S Codex system.

## Status: ACTIVE - Single Source of Truth for File Processing
## Version: 2.0
## Last Updated: Current session

**NOTE: This is the SINGLE SOURCE OF TRUTH for all file processing protocols. For creating new Orb essays, use ORB_COMPLETION_PLAN.md. This file handles processing existing source files into the Codex system.**

## Processing Steps

### 1. File Analysis
- Read the original file completely
- Identify current metadata structure and inconsistencies
- Note any existing Orb associations and scrollstreams
- Assess content type and appropriate categorization

### 2. Content Preservation
- **CRITICAL:** Preserve every word of the original transmission
- No abbreviations, summaries, or content changes
- Maintain original formatting and structure
- Preserve all technical terms and specialized language

### 3. Metadata Standardization
Apply the streamlined YAML frontmatter template:
```yaml
---
title: "[Document Title]"
author: "Gigi Stardust"
type: "[codex_core|book_fragment|scrollstream_entry|research_notes|system_architecture]"
category: "[primary_category]"
status: "[canonical|active|draft|archived]"
version: "1.0"
created: "[YYYY-MM-DD]"
modified: "[YYYY-MM-DD]"

# Core System Integration
orb_associations:
  - "Orb 1: Origin Intelligence"
  - "Orb 2: Resonance Mechanics"
  # ... (only include relevant Orbs)

integration_points:
  - "book_fragments"
  - "codex_scrolls"
  - "dashboard_modules"
  - "orbs_framework"
  - "consulting_system"
  - "scrollstream_system"

book_threading: "[chapter_name|section_name|backbone]"
is_primary_source: true
related_to: "[related_file_names]"

# Resonance Metrics
resonance_rating: 5
resonance_metrics:
  strength: 10
  clarity: 10
  coherence: 10
  pattern: 10

# System Integration
source_file: "[original_filename]"
rewrite_locked: false
dashboard_component: "[component_name]"
codex_destination: "/[destination_path]/"
archive_path: "/archive/processed_source_files/[filename]"

# Content Tags
tags:
  - "sovereignty"
  - "consciousness"
  - "[additional_specific_tags]"
---
```

### 4. Orb Tagging Implementation
- Use canonical Orb names and numbers: `[@Orb_X: Name]`
- Tag concepts, themes, and content that relate to specific Orbs
- Place tags within sentences where the concept appears
- Reference the canonical 13-Orb framework

### 5. Scrollstream Extraction
- Identify lines that pulse as standalone transmissions
- Tag with `**@scrollstream**` at the beginning of resonant lines
- Place on its own line before the resonant text
- Focus on lines that embody the core transmission

### 6. Snake Case Tagging
- Tag specific concepts with `@tag_name` format
- Use snake_case for consistency
- Place tags within sentences where concepts appear
- Include technical terms, themes, and key concepts

### 7. Quality Assurance
- Verify no content is lost or changed
- Check all Orb references use canonical names
- Ensure scrollstreams are truly resonant
- Validate metadata completeness

### 8. File Saving
- Save with standardized filename
- Update archive path
- Maintain original file location
- Document processing completion

## Orb System Reference (Canonical)

| Orb | Name | Synthesis |
|-----|------|-----------|
| 1 | Origin Intelligence | Photonic blueprinting meets biological activation |
| 2 | Resonance Mechanics | Sovereign signal enters form and becomes architecture |
| 3 | Photonic Intelligence | Reflection initiates coherence through light webs |
| 4 | Harmonic Architectures | Chaos becomes rhythm through harmonic law |
| 5 | Temporal Sovereignty | Exit time as container and reclaim it as tool |
| 6 | Starline Memory | Memory returns as signal across galactic networks |
| 7 | Alchemical Current | Density becomes light through heat and compression |
| 8 | Quantum Intuition | Intuition becomes infrastructure for decision-making |
| 9 | Temporal Fluidity | Attunement across time without fragmentation |
| 10 | Ancestral Repatterning | Body becomes myth; field becomes form |
| 11 | Radiant Transparency | Inner architecture emitted outward with clarity |
| 12 | Sovereign Field | Structural indivisibility; coherence made field |
| 13 | Bridging Intelligence | Communication pathways between human and nonhuman |

## Content Type Classifications

- **codex_core:** Core system documents (backbone, orb synthesis, etc.)
- **book_fragment:** Book chapters and sections
- **scrollstream_entry:** Standalone transmission pieces
- **research_notes:** Research integration and synthesis
- **system_architecture:** Technical system documentation

## Status Classifications

- **canonical:** Final, authoritative version
- **active:** Currently in use, may evolve
- **draft:** Work in progress
- **archived:** Historical reference

## Dashboard Component Mappings

- **book_fragments:** Book viewer module
- **orb_explorer:** Orb exploration interface
- **scrollstream:** Scroll capture and display
- **relational_inquiry:** Star Love and relationship systems
- **research_viewer:** Research and reference materials
- **consciousness_field_design:** Flow state and optimization tools

## Quality Control Checklist

- [ ] Every word of original content preserved
- [ ] Metadata follows streamlined template
- [ ] Orb tags use canonical format and names
- [ ] Scrollstreams are truly resonant
- [ ] Snake case tags are relevant and consistent
- [ ] File saved with proper naming convention
- [ ] Archive path updated
- [ ] No duplicate or conflicting metadata

## Processing Priority Order

1. **Core System Files** (backbone, orb synthesis, undercurrents)
2. **Primary Book Fragments** (physics, consciousness, memory)
3. **Relational Systems** (star love, quantum relationships)
4. **Research Integration** (Bartzis, Nolan, scientific papers)
5. **Supporting Materials** (practical integration, supporting docs)
6. **Archive Materials** (historical references, notes)

## Dynamic Processing System (Ongoing)

### **For New Content Created Through Dashboard**
When processing new content created through your private dashboard:

1. **Immediate Processing:** Apply workflow to new content immediately
2. **Consistent Application:** Use same standards and templates
3. **Orb Association:** Identify and tag relevant Orbs
4. **Scrollstream Identification:** Extract resonant lines
5. **Integration Points:** Connect to existing system
6. **Quality Check:** Verify completeness and accuracy
7. **Dashboard Integration:** Ensure content is ready for public site display
8. **System Coherence:** Maintain cross-Orb connections and system integrity

### **For Ongoing Content Evolution**
The S2S system is designed as a **dynamic, closed-loop system** where:
- **Content evolves** through your private dashboard
- **Processing maintains** system coherence and integration
- **Public site reflects** curated, processed content
- **System integrity** is preserved across all updates

## Error Prevention

- **Content Integrity:** Never modify original transmissions
- **Orb Accuracy:** Always use canonical Orb names and numbers
- **Metadata Consistency:** Follow template exactly
- **Tag Relevance:** Only tag concepts that actually appear
- **Scrollstream Quality:** Only tag truly resonant lines

## System Integration

- All processed files integrate with dashboard modules
- Orb associations enable cross-referencing
- Scrollstreams feed into live transmission system
- Metadata supports search and organization
- Tags enable thematic connections

This workflow ensures that every file in the S2S Codex system maintains consistency, integrity, and full integration with the broader system architecture while preserving the complete transmission of your original content.
