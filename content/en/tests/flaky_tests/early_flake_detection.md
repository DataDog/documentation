---
title: Early Flake Detection
description: Detect flakiness before it impacts your default branch using Early Flake Detection.
aliases:
  - /tests/early_flake_detection
  - /tests/flaky_test_management/early_flake_detection
further_reading:
  - link: "/tests"
    tag: "Documentation"
    text: "Learn about Test Optimization"
  - link: "/tests/flaky_test_management"
    tag: "Documentation"
    text: "Learn about Flaky Test Management"
  - link: "/pr_gates"
    tag: "Documentation"
    text: "Learn about PR Gates"
---

## Overview

Early Flake Detection is Datadog's test flakiness solution that enhances code quality by identifying [flaky tests][1] early in the development cycle. For more information about flaky tests, see [Flaky Test Management][2].

By running newly added tests multiple times, Datadog can detect flakiness before these tests are merged into the default branch. A study shows that up to [75% of flaky tests][3] can be identified with this approach.

Known Tests
: Datadog's backend stores unique tests for a given test service. Before a test session runs, the Datadog library fetches the list of these known tests.

Detection of New Tests
: If a test is not in the list of known tests, it is considered **new** and is automatically retried up to ten times.

Flakiness Identification
: Running a test multiple times helps uncover issues like race conditions, which may cause the test to pass and fail intermittently. If any of the test attempts fail, the test is automatically tagged as flaky.

Running a test multiple times increases the likelihood of exposing random conditions that cause flakiness. Early Flake Detection helps ensure that only stable, reliable tests are integrated into the default branch:

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation_new.png" alt="How Early Flake Detection works in your commits" style="width:100%">}}

You can choose to block the merge of the feature branch with a [PR Gate][4]. For more information, see the [PR Gates documentation][5].

## Setup

Before implementing Early Flake Detection, you must configure [Test Optimization][6] for your development environment. If you are reporting data through the Datadog Agent, use v6.40 or 7.40 and later.

### Configuration

After you have set up your Datadog library for Test Optimization, you can configure Early Flake Detection from the [Test Optimization Settings page][7].

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Early flake Detection in Test Service Settings." style="width:100%" >}}

1. Navigate to [**Software Delivery** > **Test Optimization** > **Settings**][7].
1. Click **Configure** on the Early Flake Detection column for a test service.
1. Click the toggle to enable Early Flake Detection.

## Compatibility
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

The required test framework and dd-trace versions are:

`dd-trace-js`:
* `>=5.23.0` for the 5.x release.
* `>=4.47.0` for the 4.x release.

The test framework compatibility is the same as [Test Optimization Compatibility][1], with the exception of `playwright`, which is only supported from `>=1.38.0`.

[1]: /tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

The test framework compatibility is the same as [Test Optimization Compatibility][2], with the exception of `Scala Weaver`.

[2]: /tests/setup/java/#compatibility
{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{% tab "Python" %}}

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

{{% /tab %}}

{{% tab "Ruby" %}}

`datadog-ci-rb>=1.5.0`

{{% /tab %}}

{{% tab "Go" %}}

`orchestrion >= 0.9.4 + dd-trace-go >= 1.69.1`

{{% /tab %}}

{{% tab "Swift" %}}

`dd-sdk-swift-testing>=2.5.2`

{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-danger">
Older tracer versions limit the number of known tests fetched to 500k. If you need to fetch more than 500k known tests, update to the latest tracer version.
</div>

## Explore results in the Test Optimization Explorer

You can use the following facets to query sessions that run Early Flake Detection and new tests in the [Test Optimization Explorer][8].

* **Test Session**: Test sessions running Early Flake Detection have the `@test.early_flake.enabled` tag set to `true`.
* **New Tests**: New tests have the `@test.is_new` tag set to `true`, and retries for this test have the `@test.is_retry` tag set to `true`.

## Troubleshooting

If you suspect there are issues with Early Flake Detection, navigate to the [Test Optimization Settings page][7], look for your repository, and click **Configure**. Disable Early Flake Detection by clicking on the toggle.

### A new test is not being retried

This could be caused by a couple of reasons:

* This test has ran previously.
* This test is slower than five minutes. There is a mechanism not to run Early Flake Detection on tests that are too slow, since retrying these tests could cause significant delays in CI pipelines.

### A test was retried that is not new

Older tracer versions limit the number of known tests fetched to 500k. If your repository has more than 500k known tests, some tests might be incorrectly identified as new. To prevent this, update to the latest tracer version.

If a test hasn't been active for more than 14 days, it might be re-identified as new. 

If the Datadog library can't fetch the full list of known tests, the Datadog library may retry tests that are not new. There is a mechanism to prevent this error from slowing down the CI pipeline, but if it happens, contact [Datadog Support][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/#flaky-test
[2]: /tests/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /pr_gates/
[5]: /pr_gates/setup
[6]: /tests
[7]: https://app.datadoghq.com/ci/settings/test-optimization
[8]: /tests/explorer/
[9]: /help/
