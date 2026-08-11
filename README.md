# Juniper House — Website

Production website for **Juniper House — Assisted Senior Living** (Trinidad &
Tobago). Static multi-page HTML/CSS/JS, no build step, deployed on GitHub Pages.

Content source: the official Juniper House marketing booklet (services, pricing,
amenities, admissions, FAQs, visiting information, contact details).

## Structure

```
index.html         Home            about.html   About / mission / vision
care.html          Care & Services locations.html  Orange Field + Cascade
life.html          Daily life      admissions.html Steps, what to bring, FAQs
contact.html       Booking + contact + visiting info
assets/css/main.css   Design system (navy #0D1B35 / gold #C7A247 / cream #F7F3E9)
assets/js/main.js     Header, mobile menu, reveal-on-scroll, FAQ accordion
assets/js/booking.js  Booking: Cal.com embed + WhatsApp fallback form
assets/img/           Optimized photos; placeholder-* are AI-generated temps
docs/photography-shot-list.md   Shots the business should capture
```

## Booking setup (one time, ~5 minutes)

The "Book a Visit" flow currently opens a prefilled WhatsApp message. To enable
**online scheduling that books straight into Google Calendar on both sides**:

1. Create a free account at [cal.com](https://cal.com) with the business Google
   account and connect its **Google Calendar**.
2. Create an event type **"Site Visit"** (45 min). Set availability to visiting
   hours: **10:00–12:00 and 15:00–18:00 daily**. Optionally add a "Location"
   question (Orange Field / Cascade).
3. Copy the public link (e.g. `https://cal.com/juniper-house/site-visit`) and
   paste it into `assets/js/booking.js`:
   ```js
   var BOOKING_URL = "https://cal.com/juniper-house/site-visit";
   ```
4. Commit and push. The contact page then shows the live scheduler; visitors
   pick an open slot, the business's calendar gets the event, and the visitor
   receives a calendar invite by email. The WhatsApp form remains underneath as
   a fallback / follow-up channel.

## Replacing placeholder images

Four images are AI-generated temporaries (all prefixed `placeholder-` in
`assets/img/` and marked with an HTML comment where used). Replace each file
with real photography, keeping the same filename — no code changes needed. See
`docs/photography-shot-list.md` for the full shot list with guidance.

## Local preview

```
python -m http.server 8080
# open http://localhost:8080
```

## Deploy

Pushed to `main` on GitHub; GitHub Pages serves from the repository root.
