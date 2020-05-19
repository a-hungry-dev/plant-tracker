const elements = {
    gardens: document.querySelector('#gardens')
}

window.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('/api/gardens');
    const json = await response.json()
    console.log(json);
})