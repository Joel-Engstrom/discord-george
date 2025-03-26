import chalk from "chalk";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    TextChannel,
    VoiceChannel,
    type APIActionRowComponent,
    type APIEmbedField,
    type Client,
    type ColorResolvable,
} from "discord.js";
import { client } from "./main.js";
import prettyMilliseconds from "pretty-ms";
import moment from "moment";
import { channel } from "diagnostics_channel";

type colorType = "text" | "variable" | "error";

const log = console.log;

export const messageColor: ColorResolvable = "Aqua";
export const serverIconURL =
    "https://cdn.discordapp.com/icons/220919500617285632/af0fbb7206171aa88b9ff312a64543bc.webp?size=96";

const themeColors = {
    text: "#00ddff",
    variable: "#ff624d",
    error: "#f5426c",
};

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message);
};

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const sendDailyFentMessage = () => {
    const todaysDay = moment().isoWeekday();

    const gifMap: { [key: number]: string } = {
        1: "https://tenor.com/view/fentonday-gif-639932274184889256",
        2: "https://tenor.com/view/fentuesday-gif-12003533653463207434",
        3: "https://tenor.com/view/fentnesday-gif-9363009065696255998",
        4: "https://tenor.com/view/fentursday-gif-7951810029139224572",
        5: "https://tenor.com/view/fentfriday-gif-12473664809441584584",
        6: "https://tenor.com/view/fenturday-gif-13584957300414505165",
        7: "https://tenor.com/view/fentunday-gif-3626458357581901659",
    };

    const dayGif = gifMap[todaysDay];

    client.channels.fetch("220919500617285632").then((channel) => {
        channel = channel as TextChannel;
        channel.send(dayGif);
    });
};
