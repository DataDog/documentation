---
aliases:
- /es/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Más información sobre cómo configurar el rastreo de APM con la aplicación
- link: /tracing/service_catalog/
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

Los servicios de APM calculan las métricas de trazas (traces) para errores, rendimiento y latencia. Estas se calculan con base en los recursos que coinciden con un único nombre de tramo (span), considerado como la operación principal. Estos métricas de servicio se utilizan en todo el producto, tanto la Página de servicios por defecto, en el Catálogo de servicios, como el Mapa de servicios.

**Nota**: Las métricas de trazas pueden consultarse en función de su `trace.*` [espacio de nombres][1].

## Operaciones principales
### Definición

El nombre de la operación principal de un servicio determina cómo se representa ese servicio en la interfaz de usuario. El backend de Datadog selecciona automáticamente un nombre de operación que se considera el punto de entrada en el servicio en función del rendimiento de las solicitudes.

Por ejemplo, un servicio `web-store` puede tener varios endpoints instrumentados como recursos. Estos recursos comparten la misma operación principal porque el punto de entrada a estos recursos es consistente. Por ejemplo, los recursos `/user/home` y `/user/new` deberían tener ambos la misma operación principal`web.request`. En diferentes lenguajes, una operación principal para un servicio puede tener el siguiente aspecto:

| Tipo de servicio           | Operación principal                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
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

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // código que se rastrea
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
  # código que se rastrea
end
```
Para obtener más información, consulta [Configuración de Ruby y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


```go
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

Para obtener más información, consulta [Configuración de Go y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/go/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// código que se rastrea
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
    // código que se rastrea
}

```

Para obtener más información, consulta [Configuración de .NET y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// Una vez, al comienzo del index.php, justo después de la importación del cargador automático del compositor.
// Para OpenTracing <= 1.0-beta6
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// Para OpenTracing >= 1.0
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// Registrar el contenedor del rastreador global
 \OpenTracing\GlobalTracer::set($otTracer);

// En cualquier lugar del código de la aplicación
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...Utilizar OpenTracing como se espera
$scope->close();
```

Para obtener más información, consulta [Configuración de PHP y OpenTracing][1].


[1]: /es/tracing/trace_collection/opentracing/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// Crea un tramo (span) raíz para la solicitud actual.
auto root_span = tracer->StartSpan("web.request");
// Establece un nombre de recurso para el tramo (span) raíz.
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

Para obtener más información, consulta [Configuración de C++ y la instrumentación personalizada][1].


[1]: /es/tracing/trace_collection/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /es/tracing/trace_collection/custom_instrumentation/