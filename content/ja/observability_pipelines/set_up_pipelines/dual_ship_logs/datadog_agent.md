---
title: Datadog Agent の Dual Ship ログ
disable_toc: false
aliases:
    - /observability_pipelines/dual_ship_logs/datadog_agent/
---

## 概要

Datadog Agent を構成し、Observability Pipelines をセットアップして、Observability Pipelines Worker が上流のソースからのログを集約して処理し、それをさまざまなアプリケーションにルーティングするようにします。

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

このドキュメントでは、以下について説明します。
1. Observability Pipelines のセットアップに必要な[前提条件](#prerequisites)
1. [Observability Pipelines のセットアップ](#set-up-observability-pipelines)
1. [Observability Pipelines Worker への Datadog Agent の接続](#connect-the-datadog-agent-to-the-observability-pipelines-worker)

## 前提条件

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Observability Pipelines のセットアップ

1. [Observability Pipelines][1] に移動します。
1. **Dual Ship** テンプレートを選択して、新しいパイプラインを作成します。
1. **Datadog Agent** をソースとして選択します。

### ソースのセットアップ

{{% observability_pipelines/source_settings/datadog_agent %}}

### 宛先のセットアップ

選択したログの宛先に基づいて、次の情報を入力します。

{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
<!-- {{% tab "Amazon Security Lake" %}}

##### 前提条件

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

##### 宛先のセットアップ

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}} -->
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Datadog アーカイブ" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

{{% observability_pipelines/destination_settings/datadog_archives_prerequisites %}}

宛先を設定するには、使用しているクラウドプロバイダーの指示に従ってログをアーカイブします。

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_settings/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_settings/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_settings/sentinelone %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_settings/syslog %}}

{{% /tab %}}
{{< /tabs >}}

#### 宛先の追加

{{% observability_pipelines/multiple_destinations %}}

### プロセッサーのセットアップ

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Add env vars" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Enrichment table" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Generate metrics" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Parse XML" %}}

{{% observability_pipelines/processors/parse_xml %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Remap to OCSF" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% collapse-content title="ライブラリからルールを追加" level="h5" %}}

{{% observability_pipelines/processors/sds_library_rules %}}

{{% /collapse-content %}}
{{% collapse-content title="カスタムルールの追加" level="h5" %}}

{{% observability_pipelines/processors/sds_custom_rules %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Split array" %}}

{{% observability_pipelines/processors/split_array %}}

{{% /tab %}}
{{< /tabs >}}

#### プロセッサーと宛先をさらに追加

{{% observability_pipelines/multiple_processors %}}

### Observability Pipelines Worker のインストール
1. [**Choose your installation platform**] のドロップダウンメニューでプラットフォームを選択します。
1. リスナーアドレスを入力します。これは、Observability Pipelines Worker が Datadog Agent からのログを受信するためにリッスンするアドレスとポートです。たとえば `0.0.0.0:<port_number>` です。
1. 選択した各宛先の環境変数を指定します。
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
<!-- {{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}} --&gt;
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog アーカイブ" %}}

Datadog アーカイブの宛先については、使用しているクラウドプロバイダーのログアーカイブに関する指示に従ってください。

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}
1. ご使用の環境に該当する指示に従って Worker をインストールします。
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent を Observability Pipelines Worker に接続する

Agent コンフィギュレーションファイルまたは Agent Helm チャートの values ファイルを使用して、Datadog Agent を Observability Pipelines Worker に接続します。

{{< tabs >}}
{{% tab "Agent コンフィギュレーションファイル" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Agent Helm の values ファイル" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
