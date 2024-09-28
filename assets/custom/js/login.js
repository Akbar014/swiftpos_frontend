
const handleLogin = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    if ((username, password)) {
      fetch("https://swiftpos-delta.vercel.app/personapp/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.token && data.user) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("role", data.role);
            // document.getElementById("loginalert").innerHTML = "Successfull Logged in ";
            window.location.href = "index2.html";
            
            
          }else{
            document.getElementById("alert").innerHTML = data.error;
          }
        });
    }
  };


const handforgot = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const email = getValue("user-email");
    // const password = getValue("login-password");
    if ((email)) {
      fetch("https://swiftpos-delta.vercel.app/personapp/api/password_reset/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('password_change_token', data.token);
          document.getElementById("alert").innerHTML = 'Please Check your mail';
          
          // if (data.token && data.user) {
          //   localStorage.setItem("token", data.token);
          //   localStorage.setItem("user", data.user);
          //   localStorage.setItem("user_id", data.user_id);
          //   localStorage.setItem("role", data.role);
          //   // document.getElementById("loginalert").innerHTML = "Successfull Logged in ";
          //   window.location.href = "index.html";
            
            
          // }else{
          //   document.getElementById("alert").innerHTML = data.error;
          // }



        });
    }
  };

  const handlelogOut = () => {

    const token = localStorage.getItem("token");
  
    fetch("https://swiftpos-delta.vercel.app/personapp/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");

        window.location.href = "login.html";

      });
  };