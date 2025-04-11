# Telegram-Style Emoji Select Panel

A high-performance, production-ready emoji panel component that supports emojis, GIFs, and animated stickers with virtualized rendering for optimal performance.

## Features

- 🚀 **High Performance**: Virtualized rendering for handling thousands of items
- 🎨 **Themeable**: Light and dark theme support
- 📱 **Responsive**: Works on all screen sizes
- 🔍 **Search**: Fast filtering across all media types
- 🔄 **Multiple Media Types**: Emojis, GIFs, and animated stickers
- 🧩 **Highly Customizable**: Extensive props API
- 💾 **Persistent Storage**: Remembers recently used emojis
- ♿ **Accessible**: Keyboard navigation and screen reader support

## Installation

```bash
npm install emoji-select-panel
# or
yarn add emoji-select-panel
```

## Basic Usage

```jsx
import { EmojiPanel } from 'emoji-select-panel'

function ChatInput() {
  const handleEmojiSelect = (item) => {
    console.log('Selected:', item.content || item.url)
    // Insert into your text input
  }

  return (
    <div className="chat-input">
      <textarea placeholder="Type a message..." />
      <EmojiPanel onSelect={handleEmojiSelect} />
    </div>
  )
}
```

## Advanced Usage

```jsx
import { EmojiPanel } from 'emoji-select-panel'
import { SmileIcon } from 'your-icon-library'

function CustomEmojiPanel() {
  return (
    <EmojiPanel
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
    />
  )
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `(item: MediaItem) => void` | - | Callback when an item is selected |
| `emojiData` | `Record<string, string[]>` | Default emoji set | Custom emoji data |
| `emojiCategories` | `EmojiCategory[]` | Default categories | Custom emoji categories |
| `gifCategories` | `GifCategory[]` | Default categories | Custom GIF categories |
| `stickerCategories` | `StickerCategory[]` | Default categories | Custom sticker categories |
| `defaultMediaType` | `"emoji" \| "gif" \| "sticker"` | `"emoji"` | Initial media type to display |
| `defaultCategory` | `string` | `"recent"` | Initial category to display |
| `lightTheme` | `boolean` | `false` | Whether to use light theme |
| `height` | `number` | `350` | Panel height in pixels |
| `width` | `number \| string` | `"320px"` | Panel width |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Panel position relative to trigger |
| `zIndex` | `number` | `50` | Z-index for the panel |
| `closeOnSelect` | `boolean` | `false` | Whether to close panel after selection |
| `fetchItems` | `(type, category, query) => Promise<MediaItem[]>` | Built-in fetcher | Custom fetch function |
| `showTabs` | `boolean` | `true` | Whether to show media type tabs |
| `showSearch` | `boolean` | `true` | Whether to show search input |
| `showCategories` | `boolean` | `true` | Whether to show category selector |
| `className` | `string` | - | Additional CSS class for panel |
| `trigger` | `ReactNode` | Default button | Custom trigger element |
| `defaultOpen` | `boolean` | `false` | Whether panel is initially open |
| `persistRecent` | `boolean` | `true` | Whether to store recent emojis |
| `storageKey` | `string` | `"telegram-recent-emojis"` | Storage key for recent emojis |

## Performance Considerations

The component uses virtualization to efficiently render only the visible items, making it suitable for large datasets. For optimal performance:

1. **Custom Fetchers**: When implementing a custom `fetchItems` function, consider pagination or limiting results
2. **Image Optimization**: For GIFs and stickers, use optimized images and consider lazy loading
3. **Debounced Search**: The search input is debounced internally to prevent excessive API calls

## Telegram Code Style

This component follows Telegram's code style principles:

- **Minimal Dependencies**: Zero external dependencies beyond React
- **Performance First**: Optimized for speed and memory efficiency
- **Clean API**: Simple, intuitive props interface
- **Consistent Naming**: Clear, descriptive variable and function names
- **Modular Architecture**: Separation of concerns for maintainability

## Custom Data Integration

### Custom Emoji Data

```jsx
const myEmojiData = {
  recent: ["😀", "😁", "😂"],
  custom: ["🚀", "💻", "🔥", "✨"],
  // ...other categories
}

<EmojiPanel emojiData={myEmojiData} />
```

### Custom Categories

```jsx
import { Rocket, Code, Fire } from 'your-icon-library'

const myCategories = [
  { id: "recent", name: "Recent", icon: Clock },
  { id: "custom", name: "Developer", icon: Code },
  // ...other categories
]

<EmojiPanel emojiCategories={myCategories} />
```

### Custom API Integration

```jsx
const fetchFromMyApi = async (type, category, query) => {
  const response = await fetch(`/api/media?type=${type}&category=${category}&q=${query}`)
  const data = await response.json()
  
  return data.map(item => ({
    id: item.id,
    content: item.type === 'emoji' ? item.unicode : undefined,
    url: item.type !== 'emoji' ? item.url : undefined,
    type: item.type,
    category: item.category
  }))
}

<EmojiPanel fetchItems={fetchFromMyApi} />
```

