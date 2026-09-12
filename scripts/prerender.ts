import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

async function prerender() {
  const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');
  
  if (!fs.existsSync(distIndexPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(distIndexPath, 'utf-8');

  // Render App component to HTML string
  const appHtml = renderToString(React.createElement(App));

  // Inject prerendered HTML inside <div id="root">...</div>
  const rootDivRegex = /<div id="root"><\/div>/;
  if (!rootDivRegex.test(template)) {
    console.warn('Could not find empty <div id="root"></div> in template');
  }

  const finalHtml = template.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(distIndexPath, finalHtml, 'utf-8');
  console.log('Successfully prerendered App into dist/index.html!');
}

prerender().catch((err) => {
  console.error('Error during prerender:', err);
  process.exit(1);
});
