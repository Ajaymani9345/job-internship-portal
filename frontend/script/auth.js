document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("registerForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const user={name:regName.value.trim(),email:regEmail.value.trim(),password:regPassword.value,college:regCollege.value.trim()};
    localStorage.setItem("jobnestUser",JSON.stringify(user));
    alert("Account created successfully!");
    location.href="dashboard.html";
  });
  document.getElementById("loginForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const user=JSON.parse(localStorage.getItem("jobnestUser")||"null");
    if(!user){alert("No local account found. Please register first.");return;}
    if(loginEmail.value.trim()!==user.email||loginPassword.value!==user.password){alert("Incorrect email or password.");return;}
    location.href="dashboard.html";
  });
});