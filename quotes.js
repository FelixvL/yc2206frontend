// Matthijs

const randomQuote = async () => {
  const JSONData = await fetch("http://127.0.0.1:5000/quote_random/");
  const data = await JSONData.json();
  console.log(data);
  return data.quote;
};

const aanpassenUI = async () => {
  const data = await randomQuote();
  console.log(data);
  let quoteString = `<h4>${data}</h4>`;
  document.getElementById("random-quote-result").innerHTML = quoteString;
};

document.getElementById("nieuwe-quote-button").addEventListener("click", aanpassenUI);

window.onload = aanpassenUI();

// Suzanne

// ophalen random quote
function toonRandomQuote() {
  fetch("http://127.0.0.1:5000/quote_random/")
    .then((res) => res.json())
    .then((data) => maakQuotesTabel(data));
}

function maakQuotesTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Random quote van de dag</th>
    </tr>
  </thead>
    <tbody>
      <tr>
        <td>${tabelData.quote}</td>
      </tr>
    </tbody>
  </table>`;
  document.getElementById("randomquotetabel").innerHTML = detabelString;
}

// overzicht alle quotes

function toonAlleQuotes() {
  fetch("http://127.0.0.1:5000/quotes/")
    .then((res) => res.json())
    .then((data) => maakAlleQuotesTabel(data));
}

function maakAlleQuotesTabel(tabelData) {
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Quote</th>
    </tr>
  </thead>`;
  for (let x = 0; x < tabelData.length; x++) {
    detabelString += `
    <tbody>
      <tr>
        <td>${tabelData[x]}</td>
      </tr>
    </tbody>`;
  }
  detabelString += "</table>";
  document.getElementById("allequotestabel").innerHTML = detabelString;
}

// nieuwe quote aanmaken

function quoteToevoegen() {
  var quote = {};
  quote.auteur = document.getElementById("invoerveldauteur").value;
  quote.tekst = document.getElementById("invoerveldtekst").value;

  var quoteJSON = JSON.stringify(quote);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log("terug van server");
    }
  };
  xhr.open("POST", "http://127.0.0.1:5000/felixposttrial2", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(quoteJSON);
}
