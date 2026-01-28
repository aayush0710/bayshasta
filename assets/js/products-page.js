// assets/js/products-page.js
window.addEventListener("DOMContentLoaded", () => {
  const categoryGrid = document.getElementById("categoryGrid");
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("categoryTitle");

  if (!categoryGrid || !productGrid) return;

  const products = window.PRODUCTS || [];
  const categories = [...new Set(products.map(p => p.category))];

  function renderCategories() {
    categoryGrid.innerHTML = "";
    categories.forEach((cat, i) => {
      const btn = document.createElement("button");
      btn.className = "category-card";
      btn.textContent = cat;
      btn.addEventListener("click", () => selectCategory(cat));
      categoryGrid.appendChild(btn);

      if (i === 0) selectCategory(cat); // default first
    });
  }

  function selectCategory(cat) {
    if (categoryTitle) categoryTitle.textContent = cat;
    renderProducts(cat);
  }

  function renderProducts(cat) {
    const list = products.filter(p => p.category === cat);
    productGrid.innerHTML = "";

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="muted">${p.desc}</p>
        <div class="row">
          <strong>$${p.price.toFixed(2)}</strong>
          <button class="btn add-btn">Add to cart</button>
        </div>
      `;

      card.querySelector(".add-btn").addEventListener("click", () => {
        if (!window.Cart) {
          alert("Cart system not loaded (cart.js).");
          return;
        }
        window.Cart.add(p.id, 1);
      });

      productGrid.appendChild(card);
    });

    // update badge after render
    if (window.Cart) window.Cart.updateBadge();
  }

  renderCategories();
});
