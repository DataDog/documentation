---
title: Métriques APM envoyées par l'Agent Datadog
kind: Documentation
aliases:
  - /fr/agent/faq/agent-apm-metrics/
---
Vous trouverez ci-dessous la liste des métriques par défaut envoyées par l'Agent Datadog lorsque [APM est activé][1] :

| Nom de la métrique                                                 | Type  | Description                                                                                                                     |
| ----------------------------------------------------------- | ----- | -----                                                                                                                           |
| `datadog.trace_agent.obfuscations`                          | Total | Augmente de un à chaque obfuscation de déclaration SQL.                                                                         |
| `datadog.trace_agent.started`                               | Total | Augmente de un chaque fois que l'Agent démarre.                                                                                   |
| `datadog.trace_agent.panic`                                 | Gauge | Augmente de un à chaque panique du code.                                                                                           |
| `datadog.trace_agent.heartbeat`                             | Gauge | Augmente de un toutes les 10 secondes.                                                                                              |
| `datadog.trace_agent.heap_alloc`                            | Gauge | Allocations dans le tas (heap) selon le runtime Go.                                                                                 |
| `datadog.trace_agent.cpu_percent`                           | Gauge | Charge processeur (en cœur). Ex. : 50 (0,5 cœur), 200 (deux cœurs), 250 (2,5 cœurs).                                                   |
| `datadog.trace_agent.ratelimit`                             | Gauge | Si inférieure à 1, indique que des charges utiles sont refusées en raison d'une utilisation trop importante des ressources (processeur ou mémoire).                                |
| `datadog.trace_agent.normalizer.spans_malformed`            | Total | Nombre de spans contenant des champs incorrects ayant dû être modifiées pour être acceptées par le système. |
| `datadog.trace_agent.receiver.trace`                        | Total | Nombre de traces reçues et acceptées.                                                                                         |
| `datadog.trace_agent.receiver.traces_received`              | Total | Identique à ci-dessus. |
| `datadog.trace_agent.receiver.traces_dropped`               | Total | Traces non envoyées en raison d'une erreur de normalisation.                                                                                     |
| `datadog.trace_agent.receiver.traces_filtered`              | Total | Traces filtrées par des ressources ignorées (comme défini dans le fichier `datadog.yaml`).                                                       |
| `datadog.trace_agent.receiver.traces_priority`              | Total | Traces comportant le tag `priority` traitées par le service d'échantillonnage par ordre de priorité.                                                              |
| `datadog.trace_agent.receiver.traces_bytes`                 | Total | Total d'octets de charges utiles acceptés par l'Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_received`               | Total | Total d'octets de charges utiles reçus par l'Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_dropped`                | Total | Total d'octets de charges utiles perdus par l'Agent.                                                                                   |
| `datadog.trace_agent.receiver.spans_filtered`               | Total | Total d'octets de charges utiles filtrés par l'Agent.                                                                                   |
| `datadog.trace_agent.receiver.events_extracted`             | Total | Total d'événements APM échantillonnés                                                                                                       |
| `datadog.trace_agent.receiver.events_sampled`               | Total | Total d'événements APM échantillonnés par le service d'échantillonnage du paramètre `max_events_per_second`.                                                      |
| `datadog.trace_agent.receiver.payload_accepted`             | Total | Nombre de charges utiles acceptées par l'Agent.                                                                                       |
| `datadog.trace_agent.receiver.payload_refused`              | Total | Nombre de charges utiles rejetées par le récepteur à cause de l'échantillonnage.                                                            |
| `datadog.trace_agent.receiver.error`                        | Total | Nombre de rejets d'une charge utile par l'API en raison d'une erreur de décodage, de mise en forme ou autre. |
| `datadog.trace_agent.receiver.oom_kill`                     | Total | Nombre de fois où l'Agent s'est automatiquement fermé en raison d'une utilisation excessive de la mémoire (150 % de max_memory).                                       |
| `datadog.trace_agent.receiver.tcp_connections`              | Total | Nombre de connexions TCP parvenant à l'Agent. |
| `datadog.trace_agent.receiver.out_chan_fill`                | Gauge | Métrique interne. Pourcentage de remplissage sur le canal de sortie du récepteur. |
| `datadog.trace_agent.trace_writer.flush_duration`           | Gauge | Temps nécessaire pour transmettre une charge utile à l'API Datadog.                                                                             |
| `datadog.trace_agent.trace_writer.encode_ms`                | Gauge | Temps (en millisecondes) passé à encoder une charge utile de traces. |
| `datadog.trace_agent.trace_writer.compress_ms`              | Gauge | Temps (en millisecondes) passé à compresser une charge utile de traces encodée. |
| `datadog.trace_agent.trace_writer.payloads`                 | Total | Nombre de charges utiles traitées. |
| `datadog.trace_agent.trace_writer.connection_fill`          | Histogram | Pourcentage de connexions sortantes utilisées par le service d'écriture de traces. |
| `datadog.trace_agent.trace_writer.queue_fill`               | Histogram | Pourcentage de remplissage de la file d'attente des charges utiles sortantes. |
| `datadog.trace_agent.trace_writer.dropped`                  | Total | Nombre de charges utiles non envoyées en raison d'une erreur HTTP sans nouvelle tentative possible. |
| `datadog.trace_agent.trace_writer.dropped_bytes`            | Total | Nombre d'octets non envoyés en raison d'une erreur HTTP sans nouvelle tentative possible. |
| `datadog.trace_agent.trace_writer.payloads`                 | Total | Le nombre de charges utiles envoyées.                                                                                                        |
| `datadog.trace_agent.trace_writer.traces`                   | Total | Nombre de traces traitées.                                                                                                     |
| `datadog.trace_agent.trace_writer.events`                   | Total | Nombre d'événements traités.                                                                                                     |
| `datadog.trace_agent.trace_writer.spans`                    | Total | Nombre de spans traitées.                                                                                                      |
| `datadog.trace_agent.trace_writer.bytes`                    | Total | Nombre d'octets envoyés (calcul effectué après Gzip).                                                                                   |
| `datadog.trace_agent.trace_writer.bytes_uncompressed`       | Total | Nombre d'octets envoyés (calcul effectué avant Gzip).                                                                                  |
| `datadog.trace_agent.trace_writer.bytes_estimated`          | Total | Nombre d'octets estimé par l'algorithme interne de l'Agent.                                                                          |
| `datadog.trace_agent.trace_writer.retries`                  | Total | Nombre de nouvelles tentatives après un échec de l'envoi vers l'API Datadog.                                                                               |
| `datadog.trace_agent.trace_writer.errors`                   | Total | Erreurs sans nouvelle tentative possible.                                                                                               |
| `datadog.trace_agent.stats_writer.stats_buckets`            | Total | Nombre de compartiments de statistiques vidés.                                                                                                |
| `datadog.trace_agent.stats_writer.bytes`                    | Total | Nombre d'octets envoyés (calcul effectué après Gzip).                                                                                   |
| `datadog.trace_agent.stats_writer.retries`                  | Total | Nombre de nouvelles tentatives après un échec de l'envoi vers l'API Datadog.                                                                                |
| `datadog.trace_agent.stats_writer.splits`                   | Total | Nombre de fois où une charge utile a été divisée en plusieurs charges utiles.                                                                         |
| `datadog.trace_agent.stats_writer.errors`                   | Total | Erreurs sans nouvelle tentative possible.                                                                                               |
| `datadog.trace_agent.stats_writer.encode_ms`                | Histogram | Temps passé à encoder une charge utile de statistiques. |
| `datadog.trace_agent.stats_writer.connection_fill`          | Histogram | Pourcentage de connexions sortantes utilisées. | 
| `datadog.trace_agent.stats_writer.queue_fill`               | Histogram | Pourcentage de remplissage de la file d'attente. |
| `datadog.trace_agent.stats_writer.dropped`                  | Total | Nombre de charges utiles non envoyées en raison d'une erreur HTTP sans nouvelle tentative possible. |
| `datadog.trace_agent.stats_writer.dropped_bytes`            | Total | Nombre d'octets non envoyés en raison d'une erreur HTTP sans nouvelle tentative possible. |
| `datadog.trace_agent.service_writer.services`               | Total | Nombre de services vidés.                                                                                                      |
| `datadog.trace_agent.events.max_eps.max_rate`               | Gauge | Similaire au paramètre de configuration de l'Agent `max_events_per_second`.                                                                   |
| `datadog.trace_agent.events.max_eps.reached_max`            | Gauge | Définie sur `1` chaque fois que la valeur `max_events_per_second` est atteinte. Définie sur `0` le reste du temps.                                                |
| `datadog.trace_agent.events.max_eps.current_rate`           | Gauge | Nombre d'événements APM par seconde reçus par l'Agent                                                                            |
| `datadog.trace_agent.events.max_eps.sample_rate`            | Gauge | Taux d'échantillonnage appliqué par l'Agent pour les événements qu'il a reçus.                                                                          |

[1]: /fr/tracing/setup