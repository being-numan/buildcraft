import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import technicalServicesImage from "../assets/ts.jpeg";
import electmechicalWorksImage from "../assets/ew.jpeg";
import scaffoldingFormworkImage from "../assets/sfw.png";
import airConditioningImage from "../assets/ac.jpeg";
import plumbingServicesImage from "../assets/ps.jpeg";
import carpentryFlooringImage from "../assets/cs.jpeg";
import falseCeilingPartitionsImage from "../assets/fclp.jpeg";
import plasterWorksImage from "../assets/mw.jpeg";
import buildingCleaningImage from "../assets/bc.jpeg";

// Updated services data with detailed descriptions and service points
const services = [
  {
    id: 1,
    title: "Technical Services",
    description: "Technical Services ensure the smooth, safe, and efficient operation of building systems. Our expert team handles ongoing maintenance, troubleshooting, and system optimization.",
    icon: "wrench",
    color: "#3498db",
    features: [
      "False Ceilings",
      "Light Partitions", 
      "Glass & Aluminium",
      "Insulation Works",
    ],
    imagePath: technicalServicesImage,
    detailedDescription: "We focus on reliability, safety, and compliance in every task we perform. Regular technical upkeep reduces downtime and prevents costly failures. Our services enhance building performance and occupant comfort. We cater to all types of properties including residential, commercial, and industrial. All work is carried out in line with UAE regulations and industry standards. Trust us to keep your facilities running at peak efficiency year-round.",
    servicePoints: [
      "Plumbing and sanitary",
      "False ceiling and light partitions",
      "Glass & aluminium works",
      "Painting",
      "Carpentry & flooring",
      "Metal part erections",
      "Steel products",
      "Plaster",
      "Installations",
      "And other technical works"
    ]
  },
  {
    id: 2,
    title: "Electromechanical Works",
    description: "We handle the design, installation, and maintenance of integrated mechanical and electrical systems. With a focus on quality, safety, and efficiency, we ensure everything runs seamlessly.",
    icon: "bolt",
    color: "#f39c12",
    features: [
      "Lifts & Escalators",
      "Fire Protection",
      "Electrical Systems",
      "Pumps & Motors",
    ],
    imagePath: electmechicalWorksImage,
    detailedDescription: "Our team brings technical expertise to minimize downtime and enhance system reliability. Whether it's a new build or ongoing support, we tailor solutions to your project needs. Our work supports energy efficiency, sustainability, and long-term performance. We serve a wide range of sectors, following all UAE regulations and engineering standards. With us, your building systems stay fully operational — safe, smart, and future-ready.",
    servicePoints: [
      "Electromechanical equipment installations",
      "Lifts and escalators works",
      "Air conditioning",
      "Ventilation and air filtration system installation",
      "Plumbing system",
      "Pumps and motors",
      "Fire protection system"
    ]
  },
  {
    id: 3,
    title: "Scaffolding & Formwork",
    description: "Our Scaffolding and Formwork Services provide the structural backbone for safe and efficient construction. We deliver engineered access and support solutions that match each project's unique requirements.",
    icon: "construction",
    color: "#e74c3c",
    features: [
      "Safety Compliant",
      "Custom Designed",
      "Repair Services",
      "Maintenance Works",
    ],
    imagePath: scaffoldingFormworkImage,
    detailedDescription: "From high-rise access to complex formwork designs, our systems ensure precision and stability. Safety is at the core of everything we do, with full compliance to UAE regulations. Our skilled team handles setup, inspection, and removal with speed and accuracy. We support both short-term maintenance jobs and long-term construction phases. All equipment is certified and maintained to the highest standards. With us, your site stays secure, supported, and ready to build with confidence.",
    servicePoints: [
      "Erection and dismantling of scaffolding",
      "Scaffolding for access and safety",
      "Confined space or special access scaffolding",
      "Modular plastic for work",
      "Aluminium form work"
    ]
  },
  {
    id: 4,
    title: "Air-Conditioning",
    description: "Our Air Conditioning and Ventilation Services ensure comfortable, healthy, and climate-controlled environments year-round. We provide end-to-end solutions for cooling and air flow systems in all types of buildings.",
    icon: "snowflake",
    color: "#1abc9c",
    features: [
      "Installation",
      "Maintenance",
      "Air Filtration",
      "Ventilation Systems",
    ],
    imagePath: airConditioningImage,
    detailedDescription: "From installation to routine maintenance, we optimize performance and energy efficiency. Proper ventilation reduces humidity, controls odors, and enhances indoor air quality. Our team ensures seamless integration with building design and usage needs. We follow all UAE regulations for safety, efficiency, and environmental compliance. Whether residential, commercial, or industrial — we keep your air clean and cool. With us, your comfort and air quality are always in expert hands.",
    servicePoints: [
      "HVAC equipment supply and installation",
      "Ventilation system",
      "Ducting works",
      "Refrigerant and chilled water piping",
      "Thermal insulation",
      "Controls and automation",
      "Maintenance and AMC services",
      "Installations and maintenance of Air condition",
      "Ventilators",
      "Air purifier",
      "Recondition and maintaining old units",
      "Cleaning air ducts",
      "Fixing fans",
      "Fabric filters",
      "Sound dampers"
    ]
  },
  {
    id: 5,
    title: "Plumbing Services",
    description: "We provide expert installation of cold and hot water systems, fully compliant with UAE regulations. Our services cover booster pumps, valves, meters, and high-quality sanitary fittings.",
    icon: "droplet",
    color: "#3498db",
    features: [
      "Sanitary Installations",
      "Leak Repairs",
      "Bathroom Fixtures",
      "Kitchen Systems",
    ],
    imagePath: plumbingServicesImage,
    detailedDescription: "Leak detection, pipe repairs, and flushing ensure uninterrupted, hygienic water flow. We clean, disinfect, and maintain water tanks as per Dubai Municipality guidelines. Backflow prevention devices are installed to protect water from contamination. All pressure systems are tested and calibrated for optimal performance and safety. We serve villas, apartments, offices, and commercial buildings across the UAE. Rely on us for efficient, code-compliant, and long-lasting plumbing solutions.",
    servicePoints: [
      "Water supply system (hot and cold)",
      "Sanitary fixtures installations",
      "Drainage and soil waste system",
      "Sewerage system",
      "Sanitary accessories",
      "Testing and commissioning",
      "Bathroom articles",
      "Kitchen articles"
    ]
  },
  {
    id: 6,
    title: "Carpentry & Flooring",
    description: "We provide expert carpentry services including door fitting, wooden partitions, and shelving. Our team ensures precise workmanship with durable materials and clean finishes.",
    icon: "clipboard",
    color: "#8e44ad",
    features: [
      "Wood Flooring",
      "Interior Woodwork",
      "Roofing Solutions",
      "Custom Carpentry",
    ],
    imagePath: carpentryFlooringImage,
    detailedDescription: "We specialize in roofing works such as waterproofing, thermal insulation, and sheet fixing. All roofing solutions comply with UAE standards for weather and leak resistance. We carry out roof inspections, minor civil works, and preventive maintenance. False ceiling and structural woodwork are executed with precision and safety. From residential villas to commercial projects, we ensure solid and reliable output. Quality service, safety compliance, and timely delivery are our top priorities.",
    servicePoints: [
      "Door fitting and wooden partitions",
      "Shelving and custom carpentry",
      "Waterproofing and thermal insulation",
      "Sheet fixing and roofing works",
      "Roof inspections",
      "Minor civil works",
      "Preventive maintenance",
      "False ceiling installation",
      "Structural woodwork"
    ]
  },
  {
    id: 7,
    title: "False Ceiling & Partitions",
    description: "Transforming empty spaces into functional, elegant environments tailored to your needs. We execute partitions, ceilings, flooring, and wall finishes with flawless detail.",
    icon: "layers",
    color: "#2ecc71",
    features: [
      "False Ceilings",
      "Office Partitions",
      "Fit-out Works",
      "Space Division",
    ],
    imagePath: falseCeilingPartitionsImage,
    detailedDescription: "Our fit-out services cover offices, villas, apartments, and commercial units. All works comply with UAE safety regulations and quality standards. Integrated MEP services ensure seamless functionality and clean aesthetics. We manage projects end-to-end — from design coordination to final handover. Count on us for timely delivery, premium finishes, and lasting impressions.",
    servicePoints: [
      "Partition wall construction",
      "False ceiling installation",
      "Flooring work",
      "Doors, window and glass work",
      "Electric and lighting works",
      "HVAC & ventilation adjustment",
      "Decorative and specialty works"
    ]
  },
  {
    id: 8,
    title: "Plaster Works",
    description: "We provide expert masonry solutions for block laying, plastering, and tile installation. Our skilled team ensures strong structural finishes with clean, accurate detailing.",
    icon: "tool",
    color: "#e67e22",
    features: [
      "Marble & Granite",
      "Natural Stone",
      "Tiles & Ceramics",
      "Masonry Works",
    ],
    imagePath: plasterWorksImage,
    detailedDescription: "From boundary walls to decorative cladding, every job meets the highest standards. All processes comply with UAE building codes and safety regulations. We handle interlock paving, kerbstone placement, and internal/external plastering. Crack repairs, leveling, and joint finishing are executed with precision. Trusted by residential and commercial clients for quality and reliability. Efficient service, site safety, and timely delivery are at the core of what we do.",
    servicePoints: [
      "Block work construction",
      "Brickwork",
      "Plastering works",
      "Stone masonry",
      "Tiling and cladding",
      "Structural masonry support works",
      "Repair and maintenance of masonry",
      "Supportive work and finishing"
    ]
  },
  {
    id: 9,
    title: "Building Cleaning",
    description: "Creating clean, hygienic spaces with expert care and attention to detail. We serve villas, offices, apartments, and high-rise buildings across the UAE.",
    icon: "sparkles",
    color: "#3498db",
    features: [
      "Interior Cleaning",
      "Exterior Cleaning",
      "Facility Maintenance",
      "Professional Premises",
    ],
    imagePath: buildingCleaningImage,
    detailedDescription: "Our trained team uses safe, eco-friendly products and modern cleaning equipment. From facade washing to post-construction cleaning, every task is handled with precision. Interior and exterior surfaces are thoroughly cleaned for a polished finish. Flexible cleaning schedules tailored to your specific needs. Dependable service, consistent quality, and a spotless environment—every time.",
    servicePoints: [
      "Exterior building cleaning",
      "Interior cleaning (common and private areas)",
      "Toilet & sanitary cleaning",
      "Kitchen and pantry cleaning",
      "Furniture and fixture cleaning",
      "Glass and mirror cleaning",
      "Floor care and specialty services",
      "Disinfection and sanitisation",
      "Post construction cleaning"
    ]
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Check if mobile on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset image loaded state when service changes
  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeService]);

  // Animate heading elements on load
  useEffect(() => {
    const headingElements = headingRef.current;
    if (headingElements) {
      const headingBadge = headingElements.querySelector("[data-element='heading-badge']");
      const headingText = headingElements.querySelector("[data-element='heading-text']");
      const headingUnderline = headingElements.querySelector("[data-element='heading-underline']");
      const headingSubtext = headingElements.querySelector("[data-element='heading-subtext']");

      const animateElement = (element, delay) => {
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

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || isPaused || showModal) return;

    const autoSlideInterval = setInterval(() => {
      if (!isAnimating) {
        setDirection(1);
        setIsAnimating(true);
        setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(autoSlideInterval);
  }, [isAutoSliding, isPaused, showModal, isAnimating]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Prevent body scroll when modal is open, allow modal content to scroll
  useEffect(() => {
    if (showModal) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore background scrolling
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    // Cleanup function to ensure scrolling is restored
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [showModal]);

  // Navigation functions
  const prevService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
    // Temporarily pause auto-slide after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const nextService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
    // Temporarily pause auto-slide after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const goToService = (index) => {
    if (isAnimating || index === activeService) return;
    setIsAnimating(true);
    setDirection(index > activeService ? 1 : -1);
    setActiveService(index);
    setTimeout(() => setIsAnimating(false), 500);
    // Temporarily pause auto-slide after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  // Modal functions
  const openModal = (service) => {
    setModalService(service);
    setShowModal(true);
    setIsPaused(true); // Pause auto-slide when modal opens
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalService(null);
      setIsPaused(false); // Resume auto-slide when modal closes
    }, 300);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Helper component for icons
  const IconComponent = ({ name, color, size = 8 }) => {
    const sizeClass = `w-${size} h-${size}`;

    const iconPaths = {
      wrench: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      bolt: "M13 10V3L4 14h7v7l9-11h-7z",
      snowflake: "M12 3v18m-9-9h18M8.4 8.4l7.2 7.2M8.4 15.6l7.2-7.2",
      droplet: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
      construction: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      layers: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      tool: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      sparkles: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    };

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
          d={iconPaths[name] || iconPaths.bolt}
        />
      </svg>
    );
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

  // Modal animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
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
        />
      ))}
    </div>
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-neutral-950 relative min-h-screen overflow-hidden py-20"
        aria-label="Our Services"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl opacity-30 transform -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent opacity-20" />
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
                />
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
          <div 
            ref={cardsContainerRef} 
            className="relative max-w-6xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
                          {services[activeService].features.map((feature, idx) => (
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
                          ))}
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={() => openModal(services[activeService])}
                            className="group flex items-center"
                            style={{ color: services[activeService].color }}
                            aria-label={`Learn more about ${services[activeService].title}`}
                          >
                            <span className="font-medium mr-3 relative overflow-hidden">
                              Learn more
                              <span className="block h-0.5 w-full bg-current opacity-30 mt-1 group-hover:w-0 transition-all duration-300" />
                              <span className="block h-0.5 w-0 bg-current absolute bottom-0 left-0 group-hover:w-full transition-all duration-300" />
                            </span>
                            <svg
                              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Right side - Service Image */}
                      <div className="md:w-1/2 relative overflow-hidden">
                        <div className="absolute inset-0 z-0 overflow-hidden">
                          <div className="w-full h-full relative">
                            <img
                              src={services[activeService].imagePath}
                              alt={services[activeService].title}
                              className={`w-full h-full object-cover transition-opacity duration-500 ${
                                isImageLoaded ? "opacity-100" : "opacity-0"
                              }`}
                              onLoad={handleImageLoad}
                            />

                            <div
                              className="absolute inset-0 mix-blend-multiply"
                              style={{
                                background: `linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.7))`,
                              }}
                            />

                            {!isImageLoaded && (
                              <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                                <div className="w-12 h-12 border-4 border-neutral-600 border-t-blue-400 rounded-full animate-spin" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/70 mix-blend-multiply z-10" />
                        <div
                          className="absolute inset-0 z-0"
                          style={{
                            background: `radial-gradient(circle at 70% 50%, ${services[activeService].color}22 0%, transparent 70%)`,
                          }}
                        />

                        {/* Decorative elements */}
                        <div className="absolute inset-0 overflow-hidden z-20">
                          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-t from-transparent to-white/5" />
                          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/10" />
                          <div
                            className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full border-2"
                            style={{
                              borderColor: `${services[activeService].color}22`,
                            }}
                          />

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
            <div className="flex justify-between items-center mt-8">
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              {/* Auto-slide control */}
              <motion.button
                onClick={() => setIsAutoSliding(!isAutoSliding)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isAutoSliding ? "Pause auto-slide" : "Resume auto-slide"}
                title={isAutoSliding ? "Pause auto-slide" : "Resume auto-slide"}
              >
                {isAutoSliding ? (
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l4-4 4 4-4 4-4-4z" />
                  </svg>
                )}
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
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
                      backgroundColor: activeService === index ? service.color : "#4b5563",
                      scale: activeService === index ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(20px); }
            75% { transform: translateY(-30px) translateX(-10px); }
          }
        `}</style>
      </section>

      {/* Fixed Modal with Proper Scrolling */}
      <AnimatePresence>
        {showModal && modalService && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            
            {/* Modal Content - Fixed height and scrolling */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Modal Header */}
              <div className="relative flex-shrink-0">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${modalService.color}40 0%, transparent 50%),
                                   radial-gradient(circle at 70% 80%, ${modalService.color}30 0%, transparent 50%)`
                    }}
                  />
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                    <IconComponent
                      name={modalService.icon}
                      color={modalService.color}
                      size={64}
                    />
                  </div>
                </div>

                <div className="relative p-6 md:p-8">
                  {/* Close Button */}
                  <motion.button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 group z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Service Icon & Title */}
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mr-4 md:mr-6"
                      style={{
                        backgroundColor: `${modalService.color}22`,
                        boxShadow: `0 20px 40px -12px ${modalService.color}40`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent
                        name={modalService.icon}
                        color={modalService.color}
                        size={8}
                      />
                    </motion.div>
                    <div>
                      <h3 
                        className="text-2xl md:text-4xl font-bold mb-1"
                        style={{ color: modalService.color }}
                      >
                        {modalService.title}
                      </h3>
                      <p className="text-neutral-400 text-sm md:text-lg">
                        Professional Services & Solutions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Border */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: modalService.color }} />
              </div>

              {/* Scrollable Modal Body - THIS ALLOWS VERTICAL SCROLLING */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                <div className="space-y-8">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center">
                      <div 
                        className="w-2 h-6 md:h-8 rounded-full mr-3 md:mr-4"
                        style={{ backgroundColor: modalService.color }}
                      />
                      Service Overview
                    </h4>
                    <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                      {modalService.detailedDescription}
                    </p>
                  </div>

                  {/* Service Points Grid */}
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mb-6 flex items-center">
                      <div 
                        className="w-2 h-6 md:h-8 rounded-full mr-3 md:mr-4"
                        style={{ backgroundColor: modalService.color }}
                      />
                      What We Offer
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {modalService.servicePoints.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative"
                        >
                          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-3 md:p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/5">
                            <div className="flex items-center">
                              <div 
                                className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-3 md:mr-4 flex-shrink-0"
                                style={{ backgroundColor: modalService.color }}
                              />
                              <p className="text-white text-sm md:text-base font-medium group-hover:text-white/90 transition-colors">
                                {point}
                              </p>
                            </div>
                            
                            {/* Hover effect line */}
                            <div 
                              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                              style={{ backgroundColor: modalService.color }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center pt-4">
                    <motion.button
                      className="group relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden"
                      style={{
                        backgroundColor: `${modalService.color}22`,
                        border: `2px solid ${modalService.color}`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center justify-center text-sm md:text-base">
                        Get Quote for {modalService.title}
                        <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      
                      {/* Animated background */}
                      <div 
                        className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"
                        style={{ backgroundColor: `${modalService.color}33` }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-5 overflow-hidden pointer-events-none">
                <div 
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: modalService.color }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;