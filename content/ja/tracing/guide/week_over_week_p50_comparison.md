---
title: サービスのレイテンシーを前週と比較する
kind: ガイド
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
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: 7 分
    text: スパンタグを追加し、アプリケーションのパフォーマンスをフィルタリングし、グループ化する
  - link: /tracing/guide/
    tag: ''
    text: すべてのガイド
---
_2 分で読了_

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3.mp4" alt="比較ビデオ" video="true"  style="width:90%;">}}

Datadog では、経時的なアプリケーションのレイテンシーと、週や月などの以前の時間フレームの類似する瞬間とのその比較を表示できます。この例では、e コマースプラットフォームのウェブサーバーを示し、過去 1 か月間のサーバーのレイテンシーパフォーマンスを監視しています。

1. **[サービス一覧ページ][1]を開きます**。

    このページには、 Datadog  APM で利用可能なインスツルメント済みの全[サービス][2]の一覧が表示されます。キーワードによるサービスの検索、`env` タグによるフィルター設定、タイムラインの設定が可能です。
2. **関連するアクティブなサービスを検索して開きます**。

   この例では、安定しているため、ウェブストアサービスを使用しています。この 1 ヶ月で問題が発生していないか再確認してください。

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2.png" alt="比較 2"  style="width:90%;">}}

   サービス詳細画面では、Datadog APM で利用可能なスタック内のすべてのサービスを確認することができます。スループット、レイテンシー（パーセンタイル分布を含む）、エラーの詳細な分析、および[サービス][2]に対するアクティブな Datadog モニターの概要と、サービスによって利用可能になった[リソース][3]の内訳が表示されます。

3. サービスダッシュボードの上部にある**レイテンシーグラフを探し**、凡例からすべてのパーセンタイルを選択解除して p50 オプションのみを残し、**レイテンシーグラフを展開**してフルスクリーンモードを表示すれば、より包括的な分析を実行できます。

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー"  style="width:90%;">}}

Datadog APM を使用すると、サービスのレイテンシーのさまざまなパーセンタイルを経時的に比較できますが、以下のレイテンシー分布グラフでレイテンシーの完全な分布を表示することもできます。

4. 右側の *Compare to Last* セクションの `Week` オプションをチェックして、**前週の p50 パフォーマンスを追加します**

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="週ごとの表示を有効にしたレイテンシーチャートのフルビュー"  style="width:90%;">}}

**注**: 分析を行う際、このグラフをサービスビューから任意のダッシュボードにエクスポートし、カスタムメトリクス、ホストレベルの情報、ログなど、Datadog で生成された他のグラフと一緒にこのデータを表示することもできます。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/tracing/visualization/#services
[3]: /ja/tracing/visualization/#resources