---
title: Cloud Cost Monitor
kind: documentation
description: "Monitor costs associated with cloud platforms."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview
Get proactive notifications on cost changes to help mitigate unexpected cloud spend. Cloud Cost Monitors help you identify cost changes quickly so you can investigate why costs changed. Configure your alerts to catch unexpected cost changes.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up. After this data is sent to Datadog, you can configure monitors to alert when costs rise.

## Monitor creation

To create a Cloud Cost monitor in Datadog, use the main navigation: **Monitors** --> **New Monitor** --> **Cloud Cost**.

## Select a cost monitor type

Choose between a **Compare Costs Over Time** or a **Set Daily Cost Threshold** monitor type.

| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Compare Costs Over Time  | Compare costs on a weekly, monthly or custom time basis  | Alert when the difference between weekly costs during Oct 1 and Oct 14 is over 5% |
| Set Daily Cost Threshold | Set alerts on total costs exceeding a threshold in a day | Set alerts when today's total cost exceeds $10,000 |

## Specify which costs to track

Any cost type reporting to Datadog is available for monitors. For more information, see the [Cloud Cost Management][1] page. Use the editor to define the cost types or exports. 


| Step                              | Required | Default              | Example             |
|-----------------------------------|----------|----------------------|---------------------|
| Select cloud cost                 | Yes      | `aws.cost.amortized` | `azure.cost.actual` |
| Define the `filter by`            | No       | Everything           | `aws_product:s3`    |
| Group by                          | No       | Everything           | `aws_availability_zone` |

## Set alert conditions

If the cost monitor type is **Set Daily Cost Threshold**, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, or `below or equal to` a threshold.  


If the cost monitor type is **Compare Costs Over Time**, you can trigger an alert when the cost `increases` or `decreases` more than the defined threshold. The threshold can be set to either a **Percentage Change** or set to **Dollar Amount**.

## Notify your team

For detailed instructions on the  **Notify your team** section, see the [Notifications][2] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management/
[2]: /monitors/notify/
