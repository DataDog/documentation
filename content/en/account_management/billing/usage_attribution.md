---
title: Usage Attribution
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

- Analyzed Logs (Security)
- Incident Management
- Indexed Log Events
- Ingested Logs
- Indexed Spans
- Ingested Spans
- Network Flows
- Real User Monitoring

### Getting started

To start receiving daily data, an administrator needs to create a new report with the user interface.

![Usage Attribution Datadog 2022-04-29 at 5 30 18 PM](https://user-images.githubusercontent.com/97177827/166979392-f327ff73-3fee-44e4-ba65-3b7e364fe548.jpg)

The **Applied Tags** section enables the following:

- Entering up to three tag keys from a dropdown. The dropdown is pre-populated with existing tags on both the root account and any child organizations under the account.
- Deleting and editing existing t
- ags.

![advanced-usage-reporting-02 84ce96d511e372385c043d2d7351335e](https://user-images.githubusercontent.com/97177827/166979710-bd25f0e2-d7de-4641-9798-6e7d148a625c.jpg)

- Once the tags are configured, it takes a full 24-hour period for the first report to be generated.
- The reports are generated on an ongoing basis.
- If tags are changed, the new report reflects the new tags. However, the previous reports keep the old tags.
- Monthly reports reflect the latest set of tags. If you change tags mid-month, the usage percentages might not match up.

### TOTAL USAGE

### Monthly usage attribution

Once the reports start to be generated, they are updated daily and aggregated monthly in this table.

![Usage Attribution Datadog 2022-05-05 at 12 39 59 PM](https://user-images.githubusercontent.com/97177827/166980144-c33397d5-5e4b-4eba-a056-cb8743d77c9a.jpg)

- Data is shown by all tag keys selected e.g. by app and service. 
- Data can be shown by specific organization or tag keys by querying on the left-side dropdown. 
- Value and Percentage options are available for table display. 
- Data shown on the table can be edited to include select products. 

![Usage Attribution Datadog 2022-05-05 at 12 41 01 PM](https://user-images.githubusercontent.com/97177827/166980570-f3e69bb9-7b89-4bef-8877-025aaf6e6f3c.jpg)

- If multi-org is enabled, usage is summarized across all Datadog organizations at the parent account.
- Previous months' reports are accessible through the time selector.
- Monthly reports are not generated until the month is over. Each monthly report should appear by the second day of the following month.
- Reports are downloadable using the 'Download as CSV' option. These `.tsv` reports include both usage numbers and percentages, allowing for simplified allocations and chargebacks.

Monthly data can also be pulled using the tool's public API. (See the [API endpoint documentation][1]).

### Daily usage attribution

This section provides daily reports at an hourly granularity to dig into time frames. It also provides a concatenation of all reports during a given month.

- Clicking on a specific time period expands a view on the right where reports can be downloaded as a `.tsv`.
- Data can be downloaded daily or at the end of the month.

![Usage Attribution Datadog 2022-05-05 at 12 42 12 PM](https://user-images.githubusercontent.com/97177827/166982644-aa879f96-33ca-4a30-a7ac-9e1abc6c4bc6.jpg)

Daily data can also be pulled using the tool's public API. (See the [API endpoint documentation][2]).

### Interpreting the data

The table below shows a sample daily report for Infra usage by two tags: `app` and `service`.

![cbd2db26-5b00-472c-9cd0-005b4ebb565b](https://user-images.githubusercontent.com/97177827/166982307-74801732-719a-44ec-afac-90966183b1c9.jpeg)

- An `<empty>` value means the resource was tagged with the respective tag but did not have a value.
- No value means the resource was not tagged with that particular tag.
- `|` (pipe) separated values (for example, `service1 | service2`) mean that a particular tag was applied multiple times on the resource.
- A valid tag value (see the [Defining Tags documentation][3]) refers to the actual value of the respective tag.

#### Further data analysis

When using multiple tags, both the Daily and Monthly Usage Attribution reports contain data for all possible combinations of those tags, and are suitable to use as base datasets for further data analysis tasks. For instance, you can use grouping or pivoting to produce views focused on a subset of the tags, or to perform aggregations across custom date ranges.

## TRACKING USAGE

![Usage Attribution Datadog 2022-05-05 at 12 45 30 PM](https://user-images.githubusercontent.com/97177827/166981966-4cd5e1dc-0ee9-47c0-90f3-4bb127a983ab.jpg)

- Data can be shown by specific product(s), organization, or tag keys by querying on the left-side dropdown. 
- Data can be shown at daily, weekly or monthly granularities. 

### Interpreting the data
For each product, graphs are displayed by tags. 

![Usage Attribution Datadog 2022-05-05 at 1 00 56 PM](https://user-images.githubusercontent.com/97177827/166981513-a2798cc8-c25e-441a-8ec7-4756f1cb71a9.jpg)

Each color block represents a unique tag value for each tag.

<img width="1304" alt="Screen Shot 2022-05-05 at 12 47 28 PM" src="https://user-images.githubusercontent.com/97177827/166981678-d2030583-ad3c-41a0-822e-69abb1eb7b3b.png">

[1]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-monthly-custom-reports
[2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: https://docs.datadoghq.com/getting_started/tagging/#defining-tags
