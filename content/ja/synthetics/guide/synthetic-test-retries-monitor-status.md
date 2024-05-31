---
description: Synthetic テストのリトライが、関連するモニターのステータスにどのような影響を与えるかをご説明します。
further_reading:
- link: /synthetics/guide/synthetic-test-monitors/
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: /continuous_testing/explorer/search_runs/
  tag: ドキュメント
  text: Synthetic テストの実行について
kind: ガイド
title: Synthetic テストのリトライがモニターステータスにどのように影響を与えるかを理解する
---

## 概要

アラート疲労を軽減するために、テスト実行が失敗した場合、Synthetic テストはリトライ可能です。失敗時にリトライを設定したテストは、_高速リトライ_と呼ばれます。

高速リトライでは、Datadog がテストのモニターをアラート状態に移行し、通知を送る前に、Synthetic テストを複数回実行します。Synthetic テストに関連するモニターの詳細については、[Synthetic テストモニターの使用][3]を参照してください。

{{< img src="synthetics/guide/synthetics_test_retries/fast_retries.png" alt="高速リトライによる失敗したテストの実行" style="width:100%;">}}


## グループ評価

高速リトライの結果はローカルグループ評価に使用されるものの、トータルグループ評価では最終リトライの結果のみが考慮されます。元の実行とすべての中間リトライは評価から破棄されます。

ローカルグループ評価
: ロケーションステータスの評価。

トータルグループ評価
: テストステータスの評価。

最大リトライ回数に達した後も失敗している実行は最終的なものと見なされ、この最終結果がトータルグループ評価に考慮されます。

## 他のテスト実行と重複するリトライ

この例では、Synthetic テストが 3 分ごとに実行されるようにスケジュールされ、2 分の遅延で最大 2 回のリトライが構成されています。 

この評価では、最終リトライのみがトータルグループ評価に考慮されます。

すべてのリトライが失敗した場合

{{< img src="synthetics/guide/synthetics_test_retries/diagram_1.png" alt="2 回リトライされ、すべてのリトライで失敗したテスト実行を、ローカルグループおよびトータルグループとして評価" style="width:100%;">}}

またはリトライが成功した場合

{{< img src="synthetics/guide/synthetics_test_retries/diagram_2.png" alt="2 回リトライされ、3 回目のリトライで成功したテスト実行を、ローカルグループおよびトータルグループとして評価" style="width:100%;">}}

**注:** `minFailureDuration` と `minLocationsFailed` パラメーターに何を設定したかによって、動作が異なる場合があります。

## タイムスタンプ

システムは、最終結果のタイムスタンプに、テストが最初にスケジュールされた時刻ではなく、テストがリトライされた時刻を反映します。結果は、テストが開始されたときのタイムスタンプで考慮されます。テストの実行時間により、結果が評価に利用できるようになるまでに若干の遅れが生じる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /ja/synthetics/guide/synthetic-test-monitors/