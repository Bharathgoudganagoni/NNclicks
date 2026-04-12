import { useState, useRef } from "react";
import { Camera, Upload, X, Download, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.jpg";

export default function ImageFramer() {
  const [isOpen, setIsOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [framedImage, setFramedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // Extremely fast object URL creation instead of slow FileReader base64 encoding
      const objectUrl = URL.createObjectURL(file);
      setOriginalImage(objectUrl);
      
      // Delay processing strictly to next tick to ensure the "Processing" UI renders first
      setTimeout(() => {
        processImage(objectUrl);
      }, 50);
    }
  };

  const processImage = (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      // 1. Calculate dimensions (limit max to 1080 bounds roughly, scaling down proportionally)
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 1080;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = (height / width) * MAX_SIZE;
          width = MAX_SIZE;
        } else {
          width = (width / height) * MAX_SIZE;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 2. Draw base image
      ctx.drawImage(img, 0, 0, width, height);

      // 3. Draw Themed Frames (Dynamic Blue/Silver Swoosh matching reference)
      // Subtle grey bounding box line around everything
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = width * 0.005;
      ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, width - ctx.lineWidth*2, height - ctx.lineWidth*2);

      // Helper function for the swooping ribbon corners matching the reference image layout
      const drawCornerSwoosh = (x: number, y: number, rot: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        
        const sizeX = width * 0.55; // Swoosh reaches 55% of width
        const sizeY = height * 0.35; // Swoosh reaches 35% of height

        // Black outer corner
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(sizeX * 0.6, 0);
        ctx.bezierCurveTo(sizeX * 0.3, sizeY * 0.1, sizeX * 0.1, sizeY * 0.3, 0, sizeY * 0.6);
        ctx.fill();

        // Thin silver band
        ctx.fillStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.moveTo(sizeX * 0.6, 0);
        ctx.lineTo(sizeX * 0.68, 0);
        ctx.bezierCurveTo(sizeX * 0.35, sizeY * 0.12, sizeX * 0.12, sizeY * 0.35, 0, sizeY * 0.68);
        ctx.lineTo(0, sizeY * 0.6);
        ctx.bezierCurveTo(sizeX * 0.1, sizeY * 0.3, sizeX * 0.3, sizeY * 0.1, sizeX * 0.6, 0);
        ctx.fill();

        // Bright Blue solid band
        const blueGrad = ctx.createLinearGradient(0, 0, sizeX * 0.3, sizeY * 0.3);
        blueGrad.addColorStop(0, '#00a8ff');
        blueGrad.addColorStop(1, '#0066cc');
        ctx.fillStyle = blueGrad;
        ctx.beginPath();
        ctx.moveTo(sizeX * 0.68, 0);
        ctx.lineTo(sizeX * 0.85, 0);
        ctx.bezierCurveTo(sizeX * 0.4, sizeY * 0.15, sizeX * 0.15, sizeY * 0.4, 0, sizeY * 0.85);
        ctx.lineTo(0, sizeY * 0.68);
        ctx.bezierCurveTo(sizeX * 0.12, sizeY * 0.35, sizeX * 0.35, sizeY * 0.12, sizeX * 0.68, 0);
        ctx.fill();

        // Dark Blue inner edge
        ctx.fillStyle = '#003388';
        ctx.beginPath();
        ctx.moveTo(sizeX * 0.85, 0);
        ctx.lineTo(sizeX * 0.9, 0);
        ctx.bezierCurveTo(sizeX * 0.45, sizeY * 0.18, sizeX * 0.18, sizeY * 0.45, 0, sizeY * 0.9);
        ctx.lineTo(0, sizeY * 0.85);
        ctx.bezierCurveTo(sizeX * 0.15, sizeY * 0.4, sizeX * 0.4, sizeY * 0.15, sizeX * 0.85, 0);
        ctx.fill();
        
        ctx.restore();
      };

      // Apply the top-left and bottom-right swooshes 
      drawCornerSwoosh(0, 0, 0);
      drawCornerSwoosh(width, height, Math.PI);

      // 4. Draw Logo and Watermark Text
      const logo = new Image();
      logo.src = logoImg;
      logo.onload = () => {
        // Place logo on TOP RIGHT to exactly match the reference layout
        const logoSize = width * 0.12; // Large distinct sizing
        const paddingRight = width * 0.05;
        const paddingTop = height * 0.05;
        
        const logoX = width - paddingRight - logoSize;
        const logoY = paddingTop;

        // Place the "NN Clicks" signature text securely on the BOTTOM LEFT overlaying the image
        const textX = width * 0.05;
        const textY = height - (height * 0.05);

        // Heavy shadow logic to ensure logo and white text can be seen regardless of the photo underneath
        ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        // Draw circular clip around the logo 
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        ctx.restore();

        // Draw Watermark Text
        ctx.font = `italic 800 ${Math.floor(width * 0.04)}px 'Inter', sans-serif`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left"; 
        ctx.textBaseline = "bottom";
        
        ctx.fillText("NN Clicks", textX, textY);

        // Turn off shadows
        ctx.shadowColor = "transparent";

        // Export URL
        // Export URL explicitly as JPEG with 80% quality - virtually instantaneous
        setFramedImage(canvas.toDataURL('image/jpeg', 0.8));
        setIsProcessing(false);
      };
      
      // Fallback if logo fails to load for some reason
      logo.onerror = () => {
         ctx.font = `italic ${Math.floor(width * 0.05)}px 'Inter', sans-serif`;
         ctx.fillStyle = "#d4af37";
         ctx.textAlign = "right";
         ctx.fillText("NN Clicks", width * 0.55, height * 0.55);
         setFramedImage(canvas.toDataURL('image/jpeg', 0.8));
         setIsProcessing(false);
      }
    };
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setOriginalImage(null);
      setFramedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 300);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-black/80 border border-gold/40 rounded-full flex items-center justify-center backdrop-blur-xl text-gold hover:bg-gold hover:text-black transition-all hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          title="Frame Custom Photo"
        >
          <ImagePlus size={20} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            <button
              onClick={closeAndReset}
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-3xl flex flex-col items-center mt-12 md:mt-0">
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4 text-center">
                Custom <span className="italic text-gold">Framer</span>
              </h2>
              <p className="text-muted-foreground text-center mb-10 text-sm max-w-lg">
                Upload your picture and we'll apply our signature dynamic golden frames and studio watermark explicitly for you!
              </p>

              {!framedImage && (
                <div 
                  className="w-full aspect-video md:aspect-[4/3] border-2 border-dashed border-gold/30 rounded-2xl flex flex-col items-center justify-center bg-white/5 cursor-pointer hover:bg-white/10 transition-colors group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isProcessing ? (
                     <div className="text-gold flex flex-col items-center gap-4 animate-pulse">
                        <Camera size={48} className="animate-[spin_3s_linear_infinite]" />
                        <span className="tracking-widest uppercase text-xs">Processing Dimensions...</span>
                     </div>
                  ) : (
                    <>
                      <Upload size={48} className="text-gold/50 group-hover:text-gold transition-colors mb-4" />
                      <span className="text-foreground tracking-wider uppercase text-sm">Tap to Upload Image</span>
                    </>
                  )}
                </div>
              )}

              {framedImage && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full flex flex-col items-center"
                >
                  <img src={framedImage} alt="Framed preview" className="max-h-[60vh] object-contain shadow-2xl rounded-md border border-white/10 mb-8" />
                  
                  <div className="flex gap-4 flex-wrap justify-center">
                    <button
                      onClick={() => setFramedImage(null)}
                      className="px-6 py-3 border border-border text-foreground hover:border-gold hover:text-gold transition-colors tracking-widest uppercase text-xs rounded-sm"
                    >
                      Try Another
                    </button>
                    <a
                      href={framedImage}
                      download="NNClicks-Framed.png"
                      className="px-6 py-3 bg-gold text-black hover:bg-white transition-colors tracking-widest uppercase font-semibold text-xs rounded-sm flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Hidden canvas for off-screen processing */}
            <canvas ref={canvasRef} className="hidden" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
