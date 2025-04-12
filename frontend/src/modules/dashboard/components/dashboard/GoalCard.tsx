
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface GoalCardProps {
  title: string;
  saved: number;
  target: number;
  progress: number;
  icon: LucideIcon;
  color: string;
  date: string;
  delay?: number;
}

export const GoalCard = ({
  title,
  saved,
  target,
  progress,
  icon: IconComponent,
  color,
  date,
  delay = 0,
}: GoalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r",
              color
            )}
          >
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">Target: {date}</p>
          </div>
        </div>
        <span className="text-lg font-bold">{progress}%</span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>₹{saved.toLocaleString()}</span>
          <span className="text-muted-foreground">₹{target.toLocaleString()}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: delay * 0.1 + 0.3 }}
            className={cn(
              "h-full rounded-full bg-gradient-to-r",
              color
            )}
          />
        </div>
      </div>
      
      <button className="w-full py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors">
        View Details
      </button>
    </motion.div>
  );
};
