import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import project1Image from "../assets/project-1.png";
import project2Image from "../assets/project-2.jpg";
import project3Image from "../assets/project-3.jpg";
import project4Image from "../assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectsRef = useRef(null);

  // Example projects - these are NOT specific to your company
  const projectExamples = [
    {
      id: 1,
      title: "Commercial Tower Systems",
      category: "Electromechanical",
      description:
        "State-of-the-art electromechanical solutions for commercial buildings, dramatically improving energy efficiency and system performance.",
      image: project1Image,
    },
    {
      id: 2,
      title: "Luxury Property Enhancement",
      category: "Contracting & Technical",
      description:
        "Comprehensive technical enhancement including structural improvements and modern system integration for premium properties.",
      image: project2Image,
    },
    {
      id: 3,
      title: "Hospitality MEP Infrastructure",
      category: "Plumbing & MEP",
      description:
        "Advanced mechanical, electrical, and plumbing systems designed for hospitality environments, enhancing comfort and efficiency.",
      image: project3Image,
    },
    {
      id: 4,
      title: "Commercial Air Quality Solutions",
      category: "Air-Conditioning",
      description:
        "Implementation of next-generation air filtration and climate control technology for large commercial spaces.",
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

    // Animation for projects container
    gsap.fromTo(
      projectsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
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

  // Handle project click
  const handleProjectClick = (index) => {
    setActiveProject(index);
  };

  // Creative overlay effects for project images
  const getImageOverlay = (index) => {
    const overlays = [
      // Overlay for Electromechanical
      <div className="absolute inset-0" key="overlay-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent mix-blend-overlay"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="20" height="20" x="0" y="0">
            <path d="M 10 0 L 10 10 M 0 10 L 20 10" fill="none" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)"></rect>
        </svg>
      </div>,
      
      // Overlay for Contracting & Technical
      <div className="absolute inset-0" key="overlay-2">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-transparent mix-blend-overlay"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="blueprint-pattern" patternUnits="userSpaceOnUse" width="20" height="20" x="0" y="0">
            <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="none" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint-pattern)"></rect>
        </svg>
      </div>,
      
      // Overlay for Plumbing & MEP
      <div className="absolute inset-0" key="overlay-3">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-transparent mix-blend-overlay"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pipes-pattern" patternUnits="userSpaceOnUse" width="20" height="20" x="0" y="0">
            <path d="M 0 10 L 20 10 M 10 0 L 10 20" fill="none" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pipes-pattern)"></rect>
        </svg>
      </div>,
      
      // Overlay for Air-Conditioning
      <div className="absolute inset-0" key="overlay-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent mix-blend-overlay"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves-pattern" patternUnits="userSpaceOnUse" width="20" height="10" x="0" y="0">
            <path d="M 0 5 C 5 0, 15 0, 20 5" fill="none" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves-pattern)"></rect>
        </svg>
      </div>
    ];
    
    return overlays[index];
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
            Our Expertise
          </h2>
          <p className="text-neutral-400">
            Explore our specialized service areas that showcase our technical capabilities through examples of projects in different sectors.
          </p>
        </div>

        <div ref={projectsRef} className="relative max-w-6xl mx-auto">
          {/* Project Display */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Project Thumbnails */}
            <div className="md:col-span-2 space-y-4">
              {projectExamples.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`p-0.5 rounded-lg relative cursor-pointer transition-all duration-300 ${
                    activeProject === index
                      ? "bg-gradient-to-r from-primary to-primary/30"
                      : "bg-neutral-800/50 hover:bg-neutral-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="bg-neutral-900 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-primary mb-2">
                          {project.category}
                        </p>
                        <h3
                          className={`font-bold transition-all duration-300 ${
                            activeProject === index
                              ? "text-white"
                              : "text-neutral-400"
                          }`}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Project Display */}
            <div className="md:col-span-3">
              <motion.div
                className="bg-neutral-900/80 backdrop-blur-sm rounded-lg overflow-hidden h-full"
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Project Image with Creative Overlay */}
                <div className="h-64 md:h-72 relative overflow-hidden">
                  <img
                    src={projectExamples[activeProject].image}
                    alt={projectExamples[activeProject].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Creative overlay based on project type */}
                  {getImageOverlay(activeProject)}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-primary mb-1">
                        {projectExamples[activeProject].category}
                      </p>
                      <h3 className="text-xl font-bold text-white">
                        {projectExamples[activeProject].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-400">
                    {projectExamples[activeProject].description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "Energy Efficient", 
                      "Smart Integration", 
                      "Sustainable", 
                      "Cost Effective", 
                      "Innovative Design", 
                      "High Performance"
                    ].slice(activeProject, activeProject + 3).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="inline-block px-3 py-1 rounded-full text-xs bg-neutral-800 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button className="group flex items-center text-primary">
                      <span className="font-medium mr-3 relative overflow-hidden">
                        View service details
                        <span className="block h-0.5 w-full bg-primary/30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                        <span className="block h-0.5 w-0 bg-primary absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Projects;