import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    handle: v.string(),
    displayName: v.string(),
    location: v.optional(v.string()),
    online: v.boolean(),
    lastSeen: v.number(),
  }).index("by_handle", ["handle"]),
  messages: defineTable({
    sender: v.string(),
    recipient: v.string(),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_recipient_createdAt", ["recipient", "createdAt"]),
})

