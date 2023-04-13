let cart;

if (localStorage.getItem("cart")) {
    cart = new Map(Object.entries(JSON.parse(localStorage.getItem("cart"))));
    updateCartBadge();
} else {
    cart = new Map();
}


// method that generates the item cards
function generateItemCards(category) {
    const shopCategory = document.getElementsByClassName("shop-category")[0];
    shopCategory.innerHTML = category.name;

    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    category.products.forEach(product => {
        let item;
        if (cart.has(product.name)) {
        item = `<div class="item-card">
        <div class="image-container" >
            <img src="${product.image}" alt="${product.name}">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span class="badge has-badge">${cart.get(product.name)}</span>

        </div>
        <div class="item-info">
            <h3>${product.name}</h3>
        </div>
    </div>`;} else {
        item = `<div class="item-card">
        <div class="image-container" >
            <img src="${product.image}" alt="${product.name}">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span class="badge">0</span>

        </div>
        <div class="item-info">
            <h3>${product.name}</h3>
        </div>
    </div>`;

    }
        productContainer.innerHTML += item;
        });

    // category.products 

    

    const itemCards = document.querySelectorAll('.image-container');
    itemCards.forEach(itemCard => {
        itemCard.addEventListener('click', (e) => {
            const productName = e.target.parentElement.parentElement.querySelectorAll('h3')[0].innerText;
            addToCart(productName);
            updateCartBadge();
            const badge = e.target.parentElement.querySelector('.badge');
            badge.innerText = cart.get(productName);
            badge.classList.add('has-badge');
        });
    }
    );

}

function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    cartBadge.innerText = getTotalQuantity();
    if (getTotalQuantity() === 0) {
        cartBadge.classList.remove('has-badge');
    }
    else {
        cartBadge.classList.add('has-badge');
    }
}

function updateCart() {

}

function addToCart(productName) {
    if (cart.has(productName)) {
        cart.set(productName, cart.get(productName) + 1);
    } else {
        cart.set(productName, 1);
    }
    updateCart();

}

function getTotalQuantity () {
    let totalQuantity = 0;
    cart.forEach((value, key) => {
        totalQuantity += value;
    });
    return totalQuantity;
}

// link event listener + generateItemCards initial call

const categoryLinks = document.querySelectorAll('.sidebar-links a');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = e.target.innerText;
        const category = data.categories.find(category => category.name === categoryName);
        generateItemCards(category);
    });
});
generateItemCards(data.categories[0]);
document.getElementById("cart-icon").onclick = function () {
    localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cart)));
    location.href = "cart.html";

};