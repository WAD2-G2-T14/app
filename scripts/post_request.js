//submitting a post
    function submitPost(){
        // document.getElementById('submitBtn').addEventListener('click',submitPost);
        let user = document.getElementById('user').value; //username
        let password = document.getElementById('password').value; //password
        // e.preventDefault();

        fetch("Shopping-Club-7-login-signup-functionality/api/auth/login.php", {
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
            body:JSON.stringify({
            "email" : user,
            "password" : password
            }) //equivalent to ({user:user, password:password})
        })
            .then(response => response.json())
            .then(json => {
            if (json.error){
                // console.log(json.error);
                alert(json.error);
            }
            else if (json["error"]){
                alert(json["error"] );
            }
            else{
            var fullname = json["name"];
            var phone = json["phone"];
            var user_id = json["user_id"];
            var email = json["email"];
            console.log(json);
        
            document.cookie =  JSON.stringify({"user_details": {
                "id": user_id,
                "fullname": fullname,
                "email": email,
                "phone": phone
                },
                "cart": [],
                "product_id": "",
                })
            console.log(document.cookie);
            window.location.href ='homepage.html';  
            }
        })
        }
        

    function usersignup(){
        let email_address = document.getElementById('email').value;
        let password = document.getElementById('password1').value;
        let name = document.getElementById('fname').value;
        let postal_code = document.getElementById('pcode').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let country = document.getElementById('country').value;
        let phone_number = document.getElementById('pnumber').value;
        console.log(user);
        console.log(password);
        // e.preventDefault();
        
        fetch("Shopping-Club-7-login-signup-functionality/api/auth/signup.php", {
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
            },
            body:JSON.stringify({
            "email" : email_address,
            "password" : password,
            "name" : name,
            "postal_code" : postal_code,
            "address" : address,
            "city" : city,
            "country" : country,
            "phone_number" : phone_number

            }) //equivalent to ({user:user, password:password})
        })
            .then(response => response.json())
            .then(json => {
            console.log(json);
        });
        }

    