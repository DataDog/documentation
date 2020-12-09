---
title: Add Custom Metadata to Logs with Enrichment Tables
kind: guide
beta: true
further_reading:
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
---

<div class="alert alert-warning">
The Enrichment Tables feature is currently in private beta. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
</div>

## Overview

Define new entities in Datadog like customer details, service names and information, or IP addresses by uploading a CSV file containing a table of information. This is represented by a primary key in an Enrichment Table and the associated metadata. This data can be applied as tags to logs at ingest time in the [Lookup Processor][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Enrichment Tables" style="width:100%;">}}

## Create an Enrichment Table

{{< tabs >}}
{{% tab "Manual Upload" %}}

Create an Enrichment Table by uploading a CSV file, naming all the appropriate columns, and defining the primary key, on which all lookups will happen.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Create an Enrichment Table" style="width:100%;">}}
{{% /tab %}}

{{% tab "AWS S3 Upload" %}}

Enrichment tables can automatically pull a csv file from an AWS S3 bucket to keep your data up to date. The integration will look for changes to the csv file in S3 and when a new version is found it will replace the enrichment table with the new data. This also enables API updating via the S3 API once you’ve set up the initial table.

In order to update enrichment tables from S3, Datadog uses the IAM Role in your AWS account that you configured for your [AWS integration][2]. If you have not yet created that Role, [follow these steps][3] to do so. To allow that Role to update your enrichment tables, add the following permission statement to its IAM policies. Be sure to edit the bucket names and, if desired, specify the paths that contain your csv files.


```json
 {
      "Sid": "EnrichmentTablesS3",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
      ]
    },
    {
      "Sid": "EnrichmentTablesS3",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1>",
        "arn:aws:s3:::<MY_BUCKET_NAME_2>"
      ]
    }
  ]
}
```
{{% /tab %}}
{{< /tabs >}}

This Enrichment Table can now be used to add additional attributes to logs with the [Lookup Processor][1].

## Modify an Enrichment Table

In order to modify an existing Enrichment Table with new data, click the **Update Data +** button in the top right corner. The CSV that is selected will be upserted into the table, meaning that all existing rows with the same primary key will be updated, and all new rows will be added. Once the table is saved, the upserted rows will be processed asynchronously and will be updated in the preview. It may take up to 10 minutes for the updated rows to appear in affected logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/?tab=ui#lookup-processor
