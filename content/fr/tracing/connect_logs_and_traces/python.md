---
description: Associez vos logs Python à vos traces pour les mettre en corrélation
  dans Datadog.
further_reading:
- link: /tracing/manual_instrumentation/
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: /tracing/opentracing/
  tag: Documentation
  text: Implémenter Opentracing dans vos applications
- link: /tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Corréler automatiquement des logs de requête avec des traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
kind: documentation
title: Associer vos logs Python à vos traces
---

## Injection

### Logging de la bibliothèque standard

Pour mettre en corrélation vos [traces][2] et vos logs, modifiez le format de vos logs de façon à inclure les attributs requis de l'entrée de log et à appeler `ddtrace.patch(logging=True)`.

Ajoutez les attributs ``dd.env``, ``dd.service``, ``dd.version``, ``dd.trace_id`` et ``dd.span_id`` pour votre entrée de log dans la chaîne de format.

L'exemple suivant utilise `logging.basicConfig` pour configurer l'injection de logs :

``` python
from ddtrace import patch; patch(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

### Aucun logging de la bibliothèque standard

Si vous n'utilisez pas le module `logging` de la bibliothèque standard, vous pouvez utiliser le code suivant pour injecter les informations du traceur dans vos logs :

```python
from ddtrace import tracer

span = tracer.current_span()
correlation_ids = (span.trace_id, span.span_id) if span else (None, None)
```
L'exemple suivant illustre cette approche, en définissant une fonction en tant que *processeur* dans `structlog` afin d’ajouter des champs de traceur à la sortie de log :

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # obtenir les identifiants de corrélation à partir du contexte du traceur actuel
    span = tracer.current_span()
    trace_id, span_id = (span.trace_id, span.span_id) if span else (None, None)

    # ajouter les identifiants au dictionnaire d'événements structlog
    event_dict['dd.trace_id'] = str(trace_id or 0)
    event_dict['dd.span_id'] = str(span_id or 0)

    # ajouter les tags env, service et version configurés pour le traceur
    event_dict['dd.env'] = ddtrace.config.env or ""
    event_dict['dd.service'] = ddtrace.config.service or ""
    event_dict['dd.version'] = ddtrace.config.version or ""

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Une fois le logger configuré, si vous exécutez une fonction tracée qui logue un événement, vous obtenez les informations du traceur injecté :

```text
>>> traced_func()
{"event": "In tracer context", "dd.trace_id": 9982398928418628468, "dd.span_id": 10130028953923355146, "dd.env": "dev", "dd.service": "hello", "dd.version": "abc123"}
```

**Remarque** :  si vous n’utilisez pas une [intégration de log de Datadog][3] pour parser vos logs, des règles de parsing de log personnalisées doivent s’assurer que `dd.trace_id` et `dd.span_id` sont parsés en tant que chaînes de caractères et remappés grâce au [remappeur de traces][4]. Pour en savoir plus, consultez la FAQ [Pourquoi mes logs mis en corrélation ne figurent-ils pas dans le volet des ID de trace ?][5].

[Consultez la documentation relative à la journalisation Python][3] pour vérifier que l'intégration de log Python est bien configurée et que vos logs Python sont automatiquement parsés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/tracing/visualization/#trace
[3]: /fr/logs/log_collection/python/#configure-the-datadog-agent
[4]: /fr/logs/log_configuration/processors/#trace-remapper
[5]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom