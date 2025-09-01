import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { LeaveCard } from "@/components/LeaveCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { mockLeaveRequests } from "@/data/mockData";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  FileText,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export default function Dashboard() {
  const { user } = useAuth();

  // Filter data based on user role
  const getUserData = () => {
    if (user?.role === 'teacher') {
      const myRequests = mockLeaveRequests.filter(req => req.teacherId === user.id);
      return {
        totalRequests: myRequests.length,
        pendingRequests: myRequests.filter(req => req.status === 'pending').length,
        approvedRequests: myRequests.filter(req => req.status === 'approved').length,
        rejectedRequests: myRequests.filter(req => req.status === 'rejected').length,
        recentRequests: myRequests.slice(0, 3)
      };
    }

    if (user?.role === 'hod') {
      const deptRequests = mockLeaveRequests.filter(req => req.department === user.department);
      return {
        totalRequests: deptRequests.length,
        pendingRequests: deptRequests.filter(req => req.hodApproval === 'pending' || req.hodApproval === undefined).length,
        approvedRequests: deptRequests.filter(req => req.hodApproval === 'approved').length,
        rejectedRequests: deptRequests.filter(req => req.hodApproval === 'rejected').length,
        recentRequests: deptRequests.slice(0, 3)
      };
    }

    if (user?.role === 'principal') {
      return {
        totalRequests: mockLeaveRequests.length,
        pendingRequests: mockLeaveRequests.filter(req => 
          req.hodApproval === 'approved' && (req.principalApproval === 'pending' || req.principalApproval === undefined)
        ).length,
        approvedRequests: mockLeaveRequests.filter(req => req.principalApproval === 'approved').length,
        rejectedRequests: mockLeaveRequests.filter(req => req.principalApproval === 'rejected').length,
        recentRequests: mockLeaveRequests.slice(0, 3)
      };
    }

    return {
      totalRequests: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      rejectedRequests: 0,
      recentRequests: []
    };
  };

  const data = getUserData();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    
    return {
      greeting,
      message: user?.role === 'teacher' ? 
        'Manage your leave applications and track their status' :
        user?.role === 'hod' ? 
        `Review and approve leave requests from ${user.department} department` :
        'Oversee all leave requests and maintain institutional standards'
    };
  };

  const welcome = getWelcomeMessage();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div 
          className="relative rounded-xl p-8 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.7)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              {welcome.greeting}, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-lg opacity-90 mb-6">
              {welcome.message}
            </p>
            {user?.role === 'teacher' && (
              <Link to="/apply">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Apply for Leave
                </Button>
              </Link>
            )}
            {user?.department && (
              <Badge variant="secondary" className="mt-4 bg-white/20 text-white border-white/30">
                {user.department} Department
              </Badge>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={user?.role === 'teacher' ? 'My Applications' : 'Total Requests'}
            value={data.totalRequests.toString()}
            icon={FileText}
            description={user?.role === 'teacher' ? 'All time' : 'This academic year'}
          />
          <StatsCard
            title="Pending"
            value={data.pendingRequests.toString()}
            icon={Clock}
            description="Awaiting approval"
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Approved"
            value={data.approvedRequests.toString()}
            icon={CheckCircle}
            description="Successfully approved"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Rejected"
            value={data.rejectedRequests.toString()}
            icon={XCircle}
            description="Not approved"
          />
        </div>

        {/* Recent Applications/Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent {user?.role === 'teacher' ? 'Applications' : 'Requests'}
                  <Link to={user?.role === 'teacher' ? '/history' : '/pending'}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.recentRequests.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    {user?.role === 'teacher' ? 
                      'No leave applications yet' : 
                      'No recent requests'
                    }
                  </div>
                ) : (
                  data.recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{request.teacherName}</span>
                          <Badge variant="outline" className="text-xs">
                            {request.leaveType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.days} day(s) • {new Date(request.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          request.status === 'approved' ? 'default' :
                          request.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.role === 'teacher' && (
                  <>
                    <Link to="/apply" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Apply for Leave
                      </Button>
                    </Link>
                    <Link to="/history" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View History
                      </Button>
                    </Link>
                  </>
                )}
                {(user?.role === 'hod' || user?.role === 'principal') && (
                  <>
                    <Link to="/pending" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <Clock className="h-4 w-4 mr-2" />
                        Pending Approvals
                      </Button>
                    </Link>
                    <Link to="/reports" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Reports
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/calendar" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}