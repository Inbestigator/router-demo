import { Container, Section, Separator, Thumbnail } from "@dressed/react";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { Fragment } from "react";
import { useSearchParams } from "react-router";
import Link from "#/components/link";
import { PaginationRow } from "#/components/pagination-row";
import { ProductCartButton } from "#/components/products";
import { $cart } from "#/state";
import type { ProductsRes } from "../types";

const LIMIT = 3;

export function IndexPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("p") || 1);
  const cart = useAtomValue($cart);
  const { data, isFetching } = useQuery({
    queryKey: ["products", page],
    async queryFn() {
      const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`);
      return res.json() as Promise<ProductsRes>;
    },
    placeholderData: (prev) => prev,
  });
  return (
    <>
      <Container>
        {data?.products.map((product) => (
          <Fragment key={product.id}>
            <Section accessory={<Thumbnail media={product.thumbnail} />}>
              ### {product.title}
              {"\n"}
              {product.description}
            </Section>
            <Section key={product.id} accessory={<ProductCartButton product={product} />}>
              *${product.price}*
            </Section>
            <Separator />
          </Fragment>
        )) ?? "Loading products"}
        <Section accessory={<Link to="/cart" label="Go to Cart" />}>
          -# {cart.length} item{cart.length !== 1 && "s"} in cart.
        </Section>
      </Container>
      <PaginationRow page={page} totalPages={data ? Math.ceil(data.total / LIMIT) : undefined} disabled={isFetching} />
    </>
  );
}
