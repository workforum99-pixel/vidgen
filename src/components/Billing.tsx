import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, HelpCircle, Sparkles, Zap, Crown, Building2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Billing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Individual",
      description: "For beginners testing the waters.",
      price: isYearly ? 7 : 9, // ~20% off
      credits: 9,
      channels: 1,
      features: [
        "AI Script Generation",
        "Basic Neural Voiceovers",
        "Standard Video Editing",
        "1 YouTube Channel",
        "720p Export Quality"
      ],
      icon: Zap,
      color: "text-blue-500",
      popular: false
    },
    {
      name: "Creators",
      description: "For serious YouTubers.",
      price: isYearly ? 24 : 29,
      credits: 50,
      channels: 5,
      features: [
        "Everything in Individual",
        "Advanced Voice Cloning",
        "Auto-B-Roll Matching",
        "1080p HD Export",
        "Priority Rendering Queue",
        "Multi-Channel Analytics"
      ],
      icon: Crown,
      color: "text-primary",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For agencies and automation empires.",
      price: isYearly ? 79 : 99,
      credits: 200,
      channels: 15,
      features: [
        "Everything in Creators",
        "4K Ultra HD Export",
        "Team Collaboration Seats",
        "Dedicated Account Support",
        "API Access",
        "Custom Brand Templates"
      ],
      icon: Building2,
      color: "text-purple-500",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What counts as a credit?",
      answer: "One credit equals approximately 1.2 minutes of generated video content. Credits are deducted only when you finalize and export a video."
    },
    {
      question: "Can I rollover unused credits?",
      answer: "Yes, unused credits on the Creator and Enterprise plans rollover for up to 3 months. Individual plan credits reset monthly."
    },
    {
      question: "How does the AI voice cloning work?",
      answer: "You can upload a 30-second sample of your voice (or a target voice you have rights to). Our AI analyzes the tone, pitch, and cadence to create a custom text-to-speech model available instantly."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Absolutely. Changes to your plan take effect immediately. Upgrades are prorated, and downgrades apply at the start of the next billing cycle."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
          Scale Your Content Creation with AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your growth. From solo creators to media empires.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>
            Monthly
          </span>
          <Switch 
            checked={isYearly} 
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>
            Yearly <span className="text-xs text-green-500 font-bold ml-1">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={cn(
              "relative rounded-2xl border bg-card p-8 shadow-lg transition-all duration-300 flex flex-col",
              plan.popular ? "border-primary shadow-primary/20 ring-1 ring-primary/50 scale-105 z-10" : "border-border hover:border-primary/50"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-600 border-none px-4 py-1 text-sm shadow-lg">
                  MOST POPULAR
                </Badge>
              </div>
            )}

            <div className="mb-6 space-y-2">
              <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${plan.color}`}>
                <plan.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Billed {isYearly ? "yearly" : "monthly"}
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{plan.credits} Video Credits / mo</span>
              </div>
              <div className="text-xs text-muted-foreground pl-6 -mt-2 mb-4">
                1 Credit ≈ 1.2 min video
              </div>
              
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              className={cn(
                "w-full font-semibold shadow-lg transition-all",
                plan.popular 
                  ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Choose {plan.name}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Compare Features</h2>
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40%]">Feature</TableHead>
                <TableHead className="text-center">Individual</TableHead>
                <TableHead className="text-center text-primary font-bold">Creators</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "End-to-End Automation", i: true, c: true, e: true },
                { name: "AI Script Writer", i: true, c: true, e: true },
                { name: "Copyright Check", i: false, c: true, e: true },
                { name: "Auto-Thumbnail Generator", i: "Basic", c: "Advanced", e: "Premium" },
                { name: "Channel Management", i: "1 Channel", c: "5 Channels", e: "15 Channels" },
                { name: "Export Quality", i: "720p", c: "1080p", e: "4K Ultra HD" },
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof row.i === 'boolean' ? (row.i ? <Check className="h-4 w-4 mx-auto text-green-500" /> : <span className="text-muted-foreground">-</span>) : row.i}
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    {typeof row.c === 'boolean' ? (row.c ? <Check className="h-4 w-4 mx-auto text-green-500" /> : <span className="text-muted-foreground">-</span>) : row.c}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof row.e === 'boolean' ? (row.e ? <Check className="h-4 w-4 mx-auto text-green-500" /> : <span className="text-muted-foreground">-</span>) : row.e}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
