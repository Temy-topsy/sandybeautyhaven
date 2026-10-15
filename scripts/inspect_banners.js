import fs from 'fs';
import https from 'https';

const urls = [
  'https://cdn-s.acuityscheduling.com/upload-f403e1c9a4ca767a13acb87dd005f015.png',
  'https://cdn-s.acuityscheduling.com/upload-598b67fb059689393d8541c7d1f9e786.png',
  'https://cdn-s.acuityscheduling.com/upload-b398ff6985672e1845ebb8b6c6c84e7b.png',
  'https://cdn-s.acuityscheduling.com/upload-8cfb358702393ee07f4a6194042c705e.png',
  'https://cdn-s.acuityscheduling.com/upload-68abb6e1a702be56c21476d1eeaa050a.png',
  'https://cdn-s.acuityscheduling.com/upload-4ecd633be1e621f09bbd68f542912cb3.png',
  'https://cdn-s.acuityscheduling.com/upload-cb2d62f1fdbdb13472e7674e4be0e657.png',
  'https://cdn-s.acuityscheduling.com/upload-fde083671178b75f8b58414cfee4414e.jpeg'
];

if (!fs.existsSync('docs/acuity_banners')) {
  fs.mkdirSync('docs/acuity_banners', { recursive: true });
}

urls.forEach((url, i) => {
  const ext = url.endsWith('.jpeg') ? '.jpeg' : '.png';
  const dest = `docs/acuity_banners/banner_${i + 1}${ext}`;
  const file = fs.createWriteStream(dest);
  https.get(url, res => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Saved: ${dest}`);
    });
  });
});
