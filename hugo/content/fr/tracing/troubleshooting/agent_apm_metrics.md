---
aliases:
- /fr/agent/faq/agent-apm-metrics/
- /fr/tracing/send_traces/agent-apm-metrics/
title: Métriques APM envoyées par l'Agent Datadog
---

Vous trouverez ci-dessous la liste des métriques de tracing fournies par défaut et envoyées par l'Agent Datadog lorsque l'[APM est activée][1]. Importez le [dashboard de surveillance APM][2] dans votre compte Datadog afin de bénéficier d'un dashboard prêt à l'emploi reprenant la plupart de ces métriques.



`datadog.trace_agent.cpu_percent`
: **Type** : gauge<br>
Charge processeur (en cœur). Exemple : 50 (0,5 cœur), 200 (2 cœurs), 250 (2,5 cœurs).

`datadog.trace_agent.events.max_eps.current_rate`
: **Type** : gauge<br>
Nombre d'événements APM par seconde reçus par l'Agent.

`datadog.trace_agent.events.max_eps.max_rate`
: **Type** : gauge<br>
Similaire au paramètre de configuration de l'Agent max_events_per_second.

`datadog.trace_agent.events.max_eps.reached_max`
: **Type** : gauge<br>
Définie sur `1` chaque fois que la valeur max_events_per_second est atteinte. Définie sur `0` le reste du temps.

`datadog.trace_agent.events.max_eps.sample_rate`
: **Type** : gauge<br>
Taux d'échantillonnage appliqué par l'Agent pour les événements qu'il a reçus.

`datadog.trace_agent.heap_alloc`
: **Type** : gauge<br>
Allocations dans le tas (heap) selon le runtime Go.

`datadog.trace_agent.heartbeat`
: **Type** : gauge<br>
Augmente d'une unité toutes les 10 secondes.

`datadog.trace_agent.normalizer.spans_malformed`
: **Type** : count<br>
Nombre de spans contenant des champs incorrects ayant dû être modifiées pour être acceptées par le système.

`datadog.trace_agent.obfuscations`
: **Type** : count<br>
Augmente d'une unité à chaque obfuscation de déclaration SQL.

`datadog.trace_agent.panic`
: **Type** : gauge<br>
Augmente d'une unité à chaque panique du code.

`datadog.trace_agent.profile`
: **Type** : count<br>
Augmente d'une unité à chaque création d'un proxy inverse pour les endpoints de profils.

`datadog.trace_agent.ratelimit`
: **Type** : gauge<br>
Si inférieure à `1`, indique que des charges utiles sont refusées en raison d'une utilisation trop importante des ressources (processeur ou mémoire).

`datadog.trace_agent.receiver.error`
: **Type** : count<br>
Nombre de rejets d'une charge utile par l'API en raison d'une erreur de décodage, de mise en forme ou d'une autre nature.

`datadog.trace_agent.receiver.events_extracted`
: **Type** : count<br>
Total d'événements APM échantillonnés.

`datadog.trace_agent.receiver.events_sampled`
: **Type** : count<br>
Total d'événements APM échantillonnés par le service d'échantillonnage du paramètre `max_events_per_second`.

`datadog.trace_agent.receiver.oom_kill`
: **Type** : count<br>
Nombre de fois où l'Agent s'est automatiquement fermé en raison d'une utilisation excessive de la mémoire (150 % de max_memory).

`datadog.trace_agent.receiver.out_chan_fill`
: **Type** : gauge<br>
Métrique interne. Pourcentage de remplissage sur le canal de sortie du récepteur.

`datadog.trace_agent.receiver.payload_accepted`
: **Type** : count<br>
Nombre de charges utiles acceptées par l'Agent.

`datadog.trace_agent.receiver.payload_refused`
: **Type** : count<br>
Nombre de charges utiles rejetées par le récepteur à cause de l'échantillonnage.

`datadog.trace_agent.receiver.spans_dropped`
: **Type** : count<br>
Total d'octets de charges utiles perdus par l'Agent.

`datadog.trace_agent.receiver.spans_filtered`
: **Type** : count<br>
Total d'octets de charges utiles filtrés par l'Agent.

`datadog.trace_agent.receiver.spans_received`
: **Type** : count<br>
Total d'octets de charges utiles reçus par l'Agent.

`datadog.trace_agent.receiver.tcp_connections`
: **Type** : count<br>
Nombre de connexions TCP parvenant à l'Agent.

`datadog.trace_agent.receiver.trace`
: **Type** : count<br>
Nombre de traces reçues et acceptées.

`datadog.trace_agent.receiver.traces_bytes`
: **Type** : count<br>
Total d'octets de charges utiles acceptés par l'Agent.

`datadog.trace_agent.receiver.traces_filtered`
: **Type** : count<br>
Traces filtrées par des ressources ignorées (comme défini dans le fichier `datadog.yaml`).

