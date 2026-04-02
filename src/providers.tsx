import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { WritableAtom } from "jotai";
import { atom, type PrimitiveAtom, useSetAtom } from "jotai";
import { createContext, StrictMode, useContext } from "react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import Toaster from "./components/toaster";
import { IndexPage } from "./routes";
import { CartPage } from "./routes/cart";
import type { Product, Toast } from "./types";

const queryClient = new QueryClient();
const router = createMemoryRouter(
  [
    {
      Component: () => (
        <>
          <Toaster />
          <Outlet />
        </>
      ),
      children: [
        { index: true, Component: IndexPage },
        { path: "cart", Component: CartPage },
      ],
    },
  ],
  {},
);

const SessionContext = createContext<{
  $cart: PrimitiveAtom<Product[]>;
  $toast: WritableAtom<null, [toast: Omit<Toast, "id">], void>;
  $toasts: PrimitiveAtom<Toast[]>;
} | null>(null);

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionContext");
  }
  return { ...session, toast: useSetAtom(session.$toast) };
}

export default function Providers() {
  const $cart = atom<Product[]>([]);
  const $toasts = atom<Toast[]>([]);
  const $toast = atom(null, (get, set, toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    set($toasts, [...get($toasts), { ...toast, id }]);
    setTimeout(() => set($toasts, (prev) => prev.filter((t) => t.id !== id)), toast.delay ?? 3000);
  });
  return (
    <StrictMode>
      <SessionContext.Provider value={{ $cart, $toast, $toasts }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SessionContext.Provider>
    </StrictMode>
  );
}
