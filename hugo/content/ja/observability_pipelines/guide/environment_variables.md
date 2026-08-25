---
aliases:
- /ja/observability_pipelines/environment_variables/
disable_toc: false
title: 環境変数
---
## 概要 {#overview}

一部の Observability Pipelines コンポーネントは、環境変数を設定する必要があります。このドキュメントでは、各ソース、プロセッサー、および送信先の環境変数をリストで示しています。

**注**: パイプラインを設定し、ワーカーをインストールする際に、シークレット識別子を入力してから環境変数を使用することを選択した場合、環境変数は入力された識別子となり、`DD_OP` が前に付加されます。例えば、パスワード識別子に `PASSWORD_1` を入力した場合、そのパスワードの環境変数は `DD_OP_PASSWORD_1` となります。

## コンポーネント環境変数 {#component-environment-variables}

{{< tabs >}}
{{% tab "ソース" %}}

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

### HTTP クライアント {#http-client}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

### HTTP サーバー {#http-server}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

### Kafka {#kafka}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

### Logstash {#logstash}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

### OpenTelemetry {#opentelemetry}
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

### ソケット {#socket}

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

{{% tab "プロセッサー" %}}

### 環境変数の追加 {#add-environment-variables}

- 許可リスト
  - 許可リストは、値を取得してこのプロセッサーで使用する環境変数のカンマ区切りリストです。
  - 環境変数 `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST` に保存されています。

{{% /tab %}}
{{% tab "送信先" %}}

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

### HTTP クライアント {#http-client-1}
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

### ソケット {#socket-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### Splunk HEC {#splunk-hec-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### Sumo Logic {#sumo-logic-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

### Syslog {#syslog-1}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}