"use strict";
const coinArray = null;
const priceRequest = fetch(`https://api.coingecko.com/api/v3/search/trending
`)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    const coinArray = data.coins;
    for (let x of coinArray) {
      createPriceBox(x.item);
    }
    return fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
  })
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    getPriceUSD(data.bitcoin.usd);
  });

function createPriceBox(data) {
  const main = document.getElementById("coinArea");

  const infoBox = document.createElement("div");

  const nameArea = document.createElement("span");
  const name = document.createTextNode(data.id);
  const symbolArea = document.createElement("span");
  const symbol = document.createTextNode(data.symbol);
  const priceArea = document.createElement("span");
  const price = document.createTextNode(data.price_btc);
  const imgArea = document.createElement("img");

  priceArea.classList.add("coinPrice");
  priceArea.appendChild(price);
  nameArea.appendChild(name);
  nameArea.style = "align-self: flex-start; font-variant: small-caps;";
  symbolArea.appendChild(symbol);
  imgArea.src = data.small;
  imgArea.style = "height: 2rem; width: 2rem;";

  infoBox.appendChild(nameArea);
  infoBox.appendChild(symbolArea);
  infoBox.appendChild(imgArea);
  infoBox.appendChild(priceArea);
  infoBox.style =
    "display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 180px; height: 180px; margin: 0.5rem; padding: 0.5rem; background: white; border-radius: 5px;";
  main.appendChild(infoBox);
}
function getPriceUSD(data) {
  const priceArea = document.getElementsByClassName("coinPrice");
  for (let el of priceArea) {
    console.log(data);
    el.innerHTML = `$${(el.innerHTML * data).toFixed(2)}`;
  }
}
