---
aliases:
- /ja/continuous_integration/guides/rum_integration
- /ja/continuous_integration/integrate_tests/browser_tests
- /ja/continuous_integration/tests/browser_tests
description: CI Visibility と RUM を使用して、テスト結果をブラウザセッションおよびセッションリプレイと連携させる方法をご紹介します。
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: Test Visibility について
- link: /real_user_monitoring/browser
  tag: ドキュメント
  text: RUM ブラウザモニタリングについて
title: RUM を使用したブラウザテストのインスツルメント
---

## 概要

Test Visibility は Datadog [Real User Monitoring (RUM)][2] と統合し、ブラウザテストを深く分析するためのツールを提供します。

### 互換性

RUM インテグレーションを有効にするには、[Test Visibility][1] がテスト用にセットアップされていること、そしてテスト対象のアプリケーションが [RUM][2] を使用してインスツルメントされていることを確認してください。

RUM インテグレーションは、Cypress ブラウザテストおよび Selenium を使用したブラウザテストでサポートされています。

#### Cypress

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium

* `selenium-js` >= 4.11.0、`dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59、`dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0、`dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0、`datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

<blockquote class="alert alert-info">
ブラウザ SDK v5.0.0 以降では、クリックを正しくキャプチャするために、テスト中に初期化パラメーター `allowUntrustedEvents` を有効にしてください。
</blockquote>

## ブラウザテストとRUM の接続

Cypress または Selenium を使用してブラウザテストを実行し、テスト対象のアプリケーションが [Real User Monitoring (RUM)][2] を使用してインスツルメンテーションされている場合、テスト結果と生成された RUM ブラウザセッションおよびセッションリプレイは自動的にリンクされます。

Test Visibility のテスト詳細サイドパネルに、**Browser Sessions** タブが表示されます。

{{< img src="ci/ci-browser-session-tab.png" alt="テスト詳細のブラウザセッションタブ" style="width:100%;">}}

RUM セッションには、[RUM が通常収集する][3]データがすべて含まれているため、予期せぬエラーなど、ブラウザテストで起こりうる問題をデバッグすることができます。

{{< img src="ci/ci-browser-session-tab-errors.png" alt="テスト詳細のブラウザセッションタブエラー" style="width:100%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/setup/
[2]: /ja/real_user_monitoring/browser/
[3]: /ja/real_user_monitoring/browser/data_collected/