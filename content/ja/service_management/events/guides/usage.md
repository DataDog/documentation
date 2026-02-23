---
aliases:
- /ja/service_management/events/usage
further_reading:
- link: /logs/log_configuration/processors/
  tag: ドキュメント
  text: 処理パイプラインについて
- link: /service_management/events/explorer/
  tag: ドキュメント
  text: イベントエクスプローラーでイベントをトリアージする
title: イベントの利用
---

## カスタムメトリクス

[Generate metrics][5] を使うと、任意のイベント検索クエリから保持期間 15 か月のメトリクスを生成し、過去のイベントやアラートを作成して監視できます。過去 20 分以内のタイム スタンプで取り込まれたイベントが、集計の対象になります。詳しくは [Event Analytics][6] を参照してください。

{{< img src="service_management/events/guides/usage/generate-metrics.png" alt="イベント検索クエリによるメトリクスのイメージ。" >}}

## イベントの活用例

### トリアージ機能

[Events Explorer][7] を使って Datadog に取り込まれるイベントを集計し、閲覧できます。属性でイベントをグループ化またはフィルタリングし、Event Analytics でグラフ化して可視化します。クエリの検索構文では、Boolean 演算子やワイルド カード演算子を使ってイベントを絞り込めます。

### ダッシュボード

{{< img src="service_management/events/guides/usage/events-dashboard.mp4" alt="イベントをソースとするグラフウィジェット" video=true >}}

イベントは [graph widgets][8] のデータ ソースとして利用でき、イベント検索クエリをもとに timeseries, table, top list ウィジェットを作成できます。たとえば、[Monitor Notifications Overview][9] ダッシュボードでは、モニター アラート イベントのトレンドを分析し、設定の見直しやアラート疲れの軽減に役立てられます。

#### オーバーレイ

{{< img src="service_management/events/guides/usage/event_overlays.png" alt="ダッシュボードの例でイベントオーバーレイを表示するオプション" style="width:100%;" >}}

オーバーレイは、対応するイベントをグラフ上に重ねて表示します。Dashboard の [Event Overlays][10] 機能を使うと、最近の変更がアプリケーションやサービスでパフォーマンス問題を引き起こしているタイミングを特定し、原因を突き止められます。

### モニターの作成

重要なイベント検索クエリに基づいて、モニター アラートと通知を送信できます。アラートを設定するには、[Event Monitor][11] ドキュメントを参照してください。

## 参考資料

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