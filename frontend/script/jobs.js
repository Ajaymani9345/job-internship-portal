function renderJobs(){
  const q=(document.getElementById("jobSearch").value||"").toLowerCase().trim();
  const loc=(document.getElementById("locationFilter").value||"").toLowerCase().trim();
  const type=document.getElementById("typeFilter").value;
  const cat=document.getElementById("categoryFilter").value;
  const filtered=jobs.filter(j=>{
    const hay=[j.title,j.company,j.location,j.category,...j.skills].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!loc||j.location.toLowerCase().includes(loc))&&(!type||j.type===type)&&(!cat||j.category===cat);
  });
  document.getElementById("resultCount").textContent=`${filtered.length} job${filtered.length!==1?"s":""}`;
  document.getElementById("jobList").innerHTML=filtered.map(jobCard).join("");
  document.getElementById("emptyState").classList.toggle("hidden",filtered.length!==0);
}
document.addEventListener("DOMContentLoaded",()=>{
  const p=new URLSearchParams(location.search);
  document.getElementById("jobSearch").value=p.get("search")||"";
  document.getElementById("locationFilter").value=p.get("location")||"";
  ["jobSearch","locationFilter","typeFilter","categoryFilter"].forEach(id=>document.getElementById(id).addEventListener("input",renderJobs));
  document.getElementById("clearFilters").addEventListener("click",()=>{["jobSearch","locationFilter"].forEach(id=>document.getElementById(id).value="");["typeFilter","categoryFilter"].forEach(id=>document.getElementById(id).value="");renderJobs()});
  renderJobs();
  document.getElementById("menuBtn")?.addEventListener("click",()=>document.querySelector(".navbar nav")?.classList.toggle("open"));
});