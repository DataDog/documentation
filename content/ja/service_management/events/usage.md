---
further_reading:
- link: /logs/log_configuration/processors/
  tag: ドキュメント
  text: 処理パイプラインについて
- link: /service_management/events/explorer/
  tag: ドキュメント
  text: イベントエクスプローラーでイベントをトリアージする
kind: ドキュメント
title: Python
---

## カスタムメトリクス

任意のイベント検索クエリから 15 か月間データを保持する[メトリクスを生成][5]して、履歴上のイベントやアラートを作成し監視します。

{{< img src="service_management/events/usage/generate-metrics.png" alt="イベント検索クエリによるメトリクスのイメージ。" >}}

## イベントの処理例

### トリアージ機能

[イベントエクスプローラー][7]を使用して、Datadog に流入するイベントを集計・表示します。イベントを属性でグループ化またはフィルタリングし、イベント分析でグラフィカルに表現します。クエリ検索構文を使用して、ブール演算子やワイルドカード演算子を使用してイベントをフィルタリングします。

### ライブラリ

{{< img src="service_management/events/usage/events-dashboard.mp4" alt="イベントをソースとするグラフウィジェット" video=true >}}

[グラフ ウィジェット][8] では、イベントをデータソースとして使用して、イベント検索クエリの時系列、表、およびトップリストウィジェットを構築できます。例えば、[Monitor Notifications Overview][9] ダッシュボードでは、監視アラートイベントの傾向を分析し、構成の改善やアラート疲労の軽減に役立てることができます。

#### オーバーレイ

{{< img src="service_management/events/usage/event_overlays.png" alt="ダッシュボードの例でイベントオーバーレイを表示するオプション" style="width:100%;" >}}

オーバーレイ機能により、グラフ上に該当するイベントが視覚化されます。ダッシュボードの[イベントオーバーレイ][10]機能を使用して、最近の変更がアプリケーションまたはサービス内でパフォーマンスの問題を引き起こしている場合を特定し、問題の原因を突き止めます。

### ノートブックの更新

重要なイベントクエリに基づいて、モニタアラートと通知を送信します。アラートを構成するには、[イベントモニター][11]のドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/pipelines
[4]: /ja/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /ja/service_management/events/explorer/analytics
[7]: /ja/service_management/events/explorer/
[8]: /ja/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /ja/dashboards/change_overlays/
[11]: /ja/monitors/types/event/