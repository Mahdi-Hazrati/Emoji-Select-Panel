import type { LucideIcon } from "lucide-react"

export interface EmojiCategory {
  id: string
  name: string
  icon: LucideIcon
}

export interface GifCategory {
  id: string
  name: string
}

export interface StickerCategory {
  id: string
  name: string
}
