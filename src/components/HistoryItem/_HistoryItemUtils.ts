import { clsx } from 'clsx'

export function getIconSize(effectiveCompact: boolean) {
  return effectiveCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'
}

export function getIconContainerClasses(effectiveCompact: boolean) {
  return clsx(
    'flex-shrink-0 rounded-md flex items-center justify-center',
    effectiveCompact ? 'w-[22px] h-[22px]' : 'w-7 h-7'
  )
}
