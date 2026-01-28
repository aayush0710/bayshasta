// assets/js/cart-page.js
const CART_KEY = "cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); }
  catch { return {}; }
}

function money(n) {
  return "$" + (Number(n) || 0).toFixed(2);
}

function renderCart() {
  const cart = getCart();

  // IMPORTANT: PRODUCTS must exist (loaded from products.js)
  if (typeof PRODUCTS === "undefined") {
    console.error("PRODUCTS is not defined. cart.html must load assets/js/products.js first.");
    return;
  }

  const listEl = document.getElementById("cartItems");   // we’ll use this container
  const totalEl = document.getElementById("cartTotal");  // total text
  if (!listEl || !totalEl) return;

  const items = PRODUCTS.items || [];
  listEl.innerHTML = "";

  let total = 0;
  const entries = Object.entries(cart); // [ [productId, qty], ... ]

  if (entries.length === 0) {
    listEl.innerHTML = `<p class="muted">No products added yet.</p>`;
    totalEl.textContent = money(0);
    return;
  }

  for (const [id, qtyRaw] of entries) {
    const qty = Number(qtyRaw) || 0;
    const product = items.find(p => p.id === id);

    // If ID not found in PRODUCTS, show debug row (this is the "ID mismatch" case)
    if (!product) {
      const row = document.createElement("div");
      row.className = "card";
      row.innerHTML = `<strong>Unknown item:</strong> ${id} (qty: ${qty})`;
      listEl.appendChild(row);
      continue;
    }

    const line = product.price * qty;
    total += line;

    const row = document.createElement("div");
    row.className = "card";
    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:12px; align-items:center;">
        <div>
          <div style="font-weight:800;">${product.name}</div>
          <div class="muted">${money(product.price)} × ${qty}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button class="btn" data-dec="${id}">−</button>
          <span style="min-width:24px; text-align:center;">${qty}</span>
          <button class="btn" data-inc="${id}">+</button>
        </div>
      </div>
      <div class="muted" style="margin-top:8px;">Line total: <strong>${money(line)}</strong></div>
    `;
    listEl.appendChild(row);
  }

  totalEl.textContent = money(total);

  // buttons
  listEl.querySelectorAll("[data-inc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-inc");
      const c = getCart();
      c[id] = (c[id] || 0) + 1;
      localStorage.setItem(CART_KEY, JSON.stringify(c));
      renderCart();
    });
  });

  listEl.querySelectorAll("[data-dec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-dec");
      const c = getCart();
      c[id] = (c[id] || 0) - 1;
      if (c[id] <= 0) delete c[id];
      localStorage.setItem(CART_KEY, JSON.stringify(c));
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCart);
