---
aliases:
- /ja/continuous_integration/intelligent_test_runner/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Release Notes
  text: Check out the latest Software Delivery releases! (App login required)
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Streamline CI testing with Datadog Intelligent Test Runner
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitor all your CI pipelines with Datadog
title: Intelligent Test Runner
---

## 概要

Intelligent Test Runner is Datadog's test impact analysis solution. It automatically selects and runs only the relevant tests for a given commit based on the code being changed. Significantly reduce time spent testing and overall CI costs, while maintaining test coverage.

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。">}}

Intelligent Test Runner works by analyzing your test suite to identify the code each test covers. It then cross-references that coverage with the files impacted by a new code change. Datadog uses this information to run a selection of relevant, impacted tests, omitting the ones unaffected by the code change and reducing the overall testing duration. Find out more details about [How It Works][1].

By minimizing the number of tests run per commit, Intelligent Test Runner reduces the frequency of [flaky tests][2] disrupting your pipelines. This can be particularly frustrating when the test flaking is unrelated to the code change being tested. After enabling Intelligent Test Runner for your test services, you can limit each commit to its relevant tests to ensure that flaky tests unrelated to your code change don't end up arbitrarily breaking your build.

### Out-of-the-box configuration limitations

With the default configuration, there are known situations that can cause Intelligent Test Runner to skip tests that should have been run. Specifically, Intelligent Test Runner is not able to automatically detect changes in:

- Library dependencies
- Compiler options
- External services
- Changes to data files in data-driven tests

In these scenarios, Intelligent Test Runner might skip impacted tests with the out-of-the-box configuration.

There are several configuration mechanisms that you can use in these scenarios to ensure that no tests are skipped:

- You can mark certain files in your repository as [tracked files](#tracked-files), which causes all tests to run whenever these files are changed. Dockerfiles, Makefiles, dependency files, and other build configuration files are good candidates for tracked files.
- You can mark certain tests in your source as unskippable to ensure they are always run. This is a good fit for data-driven tests or tests that interact with external systems. More information in the [setup page][3].
- If you are authoring a risky commit and you'd like to run all tests, add `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.
- You can add a list of [excluded branches](#excluded-branches), which disables Intelligent Test Runner in those branches.

## Set up a Datadog library

Before setting up Intelligent Test Runner, you must configure [Test Visibility][4] for your particular language. If you are reporting data through the Agent, use v6.40 or 7.40 and later.

{{< whatsnext desc="Choose a language to set up Intelligent Test Runner in Datadog:" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## 構成

Once you have set up your Datadog library for Intelligent Test Runner, configure it from the [Test Service Settings][5] page. Enabling Intelligent Test Runner requires the `Intelligent Test Runner Activation Write` permission.

{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする" style="width:80%;">}}

### Git executable

For Intelligent Test Runner to work, [Git][6] needs to be available in the host running tests.

### Excluded branches

Due to the [limitations](#out-of-the-box-configuration-limitations) described above, the default branch of your repository is automatically excluded from having Intelligent Test Runner enabled. Datadog recommends this configuration to ensure that all of your tests run prior to reaching production.

他に除外したいブランチがある場合、Test Service Settings ページで追加します。クエリバーは、ワイルドカード文字 `*` の使用をサポートしており、`release_*` など、一致するブランチを除外することができます。

Excluded branches collect per-test code coverage, which has a performance impact on the total testing time. However, this performance impact is mitigated by only collecting code coverage when Datadog detects that running with code coverage generates enough new coverage information that it offsets the cost of collecting the coverage. You can check whether a test session has code coverage enabled or not by looking at the `@test.code_coverage.enabled` field.

### Tracked files

Tracked files are non-code files that can potentially impact your tests. Changes in tracked files could make your tests fail or change the code coverage of your tests. Examples of files that are good candidates to add as tracked files are:

- Dockerfiles used for the CI environment
- Files that define your dependencies (for example, `pom.xml` in Maven, `requirements.txt` in Python, or `package.json` in Javascript)
- Makefiles

When you specify a set of tracked files, Intelligent Test Runner runs all tests if any of these files change.

All file paths are considered to be relative to the root of the repository. You may use the `*` and `**` wildcard characters to match multiple files or directories. For instance, `**/*.mdx` matches any `.mdx` file in the repository.

{{< img src="continuous_integration/itr_configuration2.png" alt="Select branches to exclude and tracked files" style="width:80%;">}}

## テストセッションを確認する

テストコミットページやテストセッションパネルを見ることで、Intelligent Test Runner で得られる時間短縮を確認することができます。

{{< img src="continuous_integration/itr_commit.png" alt="Intelligent Test Runner のテストコミットページ" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="時間短縮を示す、テストセッションで有効化された Intelligent Test Runner。" style="width:80%;">}}

When Intelligent Test Runner is active and skipping tests, purple text displays the amount of time saved on each test session or on each commit. The duration bar also changes color to purple so you can identify which test sessions are using Intelligent Test Runner on the [Test Runs][7] page.

## 導入とグローバルな節約を確認する

Track your organization's savings and adoption of Intelligent Test Runner through the out-of-the-box [Intelligent Test Runner dashboard][8]. The dashboard includes widgets to track your overall savings as well as a per-repository, per-committer, and per-service view of the data. View the dashboard to understand which parts of your organization are using and getting the most out of Intelligent Test Runner.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

また、ダッシュボードでは、組織全体における Intelligent Test Runner の導入状況を追跡することができます。

{{< img src="continuous_integration/itr_dashboard2.png" alt="Intelligent Test Runner ダッシュボード" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/intelligent_test_runner/how_it_works/
[2]: /ja/glossary/#flaky-test
[3]: /ja/continuous_integration/intelligent_test_runner/setup
[4]: /ja/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/test-service
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner