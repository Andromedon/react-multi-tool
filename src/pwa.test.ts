import fs from 'fs';
import path from 'path';

const publicDirectory = path.join(process.cwd(), 'public');
const readAsset = (name: string) => fs.readFileSync(path.join(publicDirectory, name));
const manifest = JSON.parse(readAsset('manifest.json').toString('utf8'));

const expectPngSize = (image: Buffer, size: number) => {
  expect(image.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect(image.toString('ascii', 12, 16)).toBe('IHDR');
  expect(image.readUInt32BE(16)).toBe(size);
  expect(image.readUInt32BE(20)).toBe(size);
};

test('uses MultiTool as both the full and short installed app name', () => {
  expect(manifest.name).toBe('MultiTool');
  expect(manifest.short_name).toBe('MultiTool');
});

test.each([
  ['icon-192.png', 192, 'any'],
  ['icon-512.png', 512, 'any'],
  ['icon-maskable-512.png', 512, 'maskable'],
])('provides a valid %s matching its manifest dimensions and purpose', (src, size, purpose) => {
  expect(manifest.icons).toContainEqual({
    src,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose,
  });
  expectPngSize(readAsset(src as string), size as number);
});

test('provides the MultiTool title and a valid Apple home screen icon', () => {
  const document = new DOMParser().parseFromString(readAsset('index.html').toString('utf8'), 'text/html');
  expect(document.title).toBe('MultiTool');
  expect(document.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute('content'))
    .toBe('MultiTool');
  const icon = document.querySelector('link[rel="apple-touch-icon"]');
  expect(icon?.getAttribute('href')).toBe('%PUBLIC_URL%/apple-touch-icon.png');
  expect(icon?.getAttribute('sizes')).toBe('180x180');
  expectPngSize(readAsset('apple-touch-icon.png'), 180);
});

test('links to a favicon with valid 16, 32 and 48 pixel entries', () => {
  const document = new DOMParser().parseFromString(readAsset('index.html').toString('utf8'), 'text/html');
  expect(document.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe('%PUBLIC_URL%/favicon.ico');
  const favicon = readAsset('favicon.ico');
  expect(favicon.readUInt16LE(0)).toBe(0);
  expect(favicon.readUInt16LE(2)).toBe(1);
  expect(favicon.readUInt16LE(4)).toBe(3);
  [16, 32, 48].forEach((size, index) => {
    const entryOffset = 6 + index * 16;
    expect(favicon[entryOffset]).toBe(size);
    expect(favicon[entryOffset + 1]).toBe(size);
    const length = favicon.readUInt32LE(entryOffset + 8);
    const offset = favicon.readUInt32LE(entryOffset + 12);
    expect(offset + length).toBeLessThanOrEqual(favicon.length);
    expectPngSize(favicon.subarray(offset, offset + length), size);
  });
});
