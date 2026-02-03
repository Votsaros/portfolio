// =======================
// DARK MODE
// =======================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }
});

// =======================
// PROJECT MODAL
// =======================
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalBadges = document.getElementById("modalBadges");
const modalLive = document.getElementById("modalLive");
const modalGit = document.getElementById("modalGit");
const closeBtn = document.querySelector(".close-btn");

const projectsData = [
  { title:"Guestbook App", desc:"Interactive guestbook with CSV export, history log, and live search.", badges:["JS","HTML","CSS"], live:"#", git:"#"},
  { title:"Todo List App", desc:"Task manager with persistent localStorage saving.", badges:["JS","HTML","CSS"], live:"#", git:"#"},
  { title:"Mini Dashboard", desc:"Dashboard with charts using Chart.js and Node.js backend.", badges:["JS","Node.js","Chart.js"], live:"#", git:"#"},
  { title:"Landing Page", desc:"Responsive landing page with smooth scroll and animations.", badges:["HTML","CSS","JS"], live:"#", git:"#"}
];

document.querySelectorAll('.project-card').forEach((card,index)=>{
  card.addEventListener('click', ()=>{
    const project = projectsData[index];
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalBadges.innerHTML = "";
    project.badges.forEach(b=>{
      const span = document.createElement("span");
      span.textContent = b;
      modalBadges.appendChild(span);
    });
    modalLive.href=project.live;
    modalGit.href=project.git;
    modal.classList.add("show");
  });
});

closeBtn.addEventListener('click', ()=>{ modal.classList.remove("show"); });
window.addEventListener('click', e=>{ if(e.target==modal){ modal.classList.remove("show"); } });

// =======================
// SMOOTH SCROLL
// =======================
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});