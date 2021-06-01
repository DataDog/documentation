---
title: Website Uptime monitoring with SLO
kind: guide
aliases:
    - /graphing/guide/uptime-percentage-widget
    - /dashboards/guide/uptime-percentage-widget
further_reading:
    - link: '/monitors/monitor_uptime_widget/'
      tag: 'Documentation'
      text: 'Monitor Uptime Widget'
    - link: '/synthetics/'
      tag: 'Documentation'
      text: 'Synthetic Monitoring'
---

## Overview

Maintaining service level agreements with external or internal customers often requires measuring uptime percentage. This guide shows you how to achieve this using Datadog [Synthetic Monitoring][1] and the [SLO widget][2]. It uses `http://example.com/` website as an example.

## Synthetic test creation

Create a new [Synthetic API test][3] upon `http://example.com/`:

1. [Go to the new Synthetic API test page][4].
2. Enter `http://example.com/` in the **URL** field.
3. Click **Test URL** to automatically populate assertions about the health of your website:

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_config.png" alt="Synthetic test configuration" >}}

4. Tweak those assertions to match your SLI and define your test retry policy, in this example if at least half of the locations fails, even after one retry, then we consider that the site is down;

    {{< img src="synthetics/guide/uptime_slo/synthetics_test_assertions.png" alt="Synthetic test assertions" >}}

5. Optionally - [Define a verbose notification message][5]:

    {{< img src="synthetics/guide/uptime_slo/synthetics_message.png" alt="Synthetic test message" >}}

## SLO widget configuration

### Create your SLO

1. [Create a new SLO][6] to track your website's uptime based on your Synthetic test results.
2. Select **Monitor based** and enter your Synthetic test name:

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="SLO configuration" >}}

3. Define the target you want to achieve:

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="SLO target" >}}

4. Finish your SLO configuration by setting a title and message to give more detail upon your SLO:

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="SLO notification" >}}

5. Click Save.

### Import your SLO in your Dashboard

1. [Create a new Dashboard][7] to host your SLO widget:
2. Drag and drop the SLO summary widget on your board.
3. Select the SLO that you defined just above:

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="SLO widget selection" >}}

4. Customize you SLO widget to match your needs:

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="SLO widget config" >}}

5. Finish by entering a descriptive title for your widget and click **Done** and voila:

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="Final Dashboard" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: /dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/list
[4]: https://dd-corpsite.datadoghq.com/synthetics/create
[5]: /monitors/notifications/
[6]: https://app.datadoghq.com/slo/new
[7]: https://app.datadoghq.com/dashboard/lists
