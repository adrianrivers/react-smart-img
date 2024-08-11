export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-screen-lg p-3.5 md:p-8">
      {children}
    </div>
  )
}
