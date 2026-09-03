---
description: Observability Pipelines Worker を使用して Amazon OpenSearch にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon OpenSearch 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Amazon OpenSearch 送信先を使用して、Amazon OpenSearch にログを送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Amazon OpenSearch エンドポイント URL (該当する場合はユーザー名とパスワードも含む) の識別子のみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][6]する際に、Amazon OpenSearch 送信先を設定します。パイプラインは、[UI][1]、[API][7]、または [Terraform][8] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で Amazon OpenSearch 送信先を選択した後:

1. Amazon OpenSearch エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. {{< ui >}}Mode{{< /ui >}} ドロップダウンメニューで、{{< ui >}}Bulk{{< /ui >}} または {{< ui >}}Data streams{{< /ui >}} を選択します。
	- {{< ui >}}Bulk{{< /ui >}}モード
		- Amazon OpenSearch の [Bulk API][4] を使用して、バッチ処理されたイベントを標準インデックスに直接送信します。
		- インデックスの命名とライフサイクル管理を直接制御したい場合は、このモードを選択してください。データは指定したインデックスに追加され、ロールオーバー、削除、マッピングの処理はユーザーの責任となります。
		- {{< ui >}}Bulk{{< /ui >}} モードを設定するには:
			- {{< ui >}}Index{{< /ui >}} フィールドに、必要に応じて Amazon OpenSearch インデックスの名前を入力します。[テンプレート構文][3]を使用して、ログ内の特定のフィールドに基づいて異なるインデックスに動的にログをルーティングできます (例: `logs-{{service}}`.)。
	- {{< ui >}}Data streams{{< /ui >}} モード
		- Uses [Amazon OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want Amazon OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} モードを設定するには、必要に応じて、次の情報を入力することでデータストリーム名を定義します (デフォルトは `logs-generic-default`) by entering the following information:)。
			- In the {{< ui >}}Type{{< /ui >}} フィールドに、取り込まれるデータのカテゴリを入力します (例: `logs`.)。
			- In the {{< ui >}}Dataset{{< /ui >}} フィールドで、構造を記述する形式またはデータソースを指定します (例: `apache`.)。
			- In the {{< ui >}}Namespace{{< /ui >}} フィールドに、データストリームを整理するためのグループ化を入力します (例: `production`.)。
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}、{{< ui >}}Dataset{{< /ui >}}、および {{< ui >}}Namespace{{< /ui >}} フィールドの[テンプレート構文][3]を使用して、ログ内の特定のフィールドに基づいてデータストリーム名を動的に構築します。
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.
1. 必要に応じて、Amazon OpenSearch インデックスの名前を入力します。ログ内の特定のフィールドに基づいて異なるインデックスにログをルーティングする場合は、[テンプレート構文][3]を参照してください。
1. 認証戦略として、{{< ui >}}Basic{{< /ui >}} または {{< ui >}}AWS{{< /ui >}} を選択します。選択内容に応じて、次のいずれかを行います。
	- {{< ui >}}Basic{{< /ui >}}:
		- Amazon OpenSearch ユーザー名の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
		- Amazon OpenSearch パスワードの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
	- {{< ui >}}AWS{{< /ui >}}:
		1. AWS リージョンを入力します。
		1. (オプション) AWS 認証オプションを選択します。{{< ui >}}Assume role{{< /ui >}} オプションは、前に作成したユーザーまたはロールが特定の AWS リソースにアクセスするために別のロールを引き受ける必要があり、その権限を明示的に定義する必要がある場合にのみ使用してください。<br>{{< ui >}}Assume role{{< /ui >}} を選択した場合:
			1. 引き受ける IAM ロールの ARN を入力します。
			1. 必要に応じて、引き受けるロールのセッション名と外部 ID を入力します。

{{% observability_pipelines/secrets_env_var_note %}}

#### オプションのバッファリング{#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Amazon OpenSearch エンドポイント URL 識別子:
	- デフォルトの識別子は `DESTINATION_AMAZON_OPENSEARCH_ENDPOINT_URL` です。
- Amazon OpenSearch 認証ユーザー名識別子:
	- デフォルトの識別子は `DESTINATION_AMAZON_OPENSEARCH_USERNAME` です。
- Amazon OpenSearch 認証パスワード識別子:
	- デフォルトの識別子は `DESTINATION_AMAZON_OPENSEARCH_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## ヘルスメトリクス{#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][9]および[送信先バッファメトリクス][10]については、[Pipelines 使用状況メトリクス][11]のドキュメントを参照してください。Elasticsearch 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:elasticsearch` を使用します。

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/destinations/#template-syntax
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/gsgupload-data.html
[5]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/data-streams.html
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/