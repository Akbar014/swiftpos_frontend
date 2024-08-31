
function addSupplier(event) {
    event.preventDefault(); 
    
    const form = document.getElementById('addSupplierForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const supplierId = document.getElementById("supplierId").value ;

    console.log(data);
    let url = 'https://swiftpos.onrender.com/personapp/supplier/';
    let method = 'POST';

    if (supplierId>0) {
        url += `${supplierId}/`; 
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
        console.log(data);
        swal({
            title: method === 'POST' ? "Success!" : "Updated!",
            text: method === 'POST' ? "Supplier added successfully!" : "Supplier updated successfully!",
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "supplier.html";
        });

    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating entry.');
    });
}

function editSupplierInfo(id){
    fetch(`https://swiftpos.onrender.com/personapp/supplier/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("supplierId").value = data.id;
        document.getElementById("supplierName").value = data.name;
        document.getElementById("CompanyName").value = data.company_name;
        document.getElementById("phone").value = data.phone;
        document.getElementById("address").value = data.address;
         document.getElementById("saveOrUpdateBtn").textContent = 'Update Supplier'

    })
}

function clearSupplierModal(){
    document.getElementById("supplierId").value = 0;
    document.getElementById("supplierName").value = ''
    document.getElementById("CompanyName").value = ''
    document.getElementById("phone").value = ''
    document.getElementById("address").value = ''
}

