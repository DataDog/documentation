---
title: Custom usage reporting
kind: documentation
---

## Overview

Administrators can access the Custom Reporting tab from the Plan & Usage section in Datadog, then navigate to: 
`Plan & Usage`--> `Custom Reporting`.

This tool enables organizations to split their Datadog usage by up to 3 chosen tag keys and generates daily and monthly usage reports.

The Custom Reporting page provides the following information and functionality:

* It lists the existing tag keys that usage is being broken down by and provides the ability to change and add new ones (up to 3 tag keys).
* It generates daily .tsv (tab separated values) files for most usage types.
* It summarizes usage at the end of each month and surfaces both in the UI and as a .tsv download.

_Note_: The following usage types are not supported in this tool yet. They will be added subsequently:

* Indexed Log Events
* Ingested Log Events
* Analyzed Spans

### Getting Started

In order to start receiving daily data, an administrator will need to create a new report via the user interface. 

{{< img src="account_management/billing/advanced-usage-reporting-01.png" alt="Getting Started" >}}

The 'Applied Tags' section enables the following:

* Entering up to three tag keys from a dropdown. The dropdown is pre-populated with existing tags on the account.
* Deleting and editing existing tags.

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Applied Tags" >}}

* Once the tags are configured, it will take a full 24-hour period for the first report to be generated.
* The reports will be generated on an ongoing basis.
* If tags are changed, the new reports will reflect the new tags. However, the previous reports will keep the old ones.
* Monthly reports will reflect the latest set of tags. If you change tags mid-month, the usage percentages might not match up. 

### Monthly Tag-Based Usage Summary

Once the reports start being generated, they will be updated daily and aggregated monthly in this table.

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Usage Summary Table" >}}

* Clicking on a specific tag key will update the table view accordingly.
* If Multi-org is enabled, usage is summarized across all Datadog organizations at the parent account.
* Previous months' reports are accessible via the time selector.
* Monthly reports won't be generated until the month is over. It should appear by the second day of the following month. 
* Reports are downloadable using the 'Export Current View' reports. These .tsv reports will include both usage numbers and _percentages_ allowing for easy allocations and chargebacks.

### Daily Tag-Based Reports

This section provides daily reports at an hourly granularity to dig into timeframes. It also provides a concatenation of all reports during a given month.

* Clicking on a specific time period will expand a view on the right where reports can be downloaded as CSVs
* Data can either be downloaded daily or at the end of the month.

{{< img src="account_management/billing/advanced-usage-reporting-04.png" alt="Download data" >}}

Data can also be pulled using the tool's Public API (endpoint documentation [here][2]).

### Interpreting the Data

The table below shows a sample daily report for Custom Metrics usage two tags: `team` and `service`.

| public_id   | hour                  | team      | service               | num_custom_timeseries           |
|-------------|-----------------------|-----------|-----------------------|---------------------------------|
| publicid1   | 2020-02-01 00:00:00   | &lt;empty&gt; | service1 &#124; service2 | 50                              |
| publicid1   | 2020-02-01 09:00:00   | team1     |                       | 28                              |
| publicid1   | 2020-02-01 18:00:00   | team2     | service3              | 1023                            |


* An `<empty>` value means the resource was tagged with the respective tag but did not have a value.
* No value means the resource was not tagged with that particular tag (e.i. N/A).
* | (pipe) separated values (e.i. `service1 | service2`) mean that a particular tag was applied multiple times on the resource.
* A valid tag value (as described [here][1]) refers to the actual value of the respective tag.


[1]: https://docs.datadoghq.com/tagging/#defining-tags
[2]: https://docs.datadoghq.com/api/#usage-metering