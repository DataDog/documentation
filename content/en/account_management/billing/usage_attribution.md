---
title: Usage Attribution
kind: documentation
aliases:
    - /account_management/billing/advanced_usage_reporting/
    - /account_management/billing/custom_usage_reporitng/
further_reading:
- link: "/account_management/plan_and_usage/"
  tag: "Documentation"
  text: "Plan and Usage Settings"
---

## Overview

<div class="alert alert-warning">
Usage Attribution is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

Administrators can access the Usage Attribution tab from the Plan & Usage section in Datadog. The Usage Attribution page provides the following information and functionality:

- Lists the existing tag keys that usage is being broken down by and provides the ability to change and add new ones (up to three tag keys).
- Generates daily `.tsv` (tab separated values) files for most usage types.
- Summarizes usage at the end of each month.
- Surfaces the data both in the UI and as a `.tsv` download.

The following usage types are not supported in this tool:

- Analyzed Logs (Security)
- Incident Management
- Indexed Log Events
- Ingested Logs
- Indexed Spans
- Ingested Spans
- Network Flows
- Real User Monitoring

## Getting started

To start receiving daily data, an administrator needs to create a new report with the user interface.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Getting Started with Usage Attribution in Datadog" style="width:100%;">}}

The **Applied Tags** section enables the following:

- Entering up to three tag keys from a dropdown. The dropdown is pre-populated with existing tags on both the root account and any child organizations under the account.
- Deleting and editing existing tags.

{{< img src="account_management/billing/usage_attribution/total-usage.png" alt="Applied tags in Datadog" style="width:100%;" >}}

- Once the tags are configured, it takes a full 24-hour period for the first report to be generated.
- The reports are generated on an ongoing basis.
- If tags are changed, the new report reflects the new tags. However, the previous reports keep the old tags.
- Monthly reports reflect the latest set of tags. If you change tags mid-month, the usage percentages might not match up.

## Total usage

### Monthly usage attribution

Once the reports start to be generated, they are updated daily and aggregated monthly in this table.

{{< img src="account_management/billing/usage_attribution/total-usage.png" alt="Applied tags in Datadog" style="width:100%;" >}}

- Data is shown by all tag keys selected e.g. by app and service. 
- Data can be shown by specific organization or tag keys by querying on the left-side dropdown. 
- Value and Percentage options are available for table display. 
- Data shown on the table can be edited to include select products. 

{{< img src="account_management/billing/usage_attribution/usage-attribution-options.png" alt="Usage Attribution options dropdown menu" style="width:100%;" >}}

- If multi-org is enabled, usage is summarized across all Datadog organizations at the parent account.
- Previous months' reports are accessible through the time selector.
- Monthly reports are not generated until the month is over. Each monthly report should appear by the second day of the following month.
- Reports are downloadable with the **Download as CSV** button. These `.tsv` reports include both usage numbers and percentages, allowing for simplified allocations and chargebacks.

Monthly data can also be pulled using the tool's public API. For more information, see the [API endpoint documentation][1].

### Daily usage attribution

This section provides daily reports at an hourly granularity to dig into time frames. It also provides a concatenation of all reports during a given month.

- Clicking on a specific time period expands a view on the right where reports can be downloaded as a `.tsv`.
- Data can be downloaded daily or at the end of the month.

{{< img src="account_management/billing/usage_attribution/daily-usage-attribution.png" alt="Daily Usage Attribution data" style="width:100%;" >}}

Daily data can also be pulled using the tool's public API. For more information, see the [API endpoint documentation][2].

### Interpreting the data

The table below shows a sample daily report for Infra usage by two tags: `app` and `service`.

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- An `<empty>` value means the resource was tagged with the respective tag but did not have a value.
- No value means the resource was not tagged with that particular tag.
- `|` (pipe) separated values (for example, `service1 | service2`) mean that a particular tag was applied multiple times on the resource.
- A valid tag value (see the [Defining Tags documentation][3]) refers to the actual value of the respective tag.

#### Further data analysis

When using multiple tags, both the Daily and Monthly Usage Attribution reports contain data for all possible combinations of those tags, and are suitable to use as base datasets for further data analysis tasks. For instance, you can use grouping or pivoting to produce views focused on a subset of the tags, or to perform aggregations across custom date ranges.

## Tracking usage

- Data can be shown by specific product(s), organization, or tag keys by editing the search queries below **Usage Attribution Trends**. 
- Data can be shown at a daily, weekly, or monthly level. 

{{< img src="account_management/billing/usage_attribution/graph-by-tags.png" alt="Infra Hosts graphs separated by tags" style="width:100%;" >}}

### Interpreting the data

For each product, graphs are displayed by tags. 

{{< img src="account_management/billing/usage_attribution/multiple-graphs-by-tags.png" alt="Infra Hosts and Custom Metrics graphs separated by tags" style="width:100%;" >}}

Each color block represents a unique tag value for each tag.

{{< img src="account_management/billing/usage_attribution/histogram-graph-tag.png" alt="A breakdown of a pillar in the Infra Hosts graph" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-monthly-custom-reports
[2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: https://docs.datadoghq.com/getting_started/tagging/#defining-tags
