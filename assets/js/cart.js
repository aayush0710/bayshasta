// assets/js/cart.js
const CART_KEY = "cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function setCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(getCartCount());
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const found = cart.find((i) => i.id === productId);

  if (found) found.quantity = (Number(found.quantity) || 0) + qty;
  else cart.push({ id: productId, quantity: qty });

  saveCart(cart);
  setCartCount();
}

// auto update on every page load
document.addEventListener("DOMContentLoaded", setCartCount);

// expose (new + backward compatible)
window.Cart = { getCart, saveCart, addToCart, setCartCount, getCartCount };
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.setCartCount = setCartCount;