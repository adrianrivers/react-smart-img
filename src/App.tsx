import PageLayout from '@/layouts/page-layout'
import { Image, ImageProps } from '@/components/image'

const ImageGrid: React.FunctionComponent<
  {
    images: number[]
  } & Pick<ImageProps, 'priority' | 'loading'>
> = ({ images, priority, loading }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((id) => (
        <Image
          key={id}
          src={`https://picsum.photos/id/${id}/300/200`}
          srcSet={`https://picsum.photos/id/${id}/300/200 300w, https://picsum.photos/id/${id}/600/400 600w, https://picsum.photos/id/${id}/900/600 900w`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          loading={loading}
          alt={`preloaded image ${id}`}
          className="h-[300px]"
        />
      ))}
    </div>
  )
}

function App() {
  const lazyImages = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 999 + 1))

  return (
    <PageLayout>
      <ImageGrid images={[1, 2, 3, 4]} priority />

      <div className="mb-[2000px] mt-12">
        <h2 className="text-2xl text-gray-600">
          Scroll down to see lazy loaded images
          <span className="ml-2 animate-pulse">⬇️</span>
        </h2>
      </div>

      <ImageGrid images={lazyImages} loading="lazy" />
    </PageLayout>
  )
}

export default App
