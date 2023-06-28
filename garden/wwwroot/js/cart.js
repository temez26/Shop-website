
// Sample data for cart items
let cartItems = [];

// Load cart items from local storage
function loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        cartItems = JSON.parse(storedItems);
    }
    updateCartView(); // Update the cart view after loading the items
}

// Save cart items to local storage
function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to calculate the total price
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

// Function to update the cart view
function updateCartView() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    const cartItemsMap = new Map();

    cartItems.forEach(item => {
        if (cartItemsMap.has(item.name)) {
            cartItemsMap.get(item.name).quantity += 1;
        } else {
            cartItemsMap.set(item.name, { ...item, quantity: 1 });
        }
    });
    // Log item data to the console
    cartItems.forEach(item => {
        console.log(`Item Name: ${item.name}`);
        console.log(`Item Price: ${item.price}`);
        console.log(`Item Quantity: ${item.quantity}`);
    });

    cartItemsMap.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `<span>${item.name} (${item.quantity})</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        cartContainer.appendChild(itemDiv);
    });

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = '$' + calculateTotal();
}

// Function to display a notification message
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }, 100);
}



// Function to handle adding items to the cart
function addToCart(event) {
    const product = event.target.dataset;
    cartItems.push({ name: product.name, price: parseFloat(product.price), quantity: 1 });
    updateCartView();
    saveCartItems(); // Save cart items after adding a new item

    // Show the notification
    showNotification(`Added ${product.name} to the cart.`);
}


// Function to handle emptying the shopping cart
function emptyCart() {
    cartItems = [];
    updateCartView();
    saveCartItems(); // Save cart items after emptying the cart
}

// Add event listeners to the add-to-cart buttons
const addButtons = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addToCart);
}

// Load cart items when the DOM is ready
document.addEventListener('DOMContentLoaded', loadCartItems);

// JavaScript code to show/hide the cart tooltip
function showCartTooltip() {
    const tooltip = document.getElementById('cart-tooltip');
    tooltip.style.display = 'block';
}

function hideCartTooltip() {
    const tooltip = document.getElementById('cart-tooltip');
    tooltip.style.display = 'none';
}

const cartTooltip = document.getElementById('cart-tooltip');

// Create a container for the buttons
const cartButtonsContainer = document.createElement('div');
cartButtonsContainer.classList.add('cart-buttons-container'); // Add the CSS class

// Create the "Empty Cart" icon
const emptyCartIcon = document.createElement('i');
emptyCartIcon.className = 'bx bxs-trash';
emptyCartIcon.classList.add('custom-icon'); // Add the CSS class 'custom-icon'
emptyCartIcon.addEventListener('click', emptyCart);
emptyCartIcon.setAttribute('title', 'Empty Cart');
emptyCartIcon.style.cursor = 'pointer';
cartButtonsContainer.appendChild(emptyCartIcon);

const orderNowButton = document.createElement('a'); // Change to <a> element instead of <button>
orderNowButton.innerText = 'Order Now';
orderNowButton.classList.add('order-now-button');
orderNowButton.setAttribute('href', '/Cart'); // Set the href attribute to the desired URL
orderNowButton.style.textDecoration = 'none'; // Remove underline styling
orderNowButton.addEventListener('click', orderNow);
cartButtonsContainer.appendChild(orderNowButton);




// Append the container to the tooltip element
cartTooltip.appendChild(cartButtonsContainer);



// Function to handle "Order Now" action
function orderNow() {
    // Add your logic here for the "Order Now" action
}

