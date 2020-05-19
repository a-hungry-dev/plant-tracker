const elPlants = document.querySelector('#plants');
const elGardenName = document.querySelector('#garden-name')

const url = window.location.pathname
const arr = url.split('/')
const id = arr[2];

window.addEventListener('DOMContentLoaded', async () => {
    try { response = await fetch(`/api/gardens/${id}`); }
    catch(error) { return res.json({ error }); }

    garden = await response.json()

    elGardenName.textContent = garden.name;
    
    plants = garden.plants;
    
    plants.forEach(plant => {
        const div = document.createElement('div');
        div.className = 'plant';
        div.innerHTML = `
        <h2> ${plant.name} </h2>
        <button class="delete">X</button>
        <p> ${plant.description} </p>
        `;

        elPlants.appendChild(div);
    })
})