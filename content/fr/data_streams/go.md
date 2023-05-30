---
kind: documentation
title: Configurer Data Streams Monitoring pour Go
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Data Streams Monitoring :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* [Bibliothèque Data Streams v0.2 ou version ultérieure][2]

### Installation

Initiez un chemin Data Streams avec `datastreams.Start()` au début de votre pipeline.

Deux types d'instrumentation sont disponibles :
- Une instrumentation pour les charges de travail basées sur Kafka
- Une instrumentation personnalisée pour les autres technologies ou protocoles de mise en file d'attente

<div class="alert alert-info"><code>localhost:8126</code> correspond à l'URL par défaut de l'Agent de trace. Si l'URL diffère pour votre application, utilisez l'option <code>datastreams.Start(datastreams.WithAgentAddr("notlocalhost:8126"))</code>.</div>

### Instrumentation Kafka

1. Configurez les producteurs pour qu'ils appellent `TraceKafkaProduce()` avant d'envoyer un message Kafka :

   ```go
   import (ddkafka "github.com/DataDog/data-streams-go/integrations/kafka")
   ...
   ctx = ddkafka.TraceKafkaProduce(ctx, &kafkaMsg)
   ```

   Cette fonction ajoute un nouveau point de contrôle sur n'importe quel chemin existant dans le contexte Go fourni, ou crée un nouveau chemin si aucun chemin n'est trouvé. Elle ajoute ensuite le chemin aux en-têtes de votre message Kafka.

2. Configurez les consommateurs pour qu'ils appellent `TraceKafkaConsume()` :

   ```go
   import ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
   ...
   ctx = ddkafka.TraceKafkaConsume(ctx, &kafkaMsg, consumer_group)
   ```

   Cette fonction extrait le chemin emprunté par un message Kafka. Elle définit un nouveau point de contrôle sur le chemin pour enregistrer la consommation d'un message et stocke le chemin dans le contexte Go fourni.

   **Remarque** : la sortie `ctx` de `TraceKafkaProduce()` et la sortie `ctx` de `TraceKafkaConsume()` contiennent toutes deux des informations concernant le chemin mis à jour.

Pour `TraceKafkaProduce()`, ne réutilisez pas la sortie `ctx` pour l'ensemble des appels si vous envoyez plusieurs messages Kafka simultanément (fan-out).

Pour `TraceKafkaConsume()`, si vous agrégez plusieurs messages dans le but de créer un nombre réduit de charges utiles (fan-in), appelez `MergeContext()` afin de fusionner les contextes en un contexte unique pouvant être transmis dans l'appel `TraceKafkaProduce()` suivant :

```go
import (
    datastreams "github.com/DataDog/data-streams-go"
    ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
)

...

contexts := []Context{}
for (...) {
    contexts.append(contexts, ddkafka.TraceKafkaConsume(ctx, &consumedMsg, consumer_group))
}
mergedContext = datastreams.MergeContexts(contexts...)

...

ddkafka.TraceKafkaProduce(mergedContext, &producedMsg)
```

### Instrumentation manuelle

Vous pouvez également utiliser l'instrumentation manuelle. Par exemple, pour le HTTP, vous pouvez propager le chemin avec des en-têtes HTTP.

Pour injecter un chemin :

```go
req, err := http.NewRequest(...)
...
p, ok := datastreams.PathwayFromContext(ctx)
if ok {
   req.Headers.Set(datastreams.PropagationKeyBase64, p.EncodeStr())
}
```

Pour extraire un chemin :

```go
func extractPathwayToContext(req *http.Request) context.Context {
    ctx := req.Context()
    p, err := datastreams.DecodeStr(req.Header.Get(datastreams.PropagationKeyBase64))
    if err != nil {
        return ctx
    }
    ctx = datastreams.ContextWithPathway(ctx, p)
    _, ctx = datastreams.SetCheckpoint(ctx, "type:http")
}
```

### Ajouter une dimension

Vous pouvez ajouter une autre dimension aux métriques de latence de bout en bout avec le tag `event_type` :

```go
_, ctx = datastreams.SetCheckpoint(ctx, "type:internal", "event_type:sell")
```

Vous ne devez ajouter le tag `event_type` qu'au premier service de chaque chemin. Les données à forte cardinalité (telles que les ID de requête ou les hosts) ne sont pas prises en charge en tant que valeurs pour le tag `event_type`.

[1]: /fr/agent
[2]: https://github.com/DataDog/data-streams-go