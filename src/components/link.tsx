import { Button } from "@dressed/react";
import type { APIButtonComponentWithCustomId, ButtonStyle } from "discord-api-types/v10";
import { useLocation, useNavigate } from "react-router";

export default function Link({
  to,
  ...rest
}: { to: string | number } & Omit<APIButtonComponentWithCustomId, "type" | "style" | "custom_id"> & {
    style?: Exclude<keyof typeof ButtonStyle, "Link" | "Premium">;
  }) {
  const navigate = useNavigate();
  const location = useLocation();
  return <Button disabled={location.pathname === to} onClick={() => navigate(to as string)} {...rest} />;
}
