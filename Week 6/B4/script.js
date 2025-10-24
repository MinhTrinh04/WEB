document.addEventListener("DOMContentLoaded", function () {

    const addProductBtn = document.getElementById("addProductBtn");
    const addProductSection = document.getElementById("form-section");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    const addProductForm = document.getElementById("addProductForm");
    const cancelBtn = document.getElementById("cancelBtn");
    const productList = document.getElementById("product-list");
    const errorMsg = document.getElementById("errorMsg");

    addProductBtn.addEventListener("click", function () {
        addProductSection.classList.toggle("hidden");
        if (addProductSection.classList.contains("hidden")) {
            addProductBtn.textContent = "Thêm sản phẩm";
        } else {
            addProductBtn.textContent = "Đóng";
        }
    });

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productItems = document.querySelectorAll(".product-item");

        productItems.forEach(function (item) {
            const productNameElement = item.querySelector(".product-name");
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            }
        });
    }
    searchBtn.addEventListener("click", filterProducts);
    searchInput.addEventListener("keyup", filterProducts);

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("newName").value.trim();
        const price = document.getElementById("newPrice").value.trim();
        const desc = document.getElementById("newDesc").value.trim();

        const priceValue = parseFloat(price);

        if (name === "" || isNaN(priceValue) || priceValue <= 0) {
            errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ (giá phải lớn hơn 0).";
            return;
        }

        errorMsg.textContent = "";

        const newItem = document.createElement("article");
        newItem.className = "product-item";

        newItem.innerHTML = `
      <h3 class="product-name">${name}</h3>
      <p>${desc}</p>
      <p>Giá: ${priceValue} VNĐ</p>
    `;

        productList.appendChild(newItem);

        addProductForm.reset();

        addProductSection.classList.add("hidden");
        addProductBtn.textContent = "Thêm sản phẩm";
    });

    cancelBtn.addEventListener("click", function () {
        addProductSection.classList.add("hidden");
        addProductBtn.textContent = "Thêm sản phẩm";
        errorMsg.textContent = "";
        addProductForm.reset();
    });

});