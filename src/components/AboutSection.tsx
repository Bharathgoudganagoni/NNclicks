import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import photographerImg from "@/assets/photographer.jpeg";
import { Award, Camera, Star, Users } from "lucide-react";

const stats = [
  { icon: Camera, value: "850+", label: "Projects" },
  { icon: Users, value: "620+", label: "Happy Clients" },
  { icon: Award, value: "28", label: "Awards" },
  { icon: Star, value: "12", label: "Years Experience" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-pad bg-charcoal relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, hsl(38 52% 61% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative group overflow-hidden">
              <img
                src={photographerImg}
                alt="Elena Noir - Professional Photographer"
                className="w-full max-w-md mx-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "4/5" }}
              />
              {/* Gold frame accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-dim pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-10 glass-card p-4 rounded-sm hidden lg:block"
            >
              <div className="text-gold font-display text-3xl font-bold">12</div>
              <div className="text-muted-foreground text-xs tracking-widest uppercase">Years</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">About Me</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              <span className="italic text-gold">NAGESH</span>
            </h2>
            <h2 className="font-display text-4xl md:text-4xl text-foreground mb-6 leading-tight">
              Crafting Visual <br />
              <span className="italic text-gold">Poetry</span> Through Light
            </h2>
            <div className="gold-line mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-6">
              I am Nagesh , a luxury photographer based in Paris, specializing in weddings, 
              fine art portraits, and commercial campaigns. My work is defined by cinematic 
              storytelling — each frame a carefully composed narrative of emotion and light.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              With over a decade behind the lens, I've had the privilege of photographing 
              love stories across three continents, contributing to prestigious fashion 
              editorials, and winning recognition at international photography awards.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center group">
                  <Icon className="w-5 h-5 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-display text-2xl text-foreground">{value}</div>
                  <div className="text-muted-foreground text-xs tracking-widest uppercase">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
