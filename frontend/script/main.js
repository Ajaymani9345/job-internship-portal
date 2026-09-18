const jobs = [
  {id:1,title:"Frontend Developer Intern",company:"NovaTech Solutions",location:"Coimbatore",type:"Internship",category:"Frontend",salary:"₹12,000/month",skills:["HTML","CSS","JavaScript"],description:"Work with a product team to build responsive and accessible web interfaces.",responsibilities:["Build responsive pages","Fix UI issues","Collaborate with designers and developers"],posted:"2 days ago"},
  {id:2,title:"Cloud Engineer Intern",company:"CloudBridge Labs",location:"Chennai",type:"Internship",category:"Cloud",salary:"₹15,000/month",skills:["AWS","Linux","Networking"],description:"Learn cloud operations while supporting AWS-based applications.",responsibilities:["Monitor cloud resources","Assist with deployments","Document infrastructure"],posted:"3 days ago"},
  {id:3,title:"Junior Web Developer",company:"PixelCraft",location:"Bengaluru",type:"Full Time",category:"Frontend",salary:"₹4.5–6 LPA",skills:["JavaScript","HTML","CSS"],description:"Join a small engineering team creating modern customer-facing web applications.",responsibilities:["Develop web features","Write clean JavaScript","Test responsive layouts"],posted:"5 days ago"},
  {id:4,title:"Data Analyst Intern",company:"InsightWorks",location:"Hyderabad",type:"Internship",category:"Data",salary:"₹14,000/month",skills:["Excel","SQL","Python"],description:"Turn business data into useful reports and dashboards for internal teams.",responsibilities:["Clean datasets","Create reports","Support data analysis"],posted:"1 week ago"},
  {id:5,title:"Backend Developer Intern",company:"CodeSphere",location:"Pune",type:"Internship",category:"Backend",salary:"₹13,000/month",skills:["Node.js","REST API","SQL"],description:"Build and test APIs used by a growing web platform.",responsibilities:["Create API endpoints","Write tests","Work with databases"],posted:"1 week ago"},
  {id:6,title:"UI/UX Design Intern",company:"BrightStudio",location:"Remote",type:"Internship",category:"Design",salary:"₹10,000/month",skills:["Figma","UI Design","Prototyping"],description:"Help create clean user experiences for web and mobile products.",responsibilities:["Design screens","Create prototypes","Work with developers"],posted:"8 days ago"},
  {id:7,title:"DevOps Trainee",company:"StackOps",location:"Chennai",type:"Full Time",category:"Cloud",salary:"₹4–5 LPA",skills:["AWS","Linux","Git"],description:"Support CI/CD and cloud infrastructure automation.",responsibilities:["Maintain pipelines","Monitor systems","Assist with infrastructure"],posted:"10 days ago"},
  {id:8,title:"JavaScript Developer",company:"WebWorks",location:"Remote",type:"Part Time",category:"Frontend",salary:"₹20,000/month",skills:["JavaScript","React","Git"],description:"Develop interactive web experiences for client projects.",responsibilities:["Build components","Integrate APIs","Fix frontend bugs"],posted:"2 weeks ago"}
];

function getUser(){ return JSON.parse(localStorage.getItem("jobnestUser") || "null"); }
function getApplications(){ return JSON.parse(localStorage.getItem("jobnestApplications") || "[]"); }
function getSaved(){ return JSON.parse(localStorage.getItem("jobnestSaved") || "[]"); }
function saveSaved(a){ localStorage.setItem("jobnestSaved", JSON.stringify(a)); }

