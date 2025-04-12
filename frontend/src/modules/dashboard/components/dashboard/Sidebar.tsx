
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CreditCard, 
  GraduationCap, 
  Home, 
  Settings, 
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Investments",
    href: "/investments",
    icon: BarChart3,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    title: "Education",
    href: "/education",
    icon: GraduationCap,
  },
  {
    title: "Credit",
    href: "/credit",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex-shrink-0 flex flex-col border-r bg-sidebar z-10 shadow-sm">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white font-semibold text-lg">F</span>
          </div>
          <span className="font-bold text-lg gradient-text">FinXpert</span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "nav-item",
                pathname === item.href
                  ? "nav-item-active gradient-border"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        <div className="rounded-xl bg-accent p-4">
          <h3 className="font-medium text-sm">Need Help?</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            Contact our customer support for assistance.
          </p>
          <button className="w-full text-xs py-2 rounded-lg gradient-bg text-white font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};
