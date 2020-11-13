
var item_details
fetch('api/items/all.php')
.then(response => response.json())
.then(json => {
    console.log(json);
    var response = JSON.parse(json)
    item_details = response
    
})

.catch(function(item_status){
  console.log("Error detected")
})


// function display_default(){
//     call_api();
// }

// function call_api(){
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function(){
//         if(this.readyState== 4 && this.status== 200){
//             var response_json = JSON.parse(this.responseText);
//             var all_products = response_json.products;
            
//             console.log(all_products);

//             var image_products = document.getElementById("products");
//             for(product of all_products){
//                 console.log(product);
//                 // image_products.innerHTML += `<img src="${product.baseImageUrl}">`;
//             }
//         }
//     }

//     const base_url = "https://rapidapi.p.rapidapi.com/products/list?store=2&categoryId=27871&limit=48&offset=0&currency=USD&sizeSchema=US&sort=freshness&lang=en-US&country=US";

//     xhr.open("GET", base_url, true);
//     xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
//     xhr.setRequestHeader("x-rapidapi-key", "f9788391a3msh24c4d29231f3a07p1ce2d7jsn6d46ced0f941");
//     xhr.send(data);
// }




// /api/items/show_one.php
// i need to send over the id to then backend, then the backend will send back the information 

// onload the timer appear
fetch('../api/items/all.php')
.then(function(response){
  // my code for handling the data
  console.log(response)
  var response_json = JSON.parse(response);
  
  

  
})
.catch(function(item_status){
  console.log("Error detected")
})




const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        // console.log(this.responseText);
        
        var response_json = JSON.parse(this.responseText);
        var all_products = response_json.products;
            
        console.log(all_products);
        display(all_products);

  }
});

xhr.open("GET", "https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=0&categoryId=4209&limit=48&store=US");
xhr.setRequestHeader("x-rapidapi-host", "asos2.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "438acc3e60msh4ab92755245ec91p11a85fjsnd44149a8b159");

xhr.send(data);

//function for creating coookie!
function push(p_id){
  //console.log('entering function push');
  document.cookie = p_id;
  //console.log(document.cookie);
  window.location.href ='listing_page.html';
  
}

function display(all_products){
  var trending_listings = document.getElementById("trending_cards");
  var counter = 0
  for(i=0; i < 4; i++){
  // for(product of all_products){
      // console.log(product);
      //console.log(all_products[i].id);
      counter += 1
      trending_listings.innerHTML += `
      
          <div class="col-sm-12 col-md-6 col-lg-3">
              <div class="card mx-auto" onclick="push(${all_products[i].id})" style="width: 18rem; height: 30rem; margin-top: 18px;">
                  <img src='http://${all_products[i].imageUrl}' class="card-img-top" alt="...">
                  
                  <div class="item-time">

                    <div class="count-down-container">

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="days">00</h1>
                          <p>Days</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="hours">00</h1>
                          <p>Hours</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="minutes">00</h1>
                          <p>Minutes</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="seconds">00</h1>
                          <p>Seconds</p>
                        </div>
                      </div>


                      
                    </div>

                  </div>


                  <div class="card-body">
                      <h6 class="card-title">${all_products[i].name}</h6>                           
                  </div>

                  
                    <div class="skillbar">
                      
                      <div class="skill_perecentage">
                        
                        <div class="skill_level" style="width: 50%"></div>
                      </div>
                    </div>
                    <p style="float:right; margin-left: 80%; font-size: 12px; margin-bottom: 50%"></p>
                  

              </div>
          </div>
      
      `;

      
var remDays = document.getElementById("days");
var remHours = document.getElementById("hours");
var remMinutes = document.getElementById("minutes");
var remSeconds = document.getElementById("seconds");

var birthDay = "27 Dec 2020";

var formatTime = (time) => (time < 10 ? `0${time}` : time);

var countdown = () => {
var birthDayDate = new Date(birthDay);
var currentDate = new Date();

var totalSeconds = (birthDayDate - currentDate) / 1000;

var days = Math.floor(totalSeconds / 3600 / 24);
var hours = Math.floor(totalSeconds / 3600) % 24;
var mins = Math.floor(totalSeconds / 60) % 60;
var seconds = Math.floor(totalSeconds) % 60;

remDays.innerHTML = days;
remHours.innerHTML = formatTime(hours);
remMinutes.innerHTML = formatTime(mins);
remSeconds.innerHTML = formatTime(seconds);
};

// initial call
countdown();

setInterval(countdown, 1000);

                  
}





// --------------------------------------------------------------------------------------------------//
var trending_listings = document.getElementById("recommended_cards");
  var counter = 0
  for(i=4; i < 12; i++){
  // for(product of all_products){
      // console.log(product);
      counter += 1
      trending_listings.innerHTML += `
      
          <div class="col-sm-12 col-md-6 col-lg-3">
              <div class="card mx-auto" style="width: 18rem; height: 30rem; margin-top: 20px;">
                  <img src='http://${all_products[i].imageUrl}' class="card-img-top" alt="...">
                  
                  <div class="item-time">

                    <div class="count-down-container">

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="days">00</h1>
                          <p>Days</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="hours">00</h1>
                          <p>Hours</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="minutes">00</h1>
                          <p>Minutes</p>
                        </div>
                      </div>

                      <div class="count-down-box">
                        <div class="count-down">
                          <h1 id="seconds">00</h1>
                          <p>Seconds</p>
                        </div>
                      </div>


                      
                    </div>

                  </div>


                  <div class="card-body">
                      <h6 class="card-title">${all_products[i].name}</h6>                           
                  </div>

                  <div class="skillbar">
                    
                    <div class="skill_perecentage">
                    <p></p>
                      <div class="skill_level" style="width: 50%"></div>
                    </div>
                  </div>

              </div>
          </div>
      
      `;
      
var remDays = document.getElementById("days");
var remHours = document.getElementById("hours");
var remMinutes = document.getElementById("minutes");
var remSeconds = document.getElementById("seconds");

var birthDay = "27 Dec 2020";

var formatTime = (time) => (time < 10 ? `0${time}` : time);

var countdown = () => {
  var birthDayDate = new Date(birthDay);
  var currentDate = new Date();

  var totalSeconds = (birthDayDate - currentDate) / 1000;

  var days = Math.floor(totalSeconds / 3600 / 24);
  var hours = Math.floor(totalSeconds / 3600) % 24;
  var mins = Math.floor(totalSeconds / 60) % 60;
  var seconds = Math.floor(totalSeconds) % 60;

  remDays.innerHTML = days;
  remHours.innerHTML = formatTime(hours);
  remMinutes.innerHTML = formatTime(mins);
  remSeconds.innerHTML = formatTime(seconds);
};

// initial call
countdown();

setInterval(countdown, 1000);

  }
}  