function jobCard(job){
  const saved = getSaved().includes(job.id);
  return `<article class="job-card">
    <div class="job-card-top"><div class="company-logo">${job.company.charAt(0)}</div><button class="save-btn ${saved?"saved":""}" onclick="toggleSave(${job.id})" title="Save job">${saved?"♥":"♡"}</button></div>
    <span class="tag">${job.type}</span><h3>${job.title}</h3><p class="company">${job.company}</p>
    <p class="meta">📍 ${job.location} &nbsp; • &nbsp; ${job.salary}</p>
    <div class="skills">${job.skills.map(s=>`<span>${s}</span>`).join("")}</div>
    <div class="card-footer"><small>Posted ${job.posted}</small><a href="job-details.html?id=${job.id}" class="text-link">View details →</a></div>
  </article>`;
}
function toggleSave(id){
  let saved=getSaved();
  saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
  saveSaved(saved); refreshCards();
}
function refreshCards(){
  const featured=document.getElementById("featuredJobs");
  if(featured) featured.innerHTML=jobs.slice(0,4).map(jobCard).join("");
}
function renderJobDetails(){
  const box=document.getElementById("jobDetails"); if(!box)return;
  const id=Number(new URLSearchParams(location.search).get("id")) || 1;
  const job=jobs.find(j=>j.id===id) || jobs[0];
  box.innerHTML=`<a class="back-link" href="jobs.html">← Back to jobs</a>
  <div class="detail-layout"><article class="detail-card"><div class="detail-head"><div class="company-logo large">${job.company.charAt(0)}</div><div><span class="tag">${job.type}</span><h1>${job.title}</h1><p class="company">${job.company} • ${job.location}</p></div></div>
  <hr><h2>About the role</h2><p>${job.description}</p><h2>Responsibilities</h2><ul class="check-list">${job.responsibilities.map(x=>`<li>${x}</li>`).join("")}</ul><h2>Required skills</h2><div class="skills">${job.skills.map(s=>`<span>${s}</span>`).join("")}</div></article>
  <aside class="apply-card"><h3>${job.title}</h3><p class="meta">📍 ${job.location}</p><p class="salary">${job.salary}</p><button class="btn btn-primary full" onclick="applyToJob(${job.id})">Apply now</button><button class="btn btn-outline full" onclick="toggleSave(${job.id})">${getSaved().includes(job.id)?"♥ Saved":"♡ Save job"}</button><small>Applications are stored locally in this frontend prototype.</small></aside></div>`;
}
function applyToJob(id){
  if(!getUser()){ alert("Please register or login before applying."); location.href="login.html"; return; }
  const job=jobs.find(j=>j.id===id), apps=getApplications();
  if(apps.some(a=>a.jobId===id)){alert("You have already applied for this job.");return;}
  apps.unshift({jobId:id,status:"Applied",date:new Date().toLocaleDateString("en-IN")});
  localStorage.setItem("jobnestApplications",JSON.stringify(apps));
  alert(`Application submitted for ${job.title}!`);
  location.href="applications.html";
}
function initProfile(){
  const user=getUser()||{}; const fields={profileName:user.name,profileEmail:user.email,profileCollege:user.college,profilePhone:user.phone,profileLocation:user.location,profileYear:user.year,profileSkills:user.skills,profileAbout:user.about};
  Object.entries(fields).forEach(([id,val])=>{const el=document.getElementById(id);if(el&&val)el.value=val});
  const form=document.getElementById("profileForm"); form?.addEventListener("submit",e=>{e.preventDefault();const u={...getUser(),name:profileName.value,email:profileEmail.value,college:profileCollege.value,phone:profilePhone.value,location:profileLocation.value,year:profileYear.value,skills:profileSkills.value,about:profileAbout.value};localStorage.setItem("jobnestUser",JSON.stringify(u));alert("Profile saved.");});
}
document.addEventListener("DOMContentLoaded",()=>{
  refreshCards();
  document.getElementById("menuBtn")?.addEventListener("click",()=>document.querySelector(".navbar nav")?.classList.toggle("open"));
  document.querySelectorAll("[data-search]").forEach(b=>b.addEventListener("click",()=>{location.href=`jobs.html?search=${encodeURIComponent(b.dataset.search)}`}));
  const hs=document.getElementById("homeSearch"); hs?.addEventListener("submit",e=>{e.preventDefault();location.href=`jobs.html?search=${encodeURIComponent(document.getElementById("homeKeyword").value)}&location=${encodeURIComponent(document.getElementById("homeLocation").value)}`});
  document.getElementById("logoutBtn")?.addEventListener("click",()=>{localStorage.removeItem("jobnestUser");location.href="index.html"});
});