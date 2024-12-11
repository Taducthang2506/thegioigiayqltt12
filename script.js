document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close');
    const checkoutForm = document.getElementById('checkout-form');

    // Thêm sản phẩm vào giỏ hàng
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);

            // Thêm sản phẩm vào giỏ hàng
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length > 0) {
            cart.forEach((item, index) => {
                total += item.price;

                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <p>${item.name} - ${(item.price)}</p>
                    <button class="remove-item" data-index="${index}">XÓA</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            cartTotal.textContent = (total);
            checkoutBtn.style.display = 'block';
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotal.textContent = (0);
            checkoutBtn.style.display = 'none';
        }

        // Gắn sự kiện xóa cho từng nút xóa
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1); // Xóa sản phẩm khỏi mảng giỏ hàng
                updateCart();
            });
        });
    }

    // Hàm định dạng giá trị thành tiền tệ (VNĐ)
    function formatCurrency(value) {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    // Hiển thị modal khi bấm nút Checkout
    checkoutBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Đóng modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Xử lý form checkout
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`);

        // Xóa giỏ hàng và đóng modal
        cart.length = 0;
        updateCart();
        checkoutForm.reset();
        modal.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeProductDetailModal = productDetailModal.querySelector('.close');
    const productDetailName = document.getElementById('product-detail-name');
    const productDetailImage = document.getElementById('product-detail-image');
    const productDetailPrice = document.getElementById('product-detail-price');
    const productDetailDescription = document.getElementById('product-detail-description');

    // Mô tả sản phẩm bằng tiếng Việt
    const productDescriptions = {
        "Adidas Samba OG": "Giày bóng đá cổ điển, phù hợp cho các hoạt động hàng ngày.",
        "Adidas Ultraboost 1.0": "Đôi giày chạy bộ thoải mái, hỗ trợ tốt cho mọi cự ly.",
        "Adidas StanSmith": "Một biểu tượng thời trang cổ điển với thiết kế tối giản.",
        "Adidas Super Star": "Giày thể thao nổi tiếng với phần mũi vỏ sò đặc trưng.",
        "Dép Adidas 1": "Dép nhẹ nhàng, êm ái, phù hợp cho các hoạt động hằng ngày.",
        "Adidas Kantana": "Giày hiệu suất cao với thiết kế hiện đại và đệm êm.",
        "Adidas Advantage": "Một lựa chọn thời trang với sự thoải mái vượt trội.",
        "Nike TATUM": "Đôi giày bóng rổ với hiệu suất tuyệt vời và thiết kế bắt mắt.",
        "Nike Dunk": "Sự pha trộn giữa phong cách cổ điển và hiện đại, phù hợp cho mọi dịp.",
        "Nike Lebron": "Giày bóng rổ với hỗ trợ và độ bền tối ưu.",
        "Nike KD15 HUC": "Giày bóng rổ cao cấp với thiết kế đẳng cấp.",
        "New Balance 550": "Một thiết kế cổ điển, phù hợp với mọi phong cách.",
        "Nike Air Max 1": "Giày thể thao biểu tượng với đệm Air Max đặc trưng.",
        "Onitsuka Tiger": "Thiết kế tinh tế từ thương hiệu Nhật Bản nổi tiếng."
    };

    // Thêm sự kiện click vào từng sản phẩm (ngoại trừ nút "Add to Cart")
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            // Nếu bấm vào nút "Add to Cart", không hiển thị modal
            if (e.target.classList.contains('add-to-cart')) {
                return;
            }

            const productName = product.dataset.name;
            const productPrice = parseFloat(product.dataset.price).toFixed(2);
            const productImage = product.querySelector('img').src;

            // Cập nhật nội dung trong modal
            productDetailName.textContent = productName;
            productDetailImage.src = productImage;
            productDetailPrice.textContent = `Giá: $${productPrice}`;
            productDetailDescription.textContent = productDescriptions[productName] || "Hiện chưa có mô tả.";

            // Hiển thị modal
            productDetailModal.style.display = 'flex';
        });
    });

    // Xử lý sự kiện khi bấm nút "Add to Cart"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn không cho sự kiện "click" sản phẩm được kích hoạt
            const product = button.closest('.product');
            const productName = product.dataset.name;
            const productPrice = parseFloat(product.dataset.price).toFixed(2);

            // Thêm sản phẩm vào giỏ hàng
            cart.push({ name: productName, price: productPrice });

            // Hiển thị thông báo (tùy chọn)
           
        });
    });

    // Đóng modal
    closeProductDetailModal.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
    });
});