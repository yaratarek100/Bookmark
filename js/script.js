var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var layer = document.querySelector(".layer");
var closeBtn = document.querySelector("#closeBtn");
var tbody = document.querySelector("tbody");

var urlList = [];

if (localStorage.getItem("urlList")) {
  LocalList = JSON.parse(localStorage.getItem("urlList"));
  display(LocalList); 
}

function validation(element) {
  var regix = { siteName: /^.{3,}$/,
   siteUrl: /^.+\.com/ };

  if (regix[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}



function deleteElement(deletedIndex) {

   urlList.splice(deletedIndex,1);
   localStorage.setItem("urlList", JSON.stringify(urlList));
   LocalList= urlList;
   urlList=[];
   tbody.innerHTML="";
  display(LocalList);

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
  newRow.innerHTML = `<tr>
  <td>${urlList.length+1}</td>
  <td>${newSite.sName}</td>
  <td>
  <a class="btn row-b visit-b" href="${newSite.sUrl}" target="_blank" >
  <i class="fa-solid fa-eye pe-2"></i> Visit
  </a>
  </td>
    <td>
    <button class="btn row-b del-b" onclick="deleteElement(${urlList.length})">
    <i class="fa-solid fa-trash-can"></i> Delete
    </button>
    </td>
    </tr>
    `;
    tbody.appendChild(newRow);
    urlList.push(newSite);
  }

function display(list) {

  for (i =0; i<(list.length); i++) {

    creatElement(list[i]);
  }
}