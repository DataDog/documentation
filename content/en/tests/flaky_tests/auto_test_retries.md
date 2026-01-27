---
title: Auto Test Retries
description: Retry failing test cases to avoid failing the build because of flaky tests.
aliases:
  - /tests/auto_test_retries
  - /tests/flaky_test_management/auto_test_retries
further_reading:
  - link: "/tests"
    tag: "Documentation"
    text: "Learn about Test Optimization"
  - link: "/tests/flaky_test_management"
    tag: "Documentation"
    text: "Learn about Flaky Test Management"
---

## Overview

Test Optimization's Auto Test Retries feature allows retrying failing tests up to N times to avoid failing your build due to flaky tests:
a failing test case is retried either until it passes successfully or until there are no more retry attempts left (in which case the build fails).

## Setup

Ensure [Test Optimization][1] is configured for your test runs.

{{< tabs >}}

{{% tab "Java" %}}

### Compatibility

`dd-trace-java >= 1.32.0`

The test framework compatibility is the same as [Test Optimization Compatibility][3], with the exception of `Scala Weaver`.

### Configuration
After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - if this environment variable is set to `true`, only the test cases that Test Optimization considers [flaky][2] are retried.
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - can be set to any non-negative number to change the maximum number of retries per test case.

[1]: https://app.datadoghq.com/ci/settings/test-optimization
[2]: /tests/flaky_test_management/
[3]: /tests/setup/java/#compatibility
{{% /tab %}}

{{% tab "JavaScript" %}}

### Compatibility

`dd-trace-js >= v5.74.0`

### Configuration

After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to 0 or false to explicitly disable retries even if the remote setting is enabled (default: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).

[1]: https://app.datadoghq.com/ci/settings/test-optimization

{{% /tab %}}

{{% tab "Ruby" %}}

### Compatibility

`datadog-ci-rb >= 1.4.0`

### Configuration

After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to 0 or false to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibility

`dd-trace-dotnet >= 3.4.0`

### Configuration

After you set up Test Visibility, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries enabled in Test Service Settings." style="width:100%" >}}

By default, the feature retries any failing test case up to 5 times.
Customize the Auto Test Retries with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab "Go" %}}

### Compatibility

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.0`

### Configuration

After you set up Test Visibility, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries enabled in Test Service Settings." style="width:100%" >}}

By default, the feature retries each failing test case up to 5 times.
Customize the Auto Test Retries with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab "Python" %}}

### Compatibility

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

### Configuration

After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to five times. Tests that originally fail either the original setup, teardown, or fixtures in Pytest, are not retried.

You can fine tune this behavior with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: `true`)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: `1000`)

[1]: https://app.datadoghq.com/ci/settings/test-optimization

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibility

`dd-sdk-swift-testing >= 2.5.2`

### Configuration

After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings-2.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to 0 or false to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{< /tabs >}}

### Failed Test Replay

<div class="alert alert-info">Failed Test Replay is only supported for Java, JavaScript, and .NET.</a></div>

In addition to automatically retrying failed tests, Failed Test Replay allows you to see local variable data in the topmost frame of the test error's stack trace. Enable this feature with the **Failed Test Replay** toggle.

#### Create a logs index

Failed Test Replay creates logs that are sent to Datadog and appear alongside your regular application logs.

If you use [Exclusion filters][5], ensure Failed Test Replay logs are not filtered:

1. Create a logs index and [configure it][6] to the desired retention with **no sampling**.
2. Set the filter to match on the `source:dd_debugger` tag. All Failed Test Replay logs have this source.
3. Ensure that the new index takes precedence over any other index with filters that match that tag, because the first match wins.

After you enable this feature, you can see local variable data in failed tests:

{{< img src="continuous_integration/failed_test_replay_local_variables.png" alt="Failed Test Replay." style="width:100%" >}}

#### Known limitations

[jest-image-snapshot][7] is incompatible with `jest.retryTimes` unless `customSnapshotIdentifier` is passed (see [jest-image-snapshot docs][8]) to `toMatchImageSnapshot`. Therefore, auto test retries do not work unless `customSnapshotIdentifier` is used.

## Explore results in the Test Optimization Explorer

You can query the retried tests in the [Test Optimization Explorer][2]: they have the `@test.is_retry` tag set to `true` (some of them may also have the `@test.is_new` set to `true`, which indicates they have been retried by the [Early Flakiness Detection][3] feature).

## Troubleshooting

If you suspect there are any issues with Auto Test Retries, navigate to the [Test Service Settings page][4], look for your test service, and click **Configure**. Disable Auto Test Retries by clicking on the toggle.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: /tests/explorer/
[3]: /tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/test-optimization
[5]: /logs/log_configuration/indexes/#exclusion-filters
[6]: /logs/log_configuration/indexes/#add-indexes
[7]: https://www.npmjs.com/package/jest-image-snapshot
[8]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes
