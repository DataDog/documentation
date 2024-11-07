---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Guides sur les intégrations
disable_toc: true

private: true
title: Guides sur les intégrations
---

{{< whatsnext desc="Guides généraux :" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Demander des intégrations Datadog{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}Ajouter des métadonnées personnalisées grâce aux tables de référence{{< /nextlink >}}   
    {{< nextlink href="integrations/guide/source-code-integration" tag=" Documentation" >}}Intégration du code source de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Délai de réception des métriques cloud{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}Ajouter des fichiers de logs d'événements à la classe WMI `Win32_NTLogEvent`{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}Récupération de métriques WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" Mongo" >}}Recueillir des métriques custom Mongo{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Mappage de métriques Prometheus avec des métriques Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}Collecte de métriques Prometheus et OpenMetrics à partir d'un host{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Tickets Freshservice avec des Webhooks{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Erreur d'intégration du Hadoop Distributed File System (HDFS){{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Surveillance de HCP Consul avec Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}Échec de la récupération du stub RMIServer par l'Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Envoyer des métriques de host TCP/UDP à l'API Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}OID compatibles et couramment utilisés pour SNMP{{< /nextlink >}} 
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}Gestion des versions pour les intégrations basées sur OpenMetrics{{< /nextlink >}} {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Configuration manuelle de Pivotal Cloud Foundry{{< /nextlink >}} {{< /whatsnext >}}

{{< whatsnext desc="Guides AWS :" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}Configuration automatique de l'intégration AWS avec CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Configuration automatique de l'intégration AWS avec Terraform{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}Configuration multi-comptes de l'intégration AWS pour les organisations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}Configuration manuelle de l'intégration AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}Dépannage de l'intégration AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}Surveiller votre facture AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}Erreur « Datadog is not authorized to perform sts.AssumeRole »{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}Flux de métriques AWS CloudWatch avec Kinesis Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Utilisation d'Amazon CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Créer des événements Datadog à partir d'e-mails Amazon SNS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}FAQ sur l'intégration AWS et CloudWatch{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides Azure :" >}}
    {{< nextlink href="integrations/guide/azure-manual-setup" tag=" Azure" >}}Guide de configuration manuelle d'Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-manual-setup" tag=" Azure" >}}Guide de configuration manuelle de l'intégration native Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-programmatic-management" tag=" Azure" >}}Guide de gestion programmatique de l'intégration Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-programmatic-management" tag=" Azure" >}}Guide de gestion programmatique de l'intégration native Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-portal" tag=" Azure" >}}Gestion de l'intégration native Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Utilisation du Cloud Adoption Framework Azure avec Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-troubleshooting" tag=" Azure" >}}Dépannage Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-architecture-and-configuration" tag=" Azure" >}}Architecture et configuration d'Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-status-metric" tag=" Azure" >}}Statut et métriques count Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-vms-appear-in-app-without-metrics" tag=" Azure" >}}Les métriques des machines virtuelles Azure n'apparaissent pas dans l'application{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powered-down-azure-vm-on-infrastructure-list" tag=" Azure" >}}Machines virtuelles Azure hors ligne dans la liste des infrastructures{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powershell-command-to-install-azure-datadog-extension" tag=" Azure" >}}Commandes pour installer l'extension Datadog/Azure{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides JMX :" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Exécuter des commandes JMX sous Windows{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}Recueillir des attributs JMX composite{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Utiliser les expressions régulières Bean pour filtrer vos métriques JMX et spécifier des tags supplémentaires{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}Quelles intégrations utilisent Jmxfetch ?{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides SQL :" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}Recueillir des métriques supplémentaires à partir de l'intégration SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}Recueillir des métriques custom SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}Utiliser WMI pour recueillir d'autres métriques sur les performances de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}Problèmes de connexion avec l'intégration SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}Requêtes personnalisées MySQL{{< /nextlink >}}
{{< /whatsnext >}}