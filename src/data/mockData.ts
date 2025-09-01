export interface LeaveRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  department: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'emergency' | 'maternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  hodApproval?: 'approved' | 'rejected' | 'pending';
  principalApproval?: 'approved' | 'rejected' | 'pending';
  hodComments?: string;
  principalComments?: string;
}

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Dr. Rajesh Kumar',
    department: 'Computer Science',
    leaveType: 'sick',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    days: 3,
    reason: 'Fever and flu symptoms',
    status: 'approved',
    appliedDate: '2024-01-10',
    hodApproval: 'approved',
    principalApproval: 'approved',
    hodComments: 'Approved for medical reasons',
    principalComments: 'Final approval granted'
  },
  {
    id: '2',
    teacherId: '4',
    teacherName: 'Dr. Amit Singh',
    department: 'Electronics',
    leaveType: 'casual',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    days: 2,
    reason: 'Family function',
    status: 'pending',
    appliedDate: '2024-01-18',
    hodApproval: 'approved',
    principalApproval: 'pending'
  },
  {
    id: '3',
    teacherId: '5',
    teacherName: 'Dr. Sunita Verma',
    department: 'Mechanical',
    leaveType: 'earned',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    days: 5,
    reason: 'Vacation with family',
    status: 'rejected',
    appliedDate: '2024-01-25',
    hodApproval: 'approved',
    principalApproval: 'rejected',
    principalComments: 'Cannot approve during exam period'
  },
  {
    id: '4',
    teacherId: '6',
    teacherName: 'Dr. Rakesh Jain',
    department: 'Civil',
    leaveType: 'emergency',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    days: 1,
    reason: 'Family emergency',
    status: 'approved',
    appliedDate: '2024-01-24',
    hodApproval: 'approved',
    principalApproval: 'approved'
  },
  {
    id: '5',
    teacherId: '7',
    teacherName: 'Dr. Neha Patil',
    department: 'Electrical',
    leaveType: 'sick',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    days: 3,
    reason: 'Medical checkup and treatment',
    status: 'pending',
    appliedDate: '2024-02-08',
    hodApproval: 'pending'
  }
];

export const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical'
];

export const leaveTypes = [
  { value: 'sick', label: 'Sick Leave' },
  { value: 'casual', label: 'Casual Leave' },
  { value: 'earned', label: 'Earned Leave' },
  { value: 'emergency', label: 'Emergency Leave' },
  { value: 'maternity', label: 'Maternity Leave' }
];