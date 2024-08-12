import React from 'react'
import { preload } from 'react-dom'

import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  priority?: boolean
}

/**
 * Gotcha -
 * Lazy loading will only work on Firefox if the loading attribute is set before the src attribute
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1647077
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      srcSet,
      sizes,
      loading,
      priority,
      width = '100%',
      height = 'auto',
      className,
      ...props
    },
    ref
  ) => {
    const isLazy = loading === 'lazy' && !priority

    const [isError, setIsError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(isLazy)

    if (priority) {
      preload(src, { as: 'image', imageSizes: sizes, imageSrcSet: srcSet })
    }

    return (
      <figure
        className={cn('size-full transition-all duration-700', {
          'animate-pulse bg-gray-200/20': isLoading && !isError,
          'bg-transparent': !isLoading && !isError,
        })}
      >
        <img
          ref={ref}
          loading={loading}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          onError={() => setIsError(true)}
          onLoad={() => setIsLoading(false)}
          className={cn(
            'w-full animate-fade-in object-cover text-transparent transition-all duration-500',
            className,
            {
              'opacity-0 blur-sm': isLoading && !isError,
              'opacity-100': !isLoading && !isError,
            }
          )}
          width={width}
          height={height}
          {...props}
        />
      </figure>
    )
  }
)

Image.displayName = 'Image'

export { Image }
export type { ImageProps }
