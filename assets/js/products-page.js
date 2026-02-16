// assets/js/products-page.js
document.addEventListener("DOMContentLoaded", () => {
  const categoryGrid = document.getElementById("categoryGrid");
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("categoryTitle");

  if (!categoryGrid || !productGrid || !categoryTitle) {
    console.error("Missing #categoryGrid / #productGrid / #categoryTitle in products.html");
    return;
  }

  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const categories = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];

  if (!categories.length) {
    categoryTitle.textContent = "No categories found";
    productGrid.innerHTML = `<p class="muted">CATEGORIES is empty or products.js didn’t load.</p>`;
    return;
  }

  // Render top tabs (product lines)
  categoryGrid.innerHTML = categories
    .map((c, idx) => `
      <button class="card tab ${idx === 0 ? "active" : ""}" data-line="${c.id}">
        <h3>${c.name}</h3>
      </button>
    `)
    .join("");

  function renderProductsForLine(lineId) {
    const line = categories.find(c => c.id === lineId) || categories[0];
    categoryTitle.textContent = line.name;

    const list = products.filter(p => (p.lineId || "orange-labs") === line.id);

    if (!list.length) {
      productGrid.innerHTML = `<p class="muted">No products in ${line.name} yet.</p>`;
      return;
    }

    productGrid.innerHTML = list
      .map((p) => `
        <div class="card">
          <h3>${p.name}</h3>
          <p class="muted">${p.desc || ""}</p>

          <div class="card-row">
            <div class="price">${p.requestOnly ? "Request" : "$" + Number(p.price).toFixed(2)}</div>
            ${
              p.requestOnly
                ? `<button class="btn request-btn" data-go="contact.html">Request</button>`
                : `<button class="btn add-to-cart" data-id="${p.id}">Add to cart</button>`
            }
          </div>
        </div>
      `)
      .join("");
  }

  // Click product line tabs
  categoryGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-line]");
    if (!btn) return;

    // tab active UI
    categoryGrid.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");

    renderProductsForLine(btn.dataset.line);
  });

  // Add-to-cart + Request buttons (event delegation)
  productGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart");
    if (addBtn) {
      const id = addBtn.dataset.id;
      if (!id) return;

      if (window.Cart && typeof window.Cart.addToCart === "function") {
        window.Cart.addToCart(id, 1);
      } else if (typeof window.addToCart === "function") {
        window.addToCart(id, 1);
      } else {
        console.error("Cart add function not found. cart.js not loaded?");
        return;
      }

      addBtn.textContent = "Added ✓";
      setTimeout(() => (addBtn.textContent = "Add to cart"), 700);
      return;
    }

    const reqBtn = e.target.closest(".request-btn");
    if (reqBtn) {
      const go = reqBtn.dataset.go || "contact.html";
      window.location.href = go;
    }
  });

  // Default render first line
  renderProductsForLine(categories[0].id);
});