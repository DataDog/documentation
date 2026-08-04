---
aliases:
- /ja/observability_pipelines/sensitive_data_redaction/splunk_hec/
disable_toc: false
title: Splunk HTTP Event Collector (HEC) 向け Sensitive Data Redaction
---

## 概要

クレジットカード番号、銀行のルーティング番号、API キーなどの機密データは、意図せずログに含まれる可能性があり、組織を財務面やプライバシー面のリスクにさらすおそれがあります。

Observability Pipelines では、ログを複数の宛先へ転送したりインフラ外へ送ったりする前に、機密情報を検出してタグ付けし、必要に応じてマスキングやハッシュ化を行えます。すぐに使えるスキャン ルールで、メール アドレス、クレジット カード番号、API キー、認可トークンなどの一般的なパターンを検出できます。さらに、正規表現 (regex) を使ったカスタム スキャン ルールを作成し、機密情報に一致させることも可能です。

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

このドキュメントでは、次の手順を説明します。
1. Observability Pipelines の設定に必要な[前提条件](#prerequisites)
1. [Observability Pipelines のセットアップ](#set-up-observability-pipelines)
1. [Splunk HEC 経由で Observability Pipelines Worker にログを送信する](#send-logs-to-the-observability-pipelines-worker-over-splunk-hec)

## 前提条件

{{% observability_pipelines/prerequisites/splunk_hec %}}

## 観測可能性パイプラインを設定する

1. [Observability Pipelines][1] に移動します。
1. 新しいパイプラインを作成するには、 **Sensitive Data Redaction** テンプレートを選択します。
1. ソースとして **Splunk HEC** を選択します。

### ソースの設定

{{% observability_pipelines/source_settings/splunk_hec %}}

### 宛先の設定

選択したログの送信先に応じて、以下の情報を入力します。

{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

##### 前提条件

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

##### 宛先の設定

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}} 
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

{{% observability_pipelines/destination_settings/datadog_archives_prerequisites %}}

宛先を設定するには、ログのアーカイブに使用しているクラウド プロバイダーの手順に従ってください。

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
{{% tab "Socket" %}}

{{% observability_pipelines/destination_settings/socket %}}

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

#### 送信先を追加する

{{% observability_pipelines/multiple_destinations %}}

### プロセッサーの設定

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors_sds %}}

{{< tabs >}}
{{% tab "環境変数を追加" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "ホスト名を追加" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "カスタム プロセッサー" %}}

{{% observability_pipelines/processors/custom_processor %}}

{{% /tab %}}
{{% tab "重複排除" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "フィールドを編集" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "エンリッチメント テーブル" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "フィルター" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "メトリクスを生成" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Grok パーサー" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "JSON をパース" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "XML をパース" %}}

{{% observability_pipelines/processors/parse_xml %}}

{{% /tab %}}
{{% tab "クォータ" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "削減" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "OCSF へ再マッピング" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% collapse-content title="ライブラリ マッピング" level="h5" expanded=false id="library_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_library_mapping %}}

{{% /collapse-content %}}

{{% collapse-content title="カスタム マッピング" level="h5" expanded=false id="custom_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_custom_mapping %}}

{{% /collapse-content %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% /tab %}}
{{% tab "サンプリング" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% collapse-content title="ライブラリからルールを追加" level="h5" %}}

{{% observability_pipelines/processors/sds_library_rules %}}

{{% /collapse-content %}}
{{% collapse-content title="カスタム ルールを追加" level="h5" %}}

{{% observability_pipelines/processors/sds_custom_rules %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "配列を分割" %}}

{{% observability_pipelines/processors/split_array %}}

{{% /tab %}}
{{% tab "タグ プロセッサー" %}}

{{% observability_pipelines/processors/tags_processor %}}

{{% /tab %}}
{{% tab "スロットリング" %}}

{{% observability_pipelines/processors/throttle %}}

{{% /tab %}}
{{< /tabs >}}

#### 別のプロセッサーと送信先のセットを追加する

{{% observability_pipelines/multiple_processors %}}

### 観測可能性パイプラインワーカーのインストール
1. **Choose your installation platform** ドロップダウンメニューで使用するプラットフォームを選択します。
1. Splunk HEC アドレスを入力します。これはアプリケーションがログ データを送信する先のアドレスとポートです。Observability Pipelines Worker はこのアドレスで受信ログを待ち受けます。
1. 選択した各送信先の環境変数を指定します。詳しくは、[前提条件](#prerequisites) を参照してください。
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

Datadog Archives の送信先については、ログをアーカイブする際に使用しているクラウド プロバイダーに応じて、手順に従ってください。

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
{{% tab "Socket" %}}

{{% observability_pipelines/destination_env_vars/socket %}}

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

1. 環境に合わせた手順に従い、Worker をインストールしてください。
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

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

[1]: https://app.datadoghq.com/observability-pipelines