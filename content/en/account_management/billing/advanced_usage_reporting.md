---
title: Advanced usage reporting
kind: documentation
---

#### Note

This feature is currently still in development and is changing on a day-to-day basis. We're enabling it on a case basis for customers interested in helping us shape the feature and with an immediate need for the raw data.

Documentation will change as we roll out more functionality and make the data more actionable and digestable. For inquiries around roadmap and timelines, please reach out to your Customer Success Manager.

## Overview

Administrators can access the Custom Reporting tab from the Plan & Usage section in Datadog, then navigate to: 
`Plan & Usage`--> `Custom Reporting`.

This tool enables organizations to split their Datadog usage by up to 3 chosen tag keys and generates daily and monthly usage reports.

The Custom Reporting page provides the following information and functionality:

* It lists the existing tag keys that usage is being broken down by and provides the ability to change and add new ones (up to 3 tag keys).
* It generates daily .tsv (tab separated values) files for most usage types.
* It concatenates daily .tsv files at the end of each month and makes it available for download.

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

### Getting the Data

Once the reports start being generated, they will be updated daily and aggregated monthly in this table.

{{< img src="account_management/billing/advanced-usage-reporting-03.png" alt="Getting Data" >}}

* Clicking on a specific time period will expand a view on the right where reports can be downloaded as CSVs
* Data can either be downloaded daily or at the end of the month.

{{< img src="account_management/billing/advanced-usage-reporting-04.png" alt="Download data" >}}

Data can also be pulled using the tool's Public API (endpoint documentation below).

### Interpreting the Data

This is how the data in a Custom Timeseries Report by Tags using two tags (`team` and `service`) would look like, formatted as a table for easier reading:

| public_id   | hour                  | team      | service               | num_custom_timeseries           |
|-------------|-----------------------|-----------|-----------------------|---------------------------------|
| publicid1   | 2020-02-01 00:00:00   | &lt;empty&gt; | service1 &#124; service2 | 50                              |
| publicid1   | 2020-02-01 09:00:00   | team1     |                       | 28                              |
| publicid1   | 2020-02-01 18:00:00   | team2     | service3              | 1023                            |

#### How to interpret the values in the tag columns

Note: In the example above, the tag columns are `team` and `service`.

* `<empty>` (*`team` column in row 1 above*): means the resource was tagged with the respective tag but did not have a value.
* no value (*`service` column in row 2 above*): means the resource (Custom metrics, Infra, APM or NPM hosts, Containers, Synthetics API or Browser checks, AWS Lambda functions, ...) was not tagged with that particular tag.
* | (pipe) separated values (*`service` column in row 1 above*): present when that particular tag was applied multiple times on the resource.
* valid tag value (as described [here][1]) (*`team` and `service` columns in row 3 above*): the values of the respective tag.


[1]: https://docs.datadoghq.com/tagging/#defining-tags

