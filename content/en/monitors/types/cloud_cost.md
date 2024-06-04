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
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
- link: "https://www.datadoghq.com/blog/ccm-cost-monitors/"
  tag: "Blog"
  text: "React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
  tag: "Blog"
  text: "Empower engineers to take ownership of Google Cloud costs with Datadog"
---

## Overview
Get proactive notifications on cost changes to help mitigate unexpected cloud spend. Cloud Cost Monitors help you identify cost changes quickly so you can investigate the cause. You can configure your alerts to catch unexpected changes.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up. After it's set up, you can configure monitors to alert when costs increase or decrease.

## Monitor creation

To create a Cloud Cost monitor in Datadog, use the main navigation: **Monitors** --> **New Monitor** --> **Cloud Cost**.

You can also create Cloud Cost monitors from [Cloud Costs Analytics][2]. Click on **+Export to Monitor** above the table of costs.

{{< img src="/monitors/monitor_types/cloud_cost/cloud_cost_analytics.png" alt="'Export to Monitor' button in Cloud Costs Analytics page" style="width:100%;" >}}

## Select a cost monitor type

Choose between a **Compare Costs Over Time** or a **Set Daily Cost Threshold** monitor type.

| Cost Type | Description | Usage Examples |
| ---  | ----------- | ----------- |
| Cost Changes  | Compare costs on a daily, weekly or monthly basis | Alert when the difference between today's cost and the week before is over 5% |
| Cost Threshold | Set alerts on total costs exceeding a threshold in a day | Set alerts when today's total cost exceeds $10,000 |

## Specify which costs to track

Any cost type or metric reporting to Datadog is available for monitors. You can use custom metrics or observability metrics alongside a cost metric to monitor unit economics. For more information, see the [Cloud Cost Management][1] page. Use the editor to define the cost types or exports. 

| Step                              | Required | Default              | Example             |
|-----------------------------------|----------|----------------------|---------------------|
| Select the cost metric                 | Yes      | `aws.cost.amortized` | `azure.cost.actual` |
| Define the `filter by`            | No       | Everything           | `aws_product:s3`    |
| Group by                          | No       | Everything           | `aws_availability_zone` |
| Add observability metric | No      | `system.cpu.user` | `aws.s3.all_requests` |

{{< img src="monitors/monitor_types/cloud_cost/ccm_metrics_source.png" alt="Cloud Cost and Metrics data source options for specifying which costs to track" style="width:100%;" >}}

## Set alert conditions

If the cost monitor type is **Cost Threshold**, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, or `below or equal to` a threshold.  

If the cost monitor type is **Cost Changes**, you can trigger an alert when the cost `increases` or `decreases` more than the defined threshold. The threshold can be set to either a **Percentage Change** or set to **Dollar Amount**.

**Note**: For the **Percentage Change**, you can also filter out changes that are below a certain dollar threshold.
Example: alert when there is a cost change above 5% for any change that is above $500

## Configure notifications and automations

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analytics
[3]: /monitors/notify/
