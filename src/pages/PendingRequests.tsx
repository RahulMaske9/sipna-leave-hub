import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { mockLeaveRequests } from "@/data/mockData";
import { Check, X, Eye, Clock, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PendingRequests() {
  const { user } = useAuth();
  const { toast } = useToast();

  const pendingRequests = mockLeaveRequests.filter(request => {
    if (user?.role === 'hod') {
      return request.department === user.department && 
             (request.hodApproval === 'pending' || request.hodApproval === undefined);
    }
    if (user?.role === 'principal') {
      return request.hodApproval === 'approved' && 
             (request.principalApproval === 'pending' || request.principalApproval === undefined);
    }
    return false;
  });

  const handleApprove = (requestId: string) => {
    toast({
      title: "Leave Approved",
      description: "Leave request has been approved successfully.",
    });
  };

  const handleReject = (requestId: string) => {
    toast({
      title: "Leave Rejected",
      description: "Leave request has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Pending {user?.role === 'principal' ? 'Final ' : ''}Approvals
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'hod' ? 
                `Review leave requests from ${user.department} department` :
                'Final approval for HOD approved requests'
              }
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            {pendingRequests.length} Pending
          </Badge>
        </div>

        {pendingRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Pending Requests</h3>
              <p className="text-muted-foreground text-center">
                All leave requests have been processed
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-warning">
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
                    <Badge className={getStatusColor(request.leaveType)}>
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                    </Badge>
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

                  {user?.role === 'principal' && request.hodComments && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium">HOD Comments</p>
                      <p className="text-sm text-muted-foreground">{request.hodComments}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleReject(request.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
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