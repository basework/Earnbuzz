import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Earn Buzz',
    short_name: 'EarnBuzz', 
    description: 'Your ultimate financial companion',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}