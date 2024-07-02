---
title: Test Visibility in Datadog
kind: documentation
aliases:
  - /continuous_integration/explore_tests/
  - /continuous_integration/guides/test_configurations/
  - /continuous_integration/integrate_tests/
  - /continuous_integration/tests/
further_reading:
    - link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
      tag: Release Notes
      text: Check out the latest Software Delivery releases! (App login required)
    - link: "https://www.datadoghq.com/blog/datadog-ci-visibility/"
      tag: ブログ
      text: Monitor your CI pipelines and tests with Datadog CI Visibility
    - link: "https://www.datadoghq.com/blog/ci-test-visibility-with-rum/"
      tag: ブログ
      text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
    - link: /monitors/types/ci/
      tag: Documentation
      text: Learn about CI Test Monitors
    - link: /tests/guides/flaky_test_management/
      tag: Documentation
      text: 不安定なテストの管理について
    - link: /tests/browser_tests/
      tag: ドキュメント
      text: Learn how to instrument your browser tests with RUM
    - link: /tests/troubleshooting/
      tag: ドキュメント
      text: Learn how to troubleshoot Test Visibility
cascade:
    algolia:
        rank: 70
        tags: [ci test, ci tests, test visibility, failed test, 不安定なテスト, サポートされる機能]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Test Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Test Visibility][1] provides a test-first view into your CI health by displaying important metrics and results from your tests. It can help you investigate performance problems and test failures that are most relevant to your work, focusing on the code you are responsible for, rather than the pipelines which run your tests.

## セットアップ

Select an option to configure Test Visibility in Datadog:

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

In addition to tests, Test Visibility provides visibility over the whole testing phase of your project.

### サポートされる機能

|                                                                                                                                                                                                                  |   .NET    | Java/JVM&#8209;based |       Javascript       |  Python   |   Ruby    |   Swift   |       JUnit Xml        |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="正確な時刻/継続時間結果" >}}テスト開始時刻と継続時間におけるマイクロ秒単位の分解能{{< /ci-details >}}                                                                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="インテグレーションテストの分散型トレース" >}}Datadog でインスツルメンテーションされた外部サービスを呼び出すテストは、テストの詳細で完全な分散型トレースを表示します。{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent ベースのレポート" >}}Datadog Agent を通じてテスト情報を報告する能力。{{< /ci-details >}}                                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="エージェントレスレポート" >}}Datadog Agent を使用せずにテスト情報を報告する能力。{{< /ci-details >}}                                                                                   | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test suite level visibility" >}}Visibility over the whole testing process, including session, module, suites, and tests.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="手動 API" >}}Datadog の自動インスツルメンテーションでサポートされていないテストフレームワーク用の CI Visibility イベントをプログラム的に作成する能力。{{< /ci-details >}}               | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Codeowner by test" >}}Automatic detection of the owner of a test file based on the CODEOWNERS file.{{< /ci-details >}}                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (部分的)  |
| {{< ci-details title="ソースコードの開始/終了" >}}テストの開始行と終了行の自動レポート。{{< /ci-details >}}                                                                                        | {{< X >}} |       {{< X >}}      | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} (開始のみ) |
| {{< ci-details title="CI と git 情報" >}}CI プロバイダー、git コミット SHA、パイプライン URL などの git や CI 環境のメタデータの自動収集。{{< /ci-details >}}                                       | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git メタデータのアップロード" >}}Intelligent Test Runner で使用される git ツリー情報の自動アップロード。{{< /ci-details >}}                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Intelligent Test Runner *" >}}Capability to enable Intelligent Test Runner, which intelligently skips tests based on code coverage and git metadata.{{< /ci-details >}}                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} |  {{< X >}}     | {{< X >}} |                        |
| {{< ci-details title="コードカバレッジサポート" >}}全体のコードカバレッジのメトリクスを報告する能力。{{< /ci-details >}}                                                                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}}       |           | {{< X >}} |   {{< X >}} (手動)   |
| {{< ci-details title="ベンチマークテストサポート" >}}ベンチマークテストのパフォーマンス統計の自動検出。{{< /ci-details >}}                                                                          | {{< X >}} |                      |                        | {{< X >}} |           | {{< X >}} |                        |
| {{< ci-details title="パラメタライズドテスト" >}}パラメタライズドテストの自動検出。{{< /ci-details >}}                                                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Early flake detection *" >}}Automatically retry new tests to detect flakiness.{{< /ci-details >}}                                                                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |           |           |                        |
| {{< ci-details title="Auto test retries *" >}}Automatically retry failed tests up to N times to avoid failing the build due to test flakiness.{{< /ci-details >}}                                               |           |       {{< X >}}      |                        |           |           |           |                        |
| {{< ci-details title="Selenium RUM integration" >}}Automatically link browser sessions to test cases when testing RUM-instrumented applications.{{< /ci-details >}}                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} |           |                        |

\* The feature is opt-in, and needs to be enabled on the [**Test Service Settings** page][5].

## Default configurations

