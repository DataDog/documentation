---
aliases:
- /es/tracing/connect_logs_and_traces/ruby
code_lang: ruby
code_lang_weight: 40
description: Conecta tus logs y trazas (traces) de Ruby para correlacionarlos en Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
kind: documentación
title: Correlación de logs y trazas de Ruby
type: multi-code-lang
---

## Correlación de traza

En muchos casos, como en el registro, puede ser útil correlacionar los IDs de traza con otros eventos o flujos de datos, para facilitar las referencias cruzadas.

### Registro en aplicaciones de Rails

#### Inyección automática

Para las aplicaciones de Rails que utilizan el registrador por defecto (`ActiveSupport::TaggedLogging`), `lograge`, o `semantic_logger`, la inyección de ID de traza está configurada automáticamente. Debes añadir un [reasignador de traza][1] para conectar los logs correspondientes con las trazas.

#### Inyección manual

Para añadir IDs de correlación a tu registrador, añade un formateador de log que recupere los IDs de correlación con `Datadog::Tracing.correlation`, y luego añádelos al mensaje.

Para correlacionar con el registro de Datadog con éxito, asegúrate de que los siguientes elementos estén presentes en el mensaje de log, en el orden en que aparecen:

 - `dd.env=<ENV>`: donde `<ENV>` es igual a `Datadog::Tracing.correlation.env`. Omítelo si no se ha configurado un entorno.
 - `dd.service=<SERVICE>`: donde `<SERVICE>` es igual a `Datadog::Tracing.correlation.service`. Omítelo si no se ha configurado ningún nombre de servicio por defecto.
 - `dd.version=<VERSION>`: donde `<VERSION>` es igual a `Datadog::Tracing.correlation.version`. Omítelo si no se ha configurado ninguna versión de la aplicación.
 - `dd.trace_id=<TRACE_ID>`: donde `<TRACE_ID>` es igual a `Datadog::Tracing.correlation.trace_id` o `0` si no hay ninguna traza activa durante el registro.
 - `dd.span_id=<SPAN_ID>`: donde `<SPAN_ID>` es igual a `Datadog::Tracing.correlation.span_id` o `0` si no hay ninguna traza activa durante el registro.

Por defecto, `Datadog::Tracing.log_correlation` devolverá `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

Si una traza no está activa y la versión y el entorno de la aplicación no están configurados, devolverá `dd.service= dd.trace_id=0 dd.span_id=0`.

Un ejemplo de ello en la práctica:

```ruby
require 'ddtrace'
require 'logger'

Datadog.configure do |c|
  c.env = 'production'
  c.service = 'billing-api'
  c.version = '2.5.17'
end

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# Cuando no hay una traza activa
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Cuando hay una traza activa
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```
## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/?tab=ui#trace-remapper