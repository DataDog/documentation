---
aliases:
- /ja/infrastructure/process/generate_process_metrics/
- /ja/processes/processing/process_to_metrics/
- /ja/infrastructure/generate_process_metrics/
description: プロセスからメトリクスを生成します。
further_reading:
- link: metrics/distributions/
  tag: Documentation
  text: ディストリビューションメトリクス
- link: monitors/monitor_types/metric/?tab=threshold
  tag: Documentation
  text: メトリクスモニターの作成
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: ブログ
  text: Kubernetes のワークロードをライトサイジングするための実践的なヒント
title: プロセスの保持を増やす
---

## 概要

ライブプロセスのデータは 36 時間保管されますが、プロセスからグローバルかつパーセンタイルのディストリビューションメトリクスを生成し、リソースの消費量を長期的に監視することもできます。プロセスベースのメトリクスはその他の Datadog のメトリクスと同じく 15 か月間保管されるため、以下のような操作を行う場合に役立ちます。

- 過去および現行のインフラストラクチャーの問題をデバッグする
- クリティカルな作業におけるリソース消費の傾向を特定する
- 負荷またはストレステストの前後でシステムの健全性を分析する
- 基底のホストまたはコンテナの健全性に基づき、ソフトウェアデプロイの効果を追跡する

{{< img src="infrastructure/process/process2metrics_overview_2.png" alt="プロセスベースのメトリクスを生成" style="width:80%;">}}

## プロセスベースのメトリクスを生成

[**Live Processes** ページ][2]、または [**Manage Metrics** タブ][1]で、**+ New Metric** をクリックすると、クエリから新しいプロセスベースのメトリクスを直接生成できます。

### 新しいプロセスベースのメトリクスを追加

{{< img src="infrastructure/process/process2metrics_create.png" alt="プロセスベースのメトリクスを作成" style="width:80%;">}}

1. **タグを選択してクエリにフィルターを適用**: クエリ構文は[ライブプロセス][2]と同じです。フィルターのスコープに一致するプロセスのみが集計対象と認識されます。テキスト検索フィルターはライブプロセスページのみでサポートされています。
2. **追跡するメジャーを選択**: `Total CPU %` などのメジャーを入力して数値を集計し、対応する `count`、`min`、`max`、`sum`、`avg` の集計メトリクスを作成します。
3. **`group by` にタグを追加**: 選択したタグをディメンションとしてメトリクスに追加し、フィルターの適用、集計、および比較を行います。デフォルトでは、プロセスから生成されたメトリクスに (明示的に追加しない限り) タグは付与されません。ライブプロセスのクエリに対して利用可能なタグは、すべてこのフィールドで使用することができます。
4. **メトリクスに名前を付与**: メトリクスの名前を入力します。プロセスベースのメトリクスには常にプレフィックス _proc._ とサフィックス _[measure_selection]_ が付与されます。
5. **パーセンタイル集計を追加**: _Include percentile aggregations_ チェックボックスを選択して、p50、p75、p90、p95、p99 パーセンタイルを生成します。パーセンタイルのメトリクスはカスタマーメトリクスとしても扱われ、適宜請求に追加されます。

メトリクス作成モーダルの一番下にある **Create Another** チェックボックスを選択することで、同じクエリを使用して複数のメトリクスを作成できます。このボックスを選択すると、モーダルはメトリクスが作成された後も開いたままの状態となり、フィルターと集計グループが事前に入力されます。

**注**: プロセスベースのメトリクスのデータポイントは 10 秒間隔で生成されます。そのため、メトリクスが作成または更新されてから最初のデータポイントが報告されるまでに最大 3 分の遅延が生じる場合があります。

<div class="alert alert-warning">プロセスベースのメトリクスは<a href="/metrics/custom_metrics/">カスタムメトリクス</a>と見なされ、それに応じて請求されます。請求への影響を避けるために、<code>command</code> や <code>user</code> などの無制限または非常に高いカーディナリティタグによるグループ化は避けてください。</div>

### プロセスベースのメトリクスを更新

{{< img src="infrastructure/process/process2metrics_update.png" alt="ディストリビューションメトリクスを更新" style="width:80%;">}}

メトリクスの作成後、以下のフィールドを更新できます。

- フィルタークエリ: 'Filter by' フィールドからタグを追加または削除し、メトリクスが生成されたマッチングプロセスのセットを変更します。
- 集計グループ: 'Group by' フィールドからタグを追加または削除し、メトリクスを異なる方法で分割、またはそれらのカーディナリティを管理します。
- パーセンタイルの選定: 'Include percentile aggregations' ボックスをチェックまたはチェックを外すことで、パーセンタイルメトリクスを削除または生成します。

メトリクスタイプまたは名前を変更するには、新しいメトリクスを作成する必要があります。

## Datadog プラットフォームにおけるプロセスメトリクスの活用

{{< img src="infrastructure/process/process2metrics_dashboard_widget.png" alt="ダッシュボードでプロセスディストリビューションメトリクスのグラフを表示" style="width:80%;">}}

作成後は、Datadog の他のメトリクスと同様に、プロセスディストリビューション集計およびパーセンタイルメトリクスを使用することができます。例は以下の通りです。

- ダッシュボードとノートブックでプロセスベースのメトリクスをグラフ化し、重要な作業におけるリソース消費の履歴を追跡
- プロセスベースのメトリクスにしきい値または異常値ベースのモニターを作成し、CPU または RSS メモリーの予期せぬ低下や急上昇を検知
- [メトリクス相関][4]を使用して、内部およびサードパーティーソフトウェアのパフォーマンスに対してリソース消費の変化のコンテキストを取得

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/process?view=metrics
[2]: https://app.datadoghq.com/process
[3]: /ja/metrics/custom_metrics/
[4]: /ja/dashboards/correlations/