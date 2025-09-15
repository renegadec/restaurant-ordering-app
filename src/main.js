import { menuArray as menu } from './data/data'

const foodMenu = document.getElementById('food-menu')
const checkoutItems = document.getElementById('checked-out')
const totalPrice = document.getElementById('total')
const completeOrderBtn = document.getElementById('complete-order-btn')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleCheckout(e.target.dataset.add);
        document.getElementById('checkout').style.display = 'block'
        document.querySelector('.container').style.height = 'auto'
    }

    if(e.target.id === 'complete-order-btn'){
        handleCompleteButtonClick()
    }

    if(e.target.id === 'pay-btn'){
        e.preventDefault()
        handlePayButtonClick()
    }
})

const menuItems = menu.map(function(menuItem){
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

const cartItems = []

function handleCheckout (foodId) {
    
    const checkedOut = menu.filter(function(menuItem){
        const id = Number(foodId)
        return menuItem.id === id
    })[0]

    if (!checkedOut) return;

    cartItems.push(checkedOut)

    const cartTotalPrice = cartItems.reduce(function(sum, item){
        return sum + item.price
    }, 0)

    checkoutItems.innerHTML += `
        <div>
            <p>${checkedOut.name}<span class="remove-btn">remove</span><p> 
            <p>$${checkedOut.price}</p>
        </div>
    `

    totalPrice.innerHTML = `
            <p>Total Price:</p>
            <p>$${cartTotalPrice}</p>
    `
}

function handleCompleteButtonClick() {
    const modal = document.getElementById('card-details-modal')
    const overlay = document.getElementById('modal-overlay')
    modal.style.display = 'flex'
    modal.classList.toggle('is-open')
    overlay.classList.toggle('is-open')
}

function handlePayButtonClick() {
    document.getElementById('card-details-modal').style.display = 'none'
    document.getElementById('modal-overlay').classList.toggle('is-open')
    document.getElementById('checkout').innerHTML = `
        <div class="thank-you-msg">
            <p>Thanks, James! Your order is on its way!</p>
        </div>  
    `
}

function renderFoodItem() {
     foodMenu.innerHTML = menuItems
}

renderFoodItem()

