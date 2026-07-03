# OrbitAvanya Tech — Next.js site
## Structure

```
app/
  layout.tsx        Root layout: <html>/<body>, Google Fonts, page <head> data
  page.tsx           Renders the page markup and loads public/site.js
  bodyContent.ts      The full page markup as a string (nav, hero, all sections,
                       footer, lightbox) — kept intact from the original build so
                       every animation/layout choice carries over exactly
  globals.css         All site styles (design tokens in :root, section styles,
                       hover states, responsive rules)
public/
  site.js             Original vanilla-JS behavior: scroll nav state, reveal-on-
                       scroll, animated stat counters, tech-stack tabs, portfolio
                       category tabs + gallery lightbox, client logo strip
  images/              All images that used to be inline base64 — now real static
                       files served from /images/...
```

## Why markup-as-string instead of full JSX?

The original file is a large, animation-heavy one-pager with hand-tuned inline
SVGs and a vanilla-JS interaction layer (IntersectionObserver reveals, animated
counters, tab systems, a lightbox). To guarantee a pixel-identical, bug-free
conversion, the HTML was extracted as-is and the JS is loaded as a normal
script tag via `next/script` — so nothing about the design or behavior had to
be reverse-engineered into React state. If you want to gradually convert
sections to idiomatic React components, `app/bodyContent.ts` is the place to
start peeling pieces out of.

## Run it

```bash
npm install
npm run dev     
npm run build
npm run start
```

## Notes

- Images live in `public/images` and are referenced as normal `/images/...`
  URLs (no more inline base64), which is why the page source dropped from
  ~3.3MB to ~60KB of markup.
- All CSS custom properties (colors, radii, easing) are defined once in
  `:root` inside `globals.css`.
