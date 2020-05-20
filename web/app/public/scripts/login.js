const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submit-btn');
const errorMsg = document.querySelector('#error')

const submitForm = async () => {
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
    window.location.pathname = '/';
}

const validateForm = () => {
    errorMsg.textContent = '';
    if(email.value === '') {
        errorMsg.textContent = 'Email is required';
        email.focus();
        return;
    }
    if(password.value === '') {
        errorMsg.textContent = 'Password is required';
        password.focus();
        return;
    }
    submitForm();
}

submitBtn.addEventListener('click', validateForm);

email.addEventListener('keypress', e => {
    if (e.key === 'Enter') validateForm();
})
password.addEventListener('keypress', e => {
    if (e.key === 'Enter') validateForm();
})

email.focus();