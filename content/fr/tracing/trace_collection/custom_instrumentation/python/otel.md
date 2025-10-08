---
aliases:
- /fr/tracing/trace_collection/otel_instrumentation/python/
- /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
code_lang: otel
code_lang_weight: 2
description: 'Instrumentez votre application Python avec l''API OpenTelemetry pour
  envoyer des traces à Datadog. '
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog
title: Instrumentation personnalisée Python avec l'API OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## Configuration

Pour configurer OpenTelemetry de façon à utiliser le fournisseur de traces Datadog :

1. Si vous n'avez pas encore lu les instructions relatives à l'auto-instrumentation et à la configuration, commencez par consulter les [instructions pour la configuration de Python][1].

1. Définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` sur `true`.

### Créer des spans personnalisées

Pour créer des spans personnalisées dans un contexte de trace existant :

{{< highlight python "hl_lines=6" >}}
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Effectuez les tâches que vous souhaitez suivre avec la span
        print("Doing work...")
        # Lorsque le bloc 'with' prend fin, la span est automatiquement fermée
{{< /highlight >}}

## Accès aux spans actives

Pour accéder à la span actuellement active, utilisez la fonction `get_current_span()` :

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# ajouter des informations à 'current_span'
```

## Ajouter des tags de span

Ajouter des attributs à une span pour fournir un contexte ou des métadonnées supplémentaires.

Voici un exemple de la façon d'ajouter des attributs à la span actuelle :

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/python/