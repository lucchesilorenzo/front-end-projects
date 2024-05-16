// Selecting DOM elements
const amountInput = document.querySelector("#amount-input");
const firstCurrency = document.querySelector("#first-currency");
const secondCurrency = document.querySelector("#second-currency");
const currencyConverterForm = document.querySelector(
  "#currency-converter-form"
);
const convertBtn = document.querySelector("#convert-btn");

// Function to fetch data from the given API endpoint
async function fetchData(endpoint) {
  try {
    const res = await fetch(`https://api.vatcomply.com/${endpoint}`);

    // Throw an error if the request fails
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    // Parse and return the JSON data
    const data = await res.json();
    return data;
  } catch (error) {
    // Handle errors by displaying an error message to the user
    const wrapper = document.querySelector(".wrapper");

    // Remove all existing children of the wrapper
    while (wrapper.firstChild) {
      wrapper.firstChild.remove();
    }

    // Create and display an error message
    const div = document.createElement("div");
    div.innerText =
      "Error: An error occurred while attempting to fetch data. Please try again later.";
    div.style.margin = "10px";
    div.style.fontSize = "20px";
    wrapper.appendChild(div);
  }
}

// Function to fetch and populate the list of currencies
async function fetchCurrencies() {
  const data = await fetchData("currencies");

  // Populate the dropdowns with currency options
  Object.keys(data).forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    firstCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    secondCurrency.appendChild(option2);
  });
}

// Function to fetch exchange rates and perform the conversion
async function fetchRates(e) {
  e.preventDefault(); // Prevent form submission

  // Fetch exchange rates based on the selected base currency
  const data = await fetchData(`rates?base=${firstCurrency.value}`);
  const amount = parseFloat(amountInput.value); // Get the amount to convert

  // Loop through the exchange rates to find the target currency rate
  Object.keys(data.rates).forEach((currency) => {
    if (currency === firstCurrency.value) {
      const primaryCurrency = currency;
      for (const [currency, rate] of Object.entries(data.rates)) {
        if (currency === secondCurrency.value) {
          const secondaryCurrency = currency;

          // Remove any existing conversion result
          const existingDiv = document.querySelector("#converted-currency");
          existingDiv && existingDiv.remove();

          // Create and display the conversion result
          const convertedCurrency = document.createElement("div");
          convertedCurrency.id = "converted-currency";

          const convertedValue = (amount * rate).toFixed(2);
          convertedCurrency.innerHTML = `${amount} ${primaryCurrency} = ${convertedValue} ${secondaryCurrency}`;

          // Insert the conversion result after the h1 element
          const h1 = document.querySelector("h1");
          h1.insertAdjacentElement("afterend", convertedCurrency);

          // Reset input values
          amountInput.value = "";
          firstCurrency.value = "";
          secondCurrency.value = "";

          // Remove the conversion result after 15 seconds
          setTimeout(() => convertedCurrency.remove(), 15000);

          break;
        }
      }
    }
  });
}

// Event listener to populate currencies once the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchCurrencies);

// Event listener to handle form submission and fetch exchange rates
currencyConverterForm.addEventListener("submit", fetchRates);
