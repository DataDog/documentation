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
  - link: "https://learn.datadoghq.com/courses/getting-started-test-optimization"
    tag: "Learning Center"
    text: "Getting Started with Test Optimization"
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

## Scale and accuracy limits

Test Impact Analysis decides which tests to skip by matching the files each test covers against the files a commit changes. The following behaviors are the known cases where that matching is intentionally conservative, so you know what to expect.

<div class="alert alert-info">All of the behaviors in this section are safe by design: they can only cause <strong>more</strong> tests to run, never cause a test to be skipped when it should have run. For code changes that Datadog cannot detect automatically, see <a href="#out-of-the-box-configuration-limitations">Out-of-the-box configuration limitations</a>.</div>

### Scale limits

Test Impact Analysis applies the following size limits:

- Datadog analyzes up to the 100 most recent commits for a change. On large changesets, some older commits may not be analyzed, so slightly fewer tests are skipped.
- If a single commit changes more than 5,000 files, that commit is not analyzed for impact, and its tests are run rather than skipped.
- If a single test or suite covers more than 16,000 files, it is not skipped.

### False positives in coverage matching

To check whether a test covers a changed file, Datadog uses a space-efficient probabilistic data structure (a Bloom filter). These structures have a small inherent false-positive rate (approximately 0.04%), so a small fraction of tests that could have been skipped may run anyway.

If Test Impact Analysis behaves unexpectedly, see the [Troubleshooting][12] page.

## Set up a Datadog library

Before setting up Test Impact Analysis, you must configure [{{< prodname >}}Test Optimization{{< /prodname >}}][4] for your particular language. If you are reporting data through the Agent, use v6.40 or 7.40 and later.

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

After you have set up your Datadog library for Test Impact Analysis, configure it from [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][5]. Enabling Test Impact Analysis requires the `Test Optimization Settings Write` permission.

Test Impact Analysis can be configured at three levels, and lower levels can override values from the level above:

- **Organization defaults**: Apply to every repository unless overridden. Open {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, then select the {{< ui >}}Organization{{< /ui >}} tab.
- **Repository**: Overrides organization defaults for a specific repository. Open {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, select the {{< ui >}}Repository-specific{{< /ui >}} tab, and choose a repository.
- **Test service**: Overrides the repository setting for a specific test service. Open the repository, then edit overrides for the target test service.

At the repository and test service levels, each setting can either {{< ui >}}Inherit{{< /ui >}} the value from the level above or be set to a {{< ui >}}Custom{{< /ui >}} value at the current level.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="Enable Test Impact Analysis for a repository on the CI/CD Settings page." style="width:80%" >}}

### Git executable

For Test Impact Analysis to work, [Git][6] needs to be available in the host running tests.

### Excluded branches

Due to the [limitations](#out-of-the-box-configuration-limitations) described above, the default branch of your repository is automatically excluded from having Test Impact Analysis enabled. Datadog recommends this configuration to ensure that all of your tests run prior to reaching production.

If there are other branches you want to exclude, add them on the CI/CD Settings page. The query bar supports using the wildcard character `*` to exclude any branches that match, such as `release_*`.

Excluded branches collect per-test code coverage, which has a performance impact on the total testing time. However, this performance impact is mitigated by only collecting code coverage when Datadog detects that running with code coverage generates enough new coverage information that it offsets the cost of collecting the coverage. You can check whether a test session has code coverage enabled or not by looking at the `@test.code_coverage.enabled` field.

### Tracked files

Tracked files are non-code files that can potentially impact your tests. Changes in tracked files could make your tests fail or change the code coverage of your tests. Examples of files that are good candidates to add as tracked files are:

- Dockerfiles used for the CI environment
- Files that define your dependencies (for example, `pom.xml` in Maven, `requirements.txt` in Python, or `package.json` in Javascript)
- Makefiles

When you specify a set of tracked files, Test Impact Analysis runs all tests if any of these files change.

All file paths are considered to be relative to the root of the repository. You may use the `*` and `**` wildcard characters to match multiple files or directories. For instance, `**/*.mdx` matches any `.mdx` file in the repository.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config-1.png" alt="Select branches to exclude and tracked files." style="width:80%" >}}

## Code coverage backfilling

If you use [Code Coverage][10] and Test Impact Analysis together, reported overall coverage can be skewed because Test Impact Analysis skips tests that do not need to run for the code change.

Code coverage backfilling adjusts the total reported coverage to include tests or suites that were skipped, so Test Impact Analysis savings do not distort coverage totals.

Code coverage backfilling is supported for Java, .NET, Go, and JavaScript. It is not supported for Ruby, Python, or Swift.

Backfilling is best effort. For large test suites, the coverage of some tests skipped by Test Impact Analysis may not be backfilled. As a result, the reported total coverage can be slightly lower than the true coverage. Backfilling does not affect which tests are skipped.

### Java, .NET, and Go

With `dd-trace-java`, `dd-trace-dotnet`, and `dd-trace-go`, no extra configuration is required for backfilling. These libraries automatically detect when tests run with a code coverage engine and backfill code coverage data from tests skipped by Test Impact Analysis.

### JavaScript

With `dd-trace-js`, backfilling requires uploading the code coverage report. Enable code coverage upload in the [organization-level CI/CD Optimization settings][11] so the Datadog library adjusts the total reported coverage to include skipped tests or suites.

## Explore test sessions

You can explore the time savings you get from Test Impact Analysis by looking at the test commit page and test sessions panel.

{{< img src="continuous_integration/itr_commit.png" alt="Test commit page with Test Impact Analysis" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis enabled in a test session showing its time savings." style="width:80%;">}}

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
[5]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /integrations/github/
[10]: /code_coverage/
[11]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[12]: /tests/test_impact_analysis/troubleshooting/
