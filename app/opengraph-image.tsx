import { ImageResponse } from 'next/og'

export const alt = 'WrapGuide — PPF, Covering & Adhésifs Auto'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#141414',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              backgroundColor: '#f59e0b',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              fontWeight: 900,
              color: '#000000',
            }}
          >
            W
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700 }}>
            <span style={{ color: '#ffffff' }}>Wrap</span>
            <span style={{ color: '#f59e0b' }}>Guide</span>
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 32, color: '#a3a3a3' }}>
          PPF · Covering · Adhésifs Auto
        </div>
      </div>
    ),
    { ...size }
  )
}
