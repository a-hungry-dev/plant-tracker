const elements = {
    gardens: document.querySelector('#gardens'),
    loading: document.querySelector('#loading')
};

const loading = (bool) => {
    if (bool) {
        return elements.loading.style.display = "auto";
    }
    return elements.loading.style.display = "none";
}

const fetchGardens = async () => {
    loading(true)
    const response = await fetch('/api/gardens').catch(err => {
        alert(err);
    });
    const gardens = await response.json();
    gardens.forEach(garden => {
        appendGardenToGardens(garden);
    });
    loading(false)
};

fetchGardens()

const appendGardenToGardens = (garden) => {
    const a = document.createElement('a');
    a.href = `/gardens/${garden.id}`;
    a.innerHTML = `
            <div class="garden">
                <p> ${garden.name} </p>
                <span> ${garden.plants.length} plants </span>
            </div>
        `;
    elements.gardens.appendChild(a);
};
