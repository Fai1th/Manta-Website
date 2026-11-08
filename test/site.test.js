import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('dashboard uses same-origin APIs, no inline script handlers, and ships Manta branding',()=>{
  const html=read('public/dashboard.html'),js=read('public/app.js');
  assert.match(html,/<html lang="en">/);assert.match(html,/Manta/);assert.match(html,/aria-live="polite"/);assert.match(html,/<dialog/);
  assert.doesNotMatch(html,/\son\w+=/);assert.doesNotMatch(html,/<script(?![^>]*src=)[^>]*>/);
  assert.match(js,/X-CSRF-Token/);assert.match(js,/X-Request-ID/);assert.match(js,/function esc|const esc=/);
  assert.ok(existsSync(new URL('../public/assets/manta.png',import.meta.url)));
});
test('public landing page is separate from the dashboard and labels its product screenshot as test data',()=>{
  const html=read('public/index.html');assert.match(html,/href="\/dashboard"/);assert.match(html,/Preview uses test data/);assert.match(html,/src="\/landing.js"/);assert.doesNotMatch(html,/\son\w+=/);assert.doesNotMatch(html,/—/);
  for(const id of ['features','commands','faq'])assert.ok(html.includes(`id="${id}"`));
});
test('command search and category filters combine correctly and expose an empty state',()=>{
  const controls=['all','moderation','community'].map(filter=>({dataset:{filter},addEventListener(name,fn){this.click=fn;},setAttribute(name,value){this[name]=value;}}));
  const commands=[{dataset:{category:'moderation'},textContent:'/manage timeout'},{dataset:{category:'community'},textContent:'/ticket support'},{dataset:{category:'community'},textContent:'/stats activity'}];
  const query={value:'',addEventListener(name,fn){this.input=fn;}},empty={},count={};
  const document={querySelectorAll:s=>s==='[data-filter]'?controls:commands,querySelector:s=>s==='#command-query'?query:s==='#command-empty'?empty:count};
  runInNewContext(read('public/landing.js'),{document});
  controls[2].click();assert.equal(commands[0].hidden,true);assert.equal(commands[1].hidden,false);assert.equal(count.textContent,'2 commands shown.');
  query.value='support';query.input();assert.equal(commands[2].hidden,true);assert.equal(count.textContent,'1 command shown.');
  query.value='nonexistent';query.input();assert.equal(empty.hidden,false);assert.equal(count.textContent,'0 commands shown.');
  query.value='';controls[0].click();assert.equal(count.textContent,'3 commands shown.');assert.equal(controls[0]['aria-pressed'],'true');
});
test('container pins a full backend commit and runs the bot process, not a static-only server',()=>{
  const docker=read('Dockerfile');assert.match(docker,/Manta\/archive\/[a-f0-9]{40}\.tar\.gz/);assert.match(docker,/npm ci --omit=dev --ignore-scripts/);assert.match(docker,/COPY public \/app\/public/);assert.match(docker,/USER node/);assert.match(docker,/DATA_DIR=\/data/);
});
test('Vercel builds a complete static site without starting a bot or exposing runtime secrets',()=>{
  execFileSync(process.execPath,['scripts/build-static.mjs'],{cwd:fileURLToPath(new URL('../',import.meta.url)),env:{...process.env,DISCORD_TOKEN:'test-token-not-for-public-output'},stdio:'pipe'});
  const config=JSON.parse(read('vercel.json')),status=JSON.parse(read('dist/deployment-status.json'));
  assert.equal(config.framework,null);assert.equal(config.outputDirectory,'dist');assert.equal(status.websiteOnly,true);assert.equal(status.connected,false);assert.equal(status.user,null);
  assert.ok(config.rewrites.some(r=>r.source==='/dashboard'&&r.destination==='/dashboard.html'));
  assert.ok(config.rewrites.some(r=>r.source==='/api/me'&&r.destination==='/deployment-status.json'));
  assert.match(read('dist/index.html'),/Keep your server/);assert.match(read('dist/dashboard.html'),/Server management/);
  assert.ok(read('dist/vendor/bootstrap.css').length>100000);
  assert.doesNotMatch(read('dist/deployment-status.json'),/test-token-not-for-public-output/);
  assert.match(read('dist/app.js'),/if\(me.websiteOnly\)/);
});
test('website-only dashboard explains the missing backend without calling staff APIs',async()=>{
  const elements=Object.fromEntries(['#content','#nav','#connection','#account'].map(id=>[id,{innerHTML:'',textContent:''}]));
  const requests=[];
  runInNewContext(read('public/app.js'),{
    document:{querySelector:s=>elements[s]||null},location:{hash:''},window:{addEventListener:()=>{}},AbortController,
    fetch:async path=>{requests.push(path);return {ok:true,json:async()=>({configured:false,connected:false,user:null,manage:false,websiteOnly:true})};}
  });
  await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(requests,['/api/me']);assert.match(elements['#content'].innerHTML,/Website online\. Bot not connected\./);
  assert.match(elements['#content'].innerHTML,/backend host/);assert.doesNotMatch(elements['#account'].innerHTML,/Sign in with Discord/);
});
