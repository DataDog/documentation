---
title: Synthetic ブラウザテストパフォーマンスダッシュボード
kind: ドキュメント
description: すぐに使える Synthetic ブラウザテストパフォーマンスダッシュボードについてご紹介します。
aliases:
- /synthetics/dashboards/browser_test
further_reading:
- link: /continuous_testing/explorer/
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
---

## 概要

[ブラウザテストパフォーマンスダッシュボード][1]は、ブラウザテストの実行、ブラウザ分析、Web パフォーマンス、イベントに関する洞察を提供します。以下が表示されます。

- **Synthetic ブラウザテスト分析**: ブラウザの種類による成功率の内訳、ブラウザテストアラートのリスト、ブラウザの種類と場所による平均テスト時間をご覧いただけます。

  {{< img src="synthetics/dashboards/browser_test_analysis.png" alt="Synthetic ブラウザテストパフォーマンスダッシュボードのブラウザ テスト分析セクション" style="width:100%" >}}

- **Synthetic テスト Web パフォーマンス**: Datadog RUM を有効にしている場合、[RUM インテグレーション][2]を使用して、コア Web バイタルとサードパーティプロバイダのテストリソースのリストを調べることができます。

  {{< img src="synthetics/dashboards/browser_test_web_performance.png" alt="Synthetics ブラウザテストパフォーマンスダッシュボードのSynthetic テストウェブパフォーマンスセクション" style="width:100%" >}}

- **イベント**: Synthetic テストのアラートから未解決のイベントを検索できます。

  {{< img src="synthetics/dashboards/browser_test_events.png" alt="Synthetics ブラウザテストパフォーマンスダッシュボードのイベントセクション" style="width:100%" >}}


{{< img src="synthetics/dashboards/browser_test_performance.png" alt="すぐに使える Synthetics ブラウザテストパフォーマンスダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[Synthetic モニタリングメトリクス][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /synthetics/guide/explore-rum-through-synthetics/
[3]: /watchdog/
[4]: /synthetics/metrics/
