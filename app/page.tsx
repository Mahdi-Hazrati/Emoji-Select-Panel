"use client"

import EmojiPanel from "@/components/emoji-panel"
import UseCase from "@/components/UseCase"
import { Smile, Rocket, Settings, Search, Image, Star } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Telegram-Style Emoji Panel
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A high-performance emoji, GIF, and sticker panel built for modern UIs. Fully customizable, blazing fast, and accessible — ready for your chat apps, editors, and more.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://www.npmjs.com/package/emoji-select-panel"
            target="_blank"
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            📦 Install via NPM
          </a>
        </div>
      </section>
      {/* Real-World Use Case */}
      <UseCase />

      {/* NPM Install Command */}
      <section className="bg-white py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Install</h2>
          <pre className="bg-gray-900 text-white text-sm p-4 rounded-lg overflow-x-auto">
            <code>npm install emoji-select-panel</code>
          </pre>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: <Rocket />, title: "Blazing Fast", desc: "Virtualized rendering to handle thousands of items without a sweat." },
          { icon: <Smile />, title: "Multiple Media Types", desc: "Supports emojis, GIFs, and animated stickers seamlessly." },
          { icon: <Settings />, title: "Highly Customizable", desc: "Full props API to style, theme, position, and control behavior." },
          { icon: <Search />, title: "Smart Search", desc: "Search across all media types with built-in debounced input." },
          { icon: <Image />, title: "Themed & Responsive", desc: "Works in both light/dark themes and across all screen sizes." },
          { icon: <Star />, title: "Recently Used Memory", desc: "Built-in localStorage support for remembering frequently used items." },
        ].map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-2 bg-blue-50 rounded-md text-blue-500">{f.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Live Demos */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-2xl font-bold text-center mb-6">Live Examples</h2>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Light Theme Example</h3>
            <EmojiPanel lightTheme={true} onSelect={(item) => console.log("Selected:", item)} />
          </div>

          <div className="bg-[#17212b] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-white">Dark Theme Example</h3>
            <EmojiPanel onSelect={(item) => console.log("Selected:", item)} />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Custom Trigger Example</h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Click to open: </span>
              <EmojiPanel
                lightTheme={true}
                trigger={
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Open Emojis
                  </button>
                }
                onSelect={(item) => console.log("Selected:", item)}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="text-center py-10 border-t mt-auto text-sm text-gray-500">
        Another OSS project by{" "}
        <a href="https://mahdi.is-a.dev" className="text-blue-500 hover:underline">
          Mahdi Hazrati
        </a>{" "}
        — 2025
      </footer>
    </main>
  )
}
