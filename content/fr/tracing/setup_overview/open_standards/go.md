---
title: Standards ouverts Go
kind: documentation
description: 'Standard ouverts pour Go'
code_lang: go
type: multi-code-lang
code_lang_weight: 30
---

## OpenTracing

Datadog prend également en charge la norme OpenTracing. Pour en savoir plus, consultez l'[API OpenTracing][1] ou les informations de configuration ci-dessous.

### Configuration

Importez le [package `opentracer`][2] pour exposer le traceur Datadog en tant que traceur compatible avec [OpenTracing][3].

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

[1]: https://github.com/opentracing/opentracing-go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[3]: http://opentracing.io
