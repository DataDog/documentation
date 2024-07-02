---
title: Synthetic テストサマリーダッシュボード
aliases:
- /synthetics/dashboards/test_summary
further_reading:
- link: /continuous_testing/explorer/
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
---

## 概要

[テストサマリーダッシュボード][1]は、Synthetic テストの実行、CI/CD パイプラインの Synthetic テスト、およびプライベートロケーションに関する洞察を提供します。以下が表示されます。

- **Synthetic モニタリングとテストの使用量**: Synthetic テストの使用量を、環境、チーム、テストタイプ別に表示します。

  {{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="すぐに使える Synthetic テストサマリーダッシュボード" style="width:100%" >}}

- **テストの自動化**: CI/CD パイプラインで実行された Synthetic テストをタイプ別、チーム別に表示します。

  {{< img src="synthetics/dashboards/test_automation.png" alt="Synthetic テストサマリーダッシュボードの Continuous Testing と CI/CD インテグレーションのセクション" style="width:100%" >}}

- **プライベートロケーション**: プライベートロケーションごとの Synthetic ワーカーの数、平均同時実行数、平均プルテスト数を表示します。

  {{< img src="synthetics/dashboards/private_locations.png" alt="Synthetics テストサマリーダッシュボードのプライベートロケーションのセクション" style="width:100%" >}}


表示されるデータの詳細については、[Synthetic モニタリングメトリクス][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /watchdog/
[3]: /synthetics/metrics/
