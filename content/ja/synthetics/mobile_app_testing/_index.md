---
title: モバイルアプリケーションのテストと監視
kind: ドキュメント
description: "インテリジェントで自己メンテナンス可能なモバイルテストを作成し、モバイルアプリケーションの最も重要な部分が実デバイスから稼働していることを確認します。"
aliases:
- /mobile_testing
- /mobile_app_testing
further_reading:
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/mobile_app_testing/mobile_app_tests
  tag: ドキュメント
  text: Synthetic モバイルアプリテストの作成方法
- link: /synthetics/mobile_app_testing/settings
  tag: ドキュメント
  text: iOS または Android モバイルアプリケーションをアップロードする方法
- link: /continuous_testing/
  tag: ドキュメント
  text: Continuous Testing & CI/CD について
cascade:
  algolia:
    tags: [mobile_testing]
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing is Generally Available for US1, US5, and EU sites.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}


モバイルアプリケーションテストでは、Android および iOS アプリケーションの主要なビジネスフローを、実際のデバイスを使用してテストおよび監視することができます。Datadog は、これらのテストを実際のデバイス上で実行し、主要なアプリケーションのワークフロー、各ステップのスクリーンショット、詳細な合否結果をリアルにステップバイステップで表示します。

## モバイルアプリテストを記録する

堅牢で包括的なテストを簡単に作成できるノーコードテストレコーダーを使用して、Android と iOS 用の[モバイルアプリテストを記録][1]します。

{{< img src="mobile_app_testing/mobile-test-screenshots.mp4" alt="Synthetic モバイルテストの記録ワークフローの例" video="true" >}}

## CI 上でテストを実行するか、手動でテストを実行するか

[Continuous Testing][3] を使用して CI パイプラインから[モバイルアプリテストをトリガー][2]するか、[モバイルアプリテストをスケジュール][4]して一定間隔で実行し、Datadog サイトで手動でモバイルアプリテストをトリガーすることができます。

## Synthetic Monitoring & Testing Results Explorer を使用する

Create [search queries and visualizations][5] for your Synthetic test runs or batches of tests running in CI/CD pipelines in the [Synthetic Monitoring & Testing Results Explorer][6]. 

{{< img src="mobile_app_testing/explorer_mobile_test_runs.png" alt="Mobile App Test Runs in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests
[2]: /mobile_app_testing/mobile_app_tests/#run-tests-in-ci
[3]: /continuous_testing
[4]: /mobile_app_testing/mobile_app_tests/#scheduling-and-alerting
[5]: /continuous_testing/explorer
[6]: https://app.datadoghq.com/synthetics/explorer