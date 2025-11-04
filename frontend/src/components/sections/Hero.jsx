"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden md:py-32 lg:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-blue-400/20 blur-3xl animate-pulse"></div>
      <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-purple-400/20 blur-3xl animate-pulse"></div>

      <div className="container relative px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div
            className={`space-y-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-800 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 animate-bounce">
              <Sparkles className="w-4 h-4 mr-2" />
              Dev-Powered Interview Practice dev
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Master Your Interviews
              <span className="block mt-2 text-gray-900">
                with AI Confidence
              </span>
            </h1>

            <p className="mx-auto max-w-[700px] text-xl text-gray-600 leading-relaxed">
              Transform your interview skills with our advanced AI coach. Get
              personalized feedback, practice realistic scenarios, and boost
              your confidence for any interview.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105"
            >
              Start Free Practice
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold transition-all duration-300 transform border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div
            className={`mt-12 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                10,000+ Interviews Practiced
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse"></div>
                95% Success Rate
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-purple-500 rounded-full animate-pulse"></div>
                AI-Powered Feedback
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
