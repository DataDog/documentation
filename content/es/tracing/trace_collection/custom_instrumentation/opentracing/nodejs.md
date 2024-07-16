---
aliases:
- /es/tracing/setup_overview/open_standards/nodejs
- /es/tracing/trace_collection/open_standards/nodejs
- /es/tracing/trace_collection/opentracing/nodejs/
code_lang: nodejs
code_lang_weight: 40
description: ' Instrumentación de OpenTracing para Node.js'
kind: documentación
title: Instrumentación de Node.js OpenTracing
type: multi-code-lang
---


<div class="alert alert-info">OpenTracing se basa en una especificación obsoleta. Si deseas instrumentar tu código con una especificación abierta, utiliza OpenTelemetry en su lugar. Prueba el soporte de fase beta para <a href="/tracing/trace_collection/otel_instrumentation/">procesar datos de la instrumentación de OpenTelemetry en bibliotecas de rastreo de Datadog</a>.</div>

OpenTracing es compatible con el paquete `dd-trace`.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

Utiliza el rastreador como en cualquier otra aplicación de OpenTracing.

Las siguientes etiquetas (tags) están disponibles para anular las opciones específicas de Datadog:

* `service.name`: el nombre de servicio que se utilizará para el tramo (span). Se utilizará el nombre de servicio del rastreador si no se proporciona.
* `resource.name`: el nombre del recurso que se utilizará para el tramo. Si no se indica, se utilizará el nombre de la operación.
* `span.type`: el tipo de tramo que se utilizará para el tramo. Si no se indica, se utilizará `custom`.

Consulta [opentracing.io][1] para el uso de OpenTracing Node.js.



[1]: https://opentracing.io/guides/javascript/