
function allProducts(){
    fetch(`https://swiftpos-delta.vercel.app/productsapp/products/`)
    .then((res) => res.json())
    // .then((data)=> console.log(data)) 
    .then((data)=> displayProductData(data))
    .catch((err)=> console.log(err));
}

function displayProductData(products){
    
    const parent = document.getElementById("products");

    products.forEach(product => {
        console.log(product);
        const div = document.createElement("div");
        div.classList.add("col-md-4", "text-center", "product");
        const productImage = product.image ? product.image : 'assets/img/def_product.png'; 

        // if (productImage ) {
        //     productImage.src = data.image ? data.image : 'assets/img/def_product.png'; 
        // }
        
        div.innerHTML = `
            <div class="card" onclick="add_to_purchase(${product.id})">
                <img src="${productImage}" class="card-img-top " alt="Product Image">
                <div class="">
                    <h6 class="" id="code" >${product.code}</h6>
                    
                </div>
            </div>
  
        `
        parent.appendChild(div);

    });

}


function addProduct(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const productId = document.getElementById("productId").value ;
    const categoryId = document.getElementById("category").value ;
    if(categoryId==0){
        swal({
            title:   "Error!" ,
            text:   "Please select category!",
            icon: "error",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        })
    }

    // console.log(data);
    const imageField = document.getElementById("image");
    if (imageField && imageField.files.length === 0) {
        formData.delete('image'); // Remove the image field from formData if no new image is selected
    }
    
    let url = 'https://swiftpos-delta.vercel.app/productsapp/products/';
    let method = 'POST';

    if (productId>0) {
        url += `${productId}/`; // Append the product ID to the URL
        method = 'PATCH'; 
    }
    
    fetch(url, {
        method: method,
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: formData // Send the FormData object directly
    })
    .then(response => response.json())
    .then(data => {
        if(data.category){
            // alert("Please select category")
           
            // .then(() => {
            //     window.location.href = "products.html";
            // });
        }else{
            swal({
                title: method === 'POST' ? "Success!" : "Updated!",
                text: method === 'POST' ? "Product added successfully!" : "Product updated successfully!",
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            }).then(() => {
                window.location.href = "products.html";
            });
        }
        

    }

)
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('Error creating entry.');
    // });
}



function editProductInfo(id){
    fetch(`https://swiftpos-delta.vercel.app/productsapp/products/${id}/`)
    .then((res) => res.json())
    .then((data) => {

        document.getElementById("productId").value = data.id;
        document.getElementById("productName").value = data.name
        document.getElementById("code").value = data.code
        document.getElementById("quantity").value = data.product_quantity
        document.getElementById("unit").value = data.unit
        document.getElementById("purchase_price").value = data.purchase_price
        document.getElementById("sales_price").value = data.sales_price
        document.getElementById("description").value = data.description
        document.getElementById("category").value = data.category
        document.getElementById("saveOrUpdateBtn").textContent = 'Update Product'
       

        const productImage = document.getElementById('imagePreview');

        if (productImage ) {
            productImage.src = data.image ? data.image : 'assets/img/def_product.png'; 
        }


    })
}

function clearProductModal(){
        document.getElementById("productId").value = 0;
        document.getElementById("productName").value = ''
        document.getElementById("code").value = ''
        document.getElementById("quantity").value = ''
        document.getElementById("unit").value = ''
        document.getElementById("purchase_price").value = ''
        document.getElementById("sales_price").value = ''
        document.getElementById("description").value = ''
        document.getElementById("category").value = '0'

        const productImage = document.getElementById('imagePreview');

        if (productImage ) {
            productImage.src =  'assets/img/def_product.png'; 
        }


}


function addCategory(event) {
    event.preventDefault(); 
    
    const form = document.getElementById('addCategoryForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const categoryId = document.getElementById("categoryId").value ;
    if(categoryId==0){

    }

    let url = 'https://swiftpos-delta.vercel.app/productsapp/category/';
    let method = 'POST';

    if (categoryId>0) {
        url += `${categoryId}/`; 
        method = 'PATCH'; 
    }
    
    fetch(url, {
        method: method,
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        swal({
            title: method === 'POST' ? "Success!" : "Updated!",
            text: method === 'POST' ? "Category added successfully!" : "Category updated successfully!",
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "category.html";
        });

    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating entry.');
    });
}



function editCategoryInfo(id){
    fetch(`https://swiftpos-delta.vercel.app/productsapp/category/${id}/`)
    .then((res) => res.json())
    .then((data) => {

        document.getElementById("categoryId").value = data.id;
        document.getElementById("categoryName").value = data.name
        document.getElementById("description").value = data.description
        document.getElementById("saveOrUpdateBtn").textContent = 'Update Product'

    })
}

function clearCategoryModal(){
    document.getElementById("categoryId").value = 0;
    document.getElementById("categoryName").value = ''
    document.getElementById("description").value = ''
}

function previewImage() {
    const input = document.getElementById('image');
    const preview = document.getElementById('imagePreview');
    
    const file = input.files[0]; // Get the first file
    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result; // Set the image's src to the file's data URL
    };

    if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        preview.src = ""; // Clear the preview if no file is selected
    }
}

function add_to_purchase(product_id){
    
    fetch(`https://swiftpos-delta.vercel.app/productsapp/products/${product_id}/`)
    .then((res) => res.json())
    .then((data)=> addProductToPurchase(data))
    .catch((err)=> console.log(err));
}

function addProductToPurchase(product) {
    const parent = document.getElementById("purchaseProduct");
    const existingProductRow = document.querySelector(`#purchaseProduct tr[data-code="${product.code}"]`);
    let grandTotalElement = document.getElementById("grand_total");
    let grandTotal = parseFloat(grandTotalElement.textContent) || 0;

    if (existingProductRow) {
        // Update existing product's quantity and total price
        const quantityInput = existingProductRow.querySelector('input.quantity-input');
        const unitPrice = parseFloat(existingProductRow.querySelector('#unit_price').textContent);
        let quantity = parseInt(quantityInput.value) + 1;
        quantityInput.value = quantity;
        
        const newTotal = unitPrice * quantity;
        existingProductRow.querySelector('#total_price').textContent = newTotal.toFixed(2);

        // Update grand total
        grandTotal += unitPrice;
        grandTotalElement.textContent = `${grandTotal.toFixed(2)} BDT `;
        document.getElementById("grand_total_dis").textContent  = document.getElementById("grand_total").textContent

    } else {
        // Add new product to the table
        const tr = document.createElement("tr");
        tr.setAttribute("data-code", product.code);  // Set product code as data attribute for future checks
        
        const total = parseFloat(product.purchase_price);
        tr.innerHTML = `
            <td class="serial"></td>
            <td id="name"  data-product-id="${product.id}">${product.name}</td>
            <td id="code">${product.code}</td>
            <td>
                <input id="quantity" type="number" class="form-control quantity-input" value="1" min="1">
            </td>
            <td id="unit_price">${total.toFixed(2)}</td>
            <td id="total_price">${total.toFixed(2)}</td>
        `;
        parent.appendChild(tr);

        // Update grand total
        grandTotal += total;
        grandTotalElement.textContent = `${grandTotal.toFixed(2)} BDT `;
        document.getElementById("grand_total_dis").textContent  = document.getElementById("grand_total").textContent

        // Add event listener for quantity change
        tr.querySelector('.quantity-input').addEventListener('input', function() {
            const quantity = parseInt(this.value);
            const unitPrice = parseFloat(tr.querySelector('#unit_price').textContent);
            const newTotal = unitPrice * quantity;
            tr.querySelector('#total_price').textContent = newTotal.toFixed(2);
            document.getElementById("grand_total_dis").textContent  = document.getElementById("grand_total").textContent

            // Recalculate grand total
            updateGrandTotal();
        });
    }

    // Update the serial numbers after adding or updating a product
    updateSerialNumbers();
}

// Function to update grand total
function updateGrandTotal() {
    const rows = document.querySelectorAll('#purchaseProduct tr');
    let grandTotal = 0;

    rows.forEach(row => {
        const totalPrice = parseFloat(row.querySelector('#total_price').textContent);
        grandTotal += totalPrice;
    });

    document.getElementById("grand_total").textContent = `${grandTotal.toFixed(2)} BDT `;
    document.getElementById("grand_total_dis").textContent  = document.getElementById("grand_total").textContent
}

function totalAfterDiscount(){
    const amount = document.getElementById("discount").value;
    if(amount==0){
        document.getElementById("grand_total_dis").textContent  = document.getElementById("grand_total").textContent
    }
    const total = parseInt(document.getElementById("grand_total").textContent);
    const discount_amount = total * (amount/100);

    const amount_after_discount = total - discount_amount ;
    console.log(amount_after_discount);
    document.getElementById("grand_total_dis").textContent = `${amount_after_discount.toFixed(2)} BDT `;

}

// Function to update serial numbers
function updateSerialNumbers() {
    const rows = document.querySelectorAll('#purchaseProduct tr');
    rows.forEach((row, index) => {
        row.querySelector('.serial').textContent = index + 1;
    });
}




function allSupplier() {
    fetch(`https://swiftpos-delta.vercel.app/personapp/supplier/`)
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("supplier");
           
            parent.innerHTML = '<option selected >Select Supplier</option>';
            data.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id; 
                option.textContent = supplier.name; 
                parent.appendChild(option);
            });
        })
        .catch((err) => console.log(err));
}

function allCustomer() {
    fetch(`https://swiftpos-delta.vercel.app/personapp/customer/`)
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("customer");
           
            parent.innerHTML = '<option selected >Select Customer</option>';
            data.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id; 
                option.textContent = customer.name; 
                parent.appendChild(option);
            });
        })
        .catch((err) => console.log(err));
}

function allCategory() {
    fetch(`https://swiftpos-delta.vercel.app/productsapp/category/`)
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("category");
           
            parent.innerHTML = '<option selected disabled value="0" >Select Category</option>';
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; 
                option.textContent = category.name; 
                parent.appendChild(option);
            });
        })
        .catch((err) => console.log(err));
}


function submitPurchase(event) {
    event.preventDefault();
    const supplier = parseInt(document.getElementById('supplier').value); // Convert to integer
    const user = parseInt(localStorage.getItem("user_id")); // Ensure this is stored as an integer
    const purchaseItems = [];
    const rows = document.querySelectorAll('#purchaseProduct tr');

    rows.forEach(row => {
        const product = parseInt(row.querySelector('#name').getAttribute('data-product-id'), 10);
        const quantity = parseInt(row.querySelector('.quantity-input').value);
        const unitPrice = parseFloat(row.querySelector('#unit_price').textContent);
        
        purchaseItems.push({
            product: product, 
            quantity: quantity,
            unit_price: unitPrice,
        });

    });

    const purchaseData = {
        code: 1234, 
        supplier: supplier,
        user: user,
        total_amount: parseFloat(document.getElementById('grand_total_dis').textContent),
        items: purchaseItems,

    };

    fetch('https://swiftpos-delta.vercel.app/purchaseapp/purchases/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(purchaseData),
    })
    .then(response => 
        {
            if (!response.ok) {
                return response.json().then(errorData => {
                    document.getElementById("alert").innerText = ' Select Supplier To Purchase Successfully ';
                    throw new Error(JSON.stringify(errorData));
                });
            }
            return response.json();
        }
    )
    .then(data => {
        // Optionally, clear the form or give feedback to the user
        swal({
            title: "Success!",
            text: "Product Purchases successfully!",
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "allPurchase.html";
        });
    })
    .catch(error => {
        console.error('Error creating purchase:', error);
    });
}
 

function submitSale(event) {
    event.preventDefault();
    const customer = parseInt(document.getElementById('customer').value); // Convert to integer
    const user = parseInt(localStorage.getItem("user_id")); // Ensure this is stored as an integer
    const discount = document.getElementById("discount").value;
    
    const saleItems = [];
    const rows = document.querySelectorAll('#purchaseProduct tr');

    rows.forEach(row => {
        const product = parseInt(row.querySelector('#name').getAttribute('data-product-id'), 10);

        const quantity = parseInt(row.querySelector('.quantity-input').value);
        const unitPrice = parseFloat(row.querySelector('#unit_price').textContent);
        console.log(product)
        saleItems.push({
            product: product, 
            quantity: quantity,
            unit_price: unitPrice,
        });

    });

    if(saleItems.length <= 0){
        swal({
            title: "Error!",
            text: "Select Product First!",
            icon: "error", 
            buttons: { 
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "sale.html";
        });
    }

    const saleData = {

        code: 1234, 
        customer: customer,
        total_amount: parseInt(document.getElementById('grand_total_dis').textContent),
        discount: discount,
        items: saleItems,

        // "code": 12345,
        // "user": user,
        // "customer": customer,
        // "total_amount": parseFloat(document.getElementById('grand_total').textContent),
        // "items": [
        //     {"product": 1, "quantity": 10, "unit_price": 100},
        //     {"product": 2, "quantity": 5, "unit_price": 200}
        // ]
    };

    console.log(saleData)

    fetch('https://swiftpos-delta.vercel.app/salesapp/sales/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(saleData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                document.getElementById("alert").innerText = ' Select Customer To Sale Successfully ';
                throw new Error(JSON.stringify(errorData));
            });
        }
        return response.json();
    })
    .then(data => {
        // Optionally, clear the form or give feedback to the user
        swal({
            title: "Success!",
            text: "Sale Created successfully!",
            icon: "success", 
            buttons: { 
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "allSale.html";
        });
    })
    .catch(error => {
        console.error('Error creating sale:', error);
    });
}

function saleDetails(){
    const param = new URLSearchParams(window.location.search).get("donorRequestId");
    console.log(param);
    fetch(`https://swiftpos-delta.vercel.app/salesapp/sales/${param}/`)
    .then((res) => res.json())
    .then((data)=> {
        console.log(data.code)
        
        window.location.href = "saleDetails.html"
        document.getElementById("code").innerText = data.code
    }) 
    // .then((data)=> displayProductData(data))
    .catch((err)=> console.log(err));
}


// Helper function to get CSRF token from cookies (if needed)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




allCustomer();
allCategory();
allProducts();
allSupplier();