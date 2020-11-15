// function display(){
//     console.log(document.cookie);

// }
// take from backend user's address details and credit card details 
// listing page sends over cookie for product quantity and price 

// get the u_id from cookie
// var u_id = '5fa40d29e57d4';
var cookie = document.cookie;
cookie = JSON.parse(cookie);
var u_id = cookie.user_details.id;


var user_addresses
fetch(`../api/user/address_all.php?user_id=${u_id}`)
.then(response => response.json())
// .then(json => console.log(json))
.then(json => {
    user_addresses = json
    for(user of user_addresses){ 
        if(u_id == user['user_id']){
            console.log('hi');
            var address = user['user_address'];
            var postal_code = user['postal_code'];
            var city = user['city'];
            var country = user['country'];
    
            console.log(address);
        }
}})

// inside array use of, inside object use in 




var user_cards
fetch(`../api/user/credit_card_all.php?user_id=${u_id}`)
.then(response => response.json())
// .then(json => console.log(json))
.then(json => {
    user_cards = json
    for(user of user_cards){
        if(u_id == user['user_id']){
            var card_number = user['card_number'];
            var cardholder_name = user['cardholder_name'];
            var expiry = user['expiry'];
            var cvv_number = user['cvv_number'];

            console.log(card_number)
        }
    }})


// take from cookie? 
//var name = user_details[user_id]['name'];
//var email = user_details[user_id]['email'];



// InnerHTML into the div 
// var delivery_address = document.getElementById("information-tab");
// delivery_address.innerHTML += `
// ${user_address} <br>
// ${city} <br>
// ${postal_code} <br>
// ${country} <br>

// Contact Information 
// ${name} <br>
// ${email}
// `;

// var delivery_payment = document.getElementById("delivery&payment-tab");
// delivery_payment.innerHTML += ``;