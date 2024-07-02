---
title: Early Flake Detection
kind: documentation
description: Detect flakiness before it impacts your default branch using Early Flake Detection.
further_reading:
  - link: /tests
    tag: Documentation
    text: Learn about Test Visibility
  - link: /tests/guides/flaky_test_management
    tag: Documentation
    text: Learn about Flaky Test Management
  - link: /quality_gates
    tag: Documentation
    text: Learn about Quality Gates
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Early Flake Detection is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Early Flake Detection is in public beta.
{{< /callout >}}

## Overview

Early Flake Detection is Datadog's test flakiness solution that enhances code quality by identifying [flaky tests][1] early in the development cycle. For more information about flaky tests, see [Flaky Test Management][2].

By running newly added tests multiple times, Datadog can detect flakiness before these tests are merged into the default branch. A study shows that up to [75% of flaky tests][3] can be identified with this approach.

Known Tests
: Datadog's backend stores unique tests for a given test service. Before a test session runs, the Datadog library fetches the list of these known tests.

Detection of New Tests
: If a test is not in the list of known tests, it is considered **new** and is automatically retried up to ten times.

Flakiness Identification
: Running a test multiple times helps uncover issues like race conditions, which may cause the test to pass and fail intermittently. If any of the test attempts fail, the test is automatically tagged as flaky.

Running a test multiple times increases the likelihood of exposing random conditions that cause flakiness. Early Flake Detection helps ensure that only stable, reliable tests are integrated into the main branch.

You can choose to block the merge of the feature branch with a [Quality Gate][4]. For more information, see the [Quality Gates documentation][5].

## セットアップ

Before implementing Early Flake Detection, you must configure [Test Visibility][6] for your development environment. If you are reporting data through the Datadog Agent, use v6.40 or 7.40 and later.

### 構成

After you have set up your Datadog library for Test Visibility, you can configure Early Flake Detection from the [Test Service Settings page][7].

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Early flake Detection in Test Service Settings." style="width:100%" >}}

1. Navigate to [**Software Delivery** > **Test Visibility** > **Settings**][7].
1. Click **Configure** on the Early Flake Detection column for a test service.
1. Click the toggle to enable Early Flake Detection and add or modify the list of [**Excluded Branches from Early Flake Detection**](#manage-excluded-branches).

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Enabling Early Flake Detection and defining excluded branches in the test service configuration" style="width:60%">}}

## Compatibility
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

The required test framework and dd-trace versions are:

`dd-trace-js`:
* `>=5.12.0` for the 5.x release.
* `>=4.36.0` for the 4.x release.
* `>=3.57.0` for the 3.x release.

The test framework compatibility is the same as [Test Visibility Compatibility][1], with the exception of `playwright`, which is only supported from `>=1.38.0`.

[1]: /tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{< /tabs >}}


## Manage Excluded Branches

Excluded Branches will not have any tests retried by Early Flake Detection. Tests run in these branches are not considered new for the purposes of Early Flake Detection.

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation.png" alt="How Early Flake Detection works in your commits" style="width:100%">}}

You can manage the list of excluded branches on the [Test Service Settings page][7], ensuring that the feature is tailored to your specific workflow and branch structure.

## Explore results in the Test Visibility Explorer

You can use the following facets to query sessions that run Early Flake Detection and new tests in the [Test Visibility Explorer][8].

* **Test Session**: Test sessions running Early Flake Detection have the `@test.early_flake.enabled` tag set to `true`.
* **New Tests**: New tests have the `@test.is_new` tag set to `true`, and retries for this test have the `@test.is_retry` tag set to `true`.

## Troubleshooting

If you suspect there are issues with Early Flake Detection, navigate to the [Test Service Settings page][7], look for your test service, and click **Configure**. Disable Early Flake Detection by clicking on the toggle.

### A new test is not being retried

This could be caused by a couple of reasons:

* This test has already run in an excluded branch, such as `staging`, `main`, or `preprod`.
* This test is slower than five minutes. There is a mechanism not to run Early Flake Detection on tests that are too slow, since retrying these tests could cause significant delays in CI pipelines.

### A test was retried that is not new

If the Datadog library can't fetch the full list of known tests, the Datadog library may retry tests that are not new. There is a mechanism to prevent this error from slowing down the CI pipeline, but if it happens, contact [Datadog Support][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/#flaky-test
[2]: /tests/guides/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /quality_gates/
[5]: /quality_gates/setup
[6]: /tests
[7]: https://app.datadoghq.com/ci/settings/test-service
[8]: /tests/explorer/
[9]: /help/
