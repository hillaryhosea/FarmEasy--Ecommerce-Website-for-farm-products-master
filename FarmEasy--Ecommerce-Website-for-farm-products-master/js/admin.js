

  //your-script.js

//Send a GET request when the page is loaded
window.addEventListener('load', () => {

fetch('http://localhost:5000/orders')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const orderTable = document.getElementById('order-table');

    // Create table headers
    const tableHeaders = `
      <tr>
        <th>Order ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Address</th>
        <th>Zip</th>
        <th>Order Date</th>
        <th>Products</th>
        <th>Total Price</th>
      </tr>
    `;
    
    orderTable.innerHTML = tableHeaders;

    data.createdOrders.forEach(order => {
      const orderDetails = JSON.parse(order.order);
      const totalPrice = orderDetails.reduce((total, item) => total + item.price * item.qty, 0);
      const productsList = orderDetails.map(item => `${item.product} (Qty: ${item.qty})`).join('<br>');

      const row = `
        <tr>
          <td>${order._id}</td>
          <td>${order.name}</td>
          <td>${order.email}</td>
          <td>${order.city}</td>
          <td>${order.address}</td>
          <td>${order.zip}</td>
          <td>${new Date(order.createdAt).toLocaleString()}</td>
          <td>${productsList}</td>
          <td>${totalPrice}</td>
        </tr>
      `;

      orderTable.innerHTML += row;
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


  });

  

