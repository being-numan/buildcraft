import React, { useEffect, useRef, useState } from "react";
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { motion, AnimatePresence } from "framer-motion";
import buildingAnimation from "../assets/building.riv";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationContainerRef = useRef(null);
  
  // Features to showcase
  const features = [
    {
      id: 0,
      title: "Contracting Excellence",
      description: "Premium quality construction and contracting services for all project types",
      color: "blue",
      position: { top: "20%", right: "10%" }
    },
    {
      id: 1,
      title: "Facilities Management",
      description: "Comprehensive facilities services to maintain and optimize your property",
      color: "emerald",
      position: { bottom: "35%", left: "5%" }
    },
    {
      id: 2,
      title: "Technical Expertise",
      description: "Specialized technical solutions for complex industrial and commercial needs",
      color: "indigo",
      position: { bottom: "25%", right: "15%" }
    }
  ];
  
  // Rive animation setup
  const { rive, RiveComponent } = useRive({
    src: buildingAnimation,
    stateMachines: "State Machine 1",
    autoplay: true,
    onLoad: () => {
      setIsLoaded(true);
      initCounters();
    },
  });
  
  // Get hover state machine input
  const hoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");
  
  // Set up hover interaction
  const handleMouseEnter = () => {
    if (hoverInput) hoverInput.value = true;
  };
  
  const handleMouseLeave = () => {
    if (hoverInput) hoverInput.value = false;
  };
  
  // Cycle through features automatically
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(featureInterval);
  }, [features.length]);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const scrollAmount = Math.min(scrollY, 500);
      
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollAmount * 0.2}px)`;
        contentRef.current.style.opacity = 1 - scrollAmount / 600;
      }
      
      if (animationContainerRef.current) {
        animationContainerRef.current.style.transform = `translateY(${scrollAmount * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initialize animations
  const initCounters = () => {
    // Since we removed the counters, this function is now just a placeholder
    // We can use it for any initialization that needs to happen after the Rive animation loads
    console.log("Animation loaded successfully");
  };
  
  // Color mapping for gradients and highlights
  const colorMap = {
    blue: {
      primary: "from-blue-600 to-blue-400",
      secondary: "bg-blue-500",
      text: "text-blue-400",
      border: "border-blue-600/50",
      glow: "shadow-blue-500/20",
      bg: "bg-blue-900/90"
    },
    emerald: {
      primary: "from-emerald-600 to-emerald-400",
      secondary: "bg-emerald-500",
      text: "text-emerald-400",
      border: "border-emerald-600/50",
      glow: "shadow-emerald-500/20",
      bg: "bg-emerald-900/90"
    },
    indigo: {
      primary: "from-indigo-600 to-indigo-400",
      secondary: "bg-indigo-500",
      text: "text-indigo-400",
      border: "border-indigo-600/50",
      glow: "shadow-indigo-500/20",
      bg: "bg-indigo-900/90"
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black opacity-90"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxNjE3MmYiIGZpbGwtb3BhY2l0eT0iLjAzIiBkPSJNMzYgMzRoLTJ2LTJoMnYyek0zMCAzNGgtMnYtMmgydjJ6TTI0IDM0aC0ydi0yaDJ2MnpNMTggMzRoLTJ2LTJoMnYyek0xMiAzNGgtMnYtMmgydjJ6TTYgMzRINHYtMmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDI4SDB2MmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDI0SDB2MmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDIwSDB2MmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDE2SDB2MmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDEySDB2MmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDhIMHYyaDJ2Mnk9Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDRIMHYyaDJ2Mnk9Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik02IDJoMnYtMkg2djJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0xMiAyaDJ2LTJoLTJ2MnpNMTggMmgydi0yaC0ydjJ6TTI0IDJoMnYtMmgtMnYyek0zMCAyaDJ2LTJoLTJ2MnpNMzYgMmgydi0yaC0ydjJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-40 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-800/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-800/5 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut",
          delay: 1 
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-indigo-800/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: "easeInOut",
          delay: 2 
        }}
      />
      
      {/* Main content container */}
      <div className="container mx-auto px-6 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text content */}
          <motion.div 
            ref={contentRef}
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Hidden company name */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-px w-6 bg-white/40"></div>
                <span className="uppercase tracking-widest text-sm text-white/60 font-light">Precision Contracting & Facilities Management</span>
              </div>
            </motion.div>
            
            {/* Main headline with animated text reveal */}
            <div className="overflow-hidden">
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight"
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="overflow-hidden">
                  <div className="pb-2">Build</div>
                </div>
                <div className="overflow-hidden">
                  <motion.div 
                    className="pb-2 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  >
                    Smart
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div 
                    className="pb-2"
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  >
                    Build
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text"
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.9, ease: [0.33, 1, 0.68, 1] }}
                  >
                    Green
                  </motion.div>
                </div>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Your Partner in <span className="text-blue-400 font-medium">Contracting</span>, 
              <span className="text-emerald-400 font-medium"> Facilities</span>, and 
              <span className="text-indigo-400 font-medium"> Technical Excellence</span>. A trusted provider of services in the UAE, delivering high-quality solutions for residential, commercial, and industrial projects.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <button
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-10 py-4 text-white shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10 font-medium tracking-wide flex items-center">
                  Get Quotation Today
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-800/50 to-emerald-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></span>
                <span className="absolute top-0 left-0 w-20 h-full bg-white/20 transform -skew-x-30 -translate-x-full group-hover:translate-x-[500%] transition-all duration-1000 ease-out"></span>
              </button>
            </motion.div>
            
            {/* Feature highlights with animated reveal */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="stat-item p-4 rounded-lg bg-blue-900/20 border border-blue-500/20 backdrop-blur-sm">
                <div className="text-sm text-blue-300 uppercase tracking-wider font-medium mb-1">Residential</div>
                <div className="text-xs text-slate-300">Premium solutions for residential properties</div>
              </div>
              <div className="stat-item p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/20 backdrop-blur-sm">
                <div className="text-sm text-emerald-300 uppercase tracking-wider font-medium mb-1">Commercial</div>
                <div className="text-xs text-slate-300">Expert services for business facilities</div>
              </div>
              <div className="stat-item p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/20 backdrop-blur-sm">
                <div className="text-sm text-indigo-300 uppercase tracking-wider font-medium mb-1">Industrial</div>
                <div className="text-xs text-slate-300">Technical excellence for industrial projects</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Building animation container */}
          <motion.div 
            ref={animationContainerRef}
            className="relative h-[600px] lg:h-[700px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animation container with glassmorphism frame */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-black/50 backdrop-blur-sm rounded-xl border border-white/5 shadow-2xl overflow-hidden">
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMzYgMzRoLTJ2LTJoMnYyek0zMCAzNGgtMnYtMmgydjJ6TTI0IDM0aC0ydi0yaDJ2MnpNMTggMzRoLTJ2LTJoMnYyek0xMiAzNGgtMnYtMmgydjJ6TTYgMzRINHYtMmgydjJ6Ii8+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDIiIGQ9Ik0yIDI4SDB2MmgydjJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
              
              {/* Rive animation */}
              <div className="relative h-full w-full flex items-center justify-center">
                <RiveComponent className="w-full h-full" />
              </div>
              
              {/* Highlighting corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/30"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-emerald-500/30"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-indigo-500/30"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/30"></div>
              
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-emerald-600/5"></div>
              
              {/* Feature indicators */}
              {isLoaded && features.map((feature, index) => {
                const color = colorMap[feature.color];
                const isActive = activeFeature === index;
                
                return (
                  <motion.div
                    key={feature.id}
                    className={`absolute flex items-center ${isActive ? 'z-20' : 'z-10'}`}
                    style={feature.position}
                    initial={{ opacity: 0, x: feature.position.left ? -20 : 20 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      x: 0,
                      scale: isActive ? 1 : 0.9
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2 + 1
                    }}
                    onClick={() => setActiveFeature(index)}
                  >
                    {feature.position.left ? (
                      <>
                        <div className={`${color.bg} backdrop-blur-sm text-white text-xs py-2 px-3 rounded-md mr-2 shadow-lg ${color.border} ${isActive ? color.glow : ''} transition-all duration-300 max-w-[200px]`}>
                          <div className={`font-medium mb-1 ${color.text}`}>{feature.title}</div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-white/80 text-xs leading-relaxed"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[color:var(--feature-color)]" style={{"--feature-color": `rgb(var(--${feature.color}-500))`}}></div>
                        <div className={`w-3 h-3 ${color.secondary} rounded-full ${isActive ? 'animate-pulse' : ''}`}></div>
                      </>
                    ) : (
                      <>
                        <div className={`w-3 h-3 ${color.secondary} rounded-full ${isActive ? 'animate-pulse' : ''}`}></div>
                        <div className="w-20 h-px bg-gradient-to-r from-[color:var(--feature-color)] to-transparent" style={{"--feature-color": `rgb(var(--${feature.color}-500))`}}></div>
                        <div className={`${color.bg} backdrop-blur-sm text-white text-xs py-2 px-3 rounded-md ml-2 shadow-lg ${color.border} ${isActive ? color.glow : ''} transition-all duration-300 max-w-[200px]`}>
                          <div className={`font-medium mb-1 ${color.text}`}>{feature.title}</div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-white/80 text-xs leading-relaxed"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Rotating rings */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-blue-500/10 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-emerald-500/10 rounded-full"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/60 text-sm mb-2 tracking-wider font-light">Explore More</span>
        <motion.div 
          className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
            animate={{ 
              y: [0, 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: [0, Math.random() * -30 - 10],
            opacity: [0, Math.random() * 0.5 + 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default Hero;