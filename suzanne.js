function maaltijdToevoegen() {
  var maaltijd = {};
  maaltijd.naam = document.getElementById("invoerveldnaam").value;
  maaltijd.beschrijving = document.getElementById(
    "invoerveldbeschrijving"
  ).value;
  maaltijd.calorieen = document.getElementById("invoerveldcalorieen").value;
  maaltijd.prijs = document.getElementById("invoerveldcalorieen").value;
  var maaltijdJSON = JSON.stringify(maaltijd);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");
    }
  };
  xhr.open("POST", "http://localhost:8082/maaltijdinvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(maaltijdJSON);
}

function toonallemaaltijden() {
  fetch("http://localhost:8082/overzichtmaaltijden")
    .then((res) => res.json())
    .then((data) => maakMaaltijdTabel(data));
}

function maakMaaltijdTabel(tabelData) {
  let detabelString = "<table>";
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `    
    <tr>
    <td>${tabelData[x].naam}</td>  
    <td>${tabelData[x].beschrijving}</td>  
    <td>${tabelData[x].calorieen}</td>  
    <td>${tabelData[x].prijs}</td>  
    <td><input type="button" onclick="verwijderMaaltijd(${tabelData[x].id})" value="verwijder"></td></tr>`;

    /* <tr>
    <th>Naam</th>
    <th>Calorieen</th>
    </tr> 
    */
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