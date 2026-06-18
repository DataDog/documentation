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

After you set up your Datadog library for Test Optimization, configure Early Flake Detection in [**CI/CD Optimization settings**][7]. You can apply the setting at the organization, repository, or test service level.

{{< img src="continuous_integration/early_flake_detection_test_settings-1.png" alt="Early Flake Detection toggle in CI/CD Settings." style="width:100%" >}}

1. Open [**CI/CD Optimization** > **Settings** > **Repositories**][7].
1. Choose where to apply the setting:
   - Select the **Organization** tab to update the organization default.
   - Select the **Repository-specific** tab to override the default for a single repository, or to apply an override to one of its test services.
1. Under **Prevention**, toggle **Early Flake Detection** on.

## Compatibility
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

`dd-trace-js>=5.23.0`

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

<div class="alert alert-warning">
Test services with more than 100,000 known tests require a Datadog library version that supports pagination on the known tests endpoint. The minimum versions above cover EFD's initial release; pagination support arrived later. Without it, the library cannot fetch the known tests baseline and Early Flake Detection does not run for that session.
</div>

The following Datadog library versions add pagination support on the known tests endpoint:

| Library                | Minimum version |
| ---------------------- | --------------- |
| `dd-trace-js`          | 5.94.0          |
| `dd-trace-java`        | 1.60.0          |
| `dd-trace-dotnet`      | 3.42.0          |
| `ddtrace` (Python)     | 4.6.0           |
| `datadog-ci` (Ruby)    | 1.27.0          |
| `dd-trace-go/v2`       | 2.8.0           |
| `dd-sdk-swift-testing` | 2.6.7           |

## Explore results in the Test Optimization Explorer

You can use the following facets to query sessions that run Early Flake Detection and new tests in the [Test Optimization Explorer][8].

* **Test Session**: Test sessions running Early Flake Detection have the `@test.early_flake.enabled` tag set to `true`.
* **New Tests**: New tests have the `@test.is_new` tag set to `true`, and retries for this test have the `@test.is_retry` tag set to `true`.

## Troubleshooting

If you suspect there are issues with Early Flake Detection, open [**CI/CD Optimization settings**][7], find your repository or test service, and toggle Early Flake Detection off.

### A new test is not being retried

This could be caused by a couple of reasons:

* This test has ran previously.
* This test is slower than five minutes. There is a mechanism not to run Early Flake Detection on tests that are too slow, since retrying these tests could cause significant delays in CI pipelines.

Finally, if your test service has more than 100,000 known tests and your Datadog library version does not support pagination on the known tests endpoint, the library cannot fetch the known tests baseline and no tests are identified as new. To prevent this, update to the latest tracer version.

### A test was retried that is not new

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
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /tests/explorer/
[9]: /help/
