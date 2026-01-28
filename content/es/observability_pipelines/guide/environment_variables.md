---
disable_toc: false
title: Variables de entorno
---

## Información general

Algunos componentes de Observability Pipelines requieren la configuración de variables de entorno. Este documento enumera las variables de entorno para las diferentes fuentes, procesadores y destinos.

## Variables de entorno de los componentes

{{< tabs >}}
{{% tab "Fuentes" %}}

### Manguera de datos de Amazon
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

### Amazon S3
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

### Datadog Agent
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

### Fluent
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

### Google Pub/Sub
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

### Cliente HTTP
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

### Servidor HTTP
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

### Kafka
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

### Logstash
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

### OpenTelemetry
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

### Socket

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

### Splunk HEC
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

### Splunk TCP
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

### Sumo Logic
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

### Syslog
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}

{{% tab "Processors" %}}

### Añadir variables de entorno

- Lista de permisos
  - La lista de permitidos es una lista separada por comas de variables de entorno de las que deseas extraer valores y utilizar con este procesador.
  - Almacenado en la variable de entorno `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.

{{% /tab %}}
{{% tab "Destinations" %}}

### Amazon OpenSearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

### Amazon Security Lake
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

### CrowdStrike NG-SIEM
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

### Datadog Logs
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### Métricas de Datadog
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### Archivos de Datadog
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

### Elasticsearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

### Google Pub/Sub
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

### Google SecOps
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

### Cliente HTTP
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

### Kafka
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

### Microsoft Sentinel
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

### New Relic
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

### OpenSearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

### SentinelOne
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

### Socket
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### Splunk HEC
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### Sumo Logic
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

### Syslog
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}