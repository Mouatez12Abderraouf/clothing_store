fetch('products.json')
.then(response => response.json())
.then(data => {
 
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const swiper_items_sale = document.getElementById("swiper_items_sale")

    data.forEach(product => {

            const isInCart = cart.some(cartItem => cartItem.id === product.id)
            
            swiper_items_sale.innerHTML += `


             <div class="swiper-slide product">
                <div class="product-box" >
                    <a href="product.html?id=${product.id}">
                        <img src="${product.img}" alt="Product Image">
                        <div class="product-name">${product.name}</div>
                        <div class="category">${product.catetory}</div>
                        <div class="price">
                            <span style="color: orange; font-size: 18px; font-weight: bold;">$${product.price}</span>
                        </div>
                    </a>   
                    <div class="icons">
                        <button class="btn_add_cart ${isInCart ? 'active' : '' }" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i>  ${isInCart ? 'item in cart' : 'add to cart'}
                        </button>
                    </div>
                </div>
            </div>
            
            
            
            
            `;
            
            
        
        });
    })
    .catch(error => console.error('Error fetching products:', error));
