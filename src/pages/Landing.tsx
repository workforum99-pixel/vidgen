import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, CheckCircle, Play, Sparkles, Video } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">VidGen AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary-foreground border-secondary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>AI-Powered Video Creation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Turn Ideas into <span className="text-primary">Viral Videos</span> in Minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              The all-in-one platform to generate scripts, voiceovers, visuals, and thumbnails automatically. 
              Perfect for creators, marketers, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/auth">
                <Button size="lg" className="h-12 px-8 text-lg">
                  Start Creating for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero Image / Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="aspect-video rounded-xl border bg-card shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="h-10 w-10 text-primary ml-1" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">See how it works</p>
                </div>
              </div>
              {/* Mock UI Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t flex items-center px-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-2 w-24 bg-primary rounded-full" />
                    <div className="h-2 w-12 bg-muted rounded-full" />
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-muted" />
                    <div className="h-8 w-8 rounded bg-muted" />
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: BrainCircuit, title: "AI Script Writing", desc: "Generate engaging scripts from a single topic or keyword instantly." },
                    { icon: Video, title: "Auto-Visuals", desc: "Automatically match stock footage and animations to your script." },
                    { icon: CheckCircle, title: "One-Click Publish", desc: "Seamlessly upload to YouTube with optimized titles and tags." }
                ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
            <p>&copy; 2024 VidGen AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}