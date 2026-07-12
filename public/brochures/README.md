Drop service brochure PDFs here (e.g. `chandelier-rental.pdf`).

Then in `lib/servicesData.js`, set that service's `brochure` field to the public path:

```js
brochure: "/brochures/chandelier-rental.pdf",
```

Leave `brochure: null` to hide the "Download Brochure" button on that service's page.
