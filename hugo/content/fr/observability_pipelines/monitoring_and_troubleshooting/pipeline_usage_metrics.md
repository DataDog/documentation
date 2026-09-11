---
aliases:
- /fr/observability_pipelines/monitoring/metrics/
description: Trouvez les métriques disponibles depuis Observability Pipelines pour
  créer des dashboards, notebooks et monitors.
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: Documentation
  text: En savoir plus sur le Metrics Summary
- link: /metrics/explorer/
  tag: Documentation
  text: Utiliser le Metrics Explorer pour explorer et analyser vos métriques
- link: /getting_started/dashboards/
  tag: Documentation
  text: Bien démarrer avec dashboards
- link: /getting_started/monitors/
  tag: Documentation
  text: Bien démarrer avec monitors
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
title: Métriques d'utilisation des pipelines
---
## Présentation {#overview}

Ce document répertorie certaines des métriques disponibles dans Observability Pipelines. Vous pouvez effectuer les opérations suivantes :

- Créez vos propres [dashboards][1], [notebooks][2] et [monitors][3] avec ces métriques.
- Utilisez le [Metrics Summary][5] pour voir les métadonnées et les tags disponibles pour les métriques. Vous pouvez également voir quels dashboards, notebooks, monitors et SLOs utilisent ces métriques.

Consultez [Getting Started with Tags][4] pour plus d'informations sur la façon d'utiliser les tags pour regrouper les métriques par pipelines, Workers et composants spécifiques.

Toutes les métriques sont taguées avec les éléments suivants :

`pipeline_id`
: L'UUID du pipeline.

`worker_uuid`
: L'UUID du Worker émettant la métrique.

`op_worker_version`
: La version du Worker émettant la métrique.

`rc_version`
: Le numéro de version de la configuration, incrémenté à chaque mise à jour du pipeline.

`pipeline_name`
: Le nom du pipeline lors de son dernier déploiement ou de sa dernière mise à jour. Disponible dans la version 2.18 du Worker et les versions ultérieures.

**Remarques** :
- Chaque Worker exécute également un pipeline interne qui collecte la télémétrie propre au Worker (métriques et logs) et l'envoie à Datadog. Les composants de ce pipeline interne possèdent un tag `component_id` dont la valeur commence par un underscore (`_`) . Pour exclure ces métriques de vos requêtes, utilisez `!component_id:_*`.
- Les métriques se terminant par `_total` rapportent un compte pour chaque intervalle de temps, leur valeur brute n'augmente donc pas de manière monotone.

## Métrique d'utilisation estimée {#estimated-usage-metric}

