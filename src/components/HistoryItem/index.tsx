import { useCallback, forwardRef } from 'react'
import { clsx } from 'clsx'
import type { ClipboardItem } from '../../types/clipboard'
import { getCardBackgroundStyle } from '../../utils/themeUtils'
import { TextContent, ImageContent } from './_HistoryItemContent'

interface HistoryItemProps {
  item: ClipboardItem
  onPaste: (id: string) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
  onFocus?: () => void
  index: number
  isFocused?: boolean
  isDark: boolean
  secondaryOpacity: number
  isCompact?: boolean
  // Feature flags passed from parent
  enableSmartActions: boolean
  enableUiPolish: boolean
}

export const HistoryItem = forwardRef<HTMLDivElement, HistoryItemProps>(function HistoryItem(
  {
    item,
    onPaste,
    onDelete,
    onTogglePin,
    onFocus,
    index,
    isFocused = false,
    isDark,
    secondaryOpacity,
    isCompact = false,
    enableSmartActions,
    enableUiPolish,
  },
  ref
) {
  // Use compact mode only if enabled by flag
  const effectiveCompact = enableUiPolish ? isCompact : false

  // Handle paste on click
  const handleClick = useCallback(() => {
    onPaste(item.id)
  }, [item.id, onPaste])

  // Apply an explicit visible ring for pinned+focused items so the ring shows
  // even if :focus-visible isn't triggered (e.g. after reopening the window).
  const pinnedAndFocused =
    item.pinned && isFocused
      ? `ring-2 ring-win11-bg-accent focus-visible:ring-2 focus-visible:ring-win11-bg-accent`
      : undefined

  return (
    <div
      ref={ref}
      className={clsx(
        // Base styles
        'rounded-lg cursor-pointer',
        effectiveCompact ? 'px-2 py-1.5' : 'px-2.5 py-2',
        'transition-all duration-150 ease-out',
        // Blue ring has priority
        pinnedAndFocused,
        // Otherwise default focused ring
        !pinnedAndFocused && isFocused ? `ring-1 ring-win11-bg-accent` : undefined,
        // Dark mode styles
        isDark
          ? 'hover:bg-win11-bg-card-hover border border-win11-border-subtle'
          : 'hover:bg-win11Light-bg-card-hover border border-win11Light-border',
        // Pinned indicator
        item.pinned && !pinnedAndFocused && `ring-1 ring-win11-bg-accent`,
        // Focus styles
        `focus:outline-none focus-visible:ring-2 focus-visible:ring-win11-bg-accent`
      )}
      onClick={handleClick}
      onFocus={onFocus}
      role="button"
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      style={{
        animationDelay: `${index * 30}ms`,
        ...getCardBackgroundStyle(isDark, secondaryOpacity),
      }}
    >
      <div className="min-w-0">
        <TextContent item={item} isDark={isDark} effectiveCompact={effectiveCompact} />
        <ImageContent item={item} isDark={isDark} effectiveCompact={effectiveCompact} />
      </div>
    </div>
  )
})
