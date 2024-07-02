---
title: Synthetic API テストパフォーマンスダッシュボード
kind: ドキュメント
aliases:
- /synthetics/dashboards/api_test
further_reading:
- link: /continuous_testing/explorer/
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
---

## 概要

[API テストパフォーマンスダッシュボード][1]は、スタック全体とイベントに関する洞察を提供します。以下が表示されます。

- **API テストの種類**: ネットワークレベルの平均レスポンスタイム、レイテンシー、ルックアップ時間、およびトランザクションのタイミングとレスポンスタイムをテストタイプ別に場所ごとに表示します。

  {{< img src="synthetics/dashboards/api_test_performance_dashboard_2_2024.png" alt="Out-of-the-box Synthetics API test performance dashboard" style="width:100%" >}}

- **イベント**: すべての API テストでトリガーされたイベントを表示し、ダッシュボードの上部にあるテンプレート変数を使用して特定のテストにフィルターをかけます。

  {{< img src="synthetics/dashboards/api_test_performance_events_2_2024.png" alt="Events section of the Synthetics API test performance dashboard" style="width:100%" >}}


表示されるデータの詳細については、[Synthetic モニタリングメトリクス][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /watchdog/
[3]: /synthetics/metrics/
