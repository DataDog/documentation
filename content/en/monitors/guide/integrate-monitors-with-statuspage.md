---
title: Integrating Monitors With Statuspage
kind: guide
description: Learn how to integrate Datadog monitors with Atlassian Statuspage.
further_reading:
- link: '/integrations/statuspage'
  tag: 'Documentation'
  text: 'Learn about the Statuspage integration'
- link: '/synthetics/guide/synthetic-test-monitors/'
  tag: 'Documentation'
  text: 'Learn about Synthetic test monitors'
---

## Overview

[Atlassian Statuspage][1] is a status and incident management tool that provides visibility into your applications' and services' uptime. A status page can display custom metrics and events from Datadog, and you can update the status of your systems with Datadog monitor notifications.

## Add Statuspage alerts as Datadog events

You can configure the [Statuspage integration][2] to track Statuspage alerts in the [Events Explorer][3].

1. Navigate to [Integrations][4] and search for `statuspage` from the list of integrations.
2. Select the StatusPage Integration tile and click **Add New**.
3. Add the status URL and custom tags you want to monitor, for example: `https://status.datadoghq.com` or `https://datadogintegrations.statuspage.io/` with `datadog`, `test`, and `test1` tags. You must include at least one custom tag per page.
3. Click the **Save** icon. 

After five minutes, you should see monitor alerts from Statuspage appearing in the [Events Explorer][5]. Set a [time frame][6] on the top right corner and select **Statuspage** from the list of sources under **Core**.

{{< img src="monitors/guide/statuspage_integration_configuration.png" alt="Set up the Statuspage Integration in Datadog" style="width:90%;" >}}

Click on an alert to display a side panel containing the event's message, tags, and attributes.

{{< img src="monitors/guide/statuspage_side_panel.png" alt="An event's side panel containing the event's source, message, tags, and attributes" style="width:90%;" >}}

## Add Statuspage alerts in Datadog monitors

### Generate a Statuspage email address

See the [Statuspage documentation][7] to generate a component-specific email address.

### Create a metric monitor

To create a [metric monitor][8] that triggers on Statuspage alerts:

1. Navigate to [**Monitors** > **New Monitor**][9] and click **Metric**.
2. See the [Metric Monitor documentation][8] to select a detection method, define your metric(s), set alerting conditions, and configure advanced monitor options. 
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. In the **Configure notifications and automations** section, add the generated email address such as `@custom-statuspage-email@notifications.statuspage.io` in the message. This automatically populates the `Notify your services and your team members` field above **Renotification**.
5. Fill out the monitor notification section and add a summary in the monitor name such as `Shopist Checkout Functionality`.
6. Set the monitor renotification conditions and add tags such as `service:status-page`.
7. Select a team and assign a priority to the monitor.
8. Define the monitor's editing permissions and notification conditions.
9. Once you have configured your monitor, click **Create**. 

{{< img src="monitors/guide/statuspage_alerts_metric_monitor.png" alt="Creating a metric monitor containing alerts from Statuspage" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: /integrations/statuspage
[3]: /service_management/events/explorer/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/event/explorer
[6]: /dashboards/guide/custom_time_frames/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/types/metric/
[9]: https://app.datadoghq.com/monitors/create/metric
