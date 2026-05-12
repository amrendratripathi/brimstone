import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobileCartFAB() {
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Do not show FAB if cart is empty or we are already on the cart/checkout pages
  if (count === 0) return null;
  if (location.pathname === "/cart" || location.pathname === "/checkout") return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform animate-fade-in"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">
          {count}
        </span>
      </div>
    </button>
  );
}
