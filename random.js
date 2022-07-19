const randomMaaltijd = async () => {
  const JSONData = await fetch("http://127.0.0.1:5000/maaltijd_random/");
  const data = await JSONData.json();
  return data[0];
};

const aanpassenUI = async () => {
  const data = await randomMaaltijd();
  console.log(data);
  let detabelString = `<table class=overzichtTabel>
  <thead>
    <tr>
      <th>Naam</th>
      <th>Prijs</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>${data.name}</td>
    <td>${data.price}</td>
  </tr>
  </tbody>
  </table>`;
  document.getElementById("random-maaltijd-tabel").innerHTML = detabelString;
};

document.getElementById("nieuwe-maaltijd-button").addEventListener("click", aanpassenUI);

window.onload = aanpassenUI();
