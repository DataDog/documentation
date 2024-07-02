---
title: Mobile App Testing Results
description: Synthetic モバイルアプリのテスト結果を表示し、成功または失敗したサンプル実行とテスト実行を比較することができます。
aliases:
- /mobile_testing/mobile_app_tests/results
- /mobile_app_testing/mobile_app_tests/results
further_reading:
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: ドキュメント
  text: Synthetic モバイルテストについて
- link: /service_management/events/explorer
  tag: ドキュメント
  text: イベントエクスプローラーについて
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

## 概要

テストの詳細ページを表示するには、[**Synthetic Tests** ページ][11]のモバイルアプリテストをクリックします。Test Details ページには、テストプロパティ、テスト履歴、サンプル実行、テスト実行など、テストに関連するすべての情報がコンテナで表示されます。

{{< img src="mobile_app_testing/test_details.png" alt="Test Details ページ" style="width=80%" >}}

テスト実行は、Synthetic モバイルアプリのテストが実行された後、テストの詳細ページに表示されます。[サンプル結果](#sample-results)は、ある時間間隔と特定の数の場所やデバイスでの最新のテスト実行の合格と不合格を関連付けるものです。

## テストプロパティ

**Properties** セクションでは、テスト ID、テストの作成日と編集日、テストの優先度、環境タグ、追加タグを確認できます。

**Overview**
: This section describes the Synthetic test details, including the mobile application, version, location, number of devices, test interval, and the number of test steps.

**Monitor**
: このセクションには、[Synthetic テストのモニター][1]の名前と、設定した通知メッセージが含まれています。

**CI/CD Execution**
: このセクションには、[CI パイプライン][3]の一部として実行されているこのテストの[実行ルール][2]を変更するためのドロップダウンメニューが含まれています。

## テスト履歴

In the **History** section, you can see the **Global Uptime** graph, which displays the total uptime of all test locations in a given time interval. The global uptime takes into consideration the [alert conditions][4] configured for a test.

{{< img src="mobile_app_testing/history.png" alt="History グラフは、グローバルアップタイムを表示します" style="width=80%" >}}

## 結果例

モバイルアプリのテスト実行には、[テストの失敗](#failed-results)のトラブルシューティングに役立つ[スクリーンショット](#screenshots-and-actions)などのコンポーネントが含まれます。

**Sample Runs** セクションでは、失敗した最新のテスト実行を調べ、最近成功したテスト実行と比較することができます。

### Overview 属性

Status
: テスト実行のステータス (`PASSED` または `FAILED`)。

Starting URL
: モバイルアプリのテストシナリオの URL。

Steps
: サンプル実行で完了した[テストステップ][10]の数。

Duration
: テストの実行にかかった時間。

Location
: テストが実行された[マネージド][8]または[プライベートロケーション][9]。

Device
: テストが実行されたデバイスのタイプ。

Run type
: テスト実行のタイプ (CI、手動トリガー、またはスケジュール)。

### スクリーンショットとアクション

実行されたすべてのテストステップには、ステップアクション、ステップアクション名、ステップ ID、ステップ期間のスクリーンショットが含まれます。

{{< img src="mobile_app_testing/screenshot-and-action.png" alt="試験詳細の Sample Runs セクションのスクリーンショットとアクション" style="width=80%" >}}

## 失敗した結果

テスト結果は、アサーションを満たさない場合、または別の理由によりステップが失敗した場合に `FAILED` とみなされます。スクリーンショットを確認し、ステップレベルでのエラーの可能性をチェックしたり、ステップにより生成されたリソースを確認したりして、失敗したランのトラブルシューティングを実行します。

一般的なモバイルアプリテストのエラーには、以下が含まれます。

`Element located but it's invisible`
: The element is on the page but cannot be clicked on—for instance, if another element is overlaid on top of it.

`Cannot locate element`
: The element cannot be found in the XML.

## テストイベント

Synthetic テストモニターからのアラートは、**Test Runs** の下の **Events** タブに表示されま す。イベントエクスプローラーで Synthetic テストからのアラートを検索するには、[**Events** >  **Explorer**][7] に移動して、検索クエリに `@evt.type:synthetics_alert` を入力します。詳細については、[Synthetic テストモニターを利用する][13]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/synthetic-test-monitors/
[2]: /continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[3]: /continuous_testing/cicd_integrations
[4]: /mobile_app_testing/mobile_app_tests/#scheduling-and-alert
[5]: /synthetics/guide/uptime-percentage-widget/
[6]: /help
[7]: https://app.datadoghq.com/event/explorer
[8]: /getting_started/synthetics/browser_test#select-locations
[9]: /synthetics/private_locations
[10]: /mobile_app_testing/mobile_app_tests/steps
[11]: https://app.datadoghq.com/synthetics/tests