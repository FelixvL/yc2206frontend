function mijnfunctie() {
  var dediv = document.getElementById("onzeuitkomst");
  //alert("het is gelukt");
  // XMLHttpRequest   ouder
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log(this.responseText);
      var antwoord = this.responseText;
      var hetantwoord = JSON.parse(this.responseText);
      dediv.innerHTML = hetantwoord.naam; // objecten  NIETSTRING
    }
  };
  console.log("opening");
  xhr.open("GET", "http://localhost:8082/twee", true);
  xhr.send();
}

mijnfunctie();

async function fetchMeals() {
  const response = await fetch("./maaltijden.json");
  const result = await response.json();
  return result;
}

async function displayMeals() {
  const meals = await fetchMeals();
  const container = document.getElementById("maaltijden");

  let htmlString = "";
  meals.forEach((meal) => {
    htmlString += `
      <div class="meal">
        <img alt="${meal.description}" src="${meal.img}" />
        <h3>${meal.name}</h3>
        <span>${new Intl.NumberFormat(navigator.language, {
          style: "currency",
          currency: "EUR",
        }).format(meal.price)}</span>
      </div>
    `;
  });

  container.innerHTML = htmlString;
}

displayMeals();
