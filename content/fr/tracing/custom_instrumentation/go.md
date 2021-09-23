---
title: Instrumentation personnalisée Go
kind: documentation
aliases:
  - /fr/tracing/opentracing/go
  - /fr/tracing/manual_instrumentation/go
description: Appliquez la norme OpenTracing au traceur d'APM Go de Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
{{< alert type="info" >}}
Si vous n'avez pas encore lu les instructions d'instrumentation automatique et de configuration, commencez par les <a href="https://docs.datadoghq.com/tracing/setup/go/">Instructions de configuration Go</a>.
{{< /alert >}}

Cette page décrit des méthodes courantes pour configurer et personnaliser la visibilité sur votre application avec l'APM Datadog.

## Ajout de tags

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser votre visibilité dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

### Ajouter des tags de span personnalisés

Ajoutez directement des [tags][1] à une interface `Span` en appelant `SetTag` :

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<CLÉ_VALUE>", "<VALEUR_TAG>")
}

func main() {
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Les intégrations de Datadog utilisent le type `Context` pour propager la [span][2] active.
Si vous souhaitez ajouter des tags à une span associée à un `Context`, appelez la fonction `SpanFromContext` :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Récupérer une span pour une requête Web associée à un contexte Go.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Définir un tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### Ajouter des tags à l'ensemble des spans

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant l'option `WithGlobalTag` du traceur :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### Définir des erreurs sur une span

Pour définir une erreur sur une de vos spans, utilisez `tracer.WithError` comme ci-dessous :

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## Ajout de spans

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][3]), vous pouvez choisir d'instrumenter manuellement votre code.

### Créer manuellement une nouvelle span

Afin de bénéficier d'une instrumentation manuelle, utilisez le package `tracer`, dont l'utilisation est documentée sur la [page GoDoc][4] de Datadog :

Deux fonctions permettent de créer des spans. Les détails de l'API sont disponibles pour `StartSpan` [ici][5] et pour `StartSpanFromContext` [ici][6].

```go
//Créer une span
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

//Créer une span avec un nom de ressource, qui est l'enfant de parentSpan.
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Créer une span qui sera l'enfant de la span dans le contexte ctx, si une span figure dans le contexte.
// Renvoie la nouvelle span, et un nouveau contexte contenant la nouvelle span.
span, ctx := tracer.StartSpanFromContext(ctx, “mainOp”, tracer.ResourceName("/user"))
```

### Traces asynchrones

```go
func main() {
    span, ctx := tracer.StartSpanFromContext(context.Background(), “mainOp”)
    defer span.Finish()

    go func() {
        asyncSpan := tracer.StartSpanFromContext(ctx, “asyncOp”)
        defer asyncSpan.Finish()
        performOp()
    }()
}
```

### Tracing distribué

Créez une [trace][7] distribuée en propageant manuellement le contexte de tracing :

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

Pour continuer la trace, initialisez une nouvelle [span][2] côté serveur à partir du `Context` extrait :

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

## Configuration de l'Agent et du client de tracing

D'autres paramètres peuvent être configurés au niveau du client de tracing et de l'Agent Datadog pour la propagation en contexte avec les en-têtes B3, ainsi que pour empêcher des ressources spécifiques d'envoyer des traces à Datadog (si vous ne souhaitez pas que ces ces traces soient prises en compte pour le calcul des métriques, comme pour les checks de santé).

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][8] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge : `Datadog` et `B3`.

Configurez les styles d'injection via la variable d'environnement :
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configurez les styles d'extraction via la variable d'environnement :
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

Ces variables d'environnement prennent comme valeur une liste des styles d'en-tête autorisés pour l'injection ou l'extraction, séparés par des virgules. Par défaut, le style d'extraction `Datadog` est activé.

Si plusieurs styles d'extraction sont activés, les tentative d'extraction sont effectuées dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

### Filtrage de ressources

Vous pouvez configurer l'Agent de façon à exclure une ressource spécifique des traces envoyées par l'Agent à l'application Datadog. Pour empêcher l'envoi de ressources spécifiques, utilisez le paramètre `ignore_resources` dans le fichier `datadog.yaml`. Ce paramètre permet la création d'une liste contenant une ou plusieurs expressions régulières, qui indique à l'Agent de filtrer les traces en fonction de leur nom de ressource.

En cas d'exécution dans un environnement conteneurisé, définissez plutôt `DD_APM_IGNORE_RESOURCES` sur le conteneur avec l'Agent Datadog. Pour en savoir plus, [consultez la documentation ici][9].

Cela peut être utile pour exclure un check de santé ou tout autre trafic simulé du calcul des métriques de vos services.

```text
## @param ignore_resources - liste de chaînes, facultatif
## Une liste d'expressions régulières peut être spécifiée pour exclure certaines traces en fonction de leur nom de ressource.
## Toutes les entrées doivent être entourées de guillemets doubles et séparées par des virgules.
# ignore_resources: ["(GET|POST) /healthcheck"]
```

## OpenTracing

Datadog prend également en charge la norme OpenTracing. Pour en savoir plus, consultez l'[API OpenTracing][10] ou les informations de configuration ci-dessous.

### Configuration

Importez le [package `opentracer`][11] pour exposer le traceur Datadog en tant que traceur compatible avec [OpenTracing][12].

Un exemple d'utilisation courante :

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Lancer le traceur normal et le renvoyer sous la forme d'une interface opentracing.Tracer. Vous
    // pouvez utiliser le même ensemble d'options que celui que vous utilisez habituellement avec le traceur Datadog.
    t := opentracer.New(tracer.WithServiceName("<NOM_SERVICE>"))

    // Arrêter le traceur à l'aide de l'appel Stop habituel pour le paquet du traceur.
    defer tracer.Stop()

    // Définir le traceur OpenTracing global.
    opentracing.SetGlobalTracer(t)

    // Utiliser comme d'habitude l'API OpenTracing.
}
```

**Remarque** : vous pouvez utiliser l'[API OpenTracing][10] conjointement avec l'API normale ou les intégrations Datadog. Elles se basent toutes sur le même traceur. Consultez la [documentation relative à l'API][11] pour obtenir davantage d'exemples et de détails.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/setup/go/#compatibility
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /fr/tracing/visualization/#trace
[8]: https://github.com/openzipkin/b3-propagation
[9]: /fr/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[10]: https://github.com/opentracing/opentracing-go
[11]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[12]: http://opentracing.io