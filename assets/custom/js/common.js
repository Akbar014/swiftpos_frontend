
function loadHeader() {
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
        const user_id = localStorage.getItem("user_id");

        // loadScript('path/to/first-script.js');

        fetch(`https://swiftpos-delta.vercel.app/personapp/users/${user_id}/`)
        .then((res) => res.json())
        .then ((info)=> {
            document.getElementById('profile_username').innerHTML = info.username;
            document.getElementById('profile_username1').innerHTML = info.username;
            document.getElementById('profile_email').innerHTML = info.email;
            const profileImage = document.getElementById('profile_image');
            const profileImage1 = document.getElementById('profile_image1');

            if (profileImage && info.image) {
                profileImage.src = info.image; 
            }
            if (profileImage1 && info.image) {
                profileImage1.src = info.image; 
            }


        })
        
        // navbarOption();
        // userload();
      });
  }



function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = false; // Ensures the scripts are executed in order
    document.body.appendChild(script);
}

function loadSidebar() {
    fetch('sidebar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('sidebar').innerHTML = data;
        console.log("loadSidebar");
        // navbarOption();
        sidebarActive();
        sidebarOption();
        // userload();
      });
}


// function loadSidebar() {
//     fetch('sidebar.html')
//         .then(response => response.text())
//         .then(data => {
//             // Insert the sidebar content
//             document.getElementById('sidebar').innerHTML = data;

//             // Find all script tags within the sidebar content
//             const sidebarElement = document.getElementById('sidebar');
//             const scripts = sidebarElement.querySelectorAll('script');

//             // Reinsert and execute each script
//             scripts.forEach((script) => {
//                 const newScript = document.createElement('script');
//                 if (script.src) {
//                     // If the script has a src attribute, load it dynamically
//                     newScript.src = script.src;
//                 } else {
//                     // Otherwise, reinsert the inline script
//                     newScript.textContent = script.innerHTML;
//                 }
//                 document.body.appendChild(newScript);

//                 // Optionally, remove the original script tag
//                 script.remove();
//             });
//         });
// }


function loadFooter() {
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer-container').innerHTML = data;
   
    });
}

function sidebarActive(){

  const currentPage = window.location.pathname.split('/').pop();

  const navItems = document.querySelectorAll('.nav-item');
 

  navItems.forEach((item) => {

    const linkPage = item.querySelector('a').getAttribute('href');


    if (linkPage === currentPage) {

      item.classList.add('active');

    } else {

      item.classList.remove('active');
    }
  });
}


function securePage(){
    const pageUrl = getCurrentFilename();
    const token = localStorage.getItem('token');
    // window.location.href = token ? pageUrl : 'login.html';
    if (!token && pageUrl !== 'index.html') {
        window.location.href = 'index.html';
    }

    // Optional: Redirect to a default page if authenticated and on login.html
    // if (token && pageUrl === 'login.html') {
    //     window.location.href = 'index.html'; // Replace with your default page
    // }
    
}



document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadSidebar();
    securePage(); 
});

document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});


document.addEventListener('DOMContentLoaded', () => {
    
    handleNavLinkClicks();
});

function getCurrentURL () {
    return window.location.href
}

function getCurrentFilename() {
    const urlPath = window.location.pathname; // Get the path part of the URL
    const filename = urlPath.substring(urlPath.lastIndexOf('/') + 1); // Extract the filename
    return filename;
}

function navbarOption (){
    
 // Remove the 'active' class from any other active links

 const currentActiveLink = document.querySelector('li.nav-item.active');
 if (currentActiveLink) {
    currentActiveLink.classList.remove('active');
}


const url = getCurrentURL();
const pathName = url.split('/').pop().split('.')[0]; // Get the last part of the URL path without extension
const currentHash = location.hash;



if (url.includes('dashboard')) {
    const NavLink = document.querySelector(`li.nav-item[href*="${pathName}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (pathName.includes('products')) {
    const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
}

if (url.includes('about')) {
    const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('section_4')) {
    const NavLink = document.querySelector('a.nav-link[href="index.html#section_4"]');
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('section_5')) {
    const NavLink = document.querySelector(`a.nav-link[href="${pathName}.html${currentHash}"], a.nav-link[href="${pathName}${currentHash}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('login')) {
    const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('register')) {
    const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

    const loginLink = document.getElementById('login-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const accept_btn = document.getElementById('accept_request');
    const accept_alert = document.getElementById('accept_alert');
    const profileLink = document.getElementById('profile-link');
    

    const token = localStorage.getItem('token');

    const user_id = localStorage.getItem("user_id");
    
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/${user_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const profileImg = document.getElementById('profile-img');

        if (profileImg && data.image) {
            profileImg.src = data.image; 
        }

        
    })
    .catch((err) => console.log(err));

    if (token) {
        // User is logged in
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        dashboardLink.style.display = 'block';
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block';
        accept_btn.style.display = 'block';
        accept_alert.style.display = 'none';
       

    } else {
        // User is not logged in
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
        dashboardLink.style.display = 'none';
        logoutLink.style.display = 'none';
        accept_btn.style.display = 'none';
        accept_alert.style.display = 'block';
        
    }


}


// function sidebarOption(){
//     const role = localStorage.getItem("role");
//     console.log(role);

//     if(role === 'manager'){
//         const userOption = document.getElementById("userOPtion");
//         userOption.style.display = 'none';
        
//     }
// }


function sidebarOption() {
    const role = localStorage.getItem("role");
    // console.log(role);

    if (role === 'manager') {
        const userOption = document.getElementById("userOption"); // Corrected "userOption" spelling
        if (userOption) { // Check if the element exists
            userOption.style.display = 'none';
        }
    }
}


function userload (){
    const user_id = localStorage.getItem("user_id");
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/users/${user_id}`)
    .then((res) => res.json())
    .then((data)=> displayDonationRequest(data) )
    .catch((err)=> console.log(err));
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