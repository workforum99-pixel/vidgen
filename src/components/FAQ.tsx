import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageCircle, Users, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqData = [
  {
    id: 1,
    category: "Billing & Credits",
    question: "What exactly is a \"Video Credit\"?",
    answer: "One Video Credit equals 1.2 minutes of generated video. For example, if you create a 2.4-minute video, it will consume 2 credits. Credits reset every month."
  },
  {
    id: 2,
    category: "Billing & Credits",
    question: "Do unused credits roll over to the next month?",
    answer: "No, credits do not roll over on the Individual and Creator plans. However, Enterprise plans include a 3-month rollover window for unused credits."
  },
  {
    id: 3,
    category: "Billing & Credits",
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes! You can switch plans instantly from your dashboard. Upgrades happen immediately (prorated), while downgrades take effect at the end of your current billing cycle."
  },
  {
    id: 4,
    category: "Copyright & Rights",
    question: "Is the content monetizable on YouTube?",
    answer: "Absolutely. You own 100% of the commercial rights to the videos you generate. Our stock footage and AI voices are fully licensed for YouTube monetization."
  },
  {
    id: 5,
    category: "Copyright & Rights",
    question: "Will I get copyright strikes for the music?",
    answer: "No. VidGen AI integrates with royalty-free music libraries. We automatically generate a license key for every video you export, which you can paste into your YouTube video description if needed."
  },
  {
    id: 6,
    category: "Features & Tech",
    question: "How does the AI Voice Cloning work?",
    answer: "You upload a 30-second sample of your voice (or a voice actor's). Our AI analyzes the tone and cadence to create a digital replica. This feature is available on the \"Creators\" plan and above."
  },
  {
    id: 7,
    category: "Features & Tech",
    question: "Can I edit the video after the AI generates it?",
    answer: "Yes. You get full access to our timeline editor to swap clips, change subtitles, adjust timing, or regenerate specific scenes before exporting."
  }
];

const categories = ["All", "Billing & Credits", "Copyright & Rights", "Features & Tech"];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 px-4">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about automating your channel.</p>
        </div>
        
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-12 h-14 text-lg bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary rounded-xl shadow-sm"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        <AnimatePresence mode="wait">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer",
                    openQuestionId === faq.id
                      ? "bg-card border-primary/50 shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                      : "bg-card/50 border-border hover:border-primary/30"
                  )}
                  onClick={() => setOpenQuestionId(openQuestionId === faq.id ? null : faq.id)}
                >
                  <div className="p-6 flex items-start justify-between gap-4">
                    <h3 className={cn(
                      "text-lg font-medium transition-colors",
                      openQuestionId === faq.id ? "text-primary" : "text-foreground"
                    )}>
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 mt-1",
                        openQuestionId === faq.id && "rotate-180 text-primary"
                      )} 
                    />
                  </div>
                  <AnimatePresence>
                    {openQuestionId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No results found for "{searchQuery}"</p>
              <p className="text-sm">Try adjusting your search or browse categories.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Footer */}
      <div className="max-w-2xl mx-auto mt-20 px-4 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Still stuck?</h2>
          <p className="text-muted-foreground">Can't find what you're looking for?</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat with Support
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <Users className="h-4 w-4" />
            Join our Discord Community
          </Button>
        </div>
      </div>
    </div>
  );
}
