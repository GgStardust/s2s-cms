---
title: "Design System Specifications"
type: "brand_guidelines"
category: "design_system"
status: "active"
---

# Stardust to Sovereignty — Design System Specifications

This file provides the **practical package** of brand assets, UI rules, and symbol specifications for implementation across the dashboard, public site, and artistic outputs. It complements `01_Brand_Guidelines.md`.

---

## 🎨 Color Palette

### Primary
- **Deep Gold** — `#C49A6C`
- **Deep Navy** — `#1C1F3B`
- **Creamy White** — `#F4F1E8`

### Secondary / Accents
- **Teal / Copper / Ochre** — used sparingly for highlights
- **Gradients** — celestial overlays (gold–navy, ochre–cream, teal–copper)

---

## ✍️ Typography

- **Headings / Buttons** — Montserrat (Sans Serif)
- **Body / Text** — Lora (Serif)
- **Pairing Rule** — Clean serif/sans, minimal clutter, clear hierarchy.

### Font Weights
- Headings: 600–700
- Body: 400–500
- Captions/Overlays: 300–400

---

## 📐 UI Components

- **Cards** — rounded 2xl, soft shadows, layered gradients.
- **Buttons** — pill/rounded, Montserrat all-caps, gold or navy fills.
- **Forms** — minimal borders, highlight focus with gradient accent.
- **Animations** — Framer Motion default: easeInOut, 0.4s–0.6s transitions.
- **Layout** — responsive grid, generous spacing, no clutter.

---

## 🜂 Orb Symbol System

The **Orbs** are the **stable symbolic system** (13 total).  
They act as **anchors** in both the Codex and the brand identity.

- Format: **SVG preferred**, PNG fallback.  
- Stroke weight: even, consistent.  
- Color: Deep Gold (`#C49A6C`) on transparent or navy backgrounds.  
- Export sizes: 256px, 512px, scalable.  
- Naming convention:  
  - `orb_01_origin_intelligence.svg`
  - `orb_02_resonance_mechanics.svg`
  - ...
  - `orb_13_bridging_intelligence.svg`

Applications:  
- Dashboard navigation icons  
- Public site section anchors  
- Murals and sculptural elements  
- Jewelry and artistic expressions  

---

## 🜁 Glyph Symbol System

The **glyphs** are the **dynamic symbolic system**, arising in Scrollstream and artistic practice.  
They are mutable overlays, not fixed anchors.

### Rules
- Style: celestial palette (gold, navy, cream, copper), variable stroke (chalk, wax, digital).  
- Function: field signals, scroll companions, dashboard overlays.  
- Must remain **non-collapsed** — alive, changing, combinatory.  
- Export: SVG where possible for reuse across dashboard + art.  

### Naming convention
- `glyph_[theme]_[number].svg`  
  - e.g. `glyph_grief_01.svg`  
  - e.g. `glyph_memory_thread_02.svg`  

### Folder Structure
```
/brand_assets
   /orbs
      orb_01_origin_intelligence.png
      orb_02_resonance_mechanics.png
      ...
      orb_12_sovereign_field.png
   /glyphs
      glyph_grief_01.svg
      glyph_memory_thread_02.svg
      ...
```

---

## 🔗 Cross-References

- **01_Brand_Guidelines.md** → Voice, aesthetic, editorial rules  
- **01_System_Architecture_Overview.md** → How Orbs tie to modules  
- **02_Dashboard_Module_Specifications.md** → Where Orbs/Glyphs are applied  
- **Scrollstream & Symbol Mirror Modules** → Glyph integration zones  

---

## ✅ Quality Standards

- Unified **Celestial + Sovereign** aesthetic across all outputs.  
- Consistent Orb symbols, stable anchors.  
- Glyphs remain flexible and field-driven.  
- Assets must be scalable, export-ready, and usable in both **UI + artistic practice**.

---
