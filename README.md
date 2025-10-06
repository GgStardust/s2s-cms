# S2S Public Dashboard - Lean MVP

A comprehensive framework for understanding and developing sovereign consciousness through 13 fundamental Orbs that govern human experience and evolution.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the content from markdown files
npm run build-codex

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
app/
  (public)/
    page.tsx              # Home page
    layout.tsx            # Root layout
  orbs/[slug]/page.tsx   # Orb detail pages
  modules/[slug]/page.tsx # Module detail pages
  api/og/route.ts        # OG image API endpoint
components/
  cards/
    ModuleCard.tsx       # Module card component
    OrbCard.tsx          # Orb card component
  layout/
    ScrollstreamRail.tsx # Scrollstream component
01_CORE_FRAMEWORK/      # Source markdown files (original location)
  Stardust to Sovereignty Backbone_.md
  codex_Orb_Synthesis_Final.md
  S2S — Undercurrents Codex.md
data/
  public_codex.json      # Generated content data
lib/
  content.ts            # Content utilities
  types.ts              # TypeScript types
  md_indexer.ts         # Markdown processing
  slug.ts               # URL slug generation
scripts/
  build_public_codex.ts # Content build script
```

## 🎨 Design System

### Colors
- **Deep Gold**: `#C49A6C`
- **Deep Navy**: `#1C1F3B`
- **Creamy White**: `#F4F1E8`
- **Cosmic Blue**: `#3E5C76`

### Typography
- **Headings**: Montserrat
- **Body Text**: Lora

### Components
- **Cards**: Rounded 2xl, shadow-md
- **Buttons**: Pill style, Montserrat uppercase
- **Scrollstream**: Chip style, navy background

## 📊 Content

The dashboard displays:

- **13 Orbs**: Fundamental energetic field principles
- **3 Modules**: Core system components
- **Scrollstream**: Live transmission phrases
- **Dynamic Routes**: Individual orb and module pages

## 🔧 Development

### Content Management
Content is sourced from markdown files in `/01_CORE_FRAMEWORK/` and processed into JSON via the build script:

```bash
npm run build-codex
```

### Adding New Content
1. Add markdown files to `/01_CORE_FRAMEWORK/`
2. Update the markdown indexer in `/lib/md_indexer.ts`
3. Run `npm run build-codex`
4. Restart the development server

### Styling
Uses Tailwind CSS with custom brand colors defined in `tailwind.config.ts`.

## 🚀 Deployment

The project is ready for deployment to Vercel, Netlify, or any static hosting platform that supports Next.js.

```bash
npm run build
```

## ✅ MVP Requirements Met

- [x] Content sourced from 3 MD files
- [x] 13 Orbs displayed on home page
- [x] 5+ Scrollstream phrases
- [x] 3 Modules displayed
- [x] Orb detail pages with synthesis
- [x] Module detail pages with summaries
- [x] Brand colors and typography
- [x] Responsive design
- [x] SEO metadata
- [x] Accessibility features
- [x] Static generation
- [x] Local development ready

## 📝 License

© 2025 Stardust to Sovereignty.