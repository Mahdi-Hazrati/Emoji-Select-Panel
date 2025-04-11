"use client"
import EmojiPanel from "@/components/emoji-panel"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center">Telegram Emoji Panel</h1>
        <p>A high-performance, production-ready emoji panel component that supports emojis, GIFs, and animated stickers with virtualized rendering for optimal performance.</p>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Light Theme Example</h2>
          <EmojiPanel lightTheme={true} onSelect={(item) => console.log("Selected:", item)} />
        </div>

        <div className="bg-[#17212b] p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4 text-white">Dark Theme Example</h2>
          <EmojiPanel onSelect={(item) => console.log("Selected:", item)} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Custom Trigger Example</h2>
          <div className="flex items-center gap-2">
            <span>Click to open: </span>
            <EmojiPanel
              lightTheme={true}
              trigger={<button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Emojis</button>}
              onSelect={(item) => console.log("Selected:", item)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
