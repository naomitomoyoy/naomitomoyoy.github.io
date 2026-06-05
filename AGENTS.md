# AGENTS.md

## Project overview

Interactive portfolio site for Naomi Tomoyoy (Artist & Vtuber). Indonesian language (`lang="id"`). No build system — plain HTML/CSS/JS with CDN dependencies.

## Structure

```
/
├── index.html              # Main entry point (all-in-one with Tailwind CSS)
├── js/
│   └── three-scene.js      # Three.js 3D teddy bear scene
├── assets/
│   ├── images/
│   │   ├── avatar/         # Avatar images (tomoyoy.png, tomoyoy1-3.png)
│   │   ├── gallery/        # Gallery art images (1000*.png)
│   │   └── l2d/            # L2D commission samples (L2D-*.png)
│   └── icons/
│       └── tomoyoy.ico     # Favicon
└── src/                    # NOT USED — leftover from another project
```

## CDN dependencies (no install step)

Loaded in `index.html`:
- Google Fonts: Poppins, Baloo 2
- Font Awesome 6.5.1
- Three.js r128 (3D teddy bear)
- Anime.js 3.2.2 (animations)
- Tailwind CSS (via CDN)

**Note:** All CSS is handled by Tailwind CSS utility classes. Only minimal custom styles for animations, cursor, and lightbox.

## Site sections

1. **Hero** — 3D teddy bear (Three.js), parallax background, CTA buttons
2. **About** — Profile image, description
3. **Gallery** — Art gallery grid with lightbox (14 images from `assets/images/gallery/`)
4. **Commission** (`#commission`) — Tabbed interface:
   - L2D (Half Body 500k, Full Body 650k)
   - Rigging (Tier 1 & Tier 2)
   - Illustration (Bust Up 50k, Half Body 85k, Full Body 120k)
   - Thumbnails (Bundle A 75k, B 200k, C 300k)
   - SOP & Spesifikasi Hasil
5. **Links** — Social/support links
6. **Footer** — Copyright

## Key features

- **Three.js Scene** — 3D teddy bear with mouse-follow, idle animation, particles
- **Parallax** — Multi-layer parallax on hero section
- **Gallery Parallax** — Individual items move at different scroll speeds
- **Custom Cursor** — Purple cursor follower with hover effects
- **Lightbox** — Gallery image viewer
- **Tabbed Commission** — Switch between L2D/Rigging/Illustration/Thumbnails
- **Tailwind CSS** — All styling via utility classes

## Gotchas

- **`src/` is unused.** Do not modify `src/` expecting changes on the site.
- **Gallery images are rendered by JS.** The `galleryData` array in `index.html` controls which images appear. Edit the array to add/remove gallery items.
- **Links are rendered by JS.** The `linksData` array in `index.html` controls the social links.
- **Three.js requires CDN.** The 3D scene won't load without internet connection.
- **No dev server.** Open `index.html` directly or use any static file server.
- **No lint/test/format commands.** No `package.json`, no CI, no pre-commit hooks.
