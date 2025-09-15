import { menuArray as menu } from './data/data'

const foodMenu = document.getElementById('food-menu')
const checkoutEl = document.getElementById('checkout')
const checkoutItems = document.getElementById('checked-out')
const totalPrice =document.getElementById('total')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleCheckout(e.target.dataset.add);
        checkoutEl.style.display = 'block'
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
            <p>${cartTotalPrice}</p>
    `
}




function renderFoodItem() {
     foodMenu.innerHTML = menuItems
}

renderFoodItem()

