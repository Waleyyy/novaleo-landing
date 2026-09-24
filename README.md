# Novaleo pre-launch teaser

A single static page: what Novaleo is, shown through real screens of the app, and one action,
**Join the waitlist** (Tally form `https://tally.so/r/2EpPep`). No pricing, no plan names.

This is **direction A** from `doc/backlog/RESUME-landing-sep24.md`: light and product-led. Real screenshots
carry the page, the space motif is limited to the logo and one star in the closing band, and there is no intro
animation. Direction C (editorial) comes after this one.

## Running it

No build step and no dependencies. Serve the folder:

```
python -m http.server 8777
```

## Before going live

- Replace `REPLACE-WITH-LIVE-DOMAIN` in `index.html` (the `og:url` and `og:image` tags).
- Bump the `?v=N` on `css/style.css` and `js/main.js` on every deploy. There is no content hashing, so
  returning visitors otherwise keep the old files.
- A privacy notice for the waitlist. The form collects e-mail addresses from students, so GDPR needs one; it can
  live in the Tally form itself or on a page linked from the footer.

## The screenshots

`img/*.webp` are real captures of the running app (light mode, 1440 wide at 2x), each with a `-1x` variant
for `srcset`. The content is **demo data**, not real users. It lives in a fictional school, "Aurora Gymnasium",
created by:

```
cd novaleo-backend
node scripts/seed-landing-demo.js           # create the demo school, 7 students, posts, groups, chat, deadlines
node scripts/seed-landing-demo.js --remove  # delete all of it
```

The demo login is `lena.hofer` / `LandingDemo#2026`. The island is a copy of the `@novaleo` island. The
Drive document ("Pendulum lab report") was typed into the editor by hand during capture, so the seed script
does not recreate it.

To re-capture: start the backend and the app (with `REACT_APP_API_URL=http://localhost:5000`), log in as the
demo student, capture at 1440x960 with device scale 2, and crop off the app's own scrollbar on the right edge.

## Files

```
index.html     the page; the Bootstrap Icons it uses are inlined as an SVG sprite
css/style.css  tokens from doc/brand-identity.md, layout, motion
js/main.js     scroll reveals, header border, the closing star (IntersectionObserver only)
img/           screenshots and the logo mark
fonts/         self-hosted Bricolage Grotesque 700 and Inter 400/500/600
assets/        favicons and the OG image
```

## Decisions worth knowing

- **Light only.** The captures are the light app and direction A is a light page. A dark variant would need
  dark-mode captures as well.
- **One call to action, one label.** Every button says "Join the waitlist" and goes to the same form.
- **Every claim is something that is built**, per `doc/brand-identity.md` §11 and §13. Nova Drive is described
  as shared editing with comments and history, not live co-editing, because documents are last-write-wins today
  (bugs.md B-190, B-194).
- **Motion** is fade-up on scroll, a small rise on the hero, and the star igniting once. All of it is off under
  `prefers-reduced-motion`, and without JavaScript everything is simply visible.
- **Inter** is flagged by the design linter as overused; it stays because the brand doc names it as the body face.
