console.log("✅ checkout.js loaded");
const CART_KEY = "cart_v1";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

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
function money(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const subtotal = window.Cart.total();

  const TAX_RATE = 0.0875;     // change anytime
  const DELIVERY_FEE = 4.99;   // change anytime
  const FREE_DELIVERY_OVER = 35;

  const tax = subtotal * TAX_RATE;
  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + tax + delivery;

  // You need these elements on checkout.html:
  // <span id="subtotal"></span>
  // <span id="tax"></span>
  // <span id="delivery"></span>
  // <strong id="grandTotal"></strong>

  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("tax").textContent = money(tax);
  document.getElementById("delivery").textContent = money(delivery);
  document.getElementById("grandTotal").textContent = money(grandTotal);
});

