import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Creatives",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Image
  },
  {
    title: "Avg. CTR",
    value: "3.42%",
    change: "+0.8%",
    trend: "up",
    icon: Target
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+2",
    trend: "up",
    icon: BarChart3
  },
  {
    title: "Credits Used",
    value: "156",
    change: "86 remaining",
    trend: "neutral",
    icon: Users
  }
];

const recentProjects = [
  {
    name: "Summer Campaign 2024",
    creatives: 12,
    lastUpdated: "2 hours ago",
    status: "active"
  },
  {
    name: "Holiday Promotions",
    creatives: 8,
    lastUpdated: "1 day ago",
    status: "completed"
  },
  {
    name: "Brand Awareness Q1",
    creatives: 4,
    lastUpdated: "3 days ago",
    status: "active"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your creatives.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/upload">
              <Plus className="mr-2 h-4 w-4" />
              Upload Creative
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="gradient-primary p-2 rounded-lg shadow-elegant">
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-primary" />
                )}
                <span className={stat.trend === "up" ? "text-primary" : ""}>
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Recent Projects</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/gallery">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                <div className="space-y-1">
                  <h4 className="font-medium">{project.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{project.creatives} creatives</span>
                    <span>•</span>
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <Link to="/upload">
                <Upload className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Upload New Creative</div>
                  <div className="text-sm text-muted-foreground">Add images for AI analysis</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <Link to="/gallery">
                <Image className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Browse Gallery</div>
                  <div className="text-sm text-muted-foreground">View all your creatives</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
              <Link to="/analytics">
                <BarChart3 className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-sm text-muted-foreground">Detailed performance insights</div>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="shadow-card bg-gradient-hero">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to optimize your first creative?</h3>
              <p className="text-white/80">Upload an image and get AI-powered predictions in seconds.</p>
            </div>
            <Button variant="glass" asChild>
              <Link to="/upload">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}