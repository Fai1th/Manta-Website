import { cp, copyFile, mkdir, rm, writeFile } from 'node:fs/promises';

// The static Vercel site never starts the bot or reads its runtime credentials.
const output=new URL('../dist/',import.meta.url);
await rm(output,{recursive:true,force:true});
await cp(new URL('../public/',import.meta.url),output,{recursive:true});
await mkdir(new URL('vendor/',output),{recursive:true});
await copyFile(new URL('../node_modules/bootstrap/dist/css/bootstrap.min.css',import.meta.url),new URL('vendor/bootstrap.css',output));
await writeFile(new URL('deployment-status.json',output),JSON.stringify({
  configured:false,connected:false,user:null,manage:false,websiteOnly:true
})+'\n');
console.log('Built static Manta site in dist/. Bot backend is not connected.');
