const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let restaurantId = params.id;

function bezorgerToevoegen() {
  var bezorger = {};
  bezorger.naam = document.getElementById("invoerveldnaam").value;
  bezorger.email = document.getElementById("invoerveldemail").value;
  bezorger.telefoonnummer = document.getElementById("invoerveldtelefoonnummer").value;
  bezorger.restaurantId = document.getElementById("invoerveldrestaurant").value;

  var bezorgerJSON = JSON.stringify(bezorger);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");
    }
  };
  xhr.open("POST", "http://localhost:8082/bezorgerinvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(bezorgerJSON);
}

function toonallebezorgers() {
  fetch("http://localhost:8082/overzichtbezorgers")
    .then((res) => res.json())
    .then((data) => maakBezorgerTabel(data));
}

function bekijkBezorgerBestellingen(bezorgerid) {
  window.location.href = "bezorgerbestelling.html?bId=" + bezorgerid;
}

function maakBezorgerTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Naam</th>
      <th>Email</th>
      <th>Telefoonnummer</th>
      <th>Restaurant</th>
      <th></th>
    </tr>
  </thead>`;
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `
    <tbody>
      <tr>
        <td>${tabelData[x].naam}</td>
        <td>${tabelData[x].email}</td>
        <td>${tabelData[x].telefoonnummer}</td>
        <td>${tabelData[x].restaurantNaam}</td>
        <td> 
        <input class="btn btn-primary" type="button" onclick="bekijkBezorgerBestellingen(${tabelData[x].id})" value="Bekijk bestellingen">
        <button class="btn" type="button" onclick="verwijderBezorger(${tabelData[x].id})" value="verwijder"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    </tbody>`;
  }
  detabelString += "</table>";
  document.getElementById("allebezorgerstabel").innerHTML = detabelString;
}

function verwijderBezorger(klantid) {
  fetch("http://localhost:8082/verwijderbezorger/" + klantid, {
    method: "DELETE",
  }).then((x) => {
    toonallebezorgers();
  });
}

function vulAlleRestaurants() {
  fetch("http://localhost:8082/overzichtrestaurants")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("invoerveldrestaurant");

      data.forEach((restaurant) => {
        var option = document.createElement("option");
        option.text = restaurant.naam;
        option.value = restaurant.id;

        select.add(option);
      });
    });
}
