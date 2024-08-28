---
aliases:
- /ja/mobile_testing/mobile_app_tests/results
description: Synthetic モバイルアプリのテスト結果を表示し、成功または失敗したサンプル実行とテスト実行を比較することができます。
further_reading:
- link: /mobile_app_testing/mobile_app_tests/
  tag: ドキュメント
  text: Synthetic モバイルテストについて
- link: /service_management/events/explorer
  tag: ドキュメント
  text: イベントエクスプローラーについて
title: モバイルアプリのテスト結果
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing は、US1、US5、EU のサイトで一般利用可能です。</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

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
: このセクションでは、モバイルアプリケーション、バージョン、場所、デバイス数、テスト間隔、テストステップ数など、 Synthetic テストの詳細について説明します。

**Monitor**
: このセクションには、[Synthetic テストのモニター][1]の名前と、設定した通知メッセージが含まれています。

**CI/CD Execution**
: このセクションには、[CI パイプライン][3]の一部として実行されているこのテストの[実行ルール][2]を変更するためのドロップダウンメニューが含まれています。

## テスト履歴

**History** セクションには、**Global Uptime** グラフが表示されます。このグラフは、指定された時間間隔におけるすべてのテストロケーションの合計アップタイムを表示します。グローバルアップタイムは、テストで構成された[アラート条件][4]を考慮したものです。

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
: 要素はページにあるものの、クリックできない。たとえば、別の要素で覆われている、など。

`Cannot locate element`
: XML で要素が見つけられない。

## テストイベント

Synthetic テストモニターからのアラートは、**Test Runs** の下の **Events** タブに表示されま す。イベントエクスプローラーで Synthetic テストからのアラートを検索するには、[**Events** >  **Explorer**][7] に移動して、検索クエリに `@evt.type:synthetics_alert` を入力します。詳細については、[Synthetic テストモニターを利用する][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/guide/synthetic-test-monitors/
[2]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[3]: /ja/continuous_testing/cicd_integrations
[4]: /ja/mobile_app_testing/mobile_app_tests/#scheduling-and-alert
[5]: /ja/synthetics/guide/uptime-percentage-widget/
[6]: /ja/help
[7]: https://app.datadoghq.com/event/explorer
[8]: /ja/getting_started/synthetics/browser_test#select-locations
[9]: /ja/synthetics/private_locations
[10]: /ja/mobile_app_testing/mobile_app_tests/steps
[11]: https://app.datadoghq.com/synthetics/tests
