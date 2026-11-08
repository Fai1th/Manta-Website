import test,{before} from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { commands,integrations,filterItems } from '../src/catalog.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
before(()=>execFileSync(process.execPath,['scripts/build-static.mjs'],{cwd:fileURLToPath(new URL('../',import.meta.url)),env:{...process.env,DISCORD_TOKEN:'test-token-not-for-public-output'},stdio:'pipe'}));
test('dashboard preserves same-origin protection and accessible management surfaces',()=>{
  const html=read('public/dashboard.html'),js=read('public/app.js');
  assert.match(html,/<html lang="en">/);assert.match(html,/aria-live="polite"/);assert.match(html,/<dialog/);
  assert.doesNotMatch(html,/\son\w+=/);assert.doesNotMatch(html,/<script(?![^>]*src=)[^>]*>/);
  assert.match(js,/X-CSRF-Token/);assert.match(js,/X-Request-ID/);assert.match(js,/function esc|const esc=/);
  assert.match(js,/integrations:integrationsView/);assert.match(js,/\/admin\/integrations/);
});
test('React site is prerendered with navigable content, labeled samples and local assets',()=>{
  const html=read('dist/index.html');
  assert.match(html,/Your server\./);assert.match(html,/href="\/dashboard"/);assert.match(html,/Interactive sample/);assert.match(html,/Test data/);
  assert.doesNotMatch(html,/<!--site-->|\son\w+=|test-token-not-for-public-output/);
  for(const id of ['features','integrations','commands','faq'])assert.ok(html.includes(`id="${id}"`));
  const script=html.match(/src="(\/assets\/site-[^"]+\.js)"/)[1];assert.ok(read('dist'+script).length<400000);
  for(const path of ['dist/assets/manrope-latin.woff2','dist/assets/icons/integrations.svg','dist/assets/manta.png'])assert.ok(existsSync(new URL('../'+path,import.meta.url)));
});
test('search and categories combine, support whitespace and return a useful empty result',()=>{
  assert.deepEqual(filterItems(commands,'Community',' support ').map(c=>c.name),['/ticket']);
  assert.equal(filterItems(commands,'Moderation','support').length,0);
  assert.equal(filterItems(integrations,'Social','twitch')[0].id,'twitch');
  assert.equal(filterItems(integrations,'Automation','').length,3);
  assert.equal(filterItems(integrations,'All','nonexistent').length,0);
  assert.equal(new Set(integrations.map(c=>c.id)).size,integrations.length);
});
test('motion can be paused, reduced motion is respected and inactive slides are inert',()=>{
  assert.match(read('public/landing.css'),/prefers-reduced-motion:reduce/);
  assert.match(read('src/Site.jsx'),/localStorage.setItem\('manta-motion'/);
  assert.match(read('src/Site.jsx'),/inert=\{index!==/);
  assert.match(read('src/MantaRay.jsx'),/ray-left/);assert.match(read('src/MantaRay.jsx'),/ray-right/);assert.match(read('src/MantaRay.jsx'),/ray-tail/);
});
test('container builds React assets and pins the complete bot runtime',()=>{
  const docker=read('Dockerfile');assert.match(docker,/Manta\/archive\/[a-f0-9]{40}\.tar\.gz/);assert.match(docker,/npm ci --omit=dev --ignore-scripts/);assert.match(docker,/COPY --from=website \/site\/dist \/app\/public/);assert.match(docker,/USER node/);assert.match(docker,/DATA_DIR=\/data/);
});
test('Vercel serves anonymous deployment status without starting the bot or exposing secrets',()=>{
  const config=JSON.parse(read('vercel.json')),status=JSON.parse(read('dist/deployment-status.json'));
  assert.equal(config.framework,null);assert.equal(config.outputDirectory,'dist');assert.equal(status.websiteOnly,true);assert.equal(status.connected,false);assert.equal(status.user,null);
  assert.ok(config.rewrites.some(r=>r.source==='/dashboard'&&r.destination==='/dashboard.html'));
  assert.ok(config.rewrites.some(r=>r.source==='/api/me'&&r.destination==='/deployment-status.json'));
  assert.match(read('dist/dashboard.html'),/Server management/);assert.ok(read('dist/vendor/bootstrap.css').length>100000);
  for(const file of readdirSync(new URL('../dist/assets/',import.meta.url)).filter(f=>f.endsWith('.js')))assert.doesNotMatch(read('dist/assets/'+file),/test-token-not-for-public-output/);
});
test('website-only dashboard makes no staff requests and explains the disconnected backend',async()=>{
  const elements=Object.fromEntries(['#content','#nav','#connection','#account'].map(id=>[id,{innerHTML:'',textContent:''}]));const requests=[];
  runInNewContext(read('public/app.js'),{document:{querySelector:s=>elements[s]||null},location:{hash:''},window:{addEventListener:()=>{}},AbortController,fetch:async path=>{requests.push(path);return {ok:true,json:async()=>({configured:false,connected:false,user:null,manage:false,websiteOnly:true})};}});
  await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(requests,['/api/me']);assert.match(elements['#content'].innerHTML,/Website online\. Bot not connected\./);assert.doesNotMatch(elements['#account'].innerHTML,/Sign in with Discord/);
});
