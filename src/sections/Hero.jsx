import React, { useEffect, useRef, useState } from "react";
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { motion, AnimatePresence } from "framer-motion";
import buildingAnimation from "../assets/building.riv";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationContainerRef = useRef(null);
  
  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Features to showcase
  const features = [
    {
      id: 0,
      title: "Contracting Excellence",
      description: "Premium quality construction and contracting services for all project types",
      color: "blue",
      icon: "🏗️",
      position: { top: "20%", right: "10%" }
    },
    {
      id: 1,
      title: "Facilities Management",
      description: "Comprehensive facilities services to maintain and optimize your property",
      color: "emerald",
      icon: "🏢",
      position: { bottom: "35%", left: "5%" }
    },
    {
      id: 2,
      title: "Technical Expertise",
      description: "Specialized technical solutions for complex industrial and commercial needs",
      color: "indigo",
      icon: "⚙️",
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
    if (hoverInput && !isMobile) hoverInput.value = true;
  };
  
  const handleMouseLeave = () => {
    if (hoverInput && !isMobile) hoverInput.value = false;
  };
  
  // Cycle through features automatically
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(featureInterval);
  }, [features.length]);
  
  // Parallax effect on scroll (disabled on mobile for performance)
  useEffect(() => {
    if (isMobile) return;
    
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
  }, [isMobile]);
  
  // Initialize animations
  const initCounters = () => {
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
      bg: "bg-blue-900/90",
      light: "bg-blue-500/20"
    },
    emerald: {
      primary: "from-emerald-600 to-emerald-400",
      secondary: "bg-emerald-500",
      text: "text-emerald-400",
      border: "border-emerald-600/50",
      glow: "shadow-emerald-500/20",
      bg: "bg-emerald-900/90",
      light: "bg-emerald-500/20"
    },
    indigo: {
      primary: "from-indigo-600 to-indigo-400",
      secondary: "bg-indigo-500",
      text: "text-indigo-400",
      border: "border-indigo-600/50",
      glow: "shadow-indigo-500/20",
      bg: "bg-indigo-900/90",
      light: "bg-indigo-500/20"
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black opacity-90"></div>
      
      {/* Mobile-enhanced background patterns */}
      {isMobile ? (
        <>
          {/* Mobile geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/30 rounded-full"></div>
            <div className="absolute top-40 right-8 w-24 h-24 border-2 border-emerald-500/20 rotate-45"></div>
            <div className="absolute bottom-32 left-6 w-20 h-20 border border-indigo-500/25 rounded-lg rotate-12"></div>
            <div className="absolute bottom-48 right-12 w-16 h-16 border-2 border-blue-500/15 rounded-full"></div>
          </div>
          
          {/* Mobile gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-emerald-900/10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-900/5 to-transparent"></div>
        </>
      ) : (
        /* Desktop grid overlay */
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxNjE3MmYiIGZpbGwtb3BhY2l0eT0iLjAzIiBkPSJNMzYgMzRoLTJ2LTJoMnYyek0zMCAzNGgtMnYtMmgydjJ6TTI0IDM0aC0ydi0yaDJ2MnpNMTggMzRoLTJ2LTJoMnYyek0xMiAzNGgtMnYtMmgydjJ6TTYgMzRINHYtMmgydjJ6Ii8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDI4SDB2MmgydjJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDI0SDB2MmgydjJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDIwSDB2MmgydjJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDE2SDB2MmgydjJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDEySDB2MmgydjJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDhIMHYyaDJ2Mnk9Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yIDRIMHYyaDJ2Mnk9Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik02IDJoMnYtMkg2djJ6Ci8+PHBhdGggZmlsbD0iIzE2MTcyZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0xMiAyaDJ2LTJoLTJ2MnpNMTggMmgydi0yaC0ydjJ6TTI0IDJoMnYtMmgtMnYyek0zMCAyaDJ2LTJoLTJ2MnpNMzYgMmgydi0yaC0ydjJ6Ci8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      )}
      
      {/* Enhanced glowing orbs with mobile optimization */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-16 -left-8 w-64 h-64' : 'top-40 left-1/4 w-96 h-96'} rounded-full bg-gradient-to-br from-blue-600/30 to-blue-800/10 blur-3xl`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className={`absolute ${isMobile ? 'top-1/2 -right-16 w-56 h-56' : 'bottom-20 right-1/4 w-80 h-80'} rounded-full bg-gradient-to-br from-emerald-600/25 to-emerald-800/10 blur-3xl`}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: "easeInOut",
          delay: 1 
        }}
      />
      
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2 w-48 h-48' : 'top-1/2 right-1/3 w-64 h-64'} rounded-full bg-gradient-to-br from-indigo-600/20 to-indigo-800/10 blur-3xl`}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12,
          ease: "easeInOut",
          delay: 2 
        }}
      />
      
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center relative z-10 py-20 sm:py-16 lg:py-8">
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'lg:grid-cols-2 gap-16'} items-center w-full`}>
          
          {/* Text content */}
          <motion.div 
            ref={contentRef}
            className="relative z-10 space-y-6 sm:space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >            
            {/* Enhanced main headline with two-line structure */}
            <div className="overflow-hidden">
              <motion.h1 
                className={`${isMobile ? 'text-5xl sm:text-6xl' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl'} font-bold text-white leading-none tracking-tight`}
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                {/* First line: "Build Smart" */}
                <div className="overflow-hidden">
                  <motion.div 
                    className="pb-1 sm:pb-2 flex items-center justify-center lg:justify-start gap-4 md:gap-6"
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <span>Build</span>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
                      Smart,
                    </span>
                  </motion.div>
                </div>
                
                {/* Second line: "Build Green" */}
                <div className="overflow-hidden">
                  <motion.div 
                    className="flex items-center justify-center lg:justify-start gap-4 md:gap-6"
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <span>Build</span>
                    <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-transparent bg-clip-text">
                      Green
                    </span>
                  </motion.div>
                </div>
              </motion.h1>
            </div>
            
            {/* Enhanced description with better mobile styling */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {isMobile && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
              )}
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0">
                Your Partner in <span className="text-blue-400 font-medium">Facilities Management</span> and 
                <span className="text-emerald-400 font-medium"> Contracting</span>. A trusted provider of services in the UAE, delivering high-quality solutions for residential, commercial, and industrial projects.
              </p>
            </motion.div>
            
            {/* Enhanced feature highlights with improved mobile design */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  className={`stat-item p-3 lg:p-4 rounded-xl ${colorMap[feature.color].light} border ${colorMap[feature.color].border} backdrop-blur-sm relative overflow-hidden group cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.2 }}
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <span className="text-base lg:text-lg mr-2">{feature.icon}</span>
                      <div className={`text-xs lg:text-sm font-medium ${colorMap[feature.color].text} uppercase tracking-wider`}>
                        {isMobile ? feature.title.split(' ')[0] : feature.title}
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {isMobile ? `${feature.description.substring(0, 50)}...` : feature.description}
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 ${colorMap[feature.color].secondary} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 ${colorMap[feature.color].secondary} opacity-20 transform rotate-45 translate-x-4 -translate-y-4`}></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* PREMIUM INTERACTIVE BUILDING ANIMATION CONTAINER */}
          <motion.div 
            ref={animationContainerRef}
            className={`relative ${isMobile ? 'h-[350px] sm:h-[350px] mt-8 order-first' : 'h-[400px] md:h-[400px] lg:h-[600px] xl:h-[600px]'} w-full group`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Premium outer glow that responds to hover */}
            <motion.div 
              className="absolute -inset-8 rounded-3xl blur-2xl transition-all duration-1000"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main container with premium glassmorphism */}
            <div className={`relative w-full h-full ${isMobile ? 'rounded-3xl' : 'rounded-2xl'} overflow-hidden transition-all duration-1000 group-hover:shadow-2xl`}>
              
              {/* Dynamic background that changes on hover */}
              <div className="absolute inset-0 transition-all duration-1000 group-hover:bg-slate-900/70 bg-slate-900/30 backdrop-blur-sm"></div>
              
              {/* Premium border gradient */}
              <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-r from-blue-400/30 via-emerald-400/40 to-indigo-400/30 group-hover:from-blue-400/60 group-hover:via-emerald-400/70 group-hover:to-indigo-400/60 transition-all duration-1000">
                <div className={`w-full h-full rounded-inherit bg-transparent`}></div>
              </div>
              
              {/* RIVE ANIMATION - Full visibility with premium frame */}
              <div className="relative w-full h-full z-20">
                <RiveComponent className="w-full h-full" />
              </div>
              
              {/* Interactive corner highlights that pulse during hover */}
              <motion.div 
                className={`absolute top-0 left-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} border-l-2 border-t-2 rounded-tl-2xl pointer-events-none transition-all duration-1000`}
                animate={{ 
                  borderColor: [
                    'rgba(59, 130, 246, 0.4)', 
                    'rgba(59, 130, 246, 0.8)', 
                    'rgba(59, 130, 246, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(59, 130, 246, 1)' }}
              />
              
              <motion.div 
                className={`absolute top-0 right-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} border-r-2 border-t-2 rounded-tr-2xl pointer-events-none transition-all duration-1000`}
                animate={{ 
                  borderColor: [
                    'rgba(16, 185, 129, 0.4)', 
                    'rgba(16, 185, 129, 0.8)', 
                    'rgba(16, 185, 129, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(16, 185, 129, 1)' }}
              />
              
              <motion.div 
                className={`absolute bottom-0 left-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} border-l-2 border-b-2 rounded-bl-2xl pointer-events-none transition-all duration-1000`}
                animate={{ 
                  borderColor: [
                    'rgba(99, 102, 241, 0.4)', 
                    'rgba(99, 102, 241, 0.8)', 
                    'rgba(99, 102, 241, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(99, 102, 241, 1)' }}
              />
              
              <motion.div 
                className={`absolute bottom-0 right-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} border-r-2 border-b-2 rounded-br-2xl pointer-events-none transition-all duration-1000`}
                animate={{ 
                  borderColor: [
                    'rgba(34, 211, 238, 0.4)', 
                    'rgba(34, 211, 238, 0.8)', 
                    'rgba(34, 211, 238, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(34, 211, 238, 1)' }}
              />
              
              {/* Subtle overlay that enhances the night effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10"></div>
              
            </div>

            {/* Desktop feature indicators - positioned outside with enhanced interactivity */}
            {!isMobile && isLoaded && features.map((feature, index) => {
              const color = colorMap[feature.color];
              const isActive = activeFeature === index;
              
              return (
                <motion.div
                  key={feature.id}
                  className="absolute flex items-center cursor-pointer z-30"
                  style={feature.position}
                  initial={{ opacity: 0, x: feature.position.left ? -30 : 30 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.6,
                    x: 0,
                    scale: isActive ? 1.1 : 0.9
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.3 + 1.5
                  }}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: isActive ? 1.15 : 1.05 }}
                >
                  {feature.position.left ? (
                    <>
                      <motion.div 
                        className={`${color.bg} backdrop-blur-xl text-white text-sm py-4 px-5 rounded-xl mr-4 shadow-2xl border ${color.border} transition-all duration-500 max-w-[280px] relative overflow-hidden`}
                        animate={isActive ? {
                          boxShadow: [
                            '0 10px 25px rgba(0,0,0,0.1)',
                            '0 20px 40px rgba(0,0,0,0.2)',
                            '0 10px 25px rgba(0,0,0,0.1)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Premium card background with animated gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-r ${color.primary} opacity-0`}
                          animate={isActive ? { opacity: [0, 0.1, 0] } : {}}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        <div className="relative z-10">
                          <div className={`font-semibold mb-3 ${color.text} flex items-center`}>
                            <motion.span 
                              className="mr-3 text-xl"
                              animate={isActive ? { 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {feature.icon}
                            </motion.span>
                            {feature.title}
                          </div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-white/90 text-sm leading-relaxed"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Premium card accent line */}
                        <motion.div 
                          className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${color.primary}`}
                          animate={isActive ? { width: ['0%', '100%', '0%'] } : { width: '30%' }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      {/* Enhanced connecting line with animation */}
                      <motion.div 
                        className={`w-28 h-0.5 bg-gradient-to-l from-transparent via-current to-current opacity-40 ${color.text}`}
                        animate={isActive ? {
                          opacity: [0.4, 0.8, 0.4],
                          scaleX: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Premium indicator dot with ripple effect */}
                      <motion.div 
                        className={`w-5 h-5 ${color.secondary} rounded-full border-2 border-white/30 shadow-xl relative overflow-hidden`}
                        animate={isActive ? { 
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(255,255,255,0.3)',
                            '0 0 0 10px rgba(255,255,255,0)',
                            '0 0 0 0 rgba(255,255,255,0)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                        <motion.div 
                          className={`absolute inset-1 ${color.secondary} rounded-full opacity-80`}
                          animate={isActive ? { scale: [0.8, 1.2, 0.8] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Premium indicator dot with ripple effect */}
                      <motion.div 
                        className={`w-5 h-5 ${color.secondary} rounded-full border-2 border-white/30 shadow-xl relative overflow-hidden`}
                        animate={isActive ? { 
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(255,255,255,0.3)',
                            '0 0 0 10px rgba(255,255,255,0)',
                            '0 0 0 0 rgba(255,255,255,0)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                        <motion.div 
                          className={`absolute inset-1 ${color.secondary} rounded-full opacity-80`}
                          animate={isActive ? { scale: [0.8, 1.2, 0.8] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      {/* Enhanced connecting line with animation */}
                      <motion.div 
                        className={`w-28 h-0.5 bg-gradient-to-r from-current via-current to-transparent opacity-40 ${color.text}`}
                        animate={isActive ? {
                          opacity: [0.4, 0.8, 0.4],
                          scaleX: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <motion.div 
                        className={`${color.bg} backdrop-blur-xl text-white text-sm py-4 px-5 rounded-xl ml-4 shadow-2xl border ${color.border} transition-all duration-500 max-w-[280px] relative overflow-hidden`}
                        animate={isActive ? {
                          boxShadow: [
                            '0 10px 25px rgba(0,0,0,0.1)',
                            '0 20px 40px rgba(0,0,0,0.2)',
                            '0 10px 25px rgba(0,0,0,0.1)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Premium card background with animated gradient */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent"></div>
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-l ${color.primary} opacity-0`}
                          animate={isActive ? { opacity: [0, 0.1, 0] } : {}}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        <div className="relative z-10">
                          <div className={`font-semibold mb-3 ${color.text} flex items-center`}>
                            <motion.span 
                              className="mr-3 text-xl"
                              animate={isActive ? { 
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 10, 0]
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {feature.icon}
                            </motion.span>
                            {feature.title}
                          </div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-white/90 text-sm leading-relaxed"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Premium card accent line */}
                        <motion.div 
                          className={`absolute top-0 right-0 h-1 bg-gradient-to-l ${color.primary}`}
                          animate={isActive ? { width: ['0%', '100%', '0%'] } : { width: '30%' }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}

            {/* Enhanced rotating rings that react to hover */}
            {!isMobile && (
              <>
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-blue-500/20 rounded-full transition-all duration-1000 group-hover:border-blue-400/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400/60 rounded-full blur-sm group-hover:bg-blue-400 transition-all duration-1000"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-emerald-500/20 rounded-full transition-all duration-1000 group-hover:border-emerald-400/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400/70 rounded-full blur-sm group-hover:bg-emerald-400 transition-all duration-1000"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] border border-indigo-500/15 rounded-full transition-all duration-1000 group-hover:border-indigo-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-indigo-400/50 rounded-full blur-sm group-hover:bg-indigo-400 transition-all duration-1000"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </>
            )}

            {/* Enhanced mobile floating indicators that pulse with the building lights */}
            {isMobile && isLoaded && (
              <>
                <motion.div
                  className="absolute top-8 left-8 w-4 h-4 bg-blue-500 rounded-full shadow-lg border border-white/20"
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0.6, 1, 0.6],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.4)',
                      '0 0 0 8px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="absolute top-8 right-8 w-4 h-4 bg-emerald-500 rounded-full shadow-lg border border-white/20"
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0.6, 1, 0.6],
                    boxShadow: [
                      '0 0 0 0 rgba(16, 185, 129, 0.4)',
                      '0 0 0 8px rgba(16, 185, 129, 0)',
                      '0 0 0 0 rgba(16, 185, 129, 0)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                />
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg border border-white/20"
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0.6, 1, 0.6],
                    boxShadow: [
                      '0 0 0 0 rgba(99, 102, 241, 0.4)',
                      '0 0 0 8px rgba(99, 102, 241, 0)',
                      '0 0 0 0 rgba(99, 102, 241, 0)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.6 }}
                />
              </>
            )}

            {/* Interactive tooltip for hover instructions (desktop only) */}
            {!isMobile && (
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                🌙 Hover to see night mode & building lights
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced mobile feature showcase */}
      {isMobile && (
        <motion.div 
          className="relative z-10 px-4 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {/* Mobile service carousel */}
          <div className="relative bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-white text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Our Services
              </h3>
              <div className="flex justify-center space-x-3">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    className={`w-12 h-3 rounded-full transition-all duration-300 ${
                      activeFeature === index 
                        ? `${colorMap[feature.color].secondary} shadow-lg` 
                        : 'bg-white/20'
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Enhanced feature display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <div className={`relative inline-block p-6 rounded-2xl ${colorMap[features[activeFeature].color].light} backdrop-blur-sm border ${colorMap[features[activeFeature].color].border} shadow-xl overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute top-2 right-2 w-8 h-8 ${colorMap[features[activeFeature].color].secondary} rounded-full blur-sm`}></div>
                    <div className={`absolute bottom-2 left-2 w-6 h-6 ${colorMap[features[activeFeature].color].secondary} rounded-full blur-sm`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Feature icon */}
                    <div className="text-4xl mb-3">{features[activeFeature].icon}</div>
                    
                    {/* Feature title */}
                    <h4 className={`font-bold text-lg mb-3 ${colorMap[features[activeFeature].color].text}`}>
                      {features[activeFeature].title}
                    </h4>
                    
                    {/* Feature description */}
                    <p className="text-white/85 text-sm leading-relaxed max-w-xs mx-auto">
                      {features[activeFeature].description}
                    </p>
                    
                    {/* Call to action */}
                    <motion.button
                      className={`mt-4 px-6 py-2 rounded-full ${colorMap[features[activeFeature].color].secondary} text-white text-xs font-medium shadow-lg border border-white/20`}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-white/70 text-xs sm:text-sm mb-3 tracking-wider font-light">Explore More</span>
        <motion.div 
          className={`${isMobile ? 'w-5 h-8' : 'w-6 h-10'} border border-white/30 rounded-full flex justify-center p-1 bg-white/5 backdrop-blur-sm`}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full`}
            animate={{ 
              y: [0, isMobile ? 6 : 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced floating particles */}
      {[...Array(isMobile ? 12 : 20)].map((_, index) => (
        <motion.div
          key={index}
          className={`absolute ${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} rounded-full`}
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            background: index % 3 === 0 ? '#3b82f6' : index % 3 === 1 ? '#10b981' : '#6366f1',
            opacity: Math.random() * 0.6 + 0.2
          }}
          animate={{
            y: [0, Math.random() * -40 - 20],
            opacity: [0, Math.random() * 0.8 + 0.4, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Mobile-specific ambient elements */}
      {isMobile && (
        <>
          {/* Mobile corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-blue-500/20 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-emerald-500/20 rounded-tr-3xl"></div>
          
          {/* Mobile bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-slate-900/50 to-transparent pointer-events-none"></div>
        </>
      )}
    </div>
  );
};

export default Hero;