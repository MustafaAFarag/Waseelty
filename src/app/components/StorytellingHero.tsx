"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView as useReactInView } from "react-intersection-observer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StorytellingHero = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Intersection Observer for sections
  const [heroRef, heroInView] = useReactInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [section2Ref, section2InView] = useReactInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [section3Ref, section3InView] = useReactInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // GSAP animations
  useEffect(() => {
    if (!mainRef.current) return;

    // Text splitting animation
    const textElements = mainRef.current.querySelectorAll(".split-text");
    textElements.forEach((text) => {
      const chars = text.textContent?.split("") || [];
      text.innerHTML = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "char";
        text.appendChild(span);
      });

      gsap.fromTo(
        text.querySelectorAll(".char"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Horizontal scroll section
    if (horizontalSectionRef.current) {
      const horizontalSection = horizontalSectionRef.current;
      const horizontalContent = horizontalSection.querySelector(
        ".horizontal-content"
      );

      if (horizontalContent) {
        const width = horizontalContent.scrollWidth;

        gsap.to(horizontalContent, {
          x: () => -(width - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${width - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }
    }

    // Sticky elements
    const stickyElements = mainRef.current.querySelectorAll(".sticky-element");
    stickyElements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 20%",
          end: "bottom 20%",
          pin: true,
          pinSpacing: false,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white relative"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 split-text"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            AI Freelancing Revolution
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto split-text"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Empowering freelancers with cutting-edge AI tools to transform their
            services and boost productivity
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
              Get Started
            </button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.section>

      {/* Section 2 - Vertical Scroll */}
      <section
        ref={section2Ref}
        className="min-h-screen bg-black text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={section2InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 split-text">
                Enhance Your Freelance Workflow
              </h2>
              <p className="text-lg mb-6 split-text">
                Our AI-powered platform streamlines your workflow, helping you
                deliver high-quality results faster than ever before. Focus on
                what you do best while our tools handle the rest.
              </p>
              <ul className="space-y-4">
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    section2InView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Automated task management</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    section2InView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Smart content generation</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    section2InView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Client communication tools</span>
                </motion.li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                section2InView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8 }}
              className="sticky-element"
            >
              <img
                src="https://placehold.co/600x400"
                alt="AI Freelancing Tools"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Horizontal Scroll */}
      <section
        ref={horizontalSectionRef}
        className="relative h-screen bg-gradient-to-r from-purple-900 to-blue-900 overflow-hidden"
      >
        <div className="horizontal-content flex absolute top-0 left-0 h-full">
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center p-8">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl max-w-2xl text-white">
              <h2 className="text-4xl font-bold mb-4 split-text">
                AI-Powered Content Creation
              </h2>
              <p className="text-lg mb-6 split-text">
                Generate high-quality content in seconds with our advanced AI
                algorithms. Perfect for writers, marketers, and content
                creators.
              </p>
              <img
                src="https://placehold.co/600x400"
                alt="AI Content Creation"
                className="rounded-lg mb-6"
              />
            </div>
          </div>

          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center p-8">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl max-w-2xl text-white">
              <h2 className="text-4xl font-bold mb-4 split-text">
                Smart Project Management
              </h2>
              <p className="text-lg mb-6 split-text">
                Keep track of all your projects with our intelligent management
                system. Get insights and recommendations to improve your
                workflow.
              </p>
              <img
                src="https://placehold.co/600x400"
                alt="Project Management"
                className="rounded-lg mb-6"
              />
            </div>
          </div>

          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center p-8">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl max-w-2xl text-white">
              <h2 className="text-4xl font-bold mb-4 split-text">
                Client Collaboration Tools
              </h2>
              <p className="text-lg mb-6 split-text">
                Collaborate seamlessly with your clients. Share progress, get
                feedback, and deliver results that exceed expectations.
              </p>
              <img
                src="https://placehold.co/600x400"
                alt="Client Collaboration"
                className="rounded-lg mb-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Final CTA */}
      <section
        ref={section3Ref}
        className="min-h-screen bg-black text-white py-20 flex items-center"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8 split-text"
            initial={{ opacity: 0, y: 30 }}
            animate={
              section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Freelance Career?
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-3xl mx-auto split-text"
            initial={{ opacity: 0, y: 20 }}
            animate={
              section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of freelancers who have already upgraded their
            services with our AI tools.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StorytellingHero;
