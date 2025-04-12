
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EducationCardProps {
  title: string;
  description: string;
  tag: string;
  type: string;
  duration: string;
  icon: LucideIcon;
  delay?: number;
}

export const EducationCard = ({
  title,
  description,
  tag,
  type,
  duration,
  icon: IconComponent,
  delay = 0,
}: EducationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 min-w-[300px] border border-gray-100 h-full"
      style={{
        boxShadow: "0 10px 25px -15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card className="border-none shadow-none p-0 bg-transparent">
        <CardContent className="p-0">
          <div className="flex gap-4 items-start">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {tag}
                </span>
                <span className="px-2 py-0.5 bg-secondary text-muted-foreground rounded-full text-xs">
                  {type}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 gradient-text">{title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xs text-muted-foreground flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {duration}
                </span>
                <button className="text-primary text-sm font-medium hover:underline focus:outline-none hover:text-indigo-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
