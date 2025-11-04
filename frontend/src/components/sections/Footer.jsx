import { Logo } from "../ui/logo";

export default function Footer() {
  return (
    <footer className="py-8 text-white bg-gray-900">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div
            className="flex items-center space-x-2"
            data-testid="footer-logo-container"
          >
            <Logo data-testid="footer-logo" />
          </div>

          <div className="flex space-x-6 text-sm text-gray-400">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white"
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
