import { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Shield, UserCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<UserRole>('teacher');
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, activeTab);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to your ${activeTab} dashboard.`,
      });
      navigate('/');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  const demoCredentials = {
    teacher: { email: 'teacher@sipna.edu', password: 'teacher123' },
    hod: { email: 'hod@sipna.edu', password: 'hod123' },
    principal: { email: 'principal@sipna.edu', password: 'principal123' }
  };

  const fillDemo = () => {
    setEmail(demoCredentials[activeTab].email);
    setPassword(demoCredentials[activeTab].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SCETA Amravati</h1>
          <p className="text-muted-foreground">Leave Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="teacher" className="text-xs">
                  <User className="h-4 w-4 mr-1" />
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="hod" className="text-xs">
                  <UserCheck className="h-4 w-4 mr-1" />
                  HOD
                </TabsTrigger>
                <TabsTrigger value="principal" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Principal
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium mb-2">Demo Credentials:</p>
                <TabsContent value="teacher" className="mt-0">
                  <div className="text-xs space-y-1">
                    <p>Email: teacher@sipna.edu</p>
                    <p>Password: teacher123</p>
                  </div>
                </TabsContent>
                <TabsContent value="hod" className="mt-0">
                  <div className="text-xs space-y-1">
                    <p>Email: hod@sipna.edu</p>
                    <p>Password: hod123</p>
                  </div>
                </TabsContent>
                <TabsContent value="principal" className="mt-0">
                  <div className="text-xs space-y-1">
                    <p>Email: principal@sipna.edu</p>
                    <p>Password: principal123</p>
                  </div>
                </TabsContent>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={fillDemo}
                  className="w-full mt-2"
                >
                  Fill Demo Credentials
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}