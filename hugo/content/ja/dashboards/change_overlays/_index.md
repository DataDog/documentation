---
description: 変更イベントをグラフにオーバーレイし、パフォーマンスの異常とアプリケーションの変更を相関付けます。
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: ドキュメント
  text: APM デプロイメント追跡の概要
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: ブログ
  text: Datadog APM のデプロイ追跡でコードデプロイを監視
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: ブログ
  text: 自動障害デプロイ検出でコードを確実にリリース
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: ドキュメント
  text: RUM デプロイメント追跡の概要
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: ブログ
  text: RUM のデプロイメント追跡でフロントエンドの不具合をトラブルシュートする
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: ブログ
  text: Change Overlays を使って、問題のあるデプロイを素早く表示し、元に戻しましょう。
title: 変更オーバーレイ
---
## 概要 {#overview}

チームが反復作業を行い、コードをデプロイし、アプリケーションやサービスに変更を加える際、エラーの急増、レイテンシーの増加、ページ読み込み時間の遅延を引き起こした正確な変更を特定することは困難な場合があります。Change Overlays を使用して、デプロイやフィーチャーフラグなどの変更をダッシュボード上で表示し、パフォーマンスの問題と迅速に関連付けましょう。

## グラフ上の変更のオーバーレイ{#overlay-changes-on-graphs}

開始するには、ダッシュボードの右上にある {{< ui >}}Show Overlays{{< /ui >}} をクリックします。これで、[Change Tracking][16] タイムラインと時系列ウィジェット上の変更を表示するオーバーレイを有効にできるようになりました。

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="ダッシュボードヘッダーの Overlays ボタン" style="width:100%;">}}

有効にすると、{{< ui >}}Service{{< /ui >}} 検索バーにデフォルトで {{< ui >}}Most Relevant{{< /ui >}} サービスが表示されます。Datadog は、ダッシュボード上のウィジェットをサポートするクエリで最も頻繁に参照されるサービスを自動的に選択します。

検索バーを使用して目的のサービスを検索することにより、自動サービス検出をオーバーライドします。

変更タイムラインおよびオーバーレイとして表示されるすべての変更は、選択されたサービスに関連付けられます。
{{< ui >}}Show On{{< /ui >}} ドロップダウンを使用して、変更オーバーレイを関連するウィジェットに限定するか、ダッシュボード上のすべてのウィジェットに表示するかを選択します。

詳細の表示や追加のアクションを実行するには、変更オーバーレイまたは変更タイムライン内の変更をクリックします。

### デプロイ変更のスコープ設定{#scope-deployment-changes}

APM デプロイの場合、`env` を指定する必要があります。ダッシュボードに `env` または `datacenter` テンプレート変数が設定されている場合、デプロイは選択内容に合わせてフィルタリングされます。それ以外の場合、`env` はデフォルトで `prod` になります。

## 参考資料{#further-reading}

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
[16]: /ja/change_tracking/