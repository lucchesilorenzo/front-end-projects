// Select the button and blockquote elements from the DOM
const randomQuoteBtn = document.querySelector("button");
const blockQuote = document.querySelector("blockquote");

// Function to fetch and display a random quote
async function getRandomQuote() {
  try {
    // Fetch a random quote from the API
    const res = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");

    // Throw an error if the request fails
    if (!res.ok) {
      throw new Error("There was an error while fetching data.");
    }

    // Remove any existing paragraph element inside the blockquote
    const existingParagraphElement = document.querySelector("p");
    if (existingParagraphElement) {
      existingParagraphElement.remove();
    }

    // Parse and use the JSON data
    const data = await res.json();

    // Display the blockquote element and update its content with the quote and author
    blockQuote.style.display = "block";
    blockQuote.innerHTML = `
      <p>${data[0].quote}</p>
      <cite>— ${data[0].author}</cite>
    `;
  } catch (error) {
    // Handle errors by displaying an error message inside the blockquote

    // Remove any existing paragraph element inside the blockquote
    const existingParagraphElement = document.querySelector("p");
    if (existingParagraphElement) {
      existingParagraphElement.remove();
    }

    // Display the blockquote element and show the error message
    blockQuote.style.display = "block";
    const p = document.createElement("p");
    p.innerHTML = `An error occurred! ${error.message}`;
    blockQuote.appendChild(p);
  }
}

// Event listener to fetch and display a new quote when the button is clicked
randomQuoteBtn.addEventListener("click", getRandomQuote);
