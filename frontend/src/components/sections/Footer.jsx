import { Logo } from "../ui/logo";

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          <div className="flex space-x-6 text-sm text-gray-400">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <p className="text-sm text-gray-400">
            © 2024 AI Mock Interview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
