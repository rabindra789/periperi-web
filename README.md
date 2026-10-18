# Periperi Web

A premium, art-directed website for Periperi — a developer-focused security scanning tool that provides contextual findings with evidence.

## Design Direction

The website is built with a dark, editorial, typography-driven aesthetic inspired by premium developer tool websites.

### Color Palette
- Background: `#0B0D0C` (near-black graphite)
- Secondary surface: `#121613` (deep charcoal)
- Primary text: `#F1F3EE` (warm off-white)
- Secondary text: `#A0AAA1` (muted gray-green)
- Primary accent: `#B7F36B` (acid green)
- Borders: `#293029` (charcoal-green)
- Severity colors: Critical `#FF3B30`, High `#FF9F0A`, Medium `#FFD60A`, Low `#30D158`, Info `#5E5CE6`

### Typography
Eight display typefaces were requested:
- **NANO** (Light) — Secondary editorial headlines
- **ACME** (Light) — Explanatory section headings
- **APEX** (Bold) — Hero headlines and major headings
- **GEO** (Light) — Short descriptive text
- **DESK** (Medium) — Navigation, buttons, labels
- **BITEC** (Bold) — Technical emphasis and metrics
- **ARK** (Bold) — Compact display headings
- **KAYON** (Light) — Large lightweight text treatments

> **Font status — important.** None of the eight requested typefaces could be
> verified as a specific, legally embeddable webfont. The names are ambiguous
> (multiple unrelated fonts share them) and several appear to be commercial
> releases requiring a paid license. **No unlicensed font files are bundled.**
>
> Until the licensed font files are supplied, the site renders every role with
> documented, self-hosted Open Font License placeholders:
> - **Display roles** (hero, headings, section identifiers) → **Space Grotesk**
> - **Text / UI roles** (body, navigation, labels) → **Inter**
> - **Code / terminal** → **JetBrains Mono**
>
> All three are self-hosted at build time via `next/font/google` (SIL Open Font
> License), so there are no runtime requests to Google. See the live specimen at
> `/fonts`, which lists each requested name, its proposed role, the placeholder
> currently rendering it, and the research notes on why it could not be embedded.

### Replacing the placeholder fonts
When the real, licensed font files are provided:
1. Put the `.woff2` files under `src/app/fonts/` (or a `public/fonts/` directory).
2. Define them with `next/font/local` in `src/app/layout.tsx`, exposing them as
   CSS variables named `--font-grotesk` (display), `--font-inter` (text), etc.
3. Point the named tokens in `src/app/globals.css` (`--font-apex`, `--font-nano`,
   and so on) at the new variables. No component changes are required.

## Pages

- `/` — Homepage with hero, product demo, principles, how it works, product paths, trust, and CTA
- `/vscode` — VS Code extension details
- `/cli` — Standalone CLI (coming soon)
- `/docs` — Documentation links
- `/about` — About Periperi
- `/fonts` — Font specimen preview page
- `404` — Not found page

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS variables for design tokens
- **Fonts:** Self-hosted via `next/font/local` (when licensed files are available)
- **Build:** Static export for simple deployment

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the periperi-web directory
cd periperi-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build
```

### Static Export

The site is configured for static export (`output: 'export'` in `next.config.js`). After building, the static files are in the `out/` directory and can be served by any static host.

```bash
npm run build
# Static files in ./out/
```

## Deployment

The site is a **static export** (`output: 'export'`), which keeps hosting simple
and cheap and means **no server, database, or runtime is required**. Every route
is prerendered to HTML at build time.

Set the production URL before building so Open Graph image URLs resolve correctly:

```bash
# .env.local (or your CI environment)
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Then:

```bash
npm run build   # emits ./out
```

The static `out/` directory can be deployed to:
- **Vercel:** automatic via GitHub integration (root directory = `periperi-web`)
- **Netlify / Cloudflare Pages:** build `npm run build`, publish `out`
- **GitHub Pages:** publish the `out/` directory (a `404.html` is generated automatically)
- **Any static host** (S3 + CDN, nginx, etc.)

Constraints of static export: no API routes, no server-side rendering at request
time, and no image optimization service (images use `unoptimized: true`). If a
future feature needs a backend, hosting would need to move to a Node runtime.

## Project Structure

```
periperi-web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── layout.tsx    # Root layout
│   │   ├── vscode/       # VS Code page
│   │   ├── cli/          # CLI page
│   │   ├── docs/         # Docs page
│   │   ├── about/        # About page
│   │   ├── fonts/        # Font specimen page
│   │   └── not-found.tsx # 404 page
│   ├── components/       # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductDemo.tsx
│   │   ├── FindingRow.tsx
│   │   ├── Terminal.tsx
│   │   └── ...
│   └── app/
│       └── globals.css   # Design tokens and global styles
├── public/               # Static assets (favicon)
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json
```

## Design Components

- **Header** — Responsive navigation with mobile menu
- **Footer** — Full footer with product, resource, and legal links
- **Hero** — Full-screen hero with terminal demonstration
- **ProductDemo** — Interactive scan results visualization
- **FindingRow** — Security finding display with severity and evidence
- **Terminal** — Authentic terminal window component
- **SectionLabel** — Numbered editorial section labels
- **ProductCard** — Product feature cards
- **Button** — Primary/secondary/ghost/outline button variants

## Motion & Accessibility

- Respectful of `prefers-reduced-motion`
- Semantic HTML with ARIA landmarks
- Keyboard navigation support
- Focus-visible indicators
- No scroll-jacking or heavy animation libraries

## Known Limitations

- Font roles render with self-hosted placeholder families (Space Grotesk / Inter / JetBrains Mono) pending licensed originals for the eight requested typefaces
- Terminal demonstrations are static (not interactive scanners)
- CLI status is "Planned" — no actual CLI exists yet
- No analytics, tracking, or external API calls

## License

This website source lives in a separate directory from the Periperi extension.
The Periperi extension itself (`D:\workspace\development\periperi\periperi`) is
declared `UNLICENSED` in its `package.json`, and the public repository does not
currently ship a `LICENSE` file. No open-source license is claimed for the
product on this site. Confirm licensing terms with the project owner before
reusing any product source. The website's own third-party dependencies retain
their respective licenses (see `package-lock.json`).