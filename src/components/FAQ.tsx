import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FAQ() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about VidGen AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Questions</CardTitle>
          <CardDescription>Everything you need to know about the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a video?</AccordionTrigger>
              <AccordionContent>
                Click on "New Video" in the sidebar to start the 5-step wizard. You can begin with a simple topic idea, and our AI will generate the script, voiceover, visuals, and thumbnail for you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I use my own voice?</AccordionTrigger>
              <AccordionContent>
                Yes! In the "Voice & Sound" step (Step 2), you can choose to clone your voice by uploading a sample, or select from our library of premium AI voices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How are credits calculated?</AccordionTrigger>
              <AccordionContent>
                One credit equals approximately 1.2 minutes of generated video content. Credits are deducted only when you finalize and export a video. Drafts do not consume credits.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Is the content copyright-free?</AccordionTrigger>
              <AccordionContent>
                Yes, all generated content, including background music, stock footage, and AI-generated visuals, is licensed for commercial use on platforms like YouTube, TikTok, and Instagram.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I edit the video after generation?</AccordionTrigger>
              <AccordionContent>
                Absolutely. You can regenerate specific scenes, change the voiceover, edit the script, or swap out visuals before the final export.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing & Support</CardTitle>
          <CardDescription>Manage your subscription and account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-billing-1">
              <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time from the "Billing" tab. Your credits will remain valid until the end of your current billing cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-billing-2">
              <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                We offer a 7-day money-back guarantee if you haven't used more than 5 credits. Contact support for assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
