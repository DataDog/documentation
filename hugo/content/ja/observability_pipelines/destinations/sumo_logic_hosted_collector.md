---
description: Observability Pipelines Worker を使用して Sumo Logic Hosted Collector にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sumo Logic Hosted Collector Destination
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Sumo Logic Destination を使用して、ログを Sumo Logic Hosted Collector に送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: エンドポイント URL の識別子のみを入力します。実際の値は入力<b>しないでください</b>。</div>

[パイプラインをセットアップ][3] する際に、Sumo Logic 送信先を構成します。パイプラインのセットアップは、[UI][1] で、[API][4] を使用して、または [Terraform][5] で行えます。このセクションの手順は UI で構成されます。

パイプライン UI で Sumo Logic 送信先を選択した後、エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

1. {{< ui >}}Encoding{{< /ui >}} ドロップダウンメニューで、パイプラインの出力を `JSON`、`Logfmt`、または `Raw` テキストでエンコードするかを選択します。デコードが選択されていない場合、デコードはデフォルトで JSON になります。
1. Sumo Logic コレクターのソースに設定されたデフォルトの `name` 値を上書きするには、{{< ui >}}source name{{< /ui >}} を入力します。
1. Sumo Logic コレクターのソースに設定されたデフォルトの `host` 値を上書きするには、{{< ui >}}host name{{< /ui >}} を入力します。
1. Sumo Logic コレクターのソースに設定されたデフォルトの `category` 値を上書きするには、{{< ui >}}category name{{< /ui >}} を入力します。
1. カスタムヘッダーフィールドと値を追加するには、{{< ui >}}Add Header{{< /ui >}} をクリックします。

#### バッファリングオプション {#buffering-options}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Sumo Logic HTTP Collector URL 識別子:
	- Sumo Logic HTTP Source エンドポイントを参照します。Observability Pipelines Worker は、処理されたログをこのエンドポイントに送信します。例: `https://<ENDPOINT>.collection.sumologic.com/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>`:
        - `<ENDPOINT>` は Sumo コレクションのエンドポイントです。
        - `<UNIQUE_HTTP_COLLECTOR_CODE>` は、HTTP ソースのアップロード URL の最後のスラッシュ (`/`) に続く文字列です。
	- デフォルトの識別子は `DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべての宛先から出力される [コンポーネントメトリクス][6] および [宛先バッファメトリクス][7] については、[パイプライン使用状況メトリクス][8] のドキュメントを参照してください。Sumo Logic 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:sumo_logic` を使用します。

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/