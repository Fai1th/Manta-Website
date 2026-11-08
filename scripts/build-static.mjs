import { cp, copyFile, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

// The static Vercel site never starts the bot or reads its runtime credentials.
const output=new URL('../dist/',import.meta.url);
await rm(output,{recursive:true,force:true});
await cp(new URL('../public/',import.meta.url),output,{recursive:true});
const root=fileURLToPath(new URL('../',import.meta.url));
const options={absWorkingDir:root,bundle:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'};
const client=await build({...options,entryPoints:['src/client.jsx'],outdir:'dist/assets',entryNames:'site-[hash]',format:'esm',minify:true,metafile:true});
await build({...options,entryPoints:['src/render.jsx'],outfile:'.build/render.mjs',platform:'node',format:'esm',packages:'external'});
const {render,navIcons,brandMark}=await import(new URL('../.build/render.mjs',import.meta.url));
await writeFile(new URL('assets/manta-mark.svg',output),brandMark());
await mkdir(new URL('assets/icons/',output),{recursive:true});
await Promise.all(Object.entries(navIcons).map(([name,svg])=>writeFile(new URL(`assets/icons/${name}.svg`,output),svg)));
const script=Object.keys(client.metafile.outputs).find(path=>path.endsWith('.js'));
const template=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
await writeFile(new URL('index.html',output),template.replace('<!--site-->',render()).replace('<!--scripts-->',`<script type="module" src="/${script.replace(/^dist\//,'')}"></script>`));
await copyFile(new URL('../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',import.meta.url),new URL('assets/manrope-latin.woff2',output));
await mkdir(new URL('vendor/',output),{recursive:true});
await copyFile(new URL('../node_modules/bootstrap/dist/css/bootstrap.min.css',import.meta.url),new URL('vendor/bootstrap.css',output));
if(!process.argv.includes('--full-app'))await writeFile(new URL('deployment-status.json',output),JSON.stringify({
  configured:false,connected:false,user:null,manage:false,websiteOnly:true
})+'\n');
await rm(new URL('../.build/',import.meta.url),{recursive:true,force:true});
console.log('Built prerendered React site in dist/.');
