import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import weddingImg from "@/assets/gallery-wedding.jpg";
import fashionImg from "@/assets/gallery-fashion.jpg";
import portraitImg from "@/assets/gallery-portrait.jpg";
import eventsImg from "@/assets/gallery-events.jpg";
import natureImg from "@/assets/gallery-nature.jpg";
import commercialImg from "@/assets/gallery-commercial.jpg";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Weddings", "Fashion", "Portraits", "Events", "Nature", "Commercial"];

const photos = [
  { src: weddingImg, category: "Weddings", title: "Golden Hour Romance", span: "row-span-2" },
  { src: fashionImg, category: "Fashion", title: "Shadow & Silk", span: "row-span-3" },
  { src: portraitImg, category: "Portraits", title: "Whispers in the Forest", span: "row-span-2" },
  { src: eventsImg, category: "Events", title: "The Grand Gala", span: "row-span-2" },
  { src: natureImg, category: "Nature", title: "Mountain Solitude", span: "row-span-2" },
  { src: commercialImg, category: "Commercial", title: "Liquid Gold", span: "row-span-2" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof photos[0]>(null);

  const filtered = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-pad bg-background relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Visual Stories</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Portfolio <span className="italic text-gold">Gallery</span>
          </h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-hover
              className={`px-5 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative overflow-hidden cursor-pointer ${photo.span}`}
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <ZoomIn className="w-8 h-8 text-gold mb-2" />
                  <h3 className="font-display text-lg text-foreground">{photo.title}</h3>
                  <span className="text-gold text-[10px] tracking-widest uppercase">{photo.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-display text-2xl text-foreground">{lightbox.title}</h3>
                <span className="text-gold text-xs tracking-widest uppercase">{lightbox.category}</span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-gold transition-colors"
              >
                <X size={28} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
