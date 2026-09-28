'use client'

import { ConvexReactClient } from 'convex/react'
import { ConvexProvider } from 'convex/react'
import type { ReactNode } from 'react'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const client = convexUrl ? new ConvexReactClient(convexUrl) : null

export default function ConvexProviderWrapper({ children }: { children: ReactNode }) {
  if (!client) return children
  return <ConvexProvider client={client}>{children}</ConvexProvider>
}
