---
title: Test Impact Analysis
aliases:
- /continuous_integration/intelligent_test_runner/
- /intelligent_test_runner
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
    tag: "Release Notes"
    text: "Check out the latest Software Delivery releases! (App login required)"
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline CI testing with Datadog Intelligent Test Runner"
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: "Blog"
    text: "Monitor all your CI pipelines with Datadog"
---

<div class="alert alert-danger"> This feature was formerly known as Intelligent Test Runner, and some tags still contain "itr".</div>

## Overview

Test Impact Analysis automatically selects and runs only the relevant tests for a given commit based on the code being changed. Significantly reduce time spent testing and overall CI costs, while maintaining test coverage.

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis enabled in a test session showing its time savings.">}}

Test Impact Analysis works by analyzing your test suite to identify the code each test covers. It then cross-references that coverage with the files impacted by a new code change. Datadog uses this information to run a selection of relevant, impacted tests, omitting the ones unaffected by the code change and reducing the overall testing duration. Find out more details about [How It Works][1].

By minimizing the number of tests run per commit, Test Impact Analysis reduces the frequency of [flaky tests][2] disrupting your pipelines. This can be particularly frustrating when the test flaking is unrelated to the code change being tested. After enabling Test Impact Analysis for your test services, you can limit each commit to its relevant tests to ensure that flaky tests unrelated to your code change don't end up arbitrarily breaking your build.

### Out-of-the-box configuration limitations

With the default configuration, there are known situations that can cause Test Impact Analysis to skip tests that should have been run. Specifically, Test Impact Analysis is not able to automatically detect changes in:

- Library dependencies
- Compiler options
- External services
- Changes to data files in data-driven tests

In these scenarios, Test Impact Analysis might skip impacted tests with the out-of-the-box configuration.

There are several configuration mechanisms that you can use in these scenarios to ensure that no tests are skipped:

- You can mark certain files in your repository as [tracked files](#tracked-files), which causes all tests to run whenever these files are changed. Dockerfiles, Makefiles, dependency files, and other build configuration files are good candidates for tracked files.
- You can mark certain tests in your source as unskippable to ensure they are always run. This is a good fit for data-driven tests or tests that interact with external systems. More information in the [setup page][3].
- If you are authoring a risky commit and you'd like to run all tests, add `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.
- If GitHub is your source code management provider, use the `ITR:NoSkip` label (case insensitive) to prevent Test Impact Analysis from skipping tests in pull requests. To use this feature, configure the GitHub App using the [GitHub integration tile][9] with the `Software Delivery: Collect Pull Request Information` feature enabled. This mechanism does not work with tests executed on GitHub actions triggered by `pull_request` events.
- You can add a list of [excluded branches](#excluded-branches), which disables Test Impact Analysis in those branches.

## Set up a Datadog library

Before setting up Test Impact Analysis, you must configure [Test Optimization][4] for your particular language. If you are reporting data through the Agent, use v6.40 or 7.40 and later.

{{< whatsnext desc="Choose a language to set up Test Impact Analysis in Datadog:" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

Once you have set up your Datadog library for Test Impact Analysis, configure it from the [Test Service Settings][5] page. Enabling Test Impact Analysis requires the `Test Optimization Settings Write` permission.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration.png" alt="Enable Test Impact Analysis for a test service on the Test Optimization Settings page" style="width:80%" >}}

### Git executable

For Test Impact Analysis to work, [Git][6] needs to be available in the host running tests.

### Excluded branches

Due to the [limitations](#out-of-the-box-configuration-limitations) described above, the default branch of your repository is automatically excluded from having Test Impact Analysis enabled. Datadog recommends this configuration to ensure that all of your tests run prior to reaching production.

If there are other branches you want to exclude, add them on the Test Optimization Settings page. The query bar supports using the wildcard character `*` to exclude any branches that match, such as `release_*`.

Excluded branches collect per-test code coverage, which has a performance impact on the total testing time. However, this performance impact is mitigated by only collecting code coverage when Datadog detects that running with code coverage generates enough new coverage information that it offsets the cost of collecting the coverage. You can check whether a test session has code coverage enabled or not by looking at the `@test.code_coverage.enabled` field.

### Tracked files

Tracked files are non-code files that can potentially impact your tests. Changes in tracked files could make your tests fail or change the code coverage of your tests. Examples of files that are good candidates to add as tracked files are:

- Dockerfiles used for the CI environment
- Files that define your dependencies (for example, `pom.xml` in Maven, `requirements.txt` in Python, or `package.json` in Javascript)
- Makefiles

When you specify a set of tracked files, Test Impact Analysis runs all tests if any of these files change.

All file paths are considered to be relative to the root of the repository. You may use the `*` and `**` wildcard characters to match multiple files or directories. For instance, `**/*.mdx` matches any `.mdx` file in the repository.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config.png" alt="Select branches to exclude and tracked files" style="width:80%" >}}

## Explore test sessions

You can explore the time savings you get from Test Impact Analysis by looking at the test commit page and test sessions panel.

{{< img src="continuous_integration/itr_commit.png" alt="Test commit page with Test Impact Analysis" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="ITest Impact Analysis enabled in a test session showing its time savings." style="width:80%;">}}

When Test Impact Analysis is active and skipping tests, purple text displays the amount of time saved on each test session or on each commit. The duration bar also changes color to purple so you can identify which test sessions are using Test Impact Analysis on the [Test Runs][7] page.

## Explore adoption and global savings

Track your organization's savings and adoption of Test Impact Analysis through the out-of-the-box [Test Impact Analysis dashboard][8]. The dashboard includes widgets to track your overall savings as well as a per-repository, per-committer, and per-service view of the data. View the dashboard to understand which parts of your organization are using and getting the most out of Test Impact Analysis.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Test Impact Analysis dashboard" style="width:80%;">}}

The dashboard also tracks adoption of Test Impact Analysis throughout your organization.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Test Impact Analysis dashboard" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/how_it_works/
[2]: /glossary/#flaky-test
[3]: /tests/test_impact_analysis/setup
[4]: /continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/test-optimization
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /integrations/github/
