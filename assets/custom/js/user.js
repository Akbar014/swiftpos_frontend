
function addUser(event) {
    event.preventDefault(); 
    
    const form = document.getElementById('addUserForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const userId = document.getElementById("userId").value ;

    console.log(data);
    let url = 'https://swiftpos-delta.vercel.app/personapp/register/';
    let method = 'POST';

    if (userId>0) {
        url = `https://swiftpos-delta.vercel.app/personapp/users/${userId}/`; 
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
            text: method === 'POST' ? "user added successfully!" : "user updated successfully!",
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = "user.html";
        });

    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating entry.');
    });
}

function edituserInfo(id){
    fetch(`https://swiftpos-delta.vercel.app/personapp/users/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        document.getElementById("userId").value = data.id;
        document.getElementById("userName").value = data.username;
        document.getElementById("firstName").value = data.first_name;
        document.getElementById("lastName").value = data.last_name;
        document.getElementById("phone").value = data.phone;
        document.getElementById("address").value = data.address;
        document.getElementById("role").value = data.role;
        document.getElementById("email").value = data.email;
        document.getElementById("is_active").checked  = data.is_active;
        const userImage = document.getElementById('imagePreview');

        if (userImage ) {
            userImage.src = data.image ? data.image : 'assets/img/def_product.png'; 
        }
         document.getElementById("saveOrUpdateBtn").textContent = 'Update user'

    })
}

function clearuserModal(){
    document.getElementById("userId").value = 0;
    document.getElementById("userName").value = '';
        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("address").value = '';
        document.getElementById("role").value = '';
        document.getElementById("email").value = '';
        document.getElementById("is_active").checked  = '';
        const userImage = document.getElementById('imagePreview');
        userImage.src =  'assets/img/profile.jpg';
}

