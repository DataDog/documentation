---
title: Watchdog Monitor
kind: documentation
description: "Algorithmically detects application and infrastructure issues."
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "watchdog"
  tag: "Documentation"
  text: "Watchdog, algorithmically detect application and infrastructure issues"
---

## Overview

[Watchdog][1] is an algorithmic feature for APM that automatically detects application and infrastructure issues, by continuously observing trends and patterns in application metrics looking for atypical behavior. 

**Note**: Watchdog is an APM feature, and Watchdog monitors are only available to APM customers.

## Monitor creation

To create a [Watchdog monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Watchdog*.

### Select story type

In this section, choose between an **APM** or **Infrastructure** story:

{{< tabs >}}
{{% tab "APM" %}}

An APM story is created when Watchdog detects anomalous behavior on your system’s services or their child resources.

### Select sources {#select-sources-1}

Choose your [primary tags][1], [service][2], and [resource][3] from the drop-down menus.

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over time, along with a list of events.

[1]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[2]: /tracing/visualization/service
[3]: /tracing/visualization/resource
{{% /tab %}}
{{% tab "Infrastructure" %}}

Infrastructure-wide stories include network degradations detected in your cloud provider’s regions.

After selecting Infrastructure, the graph at the top of the monitor creation page displays Watchdog events over time, along with a list of events.

### Select sources {#select-sources-2}

No selection is necessary. You are notified when Watchdog detects issues across your infrastructure.

{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /monitors/notifications
