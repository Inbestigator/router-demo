import { Button, Section, Separator } from "@dressed/react";
import { useAtom } from "jotai";
import { useMemo, useTransition } from "react";
import { useNavigate } from "react-router";
import Link from "#/components/link";
import { ProductCartButton } from "#/components/products";
import { useSession } from "#/providers";

const BackButton = () => <Link to={-1} label="Back" style="Secondary" />;

export function CartPage() {
  const { $cart, toast } = useSession();
  const [cart, setCart] = useAtom($cart);
  const [isPending, startTransition] = useTransition();
  const subtotal = useMemo(() => cart.reduce((p, c) => c.price + p, 0), [cart]);
  const navigate = useNavigate();
  return (
    <>
      {cart.map((product) => (
        <Section key={product.id} accessory={<ProductCartButton product={product} disabled={isPending} />}>
          {product.title}
          {"\n"}
          -# *${product.price}*
        </Section>
      ))}
      {!cart.length && "You don't have anything in your cart!"}
      <Separator />
      <Section
        accessory={
          cart.length ? (
            <Button
              onClick={() =>
                startTransition(async () => {
                  await new Promise((r) => setTimeout(r, 1000));
                  setCart([]);
                  navigate("/");
                  toast({
                    style: "Secondary",
                    content: "Successfully placed order",
                    emoji: "✅",
                  });
                })
              }
              label={isPending ? "Placing order..." : "Proceed to checkout"}
              style="Success"
              disabled={isPending}
            />
          ) : (
            <BackButton />
          )
        }
      >
        -# Subtotal: ${subtotal}
        {"\n"}
        Total: **${(subtotal * 1.15).toFixed(2)}**
      </Section>
      {cart.length > 0 && <Section accessory={<BackButton />}>‎</Section>}
    </>
  );
}
