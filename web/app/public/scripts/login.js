const form = document.querySelector('#login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorMsg = document.querySelector('#error')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    errorMsg.textContent = '';
    
    const login = { email: email.value, password: password.value };
    let response;
    try {
        response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
            })
    } catch(err) {
        console.error(err);
    }
    if(!response.ok) {
        const json = await response.json();
        errorMsg.textContent = json.error;
    }
    
})
