---
description: Cargue los mapas del código fuente de JavaScript para mejorar Error Tracking
  con trazas de pila legibles y una mejor depuración para código minificado.
further_reading:
- link: /real_user_monitoring/error_tracking
  tag: Documentación
  text: Comience con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualice sus datos de Error Tracking en el explorador
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centro de aprendizaje
  text: Seguimiento de errores con RUM para aplicaciones web JavaScript
- link: https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/
  tag: Blog
  text: Una guía práctica para el monitoreo de errores en React
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
  tag: Código fuente
  text: Referencia del comando de mapas del código fuente
title: Cargue los mapas del código fuente de JavaScript
---
## Descripción general {#overview}

Si su código fuente de JavaScript de front-end está minificado, cargue sus mapas del código fuente en Datadog para desofuscar sus diferentes trazas de pila. Para cualquier error determinado, puede acceder a la ruta del archivo, el número de línea y el fragmento de código para cada marco de la traza de pila relacionada. Datadog también puede vincular marcos de la traza de pila a su código fuente en su repositorio.

<div class="alert alert-info"><ul><li>Solo los errores recopilados por <a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> y los registros de <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> pueden desminificarse.</li><li>Para automatizar las cargas de mapas del código fuente como parte de su proceso de compilación, consulte <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps">Build Plugins: Source Maps</a>.</li></ul></div>

## Instrumente su código {#instrument-your-code}

Configure su empaquetador de JavaScript de tal manera que, al minificar su código fuente, genere mapas del código fuente que incluyan directamente el código fuente relacionado en el atributo `sourcesContent`.

<div class="alert alert-danger">
Asegúrese de que el tamaño de cada mapa del código fuente aumentado con el tamaño del archivo minificado relacionado no exceda el límite de <b>500 MB</b>.
</div>

Consulte las siguientes configuraciones para los empaquetadores de JavaScript populares.

{{< tabs >}}
{{% tab "WebpackJS" %}}

Puede generar mapas del código fuente utilizando el complemento integrado de webpack llamado [SourceMapDevToolPlugin][1].

Consulte la configuración de ejemplo en su archivo `webpack.config.js`:

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

Parcel genera mapas del código fuente de forma predeterminada cuando ejecuta el comando de compilación: `parcel build <entry file>`.

{{% /tab %}}
{{% tab "Vite" %}}

Puede generar mapas del código fuente configurando la opción `build.sourcemap` en su archivo `vite.config.js`.

Consulte el ejemplo de configuración:

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

**Nota**: Si está utilizando TypeScript, asegúrese de que `compilerOptions.sourceMap` esté configurado en `true` en su archivo `tsconfig.json`.

{{% /tab %}}
{{< /tabs >}}

Después de compilar su aplicación, los empaquetadores generan un directorio (normalmente llamado `dist`) con archivos JavaScript minificados ubicados junto con sus mapas del código fuente correspondientes.

Consulte el siguiente ejemplo:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
Si la suma del tamaño del archivo para <code>javascript.364758.min.js</code> y <code>javascript.364758.js.map</code> excede el límite de <b>500 MB</b>, redúzcala configurando su empaquetador para dividir el código fuente en varios fragmentos más pequeños. Para obtener más información, consulte <a href="https://webpack.js.org/guides/code-splitting/">División de código con WebpackJS</a>.
</div>

## Cargue sus mapas del código fuente {#upload-your-source-maps}

Para cargar sus mapas del código fuente, elija uno de los siguientes métodos de coincidencia: ID de depuración (recomendado) o servicio y versión. Los ID de depuración permiten la resolución de mapas del código fuente en micro frontends.

{{< tabs >}}
{{% tab "ID de depuración (recomendado)" %}}

Los ID de depuración asocian un paquete de JavaScript con su mapa del código fuente sin depender de la URL del paquete, el servicio o la versión de lanzamiento.

Elija uno de los siguientes métodos de carga.

#### Complementos de compilación de Datadog {#datadog-build-plugins}

Los complementos de compilación de Datadog pueden inyectar ID de depuración y cargar mapas del código fuente directamente durante la compilación. No necesita instalar ni ejecutar `datadog-ci` por separado.

La compatibilidad con ID de depuración requiere [Datadog Build Plugins versión 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) o posterior.

Habilite la inyección de ID de depuración y la carga de mapas del código fuente en su complemento de compilación:

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  sourcemaps: {
    debugId: true,
    upload: true,
  },
});
```

El complemento carga cada mapa del código fuente con el ID de depuración inyectado en su paquete de JavaScript correspondiente.

Este ejemplo utiliza webpack. Consulte [Datadog Build Plugins][8] para obtener instrucciones de instalación y configuración para otros empaquetadores compatibles.

#### `datadog-ci` {#datadog-ci}

La compatibilidad con ID de depuración requiere [`@datadog/datadog-ci` la versión 5.24.0](https://github.com/DataDog/datadog-ci/releases/tag/v5.24.0) o posterior.

1. Agregue `@datadog/datadog-ci` a su archivo `package.json` (asegúrese de estar utilizando la versión más reciente).
2. [Cree una clave de API de Datadog dedicada][6] y expórtela como una variable de entorno llamada `DD_API_KEY`.
3. Para sitios distintos a US1, configure la CLI exportando `DD_SITE` con su [sitio de Datadog][7].
4. Inyecte los ID de depuración después de la compilación:

   ```bash
   datadog-ci sourcemaps inject /path/to/dist
   ```

5. Cargue los mapas del código fuente y los paquetes de JavaScript correspondientes:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist --debug-id
   ```

No pase `--service`, `--release-version` o `--minified-path-prefix` con `--debug-id`.

