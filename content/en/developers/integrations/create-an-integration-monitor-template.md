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

[Datadog Monitors][1] continuously evaluate data (metrics, logs, events, and more) to detect conditions that indicate performance issues and availability risks. They act as proactive alerting tools that automatically notify users when behavior deviates from expected thresholds, enabling teams to take action before incidents impact customers.

For Technology Partners, monitors transform the telemetry your integration collects into actionable insights. When you package monitor templates, users can enable them directly from the [**Monitors > Templates**][2] page for faster setup and time to value.

At least one monitor template is required if your integration collects metrics. 

## Building a monitor template
These steps assume you've [joined the Datadog Partner Network][3], have access to a partner developer organization, and have already [created a listing in the Developer Platform][4]. 

1. [Determine which telemetry you want to monitor](#determine-which-telemetry-to-monitor).
2. [Create and configure monitors][5] in your partner developer organization.
3. [Test your monitors](#test-your-monitors).
4. [Import your monitors into the Developer Platform](#import-your-monitors). 

### Determine which telemetry to monitor
Start by reviewing the [full list of monitor types][6] to understand what kinds of telemetry you can alert on. As the product owner, you likely already know what's most valuable for users to track, but the examples below can help you identify common use cases.

#### Track your service's RED (rate, errors, duration) metrics
- Rate: Monitor the number of requests your service receives.
- Errors: Track how many of those requests fail.
- Duration: Measure how long those requests take (latency).

#### Monitor your infrastructure 
- CPU utilization: Track CPU usage to ensure they're neither under nor over-utilized, to prevent system slowdowns or application failures.
- Memory Utilization: Monitor how much system memory is being used to detect and prevent issues like memory leaks or crashes.
- Storage: Monitor disk space to prevent problems such as data loss, service interruptions, or write failures.

## Test your monitors

1. Ingest telemetry that triggers your monitor.
2. Navigate to the [Monitor list][7] page and select your monitor.
3. Confirm that your monitor is triggered as expected. 
    - Use [Status Events][8] to view when your monitor was triggered and review details for each event.
    
## Import your monitors
After your monitors are created and tested, import them into the Developer Platform.

{{< img src="developers/integrations/content_tab.png" alt="The Content tab in the Integration Developer Platform" style="width:100%;" >}}

1. In the Developer Platform, go to the **Content** tab.
2. Click **Import Monitor**.
3. Search for and select you the monitors you created. You can include up to 10 monitors per integration.
4. For each monitor, provide the following:
    - **Display Name**: A concise title that clearly communicates what the alert covers. Use active voice (for example, Database latency exceeds threshold).
    - **Description**: A short explanation that helps users decide whether the monitor is relevant to them. Describe why this alert matters and what impact it addresses.
    <div class="alert alert-info">These values are displayed on the [**Monitors > Templates**][2] page.</div>
5. Click **Import**, then **Save Changes**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/monitors/
[2]: https://app.datadoghq.com/monitors/templates
[3]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[4]: /developers/integrations/build_integration/#create-a-listing
[5]: https://docs.datadoghq.com/getting_started/monitors/#create-a-monitor
[6]: https://docs.datadoghq.com/monitors/types/
[7]: https://app.datadoghq.com/monitors/manage
[8]: https://docs.datadoghq.com/monitors/status/events/
