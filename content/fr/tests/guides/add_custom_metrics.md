---
aliases:
- /fr/continuous_integration/guides/add_custom_metrics/
description: Découvrez comment utiliser des métriques custom (mesures) dans vos tests.
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: En savoir plus sur Test Visibility
- link: /monitors/types/ci
  tag: Documentation
  text: En savoir plus sur les monitors CI
kind: guide
title: Ajouter des métriques custom à vos tests
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Avant de commencer, assurez-vous que [Test Visibility][1] est déjà configuré pour votre langage. Ce guide vous explique comment ajouter et utiliser des métriques custom pour vos tests.

<div class="alert alert-warning">Ces métriques custom ne sont <strong>pas</strong> des <a href="/metrics">métriques Datadog</a>. Elles correspondent à des tags numériques (ou « mesures ») qui représentent des valeurs telles que l'utilisation de la mémoire ou des taux de requêtes.</div>

## Ajouter la métrique custom à votre test

Ajoutez la métrique custom à votre test. Grâce à l'instrumentation native, vous pouvez utiliser l'API de programmation :

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('test.memory.rss', process.memoryUsage().rss)
    // le test se poursuit normalement
    // ...
  })
```

{{% /tab %}}

{{% tab "Java" %}}

```java
// dans votre test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// le test se poursuit normalement
// ...
```

{{% /tab %}}

{{% tab "Python" %}}

```python
from ddtrace import tracer
import os, psutil

# Déclarer `ddspan` en tant qu'argument de votre test
def test_simple_case(ddspan):
    # Définir vos tags
    process = psutil.Process()
    ddspan.set_tag("test.memory.rss", process.memory_info().rss)
    # le test se poursuit normalement
    # ...
```

{{% /tab %}}

{{% tab ".NET" %}}

```csharp
// dans votre test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test.memory.usage", 1e8);
}
// le test se poursuit normalement
// ...
```

{{% /tab %}}

{{% tab "Ruby" %}}

```ruby
require 'datadog/ci'

# dans votre test
Datadog::CI.active_test&.set_tag('test.memory.usage', 1e8)
# le test se poursuit normalement
# ...
```

{{% /tab %}}

{{% tab "Importations de rapports JUnit" %}}

Pour `datadog-ci`, utilisez la variable d'environnement `DD_METRICS` ou l'argument CLI `--metrics` :

```
DD_METRICS="test.memory.usage:1000" datadog-ci junit upload --service my-service --metrics test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## Créer une facette

Créez une facette pour la métrique custom que vous avez ajoutée au test en accédant à la [page **Test Runs**][2] et en cliquant sur **+ Add** dans la liste des facettes.

{{< img src="/continuous_integration/facet_creation.png" text="Création de la facette sur la page des exécutions de test" style="width:100%" >}}

Assurez-vous de sélectionner **Measure** comme type de facette. La mesure représente une valeur numérique :

{{< img src="/continuous_integration/measure_creation.png" text="Création d'une mesure sur la page des exécutions de test" style="width:100%" >}}

Cliquez sur **Add** pour commencer à utiliser votre métrique custom.

## Générer un graphique illustrant l'évolution de votre métrique

Représentez l'évolution de votre métrique en sélectionnant la visualisation **Timeseries** :

{{< img src="/continuous_integration/plot_measure.png" text="Représenter la durée moyenne du benchmark" style="width:100%" >}}

Vous pouvez par exemple utiliser cette visualisation pour suivre l'évolution de l'utilisation de la mémoire dans vos tests.

## Exporter votre graphique

Vous pouvez exporter votre graphique au sein d'un [dashboard][3] ou d'un [notebook][4]. Pour créer un [monitor][5] basé sur ce graphique, cliquez sur le bouton **Export** :

{{< img src="/continuous_integration/export_measure.png" text="Exporter le graphique illustrant la durée moyenne du benchmark" style="width:100%" >}}

## Ajouter un monitor

Pour recevoir une alerte lorsque la valeur de votre métrique passe sous un certain seuil, créez un [monitor de test CI][6].

{{< img src="/continuous_integration/monitor_measure.png" text="Surveiller la durée moyenne du benchmark" style="width:100%" >}}

Ce type d'alerte peut par exemple vous prévenir lorsque l'utilisation de la mémoire atteint un certain seuil.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /fr/dashboards
[4]: /fr/notebooks
[5]: /fr/monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests