---
aliases:
- /es/tracing/nodejs/
- /es/tracing/languages/nodejs/
- /es/tracing/languages/javascript/
- /es/tracing/setup/javascript/
- /es/agent/apm/nodejs/
- /es/tracing/setup/nodejs
- /es/tracing/setup_overview/nodejs
- /es/tracing/setup_overview/setup/nodejs
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
  text: Documentación de la API
- link: tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: tracing/
  tag: Documentación
  text: Uso avanzado
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centro de aprendizaje
  text: Configure y administre el SDK de APM para sus aplicaciones
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente
title: Seguimiento de aplicaciones Node.js
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

La versión más reciente del rastreador de Node.js es compatible con las versiones `>=18` de Node.js. Para obtener una lista completa de la compatibilidad de versiones y frameworks de Node.js de Datadog (incluidas las versiones heredadas y de mantenimiento), consulte la página [Requisitos de compatibilidad][1].

## Primeros pasos {#getting-started}

Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][13]. Luego, complete los siguientes pasos para agregar el SDK de Datadog a su aplicación Node.js para instrumentarla.

### Instale el SDK de Datadog {#install-the-datadog-sdk}

Para instalar el SDK de Datadog usando npm para Node.js 18+, ejecute:

  ```shell
  npm install dd-trace
  ```
Para instalar el SDK de Datadog (versión 4.x de `dd-trace`) para la versión 16 de Node.js que ha llegado al final de su vida útil, ejecute:
  ```shell
  npm install dd-trace@latest-node16
  ```
Para obtener más información sobre las etiquetas de distribución de Datadog y la compatibilidad con versiones del entorno de ejecución de Node.js, consulte la página [Requisitos de compatibilidad][1].
Si está actualizando desde una versión principal anterior de la biblioteca (0.x, 1.x, 2.x, 3.x o 4.x) a otra versión principal, lea la [Guía de migración][5] para evaluar cualquier cambio incompatible.

<div class="alert alert-info">En entornos Serverless o cuando utiliza Single-Step Instrumentation, la biblioteca ya está preinstalada, por lo que no necesita agregarla como dependencia. En su lugar, agréguela como una dependencia de desarrollo para obtener el rastreo localmente:
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># instead of `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">Copy</button>
    </div>
  </div>
</div>

### Instale la API pública de Datadog (opcional) {#install-the-datadog-public-api-optional}

Este paso solo es necesario cuando se realiza una instrumentación personalizada en Serverless o con Single-Step Instrumentation. Para otros casos de uso de instrumentación personalizada, es opcional. Para obtener información sobre cuándo utilizar la API pública de Datadog, consulte [Instrumentación personalizada mediante la Datadog API][14].

  ```shell
  npm install dd-trace-api
  ```

Luego puede importar `dd-trace-api` en lugar de `dd-trace` en cualquier código que realice una instrumentación personalizada.

### Importe e inicialice el rastreador {#import-and-initialize-the-tracer}

Importe e inicialice el rastreador ya sea en el código o con argumentos de línea de comandos. El SDK de Node.js debe importarse e inicializarse **antes** de cualquier otro módulo.

<div class="alert alert-info">Con marcos de trabajo como <strong>Next.js</strong> y <strong>Nest.js</strong> debe proporcionar una variable de entorno o agregar una bandera de Node.js adicional. Consulte <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">Uso de marcos de trabajo complejos</a> para obtener más información.</div>

Después de completar la configuración, si no recibe trazas completas, incluidas las rutas de URL faltantes para las solicitudes web, o spans desconectados o faltantes, **confirme que el SDK se haya importado e inicializado correctamente**. Es necesario que el SDK se inicialice primero para que pueda aplicar parches correctamente a todas las bibliotecas requeridas para la instrumentación automática.

Cuando utilice un transpilador como TypeScript, Webpack, Babel u otros, importe e inicialice el SDK en un archivo externo y luego importe ese archivo completo al compilar su aplicación.

#### Agregue el SDK con argumentos de línea de comandos {#add-the-sdk-with-command-line-arguments}

Utilice la opción `--require` de Node.js para cargar e inicializar el SDK en un solo paso.

```sh
node --require dd-trace/init app.js
```

