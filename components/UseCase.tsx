import { useState } from "react"
import EmojiPanel from "@/components/emoji-panel"

export default function UseCase() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, trimmed])
    setInput("") // Clear the input field after sending a message
  }

  const handleEmojiSelect = (item: any) => {
    // Handle emoji selection from the emoji panel
    const selectedEmoji = item.content || item.url || ""
    if (selectedEmoji) {
      setInput((prev) => prev + selectedEmoji) // Append the emoji to the input field
    }
  }

  return (
    <section className="py-20 bg-gray-100 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Real-World Use Case: Chat UI
        </h2>
        <p className="text-gray-600 text-center mb-8">
          This example demonstrates how the emoji panel can be integrated into a real-time chat interface. Select emojis and send messages just like a modern messaging app.
        </p>

        <div className="bg-white rounded-lg shadow-md">
          <div className="h-64 overflow-y-auto p-4 space-y-2 border-b">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-20">
                No messages yet
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 px-3 py-2 rounded-md w-fit max-w-[80%] text-sm"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          <div className="relative flex items-center p-4 gap-2">

            {/* Emoji Panel */}
              <EmojiPanel
                onSelect={handleEmojiSelect}
                lightTheme={true}
                width="380px"
                height={200}
                position="top"
                persistRecent={true}
                storageKey="my-app-recent-emojis"
                trigger={<span className="select-none cursor-pointer">😊</span>} // Optionally use a custom icon as the trigger
              />
            
            {/* Input Field */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-full border outline-none text-sm"
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
