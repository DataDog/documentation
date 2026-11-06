---
description: Datadog プラットフォームの機能を活用して Synthetic Monitoring の機能を最大限に引き出す方法をご紹介します。
further_reading:
- link: /continuous_testing/explorer
  tag: ドキュメント
  text: Synthetics Monitoring と Testing Results Explorer について
title: プラットフォーム
---
## 概要 {#overview}

Synthetic テストのデータ収集を開始したら、Datadog プラットフォームの機能を活用して、Synthetic テストと監視、およびその他の関連スタック全体のデータを可視化、監視、分析できます。

## ダッシュボードを作成および表示する {#create-and-view-dashboards}
[ダッシュボード][1]を使用して、synthetics テストから得られた主要なパフォーマンスや使用量メトリクスを追跡、分析、表示します。

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="ダッシュボードがハイライトされた Synthetics のトップナビゲーションを示すスクリーンショット" >}}

## モニターを表示する {#view-monitors}
Synthetics テストから自動的に作成される関連[モニター][2]を表示してチームに通知し、アラートプラットフォームでアラートを一目で管理できます。

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic テストモニター" style="width:100%;">}}

## メトリクスを表示する {#view-metrics}
Synthetic Monitoring テストと Continuous Testing 設定によって生成される[メトリクス][3]を表示します。

## テストカバレッジを確認する {#explore-test-coverage}

[{{< ui >}}Test Coverage{{< /ui >}}][4] ページを確認して、RUM アプリケーションの全体的なテストカバレッジを把握します。

{{< img src="synthetics/test_coverage/browser_actions.png" alt="概要セクション、Untested Actions セクション、Tested Actions セクションを持つテストカバレッジページ" style="width:100%" >}}

## Synthetic Monitoring と APM を接続する {#connect-synthetic-monitoring-testing-and-apm}
[APM を接続][5]することで、失敗した Synthetic テストを、関連するトレースを掘り下げて根本原因まで直接特定することができます。

{{< img src="tracing/index/Synthetics.png" alt="Synthetic テスト" style="width:100%;">}}

## Synthetic Monitoring と RUM を接続する {#connect-synthetic-monitoring-and-rum}

[RUM を接続][6]することで、Synthetic ブラウザテストの実行によって生成された RUM データ、Session Replay、Error Tracking を表示することができます。

{{< img src="synthetics/guide/rum_in_synthetics/view_session_in_rum_2.png" alt="エラー、アクション、およびビューが読み込まれている様子を示す、Synthetic ブラウザテストの実行によって生成された RUM セッション。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/platform/dashboards
[2]: /ja/synthetics/guide/synthetic-test-monitors/
[3]: /ja/synthetics/platform/metrics
[4]: /ja/synthetics/platform/test_coverage
[5]: /ja/synthetics/platform/apm
[6]: /ja/synthetics/platform/rum