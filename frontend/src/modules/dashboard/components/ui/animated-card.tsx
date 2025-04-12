
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

type AnimatedCardProps = HTMLMotionProps<"div"> & {
  delay?: number;
  children: React.ReactNode;
};

export function AnimatedCard({
  delay = 0,
  children,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
