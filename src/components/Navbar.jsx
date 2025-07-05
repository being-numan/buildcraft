import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Import your company logo
import companyLogo from '../assets/logo.png' // Update this path to match your logo location

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Navigation links
  const navLinks = [
    { title: 'Home', link: '#home' },
    { title: 'About', link: '#about' },
    { title: 'Services', link: '#services' },
    { title: 'Process', link: '#process' },
    { title: 'Vision', link: '#vision' },
    { title: 'Projects', link: '#projects' },
    { title: 'Contact', link: '#contact' }
  ]
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Handle smooth scrolling to sections
  const handleNavClick = (e, target) => {
    e.preventDefault()
    
    // Close menu if open
    setIsMenuOpen(false)
    
    // Get the target element
    const element = document.querySelector(target)
    
    if (element) {
      // Use Lenis for smooth scrolling if available
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback to native smooth scrolling
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  
  // Navbar animation variants
  const navbarVariants = {
    initial: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      borderBottom: '1px solid rgba(255, 255, 255, 0)'
    },
    scrolled: {
      backgroundColor: 'rgba(10, 10, 10, 0.9)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }
  }
  
  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }
  
  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 py-4 px-6"
        initial="initial"
        animate={isScrolled ? 'scrolled' : 'initial'}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <motion.a 
            href="#home" 
            className="flex items-center space-x-3 group" 
            onClick={(e) => handleNavClick(e, '#home')}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo Container with White Background */}
            <div className="relative">
              <div className="bg-white rounded-lg p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-white/10">
                <img
                  src={companyLogo}
                  alt="BuildCraft Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            
            {/* Company Name - Keep Original */}
            <span className="text-white font-bold text-2xl">
              Build<span className="text-primary">Craft</span>
            </span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.link}
                    onClick={(e) => handleNavClick(e, link.link)}
                    className="text-white/80 hover:text-blue-400 transition-colors duration-300 relative group"
                    whileHover={{ y: -1 }}
                  >
                    {link.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <motion.a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                animate={{ 
                  d: isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header with Logo */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img
                      src={companyLogo}
                      alt="BuildCraft Logo"
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                  <span className="text-white font-bold text-xl">
                    Build<span className="text-primary">Craft</span>
                  </span>
                </div>
                
                <button 
                  className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Navigation */}
              <div className="flex-1 flex flex-col justify-center items-center py-8">
                <nav>
                  <ul className="space-y-8 text-center">
                    {navLinks.map((link, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <a 
                          href={link.link}
                          onClick={(e) => handleNavClick(e, link.link)}
                          className="text-2xl text-white hover:text-blue-400 transition-colors duration-300 block py-2"
                        >
                          {link.title}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                
                {/* Mobile Contact Button */}
                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <a 
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full font-medium shadow-lg inline-block"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </div>
              
              {/* Mobile Footer */}
              <div className="p-6 text-center border-t border-white/10">
                <p className="text-white/40 text-sm">© {new Date().getFullYear()} BuildCraft</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar