import { menuArray } from './data.js'


const completeOrder = document.getElementById('complete-order')
const payButton = document.getElementById('pay')
document.querySelector('.finished-order').style.display = 'none'


// check validity for inputs, make Pay button active
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input[required]");
    const payButton = document.getElementById("pay");
    const message = document.querySelector(".finished-order"); 

    function checkInputs() {
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });
        payButton.disabled = !allValid;
    }

    // In the beginning, the payButton is disabled
    payButton.disabled = true;

    // Listen to the 'input' event for real-time validation.
    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // Listen to the 'submit' event on the form
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 🔥 Stop sending the form

        document.querySelector('.hidden').style.display = 'none';
        document.querySelector('.order').style.display = 'none';
        document.querySelector('.finished-order').style.display = 'flex';

        const customerName = document.getElementById("customerName").value;
        message.innerHTML = `<h2>Thanks, ${customerName}! Your order is on its way!</h2>`;
    });
});


// show card payment form
completeOrder.addEventListener('click', function(){
    document.querySelector('.hidden').style.display = 'block'
})


// hide card payment form
const message = document.getElementById('message')

payButton.addEventListener('click', function(){

    document.querySelector('.hidden').style.display = 'none'
    document.querySelector('.order').style.display = 'none'
    
    document.querySelector('.finished-order').style.display = 'flex'
    const customerName = document.getElementById("customerName").value;
    message.innerHTML = `<h2>Thanks, ${customerName}! Your order is on it's way!</h2> `
})

// pick product, show added products, show total price, show 'Complete order' button
document.addEventListener('click', function(e) {

    if (e.target.dataset.adding) {
        handlePlusIcon(e.target.dataset.adding);
        document.querySelector('.title-order').style.display = 'block';
        document.querySelector('.complete-order').style.display = 'block';
        handleTotalPrice(e.target.dataset.adding);
    }    

    if (e.target.dataset.remove) {
        handleRemoveItem(e.target.dataset.remove);
    }
});

const order = document.getElementById('order');
const totalPrice = []; // initilise the price list

//Add product to order
function handlePlusIcon(productId) {

    var targetProductObj = findProductById(productId);

    if (targetProductObj) {
        totalPrice.push(targetProductObj.price); // add the price in the totalPrice array
        
        order.innerHTML += `
            <section class="card" id="order-${targetProductObj.id}">                   
                <div class="card-left">
                    <h2>${targetProductObj.name}</h2>
                </div>
                
                <div class="card-right">                        
                    <p class="remove-btn" data-remove="${targetProductObj.id}">remove</p>                       
                </div>

                <div class="icon">
                    <h2>$${targetProductObj.price}</h2>                       
                </div>
            </section>
        `;

        updateTotalPrice(); //Re-calculate the total price
    }
}

//Remove any product from order
function handleRemoveItem(productId) {
    productId = parseInt(productId);

    // Remove product in interface
    var productElement = document.getElementById("order-" + productId);
    if (productElement) {
        productElement.remove();
    }

    // Remove the first price found in totalPrice array
    var targetProductObj = findProductById(productId);
    if (targetProductObj) {
        var index = totalPrice.indexOf(targetProductObj.price);
        if (index !== -1) {
            totalPrice.splice(index, 1); // Elimină doar o apariție a prețului respectiv
        }
    }

    updateTotalPrice(); //Re-calculate the total price after removing a product from order
}

// Auxiliary function to find a product in the menu
function findProductById(productId) {
    for (var i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === parseInt(productId)) {
            return menuArray[i];
        }
    }
    return null;
}

// Update total price
function updateTotalPrice() {
    var sum = 0;
    for (var i = 0; i < totalPrice.length; i++) {
        sum += totalPrice[i];
    }

    document.getElementById('total').innerHTML = `
        <div class="card-left">
            <h2>Total price:</h2>
        </div>                   

        <div class="icon">
            <h2>$${sum}</h2>                       
        </div>  
    `;
}





// show menu
function getMenuHTML(){
    const menuHTML = menuArray.map(function(product){
        return `<section class="card" id="container">
                   
                    <div class="card-left">
                        <p class="emoji">${product.emoji}</p>
                    </div>
                    
                    <div class="card-right">
                        <h2>${product.name}</h2>
                        <p>${product.ingredients.toString()}</p>
                        <h3>$${product.price}</h3>
                        
                    </div>

                    <div class="icon" id="icon" >
                        <i class="fa-solid fa-circle-plus outlined-icon" data-adding="${product.id}"></i>
                        
                    </div>
                    
                </section> `
    }).join('')

    return menuHTML
}

function renderMenu(){
    document.getElementById('container').innerHTML = getMenuHTML()
}
renderMenu()






    

