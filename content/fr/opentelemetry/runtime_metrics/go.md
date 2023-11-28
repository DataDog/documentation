---
code_lang: go
code_lang_weight: 30
kind: documentation
title: Métriques runtime Go OpenTelemetry
type: multi-code-lang
---

## Prérequis

- Vous arrivez à [envoyer des métriques OpenTelemetry à Datadog]|1].
- Vous avez installé l'intégration du langage [Go][2].

## Configuration du SDK OpenTelemetry

Les applications Go OpenTelemetry (OTel) sont [instrumentées manuellement][3]. Pour activer les métriques runtime, consultez la documentation du [package runtime][4] (en anglais).

## Mappage des métriques runtime

Le tableau ci-dessous répertorie les métriques runtime Datadog qui sont prises en charge grâce au mappage des métriques runtime OpenTelemetry. La valeur « S. O. » indique qu'aucun équivalent OpenTelemetry n'existe.

| Métrique Datadog | Description |  Équivalent OpenTelemetry |
| --- | --- | --- |
| `runtime.go.num_goroutine` | Nombre de goroutines générées. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | Nombre d'appels CGO effectués. |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | Nombre de recherches de pointeur effectuées par le runtime. | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | Nombre d'octets des objets de tas alloués. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | Nombre d'octets de mémoire de tas récupérés à partir du système d'exploitation. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | Nombre d'octets de spans en attente (non utilisées). | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | Nombre d'octets de spans utilisées. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | Nombre d'octets de mémoire physique renvoyés par le système d'exploitation. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | Nombre d'objets de tas alloués. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | Durée cumulée du nettoyage de mémoire en nanosecondes. | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | Nombre de cycles de nettoyage de mémoire effectués. | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | Nombre de processeurs détectés par le runtime. | S. O. |
| `runtime.go.mem_stats.alloc` | Nombre d'octets des objets de tas alloués. | S. O. |
| `runtime.go.mem_stats.total_alloc` | Nombre cumulé d'octets alloués aux objets de tas. | S. O. |
| `runtime.go.mem_stats.sys` | Nombre total d'octets de mémoire récupérés à partir du système d'exploitation. | S. O. |
| `runtime.go.mem_stats.mallocs` | Nombre cumulé d'objets de tas alloués. | S. O. |
| `runtime.go.mem_stats.frees` | Nombre cumulé d'objets de tas libérés. | S. O. |
| `runtime.go.mem_stats.stack_inuse` | Nombre d'octets de spans dans la pile. | S. O. |
| `runtime.go.mem_stats.stack_sys` | Nombre d'octets de mémoire dans la pile récupérés à partir du système d'exploitation. | S. O. |
| `runtime.go.mem_stats.m_span_inuse` | Nombre d'octets de structures mspan allouées. | S. O. |
| `runtime.go.mem_stats.m_span_sys` | Nombre d'octets de mémoire récupérés à partir du système d'exploitation pour des structures mspan. | S. O. |
| `runtime.go.mem_stats.m_cache_inuse` | Nombre d'octets de structures mcache allouées. | S. O. |
| `runtime.go.mem_stats.m_cache_sys` | Nombre d'octets de mémoire récupérés à partir du système d'exploitation pour des structures mcache. | S. O. |
| `runtime.go.mem_stats.buck_hash_sys` | Nombre d'octets de mémoire dédiée au profiling des tables de hachage à compartiments. | S. O. |
| `runtime.go.mem_stats.gc_sys` | Nombre d'octets de mémoire dédiée aux métadonnées de nettoyage de mémoire. | S. O. |
| `runtime.go.mem_stats.other_sys` | Nombre d'octets de mémoire dédiée aux opérations diverses en dehors du tas. | S. O. |
| `runtime.go.mem_stats.next_gc` | Taille cible du tas pour le prochain cycle de nettoyage de mémoire. | S. O. |
| `runtime.go.mem_stats.last_gc` | Dernier nettoyage de mémoire effectué, en nanosecondes depuis l'epoch UNIX. | S. O. |
| `runtime.go.mem_stats.num_forced_gc` | Nombre de cycles de nettoyage de mémoire forcés par l'application appelant la fonction dédiée. | S. O. |
| `runtime.go.mem_stats.gc_cpu_fraction` | Fraction du temps CPU disponible de ce programme qui a été utilisé par le nettoyage de mémoire depuis le lancement du programme. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.min` | Distribution des durées de pause du nettoyage de mémoire : valeurs minimales. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.25p` | Distribution des durées de pause du nettoyage de mémoire : 25e centile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.50p` | Distribution des durées de pause du nettoyage de mémoire : 50e centile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.75p` | Distribution des durées de pause du nettoyage de mémoire : 75e centile. | S. O. |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribution des durées de pause du nettoyage de mémoire : valeurs maximales. | S. O. |

[1]: /fr/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/go
[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime