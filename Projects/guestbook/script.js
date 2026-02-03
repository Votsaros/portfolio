let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let addBtn = document.getElementById("addBtn");
let logList = document.getElementById("logList");
let historyList = document.getElementById("historyList");
let saveBtn = document.getElementById("saveBtn");
let saveCsvBtn = document.getElementById("saveCsvBtn");
let searchInput = document.getElementById("searchInput");

let logArray = [];
let csvContent = "Timestamp,Action,Name,Email/Number\n";

function renderList() {
  logList.innerHTML = "";
  logArray.forEach((entry, index) => {
    let li = document.createElement("li");
    li.textContent = entry;

    li.addEventListener("click", function() {
      if(confirm(`Delete "${entry}"?`)) {
        const now = new Date().toLocaleString();
        let parts = entry.split(" - ");
        let name = parts[1];
        let email = parts[2];

        csvContent += `${now},DELETE,${name},${email}\n`;
        addHistory(`Deleted: ${entry}`, "DELETE");

        logArray.splice(index,1);
        renderList();
      }
    });

    logList.appendChild(li);
  });
}

function addHistory(message, type){
  let li = document.createElement("li");
  li.textContent = message;
  li.style.color = type==="ADD"?"green":"red";
  historyList.appendChild(li);
}

addBtn.addEventListener("click", function() {
  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  if(name.length > 3 && email !== ""){
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const now = new Date().toLocaleString();
    const entry = `${now} - ${name} - ${email}`;

    logArray.push(entry);
    csvContent += `${now},ADD,${name},${email}\n`;
    addHistory(`Added: ${entry}`, "ADD");

    renderList();
    nameInput.value = "";
    emailInput.value = "";
  } else {
    alert("Enter valid name (>3 chars) and email/number.");
  }
});

// SEARCH
searchInput.addEventListener("input", function() {
  const filter = searchInput.value.toLowerCase();
  logList.innerHTML = "";
  logArray.forEach((entry,index) => {
    if(entry.toLowerCase().includes(filter)){
      let li = document.createElement("li");
      li.textContent = entry;
      li.addEventListener("click", function(){
        if(confirm(`Delete "${entry}"?`)){
          const now = new Date().toLocaleString();
          let parts = entry.split(" - ");
          let name = parts[1];
          let email = parts[2];
          csvContent += `${now},DELETE,${name},${email}\n`;
          addHistory(`Deleted: ${entry}`, "DELETE");
          logArray.splice(index,1);
          renderList();
        }
      });
      logList.appendChild(li);
    }
  });
});

// DOWNLOAD TXT
saveBtn.addEventListener("click", function(){
  if(logArray.length === 0) return;
  let blob = new Blob([logArray.join("\n")], {type: "text/plain"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "guestbook_log.txt";
  a.click();
  URL.revokeObjectURL(a.href);
});

// DOWNLOAD CSV
saveCsvBtn.addEventListener("click", function(){
  if(csvContent.length === 0) return;
  let blob = new Blob([csvContent], {type: "text/csv"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "guestbook_full_log.csv";
  a.click();
  URL.revokeObjectURL(a.href);
});