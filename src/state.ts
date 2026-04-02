import { atom } from "jotai";
import type { Product, Toast } from "./types";

export const $cart = atom<Product[]>([]);
export const $toasts = atom<Toast[]>([]);
export const $toast = atom(null, (get, set, toast: Omit<Toast, "id">) => {
  const id = crypto.randomUUID();

  const newToast = { ...toast, id };

  set($toasts, [...get($toasts), newToast]);

  setTimeout(() => {
    set($toasts, (prev) => prev.filter((t) => t.id !== id));
  }, toast.delay ?? 3000);
});
