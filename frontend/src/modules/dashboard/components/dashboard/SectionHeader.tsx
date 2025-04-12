
import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
};
