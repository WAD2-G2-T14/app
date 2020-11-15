var cookie = document.cookie;


// var cookie = {
//     "user_details": {
//         "id": "013f45b21",
//         "fullname": "Agurz Tan",
//         "email": "agurz@mail.com",
//         "phone": "91234567"
//     },
//     "cart": [
//         {
//             "product_id": "20622707",
//             "product_quantity": "2",
//             "product_size": "M"

//         }
//     ],
//     "product_id": "20622707"
// }

function nav_call_api(p_id, cart_quantity, cart_size){
    //console.log('entering nav_api');
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            var response_json = JSON.parse(this.responseText);
            console.log(response_json);
            
            //console.log(response_json);
            //console.log(response_json.alternateNames[0].title);

            var cart_items = document.getElementById('cart_items');
            var image = response_json.media.images[0].url; 
            var title = response_json.alternateNames[0].title;
            
            
            cart_items.innerHTML += `
                <div class ='row' style ='background-color: rgb(245, 244, 244); padding:10px 0;'>
                    <div class ='col-4'>
                        
                        <img src="http://${image}" style ='width:100%;' alt="..." >
                    </div>
                    <div class ='col'>
                        <p>${title}</p>
                        <p>Size: ${cart_size}</p>
                        <p>Quantity : ${cart_quantity}</p>

                    </div>
                
                </div>
            `;
         }
    });
    // remove HARD CODE!! to p_id in asos link!
    xhr.open("GET", `https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=${p_id}`);
    xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9fd2e4fe08mshaebad2c1add2ab1p1ae36djsnebc50a98407d");
    
    xhr.send(data);
}


function nav_createProduct(){
    document.getElementById('cart_items').innerHTML = '';
    //display cart
    //console.log(cart_items);
    
    var cart = cookie.cart // returns array of cart items
    
    for (one_item of cart){
        console.log('hi');
        cart_p_id = one_item['product_id'];
        cart_quantity = one_item['product_quantity'];
        cart_size = one_item['product_size']
        nav_call_api(cart_p_id, cart_quantity);


    }


   


    
}