Octets ingérés par Observability Pipelines
: **Métrique**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Description**: Le volume de données ingérées par Observability Pipelines. Consultez [Métriques d'utilisation estimée][6] pour plus d'informations.

## Métriques de le host {#host-metrics}

Ces métriques fournissent des informations sur le host exécutant l'Observability Pipelines Worker.

Mémoire disponible
: **Métrique**: `pipelines.host.memory_available_bytes`
: **Description :** Le nombre d'octets de mémoire disponibles pour de nouvelles allocations sur le host.

Octets entrants
: **Métrique**: `pipelines.host.network_receive_bytes_total`
: **Description :** Le nombre d'octets reçus par le host sur toutes les interfaces. Utilisez la tag `device` pour filtrer par interface, par exemple `device:eth0`.

Octets sortants
: **Métrique**: `pipelines.host.network_transmit_bytes_total`
: **Description :** Le nombre d'octets envoyés par le host sur toutes les interfaces. Utilisez la tag `device` pour filtrer par interface.

CPU time
: **Métrique**: `pipelines.host.cpu_seconds_total`
: **Description :** Le temps CPU total consommé par le host, ventilé par mode (utilisateur, système, inactif, etc.) et par cœur de CPU.

Octets lus/écrits sur le disque
: **Métrique**: `pipelines.host.disk_read_bytes_total`, `pipelines.host.disk_written_bytes_total`
: **Description :** Le nombre d'octets lus et écrits sur tous les disques de le host.

Temps de fonctionnement de le host.
: **Métrique**: `pipelines.host.uptime`
: **Description :** La durée écoulée depuis le démarrage de le host, en secondes.

Charge moyenne
: **Métrique**: `pipelines.host.load1`, `pipelines.host.load5`, `pipelines.host.load15`
: **Description :** La moyenne de charge système de le host sur les 1, 5 et 15 dernières minutes. La charge moyenne est le nombre de processus en cours d'exécution ou en attente d'exécution, et sous Linux, elle inclut également les processus bloqués sur des E/S ininterruptibles. Comparez la valeur de la moyenne de charge avec la valeur `pipelines.host.logical_cpus`: ; une valeur de moyenne de charge proche du nombre de processeurs indique une utilisation complète, et une valeur supérieure indique que le host est sursouscrit. Non émis sur les Workers s'exécutant sous Windows.

CPUs logiques
: **Métrique**: `pipelines.host.logical_cpus`
: **Description :** Le nombre de threads CPU logiques (threads matériels) disponibles sur le host.

Mémoire totale
: **Métrique**: `pipelines.host.memory_total_bytes`
: **Description :** La mémoire physique totale (RAM) installée sur le host.

## Métriques de processus {#process-metrics}

Ces métriques fournissent des informations sur le processus Observability Pipelines Worker.

Cœurs CPU alloués
: **Métrique**: `pipelines.cpu_max_cores`
: **Description :** Le nombre de cœurs CPU alloués au Worker, tel que rapporté par les limites du conteneur ou du cgroup.

Utilisation du CPU
: **Métrique** : `pipelines.cpu_usage_seconds_total`
 : **Description :** La quantité de temps CPU consommée par le processus Worker en secondes (dans l'espace utilisateur et système). Le taux par seconde de cette métrique indique la proportion de CPU utilisée par le Worker.

Octets disponibles du répertoire de données
 : **Métrique** : `pipelines.data_dir_available_bytes`
: **Description :** L'espace de stockage libre restant sur le système de fichiers où le Worker stocke ses données de tampon et d'état. Utile pour surveiller les tampons disque.

Capacité en octets du répertoire de données
: **Métrique** : `pipelines.data_dir_capacity_bytes`
: **Description :** La capacité de stockage totale du système de fichiers où le Worker stocke ses données de tampon et d'état.

Limite de mémoire
: **Métrique** : `pipelines.memory_max_bytes`
: **Description :** La mémoire maximale que le Worker est autorisé à utiliser, telle que définie par les limites du conteneur ou du cgroup.

Utilisation de la mémoire
 : **Métrique** : `pipelines.resident_memory_used_bytes`
 : **Description :** La quantité de mémoire RSS utilisée par le processus Worker en octets.

Temps de disponibilité du Worker
: **Métrique**: `pipelines.uptime_seconds`
: **Description:** La durée écoulée depuis le démarrage du processus Worker, en secondes.

## Métriques du cycle de vie du Worker {#worker-lifecycle-metrics}

Ces métriques suivent les événements du cycle de vie de l'Observability Pipelines Worker.

Rechargements du Worker
: **Métrique**: `pipelines.reloaded_total`
: **Description:** Le nombre de fois que l'instance du Worker a été rechargée, par exemple après une modification de configuration.

## Métriques des composants {#component-metrics}

Ces métriques sont disponibles pour les sources, les processeurs et les destinations.

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Utilisez le tag `component_type` pour filtrer ou regrouper par type de source, de processeur ou de destination, comme `quota` pour le processeur Quota.
- Utilisez le tag `component_kind` pour filtrer ou regrouper par `source`, `transform` (processeur) ou `sink` (destination).

{{< tabs >}}
{{% tab "Sources" %}}

### Débit {#throughput}

Octets entrants
: **Métrique**: `pipelines.component_received_bytes_total`
: **Description**: Le nombre d'octets bruts lus depuis l'entrée de la source, avant tout décodage ou transformation.

Événements entrants
: **Métrique**: `pipelines.component_received_events_total`
: **Description**: Le nombre d'événements reçus par le composant.

Événements sortants
: **Métrique**: `pipelines.component_sent_events_total`
: **Description**: Le nombre d'événements que le composant envoie en aval.

Octets d'événements entrants
: **Métrique**: `pipelines.component_received_event_bytes_total`
: **Description**: La taille en octets des événements reçus par le composant.

Octets d'événements sortants
: **Métrique**: `pipelines.component_sent_event_bytes_total`
: **Description**: La taille en octets des événements que le composant envoie en aval.

### Erreurs, données abandonnées et expirations de délai {#errors-data-dropped-and-timed-outs}

Errors
: **Métrique**: `pipelines.component_errors_total`
: **Description**: Le nombre d'erreurs rencontrées par le composant. Selon le composant, cette métrique peut inclure un tag `error_code`, `error_type` ou `reason` qui décrit l'erreur.

Données abandonnées intentionnellement ou non
: **Métrique**: `pipelines.component_discarded_events_total`
: **Description** : Le nombre d'événements abandonnés. **Remarque** : Pour ventiler cette métrique, utilisez le tag `intentional:true` pour filtrer les événements abandonnés intentionnellement ou le tag `intentional:false` pour les événements qui ne le sont pas.

Événements expirés
: **Métrique** : `pipelines.component_timed_out_events_total`
: **Description** : Le nombre d'événements qui ont attendu plus de 5 secondes avant d'être envoyés au premier processeur et qui ont entraîné une erreur HTTP 503. Cela peut se produire lorsque la distribution des événements est bloquée.
: **Disponible pour** : les sources basées sur HTTP qui ont un délai d'expiration configuré, comme le Datadog Agent.

Requêtes expirées
: **Métrique** : `pipelines.component_timed_out_requests_total`
: **Description** : Le nombre de requêtes ayant expiré pour les sources qui envoient des événements au Worker par lots à l'aide de requêtes HTTP.
: **Disponible pour** : les sources basées sur HTTP qui ont un délai d'expiration configuré, comme le Datadog Agent.

### Performance {#performance}

Latence d'envoi
: **Métrique** : `pipelines.source_send_latency_seconds`
: **Description** : Le temps nécessaire à la source pour envoyer un bloc d'événements au composant suivant. Disponible dans la version 2.16 de Worker et ultérieures.

Latence du lot d'envoi
: **Métrique** : `pipelines.source_send_batch_latency_seconds`
: **Description** : Le temps nécessaire à la source pour envoyer un lot, qui peut contenir plusieurs blocs d'événements, au composant suivant. Disponible dans la version 2.16 de Worker et ultérieures.

Temps de latence de la source
: **Métrique** : `pipelines.source_lag_time_seconds`
: **Description** : La différence, en secondes, entre l'horodatage propre à un événement et le moment où le Worker l'a reçu. Des valeurs élevées indiquent que des données obsolètes ou retardées arrivent dans le pipeline.

### Tampon {#buffer}

Utilisez ces métriques pour analyser les performances du tampon. Toutes les métriques sont émises à un intervalle d'une seconde, sauf indication contraire.

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "Processeurs" %}}

