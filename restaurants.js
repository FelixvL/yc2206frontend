function restaurantToevoegen() {
  var restaurant = {};
  restaurant.naam = document.getElementById("invoerveldnaam").value;
  restaurant.adres = document.getElementById("invoerveldadres").value;
  restaurant.bezorger = document.getElementById("invoerveldbezorger").value;
  restaurant.cuisine = document.getElementById("invoerveldcuisine").value;
  restaurant.geopend = document.getElementById("invoerveldgeopend").value == "1";
  var restaurantJSON = JSON.stringify(restaurant);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");
    }
  };
  xhr.open("POST", "http://localhost:8082/restaurantinvoeren", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(restaurantJSON);
}

function toonallerestaurants() {
  fetch("http://localhost:8082/overzichtrestaurants")
    .then((res) => res.json())
    .then((data) => maakRestaurantTabel(data));
}

function bekijkRestaurantMaaltijden(id) {
  window.location.href = "suzanne.html?id=" + id;
}

function maakRestaurantTabel(tabelData) {
  let detabelString = "<table>";
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `<tr>
    <td>${tabelData[x].naam}</td>
    <td>${tabelData[x].adres}</td>
    <td>${tabelData[x].bezorger}</td>
    <td>${tabelData[x].cuisine}</td>
    <td>${tabelData[x].geopend}</td>
    <td>
      <input type="button" onclick="verwijderRestaurant(${tabelData[x].id})" value="verwijder">
      <input type="button" onclick="bekijkRestaurantMaaltijden(${tabelData[x].id})" value="Bekijk maaltijden">
    </td></tr>`;
  }
  detabelString += "</table>";
  document.getElementById("allerestaurantstabel").innerHTML = detabelString;
}

function verwijderRestaurant(restaurantid) {
  fetch("http://localhost:8082/verwijderrestaurant/" + restaurantid, {
    method: "DELETE",
  }).then((x) => {
    toonallerestaurants();
  });
}
