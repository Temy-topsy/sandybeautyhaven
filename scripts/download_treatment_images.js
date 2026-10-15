import fs from 'fs';
import https from 'https';

const images = [
  { url: 'https://cdn-s.acuityscheduling.com/appointmentType-79312246.jpeg?1749244975', name: 'combo-brows.jpg' },
  { url: 'https://cdn-s.acuityscheduling.com/appointmentType-79312587.jpeg?1749245147', name: 'brow-touchup.jpg' },
  { url: 'https://cdn-s.acuityscheduling.com/appointmentType-62413581.jpeg?1779040035', name: 'hybrid-lashes.jpg' },
  { url: 'https://cdn-s.acuityscheduling.com/appointmentType-62977546.png?1715428482', name: 'wispy-set.png' }
];

if (!fs.existsSync('public/appointments')) {
  fs.mkdirSync('public/appointments', { recursive: true });
}

images.forEach(({ url, name }) => {
  const file = fs.createWriteStream(`public/appointments/${name}`);
  https.get(url, res => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Saved public/appointments/${name}`);
    });
  }).on('error', err => console.error(err));
});
