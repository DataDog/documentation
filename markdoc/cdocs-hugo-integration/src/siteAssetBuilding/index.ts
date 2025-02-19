import fs from 'fs';
import path from 'path';
import { removeLineBreaks } from '../utils';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'styles.css'), 'utf8');

const clientFiltersManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, '../compiledScripts/clientFiltersManager.min.js'),
  'utf8'
);

/**
 * Provide the CSS styles for the rendered page.
 * If debug mode is enabled, include additional styles
 * to reveal hidden elements on the page.
 */
export function getStylesStr() {
  return removeLineBreaks(stylesStr);
}

/**
 * Provide the JavaScript code for the ClientFiltersManager.
 */
export function getClientFiltersManagerScriptStr() {
  return clientFiltersManagerScriptStr;
}
