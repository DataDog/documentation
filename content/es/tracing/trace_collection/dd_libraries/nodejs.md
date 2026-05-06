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
- link: https://github.com/DataDog/dd-trace-js
  tag: Código Fuente
  text: Código Fuente
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
  text: Documentación de la API
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: tracing/
  tag: Documentación
  text: Uso avanzado
title: Trazando aplicaciones de Node.js
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

El último rastreador de Node.js es compatible con las versiones de Node.js `>=18`. Para una lista completa del soporte de versiones y marcos de Node.js de Datadog (incluyendo versiones heredadas y de mantenimiento), consulta la página de [Requisitos de compatibilidad][1].

## Comenzando {#getting-started}

Antes de comenzar, asegúrate de haber [instalado y configurado el Agente][13]. Luego, completa los siguientes pasos para agregar el SDK de Datadog a tu aplicación de Node.js para instrumentarla.

### Instala el SDK de Datadog {#install-the-datadog-sdk}

Para instalar el SDK de Datadog usando npm para Node.js 18+, ejecuta:

  ```shell
  npm install dd-trace
  ```
Para instalar el SDK de Datadog (versión 4.x de `dd-trace`) para la versión de Node.js 16 que ha llegado al final de su vida útil, ejecuta:
  ```shell
  npm install dd-trace@latest-node16
  ```
Para más información sobre las etiquetas de distribución de Datadog y el soporte de versiones del runtime de Node.js, consulta la página de [Requisitos de compatibilidad][1].
Si estás actualizando desde una versión principal anterior de la biblioteca (0.x, 1.x, 2.x, 3.x o 4.x) a otra versión principal, lee la [Guía de Migración][5] para evaluar cualquier cambio que rompa la compatibilidad.

<div class="alert alert-info">En entornos Serverless o al usar Instrumentación de Un Solo Paso, la biblioteca ya está preinstalada, por lo que no necesita agregarla como una dependencia. En su lugar, agréguela como una dependencia de desarrollo para obtener trazas localmente:
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># en lugar de `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">Copiar</button>
    </div>
  </div>
</div>

### Instale la API pública de Datadog (opcional) {#install-the-datadog-public-api-optional}

Este paso solo es necesario al realizar instrumentación personalizada en Serverless o con Instrumentación de Un Solo Paso. Para otros casos de uso de instrumentación personalizada, es opcional. Para información sobre cuándo usar la API pública de Datadog, consulte [Instrumentación Personalizada usando la API de Datadog][14].

  ```shell
  npm install dd-trace-api
  ```

Luego puede importar `dd-trace-api` en lugar de `dd-trace` en cualquier código que realice instrumentación personalizada.

### Importe e inicialice el rastreador {#import-and-initialize-the-tracer}

Importe e inicialice el rastreador ya sea en el código o con argumentos de línea de comandos. El SDK de Node.js necesita ser importado e inicializado **antes** de cualquier otro módulo.

<div class="alert alert-info">Con frameworks como <strong>Next.js</strong> y <strong>Nest.js</strong>, debes proporcionar una variable de entorno o agregar un flag adicional de Node.js. Consulta <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">Uso complejo de frameworks</a> para más información.</div>

Después de completar la configuración, si no estás recibiendo trazas completas, incluyendo rutas URL faltantes para solicitudes web, o tramos desconectados o faltantes, **confirma que el SDK ha sido importado e inicializado correctamente**. Es necesario inicializar primero el SDK para que pueda parchear correctamente todas las bibliotecas requeridas para la instrumentación automática.

Al usar un transpiler como TypeScript, Webpack, Babel u otros, importa e inicializa el SDK en un archivo externo y luego importa ese archivo completo al construir tu aplicación.

#### Agrega el SDK con argumentos de línea de comandos {#add-the-sdk-with-command-line-arguments}

Usa la opción `--require` de Node.js para cargar e inicializar el SDK en un solo paso.

```sh
node --require dd-trace/init app.js
```

El enfoque anterior requiere el uso de variables de entorno para toda la configuración del SDK. Si necesitas usar una configuración programática, inicializa `dd-trace` en un archivo dedicado y requiérelo en su lugar:

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

Para casos donde no es posible controlar los argumentos de la CLI, puedes usar una variable de entorno en su lugar:

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> es <code>true</code> por defecto, lo que significa que alguna instrumentación ocurre en el momento de la importación, antes de la inicialización. Para deshabilitar completamente la instrumentación, puedes hacer una de las siguientes acciones:
  <ul>
    <li>Importa el módulo condicionalmente</li>
    <li>Establece <code>DD_TRACE_ENABLED=false</code> (si, por ejemplo, las importaciones estáticas o de nivel superior de ESM impiden la carga condicional)</li>
  <ul>
</div>

#### Aplicaciones ESM solamente: Importa el cargador {#esm-applications-only-import-the-loader}

Las aplicaciones ECMAScript Modules (ESM) requieren un _argumento_ adicional de línea de comandos. Agrega este argumento sin importar cómo se importe e inicialice el SDK de otra manera:

- **Node.js < v20.6:** `--loader dd-trace/loader-hook.mjs`
- **Node.js >= v20.6:** `--import dd-trace/register.js`

