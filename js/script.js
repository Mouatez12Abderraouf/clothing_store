
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); // تحويل الـ id إلى رقم
    console.log("Product ID from URL:", productId); // تصحيح: عرض الـ id

    if (isNaN(productId)) {
        document.getElementById('product-details').innerHTML = '<p>معرف المنتج غير صالح</p>';
        return;
    }

    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            console.log("Products loaded:", products); // تصحيح: عرض بيانات المنتجات
            const product = products.find(p => p.id === productId); // استخدام === للمقارنة
            if (product) {
                displayProductDetails(product);
            } else {
                document.getElementById('product-details').innerHTML = '<p>المنتج غير موجود</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            document.getElementById('product-details').innerHTML = '<p>حدث خطأ أثناء تحميل بيانات المنتج</p>';
        });
});

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    if (productDetails) {
        productDetails.innerHTML = `
            <section id="productDetails" class="section-p1">
            <div class="single-pro-image">
                <img src="${product.img}" id="mainImg" alt="">

            </div>
            <div class="single-pro-details">
                <h5>${product.name}</h5> <!-- name product -->
                <h4>${product.catetory}</h4> <!--  description -->
                <h2>$${product.price}</h2>

                <select>
                    
                    <option value="Select Size">Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>

                </select>

                <input type="number" name="quantity" id="quantity" value="1" min="1" max="10">

                <button class="normal" type="submit">add to cart</button>

                <h4>مواصفات المنتج</h4>

                <span>
                ${product.description}
                </span>
            </div>
        </section>
        `;
    } else {
        console.error("Element with id 'product-details' not found.");
    }
}