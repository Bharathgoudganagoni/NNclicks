import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Camera, Sparkles, Building2, Check } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Full-day coverage of your love story, from intimate moments to grand celebrations.",
    packages: ["8 hours coverage", "500+ edited photos", "Premium album", "Online gallery"],
    price: "$3,800",
    highlight: false,
  },
  {
    icon: Camera,
    title: "Pre-Wedding",
    description: "Romantic sessions that capture your chemistry before the big day.",
    packages: ["4 hours session", "250+ edited photos", "Location scouting", "2 outfit changes"],
    price: "$1,200",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Portrait Sessions",
    description: "Timeless portraits that reveal your authentic, most luminous self.",
    packages: ["2 hours session", "100+ edited photos", "Studio or outdoor", "Same-week delivery"],
    price: "$680",
    highlight: false,
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Brand campaigns, product photography, and editorial content for luxury brands.",
    packages: ["Full day shoot", "Unlimited concepts", "Commercial license", "Art direction"],
    price: "Custom",
    highlight: false,
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-pad bg-charcoal relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(38 52% 61% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">What I Offer</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Services & <span className="italic text-gold">Packages</span>
          </h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`group relative p-8 border transition-all duration-500 hover:-translate-y-2 ${
                service.highlight
                  ? "border-gold bg-gold/5 shadow-[0_0_40px_hsl(38_52%_61%/0.15)]"
                  : "border-border hover:border-gold/40 glass-card"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-primary-foreground text-[10px] tracking-widest uppercase font-sans">
                  Most Popular
                </div>
              )}

              <service.icon className={`w-8 h-8 mb-6 ${service.highlight ? "text-gold" : "text-muted-foreground group-hover:text-gold transition-colors"}`} />

              <h3 className="font-display text-xl text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

              <ul className="space-y-2 mb-8">
                {service.packages.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3 h-3 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="text-gold font-display text-2xl mb-4">
                  {service.price}
                  {service.price !== "Custom" && <span className="text-muted-foreground text-sm font-sans"> / session</span>}
                </div>
                <button
                  data-hover
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    service.highlight
                      ? "bg-gold text-primary-foreground hover:bg-gold-light"
                      : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