Por ejemplo, en Node.js 22, si inicializas el SDK usando la opción uno de arriba, lo iniciarías así:

```sh
node --import dd-trace/register.js app.js
```

Esto también se puede combinar con el argumento de línea de comandos `--require dd-trace/init`:

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Existe una forma abreviada para combinar ambos argumentos de línea de comandos en Node.js v20.6 y versiones superiores:

```sh
node --import dd-trace/initialize.mjs app.js
```

### Empaquetado {#bundling}

`dd-trace` funciona interceptando las llamadas `require()` que una aplicación de Node.js realiza al cargar módulos. Esto incluye módulos que están integrados en Node.js, como el módulo `fs` para acceder al sistema de archivos, así como módulos instalados desde el registro de NPM, como el módulo de base de datos `pg`.

Los agrupadores rastrean todas las llamadas `require()` que una aplicación realiza a archivos en el disco. Reemplaza las llamadas `require()` con código personalizado y combina todo el JavaScript resultante en un solo archivo "empaquetado". Cuando se carga un módulo integrado, como `require('fs')`, esa llamada puede permanecer igual en el paquete resultante.

Las herramientas APM como `dd-trace` dejan de funcionar en este punto. Pueden continuar interceptando las llamadas para módulos integrados, pero no interceptan llamadas a bibliotecas de terceros. Esto significa que cuando empaquetas una aplicación `dd-trace` con un empaquetador, es probable que capture información sobre el acceso al disco (a través de `fs`) y solicitudes HTTP salientes (a través de `http`), pero omita las llamadas a bibliotecas de terceros. Por ejemplo:
- Extrayendo información de la ruta de la solicitud entrante para el framework `express`.
- Mostrando qué consulta se ejecuta para el cliente de base de datos `mysql`.

Una solución común es tratar todos los módulos de terceros que el APM necesita instrumentar como "externos" al empaquetador. Con esta configuración, los módulos instrumentados permanecen en el disco y continúan cargándose con `require()` mientras que los módulos no instrumentados se empaquetan. Sin embargo, esto resulta en una compilación con muchos archivos superfluos y comienza a ir en contra del propósito del empaquetado.

Datadog recomienda usar complementos personalizados para el empaquetador. Estos complementos pueden instruir al empaquetador sobre cómo comportarse, inyectar código intermedio e interceptar las llamadas "traducidas" `require()`. Como resultado, se incluyen más paquetes en el archivo JavaScript empaquetado.

**Nota**: Algunas aplicaciones pueden tener el 100% de los módulos empaquetados, sin embargo, los módulos nativos aún deben permanecer externos al paquete.

#### Empaquetando con esbuild {#bundling-with-esbuild}

Esta biblioteca proporciona soporte experimental para esbuild en forma de un plugin de esbuild, y requiere al menos Node.js v16.17 o v18.7. Para usar el plugin, asegúrate de tener `dd-trace@3+` instalado, y luego requiere el módulo `dd-trace/esbuild` al construir tu paquete.

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
    '@datadog/native-iast-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Empaquetando con Next.js {#bundling-with-nextjs}

Si estás usando Next.js u otro framework que dependa de webpack para empaquetar tu aplicación, agrega una declaración
similar a la de webpack dentro de tu archivo de configuración `next.config.js`:

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
      '@datadog/native-iast-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Características no soportadas de Datadog {#unsupported-datadog-features}

Las siguientes características están desactivadas por defecto en el rastreador de Node.js. No soportan el empaquetado y no pueden ser utilizadas si tu aplicación está empaquetada.

- APM: Instrumentación Dinámica

#### Observaciones generales sobre el empaquetado {#general-bundling-remarks}

**Nota**: Debido al uso de módulos nativos en el SDK, que son código C++ compilado, (generalmente terminando con una extensión de archivo `.node`), necesitas agregar entradas a tu lista `external`. Actualmente, los módulos nativos utilizados en el rastreador de Node.js viven dentro de paquetes con prefijo `@datadog`. Esto también requerirá que envíes un directorio `node_modules/` junto con tu aplicación empaquetada. No necesitas enviar todo tu directorio `node_modules/` ya que contendría muchos paquetes superfluos que deberían estar contenidos en tu paquete.

Para generar un directorio más pequeño `node_modules/` con solo los módulos nativos requeridos, (y sus dependencias) primero puedes determinar las versiones de los paquetes que necesitas, luego crear un directorio temporal para instalarlos, y copiar el directorio resultante `node_modules/` desde allí. Por ejemplo:

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

**Nota**: En el caso de Next.js, el `path/to/bundle` suele ser el directorio `.next/standalone` de tu aplicación.

En esta etapa, deberías poder desplegar tu paquete, (que es tu código de aplicación y la mayoría de tus dependencias), con el `node_modules/` directorio, que contiene los módulos nativos y sus dependencias.

## Configuración {#configuration}

Si es necesario, configura el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requieras, incluyendo configurar unified service tagging. Lee [Configuración de la Biblioteca][4] para más detalles.

Lee [configuración del rastreador][3] para obtener una lista de opciones de inicialización.

## Lectura Adicional {#further-reading}

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