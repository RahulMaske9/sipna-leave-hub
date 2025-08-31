import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import collegeLogo from "@/assets/college-logo.png";

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <img 
            src={collegeLogo} 
            alt="Sipna College Logo" 
            className="h-10 w-10 object-contain"
          />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-primary">
              Sipna College of Engineering and Technology
            </h1>
            <p className="text-sm text-muted-foreground">Leave Management System</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}