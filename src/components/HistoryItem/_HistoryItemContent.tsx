import { clsx } from 'clsx'
import type { ClipboardItem } from '../../types/clipboard'

export function TextContent({
  item,
  isDark,
  effectiveCompact: _effectiveCompact,
}: {
  item: ClipboardItem
  isDark: boolean
  effectiveCompact: boolean
}) {
  if (item.content.type !== 'Text' && item.content.type !== 'RichText') return null

  const textToDisplay = item.content.type === 'Text' ? item.content.data : item.content.data.plain

  return (
    <p
      className={clsx(
        'truncate whitespace-nowrap text-[13px] leading-5',
        isDark ? 'text-win11-text-primary' : 'text-win11Light-text-primary'
      )}
    >
      {textToDisplay}
    </p>
  )
}

export function ImageContent({
  item,
  isDark,
  effectiveCompact,
}: {
  item: ClipboardItem
  isDark: boolean
  effectiveCompact: boolean
}) {
  if (item.content.type !== 'Image') return null
  const { width, height, base64 } = item.content.data

  return (
    <div className="flex items-center gap-2 min-w-0">
      <img
        src={`data:image/png;base64,${base64}`}
        alt="Clipboard image"
        className={clsx(
          'shrink-0 rounded object-cover bg-black/10',
          effectiveCompact ? 'w-8 h-8' : 'w-10 h-10'
        )}
      />
      <p
        className={clsx(
          'truncate whitespace-nowrap text-[13px] leading-5',
          isDark ? 'text-win11-text-secondary' : 'text-win11Light-text-secondary'
        )}
      >
        Image
        <span className="ml-1 opacity-70">
          {width}×{height}
        </span>
      </p>
    </div>
  )
}
