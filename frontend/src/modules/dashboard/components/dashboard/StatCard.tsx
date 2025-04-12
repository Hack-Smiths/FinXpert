
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  trend?: "up" | "down";
  color?: string;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  trend = "up",
  color = "from-blue-500 to-indigo-600",
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className="stat-card"
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r",
            color
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full flex items-center",
              trend === "up"
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-700 bg-red-50"
            )}
          >
            {change}
            {trend === "up" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        )}
      </div>
      <h2 className="text-3xl font-bold mb-1">{value}</h2>
      <p className="text-muted-foreground text-sm">{title}</p>
    </motion.div>
  );
};
