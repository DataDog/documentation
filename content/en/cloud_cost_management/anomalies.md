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

{{< img src="cloud_cost/anomalies/cost_anomalies_new_list-2.png" alt="List of cost anomalies showing service names, usage types, and cost impacts" style="width:80;" >}}

## Getting started

1. Navigate to the [Anomalies tab][1] of the Cloud Cost page in Datadog.
2. Review the list of active anomalies, sorted by cost impact.
3. Click on an anomaly to investigate and take action.
4. Use the filters to view Active, Past, or Resolved anomalies across different dimensions, such as service name, team, or environment.

## How anomalies are defined

Anomalies are significant, unexpected changes that stand out from typical patterns. Datadog automatically identifies anomalies using machine learning techniques that adapt to your specific usage patterns.

To distinguish between true anomalies and expected fluctuations, Datadog's algorithm:
- Recognizes recurring cost spikes and dips, such as a cost increase every Monday 
- Focuses on engineering usage (excludes taxes, credits, refunds, and Reserved Instance fees)
- Filters out low-impact anomalies to reduce noise

For example, if your system automatically scales up every Sunday night for weekly backups, Datadog recognizes this pattern and does not flag it as a cost anomaly. This helps you focus on truly unexpected changes that require attention.

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view and filter anomalies:

- **Active**: Anomalies from the last full day of cost data (typically 2-3 days prior)
- **Past**: Anomalies that lasted more than 7 days or are no longer detected as anomalous
- **Resolved**: Anomalies that you've marked as resolved with context

Each anomaly card shows:
- Service name (`rds`, for example)
- Usage type
- Cloud accounts affected
- Expected vs. actual costs
- Cost trend graph (past 1 month)

Anomalies are sorted by cost impact, with the most significant changes at the top.

## Take action on anomalies

Follow these steps to investigate and resolve anomalies:

1. Click **See more** on an anomaly to open the side panel.

   {{< img src="cloud_cost/anomalies/cost_anomalies-tag-influence.png" alt="Click See More to see side panel showing anomaly details, investigation options, and action buttons" style="width:80;" >}}

2. **Review the details** for services affected, teams involved, environments impacted, resource IDs, or how usage and unit price may be driving the cost anomaly.
3. **Investigate further**:
   - View costs in Explorer
   - Save the query to a Notebook
   - Share with service owners or teams
4. **Set up monitoring**:
   - Create a cost anomaly monitor for similar patterns
   - Configure alerts for future anomalies

### Tag Influence

Tag Influence in Datadog automatically analyzes your cost anomalies to identify:

- Which resources are driving the cost changes
- Which teams or services to contact about the changes
- The impact of different tags on the cost anomaly

The feature is part of the anomaly investigation workflow, where you can see this analysis in the side panel when you click **See more** on an anomaly.

{{< img src="cloud_cost/anomalies/cost_anomalies-investigation-workflow.png" alt=" see how Tag Influence analyzes the following tags by default" style="width:80;" >}}

Under the **What happened** and **Where the anomaly happened** sections, you can see how Tag Influence analyzes the following tags by default:
- Region name
- Service name
- Subaccount name
- Team
- Service
- Environment

This automated analysis helps you identify the root cause of cost changes, know who to contact about cost anomalies, understand the impact of different infrastructure components, and reduce manual investigation time.

## Resolve anomalies

As you investigate anomalies, you may find anomalies that are not significant, were actually expected costs, or are otherwise not considered an anomaly.

To resolve an anomaly:

1. Click **Resolve Anomaly** to open the resolution popup.
2. Select one of the following resolutions to help improve the algorithm:
   - The anomaly amount was too small
   - This is an unexpected increase
   - This is an expected increase
2. **Add context** about why it is or is not an anomaly.
3. Click **Resolve** to move it to the Resolved tab.

This is an example of how to mark a cost anomaly as significant and explain why it's an anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Form for marking an anomaly as unexpected with explanation field" style="width:80;" >}}

## Troubleshooting

If you're not seeing expected anomalies:
- Verify that CCM is [properly set up][2]
- Check that you have the necessary permissions for AWS
- Review the time range of your anomaly view

For more help, contact [Datadog Support][3].

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /cloud_cost_management/setup/
[3]: /help/