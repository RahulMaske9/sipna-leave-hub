import {
  Calendar,
  Home,
  FileText,
  History,
  BarChart3,
  Settings,
  GraduationCap,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  User,
} from "lucide-react"
import { useLocation, NavLink } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = useLocation().pathname
  const { user, logout } = useAuth()

  // Get navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      }
    ];

    if (user?.role === 'teacher') {
      return [
        ...baseItems,
        {
          title: "Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "Apply Leave",
          url: "/apply",
          icon: FileText,
        },
        {
          title: "Leave History",
          url: "/history",
          icon: History,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    }

    if (user?.role === 'hod') {
      return [
        ...baseItems,
        {
          title: "Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "Pending Requests",
          url: "/pending",
          icon: Clock,
        },
        {
          title: "Approved Requests",
          url: "/approved",
          icon: CheckCircle,
        },
        {
          title: "Rejected Requests", 
          url: "/rejected",
          icon: XCircle,
        },
        {
          title: "All Faculty",
          url: "/faculty",
          icon: Users,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Reports",
          url: "/reports",
          icon: BarChart3,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    }

    if (user?.role === 'principal') {
      return [
        ...baseItems,
        {
          title: "All Requests",
          url: "/all-requests",
          icon: FileText,
        },
        {
          title: "Pending Approval",
          url: "/pending",
          icon: Clock,
        },
        {
          title: "Faculty Management",
          url: "/faculty",
          icon: Users,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Reports & Analytics",
          url: "/reports",
          icon: BarChart3,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    }

    return baseItems;
  };

  const items = getNavigationItems();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">SCETA</h2>
              <p className="text-sm text-muted-foreground">
                {user?.role === 'teacher' ? 'Teacher Portal' : 
                 user?.role === 'hod' ? 'HOD Portal' : 'Principal Portal'}
              </p>
            </div>
          </div>
          {user && (
            <div className="mt-4 px-2 py-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              {user.department && (
                <p className="text-xs text-muted-foreground">{user.department}</p>
              )}
            </div>
          )}
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === 'teacher' ? 'Teacher Functions' :
             user?.role === 'hod' ? 'HOD Functions' : 'Principal Functions'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <div className="p-2">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
          <div className="p-4 border-t">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 SCETA Amravati
            </p>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}