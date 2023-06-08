---
further_reading:
- link: /synthetics/ci_results_explorer
  tag: ドキュメント
  text: CI Results Explorer について学ぶ
kind: documentation
title: Synthetic API テストパフォーマンスダッシュボード
---

## 概要

[API テストパフォーマンスダッシュボード][1]は、スタック全体とイベントに関する洞察を提供します。以下が表示されます。

- **API テストの種類**: ネットワークレベルの平均レスポンスタイム、レイテンシー、ルックアップ時間、およびトランザクションのタイミングとレスポンスタイムをテストタイプ別に場所ごとに表示します。
- **イベント**: すべての API テストでトリガーされたイベントを表示し、ダッシュボードの上部にあるテンプレート変数を使用して特定のテストにフィルターをかけます。

ピンクの Watchdog アイコンをクリックすると、[**Watchdog Insights**][2] サイドパネルが開き、アプリケーションパフォーマンスやトリガーされたモニターアラートにおける未解決の異常を分析することができます。

{{< img src="synthetics/dashboards/api_test_performance_dashboard.png" alt="すぐに使える Synthetics API テストパフォーマンスダッシュボード" style="width:100%" >}}

{{< img src="synthetics/dashboards/api_test_performance_events.png" alt="Synthetics API テストパフォーマンスダッシュボードのイベントセクション" style="width:100%" >}}

表示されるデータの詳細については、[Synthetic モニタリングメトリクス][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /ja/watchdog/
[3]: /ja/synthetics/metrics/