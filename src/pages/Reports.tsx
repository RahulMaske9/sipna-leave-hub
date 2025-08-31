import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, TrendingUp, Users, Calendar, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";

export default function Reports() {
  // Mock data for charts
  const monthlyLeaveData = [
    { month: 'Jan', approved: 15, pending: 3, rejected: 2 },
    { month: 'Feb', approved: 12, pending: 5, rejected: 1 },
    { month: 'Mar', approved: 18, pending: 2, rejected: 3 },
    { month: 'Apr', approved: 20, pending: 4, rejected: 1 },
    { month: 'May', approved: 14, pending: 6, rejected: 2 },
    { month: 'Jun', approved: 16, pending: 3, rejected: 4 },
    { month: 'Jul', approved: 22, pending: 2, rejected: 1 },
    { month: 'Aug', approved: 19, pending: 5, rejected: 2 },
    { month: 'Sep', approved: 17, pending: 4, rejected: 3 }
  ];

  const leaveTypeData = [
    { name: 'Sick Leave', value: 35, color: 'hsl(var(--destructive))' },
    { name: 'Casual Leave', value: 28, color: 'hsl(var(--primary))' },
    { name: 'Earned Leave', value: 22, color: 'hsl(var(--accent))' },
    { name: 'Emergency Leave', value: 10, color: 'hsl(var(--warning))' },
    { name: 'Maternity Leave', value: 5, color: 'hsl(var(--success))' }
  ];

  const departmentData = [
    { department: 'Computer Science', leaves: 45 },
    { department: 'Electronics', leaves: 38 },
    { department: 'Mechanical', leaves: 42 },
    { department: 'Civil', leaves: 35 },
    { department: 'Electrical', leaves: 40 }
  ];

  const trendData = [
    { month: 'Jan', thisYear: 20, lastYear: 25 },
    { month: 'Feb', thisYear: 18, lastYear: 22 },
    { month: 'Mar', thisYear: 23, lastYear: 28 },
    { month: 'Apr', thisYear: 25, lastYear: 24 },
    { month: 'May', thisYear: 22, lastYear: 26 },
    { month: 'Jun', thisYear: 23, lastYear: 30 },
    { month: 'Jul', thisYear: 25, lastYear: 28 },
    { month: 'Aug', thisYear: 26, lastYear: 32 },
    { month: 'Sep', thisYear: 24, lastYear: 29 }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Analyze leave patterns and department statistics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="this-year">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-accent hover:bg-accent-hover">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Applications"
            value="243"
            icon={Calendar}
            description="This academic year"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Approval Rate"
            value="87%"
            icon={TrendingUp}
            description="Average approval rate"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Average Days"
            value="2.3"
            icon={Clock}
            description="Per leave application"
            trend={{ value: 8, isPositive: false }}
          />
          <StatsCard
            title="Active Faculty"
            value="156"
            icon={Users}
            description="Across all departments"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Leave Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Leave Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyLeaveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                  <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
                  <Bar dataKey="rejected" fill="hsl(var(--destructive))" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Leave Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leaveTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leaveTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Leave Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="leaves" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Year-over-Year Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="thisYear" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="This Year"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lastYear" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Last Year"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Peak Leave Months</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>July</span>
                  <span className="font-semibold">25 applications</span>
                </div>
                <div className="flex justify-between">
                  <span>April</span>
                  <span className="font-semibold">24 applications</span>
                </div>
                <div className="flex justify-between">
                  <span>March</span>
                  <span className="font-semibold">23 applications</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• Sick leaves increased by 15% this quarter</p>
                <p>• Average approval time: 2.1 days</p>
                <p>• Most active department: Computer Science</p>
                <p>• Peak application day: Friday</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• Consider wellness programs to reduce sick leaves</p>
                <p>• Implement early leave planning system</p>
                <p>• Review approval workflow efficiency</p>
                <p>• Schedule department-wise leave coordination</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}