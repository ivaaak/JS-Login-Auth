//Run SoftUni Remote DB Server (locally): 
//cd server
//node server.js

//Default user: 
// peter@abv.com
// 123456

// Button click sends a request and gets a response 
// If the user is authorized then a json of all recipes is returned
document.querySelector('button').addEventListener('click', async () => { 
    //const token = document.getElementByld('token').value; 
    const token = sessionStorage.getItem('accessToken'); 

    const response = await fetch('http://localhost:3030/data/recipes', { 
        headers: { 
            'X-Authorization': token 
        }
    }); 

    const data = await response.json(); 
    
    console.log(data); 
});


document.getElementById('register').addEventListener('submit', onRegister); 
document.getElementById('login').addEventListener('submit', onLogin); 


//Register a user in the Data store.
async function onRegister(ev) { 
    ev.preventDefault(); 

    const formData = new FormData(ev.target); 

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    try {
        if(formData.get('password') != formData.get('repass')) {
            throw new Error('Passwords don\'t match!');
        }
        const response = await fetch('http://localhost:3030/users/register', { 
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const responseData = await response.json();

        console.log(responseData);

        sessionStorage.setItem('accessToken', responseData.accessToken);
    } catch (err) {
        alert(err.message);
    }
} 

// Log into the app with an existing user
async function onLogin(ev) { 
    ev.preventDefault(); 

    const formData = new FormData(ev.target); 

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    try {
        const response = await fetch('http://localhost:3030/users/login', { 
            method: 'post', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data) 
        }); 

        if (response.ok == false) { 
            const error = await response.json(); 
            throw Error(error.message); 
        } 

        const responseData = await response.json(); 
        console.log(responseData); 
        
        sessionStorage.setItem('accessToken', responseData.accessToken); 
    } catch (err) { 
        alert(err.message); 
    }
} 
