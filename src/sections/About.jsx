import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Try different import methods for SplitType
let SplitType;
try {
  SplitType = require("split-type").default;
} catch (e) {
  console.warn(
    "SplitType import failed, will try to use window.SplitType if available"
  );
}

import aboutImage from "../assets/about-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // Make sure content is visible first as a fallback
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
    textRefs.current.forEach((ref) => gsap.set(ref, { opacity: 1, y: 0 }));
    if (imageRef.current) gsap.set(imageRef.current, { opacity: 1, y: 0 });

    // Safety check for SplitType
    if (typeof SplitType !== "function" || !window.SplitType) {
      console.error(
        "SplitType is not available. Content will be visible but not animated."
      );
      return;
    }

    try {
      // Try using SplitType directly or from window
      const SplitTypeLib =
        typeof SplitType === "function" ? SplitType : window.SplitType;

      // Split text for animation
      const heading = new SplitTypeLib(headingRef.current, { types: "lines" });

      const paragraphs = textRefs.current.map(
        (ref) => new SplitTypeLib(ref, { types: "lines" })
      );

      // Create scroll animations only if splitting worked
      if (heading.lines && heading.lines.length) {
        gsap.fromTo(
          heading.lines,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );

        // Animate paragraphs
        paragraphs.forEach((split, index) => {
          if (split.lines && split.lines.length) {
            gsap.fromTo(
              split.lines,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: textRefs.current[index],
                  start: "top bottom-=50",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }

      // Animate image appearance with parallax
      gsap.fromTo(
        imageRef.current,
        {
          y: 50, // Less extreme initial position
          opacity: 0.5, // Start with some visibility
          scale: 0.95, // Less extreme scale
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Create parallax effect for image when scrolling
      gsap.to(imageRef.current, {
        y: -40, // Less extreme movement
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    } catch (error) {
      console.error("Error setting up animations:", error);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      id="about" // Add ID for direct navigation
      ref={sectionRef}
      className="py-24 md:py-32 bg-neutral-950 relative overflow-hidden"
      style={{ visibility: "visible", opacity: 1 }} // Ensure section is visible
    >
      <div className="container mx-auto px-6">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8 text-white leading-tight"
                style={{ opacity: 1 }} // Initial visibility fallback
              >
                From Vision to Reality
                <br />— We Make It Happen
              </h2>

              <div className="space-y-6 text-neutral-300">
                <p
                  ref={addToRefs}
                  className="leading-relaxed"
                  style={{ opacity: 1 }} // Initial visibility fallback
                >
                  At BuildCraft, we are committed to delivering excellence in
                  contracting and facilities management services across Dubai
                  and the wider UAE. With a deep understanding of the region’s
                  dynamic real estate and infrastructure landscape, we provide
                  reliable, efficient, and sustainable solutions tailored to
                  meet the unique needs of residential, commercial, and
                  industrial clients.
                </p>

                <p
                  ref={addToRefs}
                  className="leading-relaxed"
                  style={{ opacity: 1 }} // Initial visibility fallback
                >
                  Our team brings together years of hands-on experience in
                  construction, maintenance, and integrated facility services.
                  From fit-outs and refurbishments to HVAC, electrical,
                  plumbing, and cleaning services — we ensure every project is
                  executed with the highest standards of safety, quality, and
                  professionalism.
                </p>

                <p
                  ref={addToRefs}
                  className="leading-relaxed"
                  style={{ opacity: 1 }} // Initial visibility fallback
                >
                  Whether you are looking to develop, maintain, or optimize your
                  property, BuildCraft is your trusted partner for smart,
                  sustainable solutions.
                </p>
              </div>

              <div className="mt-10">
                {/* <button className="group flex items-center">
                  <span className="text-white font-medium mr-3 relative overflow-hidden">
                    Discover our story
                    <span className="block h-0.5 w-full bg-white/30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                    <span className="block h-0.5 w-0 bg-white absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <svg
                    className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
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

            <div
              ref={imageRef}
              className="relative aspect-square"
              style={{ opacity: 1 }} // Initial visibility fallback
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={aboutImage}
                  alt="BuildCraft Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/60 mix-blend-multiply"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute w-32 h-32 rounded-full bg-primary/20 -top-10 -left-10 blur-2xl"></div>
              <div className="absolute w-40 h-40 rounded-full bg-primary/20 -bottom-10 -right-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background design elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-neutral-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-neutral-900 to-transparent"></div>
    </section>
  );
};

export default About;
