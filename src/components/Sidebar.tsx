import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  CreditCard,
  FileText,
  LayoutTemplate,
  LogOut,
  PlayCircle,
  PlusCircle,
  Settings,
  User,
  Video,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn("w-64 border-r bg-sidebar text-sidebar-foreground hidden md:flex md:flex-col", className)}>
      <div className="space-y-4 py-4 flex-1 flex flex-col h-full">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-8">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">VidGen AI</h2>
          </div>
          <div className="space-y-1">
            <Link to="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Video
              </Button>
            </Link>
            <Link to="/dashboard/videos">
              <Button
                variant={isActive("/dashboard/videos") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Video className="mr-2 h-4 w-4" />
                My Videos
              </Button>
            </Link>
            <Link to="/dashboard/analytics">
              <Button
                variant={isActive("/dashboard/analytics") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link to="/dashboard/pricing">
              <Button
                variant={isActive("/dashboard/pricing") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pricing
              </Button>
            </Link>
            <Link to="/dashboard/billing">
              <Button
                variant={isActive("/dashboard/billing") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2 mt-auto">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
            Support
          </h2>
          <div className="space-y-1 mb-4">
            <Link to="/dashboard/faq">
              <Button
                variant={isActive("/dashboard/faq") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </Button>
            </Link>
          </div>
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
            Settings
          </h2>
          <div className="space-y-1">
            <Link to="/dashboard/settings">
              <Button
                variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}