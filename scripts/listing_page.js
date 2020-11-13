// function call_api(value){
//     //enter api
//     console.log('enter api call!');
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function(){
//         if (this.readyState ==4 && this.status == 200){
//             var response_json = JSON.parse(this.responseText);
//             console.log (response_json);
//             // stuff to do with api
//         }
//     }
//     var url = "https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=9851612" // url
//     request.open('GET', url, true);
//     request.send();

// }

function call_api(){
    //console.log(document.cookie);
    var cookie_id = document.cookie;
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            var response_json = JSON.parse(this.responseText);
            createProduct(response_json);
            console.log(response_json);
            //console.log(response_json.alternateNames[0].title);
        }
    });
    
    xhr.open("GET", `https://asos2.p.rapidapi.com/products/v3/detail?store=US&sizeSchema=US&lang=en-US&currency=USD&id=20622707`);
    xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "254a1a4b39msh0055d7e48bce68dp185c92jsn919b8e0e8c9c");
    
    xhr.send(data);
}

function createProduct(response){
    //console.log('entering create prod!!'); // pass

    var images = response.media.images;
    // get sizes array
    var sizesAvail_arr = response.variants;
    //console.log(sizesAvail_arr);
    var sizesAvail =[]
    for (var i=0 ; i< sizesAvail_arr.length ; i++){
        //console.log(sizesAvail_arr[i].brandSize);
        sizesAvail.push(sizesAvail_arr[i].brandSize);
    }
    //console.log(sizesAvail);

    var price = response.price.current.text; //ASSUMPTION: price is in sgd //*do not delete*
    //console.log(price);
    //console.log(images);
    var btm_img = document.getElementById('bottom_img');
    var str = '';
    var btm_str = '';
    var innerCarousel = document.getElementById('innerCarousel');
    //console.log(innerCarousel);
    var active = 'active';
    //side images
    var side_images = document.getElementById('side_images');
    var side_text='';
    for (var i=0 ; i< images.length; i++){
        //side images
        side_text += `
            <li class="nav-item">
                <img src="http://${images[i].url}" class="d-block w-100 mb-2 " alt="..." >
            </li>
        `;

        // carousel image
        if (i != 0){
            active ='';
        }

        //btm image
        btm_str += `
        <img src="http://${images[i].url}"  >
        `;

        //console.log(i);
        //console.log(images[i].url); //images url
        //str += `<img src = 'http://${images[i].url}' > <br>`;
        str += `
        <div class="carousel-item ${active}">
            <div class ='container'></div>
            <img src="http://${images[i].url}" class="d-block w-100" id = ${images[i].url} alt="...">
            </div>
        </div>        
        
        `;

        btm_img.innerHTML+= `
        <img src ='http://${images[i].url}'>
        `;
    }

    //prodImgs.innerHTML = str;

    side_images.innerHTML = side_text;
    innerCarousel.innerHTML +=str ;
    btm_img.innerHTML = btm_str;
    
 









    var title = response.alternateNames[0].title; // title from response

    var name = document.getElementById('prodname');
    //console.log(name);
    var details = `
    <h3 class ='title'>${title}</h3> 
    <h5 id='price'><b> SGD ${price}</b></h5>
    
    
    
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-white wordspace ml-0" data-toggle="modal" data-target="#exampleModal">
    <small><u>Free delivery and returns (Ts&Cs Apply)</u></small>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content modalcontent">
        <div class="modal-header ">
            <h5 class="modal-title " id="exampleModalLabel"><b>SHIPPING OPTIONS</b></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <table class ='table text-center' >
                <tr>
                    <th>TYPE</th>
                    <th>WHEN</th>
                    <th>HOW MUCH</th>
                </tr>

                <tr>
                    <td class ='description' >Standard delivery</td>
                    <td></td>
                    <td> $12.01 <br> FREE - spend over SGD$65.00</td>
                </tr>
            
            
            
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>

    <br><br>
    <small class ='wordspace' style='font-weight:700; font-size:14px; margin-bottom:30px;'>SIZE: </small>
    <select id='size_selected' class="form-control form-control-sm" style= 'height: 40px;'>
        <option>Please select</option>
    
    `;

    for (var size of sizesAvail){
        console.log(size);
        details +=`
        <option>${size}</option>
        `;
    }
    details +=`
    </select>
    <br>
    <small class ='wordspace' style='font-weight:700; font-size:14px; margin-bottom:30px;'>QUANTITY: </small>
    <input min='0' type="number" id="quantity" class="form-control" aria-label="Quantity" aria-describedby="basic-addon3">
        <div class="container text-center white-text py-5">
        <button class="cartBtn mask rgba-black-strong d-flex align-items-center h-100" onclick='redirect(20622707)'><span>Add to Cart</span></button>
        </div>


    
     `;

    name.innerHTML = details;


    p_sex = document.getElementById('p_sex');
    p_sex.innerHTML = response.gender;

    p_brand = document.getElementById('p_brand');
    p_brand.innerHTML = response.brand.name;

    p_aboutMe = document.getElementById('p_aboutMe');
    p_aboutMe.innerHTML = response.info.aboutMe;

    p_careinfo = document.getElementById('p_careinfo');
    p_careinfo.innerHTML = response.info.careInfo;

    p_id = document.getElementById('p_id');
    p_id.innerHTML = response.id;

    p_fit = document.getElementById('p_fit');
    p_fit.innerHTML = response.info.sizeAndFit;

}



document.cookie= JSON.stringify (
    {
        'cart' : [
            {
                'product_id' : p_id,
                'quantity' : ''
            }
        ]
    }
)
console.log(document.cookie);


function redirect(p_id){
    console.log('entering redirect!');
    console.log(p_id);
    var qty = document.getElementById('quantity').value;
    var size = document.getElementById('size_selected').value;
    //console.log(qty);
    //console.log(size);
    // var obj = {
    //     'cart' : [
    //         {
    //             'product_id' : `${p_id}`,
    //             'quantity' : `${qty}`
    //         }
    //     ]  };
    
    //console.log(document.cookie);
    //window.location.href ='checkout.html';
}