### Débit {#throughput-1}

Événements entrants
: **Métrique**: `pipelines.component_received_events_total`
: **Description**: Le nombre d'événements reçus par le composant.

Événements sortants
: **Métrique**: `pipelines.component_sent_events_total`
: **Description**: Le nombre d'événements que le composant envoie en aval.

Octets d'événements entrants
: **Métrique**: `pipelines.component_received_event_bytes_total`
: **Description**: La taille en octets des événements reçus par le composant.

Octets d'événements sortants
: **Métrique**: `pipelines.component_sent_event_bytes_total`
: **Description**: La taille en octets des événements que le composant envoie en aval.

Événements inclus
: **Métrique**: `pipelines.included_events_total`
: **Description**: Le nombre d'événements qui ont correspondu à la requête de filtrage du processeur et ont été traités. Les événements qui ne correspondent pas à la requête de filtrage ignorent le processeur et continuent vers le composant suivant.

Octets d'événements inclus
: **Métrique**: `pipelines.included_event_bytes_total`
: **Description** : La taille en octets des événements qui ont correspondu à la requête de filtrage du processeur et ont été traités.

### Erreurs et données abandonnées {#errors-and-data-dropped}

Errors
: **Métrique** : `pipelines.component_errors_total`
: **Description** : Le nombre d'erreurs rencontrées par le composant. Selon le composant, cette métrique peut inclure un tag `error_code`, `error_type` ou `reason` qui décrit l'erreur.

Données abandonnées intentionnellement ou non
: **Métrique** : `pipelines.component_discarded_events_total`
: **Description** : Le nombre d'événements abandonnés. **Remarque** : Pour ventiler cette métrique, utilisez le tag `intentional:true` pour filtrer les événements abandonnés intentionnellement ou le tag `intentional:false` pour les événements qui ne le sont pas.

