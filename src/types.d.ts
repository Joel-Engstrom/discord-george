import {
    SlashCommandBuilder,
    CommandInteraction,
    Collection,
    PermissionResolvable,
    Message,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    ModalSubmitInteraction,
    CacheType,
} from "discord.js";

export interface BotEvent {
    name: string;
    once?: boolean | false;
    execute: (...args: any) => void;
}

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void;
    cooldown?: number; // in seconds
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            CLIENT_ID: string;
            GUILD_ID: string;
            MONGO_URI: string;
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        cooldowns: Collection<string, number>;
        buttonCooldowns: Collection<string, number>;
        musicChannel: string | null;
        wrappedChannel: string | null;
        queueMessage: Message | null;
        playingMessage: Message | null;
    }
}