El comando `inject` modifica los paquetes de JavaScript y los mapas del código fuente en el lugar. Ejecútelo después de la compilación y antes de generar artefactos dependientes de bytes, como hashes SRI, activos comprimidos, firmas o manifiestos de suma de comprobación. Implemente los mismos artefactos modificados que cargue.

[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /es/getting_started/site/
[8]: /es/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/

{{% /tab %}}
{{% tab "Servicio y versión" %}}

Para cargar mapas del código fuente utilizando un servicio y una versión, agregue un paso adicional a su canalización de CI que ejecute el comando `datadog-ci sourcemaps upload`. Escanea el directorio `dist` y sus subdirectorios para cargar automáticamente los mapas del código fuente con los archivos minificados relevantes.

{{< site-region region="us" >}}
1. Agregue `@datadog/datadog-ci` a su archivo `package.json` (asegúrese de estar utilizando la versión más reciente).
2. [Cree una clave de API de Datadog dedicada][1] y expórtela como una variable de entorno llamada `DD_API_KEY`.
3. Ejecute el siguiente comando una vez por servicio en su aplicación:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2,uk1" >}}
1. Agregue `@datadog/datadog-ci` a su archivo `package.json` (asegúrese de estar utilizando la versión más reciente).
2. [Cree una clave de API de Datadog dedicada][1] y expórtela como una variable de entorno llamada `DD_API_KEY`.
3. Configure la CLI para cargar archivos al {{<region-param key="dd_site_name">}} sitio exportando dos variables de entorno: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} y `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Ejecute el siguiente comando una vez por servicio en su aplicación:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

Para minimizar la sobrecarga en el rendimiento de su CI, la CLI está optimizada para cargar tantos mapas del código fuente como necesite en un corto período de tiempo (normalmente unos pocos segundos).

**Nota**: Volver a cargar un mapa del código fuente no sobrescribe el existente si la versión no ha cambiado.

Los parámetros `--service` y `--release-version` deben coincidir con las etiquetas `service` y `version` en sus eventos de Error Tracking, eventos de RUM y registros de navegador. Para obtener más información sobre cómo configurar estas etiquetas, consulte la [Browser SDK initialization documentation][2] o la [Browser Logs Collection documentation][3].

<div class="alert alert-info">Si ha definido varios servicios en su aplicación, ejecute el comando de CI tantas veces como servicios haya, incluso si tiene un conjunto de mapas del código fuente para toda la aplicación.</div>

Al ejecutar el comando en el directorio de ejemplo `dist`, Datadog espera que su servidor o CDN entregue los archivos JavaScript en `https://hostname.com/static/js/javascript.364758.min.js` y `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Solo los mapas del código fuente con la extensión `.js.map` funcionan para desminificar correctamente las trazas de pila. Los mapas del código fuente con otras extensiones como `.mjs.map` se aceptan, pero no desminifican las trazas de pila.

<div class="alert alert-info">Si está sirviendo los mismos archivos de código fuente JavaScript desde diferentes subdominios, cargue el mapa del código fuente relacionado una vez y haga que funcione para múltiples subdominios utilizando la ruta de prefijo absoluta en lugar de la URL completa. Por ejemplo, especifique <code>/static/js</code> en lugar de <code>https://hostname.com/static/js</code>.</div>

[2]: /es/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[3]: /es/logs/log_collection/javascript/#initialization-parameters

{{% /tab %}}
{{< /tabs >}}

Vea todos los símbolos cargados y administre sus mapas del código fuente en la página [{{< ui >}}Explore RUM Debug Symbols{{< /ui >}}][5].

### Vincule los marcos de la traza de pila a su código fuente {#link-stack-frames-to-your-source-code}

Si ejecuta `datadog-ci sourcemaps upload` dentro de un directorio de trabajo de Git, Datadog recopila metadatos del repositorio. El comando `datadog-ci` recopila la URL del repositorio, el hash de confirmación actual y la lista de rutas de archivo en el repositorio que se relacionan con sus mapas del código fuente. Para obtener más detalles sobre la recopilación de metadatos de Git, consulte la [documentación de datadog-ci][4].

Datadog muestra enlaces a su código fuente en marcos de la traza de pila no minificados.

## Solución de problemas de cargas de ID de depuración {#troubleshooting-debug-id-uploads}

### Inspeccionar mapas del código fuente locales {#inspect-local-source-maps}

Para encontrar el mapa del código fuente local para un ID de depuración específico, ejecute:

```bash
datadog-ci sourcemaps find /path/to/dist --debug-id 12345678-1234-1234-1234-123456789abc
```

Para encontrar mapas del código fuente que no contienen un ID de depuración, ejecute:

```bash
datadog-ci sourcemaps find /path/to/dist --missing-debug-id
```

El comando `find` solo inspecciona archivos `*.js.map` locales. No confirma si Datadog recibió un artefacto.

## Solucione errores con facilidad {#troubleshoot-errors-with-ease}

Sin acceso a la ruta del archivo y al número de línea, una traza de pila minificada no es útil para solucionar problemas en su base de código. Además, el fragmento de código está minificado (lo que significa que hay una línea larga de código transformado), lo que dificulta el proceso de solución de problemas.

El siguiente ejemplo muestra una traza de pila minificada:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Traza de pila minificada de Error Tracking" >}}

Por otro lado, una traza de pila no minificada le proporciona todo el contexto que necesita para una solución de problemas rápida y sin inconvenientes. Para los marcos de pila relacionados con su código fuente, Datadog también genera un enlace directo a su repositorio:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Traza de pila no minificada de Error Tracking" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum