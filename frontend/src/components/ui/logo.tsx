import { Bot } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2 ">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          vocaAI
        </span>
        <span className="text-xs text-gray-500 -mt-1">Interview Coach</span>
      </div>
    </div>
  );
}
