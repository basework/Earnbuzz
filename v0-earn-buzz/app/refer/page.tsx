import dynamic from 'next/dynamic'

export const revalidate = 0

const ReferClient = dynamic(() => import('./ReferClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
})

export default function ReferPage() {
  return <ReferClient />
}