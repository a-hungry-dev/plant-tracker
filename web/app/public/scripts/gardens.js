const elements = {
    gardens: document.querySelector('#gardens'),
    loading: document.querySelector('#loading')
};
// no need to wait for DOM content to load because we are
// loading the script tag last in the DOM and not
// waiting for content to load from external resources

// loading animations are good for letting users
// know that something is happening (on slower connections)
const loading = (bool) => {
    if (bool) {
        return elements.loading.style.display = "auto";
    }
    return elements.loading.style.display = "none";
}

const fetchGardens = async () => {
    loading(true)
    const response = await fetch('/api/gardens').catch(err => {
        // maybe display the error to the client
        alert(err);
    });
    const gardens = await response.json();
    gardens.forEach(garden => {
        appendGardenToGardens(garden);
    });
    loading(false)
};

fetchGardens()

// functional programming is great because
// it makes our code more readable and manageable
// try and split out the code as much as you can

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
