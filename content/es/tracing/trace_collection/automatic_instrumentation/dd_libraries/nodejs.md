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
- /es/tracing/trace_collection/dd_libraries/nodejs/
code_lang: NodeJS
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
  text: Documentación de API
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: tracing/
  tag: Documentación
  text: Uso avanzado
title: Rastreo de aplicaciones Node.js
type: lenguaje de código múltiple
---
## Requisitos de compatibilidad

La última versión del rastreador Node.js es compatible con las versiones de Node.js `>=18`. Para ver la lista completa de versiones de Node.js y de compatibilidad de marcos de Datadog (incluidas las versiones heredadas y de mantenimiento), consulta la página de [requisitos de compatibilidad][1].

## Para empezar

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][13]. A continuación, sigue los siguientes pasos para añadir la librería de rastreo de Datadog a tu aplicación Node.js para instrumentarla.

### Instalación de la librería de rastreo de Datadog

Para instalar la librería de rastreo de Datadog utilizando npm para Node.js v18 y superiores, ejecuta:

  ```shell
  npm install dd-trace --save
  ```
Para instalar la librería de rastreo de Datadog (v4. y superiores de `dd-trace`) para la versión 16 de Node.js, ejecuta:
  ```shell
  npm install dd-trace@latest-node16
  ```
Para obtener más información sobre las etiquetas (tags) de distribución y la compatibilidad con las versiones de tiempos de ejecución Node.js de Datadog, consulta la página de [requisitos de compatibilidad][1].
Si estás actualizando desde una versión principal anterior de librería (0.x, 1.x, 2.x, 3.x o 4.x) a otra versión principal, consulta la [guía para migraciones][5], para evaluar cualquier cambio de última hora.

### Para importar e inicializar el rastreador

Importa e inicializa el rastreador ya sea en código o con argumentos de línea de comandos. La librería de rastreo de Node.js debe importarse e inicializarse **antes** que cualquier otro módulo.

<div class="alert alert-info">Con marcos como <strong>Next.js</strong> y <strong>Nest.js</strong> debes proporcionar una variable de entorno o añadir una marca de Node.js adicional. Consulta <a href="/tracing/trace_collection/compatibility/NodeJS/#complex-framework-usage">Uso de marcos complejos</a> para obtener más información.</div>

Una vez que hayas completado la configuración, si no estás recibiendo trazas (traces) completas, incluyendo rutas URL faltantes para solicitudes web, o tramos (spans) desconectados o faltantes, **confirma que el rastreador ha sido importado e inicializado correctamente**. La librería de rastreo que se inicializa en primer lugar es necesaria para que el rastreador corrija correctamente a través de parches todas los bibliotecas requeridas para la instrumentación automática.

Cuando utilices un transpilador como TypeScript, Webpack, Babel u otros, importa e inicializa la librería de rastreo en un archivo externo y luego importa ese archivo como un todo cuando crees tu aplicación.

#### Opción 1: Añadir el rastreador en el código

##### JavaScript

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

**Nota**: `DD_TRACE_ENABLED` es `true` en forma predeterminada, lo que significa que algo de instrumentación ocurre en el momento de la importación, antes de la inicialización. Para desactivar completamente la instrumentación, puedes realizar una de las siguientes acciones:
- importar el módulo condicionalmente
- configurar `DD_TRACE_ENABLED=false` (si, por ejemplo, las importaciones estáticas o ESM de nivel superior impiden la carga condicional)

##### TypeScript y bundlers (empaquetadores)

Para TypeScript y bundlers que admitan la sintaxis de ECMAScript Module, inicializa el rastreador en un archivo separado para mantener el orden de carga correcto.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

Si la configuración por defecto es suficiente o si toda la configuración se realiza
a través de variables de entorno, también puedes utilizar `dd-trace/init`, que se carga e
inicializa en un solo paso.

```typescript
import 'dd-trace/init';
```

#### Opción 2: Añadir el rastreador con argumentos de línea de comandos

Utiliza la opción `--require` de Node.js para cargar e inicializar el rastreador en un solo paso.

```sh
node --require dd-trace/init app.js
```

**Nota:** Esta estrategia requiere el uso de variables de entorno para todas las configuraciones del rastreador.

#### Sólo aplicaciones ESM: Importar el cargador

Las aplicaciones ECMAScript Modules (ESM) requieren un argumento _adicional_ de la línea de comandos. Añade este argumento independientemente de cómo se importe e inicialice el rastreador:

- **Node.js < v20.6:** `--loader dd-rastrear/loader-hook.mjs`
- **Node.js >= v20.6:** `--import dd-rastrear/register.js`

Por ejemplo, en Node.js 22, si inicializas el rastreador utilizando la opción uno de las anteriores, lo iniciarías así:

```sh
node --import dd-trace/register.js app.js
```

También puede combinarse con el argumento de línea de comandos `--require dd-rastrear/init` (opción dos):

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Existe una forma abreviada de combinar ambos argumentos de línea de comandos en Node.js v20.6 y superiores:

```sh
node --import dd-trace/initialize.mjs app.js
```

### Empaquetado

`dd-trace` funciona interceptando las llamadas `require()` que una aplicación Node.js realiza al cargar módulos. Esto incluye módulos que están integrados en Node.js, como el módulo `fs` para acceder al sistema de archivos, así como módulos instalados desde el registro NPM, como el módulo de base de datos `pg`.

Los bundlers rastrean todas las llamadas `require()` que una aplicación realiza a los archivos del disco. Sustituye las llamadas `require()` por código personalizado y combina todos los JavaScript resultantes en un archivo "empaquetado". Cuando se carga un módulo incorporado, como `require('fs')`, esa llamada puede seguir siendo la misma en el paquete resultante.

Las herramientas APM como `dd-trace` dejan de funcionar en este punto. Pueden seguir interceptando las llamadas a módulos incorporados, pero no interceptan las llamadas a bibliotecas de terceros. Esto significa que cuando empaquetas una aplicación `dd-trace` utilizando un bundler, es probable que capture información sobre el acceso al disco (a través de `fs`) y las solicitudes HTTP salientes (a través de `http`), pero que omita las llamadas a bibliotecas de terceros. Por ejemplo:
- Extracción de información entrante de rutas de solicitudes para el marco `express`.
- Muestra qué consulta se ejecuta para el cliente de base de datos `mysql`.

Una solución común es tratar como "externos" al bundler todos los módulos de terceros que APM necesita para la instrumentación. Con esta configuración, los módulos instrumentados permanecen en el disco y continúan siendo cargados con `require()`, mientras que los módulos no instrumentados se empaquetan. Sin embargo, esto resulta en una compilación con muchos archivos extraños y comienza a hacer fracasar el propósito de la agrupación.

Datadog recomienda disponer de complementos de bundler personalizados. Estos complementos son capaces de dar instrucciones al bundler sobre cómo comportarse, inyectar código intermediario e interceptar las llamadas "traducidas" a `require()`. Como resultado, se incluyen más paquetes en el archivo empaquetado JavaScript.

**Nota**: Algunas aplicaciones pueden tener el 100 % de los módulos empaquetados, sin embargo los módulos nativos deben permanecer externos al paquete.

#### Integración con esbuild

Esta biblioteca proporciona compatibilidad esbuild experimental en forma de un complemento esbuild y requiere al menos Node.js v16.17 o v18.7. Para utilizar el complemento, asegúrate de tener instalado `dd-trace@3+` y luego solicita el módulo `dd-trace/esbuild` al compilar el paquete.

El siguiente es un ejemplo de cómo se puede utilizar `dd-trace` con esbuild:

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

    // required if you encounter graphql errors during the build step
    'graphql/language/visitor',
    'graphql/language/printer',
    'graphql/utilities'
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Integración con Next.js

Si estás utilizando Next.js u otro marco que dependa de webpack para empaquetar tu aplicación, añade una declaración
similar a la de webpack en el archivo de configuración `next.config.js`:

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

      // required if you encounter graphql errors during the build step
      'graphql/language/visitor',
      'graphql/language/printer',
      'graphql/utilities'
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### Funciones no compatibles de Datadog

Las siguientes funciones están desactivadas en forma predeterminada en el rastreador Node.js. No son compatibles con la agrupación y no se pueden utilizar si la aplicación está agrupada.

- APM: Dynamic Instrumentation

#### Observaciones generales sobre la agrupación

**Nota**: Debido al uso de módulos nativos en el rastreador, que son código C++ compilado, (normalmente terminan con una extensión de archivo `.node`), necesitas añadir entradas a tu lista `external`. Actualmente los módulos nativos utilizados en el rastreador Node.js viven dentro de paquetes prefijados `@datadog`. Esto también requerirá que envíes un directorio `node_modules/` junto con tu aplicación empaquetada. No necesitas enviar tu directorio `node_modules/` completo, ya que contendría muchos paquetes innecesarios que deberían estar contenidos en tu paquete.

Para generar un directorio `node_modules/` más pequeño con sólo los módulos nativos requeridos, (y sus dependencias), puedes determinar primero las versiones de los paquetes que necesitas, luego crear un directorio temporal para instalarlos y copiar el directorio `node_modules/` resultante a partir de aquel. Por ejemplo:

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

**Nota**: En el caso de Next.js el `path/to/bundle` suele ser el directorio `.next/standalone` de tu aplicación.

En esta etapa, debes ser capaz de desplegar tu paquete (que es el código de la aplicación y la mayoría de tus dependencias) con el directorio `node_modules/` que contiene los módulos nativos y sus dependencias.

## Configuración

Si es necesario, configura la librería de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, según sea necesario, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de librerías][4].

Para ver lista de opciones de inicialización, lee los [parámetros del rastreador][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /es/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /es/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /es/tracing/trace_collection/library_injection_local/
[13]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
