---
title: Usage attribution
kind: documentation
aliases:
    - /account_management/billing/advanced_usage_reporting/
    - /account_management/billing/custom_usage_reporitng/
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

**Note**: The following usage types are not supported in this tool:

- Indexed Log Events
- Ingested Logs
- Indexed Spans

**Note: Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.**

### Getting started

To start receiving daily data, an administrator needs to create a new report with the user interface.

{{< img src="account_management/billing/advanced-usage-reporting-01.png" alt="Getting Started" >}}

The **Applied Tags** section enables the following:

- Entering up to three tag keys from a dropdown. The dropdown is pre-populated with existing tags on both the root account and any child organizations under the account.
- Deleting and editing existing tags.

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Applied Tags" >}}

- Once the tags are configured, it takes a full 24-hour period for the first report to be generated.
- The reports are generated on an ongoing basis.
- If tags are changed, the new reports will reflect the new tags. However, the previous reports will keep the old ones.
- Monthly reports reflect the latest set of tags. If you change tags mid-month, the usage percentages might not match up.

### Monthly usage attribution

Once the reports start being generated, they are updated daily and aggregated monthly in this table.

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Usage Summary Table" >}}

- Clicking on a specific tag key updates the table view accordingly.
- If multi-org is enabled, usage is summarized across all Datadog organizations at the parent account.
- Previous months' reports are accessible through the time selector.
- Monthly reports are not generated until the month is over. Each monthly report should appear by the second day of the following month.
- Reports are downloadable using the 'Export Current View' option. These `.tsv` reports include both usage numbers and percentages, allowing for easy allocations and chargebacks.

Monthly data can also be pulled using the tool's public API. (See the [API endpoint documentation][1]).

### Daily usage attribution

This section provides daily reports at an hourly granularity to dig into timeframes. It also provides a concatenation of all reports during a given month.

- Clicking on a specific time period expands a view on the right where reports can be downloaded as a `.tsv`.
- Data can be downloaded daily or at the end of the month.

{{< img src="account_management/billing/advanced-usage-reporting-04.png" alt="Download data" >}}

Daily data can also be pulled using the tool's public API. (See the [API endpoint documentation][2]).

### Interpreting the data

The table below shows a sample daily report for Custom Metrics usage two tags: `team` and `service`.

| public_id | hour                | team          | service                  | num_custom_timeseries |
| --------- | ------------------- | ------------- | ------------------------ | --------------------- |
| publicid1 | 2020-02-01 00:00:00 | &lt;empty&gt; | service1 &#124; service2 | 50                    |
| publicid1 | 2020-02-01 09:00:00 | team1         |                          | 28                    |
| publicid1 | 2020-02-01 18:00:00 | team2         | service3                 | 1023                  |

- An `<empty>` value means the resource was tagged with the respective tag but did not have a value.
- No value means the resource was not tagged with that particular tag.
- `|` (pipe) separated values (for example, `service1 | service2`) mean that a particular tag was applied multiple times on the resource.
- A valid tag value (see the [Defining Tags documentation][3]) refers to the actual value of the respective tag.

#### Further data analysis

When using multiple tags, both the Daily and Monthly Usage Attribution reports contain data for all possible combinations of those tags, and are suitable to use as base datasets for further data analysis tasks. For instance, you can use grouping or pivoting to produce views focused on a subset of the tags, or to perform aggregations across custom date ranges.

[1]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-monthly-custom-reports
[2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: https://docs.datadoghq.com/getting_started/tagging/#defining-tags
