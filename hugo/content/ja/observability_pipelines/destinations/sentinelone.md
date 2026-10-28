---
description: Observability Pipelines Worker を使用して SentinelOne にログを送信する方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-sentinelone/
  tag: ブログ
  text: EDR ログを最適化し、Observability Pipelines を使用して SentinelOne にルーティングする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: SentinelOne の宛先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の SentinelOne の宛先を使用して、SentinelOne にログを送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: トークンの識別子のみを入力します。実際の値は入力<b>しない</b>でください。</div>

[パイプラインをセットアップ][4] する際に、SentinelOne の宛先を設定します。パイプラインは、[UI][1]、[API][5]、または [Terraform][6] を使用してセットアップできます。このセクションの手順は、UI で設定します。

パイプライン UI で SentinelOne の宛先を選択した後:

1. トークンの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ドロップダウンメニューで SentinelOne のログ環境を選択します。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションのバッファリング {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- SentinelOne 書き込みアクセストークンの識別子:
	- デフォルトの識別子は `DESTINATION_SENTINEL_ONE_TOKEN` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

## SentinelOne クラスターでログを表示する {#view-logs-in-a-sentinelone-cluster}

SentinelOne 宛先にログを送信するようにパイプラインをセットアップした後、SentinelOne クラスターでログを表示することができます。

1. [S1 コンソール][2] にログインします。
2. Singularity Data Lake (SDL) {{< ui >}}Search{{< /ui >}} ページに移動します。コンソールからアクセスするには、左側のメニューの {{< ui >}}Visibility{{< /ui >}} をクリックして SDL に移動し、{{< ui >}}Search{{< /ui >}} タブが表示されていることを確認します。
3. 検索バーの横にあるフィルターが {{< ui >}}All Data{{< /ui >}} に設定されていることを確認します。
4. このページには、Observability Pipelines から SentinelOne に送信したログが表示されます。

## 健全性メトリクス {#health-metrics}

すべての宛先から出力される [コンポーネントメトリクス][7] および [宛先バッファメトリクス][8] については、[パイプライン使用状況メトリクス][9] のドキュメントを参照してください。Splunk HEC 宛先メトリクスでフィルタリングまたはグループ化するには、タグ `component_type:splunk_hec_logs` を使用します。

## 宛先の仕組み {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[宛先のイベントのバッチ処理][3] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| なし           | 1                 | 1                   |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /ja/observability_pipelines/destinations/#event-batching
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/