テストは、与えられた条件のセットに対するコードの振る舞いを評価します。これらの条件の中には、OS やランタイムなど、テストが実行される環境に関連するものもあります。そのため、開発者は通常、異なる条件下でテストを実行するように構成し、 すべての条件下で期待通りの挙動が得られるかどうかを検証します。この特定の条件のセットを*構成*と呼びます。

In Test Visibility, a test with multiple configurations is treated as multiple tests with a separate test for each configuration. In the case where one of the configurations fails but the others pass, only that specific test and configuration combination is marked as failed.

For example, suppose you're testing a single commit and you have a Python test that runs against three different Python versions. If the test fails for one of those versions, that specific test is marked as failed, while the other versions are marked as passed. If you retry the tests against the same commit and now the test for all three Python versions pass, the test with the version that previously failed is now marked as both passed and flaky, while the other two versions remain passed, with no flakiness detected.

### Test configuration attributes

When you run your tests with Test Visibility, the library detects and reports information about the environment where tests are run as test tags. For example, the operating system name, such as `Windows` or `Linux`, and the architecture of the platform, such as `arm64` or `x86_64`, are added as tags on each test. These values are shown in the commit and on branch overview pages when a test fails or is flaky for a specific configuration but not others.

以下のタグは、テスト構成を特定するために自動的に収集され、特定のプラットフォームにのみ適用されるものもあります。

| タグ名               | 説明                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | テストが実行されるオペレーティングシステムの名前。           |
| `os.family`            | テストが実行されるオペレーティングシステムの系列。         |
| `os.version`           | テストが実行されるオペレーティングシステムのバージョン。        |
| `os.architecture`      | テストが実行されるオペレーティングシステムのアーキテクチャ。   |
| `runtime.name`         | テスト用ランタイムシステムの名前。                       |
| `runtime.version`      | ランタイムシステムのバージョン。                                  |
| `runtime.vendor`       | テストを実行するランタイムプラットフォームを構築したベンダー。 |
| `runtime.architecture` | テスト用ランタイムシステムのアーキテクチャ。               |
| `device.model`         | テストを実行しているデバイスのモデル。                             |
| `device.name`          | デバイスの名前。                                             |
| `ui.appearance`        | ユーザーインターフェイスのスタイル。                                           |
| `ui.orientation`       | UI が実行されるオリエンテーション。                                   |
| `ui.localization`      | アプリケーションの言語。                                    |

### Parameterized test configurations

When you run parameterized tests, the library detects and reports information about the parameters used. Parameters are a part of test configuration, so the same test case executed with different parameters is considered as two different tests in Test Visibility.

If a test parameter is non-deterministic and has a different value every time a test is run, each test execution is considered a new test in Test Visibility. As a consequence, some product features may not work correctly for such tests: history of executions, flakiness detection, Intelligent Test Runner, and others.

Some examples of non-deterministic test parameters are:

- current date
- a random value
- a value that depends on the test execution environment (such as an absolute file path or the current username)
- a value that has no deterministic string representation (for example an instance of a Java class whose `toString()` method is not overridden)

Avoid using non-deterministic test parameters. In case this is not possible, some testing frameworks provide a way to specify a deterministic string representation for a non-deterministic parameter (such as overriding parameter display name).

## カスタム構成

There are some configurations that cannot be directly identified and reported automatically because they can depend on environment variables, test run arguments, or other approaches that developers use. For those cases, you must provide the configuration details to the library so Test Visibility can properly identify them.

Define these tags as part of the `DD_TAGS` environment variable using the `test.configuration` prefix.

For example, the following test configuration tags identify a test configuration where disk response time is slow and available memory is low:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

自動的に収集されたタグに加えて、`test.configuration` というプレフィックスを持つすべてのタグが構成タグとして使用されます。

注: `test.configuration.cpu.memory` のようにネストされた `test.configuration` タグはサポートされていません。

これらの構成タグを使ってフィルターをかけるには、[これらのタグ用のファセットを作成する必要があります][2]。

## Enhance your developer workflow

{{< whatsnext desc="Integrate Test Visibility with tools to report code coverage data, enhance browser tests with RUM, and access insights across platforms by streamlining issue identification and resolution in your development cycle." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Enhancing Developer Workflows with Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Learn about Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrument Cypress Browser Tests with Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrument Swift Tests with Browser RUM{{< /nextlink >}}
{{< /whatsnext >}}

## CI テストデータの使用

{{% ci-information-collected %}}

When creating a [dashboard][6] or a [notebook][7], you can use CI test data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][8] and [Notebooks documentation][9].

## Alert on test data

When you're evaluating failed or flaky tests, or the performance of a CI test, you can export your search query in the [Test Visibility Explorer][3] to a [CI Test monitor][4] by clicking the **Export** button.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: /continuous_integration/explorer/facets/
[3]: https://app.datadoghq.com/ci/test-runs
[4]: /monitors/types/ci/
[5]: https://app.datadoghq.com/ci/settings/test-service
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: /dashboards
[9]: /notebooks
