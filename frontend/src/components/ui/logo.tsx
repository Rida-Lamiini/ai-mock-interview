import { Bot } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2 ">
      <div className="relative">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-lg bg-gradient-to-br from-blue-600 to-purple-600">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="absolute w-3 h-3 bg-green-400 border-2 border-white rounded-full -top-1 -right-1 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Devops
        </span>
        <span className="-mt-1 text-xs text-gray-500">Interview Coach</span>
      </div>
    </div>
  );
}
