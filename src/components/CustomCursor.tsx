import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let ringX = -100, ringY = -100;
    let animFrame: number;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHovering(!!(target.closest("a, button, [data-hover]")));
    };

    const animateRing = () => {
      setRing(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      animFrame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", move);
    animFrame = requestAnimationFrame(animateRing);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animFrame);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? "20px" : "10px",
          height: hovering ? "20px" : "10px",
          opacity: hovering ? 0.8 : 1,
        }}
      />
      <div
        className="custom-cursor-ring hidden md:block"
        style={{
          left: ring.x,
          top: ring.y,
          width: hovering ? "60px" : "36px",
          height: hovering ? "60px" : "36px",
          opacity: hovering ? 0.6 : 0.4,
        }}
      />
    </>
  );
}
