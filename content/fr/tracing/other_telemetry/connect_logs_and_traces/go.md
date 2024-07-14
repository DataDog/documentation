---
aliases:
- /fr/tracing/connect_logs_and_traces/go
code_lang: go
code_lang_weight: 30
description: Associez vos logs Go à vos traces pour les mettre en corrélation dans
  Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: Corréler automatiquement vos logs de requête avec vos traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
kind: documentation
title: Mettre en corrélation vos logs Go avec vos traces
type: multi-code-lang
---

## Injection manuelle

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

L'exemple ci-dessus explique comment utiliser le contexte de la span dans le package `log` de la bibliothèque standard. Cette même logique peut être appliquée aux packages tiers.

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour parser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` et `dd.version` sont parsés en tant que chaînes. Pour en savoir plus, consultez la section [Les logs corrélés ne s'affichent pas dans le volet des ID de trace][2].

## Injection dans des logs logrus

Un hook pour le package logrus permettant d'associer automatiquement vos logs et vos spans est disponible.
Il est accessible dans dans le traceur Go.

```go
package main

import (
    "github.com/sirupsen/logrus"

    dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Facultatif : remplacez le format du log par le format JSON (Cf. Collecte de logs Go)
    logrus.SetFormatter(&logrus.JSONFormatter{})

    // Ajoutez un hook de log de contexte Datadog
    logrus.AddHook(&dd_logrus.DDContextLogHook{}) 

    // ...
}
```

Cela injecte automatiquement l'identifiant de la trace dans vos logs lorsque vous créez un log avec le contexte.
```go
    // Log avec le contexte
    logrus.WithContext(ctx).Info("Go logs and traces connected!")
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/go/#configure-your-logger
[2]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom