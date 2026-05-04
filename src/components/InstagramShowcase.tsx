import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Instagram, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import custom plain CSS for this section
import "./InstagramShowcase.css";

import img1 from "@/assets/NNOO9071 copy.jpg";
import img2 from "@/assets/gallery-fashion.jpeg";
import img3 from "@/assets/bb.jpg";
import img4 from "@/assets/gallery-wedding.jpg";
import img5 from "@/assets/gallery-nature.jpg";
import img6 from "@/assets/gallery-events.jpg";

// --- Types ---
type MediaType = "IMAGE" | "VIDEO";

interface InstagramPost {
  id: string;
  type: MediaType;
  url: string; // The image or video source
  thumbnail?: string; // Thumbnail for videos
  caption: string;
  likes: number;
  comments: number;
  permalink: string;
}

// --- Mock Data ---
// In a real scenario, this would be fetched from Instagram Graph API or a backend proxy.
const MOCK_POSTS: InstagramPost[] = [
  {
    id: "1",
    type: "IMAGE",
    url: img1,
    caption: "Capturing the purest emotions on their special day. The golden hour gave us the perfect lighting. ✨ #weddingphotography #nnclicks #goldenhour",
    likes: 1245,
    comments: 89,
    permalink: "https://www.instagram.com/nn__clicks",
  },
  {
    id: "2",
    type: "IMAGE",
    url: img2,
    caption: "Elegance in every frame. Studio portrait session exploring dramatic shadows and soft highlights. 🖤 #portraitphotography #studio #moody",
    likes: 3412,
    comments: 156,
    permalink: "https://www.instagram.com/nn__clicks",
  },
  {
    id: "3",
    type: "IMAGE",
    url: img3,
    caption: "The details that make the day unforgettable. Rings, roses, and promises. 💍🌹 #weddingdetails #nnclicks #macro",
    likes: 892,
    comments: 42,
    permalink: "https://www.instagram.com/nn__clicks",
  },
  {
    id: "4",
    type: "IMAGE",
    url: img4,
    caption: "Behind the scenes of our latest fashion editorial shoot. Great team, incredible results! 📸🎬 #bts #fashionphotography #nnclicks",
    likes: 1567,
    comments: 112,
    permalink: "https://www.instagram.com/nn__clicks",
  },
  {
    id: "5",
    type: "IMAGE",
    url: img5,
    caption: "Festive vibes and vibrant colors. Celebrating culture and tradition. ✨🌿 #candidphotography #nnclicks #events",
    likes: 2109,
    comments: 78,
    permalink: "https://www.instagram.com/nn__clicks",
  },
  {
    id: "6",
    type: "IMAGE",
    url: img6,
    caption: "A cinematic glimpse into Sarah & John's beautiful wedding reception. 🎵 #weddingreel #cinematography #nnclicks",
    likes: 1120,
    comments: 54,
    permalink: "https://www.instagram.com/nn__clicks",
  }
];

export default function InstagramShowcase() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Video element refs to control autoplay
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Simulate API fetching
  useEffect(() => {
    const fetchInstagramContent = async () => {
      try {
        // In a real app, you would fetch from your API endpoint here:
        // const response = await fetch('/api/instagram/posts');
        // const data = await response.json();
        
        // Simulating network delay for realistic loading state
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPosts(MOCK_POSTS);
      } catch (error) {
        console.error("Failed to fetch Instagram posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramContent();
  }, []);

  // Handle playing/pausing videos based on active slide
  useEffect(() => {
    if (posts.length === 0) return;

    Object.keys(videoRefs.current).forEach((key) => {
      const videoElement = videoRefs.current[key];
      if (videoElement) {
        if (key === posts[activeSlideIndex]?.id && posts[activeSlideIndex]?.type === "VIDEO") {
          // Play the active video
          videoElement.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
          // Pause and reset non-active videos
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });
  }, [activeSlideIndex, posts]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="insta-section section-pad"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <Instagram className="text-gold" size={28} />
            <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">
              Captured Moments
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="gold-line mb-4"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground max-w-2xl text-sm md:text-base"
          >
            A cinematic glimpse into our latest shoots, stories, and behind-the-scenes. 
            Follow us <a href="https://www.instagram.com/nn__clicks" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">@nn__clicks</a> for more.
          </motion.p>
        </div>

        {/* Carousel Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {isLoading ? (
            // Skeleton Loaders
            <div className="flex gap-4 overflow-hidden py-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-card flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
              ))}
            </div>
          ) : (
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false, // We use custom css shadows
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              className="insta-swiper"
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id} className="max-w-[320px] md:max-w-[380px]">
                  <div 
                    className="insta-card"
                    onClick={() => window.open(post.permalink, '_blank')}
                  >
                    <div className="insta-card-glow" />
                    
                    {/* Media Type Icon */}
                    <div className="insta-type-icon">
                      {post.type === "VIDEO" ? <Play size={20} fill="currentColor" /> : <Instagram size={20} />}
                    </div>

                    {/* Media Content */}
                    <div className="insta-media-container">
                      {post.type === "VIDEO" ? (
                        <video
                          ref={(el) => (videoRefs.current[post.id] = el)}
                          src={post.url}
                          poster={post.thumbnail}
                          className="insta-media"
                          muted
                          playsInline
                          loop
                        />
                      ) : (
                        <img 
                          src={post.url} 
                          alt="Instagram Post" 
                          className="insta-media"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Overlay Info */}
                    <div className="insta-overlay">
                      <p className="insta-caption">{post.caption}</p>
                      <div className="insta-stats mt-2">
                        <span className="insta-stat-item">
                          <Heart size={16} className="text-gold" fill="currentColor" />
                          {post.likes.toLocaleString()}
                        </span>
                        <span className="insta-stat-item">
                          <MessageCircle size={16} className="text-white" />
                          {post.comments.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
}
