---
aliases:
- /es/tracing/connect_logs_and_traces/java
code_lang: java
code_lang_weight: 10
description: Conecta tus logs y trazas (traces) de Java para correlacionarlos en Datadog.
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
kind: documentación
title: Correlación de logs y trazas de Java
type: multi-code-lang
---
## Antes de empezar

Asegúrate de que la recopilación de log está configurada. Consulta [Recopilación de log de Java][1] para obtener instrucciones sobre Log4j, Log4j 2 o Logback.

## Inyección automática

A partir de la versión 0.74.0, el rastreador de Java inyecta automáticamente identificadores de correlación de traza en logs con formato JSON. Para versiones anteriores, activa la inyección automática en el rastreador de Java añadiendo `dd.logs.injection=true` como propiedad del sistema, o a través de la variable de entorno `DD_LOGS_INJECTION=true`. Los detalles completos de configuración pueden encontrarse en la página de [configuración del rastreador de Java][2].

**Notas**:
- La inyección automática de la correlación de traza está disponible para Log4j2, Log4j o SLF4J y Logback.
- Si la `attribute.path` de tu ID de traza *no* es `dd.trace_id`, asegúrate de que la configuración de atributos reservados de tu ID de traza tiene en cuenta la `attribute.path`. Para obtener más información, consulta [Los logs correlacionados no aparecen en el panel de ID de traza][3].

<div class="alert alert-info"><strong>Fase beta</strong>: a partir de la versión 1.18.3, si la <a href="/agent/remote_config/">Configuración remota del Agent</a> está activada donde se ejecuta el servicio, puedes establecer <code>DD_LOGS_INJECTION</code> en la interfaz de usuario <a href="/tracing/service_catalog">del Catálogo de servicio</a>.</div>

## Inyección manual

Si prefieres correlacionar manualmente tus trazas con tus logs, utiliza la API del rastreador de Java para recuperar los identificadores de correlación. Utiliza los métodos `CorrelationIdentifier.getTraceId` y `CorrelationIdentifier.getSpanId` para inyectar identificadores al principio del tramo que se está registrando, y elimina los identificadores cuando el tramo haya finalizado.

{{< tabs >}}
{{% tab "Log4j 2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Deben haber tramos iniciados y activos antes de este bloque.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Loguear algo.

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "SLF4J and Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// Deben haber tramos iniciados y activos antes de este bloque.
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Loguear algo.

} finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{% tab "Tinylog" %}}

```java
import org.tinylog.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Deben haber tramos iniciados y activos antes de este bloque.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Loguear algo.

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**Nota:** Si no utilizas [la integración de log de Datadog][4] para analizar tus logs, las reglas personalizadas de parseo de log deben asegurar que `dd.trace_id` y `dd.span_id` se analicen como cadenas. Para obtener más información, consulta [Los logs correlacionados no aparecen en el panel de ID de traza][5].

[Consulta la documentación de la recopilación de log de Java][1] para obtener más detalles sobre el despliegue específico del registrador e instrucciones para el registro en formato JSON.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/java/
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?
[4]: /es/logs/log_collection/java/#raw-format
[5]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom