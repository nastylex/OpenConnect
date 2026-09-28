'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Globe2,
  Hash,
  Inbox,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  X,
} from 'lucide-react'

type Message = { id: number; author: string; handle: string; time: string; body: string; color: string; channel?: string }

const seedMessages: Message[] = [
  { id: 1, author: 'Maya Chen', handle: '@mayac', time: '2m', body: 'The sky over Singapore is doing that soft pink thing again. Sending a little of it your way.', color: 'bg-rose-300', channel: 'global' },
  { id: 2, author: 'Diego R.', handle: '@diegor', time: '5m', body: 'hello from a very rainy Bogotá. anyone else building something tonight?', color: 'bg-amber-300', channel: 'global' },
  { id: 3, author: 'aisha.codes', handle: '@aishacodes', time: '8m', body: 'Just shipped my first command. OpenConnect feels like a tiny internet in the terminal.', color: 'bg-cyan-300', channel: 'global' },
  { id: 4, author: 'Noah Williams', handle: '@noahw', time: '11m', body: 'Good morning from Bristol. Coffee is online, brain is still connecting.', color: 'bg-violet-300', channel: 'global' },
]

const channels = [
  { name: 'global', label: 'Everyone', count: 'live' },
  { name: 'lobby', label: 'Open lobby', count: '128' },
  { name: 'makers', label: 'Makers', count: '64' },
  { name: 'late-night', label: 'Late night', count: '23' },
]

export function OpenConnectShell() {
  const [activeChannel, setActiveChannel] = useState('global')
  const [messages, setMessages] = useState(seedMessages)
  const [draft, setDraft] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const visibleMessages = useMemo(() => messages.filter((message) => message.channel === activeChannel), [messages, activeChannel])

  function sendMessage() {
    const body = draft.trim()
    if (!body) return
    setMessages((current) => [...current, { id: Date.now(), author: 'You', handle: '@you', time: 'now', body, color: 'bg-emerald-300', channel: activeChannel }])
    setDraft('')
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="topbar">
        <div className="flex items-center gap-3">
          <button className="icon-button mobile-only" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={18} /></button>
          <div className="brand-mark"><Terminal size={17} strokeWidth={2.5} /></div>
          <span className="brand-name">OpenConnect</span>
          <span className="brand-version">v0.4.2</span>
        </div>
        <div className="topbar-center"><span className="status-dot" /> 4,812 people connected</div>
        <div className="flex items-center gap-2">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen((value) => !value)}><Search size={17} /></button>
          <button className="icon-button" aria-label="Notifications"><Bell size={17} /></button>
          <div className="avatar avatar-you">OC</div>
        </div>
      </header>

      {searchOpen && <div className="search-popover"><Search size={16} /><input autoFocus placeholder="Search messages, people, channels" aria-label="Search messages" /><kbd>ESC</kbd></div>}

      <div className="app-layout">
        <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
          <div className="sidebar-mobile-header"><span>Navigation</span><button className="icon-button" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button></div>
          <div className="workspace-switcher"><div className="workspace-icon">O</div><div className="min-w-0"><p className="workspace-name">OpenConnect</p><p className="workspace-sub">Personal space</p></div><ChevronDown size={15} className="ml-auto text-[var(--muted-foreground)]" /></div>
          <nav className="sidebar-nav" aria-label="Primary navigation">
            <button className="nav-item active"><Globe2 size={16} /> Global feed <span className="nav-pill">LIVE</span></button>
            <button className="nav-item"><Inbox size={16} /> Direct messages <span className="nav-count">3</span></button>
            <button className="nav-item"><Users size={16} /> People <span className="nav-count">12</span></button>
          </nav>
          <div className="sidebar-section"><div className="section-label"><span>Channels</span><button aria-label="Add channel"><Plus size={14} /></button></div>{channels.map((channel) => <button key={channel.name} onClick={() => { setActiveChannel(channel.name); setMobileNav(false) }} className={`channel-item ${activeChannel === channel.name ? 'selected' : ''}`}><Hash size={15} />{channel.label}<span className="channel-count">{channel.count}</span></button>)}</div>
          <div className="sidebar-footer"><button className="nav-item"><Settings2 size={16} /> Settings</button><div className="connection-note"><ShieldCheck size={15} /><span><strong>End-to-end by default</strong><small>Your messages stay yours.</small></span></div></div>
        </aside>

        <section className="content-area">
          <div className="content-header"><div><div className="eyebrow"><span className="live-pulse" /> PUBLIC CHANNEL</div><h1>#{activeChannel}</h1><p>{activeChannel === 'global' ? 'A shared room for every time zone.' : channels.find((channel) => channel.name === activeChannel)?.label}</p></div><button className="outline-button"><MoreHorizontal size={17} /> <span className="desktop-only">Channel details</span></button></div>
          <div className="feed-wrap">
            <div className="welcome-card"><div className="welcome-icon"><Sparkles size={18} /></div><div><h2>Welcome to the open network.</h2><p>Say something kind, curious, or useful. Every message adds a small signal to the world.</p></div></div>
            <div className="message-list" aria-live="polite">{visibleMessages.length ? visibleMessages.map((message) => <article className="message" key={message.id}><div className={`avatar ${message.color}`}>{message.author.slice(0, 1)}</div><div className="message-main"><div className="message-meta"><strong>{message.author}</strong><span>{message.handle}</span><span>·</span><time>{message.time}</time></div><p>{message.body}</p><button className="reply-button"><MessageCircle size={13} /> Reply</button></div></article>) : <div className="empty-state"><Hash size={24} /><p>No messages here yet.</p><span>Be the first to start the conversation.</span></div>}</div>
          </div>
          <div className="composer-wrap"><div className="composer"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); sendMessage() } }} placeholder={`Message #${activeChannel}`} aria-label={`Message ${activeChannel}`} rows={1} /><div className="composer-actions"><button className="icon-button" aria-label="Attach a file"><Paperclip size={16} /></button><span className="character-count">{draft.length}/280</span><button className="send-button" onClick={sendMessage} aria-label="Send message"><Send size={15} /></button></div></div><p className="composer-hint">Press <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for a new line</p></div>
        </section>

        <aside className="right-rail"><div className="rail-card"><div className="rail-title"><span>Network pulse</span><span className="live-label"><span className="status-dot" /> LIVE</span></div><div className="pulse-number">4,812 <span>online now</span></div><div className="pulse-bars" aria-label="Network activity visualization">{[40, 62, 46, 78, 55, 88, 68, 94, 72, 84, 58, 76, 96, 70, 88, 64, 80, 52, 70, 86].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="rail-stat"><span><span className="tiny-dot bg-emerald-400" /> 1,204 messages today</span><span>+18%</span></div></div><div className="rail-card"><div className="rail-title"><span>Across the world</span><Globe2 size={15} /></div><div className="region"><span className="region-name"><i className="region-dot bg-cyan-300" /> Americas</span><span>1,942</span></div><div className="region"><span className="region-name"><i className="region-dot bg-amber-300" /> Europe</span><span>1,486</span></div><div className="region"><span className="region-name"><i className="region-dot bg-violet-300" /> Asia + Pacific</span><span>1,384</span></div></div><div className="rail-card command-card"><div className="rail-title"><span>Quick start</span><Terminal size={15} /></div><p>Connect from your terminal and join the conversation anywhere.</p><code><span>$</span> npx openconnect</code><button className="copy-command">Copy command</button></div></aside>
      </div>
    </main>
  )
}

export default OpenConnectShell

EOF

