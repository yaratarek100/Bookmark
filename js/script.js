var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var layer = document.querySelector(".layer");
var closeBtn = document.querySelector("#closeBtn");
var tbody = document.querySelector("tbody");

var urlList = [];

if (localStorage.getItem("urlList")) {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  display(urlList);
}

function validation(element) {
  var regix = { siteName: /^[a-zA-Z0-9]{3,7}$/, siteUrl: /^[a-zA-Z0-9]{1,3}$/ };

  if (regix[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}



function deleteElement(deletedIndex) {
  urlList.pop(deletedIndex);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  display(urlList);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var newSite = {
      sName: siteName.value,
      sUrl: siteUrl.value,
    };
    
    urlList.push(newSite);
    creatElement(newSite);
    localStorage.setItem("urlList", JSON.stringify(urlList));
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
    siteName.value = "";
    siteUrl.value = "";
  } else {
    layer.classList.remove("d-none");
  }
});

closeBtn.addEventListener("click", () => {
  layer.classList.add("d-none");
});


function creatElement(newSite) {
    var newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${newSite["sName"]}</td>
    <td>${newSite.sName}</td>
  <td>
  <a class="btn row-b visit-b" href="https://${newSite.sUrl}" target="_blank" >
      <i class="fa-solid fa-eye pe-2"></i> Visit
    </a>
    </td>
    <td>
    <button class="btn row-b del-b" onclick="deleteElement(${urlList.length})">
    <i class="fa-solid fa-trash-can"></i> Delete
    </button>
    </td>
    `;
    tbody.appendChild(newRow);
  }

function display(list) {
  for (i = 1; 1 < list.length; i++) {
    // creatElement(list[i]);
console.log(list[i]);
  }
}
// localStorage.clear();