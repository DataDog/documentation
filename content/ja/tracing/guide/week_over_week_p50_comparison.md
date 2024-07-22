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

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3.mp4" alt="比較ビデオ" video="true" style="width:90%;">}}

Datadog は、時間の経過とともにアプリケーションのレイテンシーを示し、先週や先月など、以前の時間枠内の類似した瞬間との比較も表示できます。この例では、e コマースプラットフォームのウェブサーバーを示し、過去 1 か月間のサーバーのレイテンシーパフォーマンスを監視しています。

1. **[サービスカタログ][1]を開きます**。

    このページには、Datadog にデータを提供しているすべての[サービス][2]のリストが含まれています。キーワードでサービスを検索したり、`env` タグでフィルターをかけたり、時間枠を設定することができます。

2. **関連するアクティブなサービスを検索して開きます**。

   この例で `web-store` サービスが選ばれたのは、その安定性によるものです。この 1 か月で問題が発生していないか再確認してください。

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2.png" alt="比較 2" style="width:90%;">}}

    サービスをクリックすると、そのサービス詳細画面が表示され、スループット、レイテンシー (パーセンタイル分布を含む)、エラーの分析、サービスに対するアクティブな Datadog モニターのサマリー、およびサービスによって提供される[リソース][3]の内訳が示されます。

3. サービス詳細画面の上部にあるレイテンシーグラフを見つけ、凡例からすべてのパーセンタイルを除外して p50 オプションのみを残し、**レイテンシーグラフを拡大**してフルスクリーンモードでより包括的な分析を行えるようにします。

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー" style="width:90%;">}}

Datadog APM を使用すると、サービスのレイテンシーのさまざまなパーセンタイルを経時的に比較できますが、以下のレイテンシー分布グラフでレイテンシーの完全な分布を表示することもできます。

4. 右側の **Compare to Last** セクションにある `Week` オプションを選択して、**前週の p50 パフォーマンスを追加します**。

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー" style="width:90%;">}}

**注**: 分析を行う際、このグラフをサービスビューから任意のダッシュボードにエクスポートし、カスタムメトリクス、ホストレベルの情報、ログなど、Datadog で生成された他のグラフと一緒にこのデータを表示することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/tracing/glossary/#services
[3]: /ja/tracing/glossary/#resources