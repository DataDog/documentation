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
## Injection automatique d'ID de trace

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

## Injection manuelle d'ID de trace

Le traceur Go expose deux appels d'API afin d'autoriser l'affichage des identifiants de [trace][2] et de [span][3] avec les déclarations de log, à l'aide des méthodes exportées à partir du type `SpanContext` :

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

    // Récupérer l'ID de trace et l'ID de span.
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Les ajouter aux messages de log en tant que champs :
    log.Printf("mon message de log dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

L'exemple ci-dessus explique comment utiliser le contexte de la span dans le paquet `log` de la bibliothèque standard. Cette même logique peut être appliquée aux paquets tiers.

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][4] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` and `dd.span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/visualization/#spans
[4]: /fr/logs/log_collection/go/#configure-your-logger
[5]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom