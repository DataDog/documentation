---
aliases:
- /es/continuous_integration/guides/add_custom_metrics/
- /es/tests/guides/add_custom_metrics/
description: Aprenda a usar medidas personalizadas en sus pruebas.
further_reading:
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /monitors/types/ci
  tag: Documentación
  text: Obtenga información sobre los monitores de CI.
title: Agregue medidas personalizadas a sus pruebas.
---
## Descripción general {#overview}

Antes de comenzar, asegúrese de que [Test Optimization][1] ya esté configurado para sus pruebas. Esta guía le muestra cómo agregar y usar medidas personalizadas en sus pruebas.

## Agregue la medida personalizada a su prueba {#add-the-custom-measure-to-your-test}

Agregue la medida personalizada a su prueba. La instrumentación nativa le permite usar la API programática:

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('test.memory.rss', process.memoryUsage().rss)
    // test continues normally
    // ...
  })
```

{{% /tab %}}

{{% tab "Java" %}}

Para agregar métricas personalizadas, incluya la biblioteca [`opentracing-util`][1] como una dependencia de tiempo de compilación en su proyecto.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util

{{% /tab %}}

{{% tab "Python" %}}

```python
from ddtrace import tracer
import os, psutil

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    process = psutil.Process()
    ddspan.set_tag("test.memory.rss", process.memory_info().rss)
    # test continues normally
    # ...
```

{{% /tab %}}

{{% tab ".NET" %}}

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

{{% /tab %}}

{{% tab "Ruby" %}}

```ruby
require 'datadog/ci'

# inside your test
Datadog::CI.active_test&.set_tag('test.memory.usage', 1e8)
# test continues normally
# ...
```

{{% /tab %}}

{{% tab "Swift" %}}

```swift
import DatadogSDKTesting

// inside your test
DDTest.current?.setTag(key: "test.memory.usage", value: 1e8)
// test continues normally
// ...
```

{{% /tab %}}

{{% tab "Cargas de informes de JUnit" %}}

Para `datadog-ci`, use la variable de entorno `DD_MEASURES` o el argumento de CLI `--measures`:

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## Crear una faceta {#create-a-facet}

Cree una faceta para la medida personalizada que agregó a la prueba navegando a la [{{< ui >}}Test Runs{{< /ui >}} página][2] y haciendo clic en {{< ui >}}\+ Add{{< /ui >}} en la lista de facetas.

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Asegúrese de que el tipo de faceta sea {{< ui >}}Measure{{< /ui >}}, lo cual representa un valor numérico:

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

Haga clic en {{< ui >}}Add{{< /ui >}} para comenzar a usar su medida personalizada.

## Grafique la evolución de su medida {#graph-the-evolution-of-your-measure}

Grafique la evolución de su medida a través del tiempo seleccionando la visualización {{< ui >}}Timeseries{{< /ui >}}:

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

Por ejemplo, puede usar esta visualización para rastrear la evolución del uso de memoria en sus pruebas.

## Exportar su gráfico {#export-your-graph}

Puede exportar su gráfico a un [dashboard][3] o a un [notebook][4], y crear un [monitor][5] basado en él haciendo clic en el botón {{< ui >}}Export{{< /ui >}}.

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

## Agregar un monitor {#add-a-monitor}

Reciba alertas si el valor de su medida supera o cae por debajo de un cierto umbral creando un [CI Tests Monitor][6].

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

Por ejemplo, puede usar este tipo de alerta para informarle sobre el uso de memoria al alcanzar un cierto umbral.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /es/dashboards
[4]: /es/notebooks
[5]: /es/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests