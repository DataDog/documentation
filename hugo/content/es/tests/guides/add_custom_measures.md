---
aliases:
- /es/continuous_integration/guides/add_custom_metrics/
- /es/tests/guides/add_custom_metrics/
description: Aprende a personalizar medidas en tus tests.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /monitors/types/ci
  tag: Documentación
  text: Más información sobre los monitores de CI
title: Añadir medidas personalizadas a los tests
---

## Información general

Antes de empezar, asegúrate de que [Test Optimization][1] ya está configurado para tu lenguaje. En esta guía se explica cómo personalizar medidas y añadirlas a los tests.

## Añadir la medida personalizada a un test

Añade la medida personalizada a tu test. La página de instrumentación nativa te permite utilizar la API programática:

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

Para añadir métricas personalizadas, incluye la librería [`opentracing-util`][1] como dependencia en tiempo de compilación en tu proyecto.

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

{{% tab "JUnit Report Uploads" %}}

Para `datadog-ci`, utiliza la variable de entorno `DD_MEASURES` o el argumento de CLI `--measures`:

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## Crear una faceta

Crea una faceta para la medida personalizada que añadiste al test desde la página [**Test Runs** (Ejecuciones de tests][2], haciendo clic en **+ Add** (+ Añadir) en la lista de facetas.

{{< img src="/continuous_integration/facet_creation.png" text="Creación de una faceta en Ejecuciones de tests" style="width:100%" >}}

Asegúrate de que el tipo de faceta sea **Measure** (Medida), que representa un valor numérico:

{{< img src="/continuous_integration/measure_creation.png" text="Creación de una medida en Ejecuciones de tests" style="width:100%" >}}

Haz clic en **Add** (Añadir) para empezar a utilizar la medida personalizada.

## Graficar la evolución de la medida

Traza la evolución de tu medida a lo largo del tiempo seleccionando la visualización **Timeseries** (Serie temporal):

{{< img src="/continuous_integration/plot_measure.png" text="Trazar la duración media de referencia" style="width:100%" >}}

Por ejemplo, puedes utilizar esta visualización para seguir la evolución del uso de memoria en tus tests.

## Exportar el gráfico

Puedes exportar tu gráfico a un [dashboard][3] o a un [notebook][4] y crear un [monitor][5] basado en él haciendo clic en el botón **Export** (Exportar).

{{< img src="/continuous_integration/export_measure.png" text="Exportar el gráfico de duración media de referencia" style="width:100%" >}}

## Añadir un monitor

Recibe una alerta si el valor de tu medida supera o no un umbral determinado mediante la creación de un [Monitor de tests de CI][6].

{{< img src="/continuous_integration/monitor_measure.png" text="monitorizar la duración media de referencia" style="width:100%" >}}

Por ejemplo, puedes utilizar este tipo de alerta para saber que el uso de memoria ha alcanzado un umbral determinado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /es/dashboards
[4]: /es/notebooks
[5]: /es/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests
