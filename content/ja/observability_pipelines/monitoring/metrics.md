---
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: ドキュメント
  text: Metrics Summary について詳しく学ぶ
- link: /metrics/explorer/
  tag: ドキュメント
  text: Metrics Explorer を使用してメトリクスを探索および分析する
- link: /getting_started/dashboards/
  tag: ドキュメント
  text: Dashboards の使用を開始する
- link: /getting_started/monitors/
  tag: ドキュメント
  text: Monitors の使用を開始する
title: メトリクス
---

## 概要

本書では、Observability Pipelines で利用可能なメトリクスの一部を一覧表示します。次のことができます:

- これらのメトリクスを使用して、独自の[ダッシュボード][1]、[ノートブック][2]、[モニター][3]を作成する。
- [Metrics Summary][5] を使用して、メトリクスで利用可能なメタデータとタグを確認する。また、どの dashboards、notebooks、monitors、SLO がそれらのメトリクスを使用しているかも確認できる。

特定のパイプライン、Worker、コンポーネントごとにメトリクスをグループ化するタグの使用方法については、[タグの概要][4]を参照してください。

## 推定使用量メトリクス

"Observability Pipelines 受信バイト数
: **メトリクス**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **説明**: Observability Pipelines に取り込まれたデータ量。詳細は[推定使用量メトリクス][6]を参照してください。"

## パイプライン メトリクス

1 秒あたりの受信バイト数
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **説明**: パイプラインが 1 秒あたりに受信するイベント数。

1 秒あたりの送信バイト数
: **Metrics**: `pipelines.host.network_receive_bytes_total`
: **説明**: パイプラインが 1 秒あたりに受信するバイト数。

## コンポーネントメトリクス

これらのメトリクスは Sources、processors、destinations で利用できます。

1 秒あたりの受信バイト数
: **メトリクス**: `pipelines.component_received_bytes_total`
: **説明**: コンポーネントが 1 秒あたりに受信するバイト数。
: **対象**: Sources、processors、destinations

1 秒あたりの送信バイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントが宛先へ送信するバイト数。
: **対象**: Sources、processors、destinations

1 秒あたりの受信イベント数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが 1 秒あたりに受信するイベント数。
: **対象**: Sources、processors、destinations

1 秒あたりの送信イベント数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントが宛先へ送信するイベント数。
: **対象**: Sources、processors、destinations

エラー
: **メトリクス**: `pipelines.component_errors_total`
: **説明**: コンポーネントで発生したエラーの数。
: **対象**: Sources、processors、destinations

意図的または非意図的にドロップされたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: ドロップされたイベントの数。**注**: このメトリクスを詳細化するには、`intentional:true` タグで意図的にドロップされたイベントを、`intentional:false` タグで意図的ではないイベントをフィルタリングします。
: **対象**: Sources、processors、destinations

利用率
: **メトリクス**: `pipelines.utilization`
: **説明**: コンポーネントのアクティビティ。`0` は入力待ちでアイドル状態、`1` は常にアイドルにならない状態を示します。この場合、トポロジー内でボトルネックとなりバックプレッシャーを生み、イベントがドロップされる可能性があります。
: **対象**: Processors、destinations

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/dashboards/
[2]: /ja/notebooks/
[3]: /ja/getting_started/monitors/
[4]: /ja/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/ja/account_management/billing/usage_metrics/