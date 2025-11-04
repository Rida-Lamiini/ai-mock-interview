"use client";

import { useState, useEffect, useRef } from "react";
import {
  Video,
  Mic,
  CheckCircle,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Realistic Simulations",
    description:
      "Experience interviews that mirror real-world scenarios with industry-specific questions.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Mic,
    title: "Speech Recognition",
    description:
      "Practice your verbal communication with advanced AI that understands natural speech.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CheckCircle,
    title: "Instant Feedback",
    description:
      "Get detailed insights and personalized tips to improve after each practice session.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our smart AI analyzes your responses, body language, and communication patterns.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Target,
    title: "Targeted Practice",
    description:
      "Focus on specific skills and job roles with customized interview scenarios.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your improvement over time with detailed analytics and performance metrics.",
    color: "from-teal-500 to-teal-600",
  },
];

export default function Features() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 200);
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
    <section ref={sectionRef} className="w-full py-20 bg-white md:py-32">
      <div className="container px-4 mx-auto md:px-6">
        <div className="mb-16 text-center" data-testid="features-header">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text"
            data-testid="features-title"
          >
            Powerful Features for Success
          </h2>
          <p
            className="max-w-3xl mx-auto text-xl text-gray-600"
            data-testid="features-subtitle"
          >
            Everything you need to excel in your interviews, powered by
            cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                className={`group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transform transition-all duration-700 hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl group-hover:opacity-100"></div>

                <div className="relative">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
