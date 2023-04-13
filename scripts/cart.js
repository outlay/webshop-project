let cart;

if (localStorage.getItem("cart")) {
    cart = new Map(Object.entries(JSON.parse(localStorage.getItem("cart"))));
    updateCartBadge();
} else {
    cart = new Map();
}


function generateShopCards() {
    const shopContainer = document.getElementById('shop-container');
    shopContainer.innerHTML = '';

    cart.forEach((value, key) => {

        const shopCard = `<div class="item-card flex">
        <div class="item-info flex">
            <h3>${key}</h3>
            <div class="remove-btn flex">
                <i class="fas fa-trash"></i>
                <p class="remove-text">Remove</p>
            </div>
        </div>
        <div class="item-btn">
            <button class="btn btn-primary minus">-</button>

            <input class="itemCount" min="1" max="999" step="1" disabled value="${value}">

            <button class="btn btn-primary plus">+</button>


        </div>
    </div> `
        shopContainer.innerHTML += shopCard;
    });

    const shopCards = document.querySelectorAll('.shop-card');
    shopCards.forEach(shopCard => {
        shopCard.addEventListener('click', (e) => {
            const shopName = e.target.parentElement.querySelectorAll('h3')[0].innerText;
            generateItemCards(shopName);
        });
    });
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

generateShopCards();


const removeButtons = document.querySelectorAll('.remove-btn');
removeButtons.forEach(removeButton => {
    removeButton.addEventListener('click', (e) => {
        const productName = e.target.parentElement.parentElement.querySelectorAll('h3')[0].innerText;
        e.target.parentElement.parentElement.remove()
        cart.delete(productName);
        updateCartBadge();
    });
});

const plusButtons = document.querySelectorAll('.plus');
plusButtons.forEach(plusButton => {
    plusButton.addEventListener('click', (e) => {
        const productName = e.target.parentElement.parentElement.querySelectorAll('h3')[0].innerText;
        cart.set(productName, cart.get(productName) + 1);
        e.target.parentElement.querySelectorAll('.itemCount')[0].value = cart.get(productName);
        updateCartBadge();
    });
});

const minusButtons = document.querySelectorAll('.minus');
minusButtons.forEach(minusButton => {
    minusButton.addEventListener('click', (e) => {
        const productName = e.target.parentElement.parentElement.querySelectorAll('h3')[0].innerText;
        if (cart.get(productName)>1){
        cart.set(productName, cart.get(productName) - 1);
        e.target.parentElement.querySelectorAll('.itemCount')[0].value = cart.get(productName);
        updateCartBadge(); }
    });
});

document.getElementById("logo").onclick = function () {
    localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cart)));
    location.href = "index.html";

};