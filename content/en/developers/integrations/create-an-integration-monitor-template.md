---
aliases:
- /developers/integrations/create-an-integration-recommended-monitor
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentation
  text: Configure Monitors
title: Create a Monitor Template
description: Learn how to create a monitor for your integration.
---
## Overview

This page guides Technology Partners through creating and packaging monitor templates with their official Datadog integration.

[Datadog Monitors][1] continuously evaluate data (such as metrics, logs, and events) to detect conditions that indicate performance issues and availability risks. They act as proactive alerting tools that automatically notify users when behavior deviates from expected thresholds, enabling teams to take action before incidents impact customers.

For Technology Partners, monitors transform the telemetry your integration collects into actionable insights. When you package monitor templates, users can enable them directly from the [**Monitors > Templates**][2] page for faster setup and time to value.

At least one monitor template is required if your integration collects metrics. 

## Building a monitor template
These steps assume you've [joined the Datadog Partner Network][3], have access to a partner developer organization, and have already [created a listing in the Developer Platform][4]. 

1. [Determine which telemetry you want to monitor](#determine-which-telemetry-to-monitor).
2. [Create and configure a monitor](#create-your-monitor) in your partner developer organization.
3. [Test your monitor](#test-your-monitor).
4. [Add your monitor to your integration](#add-your-monitor-to-your-integration). 

### Determine which telemetry to monitor
Start by reviewing the [full list of monitor types][6] to understand what kinds of telemetry you can alert on. Determine the insights that matter most to your users. Refer to the examples below for common use cases and examples.

#### Monitor your service's RED (rate, errors, duration) metrics
- **Rate**: Monitor the number of requests your service receives.
- **Errors**: Track how many of those requests fail.
- **Duration**: Measure how long those requests take (latency).

#### Monitor your infrastructure 
- **CPU utilization**: Track CPU usage to ensure they're neither under nor over-utilized, to prevent system slowdowns or application failures.
- **Memory utilization**: Monitor how much system memory is being used to detect and prevent issues like memory leaks or crashes.
- **Storage**: Monitor disk space to prevent problems such as data loss, service interruptions, or write failures.

#### Monitor your logs
- **Error spikes**: Alert when error logs exceed a threshold, such as repeated `connection refused` or `timeout` messages within a short period.
- **Missing activity**: Detect when expected logs stop appearing, indicating a stalled process or failed service.

### Create your monitor

[Create and configure your monitor][5] within your partner developer organization. These monitors serve as reusable templates that integration users can enable directly in their own Datadog organizations.

See the following best practices for your monitor template's title and description:

#### Write a title for your monitor template

The title allows users to understand the underlying failure mode the alert is covering.
- Use the active voice and start with an object followed by a verb. 
- Do not use template variables.

| Needs revision                                       | Better                                 | Best                                        |
| -----------                                          | -----------                            | -----------                                 |
|High Unacknowledged Messages reported on {{host.name}}| High Unacknowledged Messages reported  |Unacknowledged Messages are higher than usual|

#### Write a description for your monitor template

The description provides extra context around the failure mode and also about the impact this mode can have on the system. It should allow users to understand at a glance whether it is relevant or not for them to create a monitor out of it. The description should not be a copy of the title. 
- Define the problem stated by the title.
- Answer why this is an issue worth alerting on.
- Describe the impact of the problem.

| Needs revision                                         | Better                                       | Best                                    |
| -----------                                          | -----------                                  | -----------                             |
|Notify your team when unacked message are high. | Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages.|Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages to avoid potential bottlenecks which could lead to delays in message processing.|

### Test your monitor

1. Ingest telemetry that triggers your monitor.
2. Navigate to the [Monitor list][7] page and select your monitor.
3. Confirm that your monitor is triggered as expected. Use [Status Events][8] to view when your monitor was triggered and review details for each event.
    
## Add your monitor to your integration
After you've created and tested your monitor, add it to your listing in the Developer Platform. When your integration is published, the monitor becomes a searchable template linked to your integration. 

{{< img src="developers/integrations/content_tab.png" alt="The Content tab in the Integration Developer Platform" style="width:100%;" >}}

1. In the Developer Platform, go to the **Content** tab.
2. Click **Import Monitor**.
3. Search for and select the monitor you created. You can include up to 10 monitors per integration.
4. For each monitor, provide a **Display Name** and **Description**. These appear on the [**Monitors > Templates**][2] page:
    - **Display Name**: A concise title that clearly communicates what the alert covers. Use active voice (for example, `Database latency exceeds threshold`).
    - **Description**: A short explanation that helps users decide whether the monitor is relevant to them. Describe why this alert matters and what impact it addresses.
5. Click **Import**, then **Save Changes**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: https://app.datadoghq.com/monitors/templates
[3]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[4]: /developers/integrations/build_integration/#create-a-listing
[5]: /getting_started/monitors/#create-a-monitor
[6]: /monitors/types/
[7]: https://app.datadoghq.com/monitors/manage
[8]: /monitors/status/events/
