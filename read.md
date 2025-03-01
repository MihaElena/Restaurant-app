
html:
<span class="circle"><i class="fa-solid fa-plus"></i></span>

css


.circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    font-size: 20px;
}



.icon{
    position: absolute;
    right: 10px;
    top: 25%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;


    

function handleTotalPrice(productId){
    const targetProductObj = menuArray.filter(function(product){
        return product.id === parseInt(productId)
    })[0]

       
    let totalPrice = []
    totalPrice.push(targetProductObj.price)
    console.log (totalPrice)
    
    return document.getElementById('total').innerHTML = `
    
                <div class="card-left">
                    <h2>Total price: </h2>
                </div>                   

                <div class="icon">
                    <h2>${totalPrice}</h2>                       
                </div>  
        `
}



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input[required]");
    const payButton = document.getElementById("pay");

    function checkInputs() {
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });
        payButton.disabled = !allValid;
    }

    // Dezactivează butonul la început
    payButton.disabled = true;

    // Ascultă evenimentul 'input' pentru validare în timp real
    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // Previne trimiterea formularului dacă butonul e dezactivat
    form.addEventListener("submit", function (event) {
        if (payButton.disabled) {
            event.preventDefault();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input[required]");
    const payButton = document.getElementById("pay");

    function checkInputs() {
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });
        payButton.disabled = !allValid;
    }

    // Dezactivează butonul la început
    payButton.disabled = true;

    // Ascultă evenimentul 'input' pentru validare în timp real
    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // Previne trimiterea formularului dacă butonul e dezactivat
    form.addEventListener("submit", function (event) {
        if (payButton.disabled) {
            event.preventDefault();
        }
    });
});





//const cardNumber = document.getElementById("ccn");
//const cvv = document.getElementById("cvv");

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

    /*
    if(customerName.checkValidity() && cardNumber.checkValidity() && cvv.checkValidity()){
        payButton.removeAttribute('disabled')
        
    }
    */

    

})
