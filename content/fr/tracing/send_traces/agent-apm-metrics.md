---
title: Métriques APM envoyées par l'Agent Datadog
kind: Documentation
aliases:
  - /fr/agent/faq/agent-apm-metrics/
---
Vous trouverez ci-dessous la liste des métriques par défaut envoyées par l'Agent Datadog lorsque [APM est activé][1] :

| Nom de la métrique                                           | Type  | Description                                                                                                                     |
| ----------------------------------------------------- | ----- | -----                                                                                                                           |
| `datadog.trace_agent.started`                         | Total | Augmenter la valeur de un chaque fois que l'Agent démarre.                                                                                   |
| `datadog.trace_agent.panic`                           | Gauge | Augmenter la valeur de un à chaque panique de code.                                                                                           |
| `datadog.trace_agent.heartbeat`                       | Gauge | Augmenter la valeur de un toutes les 10 secondes.                                                                                              |
| `datadog.trace_agent.heap_alloc`                      | Gauge | Allocations de tas comme indiquées par le runtime Go.                                                                                 |
| `datadog.trace_agent.cpu_percent`                     | Gauge | Utilisation du processeur (en cœur), par exemple, 50 (un demi cœur), 200 (deux cœurs), 250 (2,5 cœurs)                                                   |
| `datadog.trace_agent.presampler_rate`                 | Gauge | Si le résultat est inférieur à 1, cela signifie que les charges utiles sont refusées à cause d'une forte utilisation de ressources (processeur ou mémoire).                                |
| `datadog.trace_agent.receiver.traces_received`        | Total | Nombre de traces reçues et acceptées.                                                                                         |
| `datadog.trace_agent.receiver.traces_dropped`         | Total | Traces supprimées à cause d'erreurs de normalisation.                                                                                     |
| `datadog.trace_agent.receiver.traces_filtered`        | Total | Traces filtrées par des ressources ignorées (comme défini dans le fichier `datadog.yaml`).                                                       |
| `datadog.trace_agent.receiver.traces_priority`        | Total | Traces traitées par l'échantillonnage de priorité qui comportent le tag `priority`.                                                              |
| `datadog.trace_agent.receiver.traces_bytes`           | Total | Total d'octets de charges utiles acceptés par l'Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_received`         | Total | Total d'octets de charges utiles reçus par l'Agent.                                                                                  |
| `datadog.trace_agent.receiver.spans_dropped`          | Total | Total d'octets de charges utiles perdus par l'Agent.                                                                                   |
| `datadog.trace_agent.receiver.spans_filtered`         | Total | Total d'octets de charges utiles filtrés par l'Agent.                                                                                   |
| `datadog.trace_agent.receiver.services_received`      | Total | Services reçus dans les endpoints de services `/v0.x/`.                                                                               |
| `datadog.trace_agent.receiver.services_bytes`         | Total | Octets acceptés dans les endpoints de services `/v0.x/`.                                                                                  |
| `datadog.trace_agent.receiver.events_extracted`       | Total | Total d'événements APM échantillonnés                                                                                                       |
| `datadog.trace_agent.receiver.events_sampled`         | Total | Total d'événements APM échantillonnés par l'échantillonneur de paramètres `max_events_per_second`.                                                      |
| `datadog.trace_agent.receiver.payload_accepted`       | Total | Nombre de charges utiles acceptées par l'Agent.                                                                                       |
| `datadog.trace_agent.receiver.payload_refused`        | Total | Nombre de charges utiles rejetées par le récepteur à cause de l'échantillonnage.                                                            |
| `datadog.trace_agent.receiver.suicide`                | Total | Nombre de fois où l'Agent a abandonné à cause d'une utilisation excessive de la mémoire (150 % de mémoire_max).                                       |
| `datadog.trace_agent.trace_writer.flush_duration`     | Gauge | Temps nécessaire pour transmettre une charge utile à l'API Datadog.                                                                             |
| `datadog.trace_agent.trace_writer.payloads`           | Total | Nombre de charges utiles envoyées.                                                                                                        |
| `datadog.trace_agent.trace_writer.traces`             | Total | Nombre de traces traitées.                                                                                                     |
| `datadog.trace_agent.trace_writer.events`             | Total | Nombre d'événements traités.                                                                                                     |
| `datadog.trace_agent.trace_writer.spans`              | Total | Nombre de spans traitées.                                                                                                      |
| `datadog.trace_agent.trace_writer.bytes`              | Total | Nombre d'octets envoyés (calcul effectué après Gzip).                                                                                   |
| `datadog.trace_agent.trace_writer.bytes_uncompressed` | Total | Nombre d'octets envoyés (calcul effectué avant Gzip).                                                                                  |
| `datadog.trace_agent.trace_writer.bytes_estimated`    | Total | Nombre d'octets estimé par l'algorithme interne de l'Agent.                                                                          |
| `datadog.trace_agent.trace_writer.retries`            | Total | Nombre de nouvelles tentatives sur les échecs pour l'API Datadog.                                                                               |
| `datadog.trace_agent.trace_writer.errors`             | Total | Erreurs sans nouvelles tentatives.                                                                                               |
| `datadog.trace_agent.trace_writer.single_max_size`    | Total | Augmente la valeur de un lorsqu'une seule trace a été perdue car elle était supérieure à la taille maximale autorisée par l'API Datadog (3.2M). |
| `datadog.trace_agent.stats_writer.flush_duration`     | Gauge | Le temps nécessaire pour transmettre une charge utile à l'API Datadog.                                                                             |
| `datadog.trace_agent.stats_writer.payloads`           | Total | Le nombre de charges utiles envoyées.                                                                                                        |
| `datadog.trace_agent.stats_writer.stats_buckets`      | Total | Nombre de compartiments de statistiques vidés.                                                                                                |
| `datadog.trace_agent.stats_writer.bytes`              | Total | Nombre d'octets envoyés (calcul effectué après Gzip).                                                                                   |
| `datadog.trace_agent.stats_writer.retries`            | Total | Nombre de nouvelles tentatives sur les échecs pour l'API Datadog                                                                                |
| `datadog.trace_agent.stats_writer.splits`             | Total | Nombre de fois qu'une charge utile a été divisée.                                                                         |
| `datadog.trace_agent.stats_writer.errors`             | Total | Erreurs sans nouvelles tentatives.                                                                                               |
| `datadog.trace_agent.service_writer.services`         | Total | Nombre de services vidés.                                                                                                      |
| `datadog.trace_agent.events.max_eps.max_rate`         | Gauge | Similaire au paramètre `max_events_per_second` de configuration de l'Agent.                                                                   |
| `datadog.trace_agent.events.max_eps.reached_max`      | Gauge | Est défini sur `1` chaque fois que `max_events_per_second` est atteint, sinon il est sur `0`.                                                |
| `datadog.trace_agent.events.max_eps.current_rate`     | Gauge | Nombre d'événements d'APM par seconde reçus par l'Agent                                                                            |
| `datadog.trace_agent.events.max_eps.sample_rate`      | Gauge | Taux d'échantillonnage appliqué par l'Agent pour les événements qu'il a reçus                                                                          |

[1]: /fr/tracing/setup