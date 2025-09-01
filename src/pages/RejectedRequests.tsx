import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockLeaveRequests } from "@/data/mockData";
import { XCircle, Calendar, User, Eye } from "lucide-react";

export default function RejectedRequests() {
  const { user } = useAuth();

  const rejectedRequests = mockLeaveRequests.filter(request => {
    if (user?.role === 'hod') {
      return request.department === user.department && request.hodApproval === 'rejected';
    }
    if (user?.role === 'principal') {
      return request.principalApproval === 'rejected';
    }
    return request.status === 'rejected';
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sick': return 'bg-destructive text-destructive-foreground';
      case 'casual': return 'bg-primary text-primary-foreground';
      case 'earned': return 'bg-accent text-accent-foreground';
      case 'emergency': return 'bg-warning text-warning-foreground';
      case 'maternity': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rejected Requests</h1>
            <p className="text-muted-foreground">
              {user?.role === 'hod' ? 
                `Rejected leave requests from ${user.department} department` :
                'All rejected leave requests'
              }
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2 bg-destructive/10 text-destructive">
            <XCircle className="h-4 w-4 mr-2" />
            {rejectedRequests.length} Rejected
          </Badge>
        </div>

        {rejectedRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Rejected Requests</h3>
              <p className="text-muted-foreground text-center">
                No leave requests have been rejected
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {rejectedRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-destructive">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {request.teacherName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {request.department} • Applied on {new Date(request.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(request.leaveType)}>
                        {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                      </Badge>
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{request.days} day(s)</p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium">Reason</p>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {request.hodComments && user?.role !== 'hod' && (
                      <div className="bg-muted p-3 rounded-lg border">
                        <p className="text-sm font-medium">HOD Comments</p>
                        <p className="text-sm text-muted-foreground">{request.hodComments}</p>
                      </div>
                    )}
                    {request.principalComments && (
                      <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                        <p className="text-sm font-medium text-destructive">
                          {user?.role === 'principal' ? 'Your Comments' : 'Principal Comments'}
                        </p>
                        <p className="text-sm text-muted-foreground">{request.principalComments}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}