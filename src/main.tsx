import { type Params, patternToRegex } from "@dressed/matcher";
import { type ComponentInteraction, patchInteraction } from "@dressed/react";
import { createCallbackHandler, pattern } from "@dressed/react/callbacks";
import type { CommandInteraction } from "dressed";
import { createServer } from "dressed/server";
import Providers from "./providers";

const callbackHandler = createCallbackHandler({
  default: (i: ComponentInteraction) => i.reply("Unknown handler", { ephemeral: true }),
});

createServer(
  {
    shop: {
      default: (interaction: CommandInteraction) =>
        patchInteraction(interaction).reply(<Providers />, { ephemeral: true }),
    },
  },
  {},
  {},
  {
    hooks: {
      onUnknownInteraction(i) {
        if (i.type !== 3 && i.type !== 5) return console.error("Unknown interaction", i);
        const args = patternToRegex(pattern).exec(i.data.custom_id)?.groups as Params<typeof pattern>;
        return callbackHandler(i as Parameters<typeof callbackHandler>[0], args);
      },
    },
  },
);
