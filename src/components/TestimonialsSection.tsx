import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sophie & Julien",
    role: "Wedding Clients",
    text: "Elena captured our wedding with such poetry and emotion. Every photo tells a story — we relive our day every time we look at our album. Absolutely breathtaking work.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Valentina Moreau",
    role: "Fashion Editorial",
    text: "Working with Elena is a dream. She has an extraordinary eye for light and mood. Our campaign received more engagement than ever — her images are just pure art.",
    rating: 5,
    initials: "VM",
  },
  {
    name: "Marcus Chen",
    role: "Portrait Session",
    text: "I've never felt so comfortable in front of a camera. Elena's quiet direction and artistic vision produced portraits I am truly proud of. A master of her craft.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Isabella Fontaine",
    role: "Pre-Wedding Shoot",
    text: "The misty forest shoot was like a fairytale. Elena scouted the perfect location and the images are ethereal. Worth every penny — she exceeded every expectation.",
    rating: 5,
    initials: "IF",
  },
  {
    name: "Luxury Brand Co.",
    role: "Commercial Client",
    text: "Our product shoot was elevated beyond what we imagined. Elena's ability to craft visual narratives for luxury products is unmatched in the industry.",
    rating: 5,
    initials: "LB",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(p => (p + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section-pad bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, hsl(38 52% 61% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Kind Words</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Client <span className="italic text-gold">Stories</span>
          </h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card p-10 md:p-14 text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-10 max-w-3xl mx-auto">
                  "{testimonials[current].text}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-display text-gold text-sm font-bold">
                    {testimonials[current].initials}
                  </div>
                  <div className="text-foreground font-medium">{testimonials[current].name}</div>
                  <div className="text-gold text-xs tracking-widest uppercase">{testimonials[current].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} data-hover className="p-2 border border-border hover:border-gold hover:text-gold transition-all text-muted-foreground">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-300 ${i === current ? "w-8 bg-gold" : "w-4 bg-border"}`}
                />
              ))}
            </div>
            <button onClick={next} data-hover className="p-2 border border-border hover:border-gold hover:text-gold transition-all text-muted-foreground">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
