---
algolia:
  tags:
  - build plugins
  - webpack
  - vite
  - esbuild
  - rollup
  - rspack
  - bundler
description: Integre los complementos de compilación de Datadog con su empaquetador
  de JavaScript para automatizar la carga de mapas del código fuente, la desofuscación
  de nombres de acciones y otras tareas de RUM en el momento de la compilación.
further_reading:
- link: https://github.com/DataDog/build-plugins
  tag: Código fuente
  text: Repositorio de GitHub de complementos de compilación de Datadog
- link: /real_user_monitoring/application_monitoring/browser/setup/client
  tag: Documentación
  text: Configuración del lado del cliente del navegador RUM
title: Complementos de compilación
---
## Descripción general {#overview}

Los complementos de compilación de Datadog se integran con su empaquetador de JavaScript para automatizar tareas comunes de RUM durante su proceso de compilación. Están disponibles para webpack, Vite, esbuild, Rollup y Rspack.

Los complementos de compilación son complementarios al RUM Browser SDK. Aún necesita configurar el SDK como se describe en la [Configuración de monitoreo del navegador][1].

## Instalación {#installation}

Instale el paquete de complementos de compilación de Datadog para su empaquetador:

{{< tabs >}}
{{% tab "Webpack" %}}

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "Rollup" %}}

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

## Configuración {#configuration}

Las siguientes opciones de configuración compartidas se aplican a todos los complementos:

| Parámetro | Tipo | Requerido | Predeterminado | Descripción |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | Cadena | Sí (solo mapas del código fuente) | Ninguno | Su clave de Datadog API. También se puede establecer con la variable de entorno `DATADOG_API_KEY`. |
| `auth.site` | Cadena | No | `datadoghq.com` | Su sitio de Datadog. También se puede establecer con la variable de entorno `DATADOG_SITE` o `DD_SITE`. |
| `logLevel` | Cadena | No | `warn` | Nivel de verbosidad de registro. Uno de los siguientes: `debug`, `info`, `warn`, `error` o `none`. |

El siguiente ejemplo muestra la estructura de configuración completa:

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads by debug ID (see Source Maps plugin page)
  sourcemaps: { /* ... */ },
  // Source map uploads by service and version (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

`sourcemaps` y `errorTracking.sourcemaps` son mutuamente excluyentes: configure uno, según el método de coincidencia que elija. Consulte [mapas del código fuente][2] para obtener más detalles.

## Plugins disponibles {#available-plugins}

{{< whatsnext desc="Configure plugins de compilación individuales:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>Mapas del código fuente</u>: cargue automáticamente los mapas del código fuente en Datadog durante la compilación, permitiendo trazas de pila desofuscadas.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation" >}}<u>Desofuscación de nombres de acción</u>: restaure nombres de acción legibles en compilaciones minificadas.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>Contexto del código fuente</u>: muestre el código fuente en línea en las trazas de pila de Error Tracking.{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
[2]: /es/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/