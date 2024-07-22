---
title: Test Visibility in Datadog
aliases:
  - /continuous_integration/explore_tests/
  - /continuous_integration/guides/test_configurations/
  - /continuous_integration/integrate_tests/
  - /continuous_integration/tests/
further_reading:
    - link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
      tag: "Release Notes"
      text: "Check out the latest Software Delivery releases! (App login required)"
    - link: "https://www.datadoghq.com/blog/datadog-ci-visibility/"
      tag: "Blog"
      text: "Monitor your CI pipelines and tests with Datadog CI Visibility"
    - link: "https://www.datadoghq.com/blog/ci-test-visibility-with-rum/"
      tag: "Blog"
      text: "Troubleshoot end-to-end tests with CI Visibility and RUM"
    - link: "/monitors/types/ci/"
      tag: "Documentation"
      text: "Learn about CI Test Monitors"
    - link: "/tests/guides/flaky_test_management/"
      tag: "Documentation"
      text: "Learn about Flaky Test Management"
    - link: "/tests/browser_tests/"
      tag: "Documentation"
      text: "Learn how to instrument your browser tests with RUM"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Learn how to troubleshoot Test Visibility"
cascade:
    algolia:
        rank: 70
        tags: ['ci test', 'ci tests', 'test visibility', 'failed test', 'flaky test', 'supported features']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Test Visibility][1] provides a test-first view into your CI health by displaying important metrics and results from your tests. It can help you investigate performance problems and test failures that are most relevant to your work, focusing on the code you are responsible for, rather than the pipelines which run your tests.

## Setup

Select an option to configure Test Visibility in Datadog:

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

In addition to tests, Test Visibility provides visibility over the whole testing phase of your project.

### Supported features

|                                                                                                                                                                                                                  |   .NET    | Java/JVM&#8209;based |       Javascript       |  Python   |   Ruby    |   Swift   |       JUnit Xml        |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Accurate time/durations results" >}}Microseconds resolution in test start time and duration.{{< /ci-details >}}                                                                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Distributed traces on integration tests" >}}Tests that make calls to external services instrumented with Datadog show the full distributed trace in their test details.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent-based reporting" >}}Ability to report test information through the Datadog Agent.{{< /ci-details >}}                                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agentless reporting" >}}Ability to report test information without the Datadog Agent.{{< /ci-details >}}                                                                                   | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test suite level visibility" >}}Visibility over the whole testing process, including session, module, suites, and tests.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Manual API" >}}Ability to programmatically create CI Visibility events for test frameworks that are not supported by Datadog's automatic instrumentation.{{< /ci-details >}}               | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Codeowner by test" >}}Automatic detection of the owner of a test file based on the CODEOWNERS file.{{< /ci-details >}}                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (partially)  |
| {{< ci-details title="Source code start/end" >}}Automatic report of the start and end lines of a test.{{< /ci-details >}}                                                                                        | {{< X >}} |       {{< X >}}      | {{< X >}} (only start) | {{< X >}} | {{< X >}} (only start) | {{< X >}} | {{< X >}} (only start) |
| {{< ci-details title="CI and git info" >}}Automatic collection of git and CI environment metadata, such as CI provider, git commit SHA or pipeline URL.{{< /ci-details >}}                                       | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git metadata upload" >}}Automatic upload of git tree information used for Intelligent Test Runner.{{< /ci-details >}}                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Intelligent Test Runner *" >}}Capability to enable Intelligent Test Runner, which intelligently skips tests based on code coverage and git metadata.{{< /ci-details >}}                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} |  {{< X >}}     | {{< X >}} |                        |
| {{< ci-details title="Code coverage support" >}}Ability to report total code coverage metrics.{{< /ci-details >}}                                                                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}}       |           | {{< X >}} |   {{< X >}} (manual)   |
| {{< ci-details title="Benchmark tests support" >}}Automatic detection of performance statistics for benchmark tests.{{< /ci-details >}}                                                                          | {{< X >}} |                      |                        | {{< X >}} |           | {{< X >}} |                        |
| {{< ci-details title="Parameterized tests" >}}Automatic detection of parameterized tests.{{< /ci-details >}}                                                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Early flake detection *" >}}Automatically retry new tests to detect flakiness.{{< /ci-details >}}                                                                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |           |           |                        |
| {{< ci-details title="Auto test retries *" >}}Automatically retry failed tests up to N times to avoid failing the build due to test flakiness.{{< /ci-details >}}                                               |           |       {{< X >}}      |                        |           |           |           |                        |
| {{< ci-details title="Selenium RUM integration" >}}Automatically link browser sessions to test cases when testing RUM-instrumented applications.{{< /ci-details >}}                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} |           |                        |

