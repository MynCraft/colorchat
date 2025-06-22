import { Bot, BotOptions } from "mineflayer";
import colorizer, { colorizeExtra } from "./colorizer";
import prismarineChat from "prismarine-chat";
declare module 'mineflayer' {
    interface BotEvents {
        chatColorized: (colorizedMsg: string, pos: string, jsonMsg: any) => void;
    }
}

export { colorizer as colorizeText };
export { colorizeExtra, ExtraText } from "./colorizer";
export default function colorChat(bot: Bot, opt: BotOptions) {
    const ChatMessage = prismarineChat(bot.version);

    bot.on("messagestr", (msg, pos, jsonMsg) => {
        let colorizedMsg = colorizeExtra(jsonMsg.json)
        if (colorizedMsg.length === 0 && msg) {
            colorizedMsg = colorizer("white", msg, pos == "system");
        }
        if (colorizedMsg.length !== 0)
            bot.emit("chatColorized", colorizedMsg, pos, jsonMsg);
        else if (msg.length !== 0)
            bot.emit("chatColorized", msg, pos, jsonMsg);
    });
    // bot.on("chat", (username, message) => {
    //     if (username === bot.username) return;
    //     let colorizedMsg = colorizeExtra({
    //         text: `${username}: ${message}`,
    //     });
    //     if (colorizedMsg.length !== 0)
    //         bot.emit("chatColorized", colorizedMsg, "chat", ChatMessage.MessageBuilder.fromString(message));
    // });
}