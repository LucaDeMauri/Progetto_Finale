
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        cerchio.style.width = '100px';
        cerchio.style.height = '100px';
        cerchio.style.left = '-2000px';
        cerchio.style.top = '-1000px';
      }, 100);
})




document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    

    let messageDiv = document.getElementById("message");

    
    if (!email) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci un'email.";
        return;
    }
    if (!password) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci una password.";
        return;
    }
    if (!username) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci il tuo username.";
        return;
    }
    
    

     const passwordHashata = CryptoJS.SHA256(password).toString();
                                                                  

    

     const user = {
         id: 0,
         username: username,
         email: email,
         password: passwordHashata,  
     };

     
     let users = JSON.parse(localStorage.getItem('users')) || [];    for (let user of users) {
        if(user.email === email){
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = "email già utilizzta";
            return
        }
    }
    
    user.id = users.length + 1;
     
     users.push(user);

     
     localStorage.setItem('users', JSON.stringify(users));

     

     
     document.getElementById("message").style.color = "green";
     document.getElementById("message").innerText = "Registrazione avvenuta con successo";
     
   
     document.getElementById("signupForm").reset();

});

document.getElementById("mostra").addEventListener("click", function() {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
})