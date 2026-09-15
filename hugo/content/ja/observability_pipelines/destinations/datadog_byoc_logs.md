---
aliases:
- /ja/observability_pipelines/destinations/cloudprem/
description: Observability Pipelines Worker を使用して、Datadog BYOC (Bring Your Own Cloud)
  Logs にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog BYOC Logs 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の BYOC (Bring Your Own Cloud) Logs 送信先を使用して、Datadog BYOC Logs にログを送信します。


## 前提条件 {#prerequisites}

送信先を設定する前に、BYOC Logs クラスターをデプロイする必要があります。インストール方法については、[BYOC Logs のインストールに関するセクション][3] を参照してください。

## セットアップ {#setup}

[パイプラインをセットアップ][4] する際に、BYOC Logs 送信先を設定します。パイプラインは、[UI][1]、[API][5]、または [Terraform][6] を使用してセットアップできます。このセクションの手順では、UI で設定します。

### オプションのバッファリング {#optional-buffering}

パイプライン UI で BYOC Logs 送信先を選択したら、バッファリングを設定できます。

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="BYOC Logs 送信先の設定" style="width:35%;" >}}

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- BYOC Logs エンドポイント URL の識別子:
	- Observability Pipelines がログを送信するインテークエンドポイントを参照します。
	- シークレットマネージャーで、次のようにします。
		- クラスター URL を定義します (例: `http://byoc-logs.acme.internal:7280`)。**注**: URL にはポート番号を含める必要があります。
		- Worker はエンドポイント URL に `/api/v2/logs` および `/api/v1/validate` を付加するため、転送ルールやファイアウォールルールを使用している場合は、これらのエンドポイントを許可する必要があります。
	- デフォルトの識別子は `DESTINATION_CLOUDPREM_ENDPOINT_URL` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="BYOC Logs 環境変数フィールドが示されているインストールページ" style="width:75%;" >}}

- BYOC Logs エンドポイント URL
	- Observability Pipelines は、BYOC Logs インテークエンドポイントにログを送信します。クラスター URL を定義します (例: `http://byoc-logs.acme.internal:7280`)。**注**: URL にはポート番号を含める必要があります。
	- Worker はエンドポイント URL に `/api/v2/logs` および `/api/v1/validate` を付加するため、転送ルールやファイアウォールルールを使用している場合は、これらのエンドポイントを許可する必要があります。
  - 次の環境変数として保存されます: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`。

{{% /tab %}}
{{< /tabs >}}

## 正常性メトリクス {#health-metrics}

すべての送信先から送信される [コンポーネントメトリクス][7] および [送信先バッファメトリクス][8] については、[Pipelines 使用状況メトリクス][9] のドキュメントを参照してください。Datadog Logs 送信先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:datadog_logs` を使用します。

## 送信先の動作 {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、以下のいずれかのパラメーターが満たされたときに起動されます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/byoc-logs/install/
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/