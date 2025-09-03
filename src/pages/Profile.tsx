import { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Award, 
  Briefcase, 
  Calendar, 
  MapPin,
  Mail,
  Phone,
  GraduationCap
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  endorsements: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Academic' | 'Research' | 'Teaching' | 'Leadership' | 'Other';
  description: string;
}

interface UserProfile {
  bio: string;
  phone: string;
  location: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    bio: '',
    phone: '',
    location: '',
    skills: [],
    experience: [],
    education: [],
    achievements: []
  });

  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Load profile data from localStorage
  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  }, [user]);

  // Save profile data to localStorage
  const saveProfile = (newProfile: UserProfile) => {
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(newProfile));
      setProfile(newProfile);
    }
  };

  const updateBasicInfo = (field: keyof Pick<UserProfile, 'bio' | 'phone' | 'location'>, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    saveProfile(updatedProfile);
  };

  const addSkill = (skillData: Omit<Skill, 'id' | 'endorsements'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: Date.now().toString(),
      endorsements: 0
    };
    const updatedProfile = {
      ...profile,
      skills: [...profile.skills, newSkill]
    };
    saveProfile(updatedProfile);
    setIsSkillDialogOpen(false);
    toast({ title: "Skill added successfully!" });
  };

  const updateSkill = (skillId: string, skillData: Omit<Skill, 'id' | 'endorsements'>) => {
    const updatedProfile = {
      ...profile,
      skills: profile.skills.map(skill => 
        skill.id === skillId 
          ? { ...skill, ...skillData }
          : skill
      )
    };
    saveProfile(updatedProfile);
    setIsSkillDialogOpen(false);
    setEditingItem(null);
    toast({ title: "Skill updated successfully!" });
  };

  const deleteSkill = (skillId: string) => {
    const updatedProfile = {
      ...profile,
      skills: profile.skills.filter(skill => skill.id !== skillId)
    };
    saveProfile(updatedProfile);
    toast({ title: "Skill removed successfully!" });
  };

  const addExperience = (expData: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...expData,
      id: Date.now().toString()
    };
    const updatedProfile = {
      ...profile,
      experience: [...profile.experience, newExp]
    };
    saveProfile(updatedProfile);
    setIsExperienceDialogOpen(false);
    toast({ title: "Experience added successfully!" });
  };

  const updateExperience = (expId: string, expData: Omit<Experience, 'id'>) => {
    const updatedProfile = {
      ...profile,
      experience: profile.experience.map(exp => 
        exp.id === expId 
          ? { ...exp, ...expData }
          : exp
      )
    };
    saveProfile(updatedProfile);
    setIsExperienceDialogOpen(false);
    setEditingItem(null);
    toast({ title: "Experience updated successfully!" });
  };

  const deleteExperience = (expId: string) => {
    const updatedProfile = {
      ...profile,
      experience: profile.experience.filter(exp => exp.id !== expId)
    };
    saveProfile(updatedProfile);
    toast({ title: "Experience removed successfully!" });
  };

  const addAchievement = (achievementData: Omit<Achievement, 'id'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: Date.now().toString()
    };
    const updatedProfile = {
      ...profile,
      achievements: [...profile.achievements, newAchievement]
    };
    saveProfile(updatedProfile);
    setIsAchievementDialogOpen(false);
    toast({ title: "Achievement added successfully!" });
  };

  const updateAchievement = (achievementId: string, achievementData: Omit<Achievement, 'id'>) => {
    const updatedProfile = {
      ...profile,
      achievements: profile.achievements.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, ...achievementData }
          : achievement
      )
    };
    saveProfile(updatedProfile);
    setIsAchievementDialogOpen(false);
    setEditingItem(null);
    toast({ title: "Achievement updated successfully!" });
  };

  const deleteAchievement = (achievementId: string) => {
    const updatedProfile = {
      ...profile,
      achievements: profile.achievements.filter(achievement => achievement.id !== achievementId)
    };
    saveProfile(updatedProfile);
    toast({ title: "Achievement removed successfully!" });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground">{user?.role === 'hod' ? 'Head of Department' : 'Teacher'}</p>
                <p className="text-muted-foreground">{user?.department} Department</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user?.email}
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {profile.phone}
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={profile.bio}
                onChange={(e) => updateBasicInfo('bio', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={profile.phone}
                  onChange={(e) => updateBasicInfo('phone', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={profile.location}
                  onChange={(e) => updateBasicInfo('location', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Skills
            </CardTitle>
            <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  onClick={() => {
                    setEditingItem(null);
                    setIsSkillDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
                </DialogHeader>
                <SkillForm
                  skill={editingItem}
                  onSave={editingItem ? 
                    (data) => updateSkill(editingItem.id, data) : 
                    addSkill
                  }
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {profile.skills.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No skills added yet</p>
            ) : (
              <div className="grid gap-3">
                {profile.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {skill.endorsements} endorsements
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingItem(skill);
                          setIsSkillDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Experience
            </CardTitle>
            <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  onClick={() => {
                    setEditingItem(null);
                    setIsExperienceDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
                </DialogHeader>
                <ExperienceForm
                  experience={editingItem}
                  onSave={editingItem ? 
                    (data) => updateExperience(editingItem.id, data) : 
                    addExperience
                  }
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {profile.experience.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No experience added yet</p>
            ) : (
              <div className="space-y-4">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingItem(exp);
                            setIsExperienceDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements & Awards
            </CardTitle>
            <Dialog open={isAchievementDialogOpen} onOpenChange={setIsAchievementDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm"
                  onClick={() => {
                    setEditingItem(null);
                    setIsAchievementDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
                </DialogHeader>
                <AchievementForm
                  achievement={editingItem}
                  onSave={editingItem ? 
                    (data) => updateAchievement(editingItem.id, data) : 
                    addAchievement
                  }
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {profile.achievements.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No achievements added yet</p>
            ) : (
              <div className="space-y-4">
                {profile.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <Badge variant="secondary">{achievement.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingItem(achievement);
                            setIsAchievementDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteAchievement(achievement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

// Skill Form Component
function SkillForm({ skill, onSave }: { skill?: Skill; onSave: (data: Omit<Skill, 'id' | 'endorsements'>) => void }) {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    level: skill?.level || 'Beginner' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="skillName">Skill Name</Label>
        <Input
          id="skillName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. React, Machine Learning, Project Management"
          required
        />
      </div>
      <div>
        <Label htmlFor="skillLevel">Proficiency Level</Label>
        <select
          id="skillLevel"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value as Skill['level'] })}
          className="w-full mt-1 p-2 border border-input rounded-md bg-background"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Save Skill</Button>
      </div>
    </form>
  );
}

// Achievement Form Component
function AchievementForm({ achievement, onSave }: { achievement?: Achievement; onSave: (data: Omit<Achievement, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    organization: achievement?.organization || '',
    date: achievement?.date || '',
    category: achievement?.category || 'Academic' as const,
    description: achievement?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.organization.trim()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="achievementTitle">Achievement Title</Label>
        <Input
          id="achievementTitle"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Best Teacher Award, Research Excellence Award"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="e.g. University, Government, Professional Body"
            required
          />
        </div>
        <div>
          <Label htmlFor="achievementDate">Date Received</Label>
          <Input
            id="achievementDate"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Achievement['category'] })}
          className="w-full mt-1 p-2 border border-input rounded-md bg-background"
        >
          <option value="Academic">Academic</option>
          <option value="Research">Research</option>
          <option value="Teaching">Teaching</option>
          <option value="Leadership">Leadership</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <Label htmlFor="achievementDescription">Description</Label>
        <Textarea
          id="achievementDescription"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the achievement and its significance..."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Save Achievement</Button>
      </div>
    </form>
  );
}

// Experience Form Component
function ExperienceForm({ experience, onSave }: { experience?: Experience; onSave: (data: Omit<Experience, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    location: experience?.location || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    current: experience?.current || false,
    description: experience?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.company.trim()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Lecturer"
            required
          />
        </div>
        <div>
          <Label htmlFor="company">Company/Institution</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. ABC University"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g. Mumbai, Maharashtra"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="month"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            disabled={formData.current}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
        />
        <Label htmlFor="current">I currently work here</Label>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your responsibilities and achievements..."
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Save Experience</Button>
      </div>
    </form>
  );
}