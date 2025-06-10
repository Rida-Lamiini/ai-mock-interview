"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Submitted email:", email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Join 50,000+ Successful Candidates
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              Ready to Ace Your Next Interview?
            </h2>

            <p className="mx-auto max-w-[600px] text-xl text-white/90 leading-relaxed">
              Start your journey to interview success today. Get personalized AI
              coaching and land your dream job with confidence.
            </p>
          </div>

          <div className="w-full max-w-md">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-full focus:bg-white transition-all duration-300"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-8 py-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">
                  Thank you! We'll be in touch soon.
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Free 7-day trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
