import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageSquare, Star, HelpCircle, User } from "lucide-react";

export function MobileNav({ isSignedIn }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Questions", path: "/question", icon: MessageSquare },
    { name: "Upgrade", path: "/upgrade", icon: Star },
    { name: "Help", path: "/how-it-works", icon: HelpCircle },
    { name: "Profile", path: "/profile", icon: User },
  ];

  if (!isSignedIn) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center flex-1 min-w-0 px-3 py-2"
            >
              <motion.div
                className={`p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`text-xs mt-1 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
