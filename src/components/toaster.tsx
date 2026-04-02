import { ActionRow, Button } from "@dressed/react";
import { useAtomValue } from "jotai";
import { useSession } from "#/providers";

export default function Toaster() {
  const { $toasts } = useSession();
  const toasts = useAtomValue($toasts);
  if (!toasts.length) return null;
  return (
    <ActionRow>
      {toasts.map((t) => (
        <Button
          key={t.id}
          custom_id={`toast-${t.id}`}
          style={t.style}
          label={t.content}
          emoji={t.emoji ? { name: t.emoji } : undefined}
          disabled
        />
      ))}
    </ActionRow>
  );
}
