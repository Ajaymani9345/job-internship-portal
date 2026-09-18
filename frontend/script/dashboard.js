document.addEventListener("DOMContentLoaded",()=>{
  const user=getUser(); if(!user){location.href="login.html";return;}
  welcomeName.textContent=user.name.split(" ")[0];
  const apps=getApplications(), saved=getSaved();
  applicationCount.textContent=apps.length;savedCount.textContent=saved.length;
  shortlistedCount.textContent=apps.filter(a=>a.status==="Shortlisted").length;
  recentApplications.innerHTML=apps.slice(0,5).map(a=>{const j=jobs.find(x=>x.id===a.jobId);return `<div class="application-row"><div><b>${j?.title||"Unknown job"}</b><span>${j?.company||""} • Applied ${a.date}</span></div><span class="status ${a.status.toLowerCase()}">${a.status}</span></div>`}).join("") || `<div class="empty"><h3>No applications yet</h3><p>Browse jobs and apply to your first opportunity.</p></div>`;
  savedJobs.innerHTML=saved.map(id=>jobs.find(j=>j.id===id)).filter(Boolean).map(jobCard).join("") || `<div class="empty"><h3>No saved jobs</h3><p>Save jobs from the Jobs page to see them here.</p></div>`;
  document.getElementById("logoutBtn")?.addEventListener("click",()=>{localStorage.removeItem("jobnestUser");location.href="index.html"});
  document.getElementById("menuBtn")?.addEventListener("click",()=>document.querySelector(".navbar nav")?.classList.toggle("open"));
});