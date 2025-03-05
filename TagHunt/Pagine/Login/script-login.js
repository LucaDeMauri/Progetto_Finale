document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let  email = document.getElementById("email").value;
    let  password = document.getElementById("password").value;
    const userProgress = {
        "xp": 0,
        "id": 0,
        "steps": [
         {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<h1>'
        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<p>'
        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<a>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<img>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<ul>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<li>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<form>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<fieldset>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<legend>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<input>'

        },
        {
            "time": 0,
            "errors": 0,
            "completed": false,
            "xp": 0,
            "tag": '<button>'

        },
    ]
    }

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

    passwordHashata = CryptoJS.SHA256(password).toString();

    let users = JSON.parse(localStorage.getItem('users')) || [];


    try{
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === passwordHashata) {
            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = users[i].username;
            document.getElementById("benvenuto").innerText = "Benvenuto";
            let userid = users[i].id
            let usersProgress = JSON.parse(localStorage.getItem('usersProgress')) || [];
            if(usersProgress.length === 0){
                userProgress.id = userid;
                usersProgress.push(userProgress);
            }
            else{
                for (let i = 0; i < usersProgress.length; i++) {
                    if (usersProgress[i].id == userid) {
                        userProgress.id = userid;
                        break;
                    }   
            }
            userProgress.id = userid;
            usersProgress.push(userProgress);
        }

        setTimeout(() => {
            localStorage.setItem('usersProgress', JSON.stringify(usersProgress));
            window.location.href="../path_page/index.html?userid=" + userid ;
            return;
        },1000)
        }
        else{
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = "password o email errata";
        }
    }
    }
    catch(err){
        console.log(err);
    }

})

document.getElementById("mostra").addEventListener("click", function() {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
})