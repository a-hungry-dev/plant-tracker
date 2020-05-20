const elements = {
    plants = document.querySelector('#plants'),
    gardenName = document.querySelector('#garden-name')
}

const id = window.location.pathname.split("/")[2];


// same applies here from gardens
window.addEventListener('DOMContentLoaded', async () => {
    try { response = await fetch(`/api/gardens/${id}`); }
    catch (error) { return res.json({ error }); }

    garden = await response.json()

    elements.gardenName.textContent = garden.name;

    plants = garden.plants;

    plants.forEach(plant => {
        const div = document.createElement('div');
        div.className = 'plant';
        div.innerHTML = `
        <h2> ${plant.name} </h2>
        <button class="delete">X</button>
        <p> ${plant.description} </p>
        `;

        elements.plants.appendChild(div);
    })
})