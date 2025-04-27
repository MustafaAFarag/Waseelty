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
        const cards = horizontalContent.querySelector(".horizontal-cards");
        if (cards) {
          // Ensure only first card is initially visible
          const firstCard = cards.children[0];
          const cardWidth = (firstCard as HTMLElement).offsetWidth;
          const viewportWidth = window.innerWidth;

          // Calculate total width of all cards plus gaps
          const cardsWidth = cards.scrollWidth;

          // Add padding at the end for smooth scroll ending
          (cards as HTMLElement).style.paddingRight = "200px";

          // Center the first card at the start with extra spacing
          const initialSpacing = (viewportWidth - cardWidth) / 2;
          (cards as HTMLElement).style.paddingLeft = `${initialSpacing}px`;

          const scrollDistance = cardsWidth + initialSpacing;

          gsap.to(cards, {
            x: () => -(scrollDistance - viewportWidth),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              markers: false,
              anticipatePin: 1,
              onUpdate: (self) => {
                // Ensure smooth scrolling
                if (self.progress >= 0.99) {
                  self.scroll(self.end);
                }
              },
            },
          });
        }
      }
    }

    // Sticky elements (DISABLED FOR DEBUGGING)
    // const stickyElements = mainRef.current.querySelectorAll(".sticky-element");
    // stickyElements.forEach((element) => {
    //   gsap.to(element, {
    //     scrollTrigger: {
    //       trigger: element,
    //       start: "top 20%",
    //       end: "bottom 20%",
    //       pin: true,
    //       pinSpacing: false,
    //     },
    //   });
    // });

    // Feature card hover and scroll animations (DISABLED FOR DEBUGGING)
    // const featureCards = mainRef.current.querySelectorAll(".feature-card");
    // featureCards.forEach((card) => {
    //   const progressBar = card.querySelector(".feature-progress");

    //   // Create hover animations
    //   card.addEventListener("mouseenter", () => {
    //     gsap.to(progressBar, {
    //       scaleX: 1,
    //       duration: 0.4,
    //       ease: "power2.out",
    //     });

    //     gsap.to(card.querySelector("img"), {
    //       scale: 1.05,
    //       duration: 0.4,
    //       ease: "power2.out",
    //     });
    //   });

    //   card.addEventListener("mouseleave", () => {
    //     gsap.to(progressBar, {
    //       scaleX: 0,
    //       duration: 0.4,
    //       ease: "power2.in",
    //     });

    //     gsap.to(card.querySelector("img"), {
    //       scale: 1,
    //       duration: 0.4,
    //       ease: "power2.in",
    //     });
    //   });

    //   // Create scroll animations
    //   gsap.from(card, {
    //     y: 100,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out",
    //     scrollTrigger: {
    //       trigger: card,
    //       start: "top 90%",
    //       end: "top 60%",
    //       scrub: 1,
    //     },
    //   });
    // });

    // Add resize listener to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white relative"
        style={{ opacity }}
      >
        <motion.div
          className="container mx-auto px-4 text-center"
          style={{ scale }}
        >
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
        </motion.div>

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
              style={{ willChange: "transform" }}
            >
              <img
                src="https://placehold.co/600x400"
                alt="AI Freelancing Tools"
                className="rounded-lg shadow-2xl w-full h-auto"
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
          <div className="horizontal-cards flex ml-[20rem] gap-80 p-16 items-center h-full">
            <div className="flex-shrink-0 w-[min(90vw,500px)] h-auto flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl w-full h-full text-white">
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
                  className="rounded-lg mb-6 w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-[min(90vw,500px)] h-auto flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl w-full h-full text-white">
                <h2 className="text-4xl font-bold mb-4 split-text">
                  Smart Project Management
                </h2>
                <p className="text-lg mb-6 split-text">
                  Keep track of all your projects with our intelligent
                  management system. Get insights and recommendations to improve
                  your workflow.
                </p>
                <img
                  src="https://placehold.co/600x400"
                  alt="Project Management"
                  className="rounded-lg mb-6 w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-[min(90vw,500px)] h-auto flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl w-full h-full text-white">
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
                  className="rounded-lg mb-6 w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-[min(90vw,500px)] h-auto flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl w-full h-full text-white">
                <h2 className="text-4xl font-bold mb-4 split-text">
                  AI Analytics Dashboard
                </h2>
                <p className="text-lg mb-6 split-text">
                  Track your performance with real-time analytics. Get insights
                  into client engagement, project timelines, and revenue
                  streams.
                </p>
                <img
                  src="https://placehold.co/600x400"
                  alt="Analytics Dashboard"
                  className="rounded-lg mb-6 w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-[min(90vw,500px)] h-auto flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl w-full h-full text-white">
                <h2 className="text-4xl font-bold mb-4 split-text">
                  Automated Invoicing
                </h2>
                <p className="text-lg mb-6 split-text">
                  Streamline your billing process with our automated invoicing
                  system. Create, send, and track invoices without the hassle.
                </p>
                <img
                  src="https://placehold.co/600x400"
                  alt="Automated Invoicing"
                  className="rounded-lg mb-6 w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Parallel Features Grid (like Devins image) */}
      <section className="min-h-screen bg-[#0f1424] text-white py-20 overflow-hidden relative">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 right-10 w-8 h-8 text-blue-400 opacity-50"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-40 left-10 w-6 h-6 text-blue-300 opacity-40"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-20 w-10 h-10 text-blue-500 opacity-30"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-3 split-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            AI Tools Work
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8 text-blue-400 split-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            tirelessly and in parallel
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Teams using our AI tools can handle multiple tasks simultaneously,
            from content creation and project management to client communication
            and invoicing.
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-[20%] left-0 w-full h-[60%] opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="grid-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4f88e7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4f6ae7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M100,250 C200,50 400,350 600,150 S800,250 1000,150 1200,350 1400,250"
              fill="none"
              stroke="url(#grid-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M100,350 C300,250 500,450 700,250 S900,350 1100,250 1300,450 1500,350"
              fill="none"
              stroke="url(#grid-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Overlapping Cards Grid */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Ladder pattern cards/screens - similar to Devins interface */}
          <div className="relative h-[800px] mb-16 overflow-visible">
            {/* Card 1 - Left */}
            <motion.div
              className="feature-card absolute left-[5%] top-[15%] w-[300px] md:w-[400px] bg-[#171d2f] rounded-xl overflow-hidden shadow-xl transform -rotate-2 origin-top"
              whileHover={{
                scale: 1.02,
                opacity: 1,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#232a42] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 ml-3"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
                  <div className="text-xs text-white ml-3">AI Workspace</div>
                </div>
                <img
                  src="https://placehold.co/600x400/0f1424/4f88e7"
                  alt="AI Workspace"
                  className="w-full h-auto mt-8 border-4 border-red-500"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#171d2f] to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="bg-blue-500/20 h-3 w-[70%] rounded mb-3"></div>
                <div className="bg-blue-500/10 h-2 w-[90%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[60%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[80%] rounded"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 origin-left transition-transform duration-300 feature-progress"></div>
            </motion.div>

            {/* Card 2 - Center Left */}
            <motion.div
              className="feature-card absolute left-[20%] top-[30%] w-[300px] md:w-[400px] bg-[#171d2f] rounded-xl overflow-hidden shadow-xl transform rotate-1 origin-top"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                scale: 1.02,
                opacity: 1,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#232a42] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 ml-3"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
                  <div className="text-xs text-white ml-3">Smart Analytics</div>
                </div>
                <img
                  src="https://placehold.co/600x400/0f1424/4aade7"
                  alt="Smart Analytics"
                  className="w-full h-auto mt-8"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#171d2f] to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="bg-blue-500/20 h-3 w-[70%] rounded mb-3"></div>
                <div className="bg-blue-500/10 h-2 w-[90%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[60%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[80%] rounded"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 origin-left transition-transform duration-300 feature-progress"></div>
            </motion.div>

            {/* Card 3 - Center/Featured */}
            <motion.div
              className="feature-card absolute left-[35%] top-[10%] w-[350px] md:w-[450px] bg-[#171d2f] rounded-xl overflow-hidden shadow-2xl z-10 origin-top"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#232a42] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 ml-3"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
                  <div className="text-xs text-white ml-3">
                    Automated Workflows
                  </div>
                </div>
                <img
                  src="https://placehold.co/600x400/0f1424/4f5ce7"
                  alt="Automated Workflows"
                  className="w-full h-auto mt-8"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#171d2f] to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="bg-blue-500/20 h-3 w-[70%] rounded mb-3"></div>
                <div className="bg-blue-500/10 h-2 w-[90%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[60%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[80%] rounded"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 origin-left transition-transform duration-300 feature-progress"></div>
            </motion.div>

            {/* Card 4 - Center Right */}
            <motion.div
              className="feature-card absolute right-[20%] top-[30%] w-[300px] md:w-[400px] bg-[#171d2f] rounded-xl overflow-hidden shadow-xl transform -rotate-1 origin-top"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                scale: 1.02,
                opacity: 1,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#232a42] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 ml-3"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
                  <div className="text-xs text-white ml-3">
                    Client Management
                  </div>
                </div>
                <img
                  src="https://placehold.co/600x400/0f1424/4fa3e7"
                  alt="Client Management"
                  className="w-full h-auto mt-8"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#171d2f] to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="bg-blue-500/20 h-3 w-[70%] rounded mb-3"></div>
                <div className="bg-blue-500/10 h-2 w-[90%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[60%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[80%] rounded"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 origin-left transition-transform duration-300 feature-progress"></div>
            </motion.div>

            {/* Card 5 - Right */}
            <motion.div
              className="feature-card absolute right-[5%] top-[15%] w-[300px] md:w-[400px] bg-[#171d2f] rounded-xl overflow-hidden shadow-xl transform rotate-2 origin-top"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.02,
                opacity: 1,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#232a42] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 ml-3"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 ml-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 ml-2"></div>
                  <div className="text-xs text-white ml-3">
                    Content Generation
                  </div>
                </div>
                <img
                  src="https://placehold.co/600x400/0f1424/4f6ae7"
                  alt="Content Generation"
                  className="w-full h-auto mt-8"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#171d2f] to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="bg-blue-500/20 h-3 w-[70%] rounded mb-3"></div>
                <div className="bg-blue-500/10 h-2 w-[90%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[60%] rounded mb-2"></div>
                <div className="bg-blue-500/10 h-2 w-[80%] rounded"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 origin-left transition-transform duration-300 feature-progress"></div>
            </motion.div>

            {/* Connection lines */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="25%"
                y1="35%"
                x2="35%"
                y2="20%"
                stroke="#4f88e7"
                strokeWidth="1"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
              />
              <line
                x1="45%"
                y1="20%"
                x2="55%"
                y2="35%"
                stroke="#4f88e7"
                strokeWidth="1"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
              />
              <line
                x1="23%"
                y1="45%"
                x2="35%"
                y2="60%"
                stroke="#4f88e7"
                strokeWidth="1"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
              />
              <line
                x1="45%"
                y1="60%"
                x2="55%"
                y2="45%"
                stroke="#4f88e7"
                strokeWidth="1"
                strokeDasharray="5,5"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Teams of freelancers working with our AI tools can handle tasks
              ranging from content creation and design work to client management
              and project delivery, all in parallel.
            </p>

            {/* Animated line separator */}
            <motion.div
              className="h-px w-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-12"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Interactive buttons */}
            <div className="flex justify-center gap-4 mt-10">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-sm transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
              <motion.button
                className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-2 px-6 rounded-full text-sm transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Final CTA */}
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
