---
categories:
  - cloud
  - aws
  - log collection
ddtype: check
dependencies: []
description: Surveillez des métriques clés d'Amazon Managed Streaming for Apache Kafka (MSK).
doc_link: https://docs.datadoghq.com/integrations/amazon_msk/
draft: false
git_integration_title: amazon_msk
has_logo: true
integration_id: amazon-msk
integration_title: Amazon Managed Streaming for Apache Kafka
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_msk
public_title: Intégration Datadog/Amazon Managed Streaming for Apache Kafka
short_description: "Surveillez des métriques clés d'Amazon\_MSK."
version: '1.0'
---
## Présentation

Amazon Managed Streaming for Apache Kafka (MSK) est un service entièrement géré qui vous permet de créer et d'exécuter facilement des applications qui utilisent Apache Kafka pour traiter les données en streaming.

Vous pouvez recueillir des métriques à partir de cette intégration de deux façons : avec l'[Agent Datadog](#check-de-l-agent) ou avec un [crawler](#crawler) qui recueille des métriques à partir de CloudWatch.

## Check de l'Agent

Le check de l'Agent permet de surveiller Amazon Managed Streaming for Apache Kafka ([Amazon MSK][1]) avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

1. [Créez une machine client][3] si ce n'est pas déjà fait.
2. Assurez-vous que la machine client [dispose][4] de la stratégie d'autorisation [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][5] ou que des [identifiants][6] équivalents sont disponibles.
3. Activez la [surveillance ouverte avec Prometheus][7] côté MSK pour activer JmxExporter et NodeExporter.
4. Installez l'[Agent Datadog][8].

### Configuration

1. Modifiez le fichier `amazon_msk.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Amazon MSK. Consultez le [fichier d'exemple amazon_msk.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `amazon_msk` dans la section Checks.

### Données collectées

#### Métriques
{{< get-metrics-from-git "amazon_msk" >}}


#### Checks de service

**aws.msk.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à détecter les nœuds du cluster MSK. Si ce n'est pas le cas, renvoie `OK`.

**aws.msk.prometheus.health** :<br>
Renvoie `CRITICAL` si le check ne parvient pas à se connecter à l'endpoint de métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Amazon MSK n'inclut aucun événement.

## Crawler

Activez cette intégration pour visualiser dans Datadog vos métriques MSK provenant de CloudWatch.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][13].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][14], assurez-vous que l'option `MSK` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon MSK][15].

### Collecte de logs

#### Activer le logging

Configurez Amazon MSK de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_msk` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][16].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon MSK dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][17]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][18]

### Données collectées

<table class="table table-vertical-mobile table-metrics"><tbody><tr><td><strong>aws.kafka.zookeeper_request_latency_ms_mean</strong><br>(gauge)</td><td>Latence moyenne en millisecondes pour les requêtes ZooKeeper du broker.</td></tr><tr><td><strong>aws.kafka.active_controller_count</strong><br>(gauge)</td><td>Un seul contrôleur par cluster doit être actif à un moment donné.</td></tr><tr><td><strong>aws.kafka.global_partition_count</strong><br>(gauge)</td><td>Nombre total de partitions au niveau de tous les brokers dans le cluster.</td></tr><tr><td><strong>aws.kafka.global_topic_count</strong><br>(gauge)</td><td>Nombre total de rubriques parmi tous les brokers du cluster.</td></tr><tr><td><strong>aws.kafka.offline_partitions_count</strong><br>(gauge)</td><td>Nombre total de partitions hors connexion dans le cluster.</td></tr><tr><td><strong>aws.kafka.swap_used</strong><br>(gauge)</td><td>Taille en octets de la mémoire swap utilisée pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.swap_free</strong><br>(gauge)</td><td>Taille en octets de la mémoire swap disponible pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.memory_used</strong><br>(gauge)</td><td>Taille en octets de la mémoire utilisée pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.memory_buffered</strong><br>(gauge)</td><td>Taille en octets de la mémoire tampon pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.memory_free</strong><br>(gauge)</td><td>Taille en octets de la mémoire libre et disponible pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.memory_cached</strong><br>(gauge)</td><td>Taille en octets de la mémoire cache pour le broker.<br><em>Affichée en octet</em></td></tr><tr><td><strong>aws.kafka.cpu_user</strong><br>(gauge)</td><td>Pourcentage de CPU dans l'espace utilisateur.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.cpu_system</strong><br>(gauge)</td><td>Pourcentage de CPU dans l'espace du kernel.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.cpu_idle</strong><br>(gauge)</td><td>Pourcentage de temps d'inactivité du processeur.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.root_disk_used</strong><br>(gauge)</td><td>Pourcentage du disque racine utilisé par le broker.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.kafka_app_logs_disk_used</strong><br>(gauge)</td><td>Pourcentage d'espace disque utilisé pour les logs d'application.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.kafka_data_logs_disk_used</strong><br>(gauge)</td><td>Pourcentage d'espace disque utilisé pour les logs de données.<br><em>Affiché en pourcentage</em></td></tr><tr><td><strong>aws.kafka.network_rx_errors</strong><br>(count)</td><td>Nombre d'erreurs de réception réseau pour le broker.</td></tr><tr><td><strong>aws.kafka.network_tx_errors</strong><br>(count)</td><td>Nombre d'erreurs de transmission réseau pour le broker.</td></tr><tr><td><strong>aws.kafka.network_rx_dropped</strong><br>(count)</td><td>Nombre de paquets de réception perdus.</td></tr><tr><td><strong>aws.kafka.network_tx_dropped</strong><br>(count)</td><td>Nombre de paquets de transmission perdus.</td></tr><tr><td><strong>aws.kafka.network_rx_packets</strong><br>(count)</td><td>Nombre de paquets reçus par le broker.</td></tr><tr><td><strong>aws.kafka.network_tx_packets</strong><br>(count)</td><td>Nombre de paquets transmis par le broker.</td></tr><tr><td><strong>aws.kafka.messages_in_per_sec</strong><br>(gauge)</td><td>Nombre de messages entrants par seconde pour le broker.</td></tr><tr><td><strong>aws.kafka.network_processor_avg_idle_percent</strong><br>(gauge)</td><td>Pourcentage moyen de temps pendant lequel les processeurs réseau sont inactifs.</td></tr><tr><td><strong>aws.kafka.request_handler_avg_idle_percent</strong><br>(gauge)</td><td>Pourcentage moyen de temps pendant lequel les threads du gestionnaire de requêtes sont inactifs.</td></tr><tr><td><strong>aws.kafka.leader_count</strong><br>(gauge)</td><td>Nombre de réplicas leader.</td></tr><tr><td><strong>aws.kafka.partition_count</strong><br>(gauge)</td><td>Nombre de partitions pour le broker.</td></tr><tr><td><strong>aws.kafka.produce_local_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, d'envoi d'une réponse par le suiveur.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_message_conversions_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, consacré aux conversions de format de message.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_request_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, que les messages de requête passent dans la file d'attente.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_response_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, que les messages de réponse passent dans la file d'attente.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_response_send_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, consacré à l'envoi de messages de réponse.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_total_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen de production en millisecondes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.request_bytes_mean</strong><br>(gauge)</td><td>Nombre moyen d'octets de requêtes pour le broker.</td></tr><tr><td><strong>aws.kafka.under_minlsr_partition_count</strong><br>(gauge)</td><td>Nombre de partitions sous minlsr pour le broker</td></tr><tr><td><strong>aws.kafka.under_replicated_partitions</strong><br>(gauge)</td><td>Nombre de partitions sous-répliquées pour le broker.</td></tr><tr><td><strong>aws.kafka.bytes_in_per_sec</strong><br>(gauge)</td><td>Nombre d'octets reçus des clients par seconde.<br><em>Affiché en octet</em></td></tr><tr><td><strong>aws.kafka.bytes_out_per_sec</strong><br>(gauge)</td><td>Nombre d'octets envoyés aux clients par seconde.<br><em>Affiché en octet</em></td></tr><tr><td><strong>aws.kafka.messages_in_per_sec</strong><br>(gauge)</td><td>Nombre de messages reçus des clients par seconde.</td></tr><tr><td><strong>aws.kafka.fetch_message_conversions_per_sec</strong><br>(gauge)</td><td>Nombre de messages récupérés convertis par seconde pour le broker.</td></tr><tr><td><strong>aws.kafka.produce_message_conversions_per_sec</strong><br>(gauge)</td><td>Nombre de message de production convertis par seconde pour le broker.</td></tr><tr><td><strong>aws.kafka.fetch_consumer_total_time_ms_mean</strong><br>(gauge)</td><td>Temps total moyen, en millisecondes, que les consommateurs consacrent à l'extraction des données du broker.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_total_time_ms_mean</strong><br>(gauge)</td><td>Temps total moyen, en millisecondes, consacré par les suiveurs à la récupération des données du broker.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_request_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel les requêtes des consommateurs attendent dans la file d'attente des requêtes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_request_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel les requêtes des suiveurs attendent dans la file d'attente des requêtes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_local_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel la requête du consommateur est traitée au niveau du leader.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_local_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel la requête du suiveur est traitée au niveau du leader.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_response_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel la requête du consommateur attend dans la file d'attente de réponses.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_response_queue_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, pendant lequel la requête du suiveur attend dans la file d'attente de réponses.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.consumer_response_send_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, d'envoi d'une réponse par le consommateur.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_response_send_time_ms_mean</strong><br>(gauge)</td><td>Temps moyen, en millisecondes, d'envoi d'une réponse par le suiveur.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_throttle_time</strong><br>(gauge)</td><td>Temps moyen de limitation de production en millisecondes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.produce_throttle_byte_rate</strong><br>(gauge)</td><td>Nombre d'octets limités par seconde.</td></tr><tr><td><strong>aws.kafka.produce_throttle_queue_size</strong><br>(gauge)</td><td>Nombre de messages dans la file d'attente des limites.</td></tr><tr><td><strong>aws.kafka.fetch_throttle_time</strong><br>(gauge)</td><td>Temps moyen de limitation de récupération en millisecondes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.fetch_throttle_byte_rate</strong><br>(gauge)</td><td>Nombre d'octets limités par seconde.</td></tr><tr><td><strong>aws.kafka.fetch_throttle_queue_size</strong><br>(gauge)</td><td>Nombre de messages dans la file d'attente des limites.</td></tr><tr><td><strong>aws.kafka.request_throttle_time</strong><br>(gauge)</td><td>Temps moyen de limitation de requête en millisecondes.<br><em>Affiché en milliseconde</em></td></tr><tr><td><strong>aws.kafka.request_time</strong><br>(gauge)</td><td>Temps moyen passé dans le réseau de courtage et les threads d'E/S pour traiter les requêtes.</td></tr><tr><td><strong>aws.kafka.request_throttle_queue_size</strong><br>(gauge)</td><td>Nombre de messages dans la file d'attente des limites.</td></tr><tr><td><strong>aws.kafka.request_exempt_from_throttle_time</strong><br>(gauge)</td><td>Temps moyen passé dans le réseau de courtage et les threads d'E/S pour traiter les requêtes exemptées de la limitation.</td></tr></tbody></table>

Le crawler Amazon MSK n'inclut aucun événement ni aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][19].

[1]: https://aws.amazon.com/msk
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[3]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[5]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[6]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[7]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[8]: https://docs.datadoghq.com/fr/agent/
[9]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[13]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[14]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[15]: https://app.datadoghq.com/account/settings#integrations/amazon-msk
[16]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[17]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[18]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[19]: https://docs.datadoghq.com/fr/help/