---
kind: documentation
title: Configurer Data Streams Monitoring pour .NET
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques .NET :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* Traceur .NET v2.28.0 ou version ultérieure ([.NET Core][2], [.NET Framework][3])

### Installation

.NET se sert de l'instrumentation automatique afin d'injecter et d'extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout ainsi que la relation entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka ou RabbitMQ (ou qui consomment des messages à partir de ces plateformes).

Par exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework