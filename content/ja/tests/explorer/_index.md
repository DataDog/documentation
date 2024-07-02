---
title: Test Visibility Explorer
description: Learn how to search and filter your test runs in the Test Visibility Explorer.
further_reading:
  - link: /continuous_integration/tests/
    tag: ドキュメント
    text: 問題のあるテストを見つけて修正するために、テストデータを調査する
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: ブログ
    text: Datadog CI モニターによるパイプラインアラートの構成
---

## 概要

The Test Visibility Explorer allows you to [search and filter](#search-and-filter), [visualize](#visualize), and [export](#export) test runs at multiple levels using any tag. 

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][6] to see your CI test run results across the following levels: **Session**, **Module**, **Suite**, and **Test**.

{{< img src="/continuous_integration/test_runs.png" text="Test Runs ページ" style="width:100%" >}}

## Common facets

The **Test** panel on the left lists default facets you can use to search for your test runs.

| ファセット | 説明 |
|---|---|
| Test Status | The outcome of the test: `Passed`, `Failed`, or `Skipped`. |
| Duration | テストが完了するまでの時間。 |
| Test Service | The [test service][12] instrumented with CI Visibility. |
| Test Full Name | Identifier for a test that includes the test name, test suite name, and configuration or parameter if present. |
| Test Name | A concise name for a test case. Defined in the test itself. |
| テストスイート | A [group of tests][13] exercising the same unit of code depending on your language and testing framework. |
| Flaky | Exhibits both a passing and failing status across multiple test runs for the same commit. |
| Has Parameters | テストにパラメーターがあるかどうか: `true` または `false`。 |
| Known Flaky | Whether or not a test is known to be flaky: `true` or `false`. <br><br>This test run failed and the test is identified as a flaky test in the current branch or the default branch. |
| 言語 | The programming language of the library that generated the test. |
| New Flaky | Whether or not this flaky test has occurred before: `true` or `false`. <br><br>The test run identifies the test as flaky in the commit. The test wasn't previously identified as a flaky test in the current branch or the default branch. |
| Performance Regression | テスト実行が回帰としてマークされるのは、その期間が平均の 5 倍であり、デフォルトブランチの同じテストの最大期間よりも長い場合です。 |
| Baseline Mean | For a test regression, indicates the mean duration of the same test in the default branch calculated over the last week of test runs. |
| Baseline Standard Deviation | For a test regression, indicates the standard deviation of the same test in the default branch calculated over the last week of test runs durations. |
| Absolute Change | For a test regression, indicates the absolute change of the test run duration compared to the baseline mean. |
| Relative Change | For a test regression, Indicates the relative change of the test run duration compared to the baseline mean. |
| Standard Deviation Change | Indicates if the test has been newly added. |
| Test Code Owners | The name of the test's codeowners as inferred from the repository configuration. |
| Test Fingerprint | The unique identifier for an individual test run. |
| Test Framework | The underlying framework or set of tools used for creating and executing tests. |
| Test Command | The command that was used to execute tests. |
| Test Bundle | Equivalent to a test module. This is used by earlier Datadog testing library versions. |
| Test Full Name | テストの正式名称。 |
| Test Module | The module of the test, which varies depending on the language:<br><br>In .NET, a test module groups every test that is run under the same unit test project.<br>In Swift, a test module groups every test that is run for a given bundle.<br>In JavaScript, the test modules map one-to-one to test sessions.<br>In Java, a test module groups every test that is run by the same Maven Surefire, Failsafe, or Gradle Test task execution.<br>In Python, a test module groups every test that is run under the same `.py` file as part of a test suite, which is typically managed by a framework like `unittest` or `pytest`.<br>In Ruby, a test module groups every test that is run within the same test file, which is typically managed by a framework like `RSpec` or `Minitest`. |
| Test Traits | `category:flaky` のようなテストの特性。 |
| Test Type | The type of the test such as `unit benchmark` or `browser`. |
| RUM Active | Indicates if the test was run inside of an active [Real User Monitoring][14] web session. |
| Is New | Indicates if the test has been newly added. |
| Is Retry | Indicates if the test has been run as a result of a retry. |
| Code Coverage Enabled | Indicates if the [Intelligent Test Runner][16] has enabled [code coverage][17] per test for the session. |
| Skipped by ITR | Number of tests that were skipped during the session by the Intelligent Test Runner. |
| Test Skipping Enabled | Whether the test session or module is allowed to be skipped by the Intelligent Test Runner. |
| Test Skipping Type | The method or criteria used by the Intelligent Test Runner to determine which tests to skip. |
| Test Skipped | The total count of tests that were not executed during the test session, which may include tests that were configured to skip, or were set as manual exclusions. |
| Time Saved | The length of time saved for the session by Intelligent Test Runner usage. |
| Early Flake Detection Enabled | Indicates if the test has been run using [Early Flake Detection][15]. |
| Early Flake Detection Abort Reason | Indicates the Early Flake Detection abort reason for a test. |

