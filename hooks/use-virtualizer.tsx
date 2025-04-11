"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface VirtualizerOptions {
  count: number
  getScrollElement: () => HTMLElement | null
  estimateSize: (index: number) => number
  overscan?: number
  onChange?: (items: VirtualItem[]) => void
}

interface VirtualItem {
  index: number
  start: number
  end: number
  size: number
  measureRef: (el: HTMLElement | null) => void
  key: number | string
}

export function useVirtualizer(options: VirtualizerOptions) {
  const { count, getScrollElement, estimateSize, overscan = 3, onChange } = options

  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const sizeCache = useRef<Record<number, number>>({})
  const measureRefs = useRef<Record<number, (el: HTMLElement | null) => void>>({})

  // Calculate total size
  const getTotalSize = useCallback(() => {
    let total = 0
    for (let i = 0; i < count; i++) {
      total += sizeCache.current[i] ?? estimateSize(i)
    }
    return total
  }, [count, estimateSize])

  // Get virtual items
  const getVirtualItems = useCallback(() => {
    const scrollElement = getScrollElement()
    if (!scrollElement) return []

    const virtualItems: VirtualItem[] = []

    // Early return if no items
    if (count === 0) return virtualItems

    // Calculate range
    const startIndex = Math.max(0, Math.floor(scrollTop / estimateSize(0)) - overscan)

    let endIndex = startIndex
    let currentOffset = 0

    // Find items that should be rendered
    for (let i = 0; i < count; i++) {
      const size = sizeCache.current[i] ?? estimateSize(i)

      if (i < startIndex) {
        currentOffset += size
        continue
      }

      if (currentOffset > scrollTop + clientHeight + overscan * estimateSize(0)) {
        break
      }

      endIndex = i

      // Create measure ref if it doesn't exist
      if (!measureRefs.current[i]) {
        measureRefs.current[i] = (el: HTMLElement | null) => {
          if (el) {
            const size = el.getBoundingClientRect().height
            if (size !== sizeCache.current[i]) {
              sizeCache.current[i] = size
            }
          }
        }
      }

      virtualItems.push({
        index: i,
        start: currentOffset,
        end: currentOffset + size,
        size,
        measureRef: measureRefs.current[i],
        key: i,
      })

      currentOffset += size
    }

    return virtualItems
  }, [count, scrollTop, clientHeight, estimateSize, getScrollElement, overscan])

  // Handle scroll
  useEffect(() => {
    const scrollElement = getScrollElement()
    if (!scrollElement) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement
      setScrollTop(scrollTop)
      setScrollHeight(scrollHeight)
      setClientHeight(clientHeight)
    }

    // Initial measurement
    handleScroll()

    scrollElement.addEventListener("scroll", handleScroll, { passive: true })

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      handleScroll()
    })

    resizeObserver.observe(scrollElement)

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [getScrollElement])

  // Call onChange when virtual items change
  const virtualItems = getVirtualItems()

  useEffect(() => {
    onChange?.(virtualItems)
  }, [onChange, virtualItems])

  return {
    getVirtualItems,
    getTotalSize,
    scrollTop,
    scrollHeight,
    clientHeight,
  }
}
