---
aliases:
- /fr/observability_pipelines/update_existing_pipelines/
disable_toc: false
title: Mettre à jour des pipelines existants
---
## Vue d'ensemble {#overview}

Pour les pipelines existants dans Observability Pipelines, vous pouvez mettre à jour et déployer des modifications pour les paramètres de source, les paramètres de destination et les processeurs dans l'interface utilisateur d'Observability Pipelines. Mais si vous utilisez des variables d'environnement et souhaitez mettre à jour les variables d'environnement de la source et de la destination, vous devez mettre à jour manuellement le Worker avec les nouvelles valeurs.

Ce document explique comment mettre à jour le pipeline dans l'interface utilisateur. Vous pouvez également utiliser l'API [update a pipeline][2] ou la ressource Terraform [datadog_observability_pipeline][3] pour mettre à jour les pipelines existants.

Consultez [Exporter une configuration de pipeline vers JSON ou Terraform][4] si vous souhaitez déployer par programmation un pipeline mis à jour dans l'interface utilisateur.

## Mettre à jour un pipeline existant {#update-an-existing-pipeline}

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez le pipeline que vous souhaitez mettre à jour.
1. Cliquez sur {{< ui >}}Edit Pipeline{{< /ui >}} dans le coin supérieur droit.
1. Apportez des modifications au pipeline.
	- Si vous mettez à jour les paramètres de la source ou de la destination affichés dans les tuiles, ou si vous mettez à jour et ajoutez des processeurs, effectuez les modifications puis cliquez sur {{< ui >}}Deploy Changes{{< /ui >}}.
	- Pour mettre à jour les variables d'environnement de la source ou de la destination, cliquez sur {{< ui >}}Go to Worker Installation Steps{{< /ui >}} et consultez [Mettre à jour les variables d'environnement de la source ou de la destination](#update-source-or-destination-environment-variables) pour obtenir des instructions.
1. Si vous ajoutez, mettez à jour ou supprimez une source, une destination ou les secrets correspondants, vous devez redémarrer le Worker à l'aide d'une commande telle que `sudo systemctl restart observability-pipelines-worker` pour que la modification prenne effet.

### Mettre à jour les variables d'environnement de la source ou de la destination {#update-source-or-destination-environment-variables}

Sur la page d'installation du Worker :
1. Sélectionnez votre plateforme dans le menu déroulant {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Si vous souhaitez mettre à jour les variables d'environnement de la source, mettez à jour les informations relatives à votre source de données.
{{< tabs >}}
{{% tab "Amazon Data Firehose" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{% tab "Amazon S3" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

{{% /tab %}}
{{% tab "Datadog Agent" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{% tab "Fluent" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

{{% /tab %}}
{{% tab "Google Pub/Sub" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{% tab "Client HTTP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{% tab "Serveur HTTP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{% tab "Kafka" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{% tab "Logstash" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{% tab "MySQL" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/mysql %}}

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{% tab "Prometheus" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{% tab "WebSocket" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/websocket %}}

{{% /tab %}}
{{< /tabs >}}
1. Si vous souhaitez mettre à jour les variables d'environnement de destination, mettez à jour les informations relatives à votre destination de données.
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "ClickHouse" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/clickhouse %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Databricks" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{% tab "Datadog Logs" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Metrics" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "Google Pub/Sub" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{% tab "Google SecOps" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "Client HTTP" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{% tab "Kafka" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

**Métriques**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

**Traces**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_traces %}}

{{% /tab %}}
{{% tab "Prometheus" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{% tab "Socket" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

1. Suivez les instructions correspondant à votre environnement pour mettre à jour le Worker :
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/api/latest/observability-pipelines/#update-a-pipeline
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /fr/observability_pipelines/configuration/export_pipeline_configuration/