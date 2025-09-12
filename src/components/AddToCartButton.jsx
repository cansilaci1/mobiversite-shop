"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

export default function AddToCartButton({
  product,
  qty = 1,
  className = "",
  children = "Sepete Ekle",
}) {
  const dispatch = useDispatch();
  const { show } = useToast();
  const [adding, setAdding] = useState(false);

  function handleClick() {
    if (!product?.id || adding) return;
    setAdding(true);
    try {
      // quantity: CartPage'de it.quantity kullanıldığı için burada 'quantity' gönderiyoruz
      const quantity = Number(qty) > 0 ? Number(qty) : 1;
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,       // <-- ÖNEMLİ
        })
      );
      show("Sepete eklendi", { variant: "success" });
    } catch (e) {
      show("Sepete eklenemedi", { variant: "error" });
    } finally {
      // çift tıklama spam'ini önlemek için kısa bir kilit
      setTimeout(() => setAdding(false), 400);
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-primary ${adding ? "opacity-75 pointer-events-none" : ""} ${className}`}
      onClick={handleClick}
      aria-busy={adding}
    >
      {adding ? "Ekleniyor…" : children}
    </button>
  );
}
