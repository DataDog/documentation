import lazyChunkUrl from "chunk-url:./lazy.js";

// Side effects, so the app build keeps this code: it drops entry exports.
console.log(lazyChunkUrl);
console.log(() => import("./lazy.js"));
