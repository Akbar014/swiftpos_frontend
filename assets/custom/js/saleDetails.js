const saletDetails = () => {
    const param = new URLSearchParams(window.location.search).get("saleId");

    fetch(`https://swiftpos-delta.vercel.app/salesapp/sales/${param}/`)
    .then((res) => res.json())
    .then((sale) => {
        fetch(`https://swiftpos-delta.vercel.app/personapp/customer/${sale.customer}/`)
        .then((res) => res.json())
        .then((customer) => {
            console.log(sale);       // Log the sale data
            console.log(customer);   // Log the customer data

            // Update the HTML elements with the sale and customer data
            document.getElementById("code").innerText = sale.code;
            document.getElementById("sale_date").innerText = sale.sale_date;
            document.getElementById("customer_name").innerText = customer.name;
            document.getElementById("phone").innerText = customer.phone;
            document.getElementById("address").innerText = customer.address;

            // Loop through sale.items and add rows to the table
            const tableBody = document.querySelector('.table-group-divider');
            tableBody.innerHTML = ''; // Clear existing rows if any

            // Use Promise.all to fetch all product names before updating the table
            const productPromises = sale.items.map((item) => {
                return fetch(`https://swiftpos-delta.vercel.app/productsapp/products/${item.product}/`)
                .then((res) => res.json())
                .then((product) => {
                    return { ...item, productName: product.name , productCode: product.code };
                });
            });

            Promise.all(productPromises)
            .then((itemsWithProductNames) => {
                itemsWithProductNames.forEach((item, index) => {
                    const total = item.quantity * item.unit_price;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${index + 1}</th>
                        <td>${item.productName}</td>
                        <td>${item.productCode}</td>
                        <th scope="row">${item.quantity}</th>
                        <td class="text-end">${item.unit_price}</td>
                        <td class="text-end">${total}</td>
                    `;
                    tableBody.appendChild(row);
                });

                // Optionally, you can calculate and display the subtotal, VAT, shipping, and total as well
                const subtotal = itemsWithProductNames.reduce((acc, item) => acc + item.quantity * item.unit_price, 0);
                const vat = (subtotal * 0.05).toFixed(2);
                const shipping = 15; // Example fixed shipping cost
                const total = (subtotal + parseFloat(vat) + shipping).toFixed(2);

                tableBody.innerHTML += `
                    <tr>
                        <td colspan="5" class="text-end">Subtotal</td>
                        <td class="text-end">${subtotal}</td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-end"> Discount (%)</td>
                        <td class="text-end">${sale.discount}%</td>
                    </tr>
                  
                    <tr>
                        <th scope="row" colspan="5" class="text-uppercase text-end">Grand Total</th>
                        <td class="text-end">${sale.total_amount}</td>
                    </tr>
                `;
            })
            .catch((err) => console.log(err));
        }) 
        .catch((err) => console.log(err));
    }) 
    .catch((err) => console.log(err));
}

saletDetails();
