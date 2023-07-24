---
title: Test Visibility in Datadog
kind: documentation
aliases:
  - /continuous_integration/explore_tests/
further_reading:
    - link: "/monitors/types/ci/"
      tag: "Documentation"
      text: "Creating CI Test Monitors"
    - link: "/continuous_integration/guides/find_flaky_tests/"
      tag: "Documentation"
      text: "Finding Flaky Tests"
    - link: "/continuous_integration/guides/rum_integration/"
      tag: "Documentation"
      text: "Linking CI Visibility and RUM"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "https://www.datadoghq.com/blog/ci-test-visibility-with-rum/"
      tag: "Blog"
      text: "Troubleshoot end-to-end tests with CI Visibility and RUM"
cascade:
    algolia:
        rank: 70
        tags: ['ci test', 'ci tests']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Test Visibility][1] provides a test-first view into your CI health by displaying important metrics and results from your tests. It can help you investigate performance problems and test failures that concern you the most because you work on the related code, not because you maintain the pipelines they are run in.

## Setup

{{< whatsnext desc="Choose a language to set up Test Visibility in Datadog:" >}}
    {{< nextlink href="continuous_integration/tests/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/junit_upload" >}}Uploading JUnit test report files to Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Test suite level visibility

In addition to tests, CI Visibility provides visibility over the whole testing phase of your project. On the [Test Runs][4] page, you can filter by test level: session, module, suite and test. Each test level represents a different level of aggregation of tests.

{{< img src="ci/ci-test-suite-visibility.png" alt="Test Suite Visibility" style="width:100%;">}}

### Sessions
  
Test sessions are the highest level of aggregation. They correspond one to one to a test command, such as `yarn test`, `mvn test`, or `dotnet test`.

For [JUnit report uploads][14] there is 1 session per report upload.

#### Module
The definition of module changes slightly per language:

* In .NET a test module groups every test that is run under the same [unit test project][8].
* In Swift a test module groups every test that is run for a given bundle.
* In JavaScript the test modules map one-to-one to test sessions.
* In Java a test module groups every test that is run by the same Maven Surefire/Failsafe or Gradle Test task execution.
* In JUnit report uploads, the test modules map one-to-one to test sessions.

An example of a module is `SwiftLintFrameworkTests`, which corresponds to a test target in [`SwiftLint`][9].

### Suite
  
A test suite is a group of tests exercising the same unit of code.

An example of a test suite is `src/commands/junit/__tests__/upload.test.ts`, which corresponds to a test file in [`datadog-ci`][10].

### Compatibility

Not every language supported by CI Visibility has support for test suite level visibility:

* [Swift][11] has complete support since `dd-sdk-swift-testing>=2.1.0`.
* [.NET][12] has complete support since `dd-trace-dotnet>2.16.0`.
* [JavaScript][13] has limited support since `dd-trace-js>=3.3.0`.
* Java has complete support since `dd-trace-java>=1.12.0`.
* [JUnit report uploads][14] has complete support since `datadog-ci>=2.17.0`.

Additionally, test suite level visibility is only supported in Agentless mode.

## Use CI tests data

When creating a [dashboard][15] or a [notebook][16], you can use test execution data in your search query, which updates the visualization widget options.

## Alert on test data

When you evaluate failed or flaky tests, or the performance of a CI test on the [**Test Runs** page][4], click **Create Monitor** to create a [CI Test monitor][17]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://www.datadoghq.com/auto-instrumentation/
[6]: https://app.datadoghq.com/ci/test-runs?viz=timeseries
[7]: /tracing/
[11]: /continuous_integration/tests/swift/#test-suite-level-visibility-compatibility
[12]: /continuous_integration/tests/dotnet/#test-suite-level-visibility-compatibility
[13]: /continuous_integration/tests/javascript/#test-suite-level-visibility-compatibility
[14]: /continuous_integration/tests/junit_upload#test-suite-level-visibility-compatibility
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/notebook/list
[17]: /monitors/types/ci/
