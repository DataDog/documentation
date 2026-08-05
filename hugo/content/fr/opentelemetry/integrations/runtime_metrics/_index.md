---
aliases:
- /fr/opentelemetry/runtime_metrics/
- /fr/opentelemetry/integrations/runtime_metrics/go/
- /fr/opentelemetry/integrations/runtime_metrics/dotnet/
- /fr/opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Métriques runtime APM
- link: /opentelemetry/mapping/metrics_mapping/
  tag: Documentation
  text: Mappage des métriques OpenTelemetry
title: Métriques de runtime OpenTelemetry
---

## Section Overview

Les métriques runtime fournissent des informations sur les performances des applications, notamment l'utilisation de la mémoire, la collecte des déchets et la parallélisation. Les bibliothèques de traçage de Datadog proposent la [collecte de métriques runtime][5] pour chaque langage pris en charge, et OpenTelemetry (OTel) collecte également des métriques runtime compatibles pouvant être envoyées à Datadog via les SDK OpenTelemetry.

## Compatibilité

Datadog prend en charge les métriques runtime OpenTelemetry pour les langages suivants :
- Java
- .NET
- Go

Pour en savoir plus sur le mappage des métriques de host et de conteneur, consultez la page [Mappage des métriques OpenTelemetry][1].

## Instructions de configuration

### 1. Prérequis

