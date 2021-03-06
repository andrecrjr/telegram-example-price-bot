const Telegraf = require("telegraf");
const axios = require("axios");
const express = require("express");
//get app inside express
const app = express();

//instantiate Telegraf with our token got in the BtFather
//normally this is not appropriate, you will need to store the token in the server
//but is just an example for everyone
const bot = new Telegraf("YOUR BOT TOKEN");

//our command /start
bot.command("start", (msg) => msg.reply(`Hello ${msg.from.username}`));
//price for bitcoin
bot.command("bitcoin", async (ctx) => {
  //we will use async await from js language to get our price information!!!
  try {
    //axios will use the url to get usd price for bitcoin
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    //you will see the json if you console in the terminal!
    console.log(data);
    //answer our user!
    ctx.reply(`Price for bitcoin: U$${data.bitcoin.usd}`);
  } catch (e) {
    console.log(e);
  }
});

bot.command("ethereum", async (ctx) => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    //you will see the json if you console in the terminal!
    console.log(data);
    ctx.reply(`Price for Ethereum: U$${data.ethereum.usd}`);
  } catch (e) {
    console.log(e);
  }
});

bot.command("tezos", async (ctx) => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd"
    );
    //you will see the json if you console in the terminal!
    console.log(data);
    ctx.reply(`Price for Tezos: U$${data.tezos.usd}`);
  } catch (e) {
    console.log(e);
  }
});

app.use(bot.webhookCallback("/bot"));
bot.telegram.setWebhook(`${CURRENT_URL}/bot`);

app.get("/", (req, res) => {
  res.send("Our new tab!!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listen in the port ${PORT}`);
});
