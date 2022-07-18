function klantToevoegen() {
  var klant = {};
  klant.naam = document.getElementById("invoerveldnaam").value;
  klant.adres = document.getElementById("invoerveldadres").value;
  klant.email = document.getElementById("invoerveldemail").value == "1";
  klant.telefoonnummer = document.getElementById("invoerveldtelefoonnummer").value;

  var klantJSON = JSON.stringify(klant);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");
    }
  };
  xhr.open("POST", "http://localhost:8082/klantinvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(klantJSON);
}

function toonalleklanten() {
  fetch("http://localhost:8082/overzichtklanten")
    .then((res) => res.json())
    .then((data) => maakKlantTabel(data));
}

function bekijkKlantBestellingen(klantid) {
  window.location.href = "bestelling.html?kid=" + klantid;
}

function maakKlantTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Naam</th>
      <th>Adres</th>
      <th>Email</th>
      <th>Telefoonnummer</th>
      <th></th>
    </tr>
  </thead>`;
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `
    <tbody>
      <tr>
        <td>${tabelData[x].naam}</td>
        <td>${tabelData[x].adres}</td>
        <td>${tabelData[x].email}</td>
        <td>${tabelData[x].telefoonnummer}</td>
        <td> 
        <input type="button" onclick="verwijderKlant(${tabelData[x].id})" value="verwijder"> 
        <input type="button" onclick="bekijkKlantBestellingen(${tabelData[x].id})" value="Bekijk bestellingen">
        </td>
      </tr>
    </tbody>`;
  }
  detabelString += "</table>";
  document.getElementById("alleklantentabel").innerHTML = detabelString;
}

function verwijderKlant(klantid) {
  fetch("http://localhost:8082/verwijderklant/" + klantid, {
    method: "DELETE",
  }).then((x) => {
    toonalleklanten();
  });
}
