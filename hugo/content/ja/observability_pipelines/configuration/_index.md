---
description: パイプラインを構成するソース、プロセッサー、送信先コンポーネントについて、また、それらを構築してデプロイする方法について学びます。
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインのセットアップ
- link: observability_pipelines/configuration/install_the_worker/
  tag: ドキュメント
  text: Worker をインストールする
- link: observability_pipelines/configuration/live_capture/
  tag: ドキュメント
  text: Live Capture の詳細
- link: observability_pipelines/troubleshooting
  tag: ドキュメント
  text: トラブルシューティング
title: 構成
---
## 概要 {#overview}

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="ソースから 2 つのプロセッサーグループと 2 つの送信先に接続されたパイプラインのページです。" style="width:100%;" >}}

Observability Pipelines を使用すると、独自のインフラストラクチャー内でログとメトリクスを収集して処理し、さまざまな送信先にルーティングできます。パイプラインは、次の 3 つの主要コンポーネントで構成されます。

- [ソース][1]: Datadog Agent などのツールからデータを受信します。
- [プロセッサー][2]: データを変換、エンリッチ、またはフィルタリングします。
- [送信先][3]: データの送信先 (Datadog、Amazon S3、Splunk、Google Security Operations、Microsoft Sentinel など)。

次のいずれかの方法を使用して、データを収集、変換、ルーティングするパイプラインを構築してデプロイします。

 - [パイプライン UI][4]
 - [API][5]
 - [Terraform][6]

## パイプラインの種類 {#pipeline-types}

パイプラインには 2 種類あります。

{{< tabs >}}
{{% tab "ログ" %}}

[ログテンプレート][1]のいずれかを使用して、ログパイプラインを作成します。

- アーカイブログ
- デュアルシップログ
- ログベースのメトリクスを生成する
- ログエンリッチメント
- ログボリュームコントロール
- 機密データのリダクション
- ログの分割

ソース、プロセッサー、および送信先の設定に関する詳細については、[パイプラインのセットアップ][2] を参照してください。

[1]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#templates
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/

{{% /tab %}}

{{% tab "メトリクス" %}}

メトリクスパイプラインを作成するには、[メトリクスタグのガバナンス][1] テンプレートを使用します。

ソース、プロセッサー、および送信先の設定に関する詳細については、[パイプラインのセットアップ][2] を参照してください。

### メトリクスデータ {#metrics-data}

Observability Pipelines に送信されるメトリクスには、以下が含まれます。

- `name`: メトリクス名。
- `kind`: メトリクスには 2 種類あります。
  - `absolute` メトリクス: 報告時点での測定値の現在の値を表します。
  - `incremental` メトリクス: 前回の報告値からの測定値の変化を表します。システムは、一定期間におけるこれらの測定値を集計します。
- `value`: [メトリクスタイプ](#metric-types):
	- `counter`
	- `gauge`
	- `distribution`
	- `histogram`
- `timestamp`: メトリクスが作成された日時。
- `tags`: `host` などのタグが含まれます。

受信したメトリクスが `incremental` か `absolute` かは、ソースによって異なります。たとえば、OpenTelemetry からのメトリクスは、その[テンポラリティ][4]に基づいて、インクリメンタル (増分) またはアブソリュート (絶対値) のいずれかになります。次の表は、デルタと累積のテンポラリティで送信された OTel のカウンターメトリクスの例です。

| メトリクスタイプ | インクリメンタル                      | アブソリュート                               |
|-------------|----------------------------------|----------------------------------------|
| カウンター     | デルタとして送信: `+2`、`+4`、`+6` | 累積合計として送信: `2`、`6`、`10` |

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

### メトリクスタイプ {#metric-types}

利用可能なメトリクスタイプ:

| メトリクスタイプ  | 説明                                                                                                                                                       | 例                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNTER | 1 つの時間間隔におけるイベントの発生回数の合計。ゼロにリセットすることはできますが、減らすことはできません。                                                       | ログの数を `status:error` でカウントしたい場合。                                    |
| GAUGE        | 報告された時点での値のスナップショット。                                                                                                                | 各ホストの最新の CPU 使用率を追跡したい場合。                                  |
| HISTOGRAM | Datadog Agent によってある時間間隔でホストごとに計算され、Datadog に送信される統計的集計 (`avg`、`min`、`max`、`count`、`median`、パーセンタイル)。| 各 Web サーバーからホストごとのリクエストレイテンシーの集計を取得したい場合。                         |
| DISTRIBUTION | パーセンタイル集計をサーバー側で計算するために Datadog に送信される生の値。ある時間間隔でメトリクスを報告するすべてのホストでグローバルに計算されます。            | API エンドポイントのグローバルな p95 レイテンシーを、それを提供するすべてのホスト全体で計算したい場合。 |

詳細については、[メトリクスタイプ][3] を参照してください。

[1]: /ja/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: /ja/metrics/types/?tab=gauge#metric-types
[4]: https://opentelemetry.io/docs/specs/otel/metrics/data-model/#temporality

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