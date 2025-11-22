import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const projectId = await ctx.db.insert("projects", {
      userId,
      title: args.title,
      status: "draft",
      step: 1,
    });

    return projectId;
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== userId) return null;

    return project;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    patch: v.any(), // Using any for flexibility in this rapid prototype, but should be strict in prod
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, args.patch);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
