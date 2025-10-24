document.addEventListener("DOMContentLoaded", function () {

    const addProductBtn = document.getElementById("addProductBtn");
    const addProductSection = document.getElementById("form-section");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const priceFilter = document.getElementById("priceFilter");
    const addProductForm = document.getElementById("addProductForm");
    const cancelBtn = document.getElementById("cancelBtn");
    const productList = document.getElementById("product-list");
    const errorMsg = document.getElementById("errorMsg");

    let products = [];

    const initialProducts = [
        {
            img: "./Img/robusta.png",
            name: "Cà phê Robusta rang mộc",
            desc: "Hương vị đậm đà, mạnh mẽ, phù hợp cho người thích cà phê truyền thống.",
            price: "120.000 VNĐ / 500g"
        },
        {
            img: "./Img/arabica.png",
            name: "Cà phê Arabica Cầu Đất",
            desc: "Hương thơm nồng nàn, vị chua thanh nhẹ nhàng và hậu vị ngọt.",
            price: "180.000 VNĐ / 500g"
        },
        {
            img: "./Img/phin.png",
            name: "Cà phê Phin Blend",
            desc: "Sự kết hợp hoàn hảo giữa Robusta và Arabica, tối ưu cho pha phin.",
            price: "150.000 VNĐ / 500g"
        }
    ];

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function createProductElement(product) {
        const newItem = document.createElement("article");
        newItem.className = "product-item";

        newItem.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3 class="product-name">${product.name}</h3>
      <p>${product.desc}</p>
      <p>Giá: ${product.price}</p>
    `;
        return newItem;
    }

    function loadProducts() {
        const storedProductsData = localStorage.getItem('products');
        let parsedProducts = null;

        if (storedProductsData) {
            try {
                parsedProducts = JSON.parse(storedProductsData);
            } catch (e) {
                console.error("Lỗi parse JSON từ LocalStorage:", e);
                parsedProducts = null;
            }
        }

        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            products = parsedProducts;
        } else {
            products = initialProducts;
            saveProducts();
        }

        const productListTitle = productList.querySelector('h2');
        productList.innerHTML = '';
        if (productListTitle) {
            productList.appendChild(productListTitle);
        }

        products.forEach(function (product) {
            const productElement = createProductElement(product);
            productList.appendChild(productElement);
        });
    }

    function hideForm() {
        addProductSection.style.maxHeight = "0";
        addProductSection.classList.add("hidden");
        addProductBtn.textContent = "Thêm sản phẩm";
    }

    addProductBtn.addEventListener("click", function () {
        if (addProductSection.classList.contains("hidden")) {
            addProductSection.classList.remove("hidden");
            addProductSection.style.maxHeight = addProductSection.scrollHeight + "px";
            addProductBtn.textContent = "Đóng";
        } else {
            hideForm();
        }
    });

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const priceValue = priceFilter.value;

        let minPrice = 0;
        let maxPrice = Infinity;

        if (priceValue !== "all") {
            [minPrice, maxPrice] = priceValue.split('-').map(Number);
        }

        const productItems = document.querySelectorAll(".product-item");

        productItems.forEach(function (item) {
            const productNameElement = item.querySelector(".product-name");
            const priceElement = item.querySelector("p:last-child");
            let productPrice = 0;

            if (priceElement) {
                const priceText = priceElement.textContent;
                productPrice = parseFloat(priceText.replace('Giá: ', '').replace(/\./g, ''));
            }

            const productName = productNameElement ? productNameElement.textContent.toLowerCase() : "";

            const nameMatch = productName.includes(searchTerm);
            const priceMatch = (productPrice >= minPrice && productPrice <= maxPrice);

            if (nameMatch && priceMatch) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    }

    searchBtn.addEventListener("click", filterProducts);
    searchInput.addEventListener("keyup", filterProducts);
    priceFilter.addEventListener("change", filterProducts);

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("newName").value.trim();
        const priceInput = document.getElementById("newPrice").value.trim();
        const desc = document.getElementById("newDesc").value.trim();
        const priceValue = parseFloat(priceInput);

        if (name === "" || isNaN(priceValue) || priceValue <= 0) {
            errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ (giá phải lớn hơn 0).";
            return;
        }

        errorMsg.textContent = "";

        const newProduct = {
            img: "./Img/default.png",
            name: name,
            desc: desc,
            price: priceValue.toLocaleString('vi-VN') + " VNĐ"
        };

        products.push(newProduct);
        saveProducts();

        const newElement = createProductElement(newProduct);
        productList.appendChild(newElement);

        addProductForm.reset();
        hideForm();
    });

    cancelBtn.addEventListener("click", function () {
        hideForm();
        errorMsg.textContent = "";
        addProductForm.reset();
    });

    loadProducts();

    addProductSection.classList.add("hidden");
    addProductSection.style.maxHeight = "0";

});