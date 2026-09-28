'use client'

import { useState } from 'react'
import { ChevronRight, Copy, Globe2, HelpCircle, Minus, Square, Terminal, Wifi } from 'lucide-react'

const initialLines = [
  { type: 'muted', text: 'OpenConnect v0.4.2 · secure text messaging for everyone' },
  { type: 'success', text: 'Connected to the global relay · 4,812 people online' },
  { type: 'blank', text: '' },
  { type: 'system', text: 'You joined #global' },
  { type: 'message', text: 'maya.chen  Singapore  ·  2m' },
  { type: 'body', text: 'The sky over Singapore is doing that soft pink thing again.' },
  { type: 'message', text: 'diego.r  Bogotá  ·  5m' },
  { type: 'body', text: 'hello from a very rainy Bogotá. anyone else building tonight?' },
  { type: 'message', text: 'aisha.codes  Lagos  ·  8m' },
  { type: 'body', text: 'OpenConnect feels like a tiny internet in the terminal.' },
]

export default function OpenConnectTerminal() {
  const [lines, setLines] = useState(initialLines)
  const [input, setInput] = useState('')

  function runCommand(command: string) {
    const clean = command.trim()
    if (!clean) return
    const next = [...lines, { type: 'prompt', text: `you@openconnect:~$ ${clean}` }]
    if (clean === 'help') next.push({ type: 'body', text: 'connect <name> · join <channel> · send <message> · who · clear · exit' })
    else if (clean === 'who') next.push({ type: 'body', text: '4,812 people online across 96 countries' })
    else if (clean === 'clear') setLines([])
    else if (clean.startsWith('send ')) next.push({ type: 'body', text: `message sent to #global: ${clean.slice(5)}` })
    else if (clean.startsWith('join ')) next.push({ type: 'system', text: `You joined ${clean.slice(5)}` })
    else next.push({ type: 'error', text: `command not found: ${clean}. Try 'help'.` })
    setLines(next)
    setInput('')
  }

  return (
    <main className="terminal-page">
      <header className="terminal-nav"><div className="terminal-brand"><span className="terminal-logo"><Terminal size={18} /></span><strong>OpenConnect</strong><span className="terminal-tag">CLI MESSAGING FOR EVERYONE</span></div><div className="terminal-links"><a href="#commands">Commands</a><a href="#protocol">Protocol</a><a href="#install">Install</a><button className="nav-install" onClick={() => navigator.clipboard?.writeText('npm install -g openconnect')}>Copy install</button></div></header>
      <section className="terminal-hero"><div className="hero-copy"><div className="hero-kicker"><span /> AN OPEN NETWORK IN YOUR TERMINAL</div><h1>Send a signal.<br /><em>Find someone.</em></h1><p>OpenConnect is a text-only command line for talking to anyone, anywhere. No feeds. No noise. Just people and words.</p><div className="hero-actions"><button className="primary-terminal-button" onClick={() => navigator.clipboard?.writeText('npm install -g openconnect')}><span>$</span> npm install -g openconnect</button><button className="ghost-terminal-button" onClick={() => document.getElementById('commands')?.scrollIntoView({ behavior: 'smooth' })}>Read the protocol <ChevronRight size={15} /></button></div><div className="hero-meta"><span><Wifi size={13} /> relay online</span><span><Globe2 size={13} /> 96 countries</span><span><Terminal size={13} /> text only</span></div></div><div className="terminal-window" aria-label="OpenConnect terminal demo"><div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>openconnect — zsh</span><div className="window-controls"><Minus size={13} /><Square size={11} /></div></div><div className="terminal-output">{lines.map((line, index) => <div key={`${line.text}-${index}`} className={`term-line ${line.type}`}>{line.text}</div>)}<div className="term-prompt"><span>you@openconnect:~$</span><input autoFocus value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) runCommand(input) }} aria-label="Terminal command" /></div></div></div></section>
      <section className="terminal-stats"><div><strong>04</strong><span>commands to connect</span></div><div><strong>∞</strong><span>open conversations</span></div><div><strong>00</strong><span>algorithms deciding for you</span></div><div><strong>01</strong><span>global text protocol</span></div></section>
      <section className="protocol-section" id="commands"><div className="section-intro"><div className="hero-kicker"><span /> THE SMALL COMMAND SET</div><h2>Everything you need.<br />Nothing you don&apos;t.</h2><p>OpenConnect stays out of the way. The terminal is the interface, the network is the room, and your words are the product.</p></div><div className="command-list"><article><code>connect &lt;name&gt;</code><p>Create your identity and connect to the open network.</p></article><article><code>join &lt;channel&gt;</code><p>Enter a public room. Start with <strong>#global</strong>.</p></article><article><code>send &lt;message&gt;</code><p>Send a thought to everyone in the room, instantly.</p></article><article><code>who</code><p>See the people and places currently online.</p></article></div></section>
      <section className="install-section" id="install"><div><div className="hero-kicker"><span /> START HERE</div><h2>One command<br />to open the world.</h2></div><div className="install-box"><div><span>$</span> npm install -g openconnect</div><button aria-label="Copy install command" onClick={() => navigator.clipboard?.writeText('npm install -g openconnect')}><Copy size={15} /> copy</button></div></section>
      <footer><span><Terminal size={14} /> OpenConnect / 2026</span><span>Built for people who still type</span><span><HelpCircle size={14} /> open protocol</span></footer>
    </main>
  )
}
