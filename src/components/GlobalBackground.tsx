/**
 * GlobalBackground — renders brim_bg2.png as a fixed, low-opacity background
 * visible on all pages and all sections (Categories, About, Contact, Shop, etc).
 * The Hero section's own full-bleed image sits at a higher z-index and covers
 * this layer naturally in the hero area.
 */

import { useLocation } from "react-router-dom";

export default function GlobalBackground() {
  const location = useLocation();
  const isShopPage = location.pathname === "/shop";

  // Hide on shop page as requested to keep it simple and readable
  if (isShopPage) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: "url('/brim_bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.15, // Reduced opacity for subtle texture
      }}
    />
  );
}
