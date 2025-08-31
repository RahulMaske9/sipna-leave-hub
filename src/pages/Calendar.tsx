import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Clock } from "lucide-react";
import { useState } from "react";
import { format, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock leave data
  const leaveEvents = [
    {
      date: new Date(2024, 8, 1), // September 1, 2024
      type: "Sick Leave",
      status: "approved",
      employee: "You"
    },
    {
      date: new Date(2024, 8, 2),
      type: "Sick Leave", 
      status: "approved",
      employee: "You"
    },
    {
      date: new Date(2024, 8, 15),
      type: "Casual Leave",
      status: "pending",
      employee: "You"
    },
    {
      date: new Date(2024, 8, 20),
      type: "Department Meeting",
      status: "approved",
      employee: "All Faculty"
    },
    {
      date: new Date(2024, 8, 25),
      type: "Earned Leave",
      status: "approved",
      employee: "Dr. Sharma"
    }
  ];

  const upcomingEvents = [
    {
      date: "2024-09-15",
      title: "Your Casual Leave",
      status: "pending",
      type: "Personal"
    },
    {
      date: "2024-09-20", 
      title: "Department Meeting",
      status: "confirmed",
      type: "Official"
    },
    {
      date: "2024-09-25",
      title: "Dr. Sharma's Leave",
      status: "approved", 
      type: "Colleague"
    },
    {
      date: "2024-10-02",
      title: "Gandhi Jayanti",
      status: "holiday",
      type: "Public Holiday"
    }
  ];

  const getEventBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground text-xs">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground text-xs">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-primary text-primary-foreground text-xs">Confirmed</Badge>;
      case 'holiday':
        return <Badge className="bg-accent text-accent-foreground text-xs">Holiday</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const modifiers = {
    leaveDay: leaveEvents.map(event => event.date),
  };

  const modifiersStyles = {
    leaveDay: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '4px'
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Calendar</h1>
            <p className="text-muted-foreground">View and track leave schedules across the department</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 text-sm font-medium min-w-32 text-center">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Monthly View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarUI
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentDate}
                  onMonthChange={setCurrentDate}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="rounded-md border w-full"
                />
                
                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded"></div>
                    <span>Approved Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded"></div>
                    <span>Pending Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Department Event</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded"></div>
                    <span>Public Holiday</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your Leaves</span>
                  <span className="font-semibold">3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Department Leaves</span>
                  <span className="font-semibold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Public Holidays</span>
                  <span className="font-semibold">2 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        {getEventBadge(event.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
                      <p className="text-xs text-muted-foreground">{event.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}