const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submit-btn');
const errorMsg = document.querySelector('#error')

document.addEventListener('keypress', e => { 
    if (e.key === 'Enter') submitForm(e);
})

submitBtn.addEventListener('click', e => submitForm(e))

async function submitForm(e) {    
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
        return;
    }
    window.location.pathname = "/";
}