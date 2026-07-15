
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Sprout, 
  Zap, 
  Recycle, 
  Activity, 
  ShieldAlert,
  Globe
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agri-tech", label: "Sustainable Ag", icon: Sprout },
  { href: "/energy", label: "Smart Grid", icon: Zap },
  { href: "/waste", label: "Circular Flow", icon: Recycle },
  { href: "/health", label: "Bio-Health", icon: Activity },
  { href: "/resilience", label: "Resilience", icon: Globe },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Globe className="h-6 w-6" />
          EcoSystem AI
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium">Safe Resilience Platform</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
              pathname === item.href 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t mt-auto">
        <div className="bg-secondary/50 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <ShieldAlert className="h-3 w-3" />
            Explainable AI Active
          </div>
          <p className="text-muted-foreground">SHAP/LIME validation enabled on all predictive flows.</p>
        </div>
      </div>
    </aside>
  );
}
