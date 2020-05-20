const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submit-btn');
const errorMsg = document.querySelector('#error')

const submitForm = async (e) => {
    errorMsg.textContent = '';
    const body = { email: email.value, password: password.value };
    let response;
    try {
        response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    } catch (err) {
        console.error(err);
    }
    if (!response.ok) {
        const json = await response.json();
        errorMsg.textContent = json.error;
        return;
    }
    window.location.pathname = "/";
}

// submitBtn.addEventListener('click', e => submitForm(e))
submitBtn.addEventListener('click', submitForm)

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') submitForm(e);
})