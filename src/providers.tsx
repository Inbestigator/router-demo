import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import Toaster from "./components/toaster";
import { IndexPage } from "./routes";
import { CartPage } from "./routes/cart";

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

export default function Providers() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
