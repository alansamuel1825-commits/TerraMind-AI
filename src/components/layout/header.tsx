
"use client";

import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Plus, 
  ChevronRight,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const segments = pathname === "/" ? ["Dashboard"] : pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 border-b bg-background/60 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center text-xs text-muted-foreground font-medium gap-2">
          <Home className="h-3.5 w-3.5" />
          <ChevronRight className="h-3 w-3" />
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={index === segments.length - 1 ? "text-foreground font-semibold" : ""}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </span>
              {index < segments.length - 1 && <ChevronRight className="h-3 w-3" />}
            </div>
          ))}
        </div>

        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search data, reports, AI..." 
            className="pl-9 bg-secondary/50 border-none h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-xs font-semibold">
              <Plus className="h-4 w-4" />
              Quick Action
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Analyze Crop Area</DropdownMenuItem>
            <DropdownMenuItem>Predict Energy Peak</DropdownMenuItem>
            <DropdownMenuItem>Generate Report</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Simulation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-border mx-2" />

        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Moon className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Usage Analytics</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
