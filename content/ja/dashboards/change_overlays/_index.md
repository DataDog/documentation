---
description: Overlay your change events on graphs to correlate performance anomalies
  with changes in your application
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: Documentation
  text: Getting started with APM Deployment Tracking
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: Blog
  text: Monitor code deployments with Deployment Tracking in Datadog APM
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: Blog
  text: Release code confidently with Automatic Faulty Deployment Detection
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: Documentation
  text: Getting started with RUM Deployment Tracking
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: Blog
  text: Troubleshoot faulty frontend deployments with Deployment Tracking in RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Quickly spot and revert faulty deployments with Change Overlays
title: Change Overlays
---
<div class="alert alert-warning">
    変更オーバーレイはベータ版です。
</div>


## 概要

チームが繰り返しコードをデプロイし、アプリケーションやサービスに継続的に変更を加えていると、エラーの急増、レイテンシーの増加、ページのロード時間の遅延などの原因となった正確な変更を見つけることは困難な場合があります。そのため、変更オーバーレイを使用すると、アプリケーションやサービス内でパフォーマンスの問題を引き起こしている最近の変更を特定し、問題の原因を見つけることができます。

Datadog の観測可能性データのコンテキストで変更が発生する瞬間を表示することで、問題を特定のリリースに絞り込み、変更をメトリクスに関連付け、トラブルシューティングを迅速に行うことができます。変更オーバーレイは、[APM サービスのデプロイ][1]をサポートします。

## グラフ上の変更のオーバーレイ

開始するには、ダッシュボードの右上にある **Show Overlays** をクリックします。

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="ダッシュボードヘッダーのオーバーレイボタン" style="width:100%;">}}

`version` タグで構成されたサービスの `service` タグでフィルターされた時系列グラフに自動的にオーバーレイが表示されます。APM サービスでデプロイを有効にするには、[構成にバージョンタグを追加][1]します。

イベントオーバーレイをクリックすると、サイドパネルに詳細情報が表示され、[変化の影響を分析する](#analyze-the-impact-of-your-change)ことができます。

### 障害のあるデプロイの表示
オーバーレイパネルのトグルを使用して、メトリクスに影響を与える可能性のある[障害のあるデプロイ][2]だけを表示します。

### 自動検出のオーバーライド
検索バーを使用して目的のサービスを検索することにより、自動サービス検出をオーバーライドします。

## 変化の影響を分析
グラフ上のオーバーレイをクリックすると、変更分析ページが表示され、変更のステータスと影響を把握することができます。

{{< img src="dashboards/change_overlays/change_overlays_side_panel.png" alt="変更オーバーレイのサイドパネル" style="width:75%;">}}

### APM デプロイ
APM デプロイでは、以下のことが可能です。
- リクエスト、エラー、レイテンシーについて、選択したバージョンをサービス全体のパフォーマンスと比較する
- `region`、`env`、`datacenter` ごとにバージョンのロールアウトを表示する
- 新しいデプロイでもたらされた新しいエラー追跡問題を確認する
- サービスが稼働している関連インフラストラクチャーを確認する

{{< img src="dashboards/change_overlays/apm_overlays_side_panel.png" alt="APM オーバーレイのサイドパネル" style="width:75%;">}}

## よくあるご質問
### オーバーレイはいつ表示されますか？
APM デプロイでは、以下の時系列グラフにオーバーレイが表示されます。
1. クエリ内の `service` タグによってフィルターされた時系列グラフ
2. `service` に `version` タグを設定してある時系列グラフ

### デプロイのスコープは何ですか？
APM デプロイでは `env` を指定する必要があります。ダッシュボードに `env` または `datacenter` テンプレート変数が設定されている場合、デプロイはその選択に合うようにフィルターされます。そうでない場合、`env` のデフォルトは `prod` です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/deployment_tracking/
[2]: /ja/watchdog/faulty_deployment_detection/
[3]: /ja/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ja/metrics/advanced-filtering/
[8]: /ja/getting_started/tagging/
[9]: /ja/metrics/#time-aggregation
[10]: /ja/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /ja/dashboards/functions/rollup/
[12]: /ja/dashboards/functions/#apply-functions-optional
[13]: /ja/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /ja/logs/explorer/search_syntax/
[15]: /ja/dashboards/widgets/timeseries/#event-overlay