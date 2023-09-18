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
    {{< nextlink href="continuous_integration/tests/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/junit_upload" >}}Uploading JUnit test report files to Datadog{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/containers" >}}Tests running in containers{{< /nextlink >}}
{{< /whatsnext >}}

## Test suite level visibility

In addition to tests, CI Visibility provides visibility over the whole testing phase of your project.

### Compatibility

Not every language supported by CI Visibility has support for test suite level visibility:

* [Swift][2] has complete support since `dd-sdk-swift-testing>=2.1.0`.
* [.NET][3] has complete support since `dd-trace-dotnet>2.16.0`.
* [JavaScript][4] has limited support since `dd-trace-js>=3.3.0`.
* [Java][5] has complete support since `dd-trace-java>=1.12.0`.
* [JUnit report uploads][6] has complete support since `datadog-ci>=2.17.0`.
* [Python][7] has complete support since `dd-trace-py>=1.14.0`

## Use CI tests data

{{% ci-information-collected %}}

If [Intelligent Test Runner][13] is enabled for .NET, JavaScript, or Swift, [code coverage information][12], including file names and line numbers covered by each test, are collected from your projects.

When creating a [dashboard][8] or a [notebook][9], you can use test execution data in your search query, which updates the visualization widget options.

## Alert on test data

When you evaluate failed or flaky tests, or the performance of a CI test on the [**Test Runs** page][10], click **Create Monitor** to create a [CI Test monitor][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: /continuous_integration/tests/swift/#test-suite-level-visibility-compatibility
[3]: /continuous_integration/tests/dotnet/#test-suite-level-visibility-compatibility
[4]: /continuous_integration/tests/javascript/#test-suite-level-visibility-compatibility
[5]: /continuous_integration/tests/java/#compatibility
[6]: /continuous_integration/tests/junit_upload#test-suite-level-visibility-compatibility
[7]: /continuous_integration/tests/python/#compatibility
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: https://app.datadoghq.com/ci/test-runs
[11]: /monitors/types/ci/
[12]: /continuous_integration/guides/code_coverage/
[13]: /continuous_integration/intelligent_test_runner/