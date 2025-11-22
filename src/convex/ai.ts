"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const generateScript = action({
  args: { 
    topic: v.string(), 
    length: v.string(), 
    tone: v.string() 
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      // Fallback to mock if no key is configured to prevent crashing for other users
      // In a real app, you might want to throw an error:
      // throw new Error("OpenAI API Key not configured");
      console.warn("OpenAI API Key not found, returning mock response.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return `[Title: ${args.topic}]\n\n[INTRO]\nHost: Welcome back! Today we are talking about ${args.topic}. It's going to be ${args.tone}!\n\n[BODY]\n1. First point about ${args.topic}...\n2. Second point...\n3. Third point...\n\n[OUTRO]\nThanks for watching! Don't forget to subscribe.`;
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `
    You are a professional YouTube script writer.
    Create a detailed, structured video script for a video about "${args.topic}".
    
    Video Length: ${args.length}
    Tone: ${args.tone}
    
    The script should include:
    - A catchy Title
    - An engaging Intro (Hook)
    - Body paragraphs with key points (broken down by timestamps if possible)
    - A strong Outro (Call to Action)
    
    Format the output clearly with section headers.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that writes engaging YouTube scripts." },
          { role: "user", content: prompt }
        ],
      });

      return completion.choices[0].message.content || "Failed to generate script.";
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      throw new Error(`Failed to generate script: ${error.message}`);
    }
  },
});

export const generateVoiceover = action({
  args: { 
    text: v.string(), 
    voice: v.string() 
  },
  handler: async (ctx, args) => {
    // Example implementation with ElevenLabs:
    // const apiKey = process.env.ELEVENLABS_API_KEY;
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Return mock audio URL
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  },
});

export const generateThumbnail = action({
  args: { 
    prompt: v.string() 
  },
  handler: async (ctx, args) => {
    // Example implementation with DALL-E or Midjourney:
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Return mock image URLs
    return [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633218388467-539655d20a92?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop"
    ];
  },
});