\* The feature is opt-in, and needs to be enabled on the [**Test Service Settings** page][5].

## Default configurations

Tests evaluate the behavior of code for a set of given conditions. Some of those conditions are related to the environment where the tests are run, such as the operating system or the runtime used. The same code executed under different sets of conditions can behave differently, so developers usually configure their tests to run in different sets of conditions and validate that the behavior is the expected for all of them. This specific set of conditions is called a *configuration*.

In Test Visibility, a test with multiple configurations is treated as multiple tests with a separate test for each configuration. In the case where one of the configurations fails but the others pass, only that specific test and configuration combination is marked as failed.

For example, suppose you're testing a single commit and you have a Python test that runs against three different Python versions. If the test fails for one of those versions, that specific test is marked as failed, while the other versions are marked as passed. If you retry the tests against the same commit and now the test for all three Python versions pass, the test with the version that previously failed is now marked as both passed and flaky, while the other two versions remain passed, with no flakiness detected.

### Test configuration attributes

When you run your tests with Test Visibility, the library detects and reports information about the environment where tests are run as test tags. For example, the operating system name, such as `Windows` or `Linux`, and the architecture of the platform, such as `arm64` or `x86_64`, are added as tags on each test. These values are shown in the commit and on branch overview pages when a test fails or is flaky for a specific configuration but not others.

The following tags are automatically collected to identify test configurations, and some may only apply to specific platforms:

| Tag Name               | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Name of the operating system where the tests are run.           |
| `os.family`            | Family of the operating system where the tests are run.         |
| `os.version`           | Version of the operating system where the tests are run.        |
| `os.architecture`      | Architecture of the operating system where the tests are run.   |
| `runtime.name`         | Name of the runtime system for the tests.                       |
| `runtime.version`      | Version of the runtime system.                                  |
| `runtime.vendor`       | Vendor that built the runtime platform where the tests are run. |
| `runtime.architecture` | Architecture of the runtime system for the tests.               |
| `device.model`         | The device model running the tests.                             |
| `device.name`          | Name of the device.                                             |
| `ui.appearance`        | User Interface style.                                           |
| `ui.orientation`       | Orientation the UI is run in.                                   |
| `ui.localization`      | Language of the application.                                    |

### Parameterized test configurations

When you run parameterized tests, the library detects and reports information about the parameters used. Parameters are a part of test configuration, so the same test case executed with different parameters is considered as two different tests in Test Visibility.

If a test parameter is non-deterministic and has a different value every time a test is run, each test execution is considered a new test in Test Visibility. As a consequence, some product features may not work correctly for such tests: history of executions, flakiness detection, Intelligent Test Runner, and others.

Some examples of non-deterministic test parameters are:

- current date
- a random value
- a value that depends on the test execution environment (such as an absolute file path or the current username)
- a value that has no deterministic string representation (for example an instance of a Java class whose `toString()` method is not overridden)

Avoid using non-deterministic test parameters. In case this is not possible, some testing frameworks provide a way to specify a deterministic string representation for a non-deterministic parameter (such as overriding parameter display name).

## Custom configurations

There are some configurations that cannot be directly identified and reported automatically because they can depend on environment variables, test run arguments, or other approaches that developers use. For those cases, you must provide the configuration details to the library so Test Visibility can properly identify them.

Define these tags as part of the `DD_TAGS` environment variable using the `test.configuration` prefix.

For example, the following test configuration tags identify a test configuration where disk response time is slow and available memory is low:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

All tags with the `test.configuration` prefix are used as configuration tags, in addition to the automatically collected ones.

Note: Nested `test.configuration` tags, such as `test.configuration.cpu.memory`, are not supported.

In order to filter using these configurations tags, [you must create facets for these tags][2].

## Enhance your developer workflow

{{< whatsnext desc="Integrate Test Visibility with tools to report code coverage data, enhance browser tests with RUM, and access insights across platforms by streamlining issue identification and resolution in your development cycle." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Enhancing Developer Workflows with Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Learn about Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrument Cypress Browser Tests with Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrument Swift Tests with Browser RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Use CI tests data

{{% ci-information-collected %}}

When creating a [dashboard][6] or a [notebook][7], you can use CI test data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][8] and [Notebooks documentation][9].

## Alert on test data

When you're evaluating failed or flaky tests, or the performance of a CI test, you can export your search query in the [Test Visibility Explorer][3] to a [CI Test monitor][4] by clicking the **Export** button.

## Further reading

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
