// assets/js/cart-page.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");

  if (!cartItemsEl || !cartTotalEl) return;

  const products = window.PRODUCTS || [];

  function renderCart() {
    const cart = window.Cart.getCart();

    if (!cart.length) {
      cartItemsEl.innerHTML = `<p class="muted">Your cart is empty.</p>`;
      cartTotalEl.textContent = "$0.00";
      return;
    }

    let total = 0;

    cartItemsEl.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return "";

      const qty = Number(item.quantity) || 0;
      const price = product.requestOnly ? 0 : Number(product.price);
      const lineTotal = price * qty;
      total += lineTotal;

      return `
        <div class="cart-item card">
          <div class="cart-info">
            <h3>${product.name}</h3>
            <p class="muted">${product.desc || ""}</p>
          </div>

          <div class="cart-controls">
            ${
              product.requestOnly
                ? `<span class="muted">Request only</span>`
                : `
                  <button class="qty-btn" data-action="dec" data-id="${product.id}">−</button>
                  <span class="qty">${qty}</span>
                  <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
                `
            }
          </div>

          <div class="cart-price">
            ${
              product.requestOnly
                ? "—"
                : `$${lineTotal.toFixed(2)}`
            }
          </div>

          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
      `;
    }).join("");

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    window.Cart.setCartCount();
  }

  // Handle clicks
  cartItemsEl.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    const cart = window.Cart.getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (e.target.dataset.action === "inc") {
      item.quantity += 1;
    }

    if (e.target.dataset.action === "dec") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart.splice(cart.indexOf(item), 1);
      }
    }

    if (e.target.classList.contains("remove-btn")) {
      cart.splice(cart.indexOf(item), 1);
    }

    window.Cart.saveCart(cart);
    renderCart();
  });

  renderCart();
});
