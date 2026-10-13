---
description: Observability Pipelines Worker を使用して OpenSearch にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: OpenSearch の送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の OpenSearch 送信先を使用して、ログを OpenSearch に送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: OpenSearch エンドポイント URL の識別子、ユーザー名、パスワードのみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][6]する際に、OpenSearch 送信先を構成します。パイプラインは、[UI][1]、[API][7]、または [Terraform][8] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で OpenSearch 送信先を選択したら、次のようにします。

1. OpenSearch エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ご使用の OpenSearch ユーザー名の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ご使用の OpenSearch パスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. [{{< ui >}}Mode{{< /ui >}}] (モード) ドロップダウンメニューで、[{{< ui >}}Bulk{{< /ui >}}] (一括) または [{{< ui >}}Data streams{{< /ui >}}] (データストリーム) を選択します。
	- {{< ui >}}Bulk{{< /ui >}}モード
		- OpenSearch の [Bulk API][4] を使用して、バッチ処理されたイベントを標準インデックスに直接送信します。
		- インデックスの命名やライフサイクル管理を直接制御する場合に、このモードを選択します。データは指定したインデックスに追加されます。ロールオーバー、削除、マッピングの処理はユーザーが行う必要があります。
		- [{{< ui >}}Bulk{{< /ui >}}] モードを構成するには、次のようにします。
			- [{{< ui >}}Index{{< /ui >}}] (インデックス) フィールドに、必要に応じて OpenSearch インデックスの名前を入力します。[テンプレート構文][3]を使用すると、ログ内の特定のフィールドに基づいて異なるインデックスに動的にログをルーティングできます (例: `logs-{{service}}`.)。
	- {{< ui >}}Data streams{{< /ui >}} モード
		- Uses  [OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} モードを構成するには、必要に応じて、データストリーム名を定義します (デフォルトは `logs-generic-default`) by entering the following information:。
			- In the {{< ui >}}Type{{< /ui >}} フィールドに、取り込むデータのカテゴリを入力します。例: `logs`.
			- In the {{< ui >}}Dataset{{< /ui >}} フィールドに、構造を記述する形式またはデータソースを指定します。例: `apache`.
			- In the {{< ui >}}Namespace{{< /ui >}} フィールドに、データストリームを分類するためのグループを入力します。例: `production`.
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}] (タイプ)、[{{< ui >}}Dataset{{< /ui >}}] (データセット)、および [{{< ui >}}Namespace{{< /ui >}}] (名前空間) フィールドを使用して、ログ内の特定のフィールドに基づいてデータストリーム名を動的に作成します。
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### OpenSearch インデックス {#opensearch-index}

OpenSearch インデックス名を入力します。ログの特定のフィールドに基づいて異なるインデックスにログを振り分ける場合は、[テンプレート構文][3]を参照してください。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- OpenSearch エンドポイント URL の識別子:
	- デフォルトの識別子は `DESTINATION_OPENSEARCH_ENDPOINT_URL` です。
- OpenSearch 認証ユーザー名の識別子:
	- デフォルトの識別子は `DESTINATION_OPENSEARCH_USERNAME` です。
- OpenSearch 認証パスワードの識別子:
	- デフォルトの識別子は `DESTINATION_OPENSEARCH_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## 健全性メトリクス {#health-metrics}

すべての送信先から送信される[コンポーネントメトリクス][9]および[送信先バッファメトリクス][10]については、[パイプライン使用状況メトリクス][11]のドキュメントを参照してください。Elasticsearch 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:elasticsearch` を使用します。

## 送信先の動作{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/destinations/#template-syntax
[4]: https://docs.opensearch.org/latest/api-reference/document-apis/bulk/
[5]: https://docs.opensearch.org/latest/im-plugin/data-streams/
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/