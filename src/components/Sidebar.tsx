import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  CreditCard,
  LayoutTemplate,
  LogOut,
  PlayCircle,
  PlusCircle,
  Settings,
  User,
  Video,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn("pb-12 w-64 border-r bg-sidebar text-sidebar-foreground hidden md:block", className)}>
      <div className="space-y-4 py-4">
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
            <Link to="/dashboard/templates">
              <Button
                variant={isActive("/dashboard/templates") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutTemplate className="mr-2 h-4 w-4" />
                Templates
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
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
            <Link to="/dashboard/billing">
              <Button
                variant={isActive("/dashboard/billing") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 w-full px-6">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {user?.image ? <img src={user.image} alt="User" /> : <User className="h-4 w-4" />}
            </div>
            <div className="text-sm">
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user?.email}</p>
            </div>
        </div>
        <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
        </Button>
      </div>
    </div>
  );
}
