---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: Documentation
  text: Mappage des métriques OpenTelemetry
title: Integrations
---
Cette page couvre les intégrations OpenTelemetry (OTel) prises en charge par Datadog. Ces intégrations vous permettent de collecter et de surveiller vos données d'observabilité à l'aide d'OpenTelemetry dans Datadog.

## Présentation {#overview}

Les intégrations OpenTelemetry (OTel) sont des composants qui permettent la collecte de données d'observabilité (métriques, traces et logs) à partir de diverses sources en utilisant la norme OpenTelemetry. Ces intégrations sont conçues pour fonctionner avec l'OpenTelemetry Collector, qui reçoit, traite et exporte les données de télémétrie vers des backends d'observabilité comme Datadog.

Pour une liste complète de toutes les intégrations OpenTelemetry, consultez le [OpenTelemetry Registry][1]. Ce registre fournit des informations sur les récepteurs, les exportateurs et d'autres composants de l'écosystème OpenTelemetry.

## Tarification des métriques {#metric-pricing}

Datadog collecte les métriques des récepteurs OpenTelemetry pris en charge sans frais supplémentaires. Ces métriques sans frais sont :
- Définis dans le fichier `metadata.yaml` pour chaque récepteur.
- Répertoriés dans le tableau [Metrics Mappings][14].

Par exemple, le fichier [`dockerstatsreceiver`][15] `metadata.yaml` répertorie les métriques que vous pouvez collecter sans frais supplémentaires.

<div class="alert alert-danger">Assurez-vous de configurer les récepteurs conformément à la documentation des récepteurs OpenTelemetry. Des récepteurs mal configurés peuvent entraîner la classification des métriques comme personnalisées, ce qui entraîne des frais supplémentaires.</div>

## Intégrations OpenTelemetry prises en charge par Datadog {#datadog-supported-opentelemetry-integrations}

Datadog prend en charge les intégrations OpenTelemetry suivantes :

### APM (Application Performance Monitoring) {#apm-application-performance-monitoring}

Surveillez et optimisez les performances de vos applications :

- [Métriques de trace][2] - Générez des statistiques APM telles que les hits, les erreurs et la durée
- [Métriques runtime][3] - Collectez des métriques d'exécution pour les applications Java, .NET et Go

### Collector {#collector}

Surveillez la santé et les performances de votre Collector OpenTelemetry :

- [Métriques de santé de Collector][4] - Suivez les performances de votre OpenTelemetry Collector
- [Datadog Extension][17] - Affichez la configuration du collecteur et les informations de build dans Datadog Infrastructure Monitoring

### Conteneurs et hosts {#containers-and-hosts}

Obtenez une visibilité sur vos environnements conteneurisés et vos systèmes de hosts :

- [Métriques de Docker][5] - Surveillez les performances des conteneurs Docker
- [Métriques de hosts][6] - Suivez les métriques système telles que l'utilisation du processeur, du disque et de la mémoire
- [Métriques Kubernetes][18] - Collectez les métriques d'infrastructure Kubernetes et envoyez les données de ressources à Kubernetes Explorer
- [Métriques Podman][16] - Surveillez les performances des conteneurs Podman

### Serveurs Web et proxys {#web-servers-and-proxies}

Surveillez les serveurs web et les technologies de proxy :

- [Métriques du serveur web Apache][7] - Collectez les métriques du serveur HTTP Apache
- [Métriques NGINX][8] - Surveillez les performances du serveur Web NGINX
- [Métriques IIS][9] - Surveillez les métriques des services Internet Information Services (IIS)
- [Métriques HAProxy][10] - Surveillez les performances de l'équilibreur de charge HAProxy

### Bases de données et messagerie {#databases-and-messaging}

Surveillez les systèmes de base de données et de messagerie :

- [Métriques MySQL][11] - Surveillez les performances de la base de données MySQL
- [Métriques PostgreSQL][19] - Surveillez les performances de la base de données PostgreSQL
- [Métriques SQL Server][20] - Surveillez les performances de la base de données SQL Server
- [Métriques Kafka][12] - Surveillez la plateforme de messagerie Apache Kafka

### Big data et traitement {#big-data-and-processing}

Surveillez les frameworks de traitement de big data :

- [Métriques Apache Spark][13] - Surveillez les métriques de performance d'Apache Spark

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /fr/opentelemetry/integrations/trace_metrics
[3]: /fr/opentelemetry/integrations/runtime_metrics/
[4]: /fr/opentelemetry/integrations/collector_health_metrics/
[5]: /fr/opentelemetry/integrations/docker_metrics/
[6]: /fr/opentelemetry/integrations/host_metrics/
[7]: /fr/opentelemetry/integrations/apache_metrics/
[8]: /fr/opentelemetry/integrations/nginx_metrics/
[9]: /fr/opentelemetry/integrations/iis_metrics/
[10]: /fr/opentelemetry/integrations/haproxy_metrics/
[11]: /fr/opentelemetry/integrations/mysql_metrics/
[12]: /fr/opentelemetry/integrations/kafka_metrics/
[13]: /fr/opentelemetry/integrations/spark_metrics/
[14]: /fr/opentelemetry/mapping/metrics_mapping/#metrics-mappings
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml
[16]: /fr/opentelemetry/integrations/podman_metrics/
[17]: /fr/opentelemetry/integrations/datadog_extension/
[18]: /fr/opentelemetry/integrations/kubernetes_metrics/
[19]: /fr/opentelemetry/integrations/postgres_metrics/
[20]: /fr/opentelemetry/integrations/sqlserver_metrics/