---
description: Datadog がジャーニーのステータスを決定する方法を理解します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /real_user_monitoring/operations_monitoring/
  tag: ドキュメント
  text: RUM Operations Monitoring について
- link: /journey_monitoring/details_report/#synthetic-monitoring--testing
  tag: ドキュメント
  text: Synthetic テストカバレッジについて
title: ジャーニーステータス
---
## 概要 {#overview}

ジャーニーステータスは、ジャーニーの技術的な健全性を **Healthy**、**Degraded**、または **Missing coverage** として要約します。Datadog は、2 種類の[サービスレベル目標 (SLO)][10] の入力からステータスを計算します。

- ジャーニーにリンクされた [Real User Monitoring (RUM) オペレーション][1]に関する SLO
- ジャーニーの [Synthetic テストスイート][2]に関する[アップタイム SLO][11]

ジャーニーステータスは、これらの入力の最新の状態を反映します。これは、ステータスの履歴を提供したり、個別の目標や評価期間を定義したりするものではありません。

{{< img src="journey_monitoring/journey-monitoring-status.png" alt="テストの失敗とテストスイートの高いバーンレートによってステータスが低下していることを示すジャーニーの概要。" style="width:100%;" >}}

## ステータスの入力 {#status-inputs}

Datadog は、各 SLO 入力の[バーンレート][3]を評価します。

- **高バーン**: SLO が目標で許容されるよりも速くエラー予算を消費しており、違反している、または違反に近づいています。
- **低バーンまたは OK**: SLO が許容可能なレートでエラー予算を消費しています。
- **データなし**: Datadog は計算からその SLO を除外します。

ジャーニーステータスには、両方の入力タイプが必要なわけではありません。いずれかのタイプの SLO でバーンレートが高いものが 1 つでもあると、ジャーニーは **Degraded** になります。

### RUM オペレーション SLO {#rum-operation-slos}

<div class="alert alert-info">RUM オペレーションを作成するには、<a href="/real_user_monitoring/rum_without_limits/">RUM without Limits&trade;</a> の有効なトライアルまたは有料サブスクリプションが必要です。オペレーションをジャーニーにリンクすると、その SLO がジャーニーステータスに寄与できるようになります。</div>

RUM オペレーションの入力は、リンクされたオペレーションの少なくとも 1 つの SLO のバーンレートが高い場合に高バーンレートとなります。これには少なくとも 1 つのオペレーション SLO が含まれており、含まれているすべての SLO のバーンレートが低いまたは OK の場合に正常と見なされます。

リンクされた RUM オペレーションは、ジャーニーのクリティカルパスの一部として明示的に識別されます。リンク機能により、ジャーニー中にユーザーが遭遇するオペレーションと、同時に実行される無関係なオペレーションが区別されます。

Datadog は、リンクされていないオペレーションおよび SLO がないリンク済みオペレーションをステータス計算から除外します。SLO がないオペレーションをリンクすると、Datadog は目標値 99% の可用性 SLO を作成します。必要に応じて、この SLO をカスタマイズするか、可用性とレイテンシー SLO を追加してください。ガイダンスについては、[RUM オペレーションで SLO を作成するためのベストプラクティス][4]を参照してください。

オペレーション詳細レポート、ジャーニーの[詳細レポート][5]、または [RUM オペレーション API][7] からリンクを管理します。

### テストスイートのアップタイム SLO {#test-suite-uptime-slo}

<div class="alert alert-info">このステータス入力に使用するテストスイートおよびテストの作成や管理には、<a href="/synthetics/browser_tests/">Synthetic ブラウザテスト</a>または <a href="/synthetics/mobile_app_testing/">Synthetic モバイルテスト</a>の有効なトライアルまたは有料サブスクリプションが必要です。</div>

テストスイートには、重要なテストを評価するタイムスライスアップタイム SLO があります。テストはデフォルトで重要と見なされます。テストを重要でないものとしてマークし、スイートに残したままアップタイム SLO から除外します。

テストスイートの入力は、そのアップタイム SLO のバーンレートが高い場合に高バーンレートとなります。アップタイム SLO のバーンレートが低いまたは OK の場合に正常と見なされます。スイートにテストデータがない場合、Datadog はこの入力を計算から除外します。

## ステータス計算 {#status-calculation}

Datadog は、含まれている RUM オペレーションとテストスイートの入力を組み合わせます。

- **Degraded**: 含まれている SLO の少なくとも 1 つのバーンレートが高い
- **Healthy**: 少なくとも 1 つの SLO が含まれており、含まれているすべての SLO のバーンレートが低いまたは OK である
- **Missing coverage**: 計算に含まれる SLO 入力がありません。これは、ジャーニーに構成された入力がない場合、または構成されたすべての入力が**データなし**と報告する場合に発生します。

ジャーニーの入力に対する変更は、そのステータスに自動的に反映されます。これには、RUM オペレーションのリンクや、テストスイートにおけるテストの追加または削除が含まれます。

## ジャーニーステータスを調査する {#investigate-journey-status}

[カタログ][12]、[マップ][13]、および詳細レポートでジャーニーステータスを表示します。

- **Degraded** ジャーニーの場合、Datadog はステータスに影響を与えている**重要な**オペレーション、または**アラート**状態の Synthetic テストにリンクします。組織で Bits AI が有効になっている場合は、オペレーションまたはテストから [Bits Investigation][14] を開始して、根本原因を特定します。
- **Missing coverage** ジャーニーの場合、[SLO があるオペレーションをリンク][8]するか、[カバーするテストを追加][9]してください。カバレッジが構成されている場合は、その SLO 入力がデータを報告していることを確認してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/operations_monitoring/
[2]: /ja/journey_monitoring/details_report/#synthetic-monitoring--testing
[3]: /ja/service_level_objectives/#slo-burn-rate-indicator
[4]: /ja/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[5]: /ja/journey_monitoring/details_report/
[7]: /ja/api/latest/rum-operations/
[8]: /ja/journey_monitoring/configuring_journeys/#review-matching-operations
[9]: /ja/journey_monitoring/configuring_journeys/#manage-tests
[10]: /ja/service_level_objectives/
[11]: /ja/synthetics/test_suites/#service-level-objectives
[12]: /ja/journey_monitoring/overview/#journey-catalog
[13]: /ja/journey_monitoring/map/
[14]: /ja/bits_ai/bits_investigation/