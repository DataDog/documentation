---
title: Early Flake Detection
kind: documentation
description: Detect flakiness before it reaches the default branch
aliases:
- /continuous_integration/tests/early_flake_detection/
further_reading:
  - link: "/tests"
    tag: "Documentation"
    text: "Learn about Test Visibility"
  - link: "/quality_gates"
    tag: "Documentation"
    text: "Learn about Quality Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Early Flake Detection is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Early Flake Detection is in public beta.
{{< /callout >}}

## Overview

Early Flake Detection is Datadog's mechanism to tackle test flakiness. By identifying tests that are newly added and running them multiple times, Datadog can detect flakiness before it reaches the default branch. A study shows that up to [75% of flaky tests][1] can be identified this way.

## How it works

* Datadog's backend automatically stores unique tests for a given test service. These are **known tests**.
* Before a test session runs, the Datadog library fetches the list of known tests.
* If a test is in this list, it's executed normally.
* If a test is **not** in this list, the test is considered **new**, and the Datadog library will automatically retry the test up to 10 times.

Running a test multiple times helps detecting potential issues. If any of the test attempts fail, Datadog automatically tags it as flaky. You may then choose to block the merge of the feature branch with a [Quality Gate][2].

### Why does running a test multiple times help detect issues?

A [flaky test][3] is a test that both passes and fails for the same commit (same code). This behavior is normally caused by some random component, such as a race condition caused by an unexpected drop in network speed. Running the test multiple times increases the likelihood of this random component to show up.


### How are known tests defined?

The list of known tests is generated from tests run in default and default-like branches. These are [**Excluded Branches from Early Flake Detection**][4].

Early Flake Detection normally works as follows:

* A developer working in a feature branch writes a new test, commits and pushes the changes.
* This test is retried automatically for this commit and every new commit in the feature branch, until the branch is merged.
* After the feature branch is merged, that new test is considered part of the known tests for the test service. The test is no longer treated as new.

{{< img src="continuous_integration/early_flake_detection_commits.png" alt="How Early Flake Detection works in your commits.">}}

### Excluded Branches from Early Flake Detection

The Excluded Branches will not have any of their tests retried by Early Flake Detection.

Additionally, what Early Flake Detection considers a new test is based on the tests that run in these branches. If a test has run in any of the Excluded Branches from Early Flake Detection, it is **not** considered new anymore.

## Set up a Datadog library
Before setting up Early Flake Detection, you must configure [Test Visibility][5] for your particular language. If you are reporting data through the Agent, use v6.40 or 7.40 and later.

## Configuration
After you have set up your Datadog library for Test Visibility, configure Early Flake Detection from the [Test Service Settings page][6]:

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Early flake Detection in Test Service Settings.">}}

Click on **Configure** in the Early Flake Detection column to see this modal:

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Early flake Detection configuration modal.">}}

In this modal you can toggle the status of Early Flake Detection and add a list of [**Excluded Branches from Early Flake Detection**][4] for that test service.

### How to check that new tests are detected

There are facets to query sessions that run Early Flake Detection and new tests.

#### Test session

Test sessions running Early Flake Detection have the `@test.early_flake.enabled` tag set to `true`.

#### Test

New tests have the `@test.is_new` tag set to `true`.

Additionally, retries for this test have the `@test.is_retry` tag set to `true`.


## Troubleshooting

If you suspect there are issues with Early Flake Detection, go to the [Test Service Settings][6], look for your test service, and click **Configure**. Disable Early Flake Detection by clicking on the toggle.

### A new test is not being retried

This could be caused by a couple of reasons:

* This test has already run in an excluded branch, such as `staging`, `main` or `preprod`.
* This test is slower than 5 minutes. There is a mechanism not to run Early Flake Detection on tests that are too slow, since retrying these tests could cause significant delays in CI pipelines.


### A test was retried that is not new

If the Datadog library can't fetch the full list of known tests, the Datadog library may retry tests that are not new.

There is a mechanism to prevent this error from slowing down the CI pipeline, but if it happens, contact the support team at [Datadog Help][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[2]: /quality_gates/
[3]: /glossary/#flaky-test
[4]: /tests/early_flake_detection/#excluded-branches-from-early-flake-detection
[5]: /continuous_integration/tests
[6]: https://app.datadoghq.com/ci/settings/test-service
[7]: https://docs.datadoghq.com/help/
