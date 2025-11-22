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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const location = useLocation();
  const isVideosPage = location.pathname.includes("/videos");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [idea, setIdea] = useState("");
  const [script, setScript] = useState("");
  const [videoLength, setVideoLength] = useState("medium");
  const [tone, setTone] = useState("engaging");
  
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
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Idea & Script</CardTitle>
                    <CardDescription>Start by describing your video idea, and our AI will write the script for you.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="idea">Your Video Topic/Idea</Label>
                      <Textarea
                        id="idea"
                        placeholder="e.g., The rise of faceless YouTube channels in 2025"
                        className="min-h-[100px] text-lg"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Video Length</Label>
                        <Select value={videoLength} onValueChange={setVideoLength}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short (Under 1 min)</SelectItem>
                            <SelectItem value="medium">Medium (1-5 mins)</SelectItem>
                            <SelectItem value="long">Long (5+ mins)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informative">Informative</SelectItem>
                            <SelectItem value="engaging">Engaging</SelectItem>
                            <SelectItem value="funny">Funny</SelectItem>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Keywords (Optional)</Label>
                        <Input placeholder="AI, Tech, Future" />
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
                          <Label>AI Generated Script</Label>
                          <Button variant="ghost" size="sm" onClick={() => setScript("")}>Regenerate</Button>
                        </div>
                        <Textarea 
                          value={script} 
                          onChange={(e) => setScript(e.target.value)} 
                          className="min-h-[200px] font-mono text-sm"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Voice & Sound</CardTitle>
                    <CardDescription>Choose a voice for your video and set the background ambiance.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label>Select Voice</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {["Adam (Male - Deep)", "Bella (Female - Cheerful)", "Clone My Voice (Premium)"].map((voice, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
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
                        <Label>Background Audio</Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Music Style</Label>
                            <Select defaultValue="cinematic">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cinematic">Cinematic</SelectItem>
                                <SelectItem value="lofi">Lo-Fi / Chill</SelectItem>
                                <SelectItem value="upbeat">Upbeat / Corporate</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Visuals & Editing</CardTitle>
                    <CardDescription>Define the visual style and generate your video.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Stock Footage", desc: "Cinematic real-world clips" },
                        { title: "Animated", desc: "2D vector explainer style" },
                        { title: "Minimal", desc: "Clean text & icons" },
                      ].map((style, i) => (
                        <div key={i} className="p-4 border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center space-y-2">
                          <div className="h-24 bg-muted rounded-lg mb-2 w-full" />
                          <h3 className="font-semibold">{style.title}</h3>
                          <p className="text-xs text-muted-foreground">{style.desc}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div className="space-y-0.5">
                        <Label className="text-base">Dynamic Subtitles</Label>
                        <p className="text-sm text-muted-foreground">Automatically generate and overlay captions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white font-medium">Preview not generated yet</p>
                      </div>
                      <Button variant="secondary" size="lg" className="z-10">
                        <Play className="mr-2 h-5 w-5" />
                        Generate Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 4: Thumbnail Design</CardTitle>
                    <CardDescription>Create an eye-catching thumbnail for your video.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Thumbnail Description</Label>
                      <div className="flex gap-2">
                        <Input placeholder="e.g., Man sitting in front of cash pile with a robot hand" />
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
                <Card>
                  <CardHeader>
                    <CardTitle>Step 5: Publish</CardTitle>
                    <CardDescription>Optimize your video for SEO and publish to YouTube.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Optimized Title</Label>
                        <Input defaultValue="The Future of YouTube: Faceless Channels Explained (2025)" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea className="min-h-[100px]" defaultValue="In this video, we explore the rising trend of faceless YouTube channels..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <Input defaultValue="#YouTube #AI #ContentCreation #2025" />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>YouTube Channel</Label>
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Connect Account in Settings" />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Privacy Status</Label>
                        <Select defaultValue="private">
                          <SelectTrigger>
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
          {!isVideosPage && (
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