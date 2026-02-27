"use client";

/**
 * A purely decorative static overlay of faint white monospace characters,
 * giving a subtle "matrix / code" texture on top of the dark background.
 * No animation – just a single CSS-generated pattern at ~6% opacity.
 */
export function MatrixRain() {
  // A block of random-looking characters arranged in a grid.
  // We repeat it via CSS so it tiles seamlessly.
  const chars =
    "01001 10110 01110 10011 00101 11010 01101 10001 " +
    "ア カ サ タ ナ ハ マ ヤ ラ ワ ン " +
    "{ } [ ] ( ) < > / \\ | = + - * & " +
    "01110 10011 00101 11010 01101 10001 01001 10110 " +
    "ケ セ テ ネ ヘ メ レ ヱ ヰ ヲ " +
    "0 1 0 1 1 0 0 1 0 1 1 1 0 0 1 0 " +
    "ア カ サ タ ナ ハ マ ヤ ラ ワ ン " +
    "{ } [ ] ( ) < > / \\ | = + - * & " +
    "01110 10011 00101 11010 01101 10001 01001 10110 " +
    "ケ セ テ ネ ヘ メ レ ヱ ヰ ヲ " +
    "0 1 0 1 1 0 0 1 0 1 1 1 0 0 1 0 ";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Tiled character grid */}
      <div
        className="absolute inset-0 font-mono text-[10px] leading-[14px] tracking-[4px] text-white whitespace-pre-wrap break-all"
        style={{ opacity: 0.04 }}
      >
        {/* Repeat the block many times to fill even large screens */}
        {Array.from({ length: 60 }, (_, i) => (
          <span key={i}>{chars} </span>
        ))}
      </div>
    </div>
  );
}
