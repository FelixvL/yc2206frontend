const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let restaurantId = params.id;

function maaltijdToevoegen() {
  var maaltijd = {};
  maaltijd.naam = document.getElementById("invoerveldnaam").value;
  maaltijd.beschrijving = document.getElementById("invoerveldbeschrijving").value;
  maaltijd.prijs = document.getElementById("invoerveldprijs").value;
  maaltijd.restaurantId = document.getElementById("invoerveldrestaurant").value;
  var maaltijdJSON = JSON.stringify(maaltijd);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");

      window.location.href = "maaltijden.html?id=" + maaltijd.restaurantId;
    }
  };
  xhr.open("POST", "http://localhost:8082/maaltijdinvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(maaltijdJSON);
}

function toonallemaaltijden() {
  fetch("http://localhost:8082/overzichtmaaltijden/restaurant/" + restaurantId)
    .then((res) => res.json())
    .then((data) => maakMaaltijdTabel(data));
}

function maakMaaltijdTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Naam</th>
      <th>Beschrijving</th>
      <th>Prijs</th>
      <th>Restaurant naam</th>
      <th></th>
    </tr>
  </thead>`;
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `    
    <tr>
    <td>${tabelData[x].naam}</td>
    <td>${tabelData[x].beschrijving}</td>
    <td>${tabelData[x].prijs}</td>
    <td>${tabelData[x].restaurantNaam}</td>
    <td><button class="btn" type="button" onclick="verwijderMaaltijd(${tabelData[x].id})" value="verwijder"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  detabelString += "</table>";
  document.getElementById("allemaaltijdentabel").innerHTML = detabelString;
}

function verwijderMaaltijd(maaltijdid) {
  fetch("http://localhost:8082/verwijdermaaltijd/" + maaltijdid, {
    method: "DELETE",
  }).then((x) => {
    toonallemaaltijden();
  });
}

function vulAlleRestaurants(afterFunction) {
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

      afterFunction();
    });
}
