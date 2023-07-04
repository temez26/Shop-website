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
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Function to update the cart view
function updateCartView() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartContainer.innerHTML = '';
    cartTotal.textContent = `€${calculateTotal()}`;

    const cartItemsMap = new Map();

    cartItems.forEach(item => {
        if (cartItemsMap.has(item.name)) {
            cartItemsMap.get(item.name).quantity += 1;
        } else {
            cartItemsMap.set(item.name, { ...item, quantity: 1 });
        }
    });

    cartItemsMap.forEach(item => {
        const existingItemDiv = cartContainer.querySelector(`[data-item="${item.name}"]`);

        if (existingItemDiv) {
            const itemQuantity = existingItemDiv.querySelector('.item-quantity');
            const itemPrice = existingItemDiv.querySelector('.item-price');
            itemQuantity.textContent = `(${item.quantity})`;
            itemPrice.textContent = `€${(item.price * item.quantity).toFixed(2)}`;
        } else {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.dataset.item = item.name;

            const itemInfo = document.createElement('span');
            itemInfo.innerText = item.name;

            const itemQuantity = document.createElement('span');
            itemQuantity.classList.add('item-quantity');
            itemQuantity.innerText = `(${item.quantity})`;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('item-price');
            itemPrice.innerText = `€${(item.price * item.quantity).toFixed(2)}`;

            const removeIcon = document.createElement('i');
            removeIcon.className = 'bx bxs-trash';
            removeIcon.classList.add('remove-icon');
            removeIcon.setAttribute('title', 'Remove Item');
            removeIcon.style.cursor = 'pointer';
            removeIcon.addEventListener('click', () => removeItem(item.name));

            itemDiv.appendChild(itemInfo);
            itemDiv.appendChild(itemQuantity);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(removeIcon);

            cartContainer.appendChild(itemDiv);
        }
    });
}


// Function to remove an item from the cart
function removeItem(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCartView();
        saveCartItems();
    }
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
Array.from(addButtons).forEach(button => {
    button.addEventListener('click', addToCart);
});

// JavaScript code to show/hide the cart tooltip
function toggleCartTooltip() {
    const tooltip = document.getElementById('cart-tooltip');
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

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
orderNowButton.setAttribute('href', '/order'); // Set the href attribute to the desired URL
orderNowButton.style.textDecoration = 'none'; // Remove underline styling
orderNowButton.addEventListener('click', orderNow);
cartButtonsContainer.appendChild(orderNowButton);

// Append the container to the tooltip element
cartTooltip.appendChild(cartButtonsContainer);

// Function to handle "Order Now" action
function orderNow() {
 
}


// Load cart items when the DOM is ready
document.addEventListener('DOMContentLoaded', loadCartItems);