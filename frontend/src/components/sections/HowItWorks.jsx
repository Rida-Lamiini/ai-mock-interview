"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Select from various job types, industries, and difficulty levels tailored to your career goals.",
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    title: "Practice with AI",
    description:
      "Engage in realistic interview simulations with our advanced AI that adapts to your responses.",
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "03",
    title: "Get Smart Feedback",
    description:
      "Receive detailed analysis, personalized tips, and actionable insights to improve your performance.",
    color: "from-green-500 to-green-600",
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-32 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to transform your interview skills and land your
            dream job
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index);

              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center transform transition-all duration-700 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Step Number */}
                  <div
                    className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-10 -right-16 h-8 w-8 text-gray-300 z-0" />
                  )}

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
