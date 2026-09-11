---
further_reading:
- link: monitors/configuration/?tab=thresholdalert
  tag: ドキュメント
  text: Monitor configuration
- link: monitors/configuration/?tab=thresholdalert/#group-retention-time
  tag: ドキュメント
  text: グループ保持時間
- link: monitors/configuration/?tab=thresholdalert/#set-alert-conditions
  tag: ドキュメント
  text: アラート条件を設定
title: Status Graphs
---

<div class="alert alert-info">Status Graphs は <a href="/monitors/status/status_page">暫定 Monitor Status Page</a> の一部です。従来の Status Page を使用している場合は、<a href="/monitors/status/status_legacy">Status Page (レガシー)</a> のドキュメントを参照してください。</div>

## 概要

Monitor Status Page に表示されるグラフは、単一 Monitor の評価内容を可視化します。これらのグラフを利用すると、Monitor が `ALERT` 状態になる理由と、トラブルシューティングを集中すべき箇所を把握できます。

## Monitor metadata

{{< img src="/monitors/status/graphs/status_graph_metadata.png" alt="Status ページの右側にある Monitor メタデータ セクション" style="width:100%;" >}}

Monitor Status Page のグラフ セクション右側のパネルでは、Monitor の概要を確認できます。含まれる項目は次のとおりです。

|  | Description |
| ---- | ---- |
| Groups | ステータスごとのグループ数 (`ALERT`, `WARN`, `NO DATA`, `OK`) |
| Visualize as | Evaluated Data、Source Data、Transitions の各グラフを切り替えるグラフ セレクター |
| Query | 生の Monitor クエリ。Monitor には、データ タイプに応じて Event Explorer や Metric Explorer などの該当ページへの動的リンクが含まれます。 |
| Evaluation | 評価ウィンドウとともに Query に適用される集計方法 |
| Notification count | この Monitor から送信された通知の数 |


## グループまたはステータスでページをフィルター

Query によっては、Monitor に複数のグループが存在する場合があります。特定のグループに絞り込みたい場合は、フィルター ドロップダウンで目的のグループを選択してください。

{{< img src="/monitors/status/view_monitor_evaluations_graphs_1.png" alt="テンプレート変数でフィルターした Monitor Status Page の例" style="width:100%;" >}}

ページの表示対象は次の基準で絞り込めます:

Group status
: 選択したステータスにあるグループのみを表示します。

Muted state
: ミュート中かどうかでグループを絞り込みます。

Group names
: 選択したタグを持つグループのみを表示します。

## Evaluated data グラフ

Evaluated data のビジュアルは Monitor 固有で、個々の評価結果を表示します。たとえば、Monitor が直近 5 分間の平均を評価する場合、各データ ポイントは評価時点における 5 分平均の集計値を表します。

このビジュアルは Monitor の設定に合わせて、評価設定を用いて Monitor の過去および現在のステータスを表示します。グラフにはグループ別のステータスが示されます。

{{< img src="/monitors/status/graphs/status_page_demo.mp4" alt="イベント詳細およびグループへのフィルターを含む Evaluated Data UI 機能のウォークスルー" video=true >}}

ステータス変更 (`WARN` から `ALERT` への変化など) の詳細を確認するには、グラフ上のアラート イベントをクリックし、 **Event Details** セクションを参照してください。

特定のグループのみを表示するには、グループ タイトルにカーソルを合わせ、ツールチップの **Filter to Group** をクリックします。

{{< img src="/monitors/status/graphs/current_status_dot.png" alt="現在のステータスが WARN であることを示す WARN ドット付き OK グラフの Evaluated Data グラフ" style="width:100%;" >}}

過去のステータス変更を調査する際は、グループ タイトル横のカラードットがそのグループの現在のステータスを示します。

### Change Tracking
Change Tracking グラフでは、アラートとほぼ同時に発生したサービスやその依存関係に関連する変更を表示・分析できます。これらのイベントは問題の根本原因であることが多いためです。

{{< img src="/monitors/status/change_tracking_monitor_status_page.png" alt="Monitor Status Page に表示されたデプロイメントの例" style="width:100%;" >}}

Change Tracking はデプロイ、フィーチャー フラグ、データベース変更など複数種類の変更をサポートします。詳細な一覧とセットアップ要件は [Change Tracking][2] ドキュメントを参照してください。

## Source データ グラフ

{{< img src="/monitors/status/source_data_graph_1.png" alt="Source データ グラフを表示する Status Page" style="width:100%;" >}}

Source グラフは、ダッシュボードやノートブックで表示されるものと同様に、Monitor の基盤となるデータ クエリを可視化します。このグラフを使用して、生データの推移を確認し、データの変動や異常がアラートを発生させているかを検証できます。

また、このグラフを使用して生データと期待されるメトリクスの不一致を特定し、Monitor のステータスに影響するデータ収集または送信の問題を示唆できます。

### Source データ グラフの制限事項

暫定 Status Page では、次の Monitor タイプはサポートされていません:

- Anomaly
- Cloud Cost
- Composite
- Database Monitoring
- Forecast
- Live Process
- Outlier
- Synthetics
- SLO Alerts
- Usage

## Transitions

Transitions グラフは、グループごとに Monitor の状態遷移を時間軸上に表示し、どのグループがアラートをトリガーしているかを示します。

### Non reporting

{{< img src="/monitors/status/graphs/non_reporting_transitions_1.png" alt="Non Reporting データを表示する Transitions グラフ" style="width:100%;" >}}

Datadog では、Monitor グループを UI に 24 時間保持します (設定で変更可能) 。詳細は [グループ保持期間][1] を参照してください。グラフの点線は次のことを示します:

* Monitor 作成後に新たに評価されたグループ: 期間開始から初回評価まで点線で表示
* レポートを停止した後に再開したグループ: レポートが途切れた時点から再開時点まで点線で表示

**注**: non-reporting ステータスは「no data」ステータスとは異なります。欠損データ通知を有効にした Host Monitor および Service Check は 48 時間利用可能です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration/?tab=thresholdalert#group-retention-time
[2]: /ja/change_tracking