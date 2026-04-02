import { patternToRegex } from "@dressed/matcher";
import type { CommandInteraction, MessageComponentInteraction } from "@dressed/react";
import { patchInteraction } from "@dressed/react";
import { createCallbackHandler, pattern } from "@dressed/react/callbacks";
import { createServer } from "dressed/server";
import Providers from "./providers";

createServer(
  [
    {
      name: "shop",
      data: undefined,
      exports: { default: (interaction: CommandInteraction) => interaction.reply(<Providers />, { ephemeral: true }) },
    },
  ],
  [
    {
      name: "callback",
      data: { regex: patternToRegex(pattern).source, category: "buttons", score: 0 },
      exports: {
        default: createCallbackHandler({
          default: (i: MessageComponentInteraction) => i.reply("Unknown handler", { ephemeral: true }),
        }),
        pattern,
      },
    },
  ],
  [],
  { port: 3000, hooks: { onBeforeCommand: (i) => [patchInteraction(i)] } },
);
