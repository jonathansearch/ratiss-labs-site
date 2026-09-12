import fs from 'node:fs';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../.prerender/App.mjs';

const dist = path.resolve('dist');
const templatePath = path.join(dist, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');
const markup = renderToString(React.createElement(App));
fs.writeFileSync(templatePath, template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
