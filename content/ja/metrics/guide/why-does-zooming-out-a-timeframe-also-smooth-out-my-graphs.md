---
aliases:
- /ja/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
- /ja/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
further_reading:
- link: /metrics/types/
  tag: ドキュメント
  text: Datadog メトリクスタイプの発見
- link: /dashboards/functions/rollup/
  tag: ドキュメント
  text: ロールアップ関数について
title: 時間枠をズームアウトするとグラフが滑らかになるのはなぜですか？
---

Datadog 内では、グラフは一定数のポイントしか含めることができません。メトリクスが表示される時間枠が増加すると、ポイント間の集計が行われ、ポイント数がその設定数を下回るようになります。したがって、時間枠が増加するにつれて粒度が失われます。例えば、4 時間の時間枠では、線グラフは 1 分ごとに 1 つの値に、棒グラフは 2 分ごとに 1 つの値にデータが集計されます。より大きな時間枠を選択してズームアウトすると、グラフに表示されるデータはより長い期間を表します。

{{< img src="metrics/guide/smooth_line.mp4" alt="線グラフを平滑化する" video="true" width="90%" >}}

バーが表示されている場合、ロールアップ間隔はより明確になります。

{{< img src="metrics/guide/smoothing.mp4" alt="棒グラフを平滑化する" video="true" width="90%" >}}

時間集計の方法と粒度を調整するために、クエリに `.rollup()` 関数を手動で追加できます。Datadog はデフォルトでデータポイントを自動的にロールアップし、`GAUGE`、`RATE`、`COUNT` メトリクスタイプのロールアップ間隔内の値を平均化します。

**注**: Datadog ウィジェットの UI を通じてメトリクスをクエリすると、`RATE` と `COUNT` メトリクスタイプに [アプリ内メトリクスタイプ修飾子][1] が自動的に追加されます。これにより `.rollup()` の動作が変更され、値が補間されることなく合計されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/type_modifiers/