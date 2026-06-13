import { Suspense } from 'react'
import InviteClient from './InviteClient'

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-[#0D0F1A]">
        <div className="w-8 h-8 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InviteClient />
    </Suspense>
  )
}
