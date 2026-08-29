# Amara Home Care — Frontend Template

A premium, responsive frontend template for a home nursing & patient care agency, built with HTML5, Tailwind CSS (via CDN) and vanilla JavaScript.

## Pages
- `index.html` — Home 1 (editorial, warm hero)
- `home-2.html` — Home 2 (full-bleed, story-driven hero — a distinct layout from Home 1)
- `about.html` — About Us
- `services.html` — Care Services
- `caregivers.html` — Our Caregivers
- `pricing.html` — Care Packages & Pricing
- `contact.html` — Contact & Immediate Care Inquiry (with validated inquiry form)

## Structure
```
home-care-template/
├── index.html, home-2.html, about.html, services.html,
│   caregivers.html, pricing.html, contact.html
├── assets/
│   ├── css/style.css        (design tokens, dark mode, components)
│   ├── css/responsive.css   (breakpoint refinements)
│   ├── js/main.js           (dark mode, RTL, mobile menu, loader,
│   │                          scroll reveal, counters, form validation)
│   └── images/              (placeholder folders for local image swaps)
└── README.md
```

## Features
- Sticky header with a **Home** dropdown (Home 1 / Home 2) — the only nav item with a dropdown
- **Dark mode** toggle, persisted via `localStorage`, driven by CSS variables in `style.css`
- **RTL / LTR** toggle, persisted via `localStorage`
- Intentionally distinct mobile navigation (not a shrunk desktop menu)
- Premium page loader with a signature "care thread" line-draw animation
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Validated care-inquiry form on the Contact page (vanilla JS, no dependencies)
- Consistent `max-w-7xl`-style container system across header, sections, and footer
- Design tokens: warm parchment background, deep navy, muted teal & sage accents,
  Fraunces (display) + Public Sans (body/UI)

## Notes for developers
- Tailwind is loaded via the CDN play script with a small `tailwind.config` extension for
  custom colors/fonts — for production, consider a build-time Tailwind setup instead.
- Header, footer, and the loader markup are duplicated across each HTML file (no
  build step / templating engine is used), so any manual edits to shared chrome should be
  applied to all seven pages.
- Images are currently linked to Unsplash for preview purposes — replace with your own
  photography in `assets/images/` before shipping.
- Swap the phone number, email, and address placeholders in the footer and Contact page
  with real agency details.
