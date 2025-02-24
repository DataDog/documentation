---
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニターの構成
- link: /observability_pipelines/monitoring/metrics/
  tag: ドキュメント
  text: Observability Pipelines メトリクス
title: モニタリング
---

## 概要

パイプラインは、可観測性データを収集、処理、そしてルーティングするコンポーネントで構成されています。パイプラインや各コンポーネントのステータスは、次の方法で確認できます。

- [パイプライン](#view-the-status-of-your-pipelines)、[ワーカー](#view-the-status-of-your-workers)、および[コンポーネント](#view-the-status-of-your-pipeline-components) (ソース、プロセッサ、出力先) のヘルスグラフを表示します。
- 以下の状況に対してアラートを発する[すぐに使えるモニター](#out-of-the-box-monitors)を有効にします。
    - Observability Pipelines Worker の CPU またはメモリ使用量が高い、あるいはデータをドロップしている場合
    - コンポーネントがエラーを発している場合
    - 定義されたクォータに達した場合
- 利用可能な [Observability Pipelines メトリクス][5]を使用し、独自のダッシュボード、ノートブック、モニターを作成できます。

## パイプラインのステータスを表示する

1. [Observability Pipelines][1] に移動し、パイプラインが受信および送信しているバイト数を確認します。
1. パイプラインを選択します。
1. **Health** タブをクリックして、パイプラインおよびそのコンポーネントに関する詳細を確認します。以下のグラフが表示されます。
    - 各コンポーネントの使用状況や、受信・送信しているイベントの合計数
    - 出力先へのリクエスト数と、それらのリクエストで発生したエラー数
    - 意図的または非意図的に破棄されたイベントの数
    - 過去 1 週間における各コンポーネントのリクエスト数とエラー数の変化

ヘルスグラフはダッシュボード、ノートブック、またはモニターへエクスポートできます。エクスポートされたグラフには、メトリクスが特定のパイプラインおよびコンポーネントタグでグループ化されていることが示されます。

## ワーカーのステータスを表示する

Observability Pipelines Worker のリソース使用状況や、そこを経由するデータ量を示すグラフを確認するには

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. **Workers** タブをクリックすると、ワーカーのメモリ使用率、CPU 使用率、トラフィック統計、エラー状況を確認できます。

## パイプラインコンポーネントのステータスを表示する

ソース、プロセッサ、または出力先のメトリクスを表示するには

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. ソース、プロセッサ、または出力先名の横にある歯車アイコンをクリックし、**View details** を選択します。Datadog は、選択したコンポーネントのヘルスグラフを表示します。
1. グラフを[インシデント][2]、[ダッシュボード][3]、または[ノートブック][4]にエクスポートしたい場合は、グラフ上のエクスポートアイコンをクリックします。エクスポートされたグラフには、メトリクスが特定のパイプラインおよびコンポーネントタグでグループ化されていることが示されます。

## すぐに使えるモニター

利用可能なすぐに使えるモニターを確認するには

1. [Observability Pipelines][1] に移動します。
1. パイプラインの **Monitors** 列で **Enable monitors** をクリックします。
1. **Start** をクリックして、提示されたユースケースの 1 つについてモニターをセットアップします。<br>
   新しいメトリクスモニターのページは、選択したユースケースに基づいて構成されます。必要に応じて構成を更新し、さらにカスタマイズできます。詳細については、[メトリクスモニターのドキュメント][3]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /ja/service_management/incident_management/
[3]: /ja/getting_started/dashboards/
[4]: /ja/notebooks/
[5]: /ja/observability_pipelines/monitoring/metrics/