`datadog.trace_agent.receiver.traces_priority`
: **Type** : count<br>
Traces comportant le tag priority traitées par le service d'échantillonnage par ordre de priorité.

`datadog.trace_agent.receiver.traces_received`
: **Type** : count<br>
Nombre de traces reçues et acceptées.

`datadog.trace_agent.service_writer.services`
: **Type** : count<br>
Nombre de services vidés.

`datadog.trace_agent.started`
: **Type** : count<br>
Augmente d'une unité chaque fois que l'Agent démarre.

`datadog.trace_agent.stats_writer.bytes`
: **Type** : count<br>
Nombre d'octets envoyés (calcul effectué après Gzip).

`datadog.trace_agent.stats_writer.connection_fill`
: **Type** : histogram <br>
Pourcentage de connexions sortantes utilisées.

`datadog.trace_agent.stats_writer.dropped`
: **Type** : count<br>
Nombre de charges utiles non envoyées en raison d'une erreur HTTP sans nouvelle tentative possible.

`datadog.trace_agent.stats_writer.dropped_bytes`
: **Type** : count<br>
Nombre d'octets non envoyés en raison d'une erreur HTTP sans nouvelle tentative possible.

`datadog.trace_agent.stats_writer.encode_ms`
: **Type** : histogram <br>
Temps passé à encoder une charge utile de statistiques.

`datadog.trace_agent.stats_writer.errors`
: **Type** : count<br>
Erreurs sans nouvelle tentative possible.

`datadog.trace_agent.stats_writer.queue_fill`
: **Type** : histogram <br>
Pourcentage de remplissage de la file d'attente.

`datadog.trace_agent.stats_writer.retries`
: **Type** : count<br>
Nombre de nouvelles tentatives après un échec de l'envoi vers l'API Datadog.

`datadog.trace_agent.stats_writer.splits`
: **Type** : count<br>
Nombre de fois où une charge utile a été divisée en plusieurs charges utiles.

`datadog.trace_agent.stats_writer.stats_buckets`
: **Type** : count<br>
Nombre de compartiments de statistiques vidés.

`datadog.trace_agent.trace_writer.bytes`
: **Type** : count<br>
Nombre d'octets envoyés (calcul effectué après Gzip).

`datadog.trace_agent.trace_writer.bytes_estimated`
: **Type** : count<br>
Nombre d'octets estimé par l'algorithme interne de l'Agent.

`datadog.trace_agent.trace_writer.bytes_uncompressed `
: **Type** : count<br>
Nombre d'octets envoyés (calcul effectué avant Gzip).

`datadog.trace_agent.trace_writer.compress_ms`
: **Type** : gauge<br>
Temps (en millisecondes) passé à compresser une charge utile de traces encodée.

`datadog.trace_agent.trace_writer.connection_fill`
: **Type** : histogram <br>
Pourcentage de connexions sortantes utilisées par le service d'écriture de traces.

`datadog.trace_agent.trace_writer.dropped`
: **Type** : count<br>
Nombre de charges utiles non envoyées en raison d'une erreur HTTP sans nouvelle tentative possible.

`datadog.trace_agent.trace_writer.dropped_bytes`
: **Type** : count<br>
Nombre d'octets non envoyés en raison d'une erreur HTTP sans nouvelle tentative possible.

`datadog.trace_agent.trace_writer.encode_ms`
: **Type** : gauge<br>
Temps (en millisecondes) passé à encoder une charge utile de traces.

`datadog.trace_agent.trace_writer.errors`
: **Type** : count<br>
Erreurs sans nouvelle tentative possible.

`datadog.trace_agent.trace_writer.events`
: **Type** : count<br>
Nombre d'événements traités.

`datadog.trace_agent.trace_writer.flush_duration`
: **Type** : gauge<br>
Temps nécessaire pour transmettre une charge utile à l'API Datadog.

`datadog.trace_agent.trace_writer.payloads`
: **Type** : count<br>
Nombre de charges utiles traitées.

`datadog.trace_agent.trace_writer.payloads`
: **Type** : count<br>
Nombre de charges utiles envoyées.

`datadog.trace_agent.trace_writer.queue_fill`
: **Type** : histogram <br>
Pourcentage de remplissage de la file d'attente des charges utiles sortantes.

`datadog.trace_agent.trace_writer.retries`
: **Type** : count<br>
Nombre de nouvelles tentatives après un échec de l'envoi vers l'API Datadog.

`datadog.trace_agent.trace_writer.spans`
: **Type** : count<br>
Nombre de spans traitées.

`datadog.trace_agent.trace_writer.traces`
: **Type** : count<br>
Nombre de traces traitées.

[1]: /fr/tracing/setup/
[2]: /resources/json/APM_monitoring_dashboard.json