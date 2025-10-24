document.addEventListener("DOMContentLoaded", function () {


    const addProductBtn = document.getElementById("addProductBtn");
    const addProductSection = document.getElementById("form-section");

    addProductBtn.addEventListener("click", function () {
        addProductSection.classList.toggle("hidden");

        if (addProductSection.classList.contains("hidden")) {
            addProductBtn.textContent = "Thêm sản phẩm";
        } else {
            addProductBtn.textContent = "Đóng";
        }
    });


    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

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

    // Gắn sự kiện "click" cho nút tìm kiếm
    searchBtn.addEventListener("click", filterProducts);

    // Thêm: Lọc ngay khi người dùng gõ phím (sự kiện 'keyup') để trải nghiệm tốt hơn
    searchInput.addEventListener("keyup", filterProducts);

});