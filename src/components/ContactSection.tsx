import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Camera,
  Aperture,
  Film,
  Image as ImageIcon,
} from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = `Hello! I'd like to connect.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/918099963800?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="section-pad bg-charcoal relative overflow-hidden"
    >
      {/* 🌌 Moving Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Floating Photography Elements */}
        {[Camera, Aperture, Film, ImageIcon].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-gold opacity-10"
            style={{
              top: `${15 + index * 18}%`,
              left: index % 2 === 0 ? "8%" : "85%",
            }}
            animate={{
              y: [0, index % 2 === 0 ? -30 : 30, 0],
              rotate: [0, index % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={120 - index * 15} />
          </motion.div>
        ))}

        {/* Extra floating cameras */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cam-${i}`}
            className="absolute text-gold opacity-10"
            style={{
              top: `${10 + i * 20}%`,
              left: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera size={60 + i * 10} />
          </motion.div>
        ))}
      </motion.div>

      {/* 🌟 Main Content */}
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Capture Your Vision
          </p>

          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Let’s Frame Your <span className="italic text-gold">Perfect Story</span>
          </h2>

          <div className="gold-line mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-12 text-lg">
              Photography is more than images — it's frozen emotions,
              timeless memories, and powerful storytelling. Let’s create
              visuals that live forever.
            </p>

            <div className="space-y-10">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "renikuntanagesh72@gmail.com",
                  link: "mailto:renikuntanagesh72@gmail.com",
                },
                {
                  icon: Phone,
                  title: "Direct Call",
                  value: "+91 8099963800",
                  link: "tel:+918099963800",
                },
                {
                  icon: MapPin,
                  title: "Studio Location",
                  value: "NN Studio , Raghavapur",
                  link: "https://www.google.com/maps/place/N+N+DIGITAL+STUDIO/",
                },
              ].map(({ icon: Icon, title, value, link }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  className="flex items-center gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className="w-14 h-14 border border-gold/40 flex items-center justify-center relative"
                  >
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gold/10 rounded-full blur-lg"
                    />
                    <Icon className="w-6 h-6 text-gold relative z-10" />
                  </motion.div>

                  <div>
                    <div className="text-xs tracking-widest text-muted-foreground uppercase mb-1">
                      {title}
                    </div>
                    <a
                      href={link}
                      target={title === "Studio Location" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-foreground text-lg group-hover:text-gold transition duration-300"
                    >
                      {value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center glass-card p-12 border border-gold/20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mb-6"
                >
                  <Aperture className="w-8 h-8 text-gold" />
                </motion.div>

                <h3 className="font-display text-2xl text-foreground mb-3">
                  Frame Reserved Successfully 📸
                </h3>

                <p className="text-muted-foreground">
                  Your moment is now in focus. I’ll connect with you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                <div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl py-4 px-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl py-4 px-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl py-4 px-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your event or project..."
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl py-4 px-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all resize-none shadow-inner"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-gold hover:bg-white text-black transition-all duration-300 py-4 rounded-xl flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-1"
                >
                  <Send size={18} />
                  Send Details
                </button>
              </form>
            )}
            {/* 🎥 Moving Photography Background With Real Flash Effect */}
{[...Array(4)].map((_, i) => (
  <motion.div
    key={`camera-${i}`}
    className="absolute text-gold opacity-10"
    style={{
      top: `${15 + i * 18}%`,
      left: i % 2 === 0 ? "12%" : "80%",
    }}
    animate={{
      y: [0, -25, 0],
      rotate: [0, 8, 0],
    }}
    transition={{
      duration: 8 + i,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Camera */}
    <Camera size={110} />

    {/* 📸 Realistic Flash Near Lens */}
    <motion.div
      className="absolute top-4 left-6 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.8, 2.5],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 6,
        delay: i * 2, // one after one flash
      }}
    >
      <div className="w-40 h-40 bg-white rounded-full blur-2xl opacity-90" />
    </motion.div>
  </motion.div>
))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}