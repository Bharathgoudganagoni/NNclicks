import { motion } from "framer-motion";
import heroBg from "@/assets/NNOO9071 copy.jpg";

export default function HeroSection() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* BG Image with slow zoom */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background" />
      </div>

      {/* Floating light leak effects */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-1/4 left-[-20%] w-[60vw] h-[30vh] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsl(38 60% 60% / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ x: ["0%", "80%"], opacity: [0, 0.6, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[-10%] w-[40vw] h-[20vh] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsl(38 60% 60% / 0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ x: ["-60%", "0%"], opacity: [0, 0.5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-gold text-xs uppercase tracking-[0.4em] mb-8 font-sans"
        >
          Photography & Visual Storytelling
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-none text-foreground mb-4"
        >
          NN <span className="italic text-gold">Clicks</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="gold-line mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-muted-foreground text-lg md:text-xl font-display italic mb-12 max-w-xl mx-auto"
        >
          Capturing Timeless Moments
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToPortfolio}
            data-hover
            className="group relative px-10 py-4 border border-gold text-gold text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:text-primary-foreground"
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10">View Portfolio</span>
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-hover
            className="px-10 py-4 text-muted-foreground text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors duration-300"
          >
            Book a Session
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
