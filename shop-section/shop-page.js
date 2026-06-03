// جلب العناصر
let products = document.querySelectorAll(".product");
let searchInput = document.getElementById("searchInput");
let filterSelect = document.getElementById("filterSelect");
let container = document.getElementById("productsContainer");

// تخزين النص المدخل
let searchValue = "";

// ================= البحث =================
searchInput.addEventListener("input", function () {

    // تحويل النص إلى lowercase
    searchValue = this.value.toLowerCase();

    applyFilters();

});

// ================= الفلترة =================
filterSelect.addEventListener("change", function () {

    applyFilters();

});

// ================= الدالة الرئيسية =================
function applyFilters() {

    let filterValue = filterSelect.value;

    // تحويل NodeList إلى Array
    let productsArray = Array.from(products);

    // ===== فلترة البحث =====
    productsArray.forEach(product => {

        let text = product.textContent.toLowerCase();

        // إذا النص لا يحتوي على البحث يتم إخفاؤه
        if (!text.includes(searchValue)) {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }

    });

    // ===== ترتيب حسب السعر =====
    if (filterValue === "low") {

        productsArray.sort((a, b) => {
            return a.dataset.price - b.dataset.price;
        });

    }

    if (filterValue === "high") {

        productsArray.sort((a, b) => {
            return b.dataset.price - a.dataset.price;
        });

    }

    // إعادة ترتيب داخل الصفحة
    productsArray.forEach(product => {
        container.appendChild(product);
    });

}