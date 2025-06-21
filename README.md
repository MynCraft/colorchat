# @myncraftjs/colorchat

![NPM Downloads](https://img.shields.io/npm/dm/%40myncraftjs%2Fcolorchat)
![NPM Version](https://img.shields.io/npm/v/%40myncraftjs%2Fcolorchat)

## Usage

#### Mineflayer Usage:

```js
const colorChat = require("@myncraftjs/colorchat");
const { createBot } = require("mineflayer");

const bot = createBot(...);
bot.loadPlugin(ColorChat);

bot.on("chatColorized", (colorizedMsg, pos, jsonMsg) => {
    console.log(colorizedMsg);
});
```

#### Myncraftjs Usage:

###### Coming Soon

## License

#### [MIT](https://github.com/MynCraft/colorchat/blob/main/LICENSE)
