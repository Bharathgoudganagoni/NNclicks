import { Instagram, Youtube } from "lucide-react";

export default function Footer() {

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="font-display text-xl tracking-widest text-gold">
          NN <span className="text-foreground font-light italic">Clicks</span>
        </div>

        {/* Copyright */}
        <p className="text-muted-foreground text-xs tracking-widest text-center">
          © {new Date().getFullYear()} NN Clicks Photography. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">

          <button
            onClick={(e) => {
              e.stopPropagation();
              openLink("https://www.instagram.com/nn__clicks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==");
            }}
            className="text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <Instagram size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openLink("https://www.youtube.com/@nageshphotography4197");
            }}
            className="text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <Youtube size={16} />
          </button>

        </div>
      </div>
    </footer>
  );
}