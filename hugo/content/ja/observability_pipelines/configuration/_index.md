---
description: パイプラインを構成するソース、プロセッサ、および送信先の各コンポーネントと、それらの構築およびデプロイ方法について学びます。
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインのセットアップ
- link: observability_pipelines/configuration/install_the_worker/
  tag: ドキュメント
  text: Worker のインストール
- link: observability_pipelines/configuration/live_capture/
  tag: ドキュメント
  text: Live Capture について
- link: observability_pipelines/troubleshooting
  tag: ドキュメント
  text: トラブルシューティング
title: 構成
---
## 概要 {#overview}

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="ソースが 2 つのプロセッサグループと 2 つの送信先に接続されているパイプラインページ" style="width:100%;" >}}

Observability Pipelines を使用すると、独自のインフラストラクチャー内で {{< tooltip text="logs, metrics, and traces" tooltip="ユースケースや価格については、アカウントマネージャーにお問い合わせください。" >}} を収集および処理し、それらをさまざまな送信先にルーティングできます。パイプラインは、3 つの主要なコンポーネントで構成されます。

- [ソース][1]: Datadog Agent のようなツールからデータを受信します。
- [プロセッサ][2]: データを変換、エンリッチ、フィルタリングします。
- [送信先][3]: データの送信先です (例: Datadog、Amazon S3、Splunk、Google Security Operations、Microsoft Sentinel)。

次のいずれかの方法を使用して、データを収集、変換、ルーティングするためのパイプラインを構築およびデプロイします。

 - [パイプライン UI][4]
 - [API][5]
 - [Terraform][6]

## パイプラインの種類 {#pipeline-types}

パイプラインには 2 つの種類があります。

{{< tabs >}}
{{% tab "ログ" %}}

ログパイプラインは、いずれかの[ログテンプレート][1]を使用して作成します。

- ログのアーカイブ
- ログのデュアル送信
- ログベースのメトリクスの生成
- ログのエンリッチメント
- ログボリュームの制御
- 機密データのマスキング
- ログの分割

ソース、プロセッサ、および送信先のセットアップの詳細については、[パイプラインのセットアップ][2]を参照してください。

[1]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "メトリクス" %}}

メトリクスパイプラインは、[メトリクスタグのガバナンス][1]テンプレートを使用して作成します。

ソース、プロセッサ、および送信先のセットアップの詳細については、[パイプラインのセットアップ][2]を参照してください。

### メトリクスデータ {#metrics-data}

Observability Pipelines に送信されるメトリクスには、次のものが含まれます。

- `name`: メトリクス名。
- `kind`: メトリクスは 2 種類あります。
  - `absolute` メトリクス: 報告された時点での測定値を表します。
  - `incremental` メトリクス: 前回の報告値からの測定値の変化を表します。システムで経時的に集計されます。
- `value`: [メトリクスのタイプ](#metric-types):
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp`: メトリクスの作成日時。
- `tags`: `host` などのタグが含まれます。

受信したメトリクスが `incremental` か `absolute` かは、ソースによって異なります。たとえば、OpenTelemetry からのメトリクスは、その[時間性][4]に基づいて、incremental または absolute のいずれかになります。次の表は、デルタ時間性と累積時間性で送信された OTel カウンターメトリクスの例です。

| メトリクスのタイプ | Incremental                      | Absolute                               |
|-------------|----------------------------------|----------------------------------------|
| Counter     | デルタとして送信: `+2`、`+4`、`+6` |  累積合計として送信: `2`、`6`、`10` |

メトリクスの例:

```
{
  "name":"datadog.agent.retry_queue_duration.bytes_per_sec",
  "tags":{
    "agent":"core",
    "domain":"https://7-72-3-app.agent.datadoghq.com",
    "host":"COMP-YGVQDJG75L",
    "source_type_name":"System",
    "env:prod"
  },
  "timestamp":"2025-11-28T13:03:09Z",
  "kind":"absolute",
  "gauge":{"value":454.1372767857143}
}
```

### メトリクスのタイプ {#metric-types}

利用可能なメトリクスのタイプ:

| メトリクスのタイプ  | 説明                                                                                                                                                       | 例                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER      | 一定の時間間隔におけるイベント発生の総数。ゼロにリセットすることはできますが、値を減らすことはできません。                                                       | `status:error` のログの数をカウントする。                                    |
| GAUGE        | 報告時点での値のスナップショット。                                                                                                                | 各ホストの最新の CPU 使用率を追跡する。                                  |
| HISTOGRAM    | Datadog Agent によって一定の時間間隔でホストごとに計算され、Datadog に送信される統計的集計 (`avg`、`min`、`max`、`count`、`median`、パーセンタイル)。| 各 Web サーバーからのホストごとのリクエストレイテンシーの集計を求める。                         |
| DISTRIBUTION | パーセンタイル集計をサーバー側で計算するために Datadog に送信される生の値。一定の時間間隔でメトリクスを報告するすべてのホストでグローバルに計算されます。            | API エンドポイントのグローバルな p95 レイテンシーを、それをホストしているすべてのホストで計算する。 |

詳細については、[メトリクスのタイプ][3]を参照してください。

[1]: /ja/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: /ja/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

{{% /tab %}}

{{% tab "トレース" %}}

[トレースサンプリング][1]テンプレートを使用して、 {{< tooltip text="traces" tooltip="アクセスをリクエストするには、アカウントマネージャーにお問い合わせください。" >}} を取り込んで処理し、さまざまな送信先に送信できます。

ソース、プロセッサ、および送信先のセットアップの詳細については、[パイプラインのセットアップ][2]を参照してください。

[1]: /ja/observability_pipelines/configuration/explore_templates/?tab=traces#trace-sampling
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/sources/
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ja/api/latest/observability-pipelines/#create-a-new-pipeline
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs