import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import technicalServicesImage from "../assets/technical-services.jpg";
import electmechicalWorksImage from "../assets/electromechanical-works.jpg";
import scaffoldingFormworkImage from "../assets/scaffolding-formwork.jpg";
import airConditioningImage from "../assets/air-conditioning.avif";
import plumbingServicesImage from "../assets/plumbing-services.png";
import carpentryFlooringImage from "../assets/carpentry-flooring.jpg";
import falseCeilingPartitionsImage from "../assets/false-ceiling-partitions.jpg";
import plasterWorksImage from "../assets/plaster-works.jpg";
import buildingCleaningImage from "../assets/building-cleaning.jpg";

// Updated services data with correctly referenced image paths
const services = [
  {
    id: 1,
    title: "Technical Services",
    description:
      "Installation works for false ceilings, light partitions, glass and aluminium, plumbing, painting, carpentry and other technical works with expert attention to detail.",
    icon: "wrench",
    color: "#3498db",
    features: [
      "False Ceilings",
      "Light Partitions",
      "Glass & Aluminium",
      "Insulation Works",
    ],
    imagePath: technicalServicesImage,
  },
  {
    id: 2,
    title: "Electromechanical Works",
    description:
      "Expert electrical and mechanical installation including lifts, escalators, pumps, fire protection, and electrical systems for commercial and industrial facilities.",
    icon: "bolt",
    color: "#f39c12",
    features: [
      "Lifts & Escalators",
      "Fire Protection",
      "Electrical Systems",
      "Pumps & Motors",
    ],
    imagePath: electmechicalWorksImage,
  },
  {
    id: 3,
    title: "Scaffolding & Formwork",
    description:
      "Professional scaffolding and formwork solutions using different techniques to support construction projects, with maintenance and repair services.",
    icon: "construction",
    color: "#e74c3c",
    features: [
      "Safety Compliant",
      "Custom Designed",
      "Repair Services",
      "Maintenance Works",
    ],
    imagePath: scaffoldingFormworkImage,
  },
  {
    id: 4,
    title: "Air-Conditioning",
    description:
      "Installation, maintenance and repair of HVAC systems, including fitting devices, reconditioning units, cleaning air ducts, and fixing fans and filters.",
    icon: "snowflake",
    color: "#1abc9c",
    features: [
      "Installation",
      "Maintenance",
      "Air Filtration",
      "Ventilation Systems",
    ],
    imagePath: airConditioningImage,
  },
  {
    id: 5,
    title: "Plumbing Services",
    description:
      "Comprehensive plumbing and sanitary installations including water pipes, washbasins, bathtubs, lavatories, taps, and various bathroom and kitchen fixtures.",
    icon: "droplet",
    color: "#3498db",
    features: [
      "Sanitary Installations",
      "Leak Repairs",
      "Bathroom Fixtures",
      "Kitchen Systems",
    ],
    imagePath: plumbingServicesImage,
  },
  {
    id: 6,
    title: "Carpentry & Flooring",
    description:
      "Expert wood flooring installation and interior woodwork, including carpentry, roofing work, and custom wooden solutions for residential and commercial spaces.",
    icon: "clipboard",
    color: "#8e44ad",
    features: [
      "Wood Flooring",
      "Interior Woodwork",
      "Roofing Solutions",
      "Custom Carpentry",
    ],
    imagePath: carpentryFlooringImage,
  },
  {
    id: 7,
    title: "False Ceiling & Partitions",
    description:
      "Professional installation of false ceilings and wooden or metallic partitions used to divide space in offices and other premises, including fit-out works.",
    icon: "layers",
    color: "#2ecc71",
    features: [
      "False Ceilings",
      "Office Partitions",
      "Fit-out Works",
      "Space Division",
    ],
    imagePath: falseCeilingPartitionsImage,
  },
  {
    id: 8,
    title: "Plaster Works",
    description:
      "Specialized plastering for interiors with marble, granite, natural stone, tiles, and ceramics for both protective and decorative purposes, including masonry works.",
    icon: "tool",
    color: "#e67e22",
    features: [
      "Marble & Granite",
      "Natural Stone",
      "Tiles & Ceramics",
      "Masonry Works",
    ],
    imagePath: plasterWorksImage,
  },
  {
    id: 9,
    title: "Building Cleaning",
    description:
      "Comprehensive cleaning services for interior, exterior, and surrounding areas of residential buildings, government facilities, and professional premises.",
    icon: "sparkles",
    color: "#3498db",
    features: [
      "Interior Cleaning",
      "Exterior Cleaning",
      "Facility Maintenance",
      "Professional Premises",
    ],
    imagePath: buildingCleaningImage,
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Check if mobile on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Reset image loaded state when service changes
  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeService]);

  // Animate heading elements on load
  useEffect(() => {
    const headingElements = headingRef.current;
    if (headingElements) {
      const headingBadge = headingElements.querySelector(
        "[data-element='heading-badge']"
      );
      const headingText = headingElements.querySelector(
        "[data-element='heading-text']"
      );
      const headingUnderline = headingElements.querySelector(
        "[data-element='heading-underline']"
      );
      const headingSubtext = headingElements.querySelector(
        "[data-element='heading-subtext']"
      );

      const animateElement = (element, delay, animation) => {
        if (element) {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translate(0, 0)";
          }, delay);
        }
      };

      animateElement(headingBadge, 300);
      animateElement(headingText, 500);
      animateElement(headingUnderline, 700);
      animateElement(headingSubtext, 900);
    }
  }, []);

  // Navigate to previous service
  const prevService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Navigate to next service
  const nextService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle service card navigation
  const goToService = (index) => {
    if (isAnimating || index === activeService) return;
    setIsAnimating(true);
    setDirection(index > activeService ? 1 : -1);
    setActiveService(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Helper component for icons
  const IconComponent = ({ name, color, size = 8 }) => {
    const sizeClass = `w-${size} h-${size}`;

    switch (name) {
      case "wrench":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        );
      case "bolt":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        );
      case "snowflake":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 3v18m-9-9h18M8.4 8.4l7.2 7.2M8.4 15.6l7.2-7.2"
            ></path>
          </svg>
        );
      case "droplet":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            ></path>
          </svg>
        );
      case "construction":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
        );
      case "clipboard":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
        );
      case "layers":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        );
      case "tool":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        );
      case "sparkles":
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            ></path>
          </svg>
        );
      default:
        return (
          <svg
            className={sizeClass}
            fill="none"
            stroke={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        );
    }
  };

  // Animation variants for cards
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }, 
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    }),
  };

  // Particles for background effect
  const BackgroundParticles = () => (
    <div className="particles" aria-hidden="true">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-950 relative min-h-screen overflow-hidden py-20"
      aria-label="Our Services"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl opacity-30 transform -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent opacity-20"></div>
        <BackgroundParticles />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Heading section */}
        <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-16">
          <span
            data-element="heading-badge"
            className="inline-block px-4 py-1 bg-white/10 text-blue-400 text-sm font-medium rounded-full mb-6 opacity-0 transform translate-y-6 transition-all duration-500"
          >
            Our Services
          </span>
          <div className="mb-2 relative">
            <h2
              data-element="heading-text"
              className="text-3xl md:text-5xl xl:text-6xl font-bold text-white relative inline-block opacity-0 transform translate-y-6 transition-all duration-700"
            >
              Why Choose BuildCraft?
              <span
                data-element="heading-underline"
                className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300/30 opacity-0 transition-all duration-1000"
                style={{ width: "0%" }}
              ></span>
            </h2>
          </div>
          <p
            data-element="heading-subtext"
            className="text-lg text-neutral-400 mt-8 max-w-2xl mx-auto opacity-0 transform translate-y-6 transition-all duration-700"
          >
            At BuildCraft, we go beyond expectations by offering a comprehensive
            range of specialized contracting and facilities management services.
            Backed by years of expertise, we deliver tailored solutions for
            residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Main content area */}
        <div ref={cardsContainerRef} className="relative max-w-6xl mx-auto">
          {/* Service cards with animation */}
          <div className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeService}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
              >
                <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl border border-white/5">
                  <div className="flex flex-col md:flex-row min-h-[500px]">
                    {/* Left side - Service info */}
                    <div className="p-8 md:p-12 flex flex-col md:w-1/2 relative z-10">
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-8"
                        style={{
                          backgroundColor: `${services[activeService].color}22`,
                          boxShadow: `0 8px 24px -8px ${services[activeService].color}33`,
                        }}
                      >
                        <IconComponent
                          name={services[activeService].icon}
                          color={services[activeService].color}
                          size={isMobile ? 7 : 8}
                        />
                      </div>

                      <h3
                        className="text-3xl md:text-4xl font-bold mb-6"
                        style={{ color: services[activeService].color }}
                      >
                        {services[activeService].title}
                      </h3>

                      <p className="text-white/90 mb-8 text-lg">
                        {services[activeService].description}
                      </p>

                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {services[activeService].features.map(
                          (feature, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 rounded-lg text-sm font-medium"
                              style={{
                                backgroundColor: `${services[activeService].color}22`,
                                color: services[activeService].color,
                              }}
                            >
                              {feature}
                            </span>
                          )
                        )}
                      </div>

                      <div className="mt-auto">
                        <button
                          className="group flex items-center"
                          style={{ color: services[activeService].color }}
                          aria-label={`Learn more about ${services[activeService].title}`}
                        >
                          <span className="font-medium mr-3 relative overflow-hidden">
                            Learn more
                            <span className="block h-0.5 w-full bg-current opacity-30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                            <span className="block h-0.5 w-0 bg-current absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
                        </button>
                      </div>
                    </div>

                    {/* Right side - Service Image and Decorative Elements */}
                    <div className="md:w-1/2 relative overflow-hidden">
                      {/* Image */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="w-full h-full relative">
                          {/* Use the actual imported image */}
                          <img
                            src={services[activeService].imagePath}
                            alt={services[activeService].title}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${
                              isImageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={handleImageLoad}
                          />

                          {/* Image Overlay */}
                          <div
                            className="absolute inset-0 mix-blend-multiply"
                            style={{
                              background: `linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.7))`,
                            }}
                          ></div>

                          {/* Loading state */}
                          {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                              <div className="w-12 h-12 border-4 border-neutral-600 border-t-blue-400 rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/70 mix-blend-multiply z-10"></div>
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          background: `radial-gradient(circle at 70% 50%, ${services[activeService].color}22 0%, transparent 70%)`,
                        }}
                      ></div>

                      {/* Decorative elements */}
                      <div className="absolute inset-0 overflow-hidden z-20">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-t from-transparent to-white/5"></div>
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/10"></div>
                        <div
                          className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full border-2"
                          style={{
                            borderColor: `${services[activeService].color}22`,
                          }}
                        ></div>

                        {/* Service number */}
                        <div className="absolute top-8 right-8 md:top-12 md:right-12">
                          <span
                            className="text-8xl md:text-9xl font-bold opacity-10"
                            style={{ color: services[activeService].color }}
                          >
                            {activeService + 1}
                          </span>
                        </div>

                        {/* Icon pattern */}
                        <div className="absolute bottom-8 left-8 opacity-20">
                          <IconComponent
                            name={services[activeService].icon}
                            color={services[activeService].color}
                            size={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={prevService}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous service"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </motion.button>

            <motion.button
              onClick={nextService}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next service"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </motion.button>
          </div>

          {/* Service indicator dots */}
          <div
            className="flex justify-center space-x-2 mt-8"
            role="tablist"
            aria-label="Service navigation"
          >
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
                onClick={() => goToService(index)}
                role="tab"
                aria-selected={activeService === index}
                aria-label={`View ${service.title}`}
              >
                <motion.div
                  className="w-3 h-3 rounded-full cursor-pointer"
                  animate={{
                    backgroundColor:
                      activeService === index ? service.color : "#4b5563",
                    scale: activeService === index ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
