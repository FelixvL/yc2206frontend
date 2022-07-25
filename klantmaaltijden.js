const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let restaurantId = params.id;

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
    <td><input class="btn btn-primary" type=button onClick="parent.location='addbestelling.html?mId=' + ${tabelData[x].id} + '&id=' + restaurantId" value='Voeg toe aan bestelling'></td>
    </tr>`;
  }
  detabelString += "</table>";
  document.getElementById("allemaaltijdentabel").innerHTML = detabelString;
}
