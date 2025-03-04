import fs from 'fs';
import path from 'path';
import { removeLineBreaks } from '../utils';
import { HugoGlobalConfig } from '../schemas/config/hugo';

const stylesStr = fs.readFileSync(path.resolve(__dirname, 'styles.css'), 'utf8');

const clientFiltersManagerScriptStr = fs.readFileSync(
  path.resolve(__dirname, '../clientBundle/clientFiltersManager.min.js'),
  'utf8'
);

/**
 * Provide a string that includes the shared styles and scripts
 * required to display and re-render any page.
 * Any page-specific content or scripts are not included;
 * those are inline in the compiled files.
 */
export function buildSiteAssets(p: { hugoGlobalConfig: HugoGlobalConfig }) {
  let styles = removeLineBreaks(stylesStr);
  if (p.hugoGlobalConfig.env === 'development') {
    // Add focus ring styles in development mode
    styles += `
      html head *:focus,
      html body *:focus {
          outline: 4px auto -webkit-focus-ring-color !important;
      }`;
  }
  return `<style>${stylesStr}</style>
<script>${clientFiltersManagerScriptStr}</script>`;
}
