---
title: Bits Detection
description: "Learn how Bits Detection autonomously identifies critical services and manages monitor coverage as your system evolves."
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-detection/"
    tag: "Blog"
    text: "Autonomously monitor for impactful degradations with Bits Detection"
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Bits Detection is in Preview. Contact your Datadog representative to request access.
{{< /callout >}}

## Overview

Monitoring coverage drifts over time. As engineers add endpoints, move dependencies, and change user flows, monitors keep reflecting the system as it was. A service can appear healthy at the top level while one critical path is failing. Bits Detection identifies which endpoints need coverage, sets detection logic from observed production behavior, and keeps coverage current without your team manually creating, tuning, and maintaining every monitor.

When Bits Detection flags an issue, it points to the affected endpoint and related telemetry as the starting point for triage. It is the first step in the Bits AI workflow, which continues through investigation with [Bits Investigation][4] to root cause analysis and remediation.

## Enable Bits Detection

<div class="alert alert-danger">Bits Detection is in Preview. Contact your Datadog representative to request access.</div>

After you enable Bits Detection, it initializes monitoring for the 100 most critical services in your environment, based on service telemetry, dependencies, ownership metadata, recent changes, and user impact signals. Coverage is supported for APM-instrumented HTTP and gRPC services, prioritizing monitoring at the edge of your application. To request coverage for additional resource types, contact [Datadog Support][1].

Your team's existing monitors stay in place. Bits Detection works alongside them, adding adaptive coverage for the parts of your system that change too quickly to model by hand.

To enable Bits Detection for additional services:

1. In Datadog, go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2] and select a service.
1. Open the service's monitoring overview from the monitor status bar or the Bits Detection card.
1. Follow the prompt to enable Bits Detection monitoring for the service.
1. Review the managed coverage after initialization completes. You receive an email when your new health posture is ready.

## Use Bits Detection

Bits Detection manages monitoring in three stages:

- **Identify critical resources**: Bits Detection evaluates supported services and resources to determine which endpoints, dependencies, or flows are likely to be important to your users and business.
- **Detect meaningful degradations**: Bits Detection creates and tunes managed monitors for critical resources.
- **Adapt as services change**: Bits Detection keeps monitoring aligned with production by reassessing resource criticality, monitoring coverage, and alerting behavior as your services evolve.

Use the sections below to review coverage, configure alert routing, and provide feedback to help Bits adapt over time.

### Review Bits Detection monitoring

Use the Service Page or Monitor List to review how Bits Detection is monitoring your system.

**Service Page**

To open the Bits Detection view for a service, go to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2], select a service, and open the monitoring overview from the monitor status bar or the Bits Detection card.

{{< img src="bits_ai/bits_detection/service_page_bits_detection_card.png" alt="The Bits Detection card on the APM Services page showing monitoring status and critical endpoints for a service." style="width:90%;" >}}

The Service Page shows Bits Detection monitors for the service, including their current status and alerting history, alongside the endpoints Bits considers critical. Bits prioritizes endpoints most likely to affect customers directly—such as checkout, signup, or authentication paths—and each endpoint includes a criticality justification explaining why it was selected.

From the Service Page, you can:

- Review Bits Detection health status for the service.
- Open an active alert.
- View details for a managed detection type.
- Review the critical endpoints covered by Bits Detection.
- Mark an endpoint as not critical.
- Manage alert notification rules.

**Monitor List**

To view Bits Detection monitors, go to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}List{{< /ui >}}][3] and select the {{< ui >}}Bits Managed{{< /ui >}} filter. The summary banner shows the number of managed monitors in each status. Expand a service row to view its managed monitors.

{{< img src="bits_ai/bits_detection/monitor_list_bits_managed.png" alt="The Monitor List filtered to Bits Managed monitors, showing services grouped by managed monitor status." style="width:90%;" >}}

The Monitor List groups Bits Detection monitors by service. For each service, you can review the status, priority, monitor name, and tags for each managed monitor. Bits Detection monitors are labeled with a sparkle icon so you can distinguish them from monitors your teams create and maintain.

### Manage Bits Detection notifications

Bits Detection monitors are tuned to production behavior, not static thresholds. Use alert notification rules to route alerts to the right teams. To set up a rule, go to the [service monitoring overview][2] and click {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}.

1. In {{< ui >}}Match notifications with specific tags{{< /ui >}}, review the query. Datadog pre-fills the rule with tags for the selected service and Bits Detection-managed monitors. You can filter further.
1. In {{< ui >}}Choose routing conditions and recipients{{< /ui >}}, select {{< ui >}}Manual Routing{{< /ui >}} or {{< ui >}}Dynamic Routing{{< /ui >}}.
1. Add the recipients that should receive matching monitor notifications.
1. Name the rule.
1. Define permissions for the rule.
1. Click {{< ui >}}Create Rule{{< /ui >}}.

The notification rule applies to monitors that match the tag query. The side panel shows how many monitors match the rule and lists examples of matching monitors.

### Help Bits learn

Use feedback to tune Bits Detection for your environment. You can flag alerts as useful or noisy, and update which endpoints are considered critical from the Service Page.

**Provide feedback on an alert**

1. Open the Bits Detection alert.
1. In the feedback prompt, click {{< ui >}}Yes{{< /ui >}} if Bits should have alerted you, or click {{< ui >}}No, Because…{{< /ui >}} if it should not have.
1. If you clicked {{< ui >}}No, Because…{{< /ui >}}, select a reason.
1. Click {{< ui >}}Send Feedback{{< /ui >}}.

**Provide feedback on resource criticality**

Bits Detection uses criticality to determine which resources should have managed monitoring coverage. From the [service monitoring overview][2], click {{< ui >}}Mark as Not Critical{{< /ui >}} next to an endpoint that should not have critical coverage, or {{< ui >}}Add a New Endpoint{{< /ui >}} to mark one as critical.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://www.app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /bits_ai/bits_ai_sre/
