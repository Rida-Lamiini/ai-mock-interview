"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "SC",
    content:
      "This AI mock interview tool completely transformed my interview preparation. The realistic simulations and detailed feedback helped me identify my weak points and improve them systematically.",
    rating: 5,
    company: "Google",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager at Microsoft",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "MJ",
    content:
      "I was nervous about behavioral interviews, but practicing with this AI gave me the confidence I needed. The feedback was incredibly detailed and actionable. Highly recommend!",
    rating: 5,
    company: "Microsoft",
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Netflix",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "ER",
    content:
      "The technical interview practice was spot-on. The AI asked relevant questions and provided insights that helped me think more clearly under pressure. Got my dream job!",
    rating: 5,
    company: "Netflix",
  },
  {
    name: "David Kim",
    role: "UX Designer at Airbnb",
    avatar: "/placeholder.svg?height=64&width=64",
    initials: "DK",
    content:
      "As a designer, I appreciated how the AI evaluated both my technical skills and communication style. The portfolio review feature was particularly helpful.",
    rating: 5,
    company: "Airbnb",
  },
];

export default function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials((prev) => [...prev, index]);
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
    <section ref={sectionRef} className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with
            our AI interview coach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleTestimonials.includes(index);

            return (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transform transition-all duration-700 hover:scale-105 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="h-12 w-12 text-blue-500" />
                </div>

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <Avatar className="w-16 h-16 mr-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Now at {testimonial.company}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
