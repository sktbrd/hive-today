async function converter(numero) {
  try {
    // Convert input to a number to ensure calculations are valid
    const numericValue = Number(numero);

    // Check if the conversion resulted in a valid number
    if (isNaN(numericValue)) {
      document.querySelector('#result').textContent = "Please enter a valid number.";
      return; // Exit the function if not a valid number
    }

    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd");
    if (response.ok) {
      const data = await response.json();

      // Check if data['hive'].usd exists and is a number
      if (data['hive'] && typeof data['hive'].usd === 'number') {
        const resultTofix = data['hive'].usd * numericValue;
        document.querySelector('#result').textContent = resultTofix.toFixed(2) + " USD";
      } else {
        // Handle unexpected structure or missing data
        document.querySelector('#result').textContent = "Currency data is unavailable.";
      }
    } else {
      // Handle the case where the fetch request fails
      document.querySelector('#result').textContent = "Failed to fetch currency data.";
    }
  } catch (error) {
    // Catch and handle any errors that occur during the fetch or processing
    console.error("Error during conversion:", error);
    document.querySelector('#result').textContent = "An error occurred.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('#btn').addEventListener('click', function () {
    let numero = document.querySelector('#numero').value;
    converter(numero);
  });
});
