import {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
} from "discord.js";
import { color, sendDailyFentMessage } from "./utils.js";
import type { SlashCommand } from "./types.d.ts";
import "dotenv/config";
import cron from "node-cron";

const {
    Guilds,
    MessageContent,
    GuildMessages,
    GuildMembers,
    GuildVoiceStates,
    GuildPresences,
    DirectMessageTyping,
    DirectMessages,
    GuildMessageTyping,
} = GatewayIntentBits;

export const client = new Client({
    intents: [
        Guilds,
        MessageContent,
        GuildMessages,
        GuildMembers,
        GuildVoiceStates,
        GuildPresences,
        DirectMessageTyping,
        DirectMessages,
        GuildMessageTyping,
    ],
});

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();
client.buttonCooldowns = new Collection<string, number>();

const log = console.log;

await client
    .login(process.env.TOKEN)
    .then(() =>
        client.user?.setActivity("Fent Reactor Online", {
            type: ActivityType.Custom,
        }),
    )
    .then(async () => {
        log(color("text", "✅ Logged in to discord"));
    })
    .then(() => {
        cron.schedule("0 8 * * *", () => {
            log(color("text", "📅 Sending daily Fent message"));
            sendDailyFentMessage();
        });
        sendDailyFentMessage();
    });
