import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryItems = [
  { src: gallery1, title: "Matte Black Sedan Wrap", tag: "Full Wrap" },
  { src: gallery2, title: "Electric Blue SUV Gloss", tag: "Full Wrap" },
  { src: gallery3, title: "Satin Red Coupe Finish", tag: "Full Wrap" },
  { src: gallery4, title: "PPF Installation", tag: "PPF" },
  { src: gallery5, title: "Metallic Gold Sedan", tag: "Full Wrap" },
  { src: gallery6, title: "Ceramic Coating Detail", tag: "Ceramic" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigate = useCallback((dir: 1 | -1) => {
    setSelectedImage((prev) =>
      prev !== null ? (prev + dir + galleryItems.length) % galleryItems.length : null
    );
  }, []);

  const handleSwipe = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 60) {
        navigate(info.offset.x > 0 ? -1 : 1);
      }
    },
    [navigate]
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 african-pattern opacity-20" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <span className="text-primary font-display font-semibold uppercase tracking-widest text-sm">
            Our Work
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mt-2">
            Recent <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Browse our latest wrap jobs, PPF installations, and ceramic coatings.
          </p>
          <div className="african-border mx-auto max-w-xs mt-6" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-border/10 touch-manipulation"
              onClick={() => setSelectedImage(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {item.tag}
                </span>
                <h3 className="font-display font-bold text-white text-xs sm:text-sm lg:text-base">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox with swipe support */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-primary transition-colors p-2 touch-manipulation"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            {/* Prev/Next buttons (visible on larger screens, hidden on mobile where swipe is used) */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 touch-manipulation hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 touch-manipulation hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image with swipe */}
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipe}
              src={galleryItems[selectedImage].src}
              alt={galleryItems[selectedImage].title}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] rounded-xl object-contain select-none touch-manipulation"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-10">
              <p className="text-white font-display font-semibold text-sm sm:text-base">
                {galleryItems[selectedImage].title}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {selectedImage + 1} / {galleryItems.length} — Swipe to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
