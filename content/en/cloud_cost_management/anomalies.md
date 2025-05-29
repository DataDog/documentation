---
title: Anomalies Page
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/monitors"
  tag: "Monitors"
  text: "Create Cost Monitors"
---

## Overview

Datadog Cloud Cost Management (CCM) continuously monitors your environment to detect and prioritize unexpected cost changes, enabling you to share, investigate, and resolve anomalies. Cost anomalies are available for AWS, and do not require any additional setup after CCM is set up.

## Getting Started

1. Navigate to the [Anomalies tab of the Cloud Cost page in Datadog][1].
2. Review the list of active anomalies, sorted by cost impact.
3. Click on an anomaly to investigate and take action.
4. Use the filters to view Active, Past, or Resolved anomalies.

## How anomalies are defined

Anomalies are significant, unexpected changes that stand out from typical patterns. Datadog automatically identifies anomalies using machine learning techniques that adapt to your specific usage patterns.

Datadog's algorithm takes into account:
- **Seasonality**: Recognizes regular patterns (for example, weekly scaling events)
- **Usage-based charges**: Focuses on engineering usage (excludes taxes, credits, refunds, and Reserved Instance fees)
- **Cost impact**: Filters out low-impact anomalies to reduce noise

For example, if your infrastructure typically scales up every Monday, Datadog recognizes this pattern and does not flag it as a cost anomaly. This helps you focus on truly unexpected changes that require attention.

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view and filter anomalies:

- **Active**: Anomalies from the last full day of cost data (typically 2-3 days prior)
- **Past**: Anomalies that lasted more than 7 days or are no longer detected as anomalous
- **Resolved**: Anomalies that you've marked as resolved with context

Each anomaly card shows:
- Service name ('rds', for example)
- Usage type
- Cloud accounts affected
- Expected vs. actual costs
- Cost trend graph (past 1 month)

Anomalies are sorted by cost impact, with the most significant changes at the top.

This is an example of the list of anomalies detected in your infrastructure:

{{< img src="cloud_cost/anomalies/cost_anomalies_new_list.png" alt="List of cost anomalies showing service names, usage types, and cost impacts" style="width:90;" >}}

## Take action on anomalies

Follow these steps to investigate and resolve anomalies:

1. **Click an anomaly** to open the side panel.
2. **Review the details** for services affected, teams involved, environments, impacted, or resource IDs that may be driving the cost anomaly.
3. **Investigate further**:
   - View costs in Explorer
   - Save the query to a Notebook
   - Share with service owners or teams
4. **Set up monitoring**:
   - Create a cost anomaly monitor for similar patterns
   - Configure alerts for future anomalies

### Tag Influence

Datadog automatically analyzes your cost anomalies to identify:
- Which specific resources are driving the cost changes
- Which teams or services to contact about the changes
- The impact of different tags on the cost anomaly

Tag Influence analyzes the following tags by default:
- Region name
- Service name
- Subaccount name
- Team
- Service
- Environment

This automated analysis helps you:
- Quickly identify the root cause of cost changes
- Know who to contact about cost anomalies
- Understand the impact of different infrastructure components
- Reduce manual investigation time

This is the side panel where you can take action on your cost anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel.png" alt="Side panel showing anomaly details, investigation options, and action buttons" style="width:90;" >}}

## Resolve anomalies

As you investigate anomalies, you may find anomalies that are not significant, were actually expected costs, or are otherwise not considered an anomaly.

To resolve an anomaly:

1. **Mark as significant or insignificant** to help improve the algorithm.
2. **Add context** about why it's not an anomaly.
3. **Resolve the anomaly** to move it to the Resolved tab.

This is an example of how to mark a cost anomaly as significant and explain why it's an anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-significant.png" alt="Form for marking an anomaly as significant with explanation field" style="width:90;" >}}

## Troubleshooting

If you're not seeing expected anomalies:
- Verify that CCM is [properly set up][2]
- Check that you have the necessary permissions
- Review the time range of your anomaly view

For more help, contact [Datadog Support][3].

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /cloud_cost_management/setup/
[3]: /help/