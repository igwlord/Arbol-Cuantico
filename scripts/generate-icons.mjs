// Generate PNG icons from public/favicon.svg using sharp
// Usage: node scripts/generate-icons.mjs
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(process.cwd())
const srcSvg = resolve(root, 'public', 'favicon.svg')
const outDir = resolve(root, 'public')

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
]

async function run() {
  const svg = await readFile(srcSvg)
  await Promise.all(targets.map(async ({ name, size }) => {
    const buf = await sharp(svg)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toBuffer()
    await writeFile(resolve(outDir, name), buf)
    console.log('Wrote', name)
  }))
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
