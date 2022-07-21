const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let restaurantId = params.id;

function bestellingToevoegen() {
  let data = {
    klantId: document.getElementById("invoerveldklant").value,
    maaltijdId: document.getElementById("invoerveldmaaltijd").value,
    opmerking: document.getElementById("invoerveldopmerking").value,
  };

  var bestellingJSON = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");

      window.location.href="maaltijden.html?id=" + restaurantId;
    }
  };
  xhr.open("POST", "http://localhost:8082/bestellinginvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(bestellingJSON);
}

function toonAlleBestellingen() {
  fetch("http://localhost:8082/overzichtbestellingen/restaurant/" + restaurantId)
    .then((res) => res.json())
    .then((data) => maakBestellingTabel(data));
}

function toonAlleKlantBestellingen(klantId) {
  fetch("http://localhost:8082/overzichtklantbestellingen/klant/" + klantId)
    .then((res) => res.json())
    .then((data) => maakBestellingTabel(data));
}

function maakBestellingTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Klant naam</th>
      <th>Restaurant</th>
      <th>Maaltijd prijs</th>
      <th>Totaal prijs</th>
      <th>Betaald</th>
      <th>Status</th>
      <th>Opmerking</th>      
      <th></th>
    </tr>
  </thead>`;
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `
    <tbody>
      <tr>
        <td>${tabelData[x].klantNaam}</td>
        <td>${tabelData[x].restaurantNaam}</td>
        <td>${tabelData[x].maaltijd_prijs}</td>
        <td>${tabelData[x].totaal_prijs}</td>
        <td>${tabelData[x].betaald}</td>
        <td>${tabelData[x].status}</td>
        <td>${tabelData[x].opmerking}</td>
        <td> <input type="button" onclick="verwijderBestelling(${tabelData[x].id})" value="verwijder"> </td>
      </tr>
    </tbody>`;
  }
  detabelString += "</table>";
  document.getElementById("allebestellingentabel").innerHTML = detabelString;
}

function verwijderBestelling(bestellingid) {
  fetch("http://localhost:8082/verwijderbestelling/" + bestellingid, {
    method: "DELETE",
  }).then((x) => {
    toonAlleBestellingen();
  });
}

function vulAlleMaaltijden(afterFunction) {
  fetch("http://localhost:8082/overzichtmaaltijden")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("invoerveldmaaltijd");

      data.forEach((maaltijd) => {
        var option = document.createElement("option");
        option.text = maaltijd.naam;
        option.value = maaltijd.id;

        select.add(option);
      });

      afterFunction();
    });
}

function vulAlleKlanten(afterFunction) {
  fetch("http://localhost:8082/overzichtklanten")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("invoerveldklant");

      data.forEach((klant) => {
        var option = document.createElement("option");
        option.text = klant.naam;
        option.value = klant.id;

        select.add(option);
      });

      afterFunction();
    });
}
