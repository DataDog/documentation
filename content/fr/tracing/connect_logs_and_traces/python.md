---
title: Associer vos logs Python à vos traces
kind: documentation
description: Associez vos logs Python à vos traces pour les mettre en corrélation dans Datadog.
further_reading:
  - link: /tracing/manual_instrumentation/
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: /tracing/opentracing/
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: /tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
## Injecter automatiquement les ID de trace et de span

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` lorsque vous utilisez `ddtrace-run`.
Si vous avez configuré votre traceur avec les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION`, alors `env`, `service` et `version` seront également ajoutés automatiquement. Pour en savoir plus, consultez la [section relative au tagging de service unifié][1].

**Remarque** : l'auto-injection prend en charge la bibliothèque standard `logging`, ainsi que toutes les bibliothèques qui complètent le module de bibliothèque standard, comme la bibliothèque `json_log_formatter`. `ddtrace-run` appelle `logging.basicConfig` avant l'exécution de votre application. Si le logger racine possède un gestionnaire configuré, votre application doit modifier directement le logger racine et le gestionnaire.

## Injecter manuellement des ID de trace et de span

### Avec le module Logging de la bibliothèque standard

Si vous préférez corréler manuellement vos [traces][2] avec vos logs, patchez votre module `logging` en modifiant votre formateur de log de façon à inclure les attributs ``dd.trace_id`` et ``dd.span_id`` à partir de l'entrée de log.

De même, ajoutez ``dd.env``, ``dd.service`` et ``dd.version`` en tant qu'attributs pour votre entrée de log.

La configuration ci-dessous est utilisée par la méthode d'injection automatique et prise en charge par défaut par l'intégration de log Python :

``` python
from ddtrace import patch_all; patch_all(logging=True)
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

### Sans le module Logging de la bibliothèque standard

Si vous n'utilisez pas le module `logging` de la bibliothèque standard, vous pouvez utiliser la commande `ddtrace.helpers.get_correlation_ids()` pour injecter les informations du traceur dans vos logs.
Les exemples suivants illustrent cette approche, en définissant une fonction en tant que *processeur* dans `structlog` afin d'ajouter des champs de traceur à la sortie de log :

``` python
import ddtrace
from ddtrace.helpers import get_correlation_ids

import structlog

def tracer_injection(logger, log_method, event_dict):
    # obtenir les identifiants de corrélation à partir du contexte du traceur actuel
    trace_id, span_id = get_correlation_ids()

    # ajouter les identifiants au dictionnaire d'événements structlog
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

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
{"event": "In tracer context", "dd": {"trace_id": 9982398928418628468, "span_id": 10130028953923355146, "env": "dev", "service": "hello", "version": "abc123"}}
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][3] pour parser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et `dd.span_id` sont parsés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][4].

[Consultez la documentation relative à la journalisation Python][3] pour vérifier que l'intégration de log Python est bien configurée et que vos logs Python sont automatiquement parsés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/tracing/visualization/#trace
[3]: /fr/logs/log_collection/python/#configure-the-datadog-agent
[4]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom