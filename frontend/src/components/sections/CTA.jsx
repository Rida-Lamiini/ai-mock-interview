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
    <section
      className="relative w-full py-20 overflow-hidden md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
      data-testid="cta-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-64 h-64 rounded-full top-20 left-20 bg-white/10 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-20 right-20 w-80 h-80 bg-white/10 blur-3xl animate-pulse"></div>
      </div>

      <div className="container relative px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Join 50,000+ Successful Candidates
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
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
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 text-lg transition-all duration-300 border-0 rounded-full bg-white/90 backdrop-blur-sm focus:bg-white"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center px-8 py-4 space-x-3 rounded-full bg-white/20 backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="font-semibold text-white">
                  Thank you! We'll be in touch soon.
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center" data-testid="benefit-free-trial">
              <CheckCircle
                className="w-5 h-5 mr-2 text-green-400"
                data-testid="check-circle-icon"
              />
              Free 7-day trial
            </div>
            <div
              className="flex items-center"
              data-testid="benefit-no-credit-card"
            >
              <CheckCircle
                className="w-5 h-5 mr-2 text-green-400"
                data-testid="check-circle-icon"
              />
              No credit card required
            </div>
            <div
              className="flex items-center"
              data-testid="benefit-cancel-anytime"
            >
              <CheckCircle
                className="w-5 h-5 mr-2 text-green-400"
                data-testid="check-circle-icon"
              />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
