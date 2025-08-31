import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Calendar, Clock } from "lucide-react";

export default function LeaveHistory() {
  const leaveHistory = [
    {
      id: "L001",
      type: "Sick Leave",
      startDate: "2024-09-01",
      endDate: "2024-09-03",
      days: 3,
      status: "approved",
      appliedOn: "2024-08-28",
      approvedBy: "Dr. Sharma (HOD)",
      reason: "Medical treatment for fever"
    },
    {
      id: "L002",
      type: "Casual Leave",
      startDate: "2024-09-15",
      endDate: "2024-09-15",
      days: 1,
      status: "pending",
      appliedOn: "2024-09-10",
      approvedBy: "-",
      reason: "Personal work"
    },
    {
      id: "L003",
      type: "Earned Leave",
      startDate: "2024-08-20",
      endDate: "2024-08-25",
      days: 6,
      status: "rejected",
      appliedOn: "2024-08-15",
      approvedBy: "Dr. Patel (Principal)",
      reason: "Family function - insufficient notice period"
    },
    {
      id: "L004",
      type: "Emergency Leave",
      startDate: "2024-07-10",
      endDate: "2024-07-11",
      days: 2,
      status: "approved",
      appliedOn: "2024-07-09",
      approvedBy: "Dr. Sharma (HOD)",
      reason: "Family emergency"
    },
    {
      id: "L005",
      type: "Sick Leave",
      startDate: "2024-06-15",
      endDate: "2024-06-17",
      days: 3,
      status: "approved",
      appliedOn: "2024-06-14",
      approvedBy: "Dr. Sharma (HOD)",
      reason: "Medical treatment"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave History</h1>
            <p className="text-muted-foreground">Track all your leave applications and their status</p>
          </div>
          <Button className="bg-accent hover:bg-accent-hover">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search applications..." 
                  className="pl-9"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="earned">Earned Leave</SelectItem>
                  <SelectItem value="emergency">Emergency Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leave History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Application History
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {leaveHistory.length} applications found
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{leave.id}</TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {leave.startDate} to {leave.endDate}
                        </div>
                      </TableCell>
                      <TableCell>{leave.days} days</TableCell>
                      <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {leave.appliedOn}
                      </TableCell>
                      <TableCell className="text-sm">
                        {leave.approvedBy}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}