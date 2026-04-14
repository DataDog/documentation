---
title: Monitor Best Practices
description: "Learn best practices for creating effective monitors including clear titles, multi-alerts, context, and using Monitor Quality for optimization."
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn more about monitors"
- link: "/monitors/configuration/"
  tag: "Documentation"
  text: "Monitor Configuration"
- link: "/monitors/guide/clean_up_monitor_clutter"
  tag: "Documentation"
  text: "Clean up monitor clutter"

---

## Overview

A well-designed monitor is essential for understanding the performance, health, and stability of your infrastructure or application. It provides accurate, actionable data to detect issues early, optimize performance, and maintain smooth operations.

This guide walks you through the key aspects of building an effective monitor:

- Create an intuitive monitor
- Set proper thresholds
- Establish actionable responses.

By following these principles, you can create a monitor that delivers meaningful insights and supports proactive decision-making.

## Write a clear title

The [Manage Monitor][1] page displays the monitor's title, tags, teams, and other fields. For a full list of attributes, see the [Search Monitors][2] documentation. Having a clear, descriptive title is important because it immediately communicates the monitor's purpose and what it tracks. A well-defined title helps users quickly identify the monitor's focus. A clear title also ensures that all team members, regardless of role and persona, can understand the monitor's function at a glance.

**Note**: A monitor's title and the notification subject are the same, so avoid adding too many variables to either.

## Use multi-alert

To avoid redundant monitors (such as multiple similar monitors with just 1 scope changing), Datadog recommends using multi-alert monitors. When you use a "group by" in your query, multi-alerts automatically apply the alert to each source based on your group parameters. The best way to achieve this is with a monitor grouped by `host`, so that you only have one monitor that triggers a distinct alert for each host every time it crosses the threshold.

For example:
You have an e-commerce website, and to handle large volumes of traffic or processing, you deploy multiple hosts and use a load balancer to distribute the incoming requests evenly. To ensure no single host is overwhelmed, you want an alert if a host exceeds a specific CPU and memory threshold. This ensures no single host is overwhelmed, maintaining balanced traffic and processing.

## Give context

Adding context to a monitor transforms raw data into actionable insights. Context clarifies ownership and impact, helping users understand what the monitor affects. Context also speeds up troubleshooting by providing a clearer picture of potential causes, allowing for better decision-making. In short, context makes monitoring more accurate, useful, and responsive to real-world conditions.

Datadog has 3 features to enhance monitor context:

* [**Metadata**][3]: Add priority, tag, and team information to alert notifications. This context helps teams filter, prioritize, and route issues to the right people quickly. They help clarify the alert's nature and group related alerts. This makes managing and resolving alerts more efficient and effective.

* [**Variables**][4]: Use variables in your monitor message to add precise context, providing dynamic, real-time details, such as the affected system, error message, or exceeded thresholds. This specificity makes notifications clearer and reduces the need for responders to search for additional information, allowing faster action. Variables also ensure consistency in the structure of alerts, which improves readability and response efficiency.

## Monitor quality

To confirm if your monitors are well-configured, use [Monitor Quality][5]. It identifies monitors that need improvement based on predefined rules that catch common misconfigurations in monitoring setups.

For more information, see the [Monitor Quality][6] documentation.

## Monitor templates

If you are unsure where to start when creating a monitor, use Datadog's pre-built [Monitor Templates][7]. They provide guidelines on titles, notifications, metrics and thresholds.

For more information, see the [Monitor templates][8] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/manage/search/#attributes
[3]: /monitors/configuration/?tab=thresholdalert#add-metadata
[4]: /monitors/notify/variables/?tab=is_alert
[5]: https://app.datadoghq.com/monitors/quality
[6]: /monitors/quality/
[7]: https://app.datadoghq.com/monitors/templates
[8]: /monitors/templates/
