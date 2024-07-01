---
title: Monitor Website Uptime With SLOs
kind: guide
aliases:
    - /graphing/guide/uptime-percentage-widget
    - /dashboards/guide/uptime-percentage-widget
further_reading:
    - link: '/monitors/monitor_uptime_widget/'
      tag: 'Documentation'
      text: 'Monitor Uptime Widget'
    - link: '/getting_started/synthetics/'
      tag: 'Documentation'
      text: 'Getting Started with Synthetic Monitoring'
---

## Overview

Maintaining service level agreements with external or internal customers often requires measuring uptime percentage. 

This guide shows you how to achieve that using Datadog [Synthetic Monitoring][1] and the [SLO widget][2] with an example website, `http://example.com/`.

## Create a Synthetics test

To create a [Synthetic API test][3] with `http://example.com/`, see [Create a single API test][4].

When you click **Test URL**, assertions about your website's health populate. Adjust the assertions to match your SLI.

## Configure a SLO widget

### Create your SLO

1. [Create a new SLO][5] to track your website's uptime based on your Synthetic test results.
2. Select **Monitor Based** and enter your Synthetic test name.

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="SLO configuration" >}}

3. Define the target you want to achieve.

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="SLO target" >}}

4. Enter a name, message, and tags to provide additional details for your SLO.

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="SLO notification" >}}

5. Click **Save**.

### Import your SLO in your Dashboard

1. [Create a new Dashboard][6] to host your SLO widget.
2. Drag and drop the SLO widget on your board.
3. Select the SLO that you defined above.

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="SLO widget selection" >}}

4. Customize your SLO widget to match your needs.

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="SLO widget config" >}}

5. Enter a descriptive title for your widget and click **Done**.

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="Final Dashboard" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: /dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /getting_started/synthetics/api_test#define-request
[5]: https://app.datadoghq.com/slo/new
[6]: https://app.datadoghq.com/dashboard/lists