El enfoque anterior requiere el uso de variables de entorno para toda la configuración del SDK. Si necesita utilizar una configuración programática, inicialice `dd-trace` en un archivo dedicado y, en su lugar, cargue ese archivo con require:

```sh
node --require ./dd-trace.js app.js
```

El archivo debe contener esto:

```js
// ./dd-trace.js
require('dd-trace').init({
  // programmatic config
})
```

Para los casos en los que no sea posible controlar los argumentos de la CLI, puede utilizar una variable de entorno en su lugar:

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> es <code>true</code> de forma predeterminada, lo que significa que cierta instrumentación ocurre al momento de la importación, antes de la inicialización. Para deshabilitar completamente la instrumentación, puede hacer una de las siguientes cosas:
  <ul>
    <li>Importe el módulo de forma condicional</li>
    <li>Establezca <code>DD_TRACE_ENABLED=false</code> (si, por ejemplo, las importaciones ESM estáticas o de nivel superior impiden la carga condicional)</li>
  <ul>
</div>

#### Solo aplicaciones ESM: Importe el cargador {#esm-applications-only-import-the-loader}

Las aplicaciones de módulos ECMAScript (ESM) requieren un argumento de línea de comandos _adicional_. Agregue este argumento independientemente de cómo se importe e inicialice el SDK de otra manera:

- **Node.js < v20.6:** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6:** `--import dd-trace/register.js`

Por ejemplo, en Node.js 22, si inicializa el SDK usando la opción uno de arriba, lo iniciaría así:

```sh
node --import dd-trace/register.js app.js
```

Esto también se puede combinar con el argumento de línea de comandos `--require dd-trace/init`:

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Existe una forma abreviada para combinar ambos argumentos de línea de comandos en Node.js v20.6 y versiones posteriores:

```sh
node --import dd-trace/initialize.mjs app.js
```

### Empaquetado {#bundling}

`dd-trace` funciona interceptando las llamadas `require()` que realiza una aplicación de Node.js al cargar módulos. Esto incluye módulos integrados en Node.js, como el módulo `fs` para acceder al sistema de archivos, así como módulos instalados desde el registro de NPM, como el módulo de base de datos `pg`.

Los empaquetadores rastrean todas las llamadas `require()` que una aplicación realiza en los archivos del disco. Reemplaza las llamadas `require()` con código personalizado y combina todo el JavaScript resultante en un solo archivo "empaquetado". Cuando se carga un módulo integrado, como `require('fs')`, esa llamada puede permanecer igual en el paquete resultante.

Las herramientas de APM como `dd-trace` dejan de funcionar en este punto. Pueden seguir interceptando las llamadas para los módulos integrados, pero no interceptan las llamadas a bibliotecas de terceros. Esto significa que cuando empaqueta una aplicación `dd-trace` con un empaquetador, es probable que capture información sobre el acceso al disco (a través de `fs`) y las solicitudes HTTP salientes (a través de `http`), pero omita las llamadas a bibliotecas de terceros. Por ejemplo:
- Extracción de información de ruta de solicitud entrante para el marco `express`.
- Mostrando qué consulta se ejecuta para el cliente de base de datos `mysql`.

Una solución común es tratar todos los módulos de terceros que el APM necesita instrumentar como "externos" al empaquetador. Con esta configuración, los módulos instrumentados permanecen en el disco y continúan cargándose con `require()` mientras que los módulos no instrumentados se empaquetan. Sin embargo, esto da como resultado una compilación con muchos archivos innecesarios y comienza a ir en contra del propósito del empaquetado.

Datadog recomienda que tenga complementos de empaquetador personalizados. Estos complementos pueden indicar al empaquetador cómo comportarse, inyectar código intermedio e interceptar las llamadas `require()` "traducidas". Como resultado, se incluyen más paquetes en el archivo JavaScript empaquetado.

**Nota**: Algunas aplicaciones pueden tener el 100% de los módulos empaquetados; sin embargo, los módulos nativos aún deben permanecer externos al paquete.

#### Empaquetado con esbuild {#bundling-with-esbuild}

Esta biblioteca proporciona soporte para esbuild en forma de un complemento de esbuild y requiere al menos Node.js v16.17 o v18.7. Para usar el complemento, asegúrese de tener instalado `dd-trace@3+` y luego requiera el módulo `dd-trace/esbuild` al crear su paquete.

