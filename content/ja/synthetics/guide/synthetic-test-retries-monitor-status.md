---
description: Synthetic テストのリトライが、関連するモニターのステータスにどのような影響を与えるかをご説明します。
further_reading:
- link: /synthetics/guide/synthetic-test-monitors/
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: /continuous_testing/explorer/search_runs/
  tag: ドキュメント
  text: Synthetic テストの実行について
title: Synthetic テストのリトライがモニターステータスにどのように影響を与えるかを理解する
---

## 概要

アラート疲れ (alert fatigue) を軽減するために、テスト実行が失敗した場合に Synthetic テストをリトライ (再試行) できます。失敗時のリトライを設定している場合、これを「高速リトライ (fast retry)」と呼びます。

高速リトライでは、Datadog はモニターをアラート状態に切り替えて通知を送信する前に、Synthetic テストを複数回実行します。Synthetic テストに関連付けられたモニターの詳細については、[Synthetic テストモニターの使用][3]を参照してください。

{{< img src="synthetics/guide/synthetics_test_retries/fast_retries.png" alt="高速リトライを伴う失敗したテスト実行" style="width:100%;">}}


## グループ評価

高速リトライ結果はローカルグループ評価で使用されますが、最終的なリトライ結果のみが合計グループ評価に考慮されます。元のテスト実行と途中のリトライ結果は評価対象から除外されます。

ローカルグループ評価
: ロケーションステータスの評価

トータルグループ評価
: テストステータスの評価。

設定した最大リトライ回数に達してもなおテストが失敗している場合、その結果が最終判定となり、合計グループ評価に反映されます。

## 他のテストランとリトライが重なる場合

以下の例では、Synthetic テストが 3 分ごとに実行され、リトライは最大 2 回まで、各リトライまでの待機時間を 2 分に設定しています。

合計グループ評価では、最終的なリトライ結果のみが評価に考慮されます。

全リトライが失敗した場合:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_1.png" alt="2 回リトライしてすべて失敗したテスト実行をローカルグループと合計グループで評価した図" style="width:100%;">}}

リトライが成功した場合:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_2.png" alt="2 回リトライされ、3 回目のリトライで成功したテスト実行を、ローカルグループおよびトータルグループとして評価" style="width:100%;">}}

**注:** `minFailureDuration` と `minLocationsFailed` のパラメータ設定によっては、異なる動作が見られる場合があります。

## タイムスタンプ

最終結果のタイムスタンプには、テストがリトライされた時刻が使用され、元々テストがスケジュールされた時刻は使用されません。結果は、テストが開始された時点のタイムスタンプで評価されます。テストの実行時間のため、結果が評価に反映されるまでに若干の遅延が生じる場合があります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /ja/synthetics/guide/synthetic-test-monitors/