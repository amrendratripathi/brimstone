/**
 * GlobalBackground — renders brim_bg2.png as a fixed, low-opacity background
 * visible on all pages and all sections (Categories, About, Contact, Shop, etc).
 * The Hero section's own full-bleed image sits at a higher z-index and covers
 * this layer naturally in the hero area.
 */

export default function GlobalBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: "url('/brim_bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.5,
      }}
    />
  );
}
