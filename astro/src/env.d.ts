/// <reference types="astro/client" />

declare const __CI_ENV__: string;

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server';
  const Component: AstroComponentFactory;
  export default Component;
}

declare module '*?raw' {
  const content: string;
  export default content;
}
