---
title: Amazon Athena Query History
description: "Connect Amazon Athena to Datadog Data Observability to monitor query history, failures, performance, and cost."
further_reading:
  - link: '/data_observability/quality_monitoring/data_lakes/aws_glue/'
    tag: 'Documentation'
    text: 'AWS Glue'
  - link: '/data_observability/lineage/'
    tag: 'Documentation'
    text: 'Data Observability Lineage'
  - link: '/integrations/amazon-web-services/'
    tag: 'Documentation'
    text: 'AWS Integration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Amazon Athena query history monitoring is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The Amazon Athena integration collects the history of queries that run in your Athena workgroups. Use it to:

- Track query volume, data scanned, and duration across workgroups and regions.
- Find failing and long-running queries.
- Estimate Athena query compute cost.
- Build lineage between the AWS Glue tables that your queries read and write.

{{< img src="data_observability/amazon_athena/query-history-explorer.png" alt="Athena queries in Data Observability, showing normalized queries with workgroup, count, duration, bytes scanned, and estimated cost" style="width:100%;" >}}

Datadog collects query metadata from the Athena API. It does not read query results or access your query result location in Amazon S3.

## Prerequisites

Before you begin, make sure you have:

- An [AWS account connected in Datadog][1].
- IAM permissions to modify the Datadog role's policies.
- (Recommended) The [AWS Glue integration][2] configured for the same AWS account, so that Datadog can link queries to your Glue tables in lineage.

## Add required IAM permissions

Attach the following policy to the Datadog IAM role configured for your AWS integration:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AthenaQueryHistory",
      "Effect": "Allow",
      "Action": [
        "athena:ListQueryExecutions",
        "athena:BatchGetQueryExecution",
        "athena:ListWorkGroups"
      ],
      "Resource": "*"
    }
  ]
}
```

## Configure query history

1. Navigate to [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][3].
2. Click {{< ui >}}Configure{{< /ui >}} next to Amazon Athena.
3. Select an existing AWS account that is already connected to Datadog, or add a new one. For help adding a new account, see the [AWS integration documentation][1].
4. Enable the {{< ui >}}Athena query history{{< /ui >}} toggle.
5. Click {{< ui >}}Add AWS Region{{< /ui >}} and select a region.
6. (Optional) Enter workgroup names to monitor in that region:
   - **Leave the list empty** to discover and monitor all workgroups in the region, including workgroups created later.
   - **Enter one or more workgroup names** to monitor only those workgroups.

   Datadog does not check workgroup names with AWS during setup, so make sure each name matches an existing workgroup.
7. Repeat steps 5 and 6 for each additional region.

   {{< img src="data_observability/amazon_athena/query-history-configuration.png" alt="Amazon Athena configuration with query history enabled, a region selected, and the required IAM permissions" style="width:100%;" >}}

8. Click {{< ui >}}Save{{< /ui >}}.

To stop monitoring a region, remove it from the configuration. To stop monitoring all regions, disable the {{< ui >}}Athena query history{{< /ui >}} toggle.

## How query history is collected

- Datadog syncs query history hourly for each configured workgroup.
- The first sync collects queries submitted in the previous 24 hours. Datadog does not backfill older queries.
- Datadog collects queries that reach a final state: succeeded, failed, or canceled. A query that is still queued or running is collected after it finishes.

Collected queries can take longer than an hour to appear, depending on when they finish relative to the sync schedule.

### Collected data

For each query, Datadog collects:

- The SQL text, statement type, catalog, and database.
- The workgroup, AWS region, and Athena engine version.
- The final state and, for failed queries, the error category and type.
- Timing statistics, including total, queue, planning, and engine execution time.
- Data scanned and, for capacity reservation queries, the DPU count.
- Whether Athena reused a previous query result.

## Cost estimates

Datadog classifies each query by how Athena billed its compute:

| Billing mode | Description |
|--------------|-------------|
| On-demand | Athena billed the query based on data scanned. |
| Capacity reservation | The query ran on provisioned capacity. |
| Unknown | Athena did not return enough information to classify the query. |

Based on the billing mode, Datadog reports two cost measures:

- **Estimated on-demand cost**: The estimated compute charge for queries billed on demand. This measure is not reported for capacity reservation queries, because the reservation cost is not attributable to an individual query.
- **On-demand equivalent**: What the query would cost under on-demand pricing based on data scanned. This measure is reported for both on-demand and capacity reservation queries. Use it to compare workloads or evaluate whether a workgroup is a good fit for capacity reservations. It does not represent actual spend.

Both measures cover Athena query compute only. They exclude reserved capacity fees, Amazon S3 storage and requests, data transfer, AWS Glue Data Catalog charges, federated connector charges, and any discounts, credits, or negotiated rates.

## Lineage

Datadog parses the SQL text of collected queries to build lineage between the AWS Glue tables that each query reads and writes. Queries against the default `AwsDataCatalog` catalog link to the corresponding tables from the [AWS Glue integration][2]. For more information, see [Lineage][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon-web-services/
[2]: /data_observability/quality_monitoring/data_lakes/aws_glue/
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: /data_observability/lineage/
