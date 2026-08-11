/* Juniper House — site-visit booking
 *
 * Primary path: Cal.com scheduling embed (availability-based; creates a Google
 * Calendar event for the business and emails the visitor a calendar invite).
 *
 * SETUP (one time, ~5 minutes — see README.md):
 *   1. Create a free account at https://cal.com and connect the business's
 *      Google Calendar.
 *   2. Create an event type "Site Visit" (45 min) with availability limited to
 *      visiting hours: 10:00–12:00 and 15:00–18:00.
 *   3. Paste the public booking link below, e.g.:
 *        var BOOKING_URL = "https://cal.com/juniper-house/site-visit";
 *
 * Until BOOKING_URL is set, the WhatsApp booking form below is the primary
 * path — and it always remains available as the fallback / follow-up channel.
 */
(function () {
  "use strict";

  var BOOKING_URL = ""; // ← paste the Cal.com event link here when ready

  var WHATSAPP_NUMBER = "18684804362"; // (868) 480-4362

  /* ---- Cal.com embed (only when configured) ---- */
  var embedHost = document.getElementById("booking-embed");
  if (embedHost && BOOKING_URL) {
    var iframe = document.createElement("iframe");
    iframe.src =
      BOOKING_URL +
      (BOOKING_URL.indexOf("?") === -1 ? "?" : "&") +
      "embed=true&theme=light";
    iframe.title = "Book a site visit — choose an available time";
    iframe.loading = "lazy";
    embedHost.appendChild(iframe);
    embedHost.closest(".booking-embed-wrap").hidden = false;
    var formIntro = document.getElementById("booking-form-intro");
    if (formIntro) {
      formIntro.textContent =
        "Prefer WhatsApp? Send us your details below and our team will follow up to confirm.";
    }
  }

  /* ---- WhatsApp booking form (always available) ---- */
  var form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : "";
      };
      var lines = [
        "Hello Juniper House, I would like to book a site visit.",
        "",
        "Name: " + get("name"),
        "Phone: " + get("phone"),
        "Preferred location: " + get("location"),
        "Preferred date: " + (get("date") || "Flexible"),
        "Preferred time: " + (get("time") || "Flexible"),
      ];
      var note = get("note");
      if (note) lines.push("Note: " + note);
      /* encodeURIComponent sanitizes all user input for the URL */
      var url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      var confirmEl = document.getElementById("booking-confirm");
      if (confirmEl) confirmEl.hidden = false;
    });
  }
})();
