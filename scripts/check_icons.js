import fs from 'fs';
import path from 'path';
import * as lucide from 'lucide-react';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.matchAll(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g);
  for (const m of matches) {
    const icons = m[1].split(',').map(s => s.trim().replace(/\s+as\s+\w+/, '')).filter(Boolean);
    for (const icon of icons) {
      if (!lucide[icon]) {
        console.log(`UNDEFINED ICON: "${icon}" in ${filePath}`);
      }
    }
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) checkFile(full);
  }
}

walk('src');
console.log('Finished checking all icons in src/');
