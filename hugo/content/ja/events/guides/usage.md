---
aliases:
- /ja/service_management/events/usage
- /ja/service_management/events/guides/usage/
further_reading:
- link: /logs/log_configuration/processors/
  tag: ドキュメント
  text: 処理 pipeline の詳細をご覧ください
- link: /events/explorer/
  tag: ドキュメント
  text: イベントエクスプローラーでイベントをトリアージする
title: イベントの利用
---
## カスタムメトリクス {#custom-metrics}

任意のイベント検索クエリから 15 か月間保持される[メトリクスを生成][5]し、過去のイベントやアラートを作成、監視します。過去 20 分以内のタイムスタンプで取り込まれたイベントが集計対象となります。詳細については、[Event Analytics][6] を参照してください。

{{< img src="events/guides/usage/generate-metrics.png" alt="イベント検索クエリを使用したメトリクスの画像。" >}}

## イベントの活用例 {#examples-of-what-to-do-with-events}

### トリアージ機能 {#triage-features}

[イベントエクスプローラー][7]を使用して、Datadog に取り込まれるイベントを集計および表示します。属性ごとにイベントをグループ化またはフィルタリングし、イベント分析でグラフ化します。クエリ検索構文を使用して、ブール演算子やワイルドカード演算子でイベントをフィルタリングします。

### ダッシュボード {#dashboards}

{{< img src="events/guides/usage/events-dashboard.mp4" alt="イベントをソースとして使用するグラフウィジェット" video=true >}}

[グラフウィジェット][8]でイベントをデータソースとして利用し、イベント検索クエリの時系列、表、トップリストウィジェットを構築することができます。例えば、[Monitor Notifications Overview][9] Dashboard は、モニターのアラートイベントの傾向を分析し、設定の改善とアラート疲れの軽減に役立ちます。

#### オーバーレイ {#overlays}

{{< img src="events/guides/usage/event_overlays.png" alt="サンプルの Dashboard でイベントオーバーレイを表示するオプション" style="width:100%;" >}}

オーバーレイは、グラフの上に該当するイベントを可視化します。Dashboard の[Event Overlays][10]機能を使用して、最近の変更がアプリケーションやサービスのパフォーマンス問題を引き起こしているタイミングを特定し、問題の原因を見つけます。

### モニターを作成する {#create-a-monitor}

重要なイベントクエリに基づいて、モニターのアラートや通知を送信します。アラートを設定するには、[イベントモニター][11]のドキュメントを参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/settings/pipelines
[4]: /ja/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /ja/events/explorer/analytics
[7]: /ja/events/explorer/
[8]: /ja/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /ja/dashboards/change_overlays/
[11]: /ja/monitors/types/event/