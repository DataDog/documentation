---
description: Observability Pipelines Worker を使用して Google Cloud Pub/Sub からログをプルする方法を学習します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Pub/Sub ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Google Pub/Sub ソースを使用して、Google Cloud Pub/Sub メッセージングシステムからログをプルします。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/google_pubsub %}}

## セットアップ {#setup}

[パイプラインをセットアップ][1] する際に、このソースをセットアップします。パイプラインは、[UI][5]、[API][6]、または [Terraform][7] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Google Pub/Sub ソースを選択した後:

1. ソースプロジェクトの名前を入力してください。
1. 認証情報の JSON ファイルがある場合は、その認証情報 JSON ファイルへのパスを入力します。認証情報ファイルは、`DD_OP_DATA_DIR/config` の下に配置する必要があります。または、`GOOGLE_APPLICATION_CREDENTIALS` 環境変数を使用して認証情報パスを指定することもできます。
    - GKE (Google Kubernetes Engine) で [ワークロードアイデンティティ][2] を使用している場合、`GOOGLE_APPLICATION_CREDENTIALS` は自動的に提供されます。
    - Observability Pipelines Worker では、標準の [Google 認証方法][4] を使用します。
1. サブスクリプション名を入力してください。
1. 使用するデコーダーを選択してください (Bytes、GELF、JSON、syslog)。

### オプションの TLS 設定 {#optional-tls-settings}

<div class="alert alert-danger">シークレット管理の場合: TLS キーパスの識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

このソースにはデフォルトのシークレット識別子はありません。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべてのソースから送信される [コンポーネントメトリクス][8] および [ソースバッファメトリクス][9] については、[Pipelines Usage Metrics][10] のドキュメントを参照してください。Google Pub/Sub ソースメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:gcp_pubsub` を使用してください。

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /ja/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/