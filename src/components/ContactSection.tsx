import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad bg-charcoal relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Let's Connect</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Book a <span className="italic text-gold">Session</span>
          </h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-10">
              Ready to tell your story through timeless imagery? I'd love to hear about your vision. 
              Reach out and let's create something extraordinary together.
            </p>

            <div className="space-y-6 mb-10">
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Email</div>
                  <div className="text-foreground">renikuntanagesh72@gmail.com</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Phone</div>
                  <div className="text-foreground">+91 8099963800</div>
                </div>
              </div>

              {/* Studio Location (UPDATED) */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Studio</div>

                  <a
                    href="https://www.google.com/maps/place/N+N+DIGITAL+STUDIO/@18.1790418,78.7774836,19.95z/data=!4m6!3m5!1s0x3bccf33ce54dfe3b:0x40efad0bcc090df2!8m2!3d18.1788553!4d78.7769348!16s%2Fg%2F11sbwng6t4?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click to view location"
                    className="text-foreground hover:text-gold transition-colors duration-300 cursor-pointer underline-offset-4 hover:underline"
                  >
                    NN Studio , Raghavapur
                  </a>

                </div>
              </div>

            </div>

            {/* Social */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Follow My Journey</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href + Icon.name}
                    href={href}
                    className="w-10 h-10 border border-border hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-muted-foreground"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Section remains same */}
          {/* (No changes done below this point) */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center glass-card p-12 border border-gold/20"
              >
                <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6 animate-pulse-gold">
                  <Send className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">Message Received</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your existing form code unchanged */}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}