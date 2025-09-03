import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PendingRequests from './pages/PendingRequests';
import ApprovedRequests from './pages/ApprovedRequests';
import RejectedRequests from './pages/RejectedRequests';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['teacher', 'hod']}><Profile /></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute allowedRoles={['teacher']}><ApplyLeave /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute allowedRoles={['teacher']}><LeaveHistory /></ProtectedRoute>} />
        <Route path="/pending" element={<ProtectedRoute allowedRoles={['hod', 'principal']}><PendingRequests /></ProtectedRoute>} />
        <Route path="/approved" element={<ProtectedRoute allowedRoles={['hod', 'principal']}><ApprovedRequests /></ProtectedRoute>} />
        <Route path="/rejected" element={<ProtectedRoute allowedRoles={['hod', 'principal']}><RejectedRequests /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={['hod', 'principal']}><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <AppContent />
            <Toaster />
            <Sonner />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;