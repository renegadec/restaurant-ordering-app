import { menuArray as menu } from './data/data'

// Declarations: cache frequently used DOM elements
const foodMenu = document.getElementById('food-menu')
const checkoutItems = document.getElementById('checked-out')
const totalPrice = document.getElementById('total')

// Global click delegation for add-to-cart, open modal, and remove-from-cart
// - Uses data attributes (data-add, data-remove) to identify actions
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleCheckout(e.target.dataset.add);
        document.getElementById('checkout').style.display = 'block'
        document.querySelector('.container').style.height = 'auto'
    }

    if(e.target.id === 'complete-order-btn'){
        handleCompleteButtonClick()
    }

    if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
    }

})

// Payment form submit handler
// - Prevents default submission
// - Validates name, card number (regex + Luhn), and CVV
// - On success, proceeds to "paid" flow
document.getElementById('payment-form').addEventListener('submit', function(e){
    e.preventDefault()

    const customerName = document.getElementById('customer-name').value.trim()
    const cardNumber = document.getElementById('card_number').value.replace(/\s+/g, '')
    const cvv = document.getElementById('cvv').value.trim()

    // Name Validation
    if(customerName.length < 2 || customerName.length > 50){
        alert('Name must be betweet 2 and 20 Character')
        return
    }

    // Card number validation
    if(!/^\d{13,19}$/.test(cardNumber) || !luhnCheck(cardNumber)){
        alert('Card number is invalid.')
        return
    }

    // CVV validation
    if(!/^\d{3,4}$/.test(cvv)) {
        alert('CVV must be 3 or 4 digits')
        return
    }

    // If we reach here, validation passed; proceed as paid
    handlePayButtonClick(customerName)

})

// Luhn algorithm: determines if a card number is potentially valid
function luhnCheck(number) {
    let sum = 0, shouldDouble = false

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i))
        if(shouldDouble){
            digit *= 2
            if (digit > 9) digit -= 9
        }
        sum += digit;
        shouldDouble = !shouldDouble
    }
    return sum % 10 === 0
}

const menuItems = menu.map(function(menuItem){
    // Render a single menu item card with an add button
    return `
     <div class="item-container">
        <div class="emoji">${menuItem.emoji}</div>
        <div class="item-description">
            <h2>${menuItem.name}</h2>
            <p class="ingredients">${menuItem.ingredients}</p>
            <p class="price"> $${menuItem.price}</p>
        </div>
        <div class="add-btn" data-add="${menuItem.id}">+</div>
     </div>
    `
})

let cartItems = []

// Add item to cart by id, then re-render cart UI
function handleCheckout (foodId) {
    
    const checkedOut = menu.filter(function(menuItem){
        const id = Number(foodId)
        return menuItem.id === id
    })[0]

    if (!checkedOut) return;

    cartItems.push(checkedOut)

	renderCart()
}

// Remove a single occurrence of an item from cart by id, then re-render
function handleRemoveItem(removeId) {
	const indexToRemove = cartItems.findIndex(function(item){
		return item.id === Number(removeId)
	})
	if(indexToRemove !== -1){
		cartItems.splice(indexToRemove, 1)
	}
	renderCart()
}

// Open the payment modal and activate overlay
function handleCompleteButtonClick() {
    const modal = document.getElementById('card-details-modal')
    const overlay = document.getElementById('modal-overlay')
    modal.style.display = 'flex'
    modal.classList.toggle('is-open')
    overlay.classList.toggle('is-open')
}

// Close modal and show a thank-you message with the customer's name
function handlePayButtonClick(name) {
    document.getElementById('card-details-modal').style.display = 'none'
    document.getElementById('modal-overlay').classList.toggle('is-open')
    document.getElementById('checkout').innerHTML = `
        <div class="thank-you-msg">
            <p>Thanks, ${name}! Your order is on its way!</p>
        </div>  
    `
}

// Render all menu items into the menu container
function renderFoodItem() {
     foodMenu.innerHTML = menuItems
}

renderFoodItem()

// Render the cart UI (items list and total)
// - Hides checkout section when cart is empty
// - Uses data-remove on each line item to enable removal via delegation
function renderCart(){
	if(cartItems.length === 0){
		document.getElementById('checkout').style.display = 'none'
		checkoutItems.innerHTML = ''
		totalPrice.innerHTML = ''
		return
	}

	document.getElementById('checkout').style.display = 'block'
	document.querySelector('.container').style.height = 'auto'

	const itemsHtml = cartItems.map(function(item){
		return `
		<div>
			<p>${item.name}<span class="remove-btn" data-remove="${item.id}">remove</span><p> 
			<p>$${item.price}</p>
		</div>
		`
	}).join('')

	checkoutItems.innerHTML = itemsHtml

	const cartTotalPrice = cartItems.reduce(function(sum, item){
		return sum + item.price
	}, 0)

	totalPrice.innerHTML = `
			<p>Total Price:</p>
			<p>$${cartTotalPrice}</p>
	`
}

