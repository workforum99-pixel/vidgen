import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  CheckCircle2,
  ChevronRight,
  FileAudio,
  Film,
  Image as ImageIcon,
  Layout,
  Loader2,
  Mic,
  Music,
  Play,
  Sparkles,
  Upload,
  Wand2,
  Youtube,
  X,
  Clapperboard,
  PenTool,
  Bot,
  CalendarClock,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Billing } from "@/components/Billing";
import { BillingManagement } from "@/components/BillingManagement";

export default function Dashboard() {
  const { isAuthenticated, isLoading, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const isVideosPage = location.pathname.includes("/videos");
  const isSettingsPage = location.pathname.includes("/settings");
  const isPricingPage = location.pathname.includes("/pricing");
  const isBillingPage = location.pathname.includes("/billing");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [idea, setIdea] = useState("");
  const [script, setScript] = useState("");
  const [videoLength, setVideoLength] = useState("medium");
  const [isCustomLength, setIsCustomLength] = useState(false);
  const [tone, setTone] = useState("engaging");
  
  // Scheduling State
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");

  // Mock data for videos page
  const scheduledVideos = [
    { id: 1, title: "The Future of AI", date: "Oct 24, 2025", time: "10:00 AM" },
    { id: 2, title: "React 19 Tutorial", date: "Oct 25, 2025", time: "2:00 PM" },
  ];

  const uploadedVideos = [
    { id: 3, title: "My First Vlog", views: "1.2k", date: "2 days ago" },
    { id: 4, title: "Gaming Highlights", views: "540", date: "5 days ago" },
    { id: 5, title: "Tech Review", views: "10k", date: "1 week ago" },
  ];

  // Check for template data from navigation
  useEffect(() => {
    if (location.state?.referenceUrl && !idea) {
      toast.success("Style adapted from reference video!", {
        description: "We've analyzed the video and set the tone for you."
      });
      setIdea(`Video inspired by: ${location.state.referenceUrl}`);
      setTone("engaging"); // Mock adaptation
    }
  }, [location.state]);
  
  // Mock generation functions
  const handleGenerateScript = async () => {
    if (!idea) {
      toast.error("Please enter a video topic or idea.");
      return;
    }
    setIsGenerating(true);
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScript(`[INTRO]\nHost: Welcome back to the channel! Today we're diving into ${idea}.\n\n[BODY]\nHere are the key points you need to know...\n\n[OUTRO]\nDon't forget to like and subscribe!`);
    setIsGenerating(false);
    toast.success("Script generated successfully!");
  };

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-6xl">
          {isVideosPage ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Scheduled Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Scheduled Videos</h2>
                </div>
                {scheduledVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scheduledVideos.map((video) => (
                      <Card key={video.id} className="overflow-hidden border-dashed border-2">
                        <div className="aspect-video bg-muted/30 relative flex items-center justify-center">
                          <CalendarClock className="h-10 w-10 text-muted-foreground/50" />
                          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border">
                            Scheduled
                          </div>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base line-clamp-1">{video.title}</CardTitle>
                          <CardDescription className="flex flex-col gap-1">
                            <span className="font-medium text-primary">{video.date} at {video.time}</span>
                            <span className="text-xs">Ready to publish</span>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm italic">No videos scheduled.</div>
                )}
              </div>

              <Separator />

              {/* Uploaded Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold tracking-tight">Uploaded Videos</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {uploadedVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <Play className="h-12 w-12 text-white fill-white drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                          10:24
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">{video.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center">
                          <span>{video.views} views</span>
                          <span>{video.date}</span>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : isSettingsPage ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Settings className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account details and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={user?.image} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{user?.name || "User"}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Display Name</Label>
                      <Input defaultValue={user?.name} disabled />
                    </div>
                    <div className="grid gap-2">
                      <Label>Email Address</Label>
                      <Input defaultValue={user?.email} disabled />
                    </div>
                  </div>

                  <Separator />

                  <div className="pt-2">
                    <Button 
                      variant="destructive" 
                      className="w-full sm:w-auto" 
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isPricingPage ? (
            <Billing />
          ) : isBillingPage ? (
            <BillingManagement />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient bg-300% pb-1">
                    Think, Create & Publish
                  </h1>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                    <p className="text-xl font-medium text-muted-foreground/80">
                      Go from idea to published video in <span className="text-foreground font-bold underline decoration-primary/50 underline-offset-4">5 simple steps</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="mb-12 px-4">
                <div className="relative flex justify-between items-start">
                  {/* Background Track (Dotted) */}
                  <div className="absolute top-5 left-12 right-12 h-0.5 -translate-y-1/2 z-0">
                     <div className="w-full h-full border-t-2 border-dotted border-muted-foreground/30" />
                  </div>
                  
                  {/* Progress Line (Solid) */}
                  <div 
                    className="absolute top-5 left-12 h-1 bg-primary -translate-y-1/2 transition-all duration-500 ease-in-out origin-left z-0"
                    style={{ width: `calc((100% - 6rem) * ${(currentStep - 1) / 4})` }}
                  />

                  {[
                    { id: 1, label: "Idea & Script", icon: Sparkles },
                    { id: 2, label: "Voice & Sound", icon: Mic },
                    { id: 3, label: "Visuals", icon: Film },
                    { id: 4, label: "Thumbnail", icon: ImageIcon },
                    { id: 5, label: "Publish", icon: Youtube },
                  ].map((step) => (
                    <div key={step.id} className="relative flex flex-col items-center gap-2 z-10 w-24">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          currentStep >= step.id
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/40 scale-110"
                            : "bg-muted border-muted-foreground/30 text-muted-foreground bg-background"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium text-center ${
                          currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 1: Idea & Script</CardTitle>
                    <CardDescription>Start by describing your video idea, and our AI will write the script for you.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="idea" className="text-base font-semibold">Your Video Topic/Idea</Label>
                      <Textarea
                        id="idea"
                        placeholder="e.g., The rise of faceless YouTube channels in 2025"
                        className="min-h-[100px] text-lg border-foreground/20 bg-muted/5"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Video Length</Label>
                        {isCustomLength ? (
                          <div className="relative">
                            <Input
                              value={videoLength}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^\d+$/.test(value)) {
                                  setVideoLength(value);
                                }
                              }}
                              placeholder="e.g., 10"
                              className="border-foreground/20 bg-muted/5 pr-10"
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => {
                                setIsCustomLength(false);
                                setVideoLength("medium");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Select
                            value={videoLength}
                            onValueChange={(val) => {
                              if (val === "custom") {
                                setIsCustomLength(true);
                                setVideoLength("");
                              } else {
                                setVideoLength(val);
                              }
                            }}
                          >
                            <SelectTrigger className="border-foreground/20 bg-muted/5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short (Under 1 min)</SelectItem>
                              <SelectItem value="medium">Medium (1-5 mins)</SelectItem>
                              <SelectItem value="long">Long (5+ mins)</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Tone of the Video</Label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger className="border-foreground/20 bg-muted/5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informative">Informative</SelectItem>
                            <SelectItem value="engaging">Engaging</SelectItem>
                            <SelectItem value="funny">Funny</SelectItem>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                            <SelectItem value="fantasy">Fantasy</SelectItem>
                            <SelectItem value="adventurous">Adventurous</SelectItem>
                            <SelectItem value="curious">Curious</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Keywords (Optional)</Label>
                        <Input placeholder="AI, Tech, Future" className="border-foreground/20 bg-muted/5" />
                      </div>
                    </div>

                    {!script ? (
                      <Button 
                        size="lg" 
                        className="w-full md:w-auto" 
                        onClick={handleGenerateScript}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Script...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Script
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">AI Generated Script</Label>
                          <Button variant="ghost" size="sm" onClick={() => setScript("")}>Regenerate</Button>
                        </div>
                        <Textarea 
                          value={script} 
                          onChange={(e) => setScript(e.target.value)} 
                          className="min-h-[200px] font-mono text-sm border-foreground/20 bg-muted/5"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 2: Voice & Sound</CardTitle>
                    <CardDescription>Choose a voice for your video and set the background ambiance.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Select Voice</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {["Adam (Male - Deep)", "Bella (Female - Cheerful)", "Clone My Voice (Premium)"].map((voice, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-foreground/20 rounded-lg hover:border-primary cursor-pointer transition-colors bg-muted/5">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                  <Play className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{voice}</span>
                              </div>
                              {i === 2 && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Pro</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Background Audio</Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Music Style</Label>
                            <Select defaultValue="cinematic">
                              <SelectTrigger className="border-foreground/20 bg-muted/5">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cinematic">Cinematic</SelectItem>
                                <SelectItem value="documentary">Documentary</SelectItem>
                                <SelectItem value="instrumental">Instrumental</SelectItem>
                                <SelectItem value="lofi">Lo-Fi / Chill</SelectItem>
                                <SelectItem value="upbeat">Upbeat / Corporate</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-foreground/20 rounded-lg bg-muted/5">
                            <div className="flex items-center gap-2">
                              <Music className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Sound Effects</span>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full md:w-auto">
                      <FileAudio className="mr-2 h-4 w-4" />
                      Generate Voiceover
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 3: Visuals & Editing</CardTitle>
                    <CardDescription>Define the visual style and generate your video.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Stock Footage", desc: "Cinematic real-world clips", icon: Clapperboard },
                        { title: "Animated", desc: "2D vector explainer style", icon: PenTool },
                        { title: "AI Generated", desc: "AI Video model", icon: Bot },
                      ].map((style, i) => (
                        <div key={i} className="p-4 border border-foreground/20 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center space-y-2 bg-muted/5 flex flex-col items-center justify-center h-48">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                            <style.icon className="h-10 w-10 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg">{style.title}</h3>
                          <p className="text-sm text-muted-foreground">{style.desc}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-foreground/20 rounded-lg bg-muted/30">
                      <div className="space-y-0.5">
                        <Label className="text-base font-semibold">Dynamic Subtitles</Label>
                        <p className="text-sm text-muted-foreground">Automatically generate and overlay captions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 4: Thumbnail Design</CardTitle>
                    <CardDescription>Create an eye-catching thumbnail for your video.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Thumbnail Description</Label>
                      <div className="flex gap-2">
                        <Input placeholder="e.g., Man sitting in front of cash pile with a robot hand" className="border-foreground/20 bg-muted/5" />
                        <Button>Generate</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-video bg-muted rounded-lg border-2 border-transparent hover:border-primary cursor-pointer transition-all flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Step 5: Publish</CardTitle>
                    <CardDescription>Optimize your video for SEO and publish to YouTube.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Optimized Title</Label>
                        <Input defaultValue="The Future of YouTube: Faceless Channels Explained (2025)" className="border-foreground/20 bg-muted/5" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Description</Label>
                        <Textarea className="min-h-[100px] border-foreground/20 bg-muted/5" defaultValue="In this video, we explore the rising trend of faceless YouTube channels..." />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Tags</Label>
                        <Input defaultValue="#YouTube #AI #ContentCreation #2025" className="border-foreground/20 bg-muted/5" />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">YouTube Channel</Label>
                        <Select disabled>
                          <SelectTrigger className="border-foreground/20 bg-muted/5">
                            <SelectValue placeholder="Connect Account in Settings" />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Privacy Status</Label>
                        <Select defaultValue="private">
                          <SelectTrigger className="border-foreground/20 bg-muted/5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="unlisted">Unlisted</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button size="lg" className="w-full bg-[#FF0000] hover:bg-[#D90000] text-white border-none">
                      <Youtube className="mr-2 h-5 w-5" />
                      Publish to YouTube Now
                    </Button>

                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full bg-background hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                        onClick={() => setIsScheduling(!isScheduling)}
                      >
                        <CalendarClock className="mr-2 h-5 w-5" />
                        Schedule for later
                      </Button>

                      {isScheduling && (
                        <div className="p-4 border rounded-xl bg-muted/20 space-y-4 animate-in fade-in slide-in-from-top-2">
                          <div className="space-y-2">
                            <Label>Select Publication Time</Label>
                            <Input 
                              type="datetime-local" 
                              className="bg-background border-foreground/20"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                            />
                          </div>
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                            onClick={() => {
                              toast.success("Video scheduled successfully!");
                              navigate("/dashboard/videos");
                            }}
                          >
                            Submit Schedule
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {!isVideosPage && !isSettingsPage && !isPricingPage && !isBillingPage && (
            <div className="flex justify-between mt-8 pt-8 border-t">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              {currentStep < 5 && (
                <Button onClick={handleNextStep} disabled={currentStep === 1 && !script}>
                  Next Step
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          </>
          )}
        </div>
      </main>
    </div>
  );
}