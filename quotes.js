const randomQuote = async () => {
  const JSONData = await fetch('https://yc2206bigdataapp.azurewebsites.net/quote_random/');
  const data = await JSONData.json();
  console.log(data);
  return data.quote;
}

const aanpassenUI = async () => {
  const data = await randomQuote();
  console.log(data);
  let quoteString = `<h4>${data}</h4>`;
  document.getElementById('random-quote-result').innerHTML = quoteString;
}

document.getElementById("nieuwe-quote-button").addEventListener("click", aanpassenUI)



window.onload = aanpassenUI();