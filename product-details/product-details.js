    // ─────────────────────────────────────────────────────
    //  DATA: Product configuration
    // ─────────────────────────────────────────────────────
    const product = {
      title: "2020 Apple MacBook Pro with Apple M1 Chip – Space Gray",
      rating: 4.7,
      reviewCount: 21671,
      basePrice: 1699,
      wasPrice: 1999,
 
      // Gallery images (use Apple CDN + placeholder extras)
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673205",
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MBP14-spacegray-open-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MBP14-spacegray-side-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MBP14-spacegray-back-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202",
      ],
 
      // Color options with hex swatches
      colors: [
        { label: "Space Gray", hex: "#6b7280" },
        { label: "Silver",     hex: "#d1d5db" },
      ],
 
      // Screen size options
      sizes: ["13-inch Retina", "14-inch Liquid Retina XDR", "16-inch Liquid Retina XDR"],
 
      // Memory options
      memory: ["8GB Unified", "16GB Unified", "32GB Unified"],
 
      // Storage + price delta
      storage: [
        { label: "256GB SSD",  delta: 0   },
        { label: "512GB SSD",  delta: 200 },
        { label: "1TB SSD",    delta: 400 },
        { label: "2TB SSD",    delta: 600 },
      ],
    };
 
    // ─────────────────────────────────────────────────────
    //  STATE
    // ─────────────────────────────────────────────────────
    let state = {
      selectedColor:   0,
      selectedSize:    1,   // default: 14-inch
      selectedMemory:  0,
      selectedStorage: 0,
      quantity: 1,
      cartCount: 0,
      inWishlist: false,
    };
 
    // ─────────────────────────────────────────────────────
    //  UTILITY: Show toast notification
    // ─────────────────────────────────────────────────────
    function showToast(icon, msg) {
      const wrap = document.getElementById("toastWrap");
      const el   = document.createElement("div");
      el.className = "toast-msg";
      el.innerHTML = `<i class="bi ${icon}"></i> ${msg}`;
      wrap.appendChild(el);
      // Auto-remove after 2.5 s
      setTimeout(() => el.remove(), 2500);
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Star rating display
    // ─────────────────────────────────────────────────────
    function renderStars(rating) {
      const full  = Math.floor(rating);
      const half  = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      let html = "";
      for (let i = 0; i < full;  i++) html += `<i class="bi bi-star-fill"></i>`;
      if (half)                        html += `<i class="bi bi-star-half"></i>`;
      for (let i = 0; i < empty; i++) html += `<i class="bi bi-star"></i>`;
      document.getElementById("starDisplay").innerHTML = html;
      document.getElementById("ratingCount").textContent =
        `${rating} Star Rating (${product.reviewCount.toLocaleString()} User feedback)`;
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Price (base + storage delta)
    // ─────────────────────────────────────────────────────
    function renderPrice() {
      const delta    = product.storage[state.selectedStorage].delta;
      const now      = product.basePrice + delta;
      const was      = product.wasPrice  + delta;
      const pct      = Math.round((1 - now / was) * 100);
      document.getElementById("priceNow").textContent     = `$${now.toLocaleString()}`;
      document.getElementById("priceWas").textContent     = `$${was.toLocaleString()}`;
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Gallery thumbnails
    // ─────────────────────────────────────────────────────
    function renderThumbs() {
      const strip = document.getElementById("thumbStrip");
      product.images.forEach((src, i) => {
        const div       = document.createElement("div");
        div.className   = `thumb${i === 0 ? " active" : ""}`;
        div.innerHTML   = `<img src="${src}" alt="thumb ${i+1}" loading="lazy"/>`;
        div.addEventListener("click", () => switchImage(i));
      });
    }
 
    // ─────────────────────────────────────────────────────
    //  ACTION: Switch main image
    // ─────────────────────────────────────────────────────
    function switchImage(idx) {
      document.getElementById("mainImg").src = product.images[idx];
      // Update active thumb
      document.querySelectorAll(".thumb").forEach((t, i) =>
        t.classList.toggle("active", i === idx)
      );
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Color swatches
    // ─────────────────────────────────────────────────────
    function renderColors() {
      const container = document.getElementById("colorSwatches");
      container.innerHTML = "";
      product.colors.forEach((c, i) => {
        const btn       = document.createElement("button");
        btn.className   = `color-swatch${i === state.selectedColor ? " active" : ""}`;
        btn.title       = c.label;
        btn.style.background = c.hex;
        btn.addEventListener("click", () => {
          state.selectedColor = i;
          document.getElementById("selectedColor").textContent = c.label;
          renderColors();
        });
        container.appendChild(btn);
      });
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Generic chip group (size / memory / storage)
    // ─────────────────────────────────────────────────────
    function renderChips(containerId, items, stateKey, labelFn, onChange) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";
      items.forEach((item, i) => {
        const btn       = document.createElement("button");
        btn.className   = `option-chip${i === state[stateKey] ? " active" : ""}`;
        btn.textContent = labelFn(item);
        btn.addEventListener("click", () => {
          state[stateKey] = i;
          if (onChange) onChange(i);
          renderChips(containerId, items, stateKey, labelFn, onChange);
        });
        container.appendChild(btn);
      });
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Quantity stepper
    // ─────────────────────────────────────────────────────
    function renderQty() {
      document.getElementById("qtyDisplay").value = state.quantity;
    }
 
    // ─────────────────────────────────────────────────────
    //  RENDER: Cart badge in navbar
    // ─────────────────────────────────────────────────────
    function renderCartBadge() {
      const badge = document.getElementById("navCartBadge");
    }
 
    // ─────────────────────────────────────────────────────
    //  INIT: Wire up all interactive elements
    // ─────────────────────────────────────────────────────
    function init() {
      // Static renders
      renderStars(product.rating);
      renderPrice();
      renderThumbs();
      renderColors();
 
      // Size chips
      renderChips("sizeChips", product.sizes, "selectedSize",
        (s) => s, null);
 
      // Memory chips
      renderChips("memoryChips", product.memory, "selectedMemory",
        (m) => m, null);
 
      // Storage chips (re-render price on change)
      renderChips("storageChips", product.storage, "selectedStorage",
        (s) => s.label, () => {
          renderPrice();
          renderChips("storageChips", product.storage, "selectedStorage",
            (s) => s.label, null);
        });
 
      renderQty();
      renderCartBadge();
 
      // ── Quantity buttons ──────────────────────────────
      document.getElementById("qtyMinus").addEventListener("click", () => {
        if (state.quantity > 1) { state.quantity--; renderQty(); }
      });
      document.getElementById("qtyPlus").addEventListener("click", () => {
        if (state.quantity < 99) { state.quantity++; renderQty(); }
      });
 
      // ── Add to Cart ───────────────────────────────────
      document.getElementById("addToCartBtn").addEventListener("click", () => {
        state.cartCount += state.quantity;
        renderCartBadge();
        showToast("bi-bag-check-fill", `${state.quantity} item(s) added to cart!`);
      });
 
      // ── Buy Now ───────────────────────────────────────
      document.getElementById("buyNowBtn").addEventListener("click", () => {
        showToast("bi-lightning-fill", "Redirecting to checkout…");
      });
 
      // ── Wishlist toggle ───────────────────────────────
      document.getElementById("wishlistBtn").addEventListener("click", () => {
        state.inWishlist = !state.inWishlist;
        const btn = document.getElementById("wishlistBtn");
        btn.classList.toggle("active", state.inWishlist);
        btn.innerHTML = state.inWishlist
          ? `<i class="bi bi-heart-fill"></i> In Wishlist`
          : `<i class="bi bi-heart"></i> Add to Wishlist`;
        showToast(
          state.inWishlist ? "bi-heart-fill" : "bi-heart",
          state.inWishlist ? "Added to wishlist!" : "Removed from wishlist"
        );
      });
 
      // ── Compare ───────────────────────────────────────
      document.getElementById("compareBtn").addEventListener("click", () => {
        showToast("bi-arrow-left-right", "Product added to compare list.");
      });
 
      // ── Share buttons (copy link) ─────────────────────
      document.querySelectorAll(".share-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          navigator.clipboard?.writeText(window.location.href);
          showToast("bi-clipboard-check", "Link copied to clipboard!");
        });
      });
 
      // ── Hide cart badge initially ─────────────────────
      renderCartBadge();
    }
 
    // Boot
    document.addEventListener("DOMContentLoaded", init);