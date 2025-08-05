
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  BookOpen, 
  FileText, 
  Link as LinkIcon, 
  Clock, 
  TrendingUp,
  Brain,
  Bookmark,
  Download,
  Play,
  ArrowRight,
  Target,
  Calendar,
  Flame
} from "lucide-react";

const Dashboard = () => {
  const [userName] = useState("Sarah");

  const recentSessions = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "PDF",
      progress: 75,
      lastAccessed: "2 hours ago",
      source: "research-paper.pdf"
    },
    {
      id: 2,
      title: "Market Analysis Report",
      type: "URL",
      progress: 45,
      lastAccessed: "1 day ago",
      source: "bloomberg.com"
    },
    {
      id: 3,
      title: "Product Strategy Notes",
      type: "Text",
      progress: 90,
      lastAccessed: "3 days ago",
      source: "Custom Text Input"
    }
  ];

  const savedContent = [
    { id: 1, title: "AI Ethics Mind Map", type: "mindmap", thumbnail: "🧠" },
    { id: 2, title: "Key Market Insights", type: "bookmark", thumbnail: "📊" },
    { id: 3, title: "Learning Summary PDF", type: "export", thumbnail: "📄" }
  ];

  const upcomingModules = [
    { title: "Advanced Neural Networks", dueDate: "Tomorrow", course: "AI Fundamentals" },
    { title: "Market Research Methods", dueDate: "Next Week", course: "Business Analytics" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="w-4 h-4" />;
      case "URL": return <LinkIcon className="w-4 h-4" />;
      case "Text": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome back, {userName}!
              </h1>
              <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  3 active sessions
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  2 courses in progress
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">View Profile</Button>
              <Button>Settings</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Actions */}
            <section>
              <h2 className="text-xl font-semibold mb-6 text-foreground">Start Learning</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="group hover:shadow-card transition-all duration-300 cursor-pointer border-0 bg-gradient-card">
                  <Link to="/new-session">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        Start New Project
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Upload PDF, paste link, or add text for AI-powered analysis
                      </p>
                      <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center group-hover:border-primary/40 transition-colors">
                        <div className="text-sm text-muted-foreground">
                          Drag & drop files here or click to browse
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>

                <Card className="group hover:shadow-card transition-all duration-300 cursor-pointer border-0 bg-gradient-card">
                  <Link to="/courses">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                          <BookOpen className="w-6 h-6 text-accent" />
                        </div>
                        Explore Courses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Browse structured, personalized professional courses
                      </p>
                      <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">Featured: AI Fundamentals</h4>
                            <p className="text-xs text-muted-foreground">12 modules • 6 hours</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-accent" />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View all sessions <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recentSessions.map((session) => (
                  <Card key={session.id} className="min-w-[300px] hover:shadow-card transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(session.type)}
                          <Badge variant="secondary" className="text-xs">
                            {session.type}
                          </Badge>
                        </div>
                        <Button size="sm" className="h-8 w-8 p-0">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{session.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 truncate">{session.source}</p>
                      <div className="space-y-2">
                        <Progress value={session.progress} className="h-1" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{session.progress}% complete</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.lastAccessed}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Saved Content */}
            <section>
              <h2 className="text-xl font-semibold mb-6 text-foreground">Saved Content</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Mind Maps
                  </h3>
                  <div className="space-y-2">
                    {savedContent.filter(c => c.type === 'mindmap').map((item) => (
                      <Card key={item.id} className="p-3 hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{item.thumbnail}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{item.title}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-accent" />
                    Bookmarks
                  </h3>
                  <div className="space-y-2">
                    {savedContent.filter(c => c.type === 'bookmark').map((item) => (
                      <Card key={item.id} className="p-3 hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{item.thumbnail}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{item.title}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-600" />
                    Exports
                  </h3>
                  <div className="space-y-2">
                    {savedContent.filter(c => c.type === 'export').map((item) => (
                      <Card key={item.id} className="p-3 hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{item.thumbnail}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{item.title}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">Learning Streak</h3>
                    <p className="text-sm opacity-90">Keep it going!</p>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">12</div>
                <p className="text-sm opacity-90">days in a row</p>
              </CardContent>
            </Card>

            {/* Upcoming Modules */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingModules.map((module, index) => (
                  <div key={index} className="pb-3 border-b border-border last:border-0">
                    <p className="font-medium text-xs mb-1">{module.title}</p>
                    <p className="text-xs text-muted-foreground mb-1">{module.course}</p>
                    <Badge variant="outline" className="text-xs">
                      {module.dueDate}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommended */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Recommended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <p className="font-medium text-xs mb-1">Advanced Python</p>
                    <p className="text-xs text-muted-foreground mb-2">Based on your ML interest</p>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
