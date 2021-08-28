"use strict";
const priceRequest = fetch(`https://api.coingecko.com/api/v3/search/trending
`)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data.coins[0].item);
  });
