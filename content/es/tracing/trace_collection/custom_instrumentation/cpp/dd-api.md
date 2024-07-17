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
  text: Conecta tu logs y trazas juntos
- link: tracing/visualization/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
kind: documentación
title: Instrumentación personalizada de C++ utilizando la API de Datadog
---

<div class="alert alert-info">
Si aún no has leído las instrucciones de configuración, empieza por las <a href="https://docs.datadoghq.com/tracing/setup/cpp/">Instrucciones de configuración de C++</a>.
</div>

## Crear tramos

Para instrumentar manualmente un método:

```cpp
{
  // Crea un tramo (span) de raíz para la solicitud actual.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // Configura un nombre de recurso para el tramo de raíz.
  root_span.set_resource_name("bologna_sandwich");
  // Crea un tramo secundario con el tramo de raíz como primario.
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // Configura un nombre de recurso para el tramo secundario.
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // Los tramos pueden terminar en un momento explícito ...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... o implícitamente cuando se invoca el destructor.
  // Por ejemplo, root_span termina aquí.
```

## Añadir etiquetas

Añade [etiquetas (tags) de tramos][1] personalizadas a tus [tramos][2] para personalizar tu capacidad de observación en Datadog. Las etiquetas de tramos se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información al nivel del código como el nivel de comercio, el importe del pago o el ID de usuario.

Nota que algunas etiquetas de Datadog son necesarias para el [etiquetado de servicio unificado][3].

{{< tabs >}}

{{% tab "Locally" %}}

### Manualmente

Añade etiquetas directamente a un objeto de tramo llamando a `Span::set_tag`. Por ejemplo:

```cpp
// Añade etiquetas directamente a un tramo llamando a `Span::set_tag`
auto span = tracer.create_span();
span.set_tag("key must be string", "value must also be a string");

// O añade etiquetas configurando un `SpanConfig`
Datadog::tracing::SpanConfig opts;
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
Datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validted_config);

// Todos los nuevos tramos contienen etiquetas definidas en `tracer_config.tags`
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

Añade información más específica sobre el error configurando cualquier combinación de `error.msg`, `error.stack` o `error.type` utilizando respectivamente `Span::set_error_message`, `Span::set_error_stack` y `Span::set_error_type`. Consulta [Rastreo de errores][4] para obtener más información sobre las etiquetas de errores.

Ejemplo de añadir una combinación de etiquetas de errores:

```cpp
// Asocia este tramo con el error "descriptor de archivo defectuoso" del estándar
// biblioteca.
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
El uso de cualquiera de `Span::set_error_*` da lugar a una llamada subyacente a `Span::set_error(true)`.
</div>

Para anular un error en un tramo, configura `Span::set_error` en `false`, lo que elimina cualquier combinación de `Span::set_error_stack`, `Span::set_error_type` o `Span::set_error_message`.

```cpp
// Borrar cualquier información de error asociada a este tramo.
span.set_error(false);
```

## Propagar el contexto con extracción e inserción de cabeceras

Puedes configurar la propagación del contexto para trazas (traces) distribuidas insertando y extrayendo cabeceras. Lee [Propagación del contexto de trazas][5] para obtener información.

## Filtrado de recursos

Se pueden excluir trazas en función del nombre del recurso, para eliminar el tráfico Synthetic como las comprobaciones de estado a partir del envío de trazas y la influencia en las métricas de trazas. Para encontrar más información sobre esta y otras configuraciones de seguridad y ajuste, consulta la página [Seguridad][6].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/tracing/error_tracking/
[5]: /es/tracing/trace_collection/trace_context_propagation/cpp
[6]: /es/tracing/security