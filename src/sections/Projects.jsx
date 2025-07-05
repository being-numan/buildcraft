import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import project1Image from "../assets/project-1.png";
import project2Image from "../assets/project-2.jpg";
import project3Image from "../assets/project-3.jpg";
import project4Image from "../assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const galleryRef = useRef(null);

  const galleryImages = [
    {
      id: 1,
      image: project1Image,
    },
    {
      id: 2,
      image: project2Image,
    },
    {
      id: 3,
      image: project3Image,
    },
    {
      id: 4,
      image: project4Image,
    },
  ];

  useEffect(() => {
    // Animation for the heading
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for gallery container
    gsap.fromTo(
      galleryRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    );

    // Animated background for section
    gsap.fromTo(
      sectionRef.current,
      { backgroundPosition: "0% 50%" },
      {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Handle image click
  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, rgb(10, 10, 10), rgb(15, 15, 15), rgb(10, 10, 10))",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6"
          >
            Gallery of Work
          </h2>
          <p className="text-neutral-400">
            A showcase of our completed projects and technical capabilities.
          </p>
        </div>

        <div ref={galleryRef} className="relative max-w-6xl mx-auto">
          {/* Gallery Display */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Image Thumbnails */}
            <div className="md:col-span-2 space-y-4">
              {galleryImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`p-1 rounded-lg relative cursor-pointer transition-all duration-300 ${
                    activeImage === index
                      ? "bg-gradient-to-r from-primary to-primary/30"
                      : "bg-neutral-800/30 hover:bg-neutral-800/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="bg-neutral-900/50 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Work ${index + 1}`}
                      className="w-full h-24 object-cover transition-all duration-300 hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Image Display */}
            <div className="md:col-span-3">
              <motion.div
                className="bg-neutral-900/80 backdrop-blur-sm rounded-lg overflow-hidden h-full"
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Image */}
                <div className="h-80 md:h-96 relative overflow-hidden">
                  <img
                    src={galleryImages[activeImage].image}
                    alt={`Featured work ${activeImage + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>
                </div>

                {/* Navigation dots */}
                <div className="p-6">
                  <div className="flex justify-center space-x-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeImage === index
                            ? "bg-primary scale-125"
                            : "bg-neutral-600 hover:bg-neutral-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Optional: Grid View Toggle */}
          <div className="mt-12 text-center">
            {/* <button className="group inline-flex items-center px-6 py-3 bg-neutral-800/50 hover:bg-neutral-800 text-white rounded-lg transition-all duration-300">
              <span className="mr-2">View All Projects</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button> */}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Gallery;