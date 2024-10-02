import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, CheckCircle, Mic, Video, Bot } from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Submitted email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Your Interviews with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Practice interviews with our advanced AI and boost your
                  confidence. Get real-time feedback and improve your skills.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Video className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">
                  Realistic Simulations
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Experience interviews that feel just like the real thing.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Mic className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Speech Recognition</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Practice your verbal communication with our advanced AI.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get detailed insights and tips to improve after each session.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Choose Your Interview
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select from various job types and difficulty levels.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Practice with AI</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage in a realistic interview simulation with our AI.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Receive Feedback</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get personalized tips and areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  "This AI mock interview tool helped me land my dream job! The
                  realistic simulations and feedback were invaluable."
                </p>
                <p className="font-bold">Jane Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src="/placeholder-user-2.jpg" alt="User" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  "I felt so much more confident going into my interviews after
                  practicing with this AI. It's a game-changer!"
                </p>
                <p className="font-bold">John Smith</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Marketing Manager
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start practicing with our AI today and boost your interview
                  confidence.
                </p>
              </div>
              <form
                className="flex flex-col sm:flex-row w-full max-w-sm space-y-2 sm:space-y-0 sm:space-x-2"
                onSubmit={handleSubmit}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-4 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 AI Mock Interview. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
