function profileInfo(){
    const userId = localStorage.getItem("user_id")
    console.log(userId)
    fetch(`https://swiftpos.onrender.com/personapp/users/${userId}/`)
    .then((res) => res.json())
    .then ((data) => {
        const full_name = data.first_name + ' ' + data.last_name
        document.getElementById("full_name").innerText = full_name
        document.getElementById("email").innerText = data.email
        document.getElementById("phone").innerText = data.phone

        const profileImage = document.getElementById('profile-img');

            if (profileImage && data.image) {
                profileImage.src = data.image; 
            }


        // update profile 

    
        document.getElementById('first_name').value = data.first_name;
        document.getElementById('last_name').value = data.last_name;
        document.getElementById('username').value = data.username;
        document.getElementById('mobile_no').value = data.phone;
        document.getElementById('address').value = data.address;
    })

    // fetch(`https://swiftpos.onrender.com/productsapp/products/`)
    // .then((res) => res.json())
    // // .then((data)=> console.log(data)) 
    // .then((data)=> displayProductData(data))
    // .catch((err)=> console.log(err));

}

profileInfo()


const editProfileInfo = (event) => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');
    console.log("user edit")
    console.log(user_id)
    // Gather form data
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const mobile_no = document.getElementById('mobile_no').value;
    const address = document.getElementById('address').value;
    const image = document.getElementById('image').files[0]; // Get the selected file


    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('phone', mobile_no);
    formData.append('address', address);
    if (image) {
        formData.append('image', image); // Append the file if it exists
    }


    fetch(`https://swiftpos.onrender.com/personapp/users/${user_id}/`, {
        method: 'PATCH',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        // body: JSON.stringify(formData),
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Profile updated:', data);
        // Optionally, redirect to another page or show a success message
    })
    .catch((error) => console.log("error"));
};