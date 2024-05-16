// Select DOM elements
const itemInput = document.querySelector("#item-input");
const itemForm = document.querySelector("#item-form");
const itemSubmit = document.querySelector("#item-submit");
const itemList = document.querySelector("#item-list");
const emptyListBtn = document.querySelector("#empty-list");
const clearCompletedBtn = document.querySelector("#clear-completed");

// Function to add a new item to the list
function addItem(e) {
  e.preventDefault(); // Prevent form submission

  const newItem = itemInput.value.trim(); // Get and trim the input value

  if (newItem === "") {
    alert("Please fill in the field"); // Alert if input is empty
    return;
  }

  if (checkForDuplicates(newItem)) {
    itemInput.value = ""; // Clear input if item is duplicate
    return;
  }

  // Create a new list item and append it to the list
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  itemList.appendChild(li);

  addItemToStorage(li.textContent); // Add item to local storage

  itemInput.value = ""; // Clear input
}

// Function to remove all items from the list
function emptyItems() {
  while (itemList.firstElementChild) {
    itemList.firstElementChild.remove();
    clearItems(); // Clear items from local storage
  }
}

// Function to mark an item as completed (line-through) on double-click
function checkItemStatus(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.add("line-through");
  }
}

// Function to clear the completed status of all items
function clearItemStatus() {
  Array.from(itemList.children).forEach((item) =>
    item.classList.remove("line-through")
  );
}

// Function to get items from local storage
function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// Function to add an item to local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Function to clear all items from local storage
function clearItems() {
  localStorage.clear();
}

// Function to check for duplicate items in the list
function checkForDuplicates(item) {
  let isDuplicate = false;

  Array.from(itemList.children).forEach((el) => {
    if (el.textContent === item) {
      alert("The item is already in the list!"); // Alert if item is duplicate
      isDuplicate = true;
    }
  });
  return isDuplicate;
}

// Function to render items from local storage when the page loads
function renderItemsFromStorage() {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    itemList.appendChild(li);
  });
}

// Initialization function to set up event listeners and render stored items
function init() {
  itemForm.addEventListener("submit", addItem); // Event listener for form submission
  emptyListBtn.addEventListener("click", emptyItems); // Event listener for emptying the list
  itemList.addEventListener("dblclick", checkItemStatus); // Event listener for marking items as completed
  clearCompletedBtn.addEventListener("click", clearItemStatus); // Event listener for clearing completed status
  renderItemsFromStorage(); // Render stored items on page load
}

// Call the init function to initialize the app
init();
