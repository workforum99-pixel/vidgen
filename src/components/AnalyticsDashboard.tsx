import { useState } from "react";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  BarChart3, 
  Calendar, 
  ChevronDown, 
  DollarSign, 
  Eye, 
  Filter, 
  LayoutDashboard, 
  MoreHorizontal, 
  PieChart as PieChartIcon, 
  Settings, 
  Share2, 
  Users, 
  Video 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const generateDailyData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: Math.floor(Math.random() * 5000) + 1000,
      watchTime: Math.floor(Math.random() * 300) + 50,
      revenue: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};

const mockData = {
  overview: generateDailyData(28),
  demographics: [
    { name: "13-17", value: 5 },
    { name: "18-24", value: 25 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 15 },
    { name: "45+", value: 10 },
  ],
  trafficSources: [
    { name: "YouTube Search", value: 40, color: "#FF0000" },
    { name: "Suggested Videos", value: 35, color: "#00C49F" },
    { name: "External", value: 15, color: "#FFBB28" },
    { name: "Browse Features", value: 10, color: "#0088FE" },
  ],
  topVideos: [
    { id: 1, title: "How to Build an AI App", views: "45.2K", ctr: "12.5%", duration: "4:30", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 2, title: "React 19 Features Explained", views: "32.1K", ctr: "10.2%", duration: "3:15", thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e1565e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 3, title: "The Future of Coding", views: "28.9K", ctr: "8.7%", duration: "5:45", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 4, title: "My Desk Setup 2025", views: "21.5K", ctr: "15.1%", duration: "2:20", thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 5, title: "Day in the Life of a Dev", views: "18.2K", ctr: "9.4%", duration: "6:10", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  ]
};

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("28");
  const [metric, setMetric] = useState<"views" | "watchTime">("views");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Analytics</span>
            <span>/</span>
            <span className="text-foreground font-medium">Overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Channel Analytics</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="channel-1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="channel-1">Main Channel</SelectItem>
              <SelectItem value="channel-2">Gaming Channel</SelectItem>
              <SelectItem value="channel-3">Vlog Channel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="28">Last 28 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">Lifetime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-12 space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Views", value: "1.2M", change: "+12%", trend: "up", icon: Eye },
              { title: "Watch Time (Hours)", value: "45.2K", change: "+5%", trend: "up", icon: BarChart3 },
              { title: "Subscribers", value: "+3.4K", change: "-2%", trend: "down", icon: Users },
              { title: "Est. Revenue", value: "$12,450", change: "+18%", trend: "up", icon: DollarSign, highlight: true },
            ].map((stat, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={cn("h-4 w-4", stat.highlight ? "text-green-500" : "text-muted-foreground")} />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", stat.highlight && "text-green-500")}>{stat.value}</div>
                  <div className="flex items-center text-xs mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">vs previous</span>
                  </div>
                  {/* Mini Sparkline Simulation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
                    <div 
                      className={cn("h-full bg-primary/50", stat.trend === "up" ? "bg-green-500/50" : "bg-red-500/50")} 
                      style={{ width: `${Math.random() * 60 + 20}%` }} 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>
                    Views and Watch Time over the last {dateRange} days
                  </CardDescription>
                </div>
                <Tabs defaultValue="views" onValueChange={(v) => setMetric(v as any)}>
                  <TabsList>
                    <TabsTrigger value="views">Views</TabsTrigger>
                    <TabsTrigger value="watchTime">Watch Time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[350px] w-full">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.overview}>
                      <defs>
                        <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `${value}`} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey={metric} 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorMetric)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Audience Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Age distribution of your viewers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.demographics}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your viewers are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockData.trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mockData.trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                  {mockData.trafficSources.map((source, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span>{source.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement & Top Videos */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Videos</CardTitle>
                <CardDescription>Your best content from the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-28 rounded-md overflow-hidden bg-muted">
                          <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{video.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {video.views}</span>
                            <span className="flex items-center gap-1"><Share2 className="h-3 w-3" /> {video.ctr} CTR</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
