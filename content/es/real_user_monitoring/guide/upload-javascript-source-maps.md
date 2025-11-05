---
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentación
  text: Comenzar con rastreo de errores
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualización de tus datos de rastreo de errores en el Explorer
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: Código fuente
  text: Referencia del comando Sourcemaps
title: Carga de mapas de fuente de JavaScript
---

## Información general

Si el código fuente de tu frontend JavaScript está minificado, carga tus mapas de fuente a Datadog para deenmascarar tus diferentes stack traces. Para cualquier error dado, puedes acceder a la ruta del archivo, el número de línea y el fragmento de código para cada marco del stack trace relacionado. Datadog también puede vincular marcos de stack a tu código fuente en tu repositorio.

<div class="alert alert-info">Solo pueden desminificarse los errores recopilados por <a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> y logs de <a href="/logs/log_collection/javascript/">Browser Logs Collection</a>.</div>

## Instrumentar tu código

Configura tu empaquetador de JavaScript para que, al minificar tu código fuente, genere mapas de fuente que incluyan directamente el código fuente relacionado en el atributo `sourcesContent`.

<div class="alert alert-danger">
Asegúrate de que el tamaño de cada mapa fuente aumentado con el tamaño del archivo minificado relacionado no supere el límite de **500 MB**.
</div>

Consulta las siguientes configuraciones para los empaquetadores más populares de JavaScript.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Puedes generar mapas de fuente utilizando el complemento webpack integrado llamado [SourceMapDevToolPlugin][1].

Consulta el ejemplo de configuración en tu archivo `webpack.config.js`:

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

**Nota**: Si utilizas TypeScript, establece `compilerOptions.sourceMap` en `true` en tu archivo `tsconfig.json`.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel genera mapas de fuente por defecto cuando se ejecuta el comando build: `parcel build <entry file>`.

{{% /tab %}}
{{< /tabs >}}

Tras compilar la aplicación, los empaquetadores generan un directorio (normalmente denominado `dist`) con los archivos JavaScript minificados junto con sus correspondientes mapas de fuente.

Consulta el siguiente ejemplo:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
Si la suma del tamaño de los archivos <code>javascript.364758.min.js</code> y <code>javascript.364758.js.map</code> supera el límite de <b>500 MB</b>, redúcelo configurando el empaquetador para dividir el código fuente en varios fragmentos más pequeños. Para obtener más información, consulta <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
</div>

## Cargar tus mapas de fuente

La mejor manera de cargar mapas de fuente es añadir un paso adicional en tu pipeline de CI y ejecutar el comando dedicado desde la [CLI de Datadog][1]. Explora el directorio `dist` y tus subdirectorios para cargar automáticamente los mapas de fuente con los archivos minificados pertinentes.

{{< site-region region="us" >}}
1. Añade `@datadog/datadog-ci` a tu archivo `package.json` (asegúrate de estar utilizando la última versión).
2. [Crea una clave de API dedicada de Datadog][1] y expórtala como una variable de entorno denominada `DATADOG_API_KEY`.
3. Ejecuta el siguiente comando una vez por servicio en tu aplicación:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,ap1,ap2" >}}
1. Añade `@datadog/datadog-ci` a tu archivo `package.json` (asegúrate de estar utilizando la última versión).
2. [Crea una clave de API dedicada de Datadog][1] y expórtala como una variable de entorno denominada `DATADOG_API_KEY`.
3. Configura la CLI para cargar archivos al sitio {{<region-param key="dd_site_name">}} exportando dos variables de entorno: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} y `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Ejecuta el siguiente comando una vez por servicio en tu aplicación:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Para minimizar la sobrecarga en el rendimiento de tu CI, la CLI está optimizada para cargar tantos mapas de fuente como necesites en un breve espacio de tiempo (normalmente unos segundos).

**Nota**: Volver a cargar un mapa de fuente no anula el existente si la versión no ha cambiado.

Los parámetros `--service` y `--release-version` deben coincidir con las etiquetas (tags) `service` y `version` de tus eventos de Error Tracking, eventos de RUM y logs del navegador. Para más información sobre cómo configurar estas etiquetas, consulta la [documentación inicial del SDK del navegador][2] o la [documentación de la recopilación de logs del navegador][3].

<div class="alert alert-info">Si has definido varios servicios en tu aplicación, ejecuta el comando CI tantas veces como haya servicios, incluso si tienes un conjunto de mapas fuente para toda la aplicación.</div>

Al ejecutar el comando contra el directorio de ejemplo `dist`, Datadog espera que tu servidor o CDN entregue los archivos JavaScript en `https://hostname.com/static/js/javascript.364758.min.js` y `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Solo los mapas de fuente con la extensión `.js.map` funcionan para desminificar correctamente los stack traces. Los mapas de fuente con otras extensiones como `.mjs.map` se aceptan, pero no desminifican los stack traces.

<div class="alert alert-info">Si estás proporcionando los mismos archivos fuente JavaScript desde diferentes subdominios, carga el mapa de fuente relacionado una vez y haz que funcione para múltiples subdominios utilizando la ruta de prefijo absoluta en lugar de la URL completa. Por ejemplo, especifica <code>/static/js</code> en lugar de <code>https://hostname.com/static/js.</code></div>

### Vincular los marcos de stack a tu código fuente

Si ejecutas `datadog-ci sourcemaps upload` dentro de un directorio de trabajo de Git, Datadog recopila los metadatos del repositorio. El comando `datadog-ci` recopila la URL del repositorio, el hash de la confirmación actual y la lista de rutas de archivos en el repositorio que se relacionan con tus mapas de fuente. Para más detalles sobre la recopilación de metadatos de Git, consulta la [documentación de datadog-ci][4].

Datadog muestra enlaces a tu código fuente en marcos de stack sin minificar.

## Solucionar los errores con facilidad

Sin acceso a la ruta del archivo y al número de línea, un stack trace minificado no es útil para solucionar problemas de tu base de código. Además, el fragmento de código está minificado (lo que significa que hay una sola línea larga de código transformado), lo que dificulta el proceso de solución de problemas.

El siguiente ejemplo muestra un stack trace minificado:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Rastreo de errores de stack trace minificado" >}}

Por otro lado, un stack trace sin minificar te proporciona todo el contexto que necesitas para solucionar problemas de forma rápida y fluida. Para los marcos de stack relacionados con tu código fuente, Datadog también genera un enlace directo a tu repositorio:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Rastreo de errores de stack trace sin minificar" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/es/real_user_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/es/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#link-errors-with-your-source-code