セッション、モジュール、スイート、テスト実行といったテストレベルでフィルターをかけることができます。各テストレベルは、異なるレベルのテストの集計を表します。

{{< img src="ci/ci-test-suite-visibility.png" alt="テストスイートの視覚化" style="width:100%;">}}

For more information about common facets that you can use as part of your search query in the Test Visibility Explorer, see [Test Run Facets][3].

### セッション

テストセッションは最も高いレベルの集計です。これらは `yarn test` や `mvn test`、`dotnet test` などのテストコマンドに一対一で対応しています。

JUnit レポートのアップロードでは、アップロードされたレポートファイル 1 つにつき 1 セッションです。

### モジュール

モジュールの定義は言語によって若干の違いがあります。

* In .NET, a test module groups every test that is run under the same [unit test project][9].
* Swift では、テストモジュールは、与えられたバンドルに対して実行されるすべてのテストをグループ化します。
* JavaScript では、テストモジュールはテストセッションに一対一でマッピングされます。
* Java では、テストモジュールは、同じ Maven Surefire/Failsafe または Gradle Test タスク実行で実行されるすべてのテストをグループ化します。
* JUnit レポートのアップロードでは、テストモジュールはテストセッションに一対一でマッピングされます。

An example of a module is `SwiftLintFrameworkTests`, which corresponds to a test target in [`SwiftLint`][10].

### スイート

テストスイートは、同じコードのユニットを実行するテストのグループです。

An example of a test suite is `src/commands/junit/__tests__/upload.test.ts`, which corresponds to a test file in [`datadog-ci`][11].

Test run data is available in [dashboards][7] and [notebooks][8], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## 検索とフィルター

You can narrow down, broaden, or shift your focus on a subset of test runs by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for tests, see [Search and Manage][1].
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

Group your queried test runs into higher-level entities such as fields, patterns, and transactions in order to derive or consolidate information. By using [facets][3], which you do not need to create to search for attributes, you can accomplish the following actions:

- CI/CD パイプラインで実行されているテストの進捗を検索し、追跡します。
- すべての CI/CD ジョブの実行を調査して、失敗したテスト実行を特定してトラブルシューティングします。
- Identify [flaky tests][5] to fix.

## 視覚化

Select a visualization type to visualize the outcomes of your filters and aggregations and better understand your test runs. For example, you can view your test results in a list to organize your test data into columns, or in a [timeseries graph][18] to measure your CI test data over time.

## エクスポート

[Export your view][4] in the Test Visibility Explorer to reuse it later or in different contexts.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/search
[2]: /tests/explorer/search_syntax
[3]: /tests/explorer/facets
[4]: /tests/explorer/saved_views
[5]: /tests/guides/flaky_test_management
[6]: https://app.datadoghq.com/ci/test-runs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list
[9]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[10]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[11]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[12]: /glossary/?product=ci-cd#test-service
[13]: /glossary/?product=ci-cd#test-suite 
[14]: /real_user_monitoring/
[15]: /tests/early_flake_detection/
[16]: /intelligent_test_runner/
[17]: /tests/code_coverage/
[18]: https://app.datadoghq.com/ci/test-runs?viz=timeseries 