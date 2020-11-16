// var cookie = document.cookie
// coookie = JSON.parse(cookie)

// hardcoded cookie
var cookie = {
    "user_details": {
        "id": "5fa40d29e57d4",
        "fullname": "Jonathan Tan",
        "email": "jonathan@mail.com",
        "phone": "91234567"
    },
    "cart": [
        {
            "product_id": "20622707",
            "name": "Based London Forged Boots with Waxy Faux Leather",
            "quantity": "1"
        },
    ],
        "product_id": "01351491"
}

// Variables from cooke
var user_id = cookie['user_details']['id']
var cart = cookie['cart']

// Page States


function initialLoad() {
    displayCart()
    displayAddresses()
}

function displayCart() {
    const cartElement = document.getElementById('cartItems')

    let count = 1
    let total = 0
    for (item of cart) {
        const item_id = item['product_id']
        const quantity = item['quantity']

        // const itemDetails = function
        // const name = itemDetails['name']
        const name = item['name']
        // const price = itemDetails['price']

        const str = `
            <div class='d-flex justify-content-between'>
                <span>${count}. ${name}</span>
                <span>x${quantity}</span>
              </div>
        `

        cartElement.innerHTML += str
        count++
        // total += price
    }

    const totalAmountElement = document.getElementById('totalAmount')
    totalAmountElement.innerHTML = '$' + total
}

function displayAddresses() {

    var addressArray
    fetch(`../api/user/address_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        addressArray = json

        const addressBoxArray = document.getElementById('addressBoxes')
        let count = 1
        for(anAddress of addressArray){ 
            const address = anAddress['user_address'];
            const postal_code = anAddress['postal_code'];
            const city = anAddress['city'];
            const country = anAddress['country'];

            const id = 'addressBox' + count
        
            const str = `
                <div class='addressBox' id='${id}' onclick="handleAddressBoxClick('${id}')">
                    <p>${address}</p>
                    <p>${city}, ${postal_code}</p>
                    <b>${country.toUpperCase()}</b>
                </div>
            `
            addressBoxArray.innerHTML += str
            count++
        }

        const detailsBoxElement = document.getElementById('detailsBox')
        const str = `
            <div>
                <p><b>${cookie['user_details']['fullname']}</b></p>
                <p>${cookie['user_details']['email']}</p>
                <p>${cookie['user_details']['phone']}</p>
            </div>
        `
        detailsBoxElement.innerHTML += str
    })

}

function displayCreditCards() {
    var cardArray
    fetch(`../api/user/credit_card_all.php?user_id=${user_id}`)
    .then(response => response.json())
    .then(json => {
        cardArray = json

        const creditCardBoxElement = document.getElementById('creditCardBox')
        let count = 1
        for (card of cardArray) {
            var card_number = card['card_number']
            var cardholder_name = card['cardholder_name']
            var expiry = card['expiry']

            const id = 'cardBox' + count
            const str = `
                <div class='addressBox' id='${id}' onclick="handleAddressBoxClick('${id}')">
                    <p><b>${card_number}</b></p>
                    <p>Name: ${cardholder_name}</p>
                    <p>Expiry: ${expiry}</p>
                </div>
            `
            creditCardBoxElement.innerHTML += str
            count++
        }
    })
}


function handleAddressBoxClick(id) {
    const addressBoxes = document.getElementsByClassName('addressBox')
    for (item of addressBoxes) {
        item.style = ''
    }

    const addressBoxElement = document.getElementById(id)
    addressBoxElement.style = 'background-color: #FED143;'
}

function handleFinishStep1() {
    // update tabs
    var actives = document.getElementsByClassName("active");
    actives[0].className = actives[0].className.replace("active", "disabled");

    var disabled = document.getElementsByClassName("disabled");
    disabled[1].className = disabled[1].className.replace("disabled", "active")

    // update page content
    const tabElement = document.getElementById('myTabContent')
    tabElement.innerHTML = `
        <div style='border: 1px lightgrey solid' class='mt-4 p-4' id='creditCardBox'>
            <b>CREDIT CARDS</b>
            <hr>

        </div>

        <button class="button mt-5" onclick="handleFinishStep2()">Place Order</button>
    `

    displayCreditCards()
}

function handleFinishStep2() {
    let formattedCart = []
    cart.forEach(item => {
        formattedCart.push({
            "item_id": item['product_id'],
            "quantity": item['quantity']
        })
    })

    // API call
    fetch("../api/items/order.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            "user_id": user_id,
            "item_list": formattedCart
        })
    })
    .then((res) => {
        // update tabs
        var actives = document.getElementsByClassName("active");
        actives[0].className = actives[0].className.replace("active", "disabled");

        var disabled = document.getElementsByClassName("disabled");
        disabled[2].className = disabled[2].className.replace("disabled", "active")

        // update page content
        const tabElement = document.getElementById('myTabContent')
        tabElement.innerHTML = `
        <div class='mt-4'>
            <b>Your order has been placed successfully</b>
        </div>
        <button class="button mt-5" onclick="handleFinishStep3()">Go back to Home</button>
        `

        displayCreditCards()
    })

}

function handleFinishStep3() {
    const tabElement = document.getElementById('myTabContent')
    tabElement.innerHTML = ``
    window.location.href = '../'
}

