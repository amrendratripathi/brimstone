/**
 * GlobalBackground — renders brim_bg2.png as a fixed, low-opacity background
 * on every page except the homepage hero (which has its own full-bleed image).
 * On the homepage it's still rendered but hidden behind the hero's own background.
 */
import { useLocation } from "react-router-dom";

export default function GlobalBackground() {
  const { pathname } = useLocation();
  // On the homepage the hero covers everything; no need for bg2 there
  const isHome = pathname === "/";

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: "url('/brim_bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Low opacity so content text/cards remain readable
        opacity: isHome ? 0 : 0.5,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
