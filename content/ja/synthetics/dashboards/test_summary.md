---
further_reading:
- link: /synthetics/ci_results_explorer
  tag: ドキュメント
  text: CI Results Explorer について学ぶ
kind: documentation
title: Synthetic テストサマリーダッシュボード
---

## 概要

[テストサマリーダッシュボード][1]は、Synthetic テストの実行、CI/CD パイプラインの Synthetic テスト、およびプライベートロケーションに関する洞察を提供します。以下が表示されます。

- **Synthetic モニタリングとテストの使用量**: Synthetic テストの使用量を、環境、チーム、テストタイプ別に表示します。
- **テストの自動化**: CI/CD パイプラインで実行された Synthetic テストをタイプ別、チーム別に表示します。
- **プライベートロケーション**: プライベートロケーションごとの Synthetic ワーカーの数、平均同時実行数、平均プルテスト数を表示します。

ピンクの Watchdog アイコンをクリックすると、[**Watchdog Insights**][2] サイドパネルが開き、アプリケーションパフォーマンスやトリガーされたモニターアラートにおける未解決の異常を分析することができます。

{{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="すぐに使える Synthetics テストサマリーダッシュボード" style="width:100%" >}}
{{< img src="synthetics/dashboards/test_automation.png" alt="Synthetics テストサマリーダッシュボードの Continuous Testing と CI/CD インテグレーションのセクシ ョン" style="width:100%" >}}
{{< img src="synthetics/dashboards/private_locations.png" alt="Synthetics テストサマリーダッシュボードのプライベートロケーションのセクション" style="width:100%" >}}

表示されるデータの詳細については、[Synthetic モニタリングメトリクス][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /ja/watchdog/
[3]: /ja/synthetics/metrics/