- Vous avez correctement [configuré l'envoi des métriques OpenTelemetry vers Datadog][2].
- Vous avez installé l'[intégration du langage correspondant dans Datadog][3].

### 2. Configurer votre application

Sélectionnez votre langage pour afficher les instructions de configuration du SDK OpenTelemetry afin d'envoyer des métriques runtime :

{{< tabs >}}
{{% tab "Java" %}}

#### Instrumentation automatique

Si vous utilisez l'[instrumentation automatique OpenTelemetry][3] pour les applications Java, les métriques runtime sont activées par défaut.

#### Instrumentation manuelle

Si vous utilisez l'[instrumentation manuelle OpenTelemetry][4], suivez les guides correspondant à votre version de Java :
- [Java 8][5]
- [Java 17][6]

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

Les applications OpenTelemetry Go sont [instrumentées manuellement][3]. Pour activer les métriques runtime, consultez la documentation du [package runtime][4].

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">La version minimale prise en charge du SDK OpenTelemetry pour .NET est la <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0</a></div>

#### Instrumentation automatique

Si vous utilisez l'[instrumentation automatique OpenTelemetry][3] pour les applications .NET, les métriques runtime sont activées par défaut.

#### Instrumentation manuelle

Si vous utilisez l'[instrumentation manuelle OpenTelemetry][4], consultez la documentation de la [bibliothèque OpenTelemetry.Instrumentation.Runtime][5].

#### Intervalle d'export des métriques

L'intervalle d'export des métriques par défaut pour le SDK OTel .NET diffère de celui du SDK Datadog .NET. Datadog recommande de définir la variable d'environnement [OTEL_METRIC_EXPORT_INTERVAL][7] sur votre service .NET afin de l'aligner sur l'intervalle d'export des métriques par défaut de Datadog :

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

{{% /tab %}}

{{< /tabs >}}

## Afficher les dashboards de métriques runtime

Une fois la configuration terminée, vous pouvez afficher les métriques runtime dans :
- La page de détails du service (exemple avec Java ci-dessous)
- L'onglet des métriques du flame graph
- [Dashboards runtime][7] par défaut

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Page des services affichant les métriques runtime OpenTelemetry dans l'onglet JVM Metrics" style="width:100%;" >}}

## Données collectées

Lorsque vous utilisez les métriques runtime OpenTelemetry avec Datadog, vous recevez à la fois :
- Les métriques runtime OpenTelemetry d'origine
- Les métriques runtime Datadog mappées pour les métriques équivalentes

Les métriques runtime OpenTelemetry ont les préfixes suivants selon leur source :

| Source | Préfixe |
| --- | --- |
| [Exportateur Datadog pour le Collector OTel][100] | `otel.process.runtime.*` |
| [Ingestion OTLP par l'Agent Datadog][101] | `process.runtime.*` |

Les tableaux suivants listent les métriques runtime Datadog prises en charge via le mapping OpenTelemetry. "N/A" signifie qu'il n'existe pas de métrique équivalente dans OpenTelemetry.

<div class="alert alert-danger">Les métriques runtime OpenTelemetry sont mappées vers Datadog par nom de métrique. Ne renommez pas les métriques host pour les métriques runtime OpenTelemetry, car cela rompt le mapping.</div>

[100]: /fr/opentelemetry/setup/collector_exporter/
[101]: /fr/opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Métrique Datadog | Rôle |  Métrique OpenTelemetry |
| --- | --- | --- |
| `jvm.heap_memory` | La mémoire totale du tas Java utilisée. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | La mémoire totale du tas Java engagée pour être utilisée. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | La mémoire initiale du tas Java allouée. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | La mémoire maximale du tas Java disponible. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | La mémoire non-tas Java totale utilisée. La mémoire non-tas correspond à : `Metaspace + CompressedClassSpace + CodeCache`. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | La mémoire non-tas Java totale engagée pour être utilisée. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | La mémoire non-tas Java initiale allouée. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | La mémoire non-tas Java maximale disponible. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | L'utilisation actuelle de la mémoire du tas Java du pool Old Generation. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | L'utilisation actuelle de la mémoire du tas Java du pool Eden. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | L'utilisation actuelle de la mémoire du tas Java du pool Survivor. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | L'utilisation actuelle de la mémoire non-tas Java du pool Metaspace. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.thread_count` | Le nombre de threads actifs. | `process.runtime.jvm.threads.count` <br> `jvm.thread.count` |
| `jvm.loaded_classes` | Nombre de classes actuellement chargées. | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` |
| `jvm.cpu_load.system` | Utilisation récente du CPU pour l'ensemble du système. | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | Utilisation récente du CPU pour le processus. | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | Mesure de la mémoire utilisée par les buffers directs. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.direct.count` | Nombre de buffers directs dans le pool. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.limit` | Mesure de la capacité mémoire totale des buffers directs. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | Mesure de la mémoire utilisée par les buffers mappés. | `process.runtime.jvm.buffer.usage`<br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.mapped.count` | Nombre de buffers mappés dans le pool. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.limit` | Mesure de la capacité mémoire totale des buffers mappés. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | Le temps approximatif cumulé écoulé pour la collecte des déchets. | S. O. |
| `jvm.gc.cms.count` | Le nombre total de collectes des déchets effectuées. | S. O. |
| `jvm.gc.major_collection_count` | Le taux de collectes majeures des déchets. Activez `new_gc_metrics: true` pour recevoir cette métrique. | S. O. |
| `jvm.gc.minor_collection_count` | Le taux de collectes mineures des déchets. Activez `new_gc_metrics: true` pour recevoir cette métrique. | S. O. |
| `jvm.gc.major_collection_time` | La fraction de temps passée en collecte majeure des déchets. Activez `new_gc_metrics: true` pour recevoir cette métrique. | S. O. |
| `jvm.gc.minor_collection_time` | La fraction de temps passée en collecte mineure des déchets. Activez `new_gc_metrics: true` pour recevoir cette métrique. | S. O. |
| `jvm.os.open_file_descriptors` | Le nombre de descripteurs de fichiers ouverts. | S. O. |

{{% /tab %}}

{{% tab "Go" %}}

| Métrique Datadog | Rôle |  Métrique OpenTelemetry |
| --- | --- | --- |
| `runtime.go.num_goroutine` | Nombre de goroutines créées. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | Nombre d'appels CGO effectués. |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | Nombre de recherches de pointeurs effectuées par le runtime. | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | Octets alloués pour les objets du tas. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | Octets de mémoire du tas obtenus auprès du système d'exploitation. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | Octets dans les spans inactives (non utilisées). | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | Octets dans les spans utilisées. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | Octets de mémoire physique retournés au système d'exploitation. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | Nombre d'objets alloués dans le tas. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | Nanosecondes cumulées en collecte des déchets (GC). | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | Nombre de cycles de GC terminés. | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | Nombre de CPU détectés par le runtime. | S. O. |
| `runtime.go.mem_stats.alloc` | Octets alloués pour les objets du tas. | S. O. |
| `runtime.go.mem_stats.total_alloc` | Octets cumulés alloués pour les objets du tas. | S. O. |
| `runtime.go.mem_stats.sys` | Total des octets de mémoire obtenus auprès du système d'exploitation. | S. O. |
| `runtime.go.mem_stats.mallocs` | Nombre cumulé d'objets du tas alloués. | S. O. |
| `runtime.go.mem_stats.frees` | Nombre cumulé d'objets du tas libérés. | S. O. |
| `runtime.go.mem_stats.stack_inuse` | Octets dans les spans de pile. | S. O. |
| `runtime.go.mem_stats.stack_sys` | Octets de mémoire de pile obtenus auprès du système d'exploitation. | S. O. |
| `runtime.go.mem_stats.m_span_inuse` | Octets alloués pour les structures mspan. | S. O. |
| `runtime.go.mem_stats.m_span_sys` | Octets de mémoire obtenus auprès du système d'exploitation pour les structures mspan. | S. O. |
| `runtime.go.mem_stats.m_cache_inuse` | Octets alloués pour les structures mcache. | S. O. |
| `runtime.go.mem_stats.m_cache_sys` | Octets de mémoire obtenus auprès du système d'exploitation pour les structures mcache. | S. O. |
| `runtime.go.mem_stats.buck_hash_sys` | Octets de mémoire dans les tables de hachage des buckets de profilage. | S. O. |
| `runtime.go.mem_stats.gc_sys` | Octets de mémoire dans les métadonnées de collecte des déchets. | S. O. |
| `runtime.go.mem_stats.other_sys` | Octets de mémoire dans la mémoire hors tas diversifiée. | S. O. |
| `runtime.go.mem_stats.next_gc` | Taille cible du tas pour le prochain cycle de GC. | S. O. |
| `runtime.go.mem_stats.last_gc` | Dernière collecte des déchets terminée, en nanosecondes depuis l'époque UNIX. | S. O. |
| `runtime.go.mem_stats.num_forced_gc` | Nombre de cycles de GC forcés par l'application appelant la fonction GC. | S. O. |
| `runtime.go.mem_stats.gc_cpu_fraction` | Fraction du temps CPU disponible pour ce programme utilisée par la GC depuis le démarrage du programme. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.min` | Distribution des temps de pause GC : valeurs minimales. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.25p` | Distribution des temps de pause GC : 25e percentile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.50p` | Distribution des temps de pause GC : 50e percentile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.75p` | Distribution des temps de pause GC : 75e percentile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribution des temps de pause GC : valeurs maximales. | S. O. |

{{% /tab %}}

{{% tab ".NET" %}}

| Métrique Datadog | Rôle |  Métrique OpenTelemetry |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | Nombre de fois où un thread s'est arrêté pour attendre un verrou. | `process.runtime.dotnet.`<br>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | Le nombre d'exceptions de premier niveau. | `process.runtime.dotnet.`<br>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | La taille du tas génération 0. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | La taille du tas génération 1. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | La taille du tas génération 2. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | La taille du tas des gros objets. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | Le nombre de collectes des déchets génération 0. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | Le nombre de collectes des déchets génération 1. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | Le nombre de collectes des déchets génération 2. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | Le nombre de millisecondes passées en exécution dans le noyau. | S. O. |
| `runtime.dotnet.cpu.user` | Le nombre de millisecondes passées en exécution hors noyau. | S. O. |
| `runtime.dotnet.cpu.percent` | Le pourcentage du CPU total utilisé par l'application. | S. O. |
| `runtime.dotnet.mem.committed` | Utilisation de la mémoire. | S. O. |
| `runtime.dotnet.threads.count` | Le nombre de threads. | S. O. |
| `runtime.dotnet.threads.workers_count` | Le nombre de workers dans le threadpool (uniquement .NET Core). | S. O. |
| `runtime.dotnet.threads.contention_time` | Le temps cumulé passé par les threads à attendre un verrou (uniquement .NET Core). | S. O. |
| `runtime.dotnet.gc.memory_load` | Le pourcentage d'utilisation totale de la mémoire par le processus. Le processus de garbage collection (GC) modifie son comportement lorsque cette valeur est supérieure à 85. (.NET Core uniquement) | S. O. |
| `runtime.dotnet.gc.pause_time` | La durée pendant laquelle la GC a suspendu les threads de l'application (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`requests.total` | Le nombre total de requêtes HTTP reçues par le serveur (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`requests.failed` | Le nombre de requêtes HTTP échouées reçues par le serveur (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`requests.current` | Le nombre total de requêtes HTTP démarrées mais pas encore terminées (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`requests.queue_length` | La longueur actuelle de la file d'attente des requêtes HTTP du serveur (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`connections.total` | Le nombre total de connexions HTTP établies avec le serveur (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`connections.current` | Le nombre actuel de connexions HTTP actives avec le serveur (uniquement .NET Core). | S. O. |
| `runtime.dotnet.aspnetcore.`<br>`connections.queue_length` | La longueur actuelle de la file d'attente des connexions HTTP du serveur (uniquement .NET Core). | S. O. |

{{% /tab %}}

{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/mapping/metrics_mapping/
[2]: /fr/opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /fr/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics