---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Integrations Guides
disable_toc: true
private: true
title: Guides sur les intégrations
---
{{< header-list header="Guides généraux" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Demander des intégrations Datadog{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}Ajouter des métadonnées personnalisées avec des tables de référence{{< /nextlink >}}
    {{< nextlink href="source_code" tag=" Documentation" >}}Intégration du code source de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/high_availability" tag=" Documentation" >}}Prise en charge de la haute disponibilité (HA) du Datadog Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Délai des métriques cloud{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}Ajouter des fichiers de log d'événements à la `Win32_NTLogEvent` classe WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}Récupérer des métriques WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}Collecter des métriques personnalisées MongoDB{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Mappage des métriques Prometheus vers les métriques Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}Collecte de métriques Prometheus et OpenMetrics à partir d'un host{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Tickets Freshservice utilisant des Webhooks{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Erreur d'intégration du système de fichiers distribué Hadoop (HDFS){{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Surveillance de HCP Consul avec Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}Échec de la récupération du stub RMIServer par l'Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Envoyer des métriques de host TCP/UDP à la Datadog API{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}OID compatibles et couramment utilisés pour SNMP{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}Gestion des versions pour les intégrations basées sur OpenMetrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Configuration manuelle de Pivotal Cloud Foundry{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Application Monitoring for VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Cluster Monitoring pour VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/fips-integrations" tag=" fips" >}}Intégrations d'agent vérifiées FIPS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_troubleshooting" tag=" Microsoft Teams" >}}Dépannage de Microsoft Teams{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_migrate_legacy_connectors" tag=" Microsoft Teams" >}}Migrer depuis les connecteurs Office 365 dans Microsoft Teams{{< /nextlink >}}
    {{< nextlink href="integrations/guide/slack-actions" tag=" Slack" >}}Actions Slack pour les incidents, On-Call, les monitors, les dashboards, les workflows et les comptes{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides AWS" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}Configuration automatique de l'intégration AWS avec CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Configuration automatique de l'intégration AWS avec Terraform{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}Configuration multi-comptes de l'intégration AWS pour Organizations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}Configuration manuelle de l'intégration AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}Dépannage de l'intégration AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-metric-name-filters" tag=" AWS" >}}Configurer les filtres de noms de métriques AWS avec l'API{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}Surveiller votre facture AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}Erreur : Datadog is not authorized to perform sts:AssumeRole{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}Flux de métriques AWS CloudWatch avec Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Utilisation d'Amazon CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Créer des événements Datadog à partir d'e-mails Amazon SNS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}FAQ sur l'intégration AWS et CloudWatch{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides AWS Marketplace :" >}}
    {{< nextlink href="integrations/guide/aws-marketplace-datadog-trial" tag=" AWS Marketplace" >}}Configuration de l'essai Datadog sur AWS Marketplace{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides Azure :" >}}
    {{< nextlink href="integrations/guide/azure-integrations" tag=" Azure" >}}Intégrations Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-advanced-configuration" tag=" Azure" >}}Configuration avancée d'Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-integration" tag=" Azure" >}}Intégration native Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Utilisation du Cloud Adoption Framework Azure avec Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Autorisations de l'API Microsoft Graph pour la surveillance d'Azure{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides Google Cloud" >}}
    {{< nextlink href="integrations/guide/gcp-metric-discrepancy" tag=" gcp" >}}Discrépance des métriques Google Cloud{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides Alibaba Cloud" >}}
    {{< nextlink href="integrations/guide/alibaba-cloud-integration-troubleshooting" tag="Alibaba Cloud" >}}Dépannage de l'intégration Alibaba Cloud{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides OCI" >}}
    {{< nextlink href="integrations/guide/oci-integration-troubleshooting" tag=" oci" >}}Dépannage de l'intégration Datadog OCI{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides JMX" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Exécuter des commandes JMX sous Windows{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}Collecte d'attributs JMX de type composite{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Utiliser les expressions régulières Bean pour filtrer vos métriques JMX et spécifier des tags supplémentaires{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}Quelles intégrations utilisent Jmxfetch ?{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmxfetch-fips/" tag=" jmx" >}}Mode FIPS-140 de JMXFetch{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides ServiceNow" >}}
   {{< nextlink href="integrations/guide/servicenow-itom-itsm-setup" >}}Configurer ServiceNow ITOM et ITSM{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-cmdb-enrichment-setup" >}}Configurer l'enrichissement CMDB ServiceNow{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-service-graph-connector-setup" >}}Configurer le connecteur Service Graph ServiceNow{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guides de base de données" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}Recueillir des métriques supplémentaires à partir de l'intégration SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}Collecter des métriques personnalisées SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}Utiliser WMI pour collecter davantage de métriques de performance SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}Problèmes de connexion avec l'intégration SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}Requêtes personnalisées MySQL{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}Configuration de l'intégration Oracle sur l'Agent 7.50.1+{{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Configuration de l'intégration Oracle sur les versions de l'Agent antérieures à 7.50.1{{< /nextlink >}}
{{< /header-list >}}