---
title: Using Synthetic Test Monitors
kind: guide
description: Learn about Synthetic monitors created with your Synthetic tests. 
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
- link: "/synthetics/metrics/"
  tag: "Documentation"
  text: "Learn about Synthetic Monitoring metrics"
---

## Overview

When you create a Synthetic test, Datadog automatically creates an associated monitor. You can set up notifications when the Synthetic test monitor alerts.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic test monitor" style="width:100%;">}}

## Create a Synthetic test monitor

<div class="alert alert-info">You cannot create or import a Synthetic test monitor in <a href="/monitors/create/">Monitors</a>.</div>

Create a monitor in the **Configure the monitor for this test** section to send notifications when a Synthetic test is failing. Monitors are associated with the Synthetic test you create and link to the alerting conditions set in your Synthetic test configuration. To use monitor attribute and tag variables, create a [metric monitor][1].

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

Customize the monitor name to search for it on the [**Manage Monitors**][2] page. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar. You can use monitor [conditional variables][3] to characterize the notification message based on test state. 

The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][4].

If you have multiple layers of notifications (for example, notifying more teams the longer a Synthetic test is alerting), Datadog recommends enabling [renotification][5] on your Synthetic monitors.

## Tailor monitor notifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. To notify Team B only on subsequent alerts after the first alert, surround the notification to Team B with `{{#is_renotify}}` and `{{/is_renotify}`. Use [conditional variables][3] to further characterize the notification message based on monitor attributes. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable the alerting monitor to renotify, click the toggle left of `If this monitor stays in alert status renotify every` and select a time option from the dropdown menu.

## Enrich your notification message with Synthetic test attributes

You can include Synthetic test attributes in your notification message. Combined with [monitor conditional variables][9], you can route notification messages to specific teams based on status code, test type, or step name.

The following attribute objects are available:

| Attribute      | What it contains                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{synthetics.attributes}}`            | Information relating to the test configuration, including location and test type. For example `{ "checkType": "browser", "result": { "result": { ... }}, "v": 0, "location": "aws:eu-central-1", "type": "result"}`                                              |
| `{{synthetics.run}}`            | Information relating to the alerting test run, including overall result, errors, and and failing step details. For example `{ "runType": 0, "timeToInteractive": 373, "eventType": "finished", "error": "Element's content should contain given value.", "stepDetails": [ { "duration": 957, "allowFailure": false, "vitalsMetrics": [], "browserErrors": [],"stepId": 3211623, "description": "First step", "isCritical": true, "type": "click", "publicId": "dcr-md7-z8y", "url": "https://example.com/", "skipped": false }], "browserType": "firefox", "duration": 63297, "mainDC": "us1.staging", "startUrl": "https://example.com", "subtype": null, "failure": { "code": "ASSERTION_FAILURE", "message": "Element's content should contain given value." }, "browserVersion": "106.0.3", "passed": false, "device": { "browser": "firefox", "name": "Laptop Large", "width": 1440, "userAgent": "Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/106.0.3 DatadogSynthetics", "id": "firefox.laptop_large", "isMobile": false, "height": 1100 }`                                        |

For example, if you wanted to notify different teams based on location or environment, you could achieve that through a combination of conditional variables and test attributes:

```
{{#is_match "synthetics.attributes.startURL" "https://shopist.io"}}
@slack-prod Production is down
{{/is_match}}

{{#is_match "synthetics.attributes.startURL" "https://staging.shopist.io"}}
@slack-staging Staging is down
{{/is_match}}

{{#is_match "synthetics.attributes.location" "aws:eu-central-1"}}
@slack-de-team Frankfurt is experiencing problems
{{/is_match}}
```

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][6] for visibility into your applications' and services' uptime, you can update the status of your systems with Synthetic test monitor notifications.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

1. See the [Statuspage documentation][7] to generate a component-specific email address.
2. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Fill out the monitor notification section and add a summary in the monitor name. For example, `Shopist Checkout Functionality`.
5. Once you have configured your monitor, click **Save & Exit**.

For more information, see [Integrating Monitors with Statuspage][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create/types/metric/
[2]: /monitors/manage/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /monitors/notify/#integrations/
[5]: /monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/guide/integrate-monitors-with-statuspage/
[9]: /monitors/notify/variables
