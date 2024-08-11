import React from 'react'
import { preload } from 'react-dom'

import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  priority?: boolean
}

/**
 * Gotcha - Lazy loading will only work on Firefox if the loading attribute is set before the src attribute
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1647077
 *
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, srcSet, sizes, loading, priority, className, ...props }, ref) => {
    const isLazy = loading === 'lazy' && !priority

    const [isError, setIsError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(isLazy)

    if (priority) {
      preload(src, { as: 'image', imageSizes: sizes, imageSrcSet: srcSet })
    }

    return (
      <img
        ref={ref}
        loading={loading}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        onError={() => setIsError(true)}
        onLoad={() => setIsLoading(false)}
        className={cn('w-full object-cover text-transparent', className, {
          'animate-pulse bg-gray-200/20 blur-sm': isLoading && !isError,
          'animate-fade-in blur-0': !isLoading && !isError,
          'relative before:absolute before:inset-0 before:size-full before:bg-gray-200/20':
            isError,
        })}
        {...props}
      />
    )
  }
)

Image.displayName = 'Image'

export { Image }
export type { ImageProps }
