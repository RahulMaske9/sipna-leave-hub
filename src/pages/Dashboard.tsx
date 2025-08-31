import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { LeaveCard } from "@/components/LeaveCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, PlusCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Dashboard() {
  const recentLeaves = [
    {
      type: "Sick Leave",
      startDate: "2024-09-01",
      endDate: "2024-09-03",
      status: "approved" as const,
      reason: "Medical treatment for fever",
      appliedOn: "2024-08-28"
    },
    {
      type: "Casual Leave",
      startDate: "2024-09-15",
      endDate: "2024-09-15",
      status: "pending" as const,
      reason: "Personal work",
      appliedOn: "2024-09-10"
    },
    {
      type: "Earned Leave",
      startDate: "2024-08-20",
      endDate: "2024-08-25",
      status: "rejected" as const,
      reason: "Family function",
      appliedOn: "2024-08-15"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div 
        className="relative rounded-xl p-8 mb-8 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.7)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Leave Management</h1>
          <p className="text-lg opacity-90 mb-6">
            Manage your leave applications efficiently and stay updated with your leave balance.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            <PlusCircle className="mr-2 h-5 w-5" />
            Apply for Leave
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Available Leaves"
          value="18"
          icon={Calendar}
          description="Days remaining this year"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Pending Requests"
          value="2"
          icon={Clock}
          description="Awaiting approval"
        />
        <StatsCard
          title="Approved Leaves"
          value="12"
          icon={FileText}
          description="This academic year"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Leave Balance"
          value="30"
          icon={Calendar}
          description="Total allocated days"
        />
      </div>

      {/* Recent Leave Applications */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Recent Applications</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid gap-4">
          {recentLeaves.map((leave, index) => (
            <LeaveCard key={index} {...leave} />
          ))}
        </div>
      </div>
    </Layout>
  );
}