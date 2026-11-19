---
title: Google Cloud Commitment Programs
description: Review Compute flexible committed use discount savings, coverage, utilization, and expiration dates.
further_reading:
- link: "/cloud_cost_management/planning/commitment_programs/"
  tag: "Documentation"
  text: "Learn about Commitment Programs"
- link: "/cloud_cost_management/setup/google_cloud/"
  tag: "Documentation"
  text: "Set up Google Cloud Cost Management"
---

## Overview

Use Google Cloud Commitment Programs to review Compute flexible committed use discounts (CUDs). The {{< ui >}}Overview{{< /ui >}} view brings together savings, on-demand hot-spots, and commitment inventory for your selected billing accounts and reporting period.

## Getting started

1. Complete the [Google Cloud Cost Management setup][2].
2. To see commitment dates, term lengths, and committed amounts, enable the [CUD metadata export][3].
3. Open [**Commitment Programs**][1] in Cloud Cost Management, then select **GCP > Overview** in the left navigation.
4. Select the {{< ui >}}Billing Account{{< /ui >}} values and reporting period to investigate.

{{< callout header="false" btn_hidden="true" respect-site-support="false" >}}
Screenshot placeholder: Google Cloud Overview with the provider navigation, billing account filter, and savings chart. Include on-demand hot-spots and Flex CUD Inventory. Use sanitized example data.
{{< /callout >}}

## Commitments overview

Select a savings metric to change the chart:

- {{< ui >}}Effective Savings Rate{{< /ui >}}: Percentage saved through Compute flexible CUDs compared with on-demand list rates. The chart compares commitment costs with equivalent on-demand costs and shows the savings rate over time.
- {{< ui >}}Realized Savings{{< /ui >}}: The amount saved compared with on-demand list rates during the reporting period. Select it to review daily realized savings.

High coverage does not guarantee high savings if your commitments are underused. Compare these savings metrics with the utilization and unused spend in the inventory.

## On-demand hot-spots

Use {{< ui >}}On-Demand Hot-Spots{{< /ui >}} to find eligible usage billed at on-demand rates. Google Cloud coverage is measured by cost.

1. Review the {{< ui >}}Cost Coverage Over Time{{< /ui >}} chart for changes in coverage.
2. Filter by {{< ui >}}Region{{< /ui >}}, {{< ui >}}Project{{< /ui >}}, or {{< ui >}}Product{{< /ui >}} to narrow the table.
3. Compare on-demand cost and cost coverage to find groups with uncovered spend.
4. Select a row to open its details. Use the {{< ui >}}Group by{{< /ui >}} control to investigate ownership using the tags on your cost data.

Confirm that uncovered usage is predictable, and check existing commitment utilization before considering additional CUDs.

## Commitments inventory

In {{< ui >}}Flex CUD Inventory{{< /ui >}}, review utilization, unused committed spend, and the daily chart. The chart shows used and unused commitment spend alongside the utilization rate.

The table lists commitments active during the selected period, including commitments that have since expired. Search for a commitment, review its utilization, and use {{< ui >}}Columns{{< /ui >}} to choose the details to display.

| Column | Description |
|---|---|
| Flex CUD ID | Unique identifier for the commitment. |
| Description | Description of the commitment, when available. |
| Committed Spend/Hr | Hourly spend committed under the CUD. |
| Term | Duration of the commitment. |
| Start Date | Date the commitment starts. |
| End Date | Date the commitment expires. |
| Utilization | Percentage of the commitment used during the reporting period. |

Use {{< ui >}}Only show Expiring{{< /ui >}} to focus on commitments nearing their end date, within 30 days. Review utilization before renewing to decide whether the commitment still matches your usage.

Commitment dates, terms, and committed amounts depend on the CUD metadata export. Columns without data can be hidden, and missing values in individual rows appear as a dash. Follow the inventory banner to set up, enable, or update the metadata export if details are missing.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: /cloud_cost_management/setup/google_cloud/
[3]: /cloud_cost_management/setup/google_cloud/#optional-enable-committed-use-discounts-metadata-export
