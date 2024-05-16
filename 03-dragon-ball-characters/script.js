// Select DOM elements
const grid = document.querySelector("#grid");
const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");
const btnWrapper = document.querySelector("#btn-wrapper");

let currentPage = 1; // Initialize current page
let limit = 4; // Number of items per page

// Function to fetch data from the API
async function fetchData(page, endpoint) {
  try {
    const res = await fetch(
      `https://dragonball-api.com/api/${endpoint}?page=${page}&limit=${limit}`
    );

    // Throw an error if the request fails
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    const data = await res.json();

    // Display the data based on the endpoint type
    if (endpoint === "characters") {
      displayCharacters(data.items);
    } else if (endpoint === "planets") {
      displayPlanets(data.items);
    }

    currentPage = page; // Update the current page
    updateUrl(page, endpoint); // Update the URL with the new page
    toggleButtonState(data.meta); // Toggle button states based on data
  } catch (error) {
    // Handle errors by displaying an error message
    btnWrapper.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<strong>${error.message}</strong>`;
    grid.appendChild(div);
  }
}

// Function to display character data
function displayCharacters(items) {
  grid.innerHTML = ""; // Clear previous content
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}"/>
      <div class="character-info">
        <div>
          <h2>${item.name}</h2>
          <p class="info-details">${item.race}</p>
        </div>
        <div>
          <h3>Base KI:</h3>
          <p class="info-details">${item.ki}</p>
        </div>
        <div>
          <h3>Total KI:</h3>
          <p class="info-details">${item.maxKi}</p>
        </div>
        <div>
          <h3>Affiliation:</h3>
          <p class="info-details">${item.affiliation}</p>
        </div>
      </div>
    `;
    grid.appendChild(div); // Append character card to the grid
  });
}

// Function to display planet data
function displayPlanets(items) {
  grid.innerHTML = ""; // Clear previous content
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" 
      onerror=handleImageError(this); />
      <div class="planet-info">
        <div>
          <h2>${item.name}</h2>
        </div>
      `;
    grid.appendChild(div); // Append planet card to the grid
  });
}

// Function to handle image errors
function handleImageError(img) {
  img.onerror = null; // Prevent infinite loop
  img.src = "images/no-image.svg"; // Fallback image
}

// Function to toggle the state of navigation buttons
function toggleButtonState(meta) {
  previousBtn.disabled = currentPage <= 1; // Disable previous button if on the first page

  const isLastPage = currentPage * limit >= meta.totalItems;
  nextBtn.disabled = isLastPage; // Disable next button if on the last page
}

// Function to update the URL with the current page and endpoint
function updateUrl(page, endpoint) {
  const newUrl = `${endpoint}.html?page=${page}`;
  history.pushState({ page }, `Page: ${page}`, newUrl);
}

// Event listener for DOMContentLoaded to initialize the page
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const endpoint = path.includes("planets") ? "planets" : "characters";

  fetchData(currentPage, endpoint); // Fetch initial data

  // Event listeners for next and previous buttons
  nextBtn.addEventListener("click", () => fetchData(currentPage + 1, endpoint));
  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) fetchData(currentPage - 1, endpoint);
  });
});
