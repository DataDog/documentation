---
aliases:
- /ja/observability_pipelines/update_existing_pipelines/
disable_toc: false
title: 既存のパイプラインを更新する
---
## 概要{#overview}

Observability Pipelines の既存のパイプラインでは、Observability Pipelines UI から、ソース設定、送信先設定、およびプロセッサーの変更を更新してデプロイできます。ただし、環境変数を使用しており、ソースおよび送信先の環境変数を更新する場合は、新しい値を使用して Worker を手動で更新する必要があります。

このドキュメントでは、UI でパイプラインを更新する方法について説明します。既存のパイプラインは、[パイプラインの更新][2] API または Terraform リソースの [datadog_observability_pipeline][3] を使用して更新することもできます。

UI で更新したパイプラインをプログラムでデプロイする場合は、[パイプライン構成を JSON または Terraform にエクスポートする][4]を参照してください。

## 既存のパイプラインを更新する {#update-an-existing-pipeline}

1. [Observability Pipelines][1] に移動します。
1. 更新するパイプラインを選択します。
1. 右上の [{{< ui >}}Edit Pipeline{{< /ui >}}] をクリックします。
1. パイプラインに変更を加えます。
	- タイルに表示されているソースまたは送信先の設定を更新する場合、あるいはプロセッサーを更新または追加する場合は、変更を行ってから [{{< ui >}}Deploy Changes{{< /ui >}}] をクリックします。
	- ソースまたは送信先の環境変数を更新するには、{{< ui >}}Go to Worker Installation Steps{{< /ui >}} をクリックし、[ソースまたは送信先の環境変数を更新する](#update-source-or-destination-environment-variables)の手順を参照してください。
1. ソース、送信先、または対応するシークレットを追加、更新、または削除する場合は、変更を反映させるために、`sudo systemctl restart observability-pipelines-worker` などのコマンドを使用して Worker を再起動する必要があります。

### ソースまたは送信先の環境変数を更新する {#update-source-or-destination-environment-variables}

Worker のインストールページで、次の操作を実行します。
1. {{< ui >}}Choose your installation platform{{< /ui >}}ドロップダウンメニューからプラットフォームを選択します。
1. ソース環境変数を更新する場合は、データソースの情報を更新してください。
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
{{% tab "HTTP Client" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{% tab "HTTP Server" %}}

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
1. 送信先の環境変数を更新する場合は、データ送信先の情報を更新してください。
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
{{% tab "HTTP Client" %}}

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

**メトリクス**

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

**トレース**

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

1. ご使用の環境の手順に従って、Worker を更新します。
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
[2]: /ja/api/latest/observability-pipelines/#update-a-pipeline
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /ja/observability_pipelines/configuration/export_pipeline_configuration/