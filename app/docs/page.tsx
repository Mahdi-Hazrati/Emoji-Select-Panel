"use client"
import { useState } from "react"

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative bg-gray-800 text-white rounded-lg p-4 my-6 text-sm font-mono">
      <pre>{code}</pre>
      <button
        className="absolute top-2 right-2 bg-gray-700 text-gray-300 hover:bg-gray-600 px-2 py-1 rounded-md"
        onClick={copyToClipboard}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}

const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900">
      <h1 className="text-4xl font-bold mb-8">📙 Emoji Select Panel Documentation</h1>

      <section className="mb-10">
        <p className="text-lg mb-4">
          The Emoji Select Panel is a high-performance, production-ready emoji panel component
          supporting emojis, GIFs, and stickers. It uses virtualized rendering for large datasets
          to ensure optimal performance.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>🚀 Virtualized rendering for large datasets</li>
          <li>🎨 Light/dark theme support</li>
          <li>📱 Responsive layout</li>
          <li>🔍 Search across all types</li>
          <li>🔄 Emoji, GIF, and sticker tabs</li>
          <li>💾 Persistent recently used emojis</li>
          <li>🧩 Fully customizable</li>
          <li>♿ Accessible</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📦 Installation</h2>
        <CodeBlock code={`npm install emoji-select-panel\n# or\nyarn add emoji-select-panel`} />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🚀 Basic Usage</h2>
        <CodeBlock
          code={`import { EmojiPanel } from 'emoji-select-panel'

function ChatInput() {
  const handleEmojiSelect = (item) => {
    console.log('Selected:', item.content || item.url)
  }

  return (
    <div className="chat-input">
      <textarea placeholder="Type a message..." />
      <EmojiPanel onSelect={handleEmojiSelect} />
    </div>
  )
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">⚙️ Advanced Usage</h2>
        <CodeBlock
          code={`<EmojiPanel
  lightTheme={true}
  width="380px"
  height={400}
  position="top"
  closeOnSelect={true}
  defaultMediaType="gif"
  defaultCategory="trending"
  persistRecent={true}
  storageKey="my-app-recent-emojis"
  trigger={<SmileIcon className="w-5 h-5 text-blue-500" />}
  onSelect={(item) => {
    if (item.type === 'emoji') {
      console.log('Selected emoji:', item.content)
    } else {
      console.log('Selected media:', item.url)
    }
  }}
/>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📘 Props API</h2>
        <p className="mb-4">Here are the available props:</p>
        <CodeBlock
          code={`onSelect: (item: MediaItem) => void
emojiData?: Record<string, string[]>
emojiCategories?: EmojiCategory[]
gifCategories?: GifCategory[]
stickerCategories?: StickerCategory[]
defaultMediaType?: "emoji" | "gif" | "sticker"
defaultCategory?: string
lightTheme?: boolean
height?: number
width?: number | string
position?: "top" | "bottom" | "left" | "right"
zIndex?: number
closeOnSelect?: boolean
fetchItems?: (type, category, query) => Promise<MediaItem[]>
showTabs?: boolean
showSearch?: boolean
showCategories?: boolean
className?: string
trigger?: ReactNode
defaultOpen?: boolean
persistRecent?: boolean
storageKey?: string`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🧠 Custom Data Integration</h2>
        <p className="mb-2">Use your own emoji or media data:</p>
        <CodeBlock
          code={`const myEmojiData = {
  recent: ["😀", "😁", "😂"],
  custom: ["🚀", "💻", "🔥", "✨"]
}

<EmojiPanel emojiData={myEmojiData} />`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🌍 Custom API Fetching</h2>
        <CodeBlock
          code={`const fetchFromMyApi = async (type, category, query) => {
  const res = await fetch(\`/api/media?type=\${type}&category=\${category}&q=\${query}\`)
  const data = await res.json()
  return data.map(item => ({
    id: item.id,
    content: item.type === 'emoji' ? item.unicode : undefined,
    url: item.type !== 'emoji' ? item.url : undefined,
    type: item.type,
    category: item.category
  }))
}

<EmojiPanel fetchItems={fetchFromMyApi} />`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🧠 Performance Tips</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Use pagination in custom fetchers</li>
          <li>Optimize GIF/sticker assets</li>
          <li>Search input is debounced automatically</li>
        </ul>
      </section>
    </div>
  )
}

export default DocsPage
