---
title: Associer vos logs Go à vos traces
kind: documentation
description: Associez vos logs Go à vos traces pour les mettre en corrélation dans Datadog.
further_reading:
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement vos logs de requête avec vos traces
---
## Injecter manuellement les ID des traces et des spans

L'API du traceur Go vous permet d'ajouter des informations sur les spans aux messages de log, à l'aide du spécificateur de format `%v` :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Ajouter les informations sur les spans aux messages de log :
    log.Printf("mon message de log %v", span)
}
```

L'exemple ci-dessus explique comment utiliser le contexte de la span dans le paquet `log` de la bibliothèque standard. Cette même logique peut être appliquée aux paquets tiers.

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour parser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` et `dd.version` sont parsés en tant que chaînes. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs/log_collection/go/#configure-your-logger
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom