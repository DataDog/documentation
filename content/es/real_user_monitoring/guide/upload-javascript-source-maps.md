---
description: Suba mapas del código fuente de JavaScript para mejorar el seguimiento
  de errores con trazas de pila legibles y una mejor depuración para el código minificado.
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentación
  text: Comience con el seguimiento de errores.
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualice sus datos de seguimiento de errores en el Explorador.
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: Código fuente
  text: Referencia de comandos de mapas del código fuente
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centro de aprendizaje
  text: Seguimiento de errores con RUM para aplicaciones web de JavaScript
title: Suba mapas del código fuente de JavaScript.
---
## Resumen {#overview}

Si su código fuente de JavaScript del lado del cliente está minificado, suba sus mapas del código fuente a Datadog para desofuscar las trazas de pila. Para cualquier error dado, puede acceder a la ruta del archivo, al número de línea y al fragmento de código para cada marco de la traza de pila relacionada. Datadog también puede vincular los marcos de la pila a su código fuente en su repositorio.

<div class="alert alert-info"><ul><li>Solo los errores recopilados por <a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a>, y registros de <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> pueden ser desminificados.</li><li>Para automatizar la subida de mapas del código fuente como parte de su proceso de construcción, consulte <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Build Plugins: Source Maps</a>.</li></ul></div>

## Instrumenta su código {#instrument-your-code}

Configure su empaquetador de JavaScript de tal manera que, al minificar su código fuente, se generen mapas de origen que incluyan directamente el código fuente relacionado en el `sourcesContent` atributo.

<div class="alert alert-danger">
Asegúrese de que el tamaño de cada mapa del código fuente aumentado con el tamaño del archivo minificado relacionado no exceda el límite de <b>500 MB</b>.
</div>

Consulta las siguientes configuraciones para empaquetadores de JavaScript populares.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Puede generar mapas del código fuente utilizando el complemento incorporado de webpack llamado [SourceMapDevToolPlugin][1].

Vea la configuración de ejemplo en su archivo `webpack.config.js`:

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**Nota**: Si está utilizando TypeScript, establezca `compilerOptions.sourceMap` en `true` en su archivo `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel genera mapas del código fuente por defecto al ejecutar el comando de construcción: `parcel build <entry file>`.

{{% /tab %}}
{{% tab "Vite" %}}

Puede generar mapas del código fuente configurando la opción `build.sourcemap` en su archivo `vite.config.js`.

Vea la configuración de ejemplo:

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // generates .js.map files
    minify: 'terser', // or 'esbuild'
  }
})
```

**Nota**: Si está utilizando TypeScript, asegúrese de que `compilerOptions.sourceMap` esté establecido en `true` en su archivo `tsconfig.json`.

{{% /tab %}}
{{< /tabs >}}

Después de construir su aplicación, los empaquetadores generan un directorio (típicamente llamado `dist`) con archivos JavaScript minificados ubicados junto a sus correspondientes mapas del código fuente.

Vea el siguiente ejemplo:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
Si la suma del tamaño del archivo para <code>javascript.364758.min.js</code> y <code>javascript.364758.js.map</code> excede el límite de <b>500 MB</b>, redúzcalo configurando su empaquetador para dividir el código fuente en múltiples fragmentos más pequeños. Para más información, consulte <a href="https://webpack.js.org/guides/code-splitting/">División de Código con WebpackJS</a>.
</div>

## Suba sus mapas del código fuente {#upload-your-source-maps}

La mejor manera de subir mapas del código fuente es agregar un paso adicional en su pipeline de CI y ejecutar el comando dedicado desde el [Datadog CLI][1]. Escanea el directorio `dist` y sus subdirectorios para cargar automáticamente los mapas del código fuente con los archivos minificados relevantes.

{{< site-region region="us" >}}
1. Agregue `@datadog/datadog-ci` a su archivo `package.json` (asegúrese de estar utilizando la última versión).
2. [Cree una clave API dedicada de Datadog][1] y expórtela como una variable de entorno llamada `DATADOG_API_KEY`.
3. Ejecute el siguiente comando una vez por servicio en su aplicación:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2" >}}
1. Agregue `@datadog/datadog-ci` a su archivo `package.json` (asegúrese de estar utilizando la última versión).
2. [Cree una clave API dedicada de Datadog][1] y expórtela como una variable de entorno llamada `DATADOG_API_KEY`.
3. Configure la CLI para cargar archivos en el {{<region-param key="dd_site_name">}} sitio exportando dos variables de entorno: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} y `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Ejecuta el siguiente comando una vez por servicio en tu aplicación:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Para minimizar la sobrecarga en el rendimiento de su CI, la CLI está optimizada para cargar tantos mapas del código fuente como necesite en un corto período de tiempo (típicamente unos pocos segundos).

**Nota**: Volver a cargar un mapa del código fuente no reemplaza el existente si la versión no ha cambiado.

Los parámetros `--service` y `--release-version` deben coincidir con las etiquetas `service` y `version` en sus eventos de seguimiento de errores, eventos de RUM y registros del navegador. Para más información sobre cómo configurar estas etiquetas, consulta la [documentación de inicialización del SDK del navegador][2] o la [documentación de recopilación de registros del navegador][3].

<div class="alert alert-info">Si ha definido múltiples servicios en su aplicación, ejecute el comando de CI tantas veces como servicios haya, incluso si tiene un conjunto de mapas de origen para toda la aplicación.</div>

Al ejecutar el comando contra el directorio de ejemplo `dist`, Datadog espera que su servidor o CDN entregue los archivos JavaScript en `https://hostname.com/static/js/javascript.364758.min.js` y `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Solo los mapas del código fuente con la extensión `.js.map` funcionan para desminificar correctamente las trazas de pila. Los mapas del código fuente con otras extensiones como `.mjs.map` son aceptados pero no desminifican las trazas de pila.

<div class="alert alert-info">Si está sirviendo los mismos archivos fuente de JavaScript desde diferentes subdominios, cargue el mapa del código fuente relacionado una vez y haga que funcione para múltiples subdominios utilizando la ruta de prefijo absoluto en lugar de la URL completa. Por ejemplo, especifique <code>/static/js</code> en lugar de <code>https://hostname.com/static/js</code>.</div>

Vea todos los símbolos subidos y administre sus mapas del código fuente en la página de [Explore RUM Debug Symbols][5].

### Vincule los marcos de pila a su código fuente {#link-stack-frames-to-your-source-code}

Si ejecuta `datadog-ci sourcemaps upload` dentro de un directorio de trabajo de Git, Datadog recopila metadatos del repositorio. El comando `datadog-ci` recopila la URL del repositorio, el hash del commit actual y la lista de rutas de archivos en el repositorio que se relacionan con sus mapas del código fuente. Para más detalles sobre la recopilación de metadatos de Git, consulte la [documentación de datadog-ci][4].

Datadog muestra enlaces a su código fuente en marcos de pila no minificados.

## Solucione errores con facilidad {#troubleshoot-errors-with-ease}

Sin acceso a la ruta del archivo y al número de línea, un rastro de pila minificado no es útil para solucionar problemas en su base de código. Además, el fragmento de código está minificado (lo que significa que hay una línea larga de código transformado), lo que dificulta más el proceso de solución de problemas.

El siguiente ejemplo muestra un rastro de pila minificado:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking Minified Stack Trace" >}}

Por otro lado, un rastro de pila no minificado le proporciona todo el contexto que necesita para una solución de problemas rápida y sin inconvenientes. Para los marcos de pila que se relacionan con su código fuente, Datadog también genera un enlace directo a su repositorio:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking Unminified Stack Trace" >}}

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/es/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum