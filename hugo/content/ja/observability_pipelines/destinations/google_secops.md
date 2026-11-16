---
description: Observability Pipelines Worker を使用して Google SecOps にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google SecOps Destination
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Google SecOps 宛先を使用して、ログを Google SecOps に送信します。

Observability Pipelines Worker は、標準的な Google 認証方法を使用します。ケースに適した認証方法の選択については、[Google の認証方法][3]を参照してください。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Google SecOps エンドポイント URL の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][8]する際に、Google SecOps 宛先を設定します。パイプラインは、[UI][1]、[API][9]、または [Terraform][10] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Google SecOps 宛先を選択した後:

1. Google SecOps エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. Google SecOps インスタンスのカスタマー ID を入力します。
1. 認証情報 JSON ファイルがある場合は、そのファイルへのパスを入力します。認証情報ファイルは `DD_OP_DATA_DIR/config` の下に配置する必要があります。または、`GOOGLE_APPLICATION_CREDENTIALS` 環境変数を使用して認証情報パスを指定することもできます。
    - Google Kubernetes Engine (GKE) で [Workload Identity][6] を使用している場合、`GOOGLE_APPLICATION_CREDENTIALS` が自動的に提供されます。
    - Worker は標準の [Google 認証方法][7]を使用します。
1. ドロップダウンメニューで {{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw{{< /ui >}} エンコーディングを選択します。
1. ログタイプを入力します。ログの特定のフィールドに基づいて異なるログタイプに振り分けたい場合は、[テンプレート構文][4]を参照してください。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションのバッファリング {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

**注**: Google SecOps 宛先に送信されるログには、取り込みラベルが必要です。たとえば、ログが A10 ロードバランサからのものである場合、取り込みラベル `A10_LOAD_BALANCER` が必要です。利用可能なログタイプとその取り込みラベルのリストについては、Google Cloud の [Support log types with a default parser][5] を参照してください。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Google Chronicle エンドポイント URL 識別子:
	- デフォルトの識別子は `DESTINATION_GOOGLE_CHRONICLE_UNSTRUCTURED_ENDPOINT_URL` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべての宛先から出力される [コンポーネントメトリクス][11] および [宛先バッファメトリクス][12] については、[Pipelines Usage Metrics][13] のドキュメントを参照してください。Google SecOps 宛先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:gcp_chronicle_unstructured` を使用します。

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 1                 | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart
[4]: /ja/observability_pipelines/destinations/#template-syntax
[5]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[6]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[7]: https://cloud.google.com/docs/authentication#auth-flowchart
[8]: /ja/observability_pipelines/configuration/set_up_pipelines/
[9]: /ja/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/