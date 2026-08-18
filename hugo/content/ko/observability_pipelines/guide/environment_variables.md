---
aliases:
- /ko/observability_pipelines/environment_variables/
disable_toc: false
title: 환경 변수
---
## 개요 {#overview}

일부 Observability Pipelines 구성 요소는 환경 변수 설정이 필요합니다. 이 문서에는 다양한 소스, 프로세서 및 대상에 대한 환경 변수가 나와 있습니다.

**참고**: 파이프라인을 설정하고 Worker를 설치할 때 보안 식별자를 입력한 후 환경 변수 사용을 선택하면, 환경 변수는 입력한 식별자 앞에 `DD_OP`가 추가된 형태가 됩니다. 예를 들어 암호 식별자로 `PASSWORD_1`를 입력한 경우 해당 암호의 환경 변수는 `DD_OP_PASSWORD_1`입니다.

## 구성 요소 환경 변수 {#component-environment-variables}

{{< tabs >}}
{{% tab "소스" %}}

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

### HTTP 클라이언트 {#http-client}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

### HTTP 서버 {#http-server}
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

{{% tab "프로세서" %}}

### 환경 변수 추가 {#add-environment-variables}

- 허용 목록
  - 허용 목록은 이 프로세서에서 값을 가져와 사용할 환경 변수의 쉼표로 구분된 목록입니다.
  - 환경 변수 `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`에 저장됩니다.

{{% /tab %}}
{{% tab "대상" %}}

### Amazon OpenSearch {#amazon-opensearch}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

### Amazon Security Lake {#amazon-security-lake}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

### CrowdStrike NG-SIEM {#crowdstrike-ng-siem}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

### Databricks(Zerobus) {#databricks-zerobus}
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

### HTTP 클라이언트 {#http-client-1}
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