Aquí hay un ejemplo de cómo se podría usar `dd-trace` con esbuild:

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16'],
  external: [
    // required if you use native metrics
    '@datadog/native-metrics',

    // required if you use profiling
    '@datadog/pprof',

    // required if you use Datadog security features
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/wasm-js-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Empaquetado con Webpack {#bundling-with-webpack}

Esta biblioteca proporciona soporte experimental para Webpack en forma de un complemento de Webpack. Para usar el complemento, asegúrese de tener instalado `dd-trace@5.94.0+` y luego requiera el módulo `dd-trace/webpack` al crear su paquete.

El siguiente ejemplo muestra cómo usar `dd-trace` con Webpack:

```javascript
const path = require('path')
const webpack = require('webpack')
const DatadogWebpackPlugin = require('dd-trace/webpack')

const compiler = webpack({
  entry: 'main.js',
  target: 'node',
  externalsType: 'commonjs',
  output: {
    filename: 'out.js',
    path: __dirname,
    hashFunction: 'sha256',
  },
  externals: [
    // Node.js built-in not in Webpack's default list for target: 'node'
    'diagnostics_channel',

    // dead code paths introduced by knex
    'pg',
    'mysql2',
    'better-sqlite3',
    'sqlite3',
    'mysql',
    'oracledb',
    'pg-query-stream',
    'tedious',
    '@yaacovcr/transform',

    // optional native dd-trace modules
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-metrics',
    '@datadog/pprof',
    '@datadog/libdatadog',
  ],
  plugins: [
    new DatadogWebpackPlugin(),
  ],
})
```

#### Empaquetado con Next.js {#bundling-with-nextjs}

Si está utilizando Next.js para empaquetar su aplicación, agregue una declaración
similar a la de Webpack dentro de su archivo de configuración `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... non-relevant parts omitted, substitute your own config ...

  // this custom webpack config is required for Datadog tracing to work
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const externals = [
      // required if you use native metrics
      '@datadog/native-metrics',

      // required if you use profiling
      '@datadog/pprof',

      // required if you use Datadog security features
      '@datadog/native-appsec',
      '@datadog/native-iast-taint-tracking',
      '@datadog/wasm-js-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Funciones de Datadog no compatibles {#unsupported-datadog-features}

Las siguientes funciones están desactivadas de forma predeterminada en el trazador de Node.js. No admiten empaquetado y no se pueden usar si su aplicación está empaquetada.

- APM: Dynamic Instrumentation

#### Observaciones generales sobre el empaquetado {#general-bundling-remarks}

**Nota**: Debido al uso de módulos nativos en el SDK, que son código C++ compilado (y generalmente tienen una extensión de archivo `.node`), debe agregar entradas a su lista `external`. Actualmente, los módulos nativos utilizados en el trazador de Node.js residen dentro de paquetes con el prefijo `@datadog`. Esto también requerirá que envíe un directorio `node_modules/` junto con su aplicación empaquetada. No necesita enviar todo su directorio `node_modules/`, ya que contendría muchos paquetes superfluos que deberían estar contenidos en su paquete.

Para generar un directorio `node_modules/` más pequeño solo con los módulos nativos requeridos (y sus dependencias), primero puede determinar las versiones de los paquetes que necesita, luego crear un directorio temporal en el cual instalarlos y copiar el directorio `node_modules/` resultante de este. Por ejemplo:

```sh
cd path/to/project
npm ls @datadog/native-metrics
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/native-metrics@2.0.0
$ npm ls @datadog/pprof
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/pprof@5.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-metrics@2.0.0 @datadog/pprof@5.0.0
cp -R ./node_modules path/to/bundle
```

**Nota**: En el caso de Next.js, el `path/to/bundle` suele ser el directorio `.next/standalone` de su aplicación.

En esta etapa debería poder desplegar su paquete (que es el código de su aplicación y la mayoría de sus dependencias) con el directorio `node_modules/`, que contiene los módulos nativos y sus dependencias.

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][4] para obtener detalles.

Lea [configuración del trazador][3] para obtener una lista de opciones de inicialización.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /es/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /es/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /es/tracing/trace_collection/library_injection_local/
[13]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[14]: /es/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js