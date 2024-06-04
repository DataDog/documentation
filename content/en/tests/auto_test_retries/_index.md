---
title: Auto Test Retries
kind: documentation
description: Retry failing test cases to avoid failing the build because of flaky tests.
further_reading:
  - link: "/tests"
    tag: "Documentation"
    text: "Learn about Test Visibility"
  - link: "/tests/guides/flaky_test_management"
    tag: "Documentation"
    text: "Learn about Flaky Test Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Auto Test Retries is in public beta.
{{< /callout >}}

## Overview

Test Visibility's Auto Test Retries feature allows retrying failing tests up to N times to avoid failing your build due to flaky tests:
a failing test case is retried either until it passes successfully or until there are no more retry attempts left (in which case the build fails).

## Setup

Ensure [Test Visibility][1] is configured for your test runs.

### Compatibility

* dd-trace-java >= 1.34.0

### Configuration

After you have set up Test Visibility, you can configure Auto Test Retries from the [Test Service Settings page][2].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Auto Test Retries in Test Service Settings." style="width:100%" >}}

The default behavior of the feature is to retry any failing test case up to 5 times.
This behavior can be fine-tuned with the following environment variables:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - if this environment variable is set to `true`, only the test cases that Test Visibility considers [flaky][3] are retried.
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - can be set to any non-negative number to change the maximum number of retries per test case.

## Explore results in the Test Visibility Explorer

You can query the retried tests in the [Test Visibility Explorer][4]: they have the `@test.is_retry` tag set to `true` (some of them may also have the `@test.is_new` set to `true`, which indicates they have been retried by the [Early Flakiness Detection][5] feature).

## Troubleshooting

If you suspect there are any issues with Auto Test Retries, navigate to the [Test Service Settings page][2], look for your test service, and click **Configure**. Disable Auto Test Retries by clicking on the toggle.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/setup/
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: /tests/guides/flaky_test_management/
[4]: /tests/explorer/
[5]: /tests/early_flake_detection

