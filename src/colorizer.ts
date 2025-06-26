import chalk from "chalk";
const colors: { [key: string]: string } = {
    black: '#000000',
    dark_blue: '#0000AA',
    dark_green: '#00AA00',
    dark_aqua: '#00AAAA',
    dark_red: '#AA0000',
    dark_purple: '#AA00AA',
    gold: '#FFAA00',
    gray: '#AAAAAA',
    dark_gray: '#555555',
    blue: '#5555FF',
    green: '#55FF55',
    aqua: '#55FFFF',
    red: '#FF5555',
    light_purple: '#FF55FF',
    yellow: '#FFFF55',
    white: '#FFFFFF',
    reset: '#000000'
};
export type ExtraText = {
    color?: string | { value: string };
    bold?: boolean | { value: boolean };
    text: string | { value: string };
    extra?: ExtraText[] | { value: { value: ExtraText[] } };
    value?: ExtraText[];
};
export function colorizeExtra(extra: ExtraText): string {
    let colorizedMsg = "";

    colorizedMsg += colorizer(
        typeof extra.color === "string" ? extra.color : (extra.color?.value ?? "white"),
        typeof extra.text === "string" ? extra.text : (extra.text?.value ?? ""),
        typeof extra.bold === "boolean" ? extra.bold : (extra.bold?.value ?? false)
    );
    let extraArray: ExtraText[] | undefined;
    if (Array.isArray(extra.extra)) {
        extraArray = extra.extra;
    } else if (extra.extra && typeof extra.extra === "object" && "value" in extra.extra && Array.isArray(extra.extra.value?.value)) {
        extraArray = extra.extra.value.value;
    }
    if (extraArray && extraArray.length > 0) {
        for (const e of extraArray) {
            colorizedMsg += colorizeExtra(e);
        }
    }
    if (extra.value && extra.value.length > 0) {
        for (const e of extra.value) {
            colorizedMsg += colorizeExtra(e);
        }
    }
    return colorizedMsg;
}
const colorizer = (color: string, text: string, bold: boolean) => {
    let coloredText = "";
    if (color in colors || color.startsWith('#')) {
        const hex = color.startsWith('#') ? color : colors[color];
        coloredText = chalk.hex(hex)(text);

    } else {
        coloredText = coloredText
            .replaceAll("§0", "\x1b[0;30m")
            .replaceAll("§1", "\x1b[0;34m")
            .replaceAll("§2", "\x1b[0;32m")
            .replaceAll("§3", "\x1b[0;36m")
            .replaceAll("§4", "\x1b[0;31m")
            .replaceAll("§5", "\x1b[0;35m")
            .replaceAll("§6", "\x1b[0;33m")
            .replaceAll("§7", "\x1b[0;37m")
            .replaceAll("§8", "\x1b[0;90m")
            .replaceAll("§9", "\x1b[0;94m")
            .replaceAll("§a", "\x1b[0;92m")
            .replaceAll("§b", "\x1b[0;96m")
            .replaceAll("§c", "\x1b[0;91m")
            .replaceAll("§d", "\x1b[0;95m")
            .replaceAll("§e", "\x1b[0;93m")
            .replaceAll("§f", "\x1b[0;97m")
            .replaceAll("§k", "\x1b[8m")
            .replaceAll("§l", "\x1b[1m")
            .replaceAll("§m", "\x1b[9m")
            .replaceAll("§n", "\x1b[4m")
            .replaceAll("§o", "\x1b[3m")
            .replaceAll("§r", "\x1b[0m");

    }
    return bold ? chalk.bold(coloredText) : coloredText;
};
export default colorizer;