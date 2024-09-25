

const setNewPass = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const password = getValue("newPass");
    const confirmPass = getValue("confirmPass");
    const param = new URLSearchParams(window.location.search).get("token");
    const token = localStorage.getItem("password_change_token");

    if(param == token){
        console.log("token ok");
        if (password === confirmPass) {

            if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
     
             fetch("https://swiftpos-delta.vercel.app/personapp/api/password_reset/confirm/", {
                 method: "POST",
                 headers: { "content-type": "application/json" },
                 body: JSON.stringify({ password, token }),
               })
                 .then((res) => res.json())
                 .then((data)=>{
                    console.log(data);
                     if (data.error) {
                         document.getElementById("error").innerText = data.error;
                     } else {
                        document.getElementById("error").innerText = "Password Changed Successfully.";
                        window.location.href = "login.html";
                     }
                     
                    
                 });
             
            }else {
             document.getElementById("error").innerText =
                 "Password must contain at least eight characters, including one letter, one number, and one special character.";
         } 
         }else {
             document.getElementById("error").innerText = "Password and confirm password do not match";
             
         }
    }
    
  };