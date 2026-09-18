document.addEventListener("DOMContentLoaded",()=>{
  const list=document.getElementById("applicationList"), apps=getApplications();
  if(!apps.length){list.innerHTML=`<div class="empty"><div>📄</div><h3>No applications yet</h3><p>Your submitted applications will appear here.</p><a class="btn btn-primary" href="jobs.html">Browse jobs</a></div>`;return;}
  list.innerHTML=`<div class="application-table">${apps.map(a=>{const j=jobs.find(x=>x.id===a.jobId);return `<div class="application-row"><div class="app-main"><div class="company-logo">${j.company.charAt(0)}</div><div><b>${j.title}</b><span>${j.company} • ${j.location}</span></div></div><span class="status ${a.status.toLowerCase()}">${a.status}</span><small>${a.date}</small></div>`}).join("")}</div>`;
  document.getElementById("menuBtn")?.addEventListener("click",()=>document.querySelector(".navbar nav")?.classList.toggle("open"));
});