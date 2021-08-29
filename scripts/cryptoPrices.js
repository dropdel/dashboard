"use strict";
let trendingIDs = [];
const getTrendingCrypto =
  fetch(`https://api.coingecko.com/api/v3/search/trending
`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // We don't need to get the trending coins again, because it's on a 24-hour basis. Better to just update the price every minute accordingy.
      for (let coin of data.coins) {
        createInfoBox(coin.item);
        trendingIDs.push(coin.item.id);
      }
    });
// Instead of hardcoding the  trendingIDs, I will make an array later.
setInterval(() => {
  Promise.all([
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[0]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[1]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[2]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[3]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[4]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[5]}&vs_currencies=usd`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIDs[6]}&vs_currencies=usd`
    ),
  ])
    .then((resp) => {
      return Promise.all(resp.map((r) => r.json()));
    })
    .then((result) => {
      const priceArray = result;
      let index = 0;
      const cNodes = document.getElementById("coinArea").children;
      for (let n of cNodes) {
        // n.children[3].innerHTML = priceArray[0]["adax"]["usd"];
        n.children[3].innerHTML = `$${
          priceArray[index][n.children[0].innerHTML].usd
        }`;
        index++;
      }
    });
}, 50000);
function createInfoBox(cryptoInfo) {
  const main = document.getElementById("coinArea");

  const infoBox = document.createElement("div");

  const nameArea = document.createElement("span");
  const name = document.createTextNode(cryptoInfo.id);
  const symbolArea = document.createElement("span");
  const symbol = document.createTextNode(cryptoInfo.symbol);
  const priceArea = document.createElement("span");
  const imgArea = document.createElement("img");

  priceArea.classList.add("coinPrice");
  nameArea.appendChild(name);
  nameArea.style = "align-self: flex-start; font-variant: small-caps;";
  symbolArea.appendChild(symbol);
  imgArea.src = cryptoInfo.small;
  imgArea.style = "height: 2rem; width: 2rem;";

  infoBox.appendChild(nameArea);
  infoBox.appendChild(symbolArea);
  infoBox.appendChild(imgArea);
  infoBox.appendChild(priceArea);
  infoBox.style =
    "display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 180px; height: 180px; margin: 0.5rem; padding: 0.5rem; background: white; border-radius: 5px;";
  main.appendChild(infoBox);
}

function getPriceUSD(btcPrice) {
  const priceArea = document.getElementsByClassName("coinPrice");
  for (let el of priceArea) {
    console.log(data);
    el.innerHTML = `$${(parseFloat(el.innerHTML) * btcPrice).toFixed(2)}`;
  }
}
setTimeout(() => {
  console.log(trendingIDs);
}, 3000);
