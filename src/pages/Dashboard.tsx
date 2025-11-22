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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const isVideosPage = location.pathname.includes("/videos");
  const isTemplatesPage = location.pathname.includes("/templates");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [idea, setIdea] = useState("");
  const [script, setScript] = useState("");
  const [videoLength, setVideoLength] = useState("medium");
  const [isCustomLength, setIsCustomLength] = useState(false);
  const [tone, setTone] = useState("engaging");

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

  // Template Page Logic
  const [templateUrl, setTemplateUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeTemplate = async () => {
    if (!templateUrl) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    navigate("/dashboard", { state: { referenceUrl: templateUrl } });
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
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-8">My Videos</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-muted relative group cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Play className="h-12 w-12 text-white fill-white" />
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Untitled Video {i}</CardTitle>
                      <CardDescription>Generated 2 days ago</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ) : isTemplatesPage ? (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-8 space-y-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                  Create from Reference
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Paste a YouTube video link, and our AI will analyze its pacing, tone, and style to create a similar video for you.
                </p>
              </div>

              <Card className="border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary" />
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Youtube className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Import Style from YouTube</CardTitle>
                  <CardDescription>
                    We'll extract the "scent" of the video to match your new creation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-base">YouTube Video URL</Label>
                    <div className="relative">
                      <Youtube className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="url" 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        className="pl-10 h-12 text-lg"
                        value={templateUrl}
                        onChange={(e) => setTemplateUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      What we analyze:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: Mic, label: "Voice & Tone", desc: "Pacing, emotion, and delivery style" },
                        { icon: Film, label: "Visual Pacing", desc: "Cut frequency and transition types" },
                        { icon: Music, label: "Audio Vibe", desc: "Background music and sound design" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-3 bg-background rounded-lg border shadow-sm">
                          <item.icon className="w-6 h-6 text-primary mb-2" />
                          <span className="font-medium text-sm">{item.label}</span>
                          <span className="text-xs text-muted-foreground mt-1">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20"
                    onClick={handleAnalyzeTemplate}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Video Style...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Analyze & Create Project
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
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
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {!isVideosPage && !isTemplatesPage && (
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