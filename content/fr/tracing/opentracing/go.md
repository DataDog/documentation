---
title: OpenTracing pour Go
kind: documentation
description: 'Appliquez la norme OpenTracing au traceur de l''APM Go de Datadog.'
further_reading:
    - link: tracing/connect_logs_and_traces
      tag: Documentation
      text: Associer vos logs à vos traces
    - link: tracing/manual_instrumentation
      tag: Documentation
      text: Instrumenter vos applications manuellement pour créer des traces
    - link: tracing/visualization/
      tag: Documentation
      text: Explorer vos services, ressources et traces
---

Importez le [paquet `opentracer`][1] pour exposer le traceur Datadog en tant que traceur compatible avec [OpenTracing][2].

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

**Remarque** : vous pouvez utiliser l'[API OpenTracing][3] conjointement avec l'API normale ou les intégrations Datadog. Elles se basent toutes sur le même traceur. Consultez la [documentation relative à l'API][1] pour obtenir davantage d'exemples et de détails.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[2]: http://opentracing.io
[3]: https://github.com/opentracing/opentracing-go
