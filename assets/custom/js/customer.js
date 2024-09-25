
function addCustomer(event) {
    event.preventDefault(); 
    
    const form = document.getElementById('addSupplierForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const customerId = document.getElementById("customerId").value ;

    console.log(data);
    let url = 'https://swiftpos-delta.vercel.app/personapp/customer/';
    let method = 'POST';

    if (customerId>0) {
        url += `${customerId}/`; 
        method = 'PUT'; 
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
        // console.log(data);
        swal({
            title: method === 'POST' ? "Success!" : "Updated!",
            text: method === 'POST' ? "Customer added successfully!" : "Customer updated successfully!",
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "customer.html";
        });

    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating entry.');
    });
}

function editCustomerInfo(id){
    fetch(`https://swiftpos-delta.vercel.app/personapp/customer/${id}/`)
    .then((res) => res.json())
    .then((data) => {

        console.log(data);

        document.getElementById("customerId").value = data.id;
        document.getElementById("customerName").value = data.name;
        document.getElementById("phone").value = data.phone;
        document.getElementById("address").value = data.address;
        document.getElementById("saveOrUpdateBtn").textContent = 'Update Customer'

    })
}

function clearCustomerModal(){
    document.getElementById("customerId").value = 0;
    document.getElementById("customerName").value = ''
    document.getElementById("phone").value = ''
    document.getElementById("address").value = ''
}

