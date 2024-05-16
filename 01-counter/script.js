// Select DOM elements
const decreaseBtn = document.querySelector("#decrease-btn");
const resetBtn = document.querySelector("#reset-btn");
const increaseBtn = document.querySelector("#increase-btn");
const counter = document.querySelector("#counter");

// Initialize the counter value
let count = 0;

// Function to increase the counter
function increaseCounter() {
  count++; // Increment the counter
  checkNumber(count); // Check if the number is even or odd
  counter.textContent = count; // Update the display
}

// Function to decrease the counter
function decreaseCounter() {
  if (count === 0) {
    alert("You can't go below 0!"); // Alert if counter is already 0
    return;
  }
  count--; // Decrement the counter
  checkNumber(count); // Check if the number is even or odd
  counter.textContent = count; // Update the display
}

// Function to reset the counter
function resetCounter() {
  count = 0; // Reset the counter to 0
  checkNumber(count); // Check if the number is even or odd
  counter.textContent = 0; // Update the display
}

// Function to check if the number is even or odd
function checkNumber(number) {
  if (number % 2 !== 0) {
    // If the number is odd
    counter.classList.remove("even"); // Remove 'even' class
    counter.classList.add("odd"); // Add 'odd' class
  } else {
    // If the number is even
    counter.classList.remove("odd"); // Remove 'odd' class
    counter.classList.add("even"); // Add 'even' class
  }
}

// Initialization function to set up event listeners
function init() {
  increaseBtn.addEventListener("click", increaseCounter); // Event listener for increasing the counter
  decreaseBtn.addEventListener("click", decreaseCounter); // Event listener for decreasing the counter
  resetBtn.addEventListener("click", resetCounter); // Event listener for resetting the counter
}

// Call the init function to initialize the app
init();
