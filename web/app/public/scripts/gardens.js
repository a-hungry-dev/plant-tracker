const elGardens = document.querySelector('#gardens');

window.addEventListener('DOMContentLoaded', async () => {
    try { response = await fetch('/api/gardens'); }
    catch(error) { return res.json({ error }); }

    gardens = await response.json()
    
    gardens.forEach(garden => {
        const a = document.createElement('a');
        a.href = `/gardens/${garden.id}`
        a.innerHTML = `
        <div class="garden">
        <p> ${garden.name} </p>
        <span> ${garden.plants.length} plants </span>
        </div>
        `;

        elGardens.appendChild(a);
    })
})