const elements = {
    plants: document.querySelector('#plants'),
    gardenName: document.querySelector('#garden-name'),
    loading: document.querySelector('#loading')
}

const id = window.location.pathname.split("/")[2];

const loading = (bool) => {
    if (bool) {
        return elements.loading.style.display = "auto";
    }
    return elements.loading.style.display = "none";
}

const fetchPlants = async () => {
    loading(true);

    try { response = await fetch(`/api/gardens/${id}`); }
    catch(error) { alert(error); }

    const garden = await response.json();

    elements.gardenName.textContent = garden.name;

    const plants = garden.plants

    plants.forEach(plant => appendPlantToGarden(plant));

    loading(false);
}

const appendPlantToGarden = (plant) => {
    const div = document.createElement('div');
    div.className = 'plant';
    div.innerHTML = `
    <h2> ${plant.name} </h2>
    <button class="delete">X</button>
    <p> ${plant.description} </p>
    `;

    elements.plants.appendChild(div);
}

fetchPlants();