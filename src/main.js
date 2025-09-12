import { menuArray as menu } from './data/data'

const main = document.getElementById('main')

const menuItems = menu.map(function(menuItem){
    return `
     <div class="item-container">
        <div class="emoji">${menuItem.emoji}</div>
        <div class="item-description">
            <h2>${menuItem.name}</h2>
            <p class="ingredients">${menuItem.ingredients}</p>
            <p class="price"> $${menuItem.price}</p>
        </div>
        <div class="add-btn">+</div>
     </div>  
    `
})
console.log(menuItems)


function renderFoodItem() {
     main.innerHTML = menuItems
}

renderFoodItem()

