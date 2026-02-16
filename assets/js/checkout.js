// assets/js/checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const itemsEl = document.getElementById("summaryItems");
  const totalsEl = document.getElementById("summaryTotals");
  const emptyEl = document.getElementById("emptyState");
  const form = document.getElementById("checkoutForm");

  // keep cart count in header consistent
  if (window.Cart && typeof window.Cart.setCartCount === "function") {
    window.Cart.setCartCount();
  }

  if (!itemsEl || !totalsEl || !emptyEl || !form) return;

  const products = window.PRODUCTS || [];

  // CHANGE THIS to your real receiving email:
  const BAYSHASTA_EMAIL = "bayshasta@gmail.com";

  function money(n) {
    return `$${Number(n || 0).toFixed(2)}`;
  }

  function findProduct(id) {
    return products.find(p => String(p.id) === String(id)) || null;
  }

  function getCartSafe() {
    if (window.Cart && typeof window.Cart.getCart === "function") {
      const c = window.Cart.getCart();
      return Array.isArray(c) ? c : [];
    }
    return [];
  }

  function calcTotals(cart) {
    let subtotal = 0;

    for (const item of cart) {
      const prod = findProduct(item.id);
      if (!prod) continue;

      const qty = Number(item.quantity) || 0;
      const price = prod.requestOnly ? 0 : Number(prod.price || 0);
      subtotal += price * qty;
    }

    const tax = 0;
    const delivery = 0;
    const total = subtotal + tax + delivery;

    return { subtotal, tax, delivery, total };
  }

  function renderSummary() {
    const cart = getCartSafe();
    itemsEl.innerHTML = "";

    if (!cart.length) {
      emptyEl.style.display = "block";
      totalsEl.style.display = "none";
      return;
    }

    let hasItems = false;

    for (const item of cart) {
      const prod = findProduct(item.id);
      if (!prod) continue;

      const qty = Number(item.quantity) || 0;
      if (qty <= 0) continue;

      hasItems = true;

      const price = prod.requestOnly ? 0 : Number(prod.price || 0);
      const lineTotal = price * qty;

      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML = `
        <div>
          <div class="item-name">${prod.name}</div>
          <div class="muted">
            ${prod.requestOnly ? "Request only" : `Qty: ${qty} • ${money(price)} each`}
          </div>
        </div>
        <div class="item-right">${prod.requestOnly ? "—" : money(lineTotal)}</div>
      `;
      itemsEl.appendChild(row);
    }

    if (!hasItems) {
      emptyEl.style.display = "block";
      totalsEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";

    const totals = calcTotals(cart);
    document.getElementById("subtotal").textContent = money(totals.subtotal);
    document.getElementById("tax").textContent = money(totals.tax);
    document.getElementById("delivery").textContent = money(totals.delivery);
    document.getElementById("total").textContent = money(totals.total);

    totalsEl.style.display = "block";
  }

  function makeOrderId() {
    const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
    const time = Date.now().toString(36).toUpperCase();
    return `BS-${time}-${rand}`;
  }

  function buildEmailBody(order) {
    const lines = [];
    lines.push(`NEW ORDER - BayShasta`);
    lines.push(`Order ID: ${order.orderId}`);
    lines.push(`Created: ${order.createdAt}`);
    lines.push("");
    lines.push("Customer:");
    lines.push(`Name: ${order.customer.fullName}`);
    lines.push(`Phone: ${order.customer.phone}`);
    lines.push(`Email: ${order.customer.email}`);
    lines.push(`Address: ${order.customer.address}, ${order.customer.city} ${order.customer.zip}`);
    lines.push(`Delivery window: ${order.customer.deliveryWindow}`);
    if (order.customer.notes) lines.push(`Notes: ${order.customer.notes}`);
    lines.push("");
    lines.push("Items:");

    for (const it of order.items) {
      const prod = findProduct(it.id);
      if (!prod) continue;

      const qty = Number(it.quantity) || 0;
      const price = prod.requestOnly ? 0 : Number(prod.price || 0);
      lines.push(`- ${prod.name} x${qty}${prod.requestOnly ? " (Request only)" : ` (@${money(price)})`}`);
    }

    lines.push("");
    lines.push(`Subtotal: ${money(order.totals.subtotal)}`);
    lines.push(`Tax: ${money(order.totals.tax)}`);
    lines.push(`Delivery: ${money(order.totals.delivery)}`);
    lines.push(`TOTAL: ${money(order.totals.total)}`);
    lines.push("");
    lines.push("Next step: BayShasta will confirm payment and email delivery date/time.");
    lines.push("Thanks for your business!");

    return lines.join("\n");
  }

  function openMailDraft(order) {
    const subject = encodeURIComponent(`New Order ${order.orderId} | BayShasta`);
    const body = encodeURIComponent(buildEmailBody(order));
    window.location.href = `mailto:${BAYSHASTA_EMAIL}?subject=${subject}&body=${body}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = getCartSafe();
    if (!cart.length) {
      alert("Cart is empty.");
      return;
    }

    const order = {
      orderId: makeOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        address: form.address.value.trim(),
        city: form.city.value.trim(),
        zip: form.zip.value.trim(),
        deliveryWindow: form.deliveryWindow.value,
        notes: form.notes.value.trim()
      },
      items: cart,
      totals: calcTotals(cart)
    };

    // store for you (optional)
    localStorage.setItem("bayshasta_last_order", JSON.stringify(order));

    alert(`Order ready ✅\nOrder ID: ${order.orderId}\nTotal: ${money(order.totals.total)}\n\nYour email app will open to send the order to BayShasta.`);
    openMailDraft(order);
  });

  renderSummary();
});
