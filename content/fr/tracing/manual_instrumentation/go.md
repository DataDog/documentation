---
title: Instrumentation manuelle Go
kind: documentation
decription: Instrumentez manuellement votre application Go afin d'envoyer des traces personnalisées à Datadog.
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
Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

## Tracing unique

Afin de bénéficier d'une instrumentation manuelle, utilisez le paquet `tracer`, dont l'utilisation est documentée sur la [page GoDoc][2] de Datadog :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Lancer le traceur avec zéro ou au moins une option.
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()

    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Définir les métadonnées.
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}
```

## Tracing distribué

Créez une [trace][3] distribuée en propageant manuellement le contexte de tracing :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Injecter le contexte de la span dans les en-têtes de requête
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // Erreur de traitement ou d'injection de log
    }
    http.DefaultClient.Do(req)
}
```

Pour continuer la trace, initialisez une nouvelle [span][4] côté serveur à partir du `Context` extrait :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extraire le contexte de la span et continuer la trace dans ce service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Erreur de traitement ou d'extraction de log
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/go/#compatibility
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[3]: /fr/tracing/visualization/#trace
[4]: /fr/tracing/visualization/#spans