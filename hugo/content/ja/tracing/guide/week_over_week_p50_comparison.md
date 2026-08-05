---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 分
  text: データベースサービスの異常な p99 レイテンシーに関するアラート
- link: /tracing/guide/apm_dashboard/
  tag: 4 分
  text: ダッシュボードを作成して、APM メトリクスを追跡、関連付ける
- link: /tracing/guide/slowest_request_daily/
  tag: 3 分
  text: ウェブサービスの最も遅いエンドポイントで最も遅いトレースをデバッグする
- link: /tracing/guide/
  tag: ''
  text: すべてのガイド
title: サービスのレイテンシーを前週と比較する
---

_2 分で読了_

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3_cropped_small.mp4" alt="比較動画" video="true" style="width:90%;">}}

Datadog では、経時的なアプリケーションのレイテンシーと、先週や先月などの過去のタイムフレームの類似する期間との比較を表示できます。この例では、e コマースプラットフォームの Web サーバーを示し、過去 1 か月間にわたってサーバーが経験したレイテンシーパフォーマンスを監視しています。 

1. **[サービスカタログ][1]を開きます**。

    このページには、 Datadog  にデータを提供している全[サービス][2]の一覧が表示されます。キーワードによるサービスの検索、`env` タグによるフィルター設定、タイムフレームの設定が可能です。

2. **関連するアクティブなサービスを検索して開きます**。

   この例では、安定しているため、`web-store` サービスを使用しています。過去 1 か月間で問題が発生していないか再確認してください。

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2_cropped.png" alt="比較 2" style="width:90%;">}}

   サービスをクリックするとサービス詳細画面が表示され、スループット、レイテンシー (パーセンタイル分布を含む)、エラーの分析、サービスに対するアクティブな Datadog モニターの概要、そしてサービスによって利用可能になった[リソース][3]の内訳を確認することができます。

3. サービスページの上部にある**レイテンシーグラフを探し**、凡例からすべてのパーセンタイルを選択解除して p50 オプションのみを残し、**レイテンシーグラフを展開**して全画面表示すれば、より包括的な分析を実行できます。

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3_cropped.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー" style="width:90%;">}}

Datadog APM を使用すると、サービスのレイテンシーのさまざまなパーセンタイルを経時的に比較できますが、以下のレイテンシー分布グラフでレイテンシーの完全な分布を表示することもできます。

4. 右側の *Compare to Last* セクションの `Week` オプションをチェックして、**前週の p50 パフォーマンスを追加します**。

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー" style="width:90%;">}}

**注**: 分析を行う際、このグラフをサービスビューから任意のダッシュボードにエクスポートし、カスタムメトリクス、ホストレベルの情報、ログなど、Datadog で生成された他のグラフと一緒にこのデータを表示することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/tracing/glossary/#services
[3]: /ja/tracing/glossary/#resources