console.log("✅ checkout.js loaded");

function readCart() {
  try { return JSON.parse(localStorage.getItem("cart_v1") || "{}"); }
  catch { return {}; }
}

function calcCheckoutTotal() {
  const cart = readCart();

  if (!window.PRODUCTS || !Array.isArray(PRODUCTS.items)) return 0;

  let total = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const item = PRODUCTS.items.find(p => p.id === id);
    if (!item) continue;
    total += (Number(item.price) || 0) * (Number(qty) || 0);
  }
  return total;
}

function renderCheckoutSummary() {
  const totalEl = document.getElementById("checkoutTotal");
  if (!totalEl) return;
  totalEl.textContent = calcCheckoutTotal().toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
});

