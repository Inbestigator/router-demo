import { ActionRow, Button } from "@dressed/react";
import Link from "./link";

export function PaginationRow({
  page,
  totalPages,
  disabled,
}: Readonly<{ page: number; totalPages?: number; disabled?: boolean }>) {
  return (
    <ActionRow>
      <Link to={`?p=${page - 1}`} label="◀" disabled={page === 1 || disabled} />
      <Button custom_id="active" label={`${page} / ${totalPages ?? "?"}`} style="Secondary" disabled />
      <Link to={`?p=${page + 1}`} label="▶" disabled={page === totalPages || disabled} />
    </ActionRow>
  );
}
