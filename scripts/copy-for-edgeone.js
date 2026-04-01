import fs from 'fs'
import path from 'path'

const distDir = path.join(process.cwd(), 'docs/.vitepress/dist')
const docsDir = path.join(distDir, 'docs')

if (!fs.existsSync(docsDir)) {
  console.log('No docs directory to copy')
  process.exit(0)
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

copyDir(docsDir, distDir)
console.log('Copied docs/* to root for EdgeOne deployment')
