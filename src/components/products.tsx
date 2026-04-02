import { Button } from "@dressed/react";
import { useAtom } from "jotai";
import { useSession } from "#/providers";
import type { Product } from "#/types";

export function ProductCartButton({ product }: Readonly<Partial<Parameters<typeof Button>[0]> & { product: Product }>) {
  const { $cart, toast } = useSession();
  const [cart, setCart] = useAtom($cart);
  const isInCart = cart.some((c) => c.id === product.id);
  return (
    <Button
      onClick={() => {
        setCart((p) => {
          if (p.some((c) => c.id === product.id)) {
            return p.filter((c) => c.id !== product.id);
          }
          toast({
            content: `Added ${product.title} to cart`,
            style: "Success",
            link: "/cart",
          });
          return p.concat(product);
        });
      }}
      emoji={isInCart ? { name: "🗑️" } : undefined}
      label={isInCart ? undefined : "Add to cart"}
      style={isInCart ? "Danger" : "Secondary"}
    />
  );
}
