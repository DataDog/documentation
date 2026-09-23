---
aliases:
- /ja/observability_pipelines/monitoring/
description: ヘルスグラフやすぐに使えるモニターを使用して、パイプライン、ワーカー、コンポーネントのステータスを追跡する方法を学びます。
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニターを構成する
- link: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
  tag: ドキュメント
  text: Observability Pipelines 使用状況メトリクス
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog に OTel データをルーティングする
title: パイプラインのモニタリング
---
## 概要 {#overview}

パイプラインは、監視可能性データを収集、処理、ルーティングするコンポーネントで構成されています。パイプラインとコンポーネントのステータスは、以下の方法で追跡できます。

- [パイプライン](#view-the-status-of-your-pipelines)、[ワーカー](#view-the-status-of-your-workers)、および[コンポーネント](#view-the-status-of-your-pipeline-components) (ソース、プロセッサ、送信先) のヘルスグラフを表示します。
- 以下の状況に対してアラートを送信する[すぐに使えるモニター](#out-of-the-box-monitors)を有効にします。
    - Observability Pipelines Worker の CPU またはメモリ使用量が高い、あるいはデータをドロップしている場合。
    - コンポーネントがエラーを発している場合。
    - 定義されたクォータに達した場合。
- 利用可能な [Observability Pipelines メトリクス][5] を使用し、独自のダッシュボード、ノートブック、モニターを作成できます。

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipelines_list.png" alt="各パイプラインのステータス、イベント/秒、バイト/秒を表示するパイプライン一覧ページ。" style="width:100%;" >}}

## パイプラインのステータスを表示する {#view-the-status-of-your-pipelines}

1. [Observability Pipelines][1] に移動し、パイプラインが受信および送信しているイベント数やバイト数を確認します。このページに表示される {{< ui >}}events/s{{< /ui >}} および {{< ui >}}bytes/s{{< /ui >}} メトリクスは、15 分間の平均に基づいています。
1. パイプラインを選択します。
1. タブ{{< ui >}}Health{{< /ui >}}をクリックして、パイプラインおよびそのコンポーネントに関する詳細を確認します。以下のグラフを表示できます。
    - 各コンポーネントの使用状況や、受信および送信しているイベントの合計数。
    - 出力先へのリクエスト数と、それらのリクエストで発生したエラー数。
    - 意図的または非意図的に破棄されたイベントの数。
    - 過去 1 週間における各コンポーネントのリクエスト数とエラー数の変化。

ヘルスグラフは、ダッシュボード、ノートブック、またはモニターにエクスポートできます。エクスポートされたグラフには、メトリクスが特定のパイプラインおよびコンポーネントタグでグループ化されていることが示されます。

## ワーカーのステータスを表示する {#view-the-status-of-your-workers}

Observability Pipelines Worker のリソース使用状況や、そこを経由するデータ量を示すグラフを確認するには、以下の手順を実行します。

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. タブ{{< ui >}}Workers{{< /ui >}}をクリックして、ワーカーのメモリと CPU の利用率、トラフィックの統計、およびエラーを確認します。
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/workers_tab.png" alt="各ワーカーのメモリ利用率、CPU 利用率、イベント/秒、バイト/秒、およびエラーを表示するワーカータブ。" style="width:100%;" >}}
1. タブ{{< ui >}}Latest Deployment & Setup{{< /ui >}}をクリックして、ワーカーのデプロイステータスを確認します。
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/worker_deployment_status.png" alt="各ワーカーのデプロイステータスを示す最新のデプロイメントとセットアップタブ。" style="width:100%;" >}}

## パイプラインコンポーネントのステータスを表示する {#view-the-status-of-your-pipeline-components}

ソース、プロセッサ、または出力先のメトリクスを表示するには、以下の手順を実行します。

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. ソース、プロセッサ、または送信先の名前の横にある歯車をクリックし、{{< ui >}}View details{{< /ui >}} を選択します。Datadog は、選択したコンポーネントのヘルスグラフを表示します。
1. [インシデント][2]、[ダッシュボード][3]、または [ノートブック][4] にグラフをエクスポートする場合は、グラフ上のエクスポートアイコンをクリックします。エクスポートされたグラフには、メトリクスが特定のパイプラインおよびコンポーネントタグでグループ化されていることが示されます。

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipeline_health_graphs.png" alt="パイプラインのイベントの入出力、バイトの入出力、エラー、データ破棄、利用率、およびバッファイベントを表示するヘルスグラフ。" style="width:35%;" >}}

## すぐに使えるモニター {#out-of-the-box-monitors}

利用可能なすぐに使えるモニターを確認するには、以下の手順を実行します。

1. [Observability Pipelines][1] に移動します。
1. パイプラインの {{< ui >}}Enable monitors{{< /ui >}} 列にある {{< ui >}}Monitors{{< /ui >}} をクリックします。
1. {{< ui >}}Start{{< /ui >}} をクリックして、提示されたユースケースの 1 つについてモニターをセットアップします。<br>
    新しいメトリクスモニターページは、選択したユースケースに基づいて構成されます。構成を更新して、さらにカスタマイズできます。詳細については、[メトリクスモニタードキュメント][3] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /ja/incident_response/incident_management/
[3]: /ja/monitors/types/metric/
[4]: /ja/notebooks/
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/