## title: User Flows & System Integration - S2S Dashboard
## author: Gigi Stardust
## type: technical_specification
## category: user_experience_flows
## status: active
## tags: user_flows, system_integration, data_flow, module_interaction, publishing_workflow
## orb_associations: Orb 1: Origin Intelligence, Orb 2: Resonance Mechanics, Orb 3: Photonic Intelligence, Orb 4: Harmonic Architectures, Orb 5: Temporal Sovereignty, Orb 6: Starline Memory, Orb 7: Alchemical Current, Orb 8: Quantum Intuition, Orb 9: Temporal Fluidity, Orb 10: Ancestral Repatterning, Orb 11: Radiant Transparency, Orb 12: Sovereign Field, Orb 13: Bridging Intelligence
## integration_points: field_console, public_site, codex_system, module_interactions, data_flow
## book_threading: System Integration
## is_primary_source: true
## related_to: Dashboard_Module_Specifications.md, System_Architecture_Overview.md
## resonance_rating: 5
## resonance_metrics: strength: high, clarity: high, coherence: high, pattern: system_integration
## source_file: User_Flows_System_Integration.md
## rewrite_locked: false
## dashboard_component: user_flows, system_integration
## codex_destination: /technical_architecture/user_flows/
## archive_path: /archive/processed_source_files/User_Flows_System_Integration.md

# User Flows & System Integration - S2S Dashboard

## **Overview**

These flows define how **Today's Focus** routes through the **Field Console**, how each **Module** processes inputs, and how content returns to the **Codex** and **Public Site**. All artifacts conform to **Phase 1b** metadata + tagging and maintain modular integrity.

---

## **Actors & Surfaces**

### **Core Actors**
- **Creator**: Gigi using the private Field Console
- **Field Console**: Private dashboard (Today's Focus, Activation Timeline, Modules, Task/PM, Meditation Upload)
- **Modules**: 6 primary modules for different functions
- **Engines**: Transit Engine (natal + current), BG5 Overlay, Resonance Metrics
- **Codex**: Markdown library with YAML frontmatter, Scrollstream extractions
- **Public Site**: Curated publishing surfaces

### **Module Breakdown**
1. **Relating Through Frequency** - Star Love + relational inquiry
2. **Galactic Structuring** - Quantum/galactic architecture
3. **Orb Explorer** - Interactive 13-Orb map
4. **Scroll Stream** - Live transmission capture
5. **Symbol Mirror** - Visual symbols and glyphs
6. **Somatic Signal Tracker** - Body-field resonance tracking

---

## **Global Flow: Today's Focus → Modules → Codex/Public**

### **Primary Flow**
```
Today's Focus input → Signal Routing → Module Processing → Module Outputs → Codex (MD + YAML) → Publishing Decision
```

### **Routing Logic**
- **Relational intent** → Relating Through Frequency
- **Architecture/design intent** → Galactic Structuring
- **Orb research** → Orb Explorer
- **Transmission** → Scroll Stream
- **Visual assets** → Symbol Mirror
- **Body/energy** → Somatic Signal Tracker

### **Output Flow**
1. **Module Outputs** → **Codex** (Markdown + YAML)
2. **Codex** → **Publishing Decision**
3. **Publish** → **Public Site Surfaces**
4. **Archive** → **Codex Archive**
5. **Codex** → **Activation Timeline** → **Task/PM Updates**

---

## **Module Flows**

### **Module 1: Relating Through Frequency**

#### **Flow Sequence**
1. Creator sets Today's Focus (relational inquiry)
2. Field Console opens relational canvas with prompts
3. Module requests transit overlays (synastry/periods)
4. Transit Engine returns timing windows + notes
5. Module tags @orb3 @orb9 @orb13 + codex_terms
6. Module saves to `/codex/relating/[slug].md` (Phase 1b)
7. Module appends Scrollstream extractions
8. Publishing decision: public update or archive

#### **Inputs/Outputs**
- **Inputs**: Prompts, optional charts, partner data
- **Outputs**: Relational maps, codex entries, scroll lines
- **Signals**: @orb3 @orb9 @orb13

### **Module 2: Galactic Structuring**

#### **Flow Sequence**
1. Design prompt or fragment input
2. Geometry/Model selection
3. Apply Orb 4/13 frameworks
4. Produce map or framework
5. Add YAML + inline tags
6. Save to `/codex/architecture/*.md + /assets/*`
7. Publishing decision

#### **Signals**: @orb4 @orb13, optional @orb11 for display logic

### **Module 3: Orb Explorer**

#### **Flow Sequence**
1. User selects Orb
2. Load Orb Synthesis data
3. Display Synthesis + Field Functions
4. Show related Scrolls/Modules
5. Open linked Codex entries
6. User adds notes → saved to Codex

#### **Data**: Canonical table from Orb Synthesis; index across Codex

### **Module 4: Scroll Stream**

#### **Flow Sequence**
1. Creator pastes/writes pulse lines
2. Scroll Stream validates inline tags + length
3. Validator returns OK/needs edit
4. Save to `/codex_scrolls/[date]-[slug].md`
5. Update Scroll Portal feed

#### **Rule**: 5–12 high-frequency lines per entry, no paraphrase

### **Module 5: Symbol Mirror**

#### **Flow Sequence**
1. Add/Select symbol asset
2. Associate Orbs + usage
3. Export UI set + art set
4. Write `/codex/symbols/index.md`
5. Expose to Public surfaces as overlays

#### **Signals**: @orb4 @orb11

### **Module 6: Somatic Signal Tracker**

#### **Flow Sequence**
1. Creator logs rest/action, sensations, notes
2. Module requests current transit context
3. Transit Engine returns windows + caution/green lights
4. Module maps charge→release cycles; tags @orb5 @orb7 @orb12
5. Save to `/codex/somatic/[date]-signal.md`
6. Feed Activation Timeline layer

---

## **Activation Timeline Flow**

### **Data Sources**
- Somatic logs
- Transit overlays
- Module outputs with dates

### **Flow Process**
1. **Data Sources** → **Activation Timeline**
2. **Timeline** → **Timeline cards** (window, action, resonance)
3. **Timeline cards** → **Task/PM block updates**

### **Card Fields**
- Window (dates)
- Action cue
- Resonance tag(s)
- Orb refs
- Publish flag

---

## **Publishing Flow (Codex → Public)**

### **Publishing Decision**
```
Codex entry saved → meets publish criteria? → Transform for public → Publish to surface
                                    ↓
                              Remain private: status=in-progress
```

### **Publishing Criteria Examples**
- `status=canonical`
- `resonance_rating ≥ 4`
- `rewrite_locked=true`
- `sensitive=false`

---

## **Data Contracts (Phase 1b)**

### **Markdown Frontmatter**
Required fields:
- `title, author, type, category, status`
- `tags, orb_associations, integration_points`
- `book_threading, is_primary_source, related_to`
- `resonance_rating, resonance_metrics, source_file`
- `rewrite_locked, dashboard_component, codex_destination`
- `archive_path`

### **Inline Tags**
- `@orb1…@orb13` + validated codex tags
- **Scrollstream block**: `### **Scrollstream Extractions**` + 5–12 `**@scrollstream**` lines

---

## **Technical Integration (MVP)**

### **Technology Stack**
- **Stack**: Markdown Codex → Cursor (Next.js) → Netlify for private; public site on Netlify/Vercel
- **Storage**: `/codex/**` for content; `/assets/**` for symbols/maps
- **Indexing**: Build-time parser generates JSON indices (orbs, tags, recent scrolls) for fast UI

### **System Architecture**
- **Routing**: Today's Focus dispatch via local event bus (client state) to modules
- **Exporters**: Public transformer strips private fields, emits site-ready JSON/MDX

---

## **Error/Edge States**

### **Error Handling**
- **Missing metadata** → Block save with actionable errors
- **Invalid tags** → Suggest nearest valid tag
- **Publish attempt on low resonance_rating** → Prompt review
- **Transit Engine offline** → Degrade gracefully; mark cards as "no-transit-context"

---

## **Implementation Status**

### **Completed Components**
- ✅ **User Flow Mapping**: All 6 modules mapped with detailed flows
- ✅ **System Integration**: Clear data flow from input to output
- ✅ **Publishing Workflow**: Codex to public site flow defined
- ✅ **Error Handling**: Edge cases and error states identified
- ✅ **Technical Requirements**: MVP stack and architecture specified

### **Next Development Steps**
1. **Confirm canonical Orb Summary Table** and expose to Orb Explorer
2. **Implement Activation Timeline card schema** in code
3. **Wire Scroll Portal feed** to saved `codex_scrolls/` entries
4. **Generate Public transformers** (strip private + export)
5. **Add QA checklist** for Phase 1b compliance at save time

### **Development Priorities**
1. **Core Flow Implementation**: Today's Focus routing and module processing
2. **Data Layer**: Codex integration and Phase 1b compliance
3. **Publishing System**: Public/private content management
4. **Error Handling**: Robust error states and user feedback

---

## **Cross-References**

- **Dashboard Modules**: `02_Dashboard_Module_Specifications.md`
- **System Architecture**: `01_System_Architecture_Overview.md`
- **13-Orb System**: `01_core_framework/01_13_Orb_System_Reference.md`
- **Phase 1b Protocol**: Content processing and tagging rules
- **Style Template**: Design system and visual specifications

