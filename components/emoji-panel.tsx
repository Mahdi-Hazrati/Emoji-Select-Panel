"use client"

import type React from "react"

import { useState, useEffect, useRef, forwardRef } from "react"
import { useVirtualizer } from "@/hooks/use-virtualizer"
import {
  Search,
  Clock,
  Smile,
  ImageIcon,
  Sticker,
  Car,
  Flag,
  FishIcon as Food,
  Activity,
  FilesIcon as Objects,
  Heart,
  X,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { EmojiCategory, GifCategory, StickerCategory } from "@/types/media-types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { defaultEmojiData } from "@/lib/constants"

// Types for our media items
type MediaType = "emoji" | "gif" | "sticker"
type MediaItem = {
  id: string
  url?: string
  content?: string
  type: MediaType
  category: string
}



// Default category definitions
const defaultEmojiCategories: EmojiCategory[] = [
  { id: "recent", name: "Recent", icon: Clock },
  { id: "smileys", name: "Smileys & People", icon: Smile },
  { id: "animals", name: "Animals & Nature", icon: Car },
  { id: "food", name: "Food & Drink", icon: Food },
  { id: "activities", name: "Activities", icon: Activity },
  { id: "travel", name: "Travel & Places", icon: Flag },
  { id: "objects", name: "Objects", icon: Objects },
  { id: "symbols", name: "Symbols", icon: Heart },
]

const defaultGifCategories: GifCategory[] = [
  { id: "trending", name: "Trending" },
  { id: "reactions", name: "Reactions" },
  { id: "entertainment", name: "Entertainment" },
  { id: "sports", name: "Sports" },
  { id: "memes", name: "Memes" },
]

const defaultStickerCategories: StickerCategory[] = [
  { id: "recent", name: "Recent" },
  { id: "popular", name: "Popular" },
  { id: "animated", name: "Animated" },
  { id: "cute", name: "Cute" },
  { id: "funny", name: "Funny" },
]

// Mock data service - in production this would fetch from an API
const fetchMediaItems = async (
  type: MediaType,
  category: string,
  searchQuery = "",
  emojiData = defaultEmojiData,
): Promise<MediaItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // This would be replaced with actual API calls in production
  if (type === "emoji") {
    return (emojiData[category as keyof typeof emojiData] || [])
      .map((emoji, index) => ({
        id: `emoji-${category}-${index}`,
        content: emoji,
        type: "emoji",
        category,
      }))
      .filter((item) => !searchQuery || item.content?.includes(searchQuery))
  } else if (type === "gif") {
    return Array(30)
      .fill(null)
      .map((_, index) => ({
        id: `gif-${category}-${index}`,
        url: `/placeholder.svg?height=120&width=120&text=GIF ${index + 1}`,
        type: "gif",
        category,
      }))
  } else {
    return Array(30)
      .fill(null)
      .map((_, index) => ({
        id: `sticker-${category}-${index}`,
        url: `/placeholder.svg?height=120&width=120&text=Sticker ${index + 1}`,
        type: "sticker",
        category,
      }))
  }
}

export interface EmojiPanelProps {
  /** Function called when an emoji, GIF, or sticker is selected */
  onSelect?: (item: MediaItem) => void
  /** Custom emoji data to use instead of the default */
  emojiData?: Record<string, string[]>
  /** Custom emoji categories */
  emojiCategories?: EmojiCategory[]
  /** Custom GIF categories */
  gifCategories?: GifCategory[]
  /** Custom sticker categories */
  stickerCategories?: StickerCategory[]
  /** Initial media type to display */
  defaultMediaType?: MediaType
  /** Initial category to display */
  defaultCategory?: string
  /** Whether to use light theme instead of dark */
  lightTheme?: boolean
  /** Custom height for the panel */
  height?: number
  /** Custom width for the panel */
  width?: number | string
  /** Custom position for the panel */
  position?: "top" | "bottom" | "left" | "right"
  /** Custom z-index for the panel */
  zIndex?: number
  /** Whether to close the panel after selection */
  closeOnSelect?: boolean
  /** Custom fetch function for media items */
  fetchItems?: (type: MediaType, category: string, searchQuery: string) => Promise<MediaItem[]>
  /** Whether to show the tabs */
  showTabs?: boolean
  /** Whether to show the search input */
  showSearch?: boolean
  /** Whether to show the categories */
  showCategories?: boolean
  /** Custom class name for the panel */
  className?: string
  /** Custom trigger element */
  trigger?: React.ReactNode
  /** Whether the panel is initially open */
  defaultOpen?: boolean
  /** Whether to store recent emojis in localStorage */
  persistRecent?: boolean
  /** Storage key for recent emojis */
  storageKey?: string
}

const EmojiPanel = forwardRef<HTMLDivElement, EmojiPanelProps>(
  (
    {
      onSelect,
      emojiData = defaultEmojiData,
      emojiCategories = defaultEmojiCategories,
      gifCategories = defaultGifCategories,
      stickerCategories = defaultStickerCategories,
      defaultMediaType = "emoji",
      defaultCategory = "recent",
      lightTheme = false,
      height = 350,
      width = "320px",
      position = "bottom",
      zIndex = 50,
      closeOnSelect = false,
      fetchItems,
      showTabs = true,
      showSearch = true,
      showCategories = true,
      className,
      trigger,
      defaultOpen = false,
      persistRecent = true,
      storageKey = "telegram-recent-emojis",
    },
    ref,
  ) => {
    // State
    const [activeTab, setActiveTab] = useState<MediaType>(defaultMediaType)
    const [activeCategory, setActiveCategory] = useState<string>(defaultCategory)
    const [searchQuery, setSearchQuery] = useState("")
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [recentEmojis, setRecentEmojis] = useState<string[]>(emojiData.recent || [])
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Refs
    const panelRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const combinedRef = (node: HTMLDivElement) => {
      panelRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    // Responsive handling
    const isMobile = useMediaQuery("(max-width: 640px)")
    const itemsPerRow = isMobile ? 6 : 8

    // Theme variables
    const theme = {
      bg: lightTheme ? "bg-white" : "bg-[#1e2c3a]",
      border: lightTheme ? "border-gray-200" : "border-[#2b5278]",
      input: lightTheme ? "bg-gray-100" : "bg-[#17212b]",
      text: lightTheme ? "text-gray-900" : "text-white",
      textMuted: lightTheme ? "text-gray-500" : "text-gray-400",
      accent: lightTheme ? "bg-blue-100 text-blue-600" : "bg-[#2b5278] text-[#64aaed]",
      hover: lightTheme ? "hover:bg-gray-100" : "hover:bg-[#2b5278]",
      button: lightTheme ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-[#2b5278] hover:bg-[#3a6d9e] text-white",
      activeTab: lightTheme ? "text-blue-600 border-blue-600" : "text-[#64aaed] border-[#64aaed]",
      activeCategory: lightTheme ? "bg-blue-100 text-blue-600" : "bg-[#2b5278] text-white",
    }

    // Get current categories based on active tab
    const getCurrentCategories = () => {
      switch (activeTab) {
        case "emoji":
          return emojiCategories
        case "gif":
          return gifCategories
        case "sticker":
          return stickerCategories
        default:
          return emojiCategories
      }
    }

    // Load media items when tab, category or search changes
    useEffect(() => {
      const loadMediaItems = async () => {
        setIsLoading(true)
        try {
          if (fetchItems) {
            const items = await fetchItems(activeTab, activeCategory, searchQuery)
            setMediaItems(items)
          } else {
            const items = await fetchMediaItems(activeTab, activeCategory, searchQuery, emojiData)
            setMediaItems(items)
          }
        } catch (error) {
          console.error("Error loading media items:", error)
          // In production, implement proper error handling and user feedback
        } finally {
          setIsLoading(false)
        }
      }

      loadMediaItems()
    }, [activeTab, activeCategory, searchQuery, emojiData, fetchItems])

    // Handle media item selection
    const handleItemSelect = (item: MediaItem) => {
      // For emojis, update recent list
      if (item.type === "emoji" && item.content) {
        const updatedRecent = [item.content, ...recentEmojis.filter((emoji) => emoji !== item.content)].slice(0, 20)
        setRecentEmojis(updatedRecent)

        // Save to localStorage if enabled
        if (persistRecent) {
          localStorage.setItem(storageKey, JSON.stringify(updatedRecent))
        }
      }

      // Call onSelect callback
      onSelect?.(item)

      // Close panel if closeOnSelect is true
      if (closeOnSelect) {
        setIsOpen(false)
      }
    }

    // Load recent emojis from storage on mount
    useEffect(() => {
      if (persistRecent) {
        const storedRecent = localStorage.getItem(storageKey)
        if (storedRecent) {
          try {
            setRecentEmojis(JSON.parse(storedRecent))
          } catch (e) {
            console.error("Failed to parse stored recent emojis")
          }
        }
      }
    }, [persistRecent, storageKey])

    // Close panel when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    // Virtualized list for efficient rendering
    const rowVirtualizer = useVirtualizer({
      count: Math.ceil(mediaItems.length / itemsPerRow),
      getScrollElement: () => containerRef.current,
      estimateSize: () => (activeTab === "emoji" ? 40 : 120),
      overscan: 5,
    })

    // Calculate panel position
    const getPanelPosition = () => {
      switch (position) {
        case "top":
          return "bottom-full mb-2"
        case "bottom":
          return "top-full mt-2"
        case "left":
          return "right-full mr-2"
        case "right":
          return "left-full ml-2"
        default:
          return "bottom-12 right-0"
      }
    }

    // Render a virtualized item
    const renderVirtualItem = (virtualRow: any, rowIndex: number) => {
      const items: MediaItem[] = []

      // Get items for this row
      for (let i = 0; i < itemsPerRow; i++) {
        const itemIndex = rowIndex * itemsPerRow + i
        if (itemIndex < mediaItems.length) {
          items.push(mediaItems[itemIndex])
        }
      }

      return (
        <div
          key={virtualRow.key}
          data-index={virtualRow.index}
          ref={virtualRow.measureRef}
          className={cn(
            "grid gap-1 z-50",
            activeTab === "emoji" ? "grid-cols-8 sm:grid-cols-8" : "grid-cols-3 sm:grid-cols-4",
          )}
          style={{
            transform: `translateY(${virtualRow.start}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className={cn(
                "flex items-center justify-center transition-colors rounded-md",
                theme.hover,
                activeTab === "emoji" ? "w-9 h-9" : "aspect-square p-1",
              )}
            >
              {item.type === "emoji" && <span className="text-xl">{item.content}</span>}
              {(item.type === "gif" || item.type === "sticker") && (
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.type}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className="relative" ref={combinedRef}>
        {/* Trigger button */}
        {trigger ? (
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {trigger}
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn("flex items-center justify-center w-10 h-10 rounded-full", theme.button)}
            aria-label="Open emoji panel"
          >
            <Smile className="w-5 h-5" />
          </button>
        )}

        {/* Panel */}
        {isOpen && (
          <div
            className={cn(
              "absolute overflow-hidden rounded-lg shadow-lg border",
              getPanelPosition(),
              theme.bg,
              theme.border,
              className,
            )}
            style={{ width, zIndex }}
          >
            {/* Tabs for switching between emoji, GIFs, and stickers */}
            {showTabs && (
              <div className={cn("flex border-b", theme.border)}>
                <button
                  onClick={() => {
                    setActiveTab("emoji")
                    setActiveCategory("recent")
                    setSearchQuery("")
                  }}
                  className={cn(
                    "flex-1 py-2 px-4 text-sm font-medium",
                    activeTab === "emoji" ? theme.activeTab + " border-b-2" : theme.textMuted,
                  )}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Smile className="w-4 h-4" />
                    Emoji
                  </span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("gif")
                    setActiveCategory("trending")
                    setSearchQuery("")
                  }}
                  className={cn(
                    "flex-1 py-2 px-4 text-sm font-medium",
                    activeTab === "gif" ? theme.activeTab + " border-b-2" : theme.textMuted,
                  )}
                >
                  <span className="flex items-center justify-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    GIFs
                  </span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("sticker")
                    setActiveCategory("recent")
                    setSearchQuery("")
                  }}
                  className={cn(
                    "flex-1 py-2 px-4 text-sm font-medium",
                    activeTab === "sticker" ? theme.activeTab + " border-b-2" : theme.textMuted,
                  )}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Sticker className="w-4 h-4" />
                    Stickers
                  </span>
                </button>
              </div>
            )}

            {/* Header with search */}
            {showSearch && (
              <div className={cn("p-3 border-b", theme.border)}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}s...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full py-2 pl-9 pr-3 rounded-lg focus:outline-none focus:ring-1",
                      theme.input,
                      theme.text,
                      "focus:ring-blue-500",
                    )}
                  />
                  <Search
                    className={cn("absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5", theme.textMuted)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      aria-label="Clear search"
                    >
                      <X className={cn("w-4 h-4", theme.textMuted)} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Categories horizontal scroll */}
            {showCategories && (
              <div className={cn("border-b overflow-x-auto scrollbar-thin", theme.border)}>
                <div className="flex p-2 min-w-max">
                  {getCurrentCategories().map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id)
                        setSearchQuery("")
                      }}
                      className={cn(
                        "px-3 py-1 mx-1 text-sm rounded-full whitespace-nowrap",
                        activeCategory === category.id
                          ? theme.activeCategory
                          : theme.textMuted + " hover:bg-opacity-10 " + theme.hover,
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Virtualized content area */}
            <div
              ref={containerRef}
              className="overflow-y-auto p-2 relative"
              style={{
                height: `${height}px`,
                scrollbarWidth: "thin",
                scrollbarColor: lightTheme ? "#e5e7eb #f9fafb" : "#2b5278 #17212b",
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className={cn("w-8 h-8 animate-spin", lightTheme ? "text-blue-500" : "text-[#64aaed]")} />
                </div>
              ) : mediaItems.length === 0 ? (
                <div className={cn("flex flex-col items-center justify-center h-full", theme.textMuted)}>
                  <Search className="w-12 h-12 mb-2 opacity-50" />
                  <p>No {activeTab}s found</p>
                </div>
              ) : (
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer
                    .getVirtualItems()
                    .map((virtualRow) => renderVirtualItem(virtualRow, virtualRow.index))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
)

EmojiPanel.displayName = "EmojiPanel"

export default EmojiPanel
