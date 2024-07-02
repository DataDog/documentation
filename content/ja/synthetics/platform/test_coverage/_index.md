---
title: テストカバレッジ
kind: ドキュメント
description: Evaluate your testing suite's coverage of browser actions and API endpoints.
aliases:
  - /synthetics/dashboards/testing_coverage
  - /synthetics/test_coverage
further_reading:
- link: "https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/"
  tag: ブログ
  text: Datadog RUM と Synthetic モニタリングでテストカバレッジを追跡する
- link: "https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/"
  tag: ブログ
  text: Improve your API test coverage with Datadog Synthetic Monitoring
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストについて
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: RUM アクションについて
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
- link: /api_catalog
  tag: ドキュメント
  text: Learn about the API Catalog
---

## 概要

Explore your testing suite's Synthetic test coverage of RUM browser actions or API endpoints on the [**Test Coverage** page][1], which you can find under **Digital Experience** > **Synthetic Monitoring & Testing**.

{{< tabs >}}
{{% tab "Browser Actions" %}}
The [**Test Coverage** page][1] provides actionable insight into the overall testing coverage of your [RUM applications][2]. It uses [data collected from the Browser RUM SDK][3] and [results from Synthetic browser tests][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

Test Coverage ページでは、以下の情報が表示されます。

- アクセス数の多い Web ページ
- The percentage of tested [RUM actions][5]
- テストした回数と総アクション数
- アクションをカバーするブラウザテストの数
- リアルユーザーとのインタラクション数

## アプリケーションやビューのテストカバレッジを調査する

テストされていないアクションを特定し、Test Coverage ページで実際のユーザーインタラクションにリンクすることで、より包括的で正確なテストスイートを構築します。

アプリケーションやビューの中で、ブラウザテストを作成すべき箇所を特定します。

1. **Application** ドロップダウンメニューから RUM アプリケーションを選択するか、**View Name** ドロップダウンメニューからビューを選択します。
2. Click **Custom** to filter the data on [custom actions][5], which are unique and offer more accurate coverage results compared to generated actions. If you want to include generated actions in the test coverage analysis, select **All Actions**.
3. 以下のセクションで提示される情報を検証することで、テストカバレッジのギャップを特定します。

   **Test Coverage Overview** 
   : ユーザーセッション数、ブラウザテスト数、テスト中のアクションの割合、実際のユーザーインタラクション数で重み付けされたテスト中のアクションの割合、およびトップビューのリストが表示されます。

   **Untested Actions**
   : テストされていないユーザーアクションの数、収集された全アクションの数、および実際のユーザーが最も交流するがテストされていないトップアクションのリストが表示されます。

   **Tested Actions**
   : ユーザーアクションを対象としたブラウザテスト数、実ユーザーインタラクション数、実ユーザーが最も多くインタラクションし、テストされているトップアクションのリストが表示されます。

The [Test Coverage page][1] populates actions that are extensively used, and hides actions that are less commonly used in your application. For more information about the data displayed, see [Synthetic Monitoring Metrics][6].

## リプレイの表示とテストの追加

[Test Coverage ページ][1]の情報を使って、以下の質問に答えます。

- アプリケーションでは何のアクションがテストされていないのか？
- ユーザーから最も支持されているビューは何か？
- ブラウザテストが必要なアクションは？
- ユーザーのアクションをカバーしているブラウザテストの割合は？

### セッションリプレイの表示

**Untested Actions** テーブルのアクションの横にある **Play** アイコンをクリックすると、[セッションリプレイ][8]で[実際のユーザー操作の記録][7]を検証することができます。

### アクションの検証

アクションをクリックすると、選択したアクションを含むテスト、ビュー、セッション、およびこれらのテスト、ビュー、セッションのサブセットの数にアクセスできます。

{{< img src="synthetics/test_coverage/tested_action.png" alt="関連する Synthetic テスト、RUM ビュー、セッションリプレイを表示するタブを備えたアクションサイドパネル" style="width:100%" >}}

アプリケーションの最も人気のあるセクションを新規または既存のブラウザテストに追加し、アプリケーションの主要なユーザージャーニーがコード変更によって悪影響を受けたときにアラートを出すことができます。

 To create a test, click **+ New Test** on the top right of the [Test Coverage page][1]. You can run tests [directly in your CI/CD pipelines][9] to ensure no regressions occur before releasing code in production.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /synthetics/guide/explore-rum-through-synthetics/
[3]: /real_user_monitoring/browser/data_collected/
[4]: /synthetics/browser_tests/
[5]: /real_user_monitoring/guide/send-rum-custom-actions/
[6]: /synthetics/metrics/
[7]: /real_user_monitoring/session_replay/browser/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /continuous_testing/

{{% /tab %}}
{{% tab "API Endpoints" %}}

The [**Test Coverage** page][1] provides actionable insight into the overall testing coverage of your [API endpoints][2]. It uses [data collected from the API Catalog][2] and [spans from APM][3].

{{< img src="synthetics/test_coverage/api_endpoints.png" alt="Test Coverage page with an Overview section, Untested Actions section, and a Tested Actions section" style="width:100%" >}}

Test Coverage ページでは、以下の情報が表示されます。

- The overall coverage of your API endpoints
- The percentage of tested API endpoints
- The number untested API endpoints with the highest request count, sorted by error rate
- The percentage of tested API endpoints with API tests that have not been tested in CI
- The number of untested API endpoints that have [APM monitors][4] 

## Investigate test coverage for API endpoints

Maintain a comprehensive, accurate testing suite by resolving issues that are causing your Synthetic tests to fail and your API endpoints to experience poor performance. 

To identify areas in your testing suite where you should create API tests:

1. Click the **Untested** checkbox in the **API overall coverage** section.
2. Investigate the endpoint side panel to see all the passing or failing tests that have been created for the endpoint. The **Dependency Map** displays upstream issues that may be contributing to your endpoint's poor performance, and downstream dependencies that are affected.
3. Identify gaps in your API test coverage by examining the information presented in the following sections: 

   **API Overall Coverage** 
   : Displays all of the untested endpoints within your tag scope. 

   **Performance**
   : Displays the most engaged, untested endpoints with significant error rates.

   **Tested in the CI**
   : Displays the endpoints that are currently being tested in your CI pipelines. 

   **APM Monitors**
   : Displays the endpoints that are untested but have active monitors on them. 

For more information about the data displayed, see [APM Metrics][5].

## Add tests

To create a test, click **+ New Test** on the top right of the [Test Coverage page][1]. You can run tests [directly in your CI/CD pipelines][6] to ensure no regressions occur before releasing code in production.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/api
[2]: /api_catalog/monitor_apis/
[3]: /tracing/
[4]: /monitors/types/apm
[5]: /tracing/metrics/
[6]: /continuous_testing/

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser