---
aliases:
- /es/observability_pipelines/environment_variables/
disable_toc: false
title: Variables de Entorno
---
## Descripción general {#overview}

Algunos componentes de Observability Pipelines requieren la configuración de variables de entorno. Este documento enumera las variables de entorno para las diferentes fuentes, procesadores y destinos.

**Nota**: Cuando configura un pipeline e instala el Worker, si ingresa identificadores secretos y luego elige usar variables de entorno, la variable de entorno es el identificador ingresado precedido por `DD_OP`. Por ejemplo, si ingresa `PASSWORD_1` para un identificador de contraseña, la variable de entorno para esa contraseña es `DD_OP_PASSWORD_1`.

## Variables de entorno del componente {#component-environment-variables}

{{< tabs >}}
{{% tab "Fuentes" %}}

### Amazon Data Firehose {#amazon-data-firehose}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

### Amazon S3 {#amazon-s3}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

### Datadog Agent {#datadog-agent}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

### Fluent {#fluent}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

### Google Pub/Sub {#google-pubsub}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

### Cliente HTTP {#http-client}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

### Servidor HTTP {#http-server}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

### Kafka {#kafka}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

### Logstash {#logstash}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

### OpenTelemetry {#opentelemetry}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

### Socket {#socket}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

### Splunk HEC {#splunk-hec}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

### Splunk TCP {#splunk-tcp}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

### Sumo Logic {#sumo-logic}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

### Syslog {#syslog}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}

{{% tab "Procesadores" %}}

### Agregar variables de entorno {#add-environment-variables}

- Lista permitida
  - La lista permitida es una lista separada por comas de las variables de entorno de las que desea extraer valores y usar con este procesador.
  - Almacenado en la variable de entorno `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.

{{% /tab %}}
{{% tab "Destinos" %}}

### Amazon OpenSearch {#amazon-opensearch}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

### Amazon Security Lake {#amazon-security-lake}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

### CrowdStrike NG-SIEM {#crowdstrike-ng-siem}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

### Databricks (Zerobus) {#databricks-zerobus}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

### Datadog Logs {#datadog-logs}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### Datadog Metrics {#datadog-metrics}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### Datadog Archives {#datadog-archives}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

### Elasticsearch {#elasticsearch}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

### Google Pub/Sub {#google-pubsub-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

### Google SecOps {#google-secops}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

### Cliente HTTP {#http-client-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

### Kafka {#kafka-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

### Microsoft Sentinel {#microsoft-sentinel}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

### New Relic {#new-relic}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

### OpenSearch {#opensearch}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

### SentinelOne {#sentinelone}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

### Socket {#socket-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### Splunk HEC {#splunk-hec-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### Sumo Logic {#sumo-logic-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

### Syslog {#syslog-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}