const form = document.getElementById('checkout-order-form');
const submitButton = document.getElementById('submit-order');

submitButton.addEventListener('click', async function (event) {
  // Get the form data.
  const formData = new FormData(form);
  console.log(formData);
  

  // Create a new fetch request.
  const request = await fetch("http://localhost:5000/shipping", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData))
})
  // Prevent the default refreshing.
  event.preventDefault();

  // Handle the response.
  if (request.status === 200) {
    // The request was successful.
    console.log('The request was successful.');
  } else {
    // The request failed.
    console.log('The request failed.');
  }
});

console.log("yoow");