### Performance {#performance-1}

Utilisation du CPU
: **Métrique** : `pipelines.component_cpu_usage_ns_total`
: **Description** : Le temps CPU consommé par un composant, en nanosecondes. Utilisez cette métrique pour attribuer le coût CPU à chaque processeur. Disponible dans la version 2.18 du Worker et dans les versions ultérieures pour Linux et MacOS.
: **Disponible pour ces processeurs de log** : <br>- Processeur personnalisé<br>- Déduplication<br>- Table d'enrichissement<br>- Analyseur Grok<br>- Analyser JSON<br>- Analyser XML<br>- Réduire<br>- Remapper vers OCSF<br>- Sensitive Data Scanner<br>- Diviser le tableau<br>- Processeurs de log de limitation
 : **Disponible pour ces processeurs de métriques** : <br>- Agrégat <br>- Métriques de limite de cardinalité des tags

Utilisation
: **Métrique** : `pipelines.utilization`
: **Description** : L'activité du composant. Une valeur de `0` indique un composant inactif qui attend une entrée. Une valeur proche de `1` indique un composant qui n'est jamais inactif, ce qui signifie que le composant est probablement un goulot d'étranglement dans la topologie de traitement qui crée une contre-pression. Cela peut entraîner la suppression d'événements.

### Tampon{#buffer-1}

Utilisez ces métriques pour analyser les performances du tampon. Toutes les métriques sont émises à un intervalle d'une seconde, sauf indication contraire.

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "Destinations" %}}

### Débit {#throughput-2}

Octets sortants
: **Métrique**: `pipelines.component_sent_bytes_total`
: **Description**: Le nombre d'octets bruts écrits dans la sortie de la destination, après encodage et transformations.

Événements entrants
: **Métrique**: `pipelines.component_received_events_total`
: **Description**: Le nombre d'événements reçus par le composant.

Événements sortants
: **Métrique**: `pipelines.component_sent_events_total`
: **Description**: Le nombre d'événements que le composant envoie en aval.

Octets d'événements entrants
: **Métrique**: `pipelines.component_received_event_bytes_total`
: **Description**: La taille en octets des événements reçus par le composant.

Octets d'événements sortants
: **Métrique** : `pipelines.component_sent_event_bytes_total`
: **Description** : La taille en octets des événements que le composant envoie en aval.

### Erreurs et données supprimées{#errors-and-data-dropped-1}

Errors
: **Métrique** : `pipelines.component_errors_total`
: **Description** : Le nombre d'erreurs rencontrées par le composant. Selon le composant, cette métrique peut inclure un tag `error_code`, `error_type` ou `reason` qui décrit l'erreur.

Données abandonnées intentionnellement ou non
: **Métrique** : `pipelines.component_discarded_events_total`
: **Description** : Le nombre d'événements abandonnés. **Remarque** : Pour ventiler cette métrique, utilisez le tag `intentional:true` pour filtrer les événements abandonnés intentionnellement ou le tag `intentional:false` pour les événements qui ne le sont pas.

### Performances {#performance-2}

Utilisation
: **Métrique** : `pipelines.utilization`
: **Description** : L'activité du composant. Une valeur de `0` indique un composant inactif qui attend une entrée. Une valeur proche de `1` indique un composant qui n'est jamais inactif, ce qui signifie que le composant est probablement un goulot d'étranglement dans la topologie de traitement qui crée une contre-pression. Cela peut entraîner la suppression d'événements.

### Tampon {#buffer-2}

Utilisez ces métriques pour analyser les performances du tampon. Toutes les métriques sont émises à un intervalle d'une seconde, sauf indication contraire.

{{% observability_pipelines/metrics/buffer/destinations %}}

#### Métriques de tampon obsolètes {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques du serveur HTTP {#http-server-metrics}

Ces métriques sont émises par les sources qui reçoivent des données via HTTP, telles que le Datadog Agent, le serveur HTTP/S, OpenTelemetry et les sources Splunk HEC.

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Utilisez le tag `component_type` pour filtrer ou regrouper par type de source.

`pipelines.http_server_requests_received_total`
: **Description**: Le nombre de requêtes HTTP reçues.
: **Type de métrique**: count

