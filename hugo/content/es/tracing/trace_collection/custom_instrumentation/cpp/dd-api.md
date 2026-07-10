---
aliases:
- /es/tracing/manual_instrumentation/cpp
- /es/tracing/custom_instrumentation/cpp
- /es/tracing/setup_overview/custom_instrumentation/cpp
- /es/tracing/trace_collection/custom_instrumentation/cpp
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
description: Instrumenta manualmente tu aplicación C++ para enviar trazas (traces)
  personalizadas a Datadog.
further_reading:
- link: tracing/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas
- link: tracing/visualization/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
title: Instrumentación personalizada de C++ con la API Datadog
---

<div class="alert alert-info">
Si aún no has leído las instrucciones de configuración, empieza por las <a href="https://docs.datadoghq.com/tracing/setup/cpp/">Instrucciones de configuración de C++</a>.
</div>

## Creación de tramos (spans)

Para instrumentar manualmente un método:

```cpp
{
  // Create a root span for the current request.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // Set a resource name for the root span.
  root_span.set_resource_name("bologna_sandwich");
  // Create a child span with the root span as its parent.
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // Set a resource name for the child span.
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // Spans can be finished at an explicit time ...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... or implicitly when the destructor is invoked.
  // For example, root_span finishes here.
```

## Añadir etiquetas (tags)

Añade [span tagss][1] personalizadas a tus [tramos][2] para personalizar tu capacidad de observación en Datadog. Las span tagss se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información al nivel del código como el nivel de comercio, el importe del pago o el ID de usuario.

Nota que algunas etiquetas de Datadog son necesarias para el [etiquetado de servicio unificado][3].

{{< tabs >}}

{{% tab "Locally" %}}

### Manualmente

Añade etiquetas directamente a un objeto de tramo llamando a `Span::set_tag`. Por ejemplo:

```cpp
// Add tags directly to a span by calling `Span::set_tag`
auto span = tracer.create_span();
span.set_tag("key must be string", "value must also be a string");

// Or, add tags by setting a `SpanConfig`
datadog::tracing::SpanConfig opts;
opts.tags.emplace("team", "apm-proxy");
auto span2 = tracer.create_span(opts);
```

{{% /tab %}}

{{% tab "Globally" %}}

### Variable de entorno

Para configurar etiquetas en todos tus tramos, configura la variable de entorno `DD_TAGS` como una lista de pares de `key:value` separados por comas.

```
export DD_TAGS=team:apm-proxy,key:value
```

### Manualmente

```cpp
datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validated_config);

// All new spans will have contains tags defined in `tracer_config.tags`
auto span = tracer.create_span();
```

{{% /tab %}}

{{< /tabs >}}

### Configurar errores en un tramo

Para asociar un tramo a un error, define una o varias etiquetas relacionadas con el error en el
tramo. Por ejemplo:

```cpp
span.set_error(true);
```

Añade información más específica sobre el error configurando cualquier combinación de `error.message`, `error.stack` o `error.type` utilizando respectivamente `Span::set_error_message`, `Span::set_error_stack` y `Span::set_error_type`. Para obtener más información sobre las etiquetas de errores, consulta [Error Tracking][4].

Ejemplo de añadir una combinación de etiquetas de errores:

```cpp
// Associate this span with the "bad file descriptor" error from the standard
// library.
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
El uso de cualquiera de `Span::set_error_*` da lugar a una llamada subyacente a `Span::set_error(true)`.
</div>

Para anular un error en un tramo, configura `Span::set_error` en `false`, lo que elimina cualquier combinación de `Span::set_error_stack`, `Span::set_error_type` o `Span::set_error_message`.

```cpp
// Clear any error information associated with this span.
span.set_error(false);
```

## Propagación del contexto con extracción e inserción de cabeceras

Puedes configurar la propagación del contexto para trazas distribuidas insertando y extrayendo cabeceras. Lee [Propagación del contexto de trazas][5] para obtener información.

## Filtrado de recursos

Se pueden excluir trazas en función del nombre del recurso, para eliminar el tráfico Synthetic como las comprobaciones de estado a partir del envío de trazas y la influencia en las métricas de trazas. Para encontrar más información sobre esta y otras configuraciones de seguridad y ajuste, consulta la página [Seguridad][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/tracing/error_tracking/
[5]: /es/tracing/trace_collection/trace_context_propagation/
[6]: /es/tracing/security
