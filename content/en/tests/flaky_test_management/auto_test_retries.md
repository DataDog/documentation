---
title: Auto Test Retries
description: Retry failing test cases to avoid failing the build because of flaky tests.
aliases:
  - /tests/auto_test_retries
further_reading:
  - link: "/tests"
    tag: "Documentation"
    text: "Learn about Test Optimization"
  - link: "/tests/flaky_test_management"
    tag: "Documentation"
    text: "Learn about Flaky Test Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Test Optimization's Auto Test Retries feature allows retrying failing tests up to N times to avoid failing your build due to flaky tests:
a failing test case is retried either until it passes successfully or until there are no more retry attempts left (in which case the build fails).

## Setup

Ensure [Test Optimization][1] is configured for your test runs.

### Compatibility

{{< tabs >}}

{{% tab "Java" %}}

`dd-trace-java >= 1.34.0`

{{% /tab %}}

{{% tab "JavaScript" %}}

`dd-trace-js >= v5.19.0` and `dd-trace-js >= v4.43.0`

{{% /tab %}}

{{% tab "Ruby" %}}

`datadog-ci-rb >= 1.4.0`

{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet >= 3.4.0`

{{% /tab %}}

{{% tab "Go" %}}

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

{{% /tab %}}

{{% tab "Python" %}}

`dd-trace-py >= 2.18.0` (`pytest >= 7.2.0`)

{{% /tab %}}

{{< /tabs >}}

### Configuration

{{< tabs >}}

{{% tab "Java" %}}
After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - if this environment variable is set to `true`, only the test cases that Test Optimization considers [flaky][2] are retried.
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - can be set to any non-negative number to change the maximum number of retries per test case.

[1]: /tests/explorer/
[2]: /tests/flaky_test_management/
{{% /tab %}}

{{% tab "Javascript" %}}
After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to 0 or false to explicitly disable retries even if the remote setting is enabled (default: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).

#### Known limitations

[jest-image-snapshot][2] is incompatible with `jest.retryTimes` unless `customSnapshotIdentifier` is passed (see [jest-image-snapshot docs][3]) to `toMatchImageSnapshot`. Therefore, auto test retries do not work unless `customSnapshotIdentifier` is used.

[1]: https://app.datadoghq.com/ci/settings/test-service
[2]: https://www.npmjs.com/package/jest-image-snapshot
[3]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes
{{% /tab %}}

{{% tab "Ruby" %}}
After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to 0 or false to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-service
{{% /tab %}}

{{% tab ".NET" %}}
After you set up Test Visibility, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries enabled in Test Service Settings." style="width:100%" >}}

By default, the feature retries any failing test case up to 5 times.
Customize the Auto Test Retries with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-service
{{% /tab %}}

{{% tab "Go" %}}

<div class="alert alert-info">Test optimization for Go is in Preview.</div>

After you set up Test Visibility, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries enabled in Test Service Settings." style="width:100%" >}}

By default, the feature retries each failing test case up to 5 times.
Customize the Auto Test Retries with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-service
{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">Auto Test Retries is available using the beta of the new pytest plugin. Set the <b>DD_PYTEST_USE_NEW_PLUGIN_BETA</b> environment variable to <b>true</b> to enable it.</div>

After you have set up Test Optimization, you can configure Auto Test Retries from the [Test Service Settings page][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times. Tests that originally fail either the original setup, teardown, or fixtures in Pytest, are not retried.

This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - set to `0` or `false` to explicitly disable retries even if the remote setting is enabled (default: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - a non-negative number to change the maximum number of retries per test case (default: `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - a non-negative number to set the maximum total number of failed tests to retry (default: `1000`)

[1]: https://app.datadoghq.com/ci/settings/test-service

{{% /tab %}}

{{< /tabs >}}

## Explore results in the Test Optimization Explorer

You can query the retried tests in the [Test Optimization Explorer][2]: they have the `@test.is_retry` tag set to `true` (some of them may also have the `@test.is_new` set to `true`, which indicates they have been retried by the [Early Flakiness Detection][3] feature).

## Troubleshooting

If you suspect there are any issues with Auto Test Retries, navigate to the [Test Service Settings page][4], look for your test service, and click **Configure**. Disable Auto Test Retries by clicking on the toggle.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: /tests/explorer/
[3]: /tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/test-service
