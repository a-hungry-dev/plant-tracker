const elements = {
    gardens: document.querySelector('#gardens')
}

window.addEventListener('DOMContentLoaded', async () => {
    res = await fetch('/api/gardens');
    console.log(res);
})