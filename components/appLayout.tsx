export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen max-h-full w-full flex-col overflow-x-hidden overflow-y-hidden bg-primary font-display text-white">
      <div className="mx-auto my-0 flex h-full w-full max-w-md flex-col items-center justify-center rounded-lg bg-secondary md:my-4">
        {children}
      </div>
    </div>
  )
}
