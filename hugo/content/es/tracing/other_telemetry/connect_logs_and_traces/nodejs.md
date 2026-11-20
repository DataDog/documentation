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

Permite la inyección automática del ID de traza para `bunyan`, `paperplane`, `pino` y `winston` cuando se utilizan registradores de aplicación estructurados.

Para versiones anteriores del rastreador, la inyección puede activarse con la variable de entorno `DD_LOGS_INJECTION=true` o configurando el rastreador directamente:

```javascript
// This line must come before importing the logger.
const tracer = require('dd-trace').init({
    logInjection: false
});
```

Si aún no lo has hecho, configura el rastreador de Node.js con `DD_ENV`, `DD_SERVICE` y `DD_VERSION`. Esto proporcionará la mejor
experiencia para añadir `env`, `service` y `version` (ve [etiquetado de servicios unificado][1] para obtener más detalles).

**Nota**: La inyección automática solo funciona para logs con formato JSON.

### Ejemplo con Winston y Express

He aquí un ejemplo sencillo en el que se utiliza Winston con Express:

```javascript
// init tracer first
require('dd-trace').init({ logInjection: true });

const express = require('express');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),       // JSON required for auto-injection
  transports: [new transports.Console()]
});

const app = express();

app.get('/hello', (req, res) => {
  logger.info('hello world');  
  // dd.trace_id & dd.span_id will be auto-added
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`listening on ${port}`));
```

Esto devolvería un log en el formato:

```
{"dd":{"service":"minimal-nodejs-datadog-log-injection","span_id":"8985025821692657638","trace_id":"68c2114800000000669b6b6b2aaf59c9","version":"1.0.0"},"level":"info","message":"hello world"}
```

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging