---
aliases:
- /es/tracing/profiler/enabling/nodejs/
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
title: Activación de Node.js Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, puedes omitir la instalación de librería e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][7].

Datadog Profiler requiere al menos Node.js 14, pero Node.js 16 o posterior es recomendado. Si utilizas una versión de Node.js anterior a la 16, algunas aplicaciones verán picos de latencia de cola cada minuto al iniciar el siguiente perfil.

Continuous Profiler no es compatible con las plataformas serverless, como AWS Lambda.

## Instalación

Para empezar a crear perfiles de aplicaciones:

1. Asegúrate de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][2].

2. Ejecuta `npm install --save dd-trace@latest` para añadir una dependencia del módulo `dd-trace` que incluye el generador de perfiles.

3. Activa el generador de perfiles:

   {{< tabs >}}
{{% tab "Variables de entorno" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

**Nota**: Si ya estás utilizando Datadog APM, ya estás llamando a `init` y no necesitas hacerlo de nuevo. Si no es así, asegúrate de que el rastreador y el generador de perfiles se cargan juntos:

```node
node -r dd-trace/init app.js
```

{{% /tab %}}
{{% tab "En código" %}}

```js
const tracer = require('dd-trace').init({
  profiling: true,
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3'
})
```

**Nota**: Si ya estás utilizando Datadog APM, ya estás llamando a `init` y no necesitas hacerlo de nuevo. Si no es así, asegúrate de que el rastreador y el generador de perfiles se cargan juntos:

```node
const tracer = require('dd-trace/init')
```

{{% /tab %}}
{{< /tabs >}}

4. Opcional: configura la [integración del código fuente][4].

5. Uno o dos minutos después de iniciar tu aplicación de Node.js, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][5].

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][6] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## ¿Tienes una carga elevada?

Node.js 16 o posterior es recomendado. En versiones anteriores, algunas aplicaciones verán picos de latencia de cola cada minuto mientras se inicia el siguiente perfil.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /es/integrations/guide/source-code-integration/?tab=nodejs
[5]: https://app.datadoghq.com/profiling
[6]: /es/getting_started/profiler/
[7]: /es/profiler/enabling/supported_versions/
