---
aliases:
- /es/tracing/connect_logs_and_traces/nodejs
code_lang: nodejs
code_lang_weight: 50
description: Conecta tus logs y trazas (traces) de Node.js para correlacionarlos en
  Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
title: Correlación de logs y trazas de Node.js
type: multi-code-lang
---

## Inyección automática

Activa la inyección con la variable de entorno `DD_LOGS_INJECTION=true` o configurando directamente el rastreador:

```javascript
// Esta línea debe ir antes de importar el registrador.
const tracer = require('dd-trace').init({
    logInjection: true
});
```

Esto permite la inyección automática de ID de traza para `bunyan`, `paperplane`, `pino` y `winston`.

Si aún no lo has hecho, configura el rastreador de Node.js con `DD_ENV`, `DD_SERVICE` y `DD_VERSION`. Esto proporcionará la mejor
experiencia para añadir `env`, `service` y `version` (ve [etiquetado de servicios unificado][1] para obtener más detalles).

**Nota**: La inyección automática solo funciona para logs con formato JSON.

## Inyección manual

Si estás utilizando una biblioteca de registro no compatible con la inyección automática, pero utilizas el formato JSON, es posible hacer la inyección manual directamente en tu código.

Ejemplo con la `console` como registrador subyacente:

```javascript
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging