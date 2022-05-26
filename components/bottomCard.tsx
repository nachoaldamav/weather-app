import { useRef, ReactNode } from 'react'
import Sheet, { SheetRef } from 'react-modal-sheet'

export default function BottomCard({ children }: { children: ReactNode }) {
  const ref = useRef<SheetRef>()
  const snapTo = (i: number) => ref.current?.snapTo(i)

  return (
    <Sheet
      ref={ref}
      isOpen={true}
      onClose={() => snapTo(2)}
      snapPoints={[600, 300, 40]}
      initialSnap={2}
    >
      <Sheet.Container onViewportBoxUpdate={() => {}}>
        <Sheet.Header onViewportBoxUpdate={() => {}} />
        <Sheet.Content onViewportBoxUpdate={() => {}}>{children}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}
