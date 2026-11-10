---
aliases:
- /fr/continuous_integration/guides/add_custom_metrics/
- /fr/tests/guides/add_custom_metrics/
description: Apprenez à utiliser des mesures personnalisées dans vos tests.
further_reading:
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
- link: /monitors/types/ci
  tag: Documentation
  text: En savoir plus sur les monitors CI
title: Ajouter des mesures personnalisées à vos tests
---
## Présentation {#overview}

Avant de commencer, assurez-vous que [Test Optimization][1] est déjà configuré pour votre langage. Ce guide vous explique comment ajouter et utiliser des mesures personnalisées pour vos tests.

## Ajoutez la mesure personnalisée à votre test {#add-the-custom-measure-to-your-test}

Ajoutez la mesure personnalisée à votre test. L'instrumentation native vous permet d'utiliser l'API programmatique :

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

Pour ajouter des métriques personnalisées, incluez la bibliothèque [`opentracing-util`][1] en tant que dépendance de compilation à votre projet.

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

{{% tab "Importation de rapports JUnit" %}}

Pour `datadog-ci`, utilisez la variable d'environnement `DD_MEASURES` ou l'argument CLI `--measures` :

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## Créer une facette {#create-a-facet}

Créez une facette pour la mesure personnalisée que vous avez ajoutée au test en accédant à la [{{< ui >}}Test Runs{{< /ui >}} page][2] et en cliquant sur {{< ui >}}\+ Add{{< /ui >}} dans la liste des facettes.

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Assurez-vous que le type de facette est {{< ui >}}Measure{{< /ui >}}, ce qui représente une valeur numérique :

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

Cliquez sur {{< ui >}}Add{{< /ui >}} pour commencer à utiliser votre mesure personnalisée.

## Représentez graphiquement l'évolution de votre mesure {#graph-the-evolution-of-your-measure}

Tracez l'évolution de votre mesure dans le temps en sélectionnant la visualisation {{< ui >}}Timeseries{{< /ui >}} :

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

Vous pouvez par exemple utiliser cette visualisation pour suivre l'évolution de l'utilisation de la mémoire dans vos tests.

## Exporter votre graphique {#export-your-graph}

Vous pouvez exporter votre graphique vers un [tableau de bord][3] ou un [notebook][4], et créer un [monitor][5] basé sur celui-ci en cliquant sur le bouton {{< ui >}}Export{{< /ui >}}.

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

## Ajouter un monitor {#add-a-monitor}

Soyez alerté si la valeur de votre mesure dépasse ou descend en dessous d'un certain seuil en créant un [CI Tests Monitor][6].

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

Ce type d'alerte peut par exemple vous prévenir lorsque l'utilisation de la mémoire atteint un certain seuil.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /fr/dashboards
[4]: /fr/notebooks
[5]: /fr/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests