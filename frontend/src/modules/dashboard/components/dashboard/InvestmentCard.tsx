
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface InvestmentCardProps {
  name: string;
  description: string;
  category: string;
  risk: string;
  return: string;
  value: number;
  amount: number;
  icon: LucideIcon;
  delay?: number;
}

export const InvestmentCard = ({
  name,
  description,
  category,
  risk,
  return: returnValue,
  value,
  amount,
  icon: IconComponent,
  delay = 0,
}: InvestmentCardProps) => {
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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          {category}
        </span>
        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
          {risk}
        </span>
        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
          {returnValue} Return
        </span>
      </div>
      
      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <div>
          <span className="text-sm text-muted-foreground">Allocation</span>
          <div className="text-lg font-bold">{value}%</div>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">Monthly</span>
          <div className="text-lg font-bold">₹{amount.toLocaleString()}</div>
        </div>
      </div>
    </motion.div>
  );
};
