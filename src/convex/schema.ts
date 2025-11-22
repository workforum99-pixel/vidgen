import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    projects: defineTable({
      userId: v.id("users"),
      title: v.string(),
      status: v.string(), // "draft", "generating", "completed", "published"
      step: v.number(), // 1-5
      
      // New Field for Template/Reference
      referenceVideoUrl: v.optional(v.string()),

      // Step 1 Data
      idea: v.optional(v.string()),
      script: v.optional(v.string()),
      videoLength: v.optional(v.string()),
      tone: v.optional(v.string()),
      keywords: v.optional(v.string()),

      // Step 2 Data
      voiceId: v.optional(v.string()),
      bgMusic: v.optional(v.string()),
      soundEffects: v.optional(v.boolean()),
      audioUrl: v.optional(v.string()),

      // Step 3 Data
      visualStyle: v.optional(v.string()),
      subtitles: v.optional(v.boolean()),
      videoUrl: v.optional(v.string()),

      // Step 4 Data
      thumbnailPrompt: v.optional(v.string()),
      thumbnailUrl: v.optional(v.string()),

      // Step 5 Data
      seoTitle: v.optional(v.string()),
      seoDescription: v.optional(v.string()),
      seoTags: v.optional(v.string()),
      youtubePrivacy: v.optional(v.string()),
      publishedUrl: v.optional(v.string()),
    }).index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;