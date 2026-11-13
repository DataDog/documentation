---
aliases:
- /es/observability_pipelines/update_existing_pipelines/
disable_toc: false
title: Actualizar canalizaciones existentes
---
## Descripción general {#overview}

Para las canalizaciones existentes en Observability Pipelines, puede actualizar e implementar cambios en la configuración de fuente, la configuración de destino y los procesadores en la interfaz de usuario de Observability Pipelines. Pero si está utilizando variables de entorno y desea actualizar las variables de entorno de fuente y destino, debe actualizar manualmente el Worker con los nuevos valores.

Este documento explica cómo actualizar la canalización en la interfaz de usuario. También puede utilizar la API [actualizar una canalización][2] o el recurso de Terraform [datadog_observability_pipeline][3] para actualizar las canalizaciones existentes.

Consulte [Exportar una configuración de canalización a JSON o Terraform][4] si desea implementar mediante programación una canalización actualizada en la interfaz de usuario.

## Actualizar una canalización existente {#update-an-existing-pipeline}

1. Navegue a [Observability Pipelines][1].
1. Seleccione la canalización que desea actualizar.
1. Haga clic en {{< ui >}}Edit Pipeline{{< /ui >}} en la esquina superior derecha.
1. Realice cambios en la canalización.
	- Si está actualizando la configuración de fuente o destino que se muestra en los mosaicos, o actualizando y agregando procesadores, realice los cambios y luego haga clic en {{< ui >}}Deploy Changes{{< /ui >}}.
	- Para actualizar las variables de entorno de fuente o destino, haga clic en {{< ui >}}Go to Worker Installation Steps{{< /ui >}} y consulte [Actualizar variables de entorno de fuente o destino](#update-source-or-destination-environment-variables) para obtener instrucciones.
1. Si agrega, actualiza o elimina una fuente, un destino o los secretos correspondientes, debe reiniciar el Worker usando un comando como `sudo systemctl restart observability-pipelines-worker` para que el cambio surta efecto.

### Actualizar variables de entorno de fuente o destino {#update-source-or-destination-environment-variables}

En la página de instalación del Worker:
1. Seleccione su plataforma en el menú desplegable {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Si desea actualizar las variables de entorno de fuente, actualice la información de su fuente de datos.
{{< tabs >}}
{{% tab "Amazon Data Firehose" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{% tab "Amazon S3" %}}

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
{{% tab "Cliente HTTP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{% tab "Servidor HTTP" %}}

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
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{% tab "WebSocket" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/websocket %}}

{{% /tab %}}
{{< /tabs >}}
1. Si desea actualizar las variables de entorno de destino, actualice la información de su destino de datos.
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
{{% tab "Cliente HTTP" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{% tab "Kafka" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

**Métricas**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

**Trazas**

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
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

1. Siga las instrucciones para su entorno para actualizar el Worker:
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
[2]: /es/api/latest/observability-pipelines/#update-a-pipeline
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /es/observability_pipelines/configuration/export_pipeline_configuration/