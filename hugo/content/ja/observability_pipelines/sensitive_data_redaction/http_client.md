---
disable_toc: false
title: HTTP クライアント向け機密データのマスキング
---

## 概要

クレジットカード番号、銀行のルーティング番号、API キーなどの機密データは、意図せずログに含まれる可能性があり、組織を財務面やプライバシー面のリスクにさらすおそれがあります。

Observability Pipelines を使用すると、ログをさまざまな宛先へルーティングする前に機密情報を特定・タグ付けし、必要に応じてマスキングまたはハッシュ化を行うことができます。メールアドレス、クレジットカード番号、API キー、認証トークンなどの一般的なパターンは、あらかじめ用意されたスキャンルールで検出可能です。また、独自の正規表現パターンを使用してカスタムスキャンルールを作成し、機密情報を検出することもできます。

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

このドキュメントでは、以下の手順を説明します。
1. Observability Pipelines の設定に必要な[前提条件](#prerequisites)
1. [Observability Pipelines のセットアップ](#set-up-observability-pipelines)

## 前提条件

{{% observability_pipelines/prerequisites/http_client %}}

## 観測可能性パイプラインを設定する

1. [Observability Pipelines][1] に移動します。
1. **Sensitive Data Redactions** テンプレートを選択し、新しいパイプラインを作成します。
1. ソースとして **HTTP Client** を選択します。

### ソースの設定

{{% observability_pipelines/source_settings/http_client%}}

### 宛先の設定

選択したログの送信先に応じて、以下の情報を入力します。

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

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
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

### プロセッサーの設定

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors_sds %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Enrichment table" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{< /tabs >}}

## 観測可能性パイプラインワーカーのインストール
1. **Choose your installation platform** ドロップダウンメニューで使用するプラットフォームを選択します。
1. HTTP/S エンドポイント URL のフルパスを入力します (例: `https://127.0.0.8/logs`)。Observability Pipelines Worker はこのエンドポイントからログイベントを収集します。

1. 選択した各宛先に必要な環境変数を設定します。詳細は[前提条件](#prerequisites)を参照してください。
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

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
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}
1. 環境に合わせた手順に従い、Worker をインストールしてください。
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

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

[1]: https://app.datadoghq.com/observability-pipelines