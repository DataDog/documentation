---
app_id: azure_data_explorer
categories:
- azure
- cloud
- network
custom_kind: integration
description: Surveillez des métriques clés d'Azure Data Explorer.
title: Microsoft Azure Data Explorer
---
## Section Overview

Azure Data Explorer est un service d'analyse hautement évolutif et sécurisé qui vous permet d'explorer en profondeur des données structurées et non structurées pour obtenir des informations instantanées. Optimisé pour les requêtes ad hoc, Azure Data Explorer permet l'exploration de données brutes, structurées et semi-structurées pour des analyses extrêmement rapides. Utilisez Datadog pour surveiller les performances et l'utilisation d'Azure Data Explorer par rapport au reste de vos applications et de votre infrastructure.

Recueillez des métriques d'Azure Data Explorer pour :

- suivre les performances d'ingestion, de traitement et de latence de vos instances Data Explorer ;
- surveiller l'utilisation des ressources de calcul, de mémoire et réseau Data Explorer.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez d'abord l'[intégration Microsoft Azure] (https://docs.datadoghq.com/integrations/azure/). Il n'y a pas d'autres étapes d'installation.

## Données collectées

### Métriques

| | |
| --- | --- |
| **azure.kusto_clusters.batch_blob_count** <br>(gauge) | Nombre de sources de données dans un lot agrégé pour l'ingestion.|
| **azure.kusto_clusters.batch_duration** <br>(gauge) | Durée de la phase d'agrégation dans le flux d'ingestion.<br>_Affichage en secondes_. |
| **azure.kusto_clusters.batches_processed** <br>(count) | Nombre de lots agrégés pour l'ingestion. Type de lot : si le lot a atteint le temps de mise en lot ; taille des données ou limite du nombre de fichiers fixée par la politique de mise en lot.|
| **azure.kusto_clusters.batch_size** <br>(gauge) | Taille prévue des données non compressées dans un lot agrégé pour l'ingestion.<br>_Shown as byte_ (en anglais) |
| **azure.kusto_clusters.blobs_dropped** <br>(count) | Nombre de blobs définitivement rejetés par un composant.|
| **azure.kusto_clusters.blobs_processed** <br>(count) | Nombre de blobs traités par un composant.|
| **azure.kusto_clusters.blobs_received** <br>(count) | Nombre de blobs reçus du flux d'entrée par un composant.|
| **azure.kusto_clusters.cache_utilization** <br>(gauge) | Niveau d'utilisation dans le champ d'application du cluster.<br>_Affiché en pourcentage_. |
| **azure.kusto_clusters.cache_utilization_factor** <br>(gauge) | Différence en pourcentage entre le nombre actuel d'instances et le nombre optimal d'instances (par utilisation du cache).<br>_Affiché en pourcentage_. |
| **azure.kusto_clusters.continuous_export_max_lateness_minutes** <br>(gauge) | Retard (en minutes) signalé par les emplois d'exportation continue dans le cluster.|
| **azure.kusto_clusters.continuous_export_num_of_records_exported** <br>(count) | Nombre d'enregistrements exportés ; tiré pour chaque artefact de stockage écrit pendant l'opération d'exportation.|
| **azure.kusto_clusters.continuous_export_pending_count** <br>(gauge) | Nombre de travaux d'exportation en continu en attente, prêts à être exécutés.|
| **azure.kusto_clusters.continuous_export_result** <br>(count) | Indique si l'exportation continue a réussi ou échoué.|
| **azure.kusto_clusters.cpu** <br>(gauge) | Niveau d'utilisation de l'unité centrale.<br>_Affiché en pourcentage_. |
| **azure.kusto_clusters.discovery_latency** <br>(gauge) | Signalé par les connexions de données (si elles existent). Temps en secondes entre le moment où un message est mis en file d'attente ou un événement est créé et le moment où il est découvert par les données connection (connexion). Ce temps n'est pas inclus dans la durée totale d'ingestion d'Azure Data explorer.<br>_Affiché en secondes_. |
| **azure.kusto_clusters.events_dropped** <br>(count) | Nombre d'événements abandonnés définitivement par les données connection (connexion). Une métrique de résultat d'ingestion avec une raison d'échec sera envoyée.|
| **azure.kusto_clusters.events_processed** <br>(count) | Nombre d'événements traités par la grappe.|
| **azure.kusto_clusters.events_processed_for_event_hubs** <br>(count) | Nombre d'événements traités par le cluster lors de l'ingestion depuis Event/IoT Hub.|
| **azure.kusto_clusters.events_received** <br>(count) | Nombre d'événements reçus par les données connection (connexion).|
| **azure.kusto_clusters.export_utilization** <br>(gauge) | Utilisation des exportations.<br>_Indiqué en pourcentage_. |
| **azure.kusto_clusters.ingestion_latency_in_seconds** <br>(gauge) | Temps de latence des données ingérées ; entre le moment où les données ont été reçues dans le cluster et le moment où elles sont prêtes à être interrogées. La période de latence d'ingestion dépend du scénario d'ingestion.<br>_Affiché en seconde_ |
| **azure.kusto_clusters.ingestion_result** <br>(count) | Nombre total de sources dont l'ingestion a échoué ou réussi. En divisant la métrique par le statut, vous pouvez obtenir des informations détaillées sur le statut des opérations d'ingestion.|
| **azure.kusto_clusters.ingestion_utilization** <br>(gauge) | Ratio des slots d'ingestion utilisés dans le cluster.<br>_Affiché en pourcentage_ |
| **azure.kusto_clusters.ingestion_volume_in_mb** <br>(count) | Volume global des données ingérées dans le cluster.<br>_Affiché en octet_. |
| **azure.kusto_clusters.instance_count** <br>(gauge) | Nombre total d'instances.|
| **azure.kusto_clusters.keep_alive** <br>(gauge) | Le contrôle d'intégrité indique que le cluster répond aux requêtes.|
| **azure.kusto_clusters.materialized_view_age_minutes** <br>(gauge) | Âge de la vue matérialisée en minutes.|
| **azure.kusto_clusters.materialized_view_age_seconds** <br>(gauge) | Âge de la vue matérialisée en secondes.<br>_Shown as second_ (affiché en secondes) |
| **azure.kusto_clusters.materialized_view_data_loss** <br>(gauge) | Indique une perte potentielle de données dans la vue matérialisée.|
| **azure.kusto_clusters.materialized_view_extents_rebuild** <br>(gauge) | Nombre d'extents reconstruits.|
| **azure.kusto_clusters.materialized_view_health** <br>(gauge) | Santé de la vue matérialisée (1 pour saine ; 0 pour non saine).|
| **azure.kusto_clusters.materialized_view_records_in_delta** <br>(gauge) | Nombre d'enregistrements dans la partie non matérialisée de la vue.|
| **azure.kusto_clusters.materialized_view_result** <br>(gauge) | Résultat du processus de matérialisation.|
| **azure.kusto_clusters.query_duration** <br>(gauge) | Durée des requêtes en secondes.<br>_Affichée en millisecondes_ |
| **azure.kusto_clusters.query_result** <br>(count) | Nombre total de requêtes.|
| **azure.kusto_clusters.queue_length** <br>(gauge) | Nombre de messages en attente dans la file d'attente d'un composant.|
| **azure.kusto_clusters.queue_oldest_message** <br>(gauge) | Temps en secondes écoulé depuis l'insertion du message le plus ancien dans la file d'attente.|
| **azure.kusto_clusters.received_data_size_bytes** <br>(gauge) | Taille des données reçues par les données connection (connexion). Il s'agit de la taille du flux de données ou de la taille des données brutes si elles sont fournies.<br>_Affiché sous forme d'octet_. |
| **azure.kusto_clusters.stage_latency** <br>(gauge) | Temps cumulé entre le moment où un message est découvert et celui où il est reçu par le composant de reporting pour traitement (le temps de découverte est défini lorsque le message est mis en file d'attente d'ingestion ou lorsqu'il est découvert par les données connection (connexion)).<br>_Affiché en secondes_. |
| **azure.kusto_clusters.streaming_ingest_data_rate** <br>(jauge) | Débit de données d'entrée en continu (Mo par seconde).|
| **azure.kusto_clusters.streaming_ingest_duration** <br>(gauge) | Durée de l'acquisition en flux continu en millisecondes.<br>_Affichée en millisecondes_. |
| **azure.kusto_clusters.streaming_ingest_results** <br>(count) | Résultat de l'acquisition en continu.|
| **azure.kusto_clusters.total_number_of_concurrent_queries** <br>(gauge) | Nombre total de requêtes simultanées.|
| **azure.kusto_clusters.total_number_of_extents** <br>(gauge) | Nombre total d'extents de données.|
| **azure.kusto_clusters.total_number_of_throttled_commands** <br>(count) | Nombre total de commandes étranglées.|
| **azure.kusto_clusters.total_number_of_throttled_queries** <br>(gauge) | Nombre total de requêtes limitées.|
| **azure.kusto_clusters.weak_consistency_latency** <br>(gauge) | Temps de latence maximal entre la synchronisation précédente des métadonnées et la suivante (dans le cadre d'une base de données ou d'un nœud).<br>_Affiché en secondes_ |
| **azure.kusto_clusters.count** <br>(jauge) | Nombre de grappes de Kusto.|

### Événements

L'intégration Azure Data Explorer n'inclut aucun événement.

### Checks de service

L'intégration Azure Data Explorer n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).