`pipelines.http_server_responses_sent_total`
: **Description**: Le nombre de réponses HTTP envoyées.
: **Type de métrique**: count

`pipelines.http_server_handler_duration_seconds`
: **Description**: Le temps passé à traiter une requête HTTP.
: **Type de métrique**: distribution

## Métriques du client HTTP {#http-client-metrics}

Ces métriques sont émises par les destinations qui envoient des données via HTTP, notamment :

- CrowdStrike NG-SIEM
- Logs Datadog
- Métriques Datadog
- Elasticsearch
- Google SecOps
- Destination client HTTP
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**Remarque**: Les destinations basées sur AWS (telles qu'Amazon S3, Amazon OpenSearch et Amazon Security Lake) n'émettent pas ces métriques.

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Utilisez le tag `component_type` pour filtrer ou regrouper par type de destination.

`pipelines.http_client_requests_sent_total`
: **Description**: Le nombre de requêtes HTTP envoyées, étiquetées par méthode de requête.
: **Type de métrique**: count

`pipelines.http_client_responses_total`
: **Description**: Le nombre de réponses HTTP reçues, étiquetées par statut de réponse.
: **Type de métrique**: count

`pipelines.http_client_errors_total`
: **Description**: Le nombre d'erreurs client HTTP, étiquetées par type d'erreur.
: **Type de métrique**: count

`pipelines.http_client_rtt_seconds`
: **Description**: Le temps aller-retour, en secondes, pour les requêtes HTTP, depuis l'envoi de la requête jusqu'à la réception de la réponse finale ou de l'erreur.
: **Type de métrique**: distribution

`pipelines.http_client_response_rtt_seconds`
: **Description**: Temps d'aller-retour, en secondes, des requêtes HTTP, étiqueté par statut de réponse.
: **Type de métrique**: distribution

`pipelines.http_client_error_rtt_seconds`
: **Description** : Le temps d'aller-retour, en secondes, des requêtes HTTP ayant abouti à une erreur, étiqueté par type d'erreur.
: **Type de métrique** : distribution

## Métriques de concurrence adaptative {#adaptive-concurrency-metrics}

Ces métriques fournissent des informations sur le contrôleur de concurrence adaptative, qui ajuste automatiquement le nombre de requêtes HTTP en cours qu'une destination autorise en fonction des temps de réponse observés. Elles sont émises par les destinations qui envoient des données via HTTP, y compris les destinations basées sur AWS.

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Utilisez le tag `component_type` pour filtrer ou regrouper par type de destination.

`pipelines.active_endpoints`
: **Description** : Le nombre d'endpoints de destination marqués comme sains.
: **Type de métrique** : jauge

`pipelines.adaptive_concurrency_limit`
: **Description** : La limite de concurrence pour les requêtes HTTP vers cette destination, ajustée automatiquement par le contrôleur de concurrence adaptative en fonction des temps de réponse.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_in_flight`
: **Description** : Le nombre de requêtes HTTP en cours vers une destination, comparé à la limite de concurrence adaptative pour déterminer quand effectuer une limitation.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_reached_limit`
: **Description** : Si le contrôleur de concurrence adaptative a atteint sa limite calculée (`1`) ou non (`0`) au cours du dernier intervalle de mesure.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_back_pressure`
: **Description** : Si le contrôleur de concurrence adaptative a détecté une contre-pression (`1`) ou non (`0`) au cours du dernier intervalle de mesure.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_averaged_rtt`
: **Description** : Le temps d'aller-retour (RTT) moyen lissé, en secondes, pour les requêtes HTTP vers cette destination, utilisé comme base de référence pour les calculs de concurrence adaptative.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_observed_rtt`
: **Description** : Le temps d'aller-retour (RTT), en secondes, observé pour la requête HTTP la plus récente vers cette destination.
: **Type de métrique** : distribution

`pipelines.adaptive_concurrency_past_rtt_mean`
: **Description** : Le RTT moyen historique, en secondes, pour les requêtes HTTP vers cette destination, utilisé comme base de référence à long terme pour les ajustements de concurrence adaptative.
: **Type de métrique** : distribution

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/dashboards/
[2]: /fr/notebooks/
[3]: /fr/getting_started/monitors/
[4]: /fr/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/fr/account_management/billing/usage_metrics/