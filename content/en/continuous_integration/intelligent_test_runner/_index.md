---
title: Intelligent Test Runner
kind: documentation
is_beta: true
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline CI testing with Datadog Intelligent Test Runner"
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: "Blog"
    text: "Monitor all your CI pipelines with Datadog"
---

<div class="alert alert-warning">Intelligent Test Runner is a beta product.</div>

Intelligent Test Runner is Datadog's test impact analysis solution. It automatically and intelligently selects and runs only the relevant tests for a given commit based on the code being changed. Significantly reduce time spent testing and overall CI costs, while maintaining test coverage.


{{< img src="continuous_integration/itr_savings.png" alt="Intelligent test runner enabled in a test session showing its time savings.">}}

It does this by analyzing your test suite to determine the code each test covers, and then cross-referencing that coverage with the files impacted by a new code change. Datadog uses this information to run a selection of relevant, impacted tests, omitting the ones unaffected by the code change and reducing the overall testing duration.

By minimizing the number of tests run per commit, Intelligent Test Runner reduces the frequency of flaky tests disrupting your pipelines. Flaky tests are tests that may pass or fail at random given the same commit. This can be particularly frustrating when the test flaking is unrelated to the code change being tested. After enabling Intelligent Test Runner for your test services, you can limit each commit to its relevant tests to ensure that flaky tests unrelated to your code change don’t end up arbitrarily breaking your build.

### Limitations during beta

There are known limitations in the current implementation of Intelligent Test Runner that can cause it to skip tests that should be run under certain conditions. Specifically, Intelligent Test Runner is not able to detect changes in library dependencies, compiler options, external services or changes to data files in data-driven tests.

To override Intelligent Test Runner and run all tests, add `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.

## Setup Datadog Library

Prior to setting up Intelligent Test Runner, you must have finished setting up [Test Visibility][1] for your particular language. If you are reporting data through the Datadog Agent you need to use v6.40+/v7.40+.

{{< whatsnext desc="Choose a language to set up Intelligent Test Runner in Datadog:" >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/swift" >}}Swift{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

Once you have setup your Datadog Library for Intelligent Test Runner, you can configure it from the [Test Service Settings][2] page.

{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog." style="width:80%;">}}

Due to the limitations described above, the default branch of your repository is automatically excluded from having Intelligent Test Runner enabled. This is the recommended configuration by Datadog to ensure that all of your tests are run in the default branch.

If there are other branches you want to exclude, you can add them from the Intelligent Test Runner settings page. The query bar supports the wildcard character `*` to exclude any branches that match.

{{< img src="continuous_integration/itr_configuration.png" alt="Select branches to exclude from intelligent test runner" style="width:80%;">}}

## Explore test sessions

You can explore the time savings you are getting from Intelligent Test Runner by looking at the test commit page and test sessions panel.

{{< img src="continuous_integration/itr_commit.png" alt="Test commit page with intelligent test runner" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Intelligent test runner enabled in a test session showing its time savings." style="width:80%;">}}

When Intelligent Test Runner is active and skipping tests, you can see a purple text which displays the amount of time saved on each test session or on each commit. The duration bar also changes color to purple so you can quickly identify which test sessions are using Intelligent Test Runner in the [Test Runs][3] page.

## Explore adoption and global savings

You can also track you organization's savings and adoption of Intelligent Test Runner through the out-of-the-box [Intelligent Test Runner dashboard][4]. The dashboard includes widgets to track your overall savings as well as a per-repository, per-committer and per-service view of the data so you can understand what parts of your organization are using and getting the most out of Intelligent Test Runner.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Intelligent Test Runner dashboard" style="width:80%;">}}

It also allows you to track adoption of Intelligent Test Runner throughout your organization.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Intelligent Test Runner dashboard" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: https://app.datadoghq.com//ci/test-runs
[4]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner-beta
