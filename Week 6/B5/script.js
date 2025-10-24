document.addEventListener("DOMContentLoaded", function () {

    const addProductBtn = document.getElementById("addProductBtn");
    const addProductSection = document.getElementById("form-section");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
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
            price: priceValue + " VNĐ"
        };

        products.push(newProduct);
        saveProducts();

        const newElement = createProductElement(newProduct);
        productList.appendChild(newElement);

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

    loadProducts();

});