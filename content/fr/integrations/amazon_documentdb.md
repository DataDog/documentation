---
app_id: amazon_documentdb
categories:
- cloud
- data stores
- aws
- log collection
custom_kind: integration
description: Surveillez vos métriques et vos logs Amazon DocumentDB.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: Blog
  text: Recueillez des métriques et des logs Amazon DocumentDB avec Datadog
title: Amazon DocumentDB
---
## Section Overview

Amazon DocumentDB est un service de base de données de documents rapide, scalable, hautement disponible et entièrement géré qui prend en charge les charges de travail MongoDB.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, commencez par configurer l'[intégration Amazon Web Services] (https://docs.datadoghq.com/integrations/amazon_web_services/).

### Collecte de métriques

1. Dans le [AWS integration Page (page)](https://app.datadoghq.com/integrations/amazon-web-services), assurez-vous que `DocumentDB` est activé sous l'onglet `Metric Collection`.
1. Installez le [Datadog - Amazon DocumentDB integration](https://app.datadoghq.com/integrations/amazon-documentdb).

### Collecte de logs

#### Activer le logging

Configurez Amazon DocumentDB de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_documentdb` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas encore fait, configurez la [Datadog Forwarder Lambda function] (https://docs.datadoghq.com/logs/guide/forwarder/).

1. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon DocumentDB dans la console AWS :

   - [Ajouter un déclencheur manuel sur le seau S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Ajouter un déclencheur manuel sur le groupe CloudWatch log ](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Données collectées

### Métriques

| | |
| --- | --- |
| **aws.docdb.backup_retention_period_storage_used** <br>(gauge) | Stockage de sauvegarde moyen en gigaoctets utilisé pour prendre en charge la fonction de restauration ponctuelle dans la fenêtre de renonciation.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.backup_retention_period_storage_used.maximum** <br>(gauge) | Stockage de sauvegarde maximal en gigaoctets utilisé pour prendre en charge la fonction de restauration ponctuelle dans la fenêtre de renonciation.<br>_Shown as gibibyte_ |
| **aws.docdb.backup_retention_period_storage_used.minimum** <br>(gauge) | Stockage de sauvegarde minimum en gigaoctets utilisé pour prendre en charge la fonction de restauration ponctuelle dans la fenêtre de renonciation.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.backup_retention_period_storage_used.samplecount** <br>(gauge) | Nombre d'échantillons de stockage de sauvegarde en gigaoctets utilisés pour prendre en charge la fonction de restauration ponctuelle dans la fenêtre de renonciation.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.backup_retention_period_storage_used.sum** <br>(gauge) | Stockage de sauvegarde total en gigaoctets utilisé pour prendre en charge la fonction de restauration ponctuelle dans la fenêtre de renonciation.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.buffer_cache_hit_ratio** <br>(gauge) | Pourcentage moyen de requêtes servies par le cache tampon.|
| **aws.docdb.buffer_cache_hit_ratio.maximum** <br>(gauge) | Pourcentage maximum de requêtes servies par le cache tampon.|
| **aws.docdb.buffer_cache_hit_ratio.minimum** <br>(gauge) | Pourcentage minimum de requêtes servies par le cache tampon.|
| **aws.docdb.buffer_cache_hit_ratio.samplecount** <br>(gauge) | Nombre d'échantillons du pourcentage de requêtes servies par le cache tampon.|
| **aws.docdb.buffer_cache_hit_ratio.sum** <br>(gauge) | Somme des pourcentages de requêtes servies par le cache tampon.|
| **aws.docdb.change_stream_log_size** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.average** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.maximum** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.minimum** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.samplecount** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.change_stream_log_size.sum** <br>(gauge) | La quantité de mémoire utilisée par votre cluster pour stocker le flux de changements log en mégaoctets.<br>_Shown as mebibyte_ |
| **aws.docdb.cpucredit_balance** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_balance.average** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_balance.maximum** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_balance.minimum** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_balance.samplecount** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_balance.sum** <br>(gauge) | Le nombre de crédits CPU qu'une instance a accumulés. Ce solde est épuisé lorsque le CPU explose et que les crédits CPU sont dépensés plus rapidement qu'ils ne sont gagnés.|
| **aws.docdb.cpucredit_usage** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpucredit_usage.average** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpucredit_usage.maximum** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpucredit_usage.minimum** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpucredit_usage.samplecount** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpucredit_usage.sum** <br>(count) | Le nombre de crédits CPU dépensés pendant la période de mesure.|
| **aws.docdb.cpusurplus_credit_balance** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credit_balance.average** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credit_balance.maximum** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credit_balance.minimum** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credit_balance.samplecount** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credit_balance.sum** <br>(gauge) | Le nombre de crédits CPU excédentaires dépensés pour maintenir les performances du CPU lorsque la valeur CPUCreditBalance est nulle.|
| **aws.docdb.cpusurplus_credits_charged** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpusurplus_credits_charged.average** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpusurplus_credits_charged.maximum** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpusurplus_credits_charged.minimum** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpusurplus_credits_charged.samplecount** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpusurplus_credits_charged.sum** <br>(count) | Le nombre de crédits CPU excédentaires dépassant le nombre maximum de crédits CPU pouvant être gagnés par période de 24 heures, et entraînant donc une charge supplémentaire.|
| **aws.docdb.cpuutilization** <br>(gauge) | Pourcentage moyen de CPU utilisé par une instance.|
| **aws.docdb.cpuutilization.maximum** <br>(gauge) | Pourcentage maximum de CPU utilisé par une instance.|
| **aws.docdb.cpuutilization.minimum** <br>(gauge) | Pourcentage minimum de CPU utilisé par une instance.|
| **aws.docdb.cpuutilization.samplecount** <br>(gauge) | Nombre d'échantillons du pourcentage de CPU utilisé par une instance.|
| **aws.docdb.cpuutilization.sum** <br>(gauge) | Somme des pourcentages de CPU utilisés par une instance.|
| **aws.docdb.database_connections** <br>(gauge) | Le nombre moyen de connexions à une instance.|
| **aws.docdb.database_connections.maximum** <br>(gauge) | Nombre maximal de connexions à une instance.|
| **aws.docdb.database_connections.minimum** <br>(gauge) | Le nombre minimum de connexions à une instance.|
| **aws.docdb.database_connections.samplecount** <br>(gauge) | Compte d'échantillons du nombre de connexions à une instance.|
| **aws.docdb.database_connections.sum** <br>(gauge) | La somme du nombre de connexions à une instance.|
| **aws.docdb.database_connections_max** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_connections_max.average** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_connections_max.maximum** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_connections_max.minimum** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_connections_max.samplecount** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_connections_max.sum** <br>(gauge) | Le nombre maximum de connexions de base de données ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors.average** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors.maximum** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors.minimum** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors.samplecount** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors.sum** <br>(gauge) | Le nombre de curseurs ouverts sur une instance prise à une fréquence d'une minute.|
| **aws.docdb.database_cursors_max** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_max.average** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_max.maximum** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_max.minimum** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_max.samplecount** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_max.sum** <br>(gauge) | Le nombre maximum de curseurs ouverts sur une instance dans une période d'une minute.|
| **aws.docdb.database_cursors_timed_out** <br>(gauge) | Le nombre de curseurs qui ont expiré au cours d'une période d'une minute.|
| **aws.docdb.database_cursors_timed_out.average** <br>(gauge) | Le nombre de curseurs qui ont expiré au cours d'une période d'une minute.|
| **aws.docdb.database_cursors_timed_out.maximum** <br>(gauge) | Le nombre de curseurs qui ont expiré au cours d'une période d'une minute.|
| **aws.docdb.database_cursors_timed_out.minimum** <br>(gauge) | Le nombre de curseurs qui ont expiré dans une période d'une minute.|
| **aws.docdb.database_cursors_timed_out.samplecount** <br>(gauge) | Le nombre de curseurs qui ont expiré dans une période d'une minute.|
| **aws.docdb.database_cursors_timed_out.sum** <br>(gauge) | Le nombre de curseurs qui ont expiré dans une période d'une minute.|
| **aws.docdb.db_instance_replica_lag** <br>(gauge) | Le délai moyen lors de la réplication des mises à jour de l'instance primaire d'une réplique.<br>_Affiché en millisecondes_. |
| **aws.docdb.db_instance_replica_lag.maximum** <br>(gauge) | Le délai maximum lors de la réplication des mises à jour de l'instance primaire d'une réplique.<br>_Affiché en millisecondes_. |
| **aws.docdb.db_instance_replica_lag.minimum** <br>(jauge) | Le délai minimum lors de la réplication des mises à jour de l'instance primaire d'une réplique.<br>_Affiché en millisecondes_. |
| **aws.docdb.db_instance_replica_lag.samplecount** <br>(gauge) | Nombre d'échantillons du décalage lors de la réplication des mises à jour de l'instance primaire d'une réplique.<br>_Affiché en millisecondes_. |
| **aws.docdb.db_instance_replica_lag.sum** <br>(gauge) | La somme du décalage lors de la réplication des mises à jour de l'instance primaire d'une réplique.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_maximum** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_maximum.average** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_maximum.maximum** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_maximum.minimum** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_maximum.samplecount** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_maximum.sum** <br>(gauge) | Le délai maximum, en millisecondes, entre l'instance primaire et chaque instance Amazon DocumentDB dans le cluster.<br>_Shown as millisecond_ (en millisecondes) |
| **aws.docdb.dbcluster_replica_lag_minimum** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_minimum.average** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_minimum.maximum** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_minimum.minimum** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_minimum.samplecount** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.dbcluster_replica_lag_minimum.sum** <br>(gauge) | Le décalage minimum, en millisecondes, entre l'instance primaire et chaque instance répliquée dans le cluster.<br>_Affiché en millisecondes_. |
| **aws.docdb.disk_queue_depth** <br>(gauge) | Nombre de demandes de lecture/écriture en attente d'accès au disque.|
| **aws.docdb.disk_queue_depth.maximum** <br>(gauge) | Nombre maximum de demandes de lecture/écriture en attente pour accéder au disque.|
| **aws.docdb.disk_queue_depth.minimum** <br>(gauge) | Le minimum du nombre de demandes de lecture/écriture en attente pour accéder au disque.|
| **aws.docdb.disk_queue_depth.samplecount** <br>(gauge) | Comptage d'échantillons du nombre de demandes de lecture/écriture en attente d'accès au disque.|
| **aws.docdb.disk_queue_depth.sum** <br>(gauge) | Somme du nombre de demandes de lecture/écriture en attente d'accès au disque.|
| **aws.docdb.documents_deleted** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_deleted.average** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_deleted.maximum** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_deleted.minimum** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_deleted.samplecount** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_deleted.sum** <br>(count) | Nombre de documents supprimés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted.average** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted.maximum** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted.minimum** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted.samplecount** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_inserted.sum** <br>(count) | Nombre de documents insérés au cours d'une période d'une minute.|
| **aws.docdb.documents_returned** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_returned.average** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_returned.maximum** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_returned.minimum** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_returned.samplecount** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_returned.sum** <br>(count) | Le nombre de documents retournés dans une période d'une minute.|
| **aws.docdb.documents_updated** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.documents_updated.average** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.documents_updated.maximum** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.documents_updated.minimum** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.documents_updated.samplecount** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.documents_updated.sum** <br>(count) | Nombre de documents mis à jour en une minute.|
| **aws.docdb.engine_uptime** <br>(gauge) | La durée d'exécution de l'instance.<br>_Shown as second_ (en secondes) |
| **aws.docdb.engine_uptime.maximum** <br>(gauge) | La durée maximale pendant laquelle l'instance a fonctionné.<br>_Shown as second_ (en secondes) |
| **aws.docdb.engine_uptime.minimum** <br>(gauge) | La durée minimale pendant laquelle l'instance a fonctionné.<br>_Shown as second_ (en secondes) |
| **aws.docdb.engine_uptime.samplecount** <br>(gauge) | Nombre d'échantillons de la durée d'exécution de l'instance.<br>_Shown as second_ (affiché en secondes) |
| **aws.docdb.engine_uptime.sum** <br>(gauge) | La somme de la durée d'exécution de l'instance.<br>_Shown as second_ (en secondes) |
| **aws.docdb.free_local_storage** <br>(gauge) | La quantité de stockage disponible pour chaque instance pour les tables temporaires et les journaux.|
| **aws.docdb.free_local_storage.maximum** <br>(gauge) | La quantité maximale de stockage disponible pour chaque instance pour les tables temporaires et les journaux.|
| **aws.docdb.free_local_storage.minimum** <br>(gauge) | La quantité minimale de stockage disponible pour chaque instance pour les tables temporaires et les journaux.|
| **aws.docdb.free_local_storage.samplecount** <br>(gauge) | Compte échantillon de la quantité de stockage disponible pour chaque instance pour les tables temporaires et les journaux.|
| **aws.docdb.free_local_storage.sum** <br>(jauge) | La somme de la quantité de stockage disponible pour chaque instance pour les tables temporaires et les journaux.|
| **aws.docdb.freeable_memory** <br>(gauge) | La quantité de mémoire vive disponible.<br>_Constitué d'un octet_. |
| **aws.docdb.freeable_memory.maximum** <br>(jauge) | La quantité maximale de mémoire vive disponible.<br>_Constitué d'un octet_. |
| **aws.docdb.freeable_memory.minimum** <br>(gauge) | La quantité minimale de mémoire vive disponible.<br>_Constitué d'un octet_. |
| **aws.docdb.freeable_memory.samplecount** <br>(gauge) | Compte d'échantillons de la quantité de mémoire vive disponible.<br>_Affiché sous forme d'octet_. |
| **aws.docdb.freeable_memory.sum** <br>(gauge) | La somme de la quantité de mémoire vive disponible.<br>_Constitué d'un octet_. |
| **aws.docdb.index_buffer_cache_hit_ratio** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.index_buffer_cache_hit_ratio.average** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.index_buffer_cache_hit_ratio.maximum** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.index_buffer_cache_hit_ratio.minimum** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.index_buffer_cache_hit_ratio.samplecount** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.index_buffer_cache_hit_ratio.sum** <br>(gauge) | Le pourcentage de requêtes d'index qui sont servies par le cache tampon.|
| **aws.docdb.low_mem_num_operations_throttled** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_num_operations_throttled.average** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_num_operations_throttled.maximum** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_num_operations_throttled.minimum** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_num_operations_throttled.samplecount** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_num_operations_throttled.sum** <br>(count) | Le nombre de requêtes qui sont bloquées en raison d'un manque de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth.average** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth.maximum** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth.minimum** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth.samplecount** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_max_queue_depth.sum** <br>(gauge) | Profondeur maximale de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible au cours d'une période d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth.average** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth.maximum** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth.minimum** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth.samplecount** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.low_mem_throttle_queue_depth.sum** <br>(gauge) | Profondeur de la file d'attente pour les demandes qui sont limitées en raison de la faible quantité de mémoire disponible, à une fréquence d'une minute.|
| **aws.docdb.network_receive_throughput** <br>(gauge) | Le débit du réseau reçu et transmis aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_receive_throughput.maximum** <br>(gauge) | La quantité maximale de débit réseau reçue et transmise aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_receive_throughput.minimum** <br>(gauge) | La quantité minimale de débit réseau reçu et transmis aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_receive_throughput.samplecount** <br>(gauge) | Echantillon de débit réseau reçu et transmis aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_receive_throughput.sum** <br>(gauge) | La somme du débit réseau reçu et transmis aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_throughput** <br>(jauge) | Débit réseau, en octets par seconde, reçu et transmis aux clients par chaque instance du cluster Amazon DocumentDB. Ce débit n'inclut pas le trafic réseau entre les instances du cluster et le volume du cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_throughput.maximum** <br>(gauge) | La quantité maximale de débit réseau, en octets par seconde, à la fois reçue et transmise aux clients par chaque instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.minimum** <br>(gauge) | La quantité minimale de débit réseau, en octets par seconde, à la fois reçue et transmise aux clients par chaque instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.samplecount** <br>(gauge) | Echantillon de débit réseau reçu et transmis aux clients par chaque instance.<br>_Shown as byte_ |
| **aws.docdb.network_throughput.sum** <br>(gauge) | La somme du débit réseau, en octets par seconde, reçu et transmis aux clients par chaque instance.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_transmit_throughput** <br>(gauge) | La quantité moyenne de débit réseau envoyée aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (affiché en octets) |
| **aws.docdb.network_transmit_throughput.maximum** <br>(gauge) | La quantité maximale de débit réseau envoyée aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (affiché en octets) |
| **aws.docdb.network_transmit_throughput.minimum** <br>(gauge) | La quantité minimale de débit réseau envoyée aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.network_transmit_throughput.samplecount** <br>(gauge) | Nombre d'échantillons de débit réseau envoyés aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (affiché en octets) |
| **aws.docdb.network_transmit_throughput.sum** <br>(gauge) | La somme du débit réseau envoyé aux clients par chaque instance d'un cluster.<br>_Shown as byte_ (en anglais) |
| **aws.docdb.opcounters_command** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_command.average** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_command.maximum** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_command.minimum** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_command.samplecount** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_command.sum** <br>(count) | Nombre de commandes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_delete** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_delete.average** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_delete.maximum** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_delete.minimum** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_delete.samplecount** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_delete.sum** <br>(count) | Nombre d'opérations de suppression effectuées en une minute.|
| **aws.docdb.opcounters_getmore** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_getmore.average** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_getmore.maximum** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_getmore.minimum** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_getmore.samplecount** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_getmore.sum** <br>(count) | Le nombre de getmores émis dans une période d'une minute.|
| **aws.docdb.opcounters_insert** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_insert.average** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_insert.maximum** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_insert.minimum** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_insert.samplecount** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_insert.sum** <br>(count) | Nombre d'opérations d'insertion effectuées au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query.average** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query.maximum** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query.minimum** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query.samplecount** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_query.sum** <br>(count) | Nombre de requêtes émises au cours d'une période d'une minute.|
| **aws.docdb.opcounters_update** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.opcounters_update.average** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.opcounters_update.maximum** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.opcounters_update.minimum** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.opcounters_update.samplecount** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.opcounters_update.sum** <br>(count) | Nombre d'opérations de mise à jour effectuées en une minute.|
| **aws.docdb.read_iops** <br>(count) | Nombre d'octets lus depuis le disque par seconde.|
| **aws.docdb.read_iops.maximum** <br>(count) | Nombre maximum d'octets lus depuis le disque par seconde.|
| **aws.docdb.read_iops.minimum** <br>(count) | Nombre minimum d'octets lus depuis le disque par seconde.|
| **aws.docdb.read_iops.samplecount** <br>(count) | Compte d'échantillons du nombre d'octets lus depuis le disque par seconde.|
| **aws.docdb.read_iops.sum** <br>(count) | La somme du nombre d'octets lus depuis le disque par seconde.|
| **aws.docdb.read_latency** <br>(jauge) | Durée moyenne d'une opération d'E/S sur disque.|
| **aws.docdb.read_latency.maximum** <br>(gauge) | Durée moyenne maximale d'une opération d'E/S sur disque.|
| **aws.docdb.read_latency.minimum** <br>(gauge) | Durée moyenne minimale d'une opération d'E/S sur disque.|
| **aws.docdb.read_latency.samplecount** <br>(gauge) | Nombre d'échantillons de la durée moyenne d'une opération d'E/S sur disque.|
| **aws.docdb.read_latency.sum** <br>(gauge) | Somme des durées moyennes des opérations d'E/S sur disque.|
| **aws.docdb.read_throughput** <br>(gauge) | Le débit du réseau reçu et transmis aux clients par chaque instance d'une grappe.|
| **aws.docdb.read_throughput.maximum** <br>(gauge) | Débit maximal du réseau reçu et transmis aux clients par chaque instance d'une grappe.|
| **aws.docdb.read_throughput.minimum** <br>(gauge) | Le débit minimum du réseau reçu et transmis aux clients par chaque instance d'une grappe.|
| **aws.docdb.read_throughput.samplecount** <br>(gauge) | Nombre d'échantillons du débit réseau reçu et transmis aux clients par chaque instance d'une grappe.|
| **aws.docdb.read_throughput.sum** <br>(gauge) | La somme du débit réseau reçu et transmis aux clients par chaque instance d'une grappe.|
| **aws.docdb.snapshot_storage_used** <br>(gauge) | La quantité totale de stockage de sauvegarde consommée par tous les instantanés d'un cluster donné en dehors de sa fenêtre de conservation des sauvegardes.<br>_Affiché en gibyte_ |
| **aws.docdb.snapshot_storage_used.maximum** <br>(gauge) | La quantité totale maximale de stockage de sauvegarde consommée par tous les instantanés d'un cluster donné en dehors de sa fenêtre de rétention de sauvegarde.<br>_Affiché en gibyte_ |
| **aws.docdb.snapshot_storage_used.minimum** <br>(gauge) | Quantité totale minimale de stockage de sauvegarde consommée par tous les instantanés d'un cluster donné en dehors de sa fenêtre de conservation des sauvegardes.<br>_Affiché en gibyte_. |
| **aws.docdb.snapshot_storage_used.samplecount** <br>(gauge) | Nombre d'échantillons de la quantité totale de stockage de sauvegarde consommée par tous les instantanés pour un cluster donné en dehors de sa fenêtre de rétention de sauvegarde.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.snapshot_storage_used.sum** <br>(gauge) | La somme de la quantité totale de stockage de sauvegarde consommée par tous les instantanés d'un cluster donné en dehors de sa fenêtre de rétention de sauvegarde.<br>_Affiché en gibyte_ |
| **aws.docdb.swap_usage** <br>(gauge) | La quantité d'espace de pagination utilisée sur l'instance.|
| **aws.docdb.swap_usage.maximum** <br>(gauge) | La quantité maximale d'espace d'échange utilisée sur l'instance.|
| **aws.docdb.swap_usage.minimum** <br>(gauge) | La quantité minimale d'espace d'échange utilisée sur l'instance.|
| **aws.docdb.swap_usage.samplecount** <br>(gauge) | Compte échantillon de la quantité d'espace d'échange utilisée sur l'instance.|
| **aws.docdb.swap_usage.sum** <br>(gauge) | La somme de l'espace d'échange utilisé sur l'instance.|
| **aws.docdb.total_backup_storage_billed** <br>(gauge) | La quantité totale de stockage de sauvegarde pour laquelle vous êtes facturé pour un cluster donné.<br>_Affiché en gibyte_ |
| **aws.docdb.total_backup_storage_billed.maximum** <br>(gauge) | La quantité maximale de stockage de sauvegarde pour laquelle vous êtes facturé pour un cluster donné.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.total_backup_storage_billed.minimum** <br>(gauge) | La quantité minimale de stockage de sauvegarde pour laquelle vous êtes facturé pour un cluster donné.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.total_backup_storage_billed.samplecount** <br>(gauge) | Echantillon de la quantité de stockage de sauvegarde pour laquelle vous êtes facturé pour un cluster donné.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.total_backup_storage_billed.sum** <br>(gauge) | La somme de la quantité totale de stockage de sauvegarde pour laquelle vous êtes facturé pour un cluster donné.<br>_Shown as gibibyte_ (en anglais) |
| **aws.docdb.transactions_aborted** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_aborted.average** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_aborted.maximum** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_aborted.minimum** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_aborted.samplecount** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_aborted.sum** <br>(count) | Le nombre de transactions interrompues sur une instance au cours d'une période d'une minute.|
| **aws.docdb.transactions_committed** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_committed.average** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_committed.maximum** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_committed.minimum** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_committed.samplecount** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_committed.sum** <br>(count) | Le nombre de transactions engagées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open** <br>(jauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open.average** <br>(jauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open.maximum** <br>(gauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open.minimum** <br>(gauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open.samplecount** <br>(jauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open.sum** <br>(jauge) | Le nombre de transactions ouvertes sur une instance à une fréquence d'une minute.|
| **aws.docdb.transactions_open_max** <br>(gauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open_max.average** <br>(jauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open_max.maximum** <br>(jauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open_max.minimum** <br>(jauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open_max.samplecount** <br>(gauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_open_max.sum** <br>(jauge) | Le nombre maximum de transactions ouvertes sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started.average** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started.maximum** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started.minimum** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started.samplecount** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.transactions_started.sum** <br>(count) | Le nombre de transactions démarrées sur une instance dans une période d'une minute.|
| **aws.docdb.ttldeleted_documents** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.ttldeleted_documents.average** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.ttldeleted_documents.maximum** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.ttldeleted_documents.minimum** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.ttldeleted_documents.samplecount** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.ttldeleted_documents.sum** <br>(count) | Nombre de documents supprimés par un moniteur TTLM au cours d'une période d'une minute.|
| **aws.docdb.volume_bytes_used** <br>(count) | La quantité de stockage utilisée par votre cluster.<br>_Affiché en octet_. |
| **aws.docdb.volume_bytes_used.maximum** <br>(count) | La quantité maximale de stockage utilisée par votre cluster.<br>_Affiché en octet_. |
| **aws.docdb.volume_bytes_used.minimum** <br>(count) | La quantité minimale de stockage utilisée par votre cluster.<br>_Affiché en octet_. |
| **aws.docdb.volume_bytes_used.samplecount** <br>(count) | Echantillon de la quantité de stockage utilisée par votre cluster.<br>_Shown as byte_ |
| **aws.docdb.volume_bytes_used.sum** <br>(count) | La somme de la quantité de stockage utilisée par votre cluster.<br>_Affiché en octet_. |
| **aws.docdb.volume_read_iops** <br>(count) | Nombre moyen d'opérations d'E/S en lecture facturées à partir d'un volume en cluster.|
| **aws.docdb.volume_read_iops.maximum** <br>(count) | Nombre moyen maximum d'opérations d'E/S en lecture facturées à partir d'un volume en cluster.|
| **aws.docdb.volume_read_iops.minimum** <br>(count) | Nombre moyen minimum d'opérations d'E/S en lecture facturées à partir d'un volume en cluster.|
| **aws.docdb.volume_read_iops.samplecount** <br>(count) | Nombre d'échantillons du nombre moyen d'opérations d'E/S en lecture facturées à partir d'un volume de cluster.|
| **aws.docdb.volume_read_iops.sum** <br>(count) | La somme du nombre moyen d'opérations d'E/S en lecture facturées à partir d'un volume de cluster.|
| **aws.docdb.volume_write_iops** <br>(count) | Nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.volume_write_iops.maximum** <br>(count) | Nombre moyen maximum d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.volume_write_iops.minimum** <br>(count) | Nombre moyen minimum d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.volume_write_iops.samplecount** <br>(count) | Nombre d'échantillons du nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.volume_write_iops.sum** <br>(count) | Somme du nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_iops** <br>(count) | Nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_iops.maximum** <br>(count) | Nombre moyen maximum d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_iops.minimum** <br>(count) | Nombre moyen minimum d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_iops.samplecount** <br>(count) | Nombre d'échantillons du nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_iops.sum** <br>(count) | Somme du nombre moyen d'opérations d'E/S sur disque par seconde.|
| **aws.docdb.write_latency** <br>(jauge) | Durée moyenne d'une opération d'E/S sur disque.<br>_Affichée en millisecondes_. |
| **aws.docdb.write_latency.maximum** <br>(gauge) | Durée maximale d'une opération d'E/S sur disque.<br>_En millisecondes_. |
| **aws.docdb.write_latency.minimum** <br>(gauge) | Durée minimale d'une opération d'E/S sur disque.<br>_En millisecondes_. |
| **aws.docdb.write_latency.samplecount** <br>(gauge) | Comptage d'échantillons du temps nécessaire à chaque opération d'E/S sur disque.<br>_Affiché en millisecondes_. |
| **aws.docdb.write_latency.sum** <br>(gauge) | Somme du temps moyen nécessaire à chaque opération d'E/S sur disque.<br>_Affiché en millisecondes_. |
| **aws.docdb.write_throughput** <br>(jauge) | Nombre moyen d'octets écrits sur le disque par seconde.|
| **aws.docdb.write_throughput.maximum** <br>(gauge) | Nombre moyen maximum d'octets écrits sur le disque par seconde.|
| **aws.docdb.write_throughput.minimum** <br>(gauge) | Nombre moyen minimum d'octets écrits sur le disque par seconde.|
| **aws.docdb.write_throughput.samplecount** <br>(gauge) | Compte d'échantillons du nombre moyen d'octets écrits sur le disque par seconde.|
| **aws.docdb.write_throughput.sum** <br>(gauge) | Somme du nombre moyen d'octets écrits sur le disque par seconde.|

Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, dbinstanceidentifier et dbclusteridentifier.

### Événements

L'intégration Amazon DocumentDB n'inclut aucun événement.

### Checks de service

L'intégration Amazon DocumentDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}