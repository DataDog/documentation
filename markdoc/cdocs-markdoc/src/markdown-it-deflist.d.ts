/**
 * CDOCS-MODIFICATIONS
 *
 * Support for definition lists has been added to this package
 * using the markdown-it-deflist plugin. This file provides
 * TypeScript support for the plugin.
 */
declare module 'markdown-it-deflist' {
  import { PluginWithOptions } from 'markdown-it/lib';

  const deflist: PluginWithOptions<{}>;
  export default deflist;
}
