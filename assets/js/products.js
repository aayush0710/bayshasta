// assets/js/products.js

// Product Lines (top tabs)
window.CATEGORIES = [
  { id: "orange-labs", name: "Orange Labs" },
  { id: "books", name: "Books" },
  { id: "koleaf-organics", name: "Koleaf Organics" },
  { id: "merchandise", name: "Merchandise" },
];

// Products
window.PRODUCTS = [
  // ---- ORANGE LABS ----
  {
    id: "orange-peel-powder-100",
    name: "Orange Peel Powder (100g)",
    price: 14.99,
    desc: "Zesty citrus powder for tea, smoothies, and cooking.",
    lineId: "orange-labs",
  },
  {
    id: "orange-herbal-tea-20",
    name: "Orange Herbal Tea (20 bags)",
    price: 12.99,
    desc: "Warm citrus blend for calm mornings.",
    lineId: "orange-labs",
  },
  {
    id: "fresh-juice-request",
    name: "Fresh Orange Juice (Limited Delivery)",
    price: 0,
    desc: "Limited Bay Area delivery. Request only.",
    lineId: "orange-labs",
    requestOnly: true,
  },
  {
    id: "sparkling-orange-water",
    name: "Sparkling Orange Water",
    price: 3.99,
    desc: "Light sparkle with orange notes. (Prototype SKU)",
    lineId: "orange-labs",
  },

  // ---- BOOKS ----
  {
    id: "backseat-university-book",
    name: "Backseat University (Book)",
    price: 19.99,
    desc: "Stories, lessons, and real Bay Area life.",
    lineId: "books",
  },
  {
    id: "backseat-university-audiobook",
    name: "Backseat University (Audiobook)",
    price: 14.99,
    desc: "Audio version (coming soon).",
    lineId: "books",
  },

  // ---- KOLEAF ORGANICS ----
  {
    id: "koleaf-face-serum",
    name: "Koleaf Face Serum",
    price: 24.99,
    desc: "Herbal skincare — small batch.",
    lineId: "koleaf-organics",
    requestOnly: true,
  },
  {
    id: "koleaf-body-oil",
    name: "Koleaf Body Oil",
    price: 18.99,
    desc: "Smooth, light, daily use oil.",
    lineId: "koleaf-organics",
    requestOnly: true,
  },

  // ---- MERCHANDISE ----
  {
    id: "bayshasta-cap",
    name: "BayShasta Cap",
    price: 19.99,
    desc: "Classic cap with BayShasta vibe.",
    lineId: "merchandise",
  },
  {
    id: "bayshasta-tshirt",
    name: "BayShasta T-Shirt",
    price: 24.99,
    desc: "Soft tee with logo + Bay Area energy.",
    lineId: "merchandise",
  },
];
