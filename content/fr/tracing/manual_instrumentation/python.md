---
title: Instrumentation manuelle Python
kind: documentation
decription: Instrumentez manuellement votre application Python afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `ddtrace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

Les exemples suivants utilisent l'objet traceur global, qui peut être importé à l'aide de la commande :

```python
from ddtrace import tracer
```

{{< tabs >}}
{{% tab "Décorateur" %}}

`ddtrace` fournit un décorateur permettant de tracer une méthode spécifique de votre application :

```python
  @tracer.wrap()
  def business_logic():
    """Une méthode pertinente à tracer."""
    # ...
    # ...
```

Consultez [`ddtrace.Tracer.wrap()`][1] pour obtenir des détails sur l'API pour le décorateur.


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Gestionnaire de contextes" %}}

Pour tracer un bloc arbitraire de code, vous pouvez utiliser le gestionnaire de contextes [`ddtrace.Span`][1] :

```python
  # tracer une opération pertinente
  with tracer.trace('operations.pertinentes'):
    # ajouter une ou plusieurs opérations pertinentes
    # ...
    # ...
```

Consultez [`ddtrace.Tracer()`][2] pour obtenir davantage de détails sur l'API.


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "API" %}}

Si l'utilisation du décorateur et du gestionnaire de contextes ne vous permet pas de répondre à vos besoins en tracing, vous pouvez utiliser l'API manuelle fournie afin d'initialiser des [spans][1] et d'y mettre fin comme bon vous semble :

```python
  span = tracer.trace('operations.pertinentes')

  # ajouter une ou plusieurs opérations pertinentes ici

  # REMARQUE : assurez-vous d'appeler span.finish(), sans quoi la trace entière ne sera pas envoyée
  # à Datadog
  span.finish()
```

Consultez les ressources ci-dessous pour obtenir des détails sur l'API :

- [`ddtrace.Tracer.trace`][2]
- [`ddtrace.Span.finish`][3]


[1]: /fr/tracing/visualization/#spans
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/python/#compatibility