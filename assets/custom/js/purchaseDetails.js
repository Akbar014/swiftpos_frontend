const purchasetDetails = () => {
    const param = new URLSearchParams(window.location.search).get("purchaseId");
    // alert(param);

    fetch(`https://swiftpos.onrender.com/purchaseapp/purchases/${param}/`)
    .then((res) => res.json())
    .then((purchase) => {
        fetch(`https://swiftpos.onrender.com/personapp/supplier/${purchase.supplier}/`)
        .then((res) => res.json())
        .then((supplier) => {
            console.log(purchase);       // Log the purchase data
            console.log(supplier);   // Log the customer data

            // Update the HTML elements with the purchase and customer data
            document.getElementById("code").innerText = purchase.code;
            document.getElementById("purchase_date").innerText = purchase.purchase_date;
            document.getElementById("customer_name").innerText = supplier.name;
            document.getElementById("phone").innerText = supplier.phone;
            document.getElementById("address").innerText = supplier.address;

            // Loop through purchase.items and add rows to the table
            const tableBody = document.querySelector('.table-group-divider');
            tableBody.innerHTML = ''; // Clear existing rows if any

            // Use Promise.all to fetch all product names before updating the table
            const productPromises = purchase.items.map((item) => {
                return fetch(`https://swiftpos.onrender.com/productsapp/products/${item.product}/`)
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


                tableBody.innerHTML += `
                    
                    <tr>
                        <th scope="row" colspan="5" class="text-uppercase text-end">Grand Total</th>
                        <td class="text-end">${purchase.total_amount}</td>
                    </tr>
                `;
            })
            .catch((err) => console.log(err));
        }) 
        .catch((err) => console.log(err));
    }) 
    .catch((err) => console.log(err));
}

purchasetDetails();
