import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const listForRecipient = query({
  args: { recipient: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_recipient_createdAt", (q) => q.eq("recipient", args.recipient))
      .order("asc")
      .take(100)
    return messages
  },
})

export const ensureUser = mutation({
  args: { handle: v.string(), displayName: v.string(), location: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .unique()
    const now = Date.now()
    if (existing) {
      await ctx.db.patch(existing._id, { online: true, lastSeen: now })
      return existing._id
    }
    return await ctx.db.insert("users", { ...args, online: true, lastSeen: now })
  },
})

export const send = mutation({
  args: { sender: v.string(), recipient: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const body = args.body.trim()
    if (!body || body.length > 500) throw new Error("Message must be between 1 and 500 characters")
    return await ctx.db.insert("messages", { ...args, body, createdAt: Date.now() })
  },
})

export const seedLex = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("users").withIndex("by_handle", (q) => q.eq("handle", "lex")).unique()
    if (existing) return existing._id
    return await ctx.db.insert("users", { handle: "lex", displayName: "lex", location: "relay", online: true, lastSeen: Date.now() })
  },
})
