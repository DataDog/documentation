---
aliases:
- /es/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
description: Comprende cómo funcionan las operaciones primarias en los servicios y
  cómo configurarlas para organizar adecuadamente trazas (traces) y recursos en APM.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprende a configurar APM tracing con su aplicación
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que generan informes en Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundizar en el rendimiento de los recursos y las trazas
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Entender cómo se leen las trazas de Datadog
title: Operaciones principales en servicios
---

## Servicios de APM

Los servicios de APM calculan métricas de rastreo para errores, rendimiento y latencia. Estos cálculos se basan en los recursos que coinciden con un único nombre de tramo, considerado la operación principal. Estas métricas de servicio se utilizan en todo el producto, tanto por la página de servicio por defecto en el Software Catalog y como Mapa de servicio.

**Nota**: Las métricas de rastreo pueden consultarse en función de su `trace.*` [espacio de nombres][1].

## Operaciones principales
### Definición

El nombre de la operación principal de un servicio determina cómo se representa ese servicio en la interfaz de usuario. El backend de Datadog selecciona automáticamente un nombre de operación que se considera el punto de entrada en el servicio en función del rendimiento de las solicitudes.

Por ejemplo, un servicio `web-store` puede tener varios endpoints instrumentados como recursos. Estos recursos comparten la misma operación principal porque el punto de entrada a estos recursos es consistente. Por ejemplo, los recursos `/user/home` y `/user/new` deberían tener ambos la misma operación principal`web.request`. En diferentes lenguajes, una operación principal para un servicio puede tener el siguiente aspecto:

| Tipo de servicio           | Operación principal                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`, `flask.request`, `web.request` |
| base de datos                     | `postgres.query`, `db.query`                      |
| custom-instrumentation | `trace.annotation`, `method.call`                 |

### Configuración

Cuando hay varias operaciones principales definidas para un servicio, el mayor rendimiento de las solicitudes determina la operación seleccionada automáticamente como punto de entrada para el servicio. Un usuario administrador puede establecer esta configuración manualmente:

1. Ve a la [página de configuración de APM][2].
2. Selecciona la pestaña **Primary Operation Name** (Nombre de la operación principal).
3. Haz clic en el icono de edición del servicio que quieres configurar manualmente.
4. Haz clic en la pestaña **Set Manually** (Configurar manualmente).
5. Selecciona la operación que quieres reflejar como punto de entrada al servicio.
6. Haz clic en **Save** (Guardar).

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM save" >}}

## Visualización de las estadísticas de otros nombres de tramo

Para asegurarte de que todas las trazas se están enviando a Datadog correctamente fuera de cualquier Instrumentación, puedes ver los recursos por nombres de tramo adicionales que se consideran una operación secundaria con un menú desplegable. Sin embargo, éstos no se utilizan para calcular las estadísticas a nivel de servicio.

{{< img src="tracing/guide/primary_operation/dropdown.mp4" alt="APM save" video=true >}}

## Instrumentación manual

Al escribir tramos personalizados, establece estáticamente el nombre de tramo para asegurarte de que los recursos se agrupan con la misma operación principal (por ejemplo, `web.request`). Si el tramo está siendo nombrado dinámicamente, establécelo como el recurso (por ejemplo, `/user/profile`).

Consulta [Instrumentación personalizada][3] a fin de obtener información detallada para tu lenguaje de programación.

## OpenTracing

Cuando se utiliza Datadog, el nombre de la operación de OpenTracing es un recurso y la etiqueta (tag) "component" de OpenTracing es el nombre del tramo de Datadog. Por ejemplo, para definir (en términos de OpenTracing) un tramo que tenga el recurso "/user/profile" y el nombre de tramo "http.request":

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // code being traced
} finally {
    span.finish();
}

```

Para obtener más información, consulta [Configuración de Java y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/java/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```python
from ddtrace.opentracer.tags import Tags
import opentracing
span = opentracing.tracer.start_span('http.request')
span.set_tag(Tags.RESOURCE_NAME, '/user/profile')
span.set_tag(Tags.SPAN_TYPE, 'web')

# ...
span.finish()

```

Para obtener más información, consulta [Configuración de Python y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/python/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}


```ruby
OpenTracing.start_active_span('http.request') do |scope|
  scope.span.datadog_span.resource = '/user/profile'
  # code being traced
end
```
Para obtener más información, consulta [Configuración de Ruby y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// code being traced
span.finish();
```

Para obtener más información, consulta [Configuración de Node.js y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/nodejs/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


```csharp
using OpenTracing;
using OpenTracing.Util;

using (var scope = GlobalTracer.Instance.BuildSpan("http.request").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "/user/profile");
    // code being traced
}

```

Para obtener más información, consulta [Configuración de .NET y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// Once, at the beginning of your index.php, right after composer's autoloader import.
// For OpenTracing <= 1.0-beta6
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// For OpenTracing >= 1.0
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// Register the global tracer wrapper
 \OpenTracing\GlobalTracer::set($otTracer);

// Anywhere in your application code
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...Use OpenTracing as expected
$scope->close();
```

Para obtener más información, consulta [Configuración de PHP y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// Create a root span for the current request.
auto root_span = tracer->StartSpan("web.request");
// Set a resource name for the root span.
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

Para obtener más información, consulta [Configuración de C++ e Instrumentación personalizada][1].


[1]: /es/tracing/trace_collection/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /es/tracing/trace_collection/custom_instrumentation/