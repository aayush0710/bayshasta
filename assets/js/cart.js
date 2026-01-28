// assets/js/cart.js
(() => {
  const CART_KEY = "bayshasta_cart";

  function load() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function save(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function count(cart) {
    return cart.reduce((sum, x) => sum + (x.qty || 1), 0);
  }
  function updateBadge() {
    const el = document.getElementById("cartCount");
    if (!el) return;
    el.textContent = count(load());
  }
  function add(productId, qty = 1) {
    const cart = load();
    const found = cart.find(x => x.id === productId);
    if (found) found.qty += qty;
    else cart.push({ id: productId, qty });
    save(cart);
    updateBadge();
  }
  function setQty(productId, qty) {
    const cart = load();
    const found = cart.find(x => x.id === productId);
    if (!found) return;
    found.qty = Math.max(0, qty);
    const cleaned = cart.filter(x => x.qty > 0);
    save(cleaned);
    updateBadge();
  }
  function clear() { save([]); updateBadge(); }
  function get() { return load(); }

  window.Cart = { add, setQty, clear, get, updateBadge };

  window.addEventListener("DOMContentLoaded", updateBadge);
})();

