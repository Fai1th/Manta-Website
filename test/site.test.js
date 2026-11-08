import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('dashboard uses same-origin APIs, no inline script handlers, and ships Manta branding',()=>{
  const html=read('public/index.html'),js=read('public/app.js');
  assert.match(html,/<html lang="en">/);assert.match(html,/Manta/);assert.match(html,/aria-live="polite"/);assert.match(html,/<dialog/);
  assert.doesNotMatch(html,/\son\w+=/);assert.doesNotMatch(html,/<script(?![^>]*src=)[^>]*>/);
  assert.match(js,/X-CSRF-Token/);assert.match(js,/X-Request-ID/);assert.match(js,/function esc|const esc=/);
  assert.ok(existsSync(new URL('../public/assets/manta.png',import.meta.url)));
});
test('container pins a full backend commit and runs the bot process, not a static-only server',()=>{
  const docker=read('Dockerfile');assert.match(docker,/Manta\/archive\/[a-f0-9]{40}\.tar\.gz/);assert.match(docker,/npm ci --omit=dev --ignore-scripts/);assert.match(docker,/COPY public \/app\/public/);assert.match(docker,/USER node/);assert.match(docker,/DATA_DIR=\/data/);
});
