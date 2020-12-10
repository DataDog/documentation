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

## Create an enrichment table

{{< tabs >}}
{{% tab "Manual upload" %}}

Click **New Enrichment Table +**, then upload a CSV file, name the appropriate columns, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Create an Enrichment Table" style="width:100%;">}}
{{% /tab %}}

{{% tab "AWS S3 upload" %}}

Enrichment tables can automatically pull a CSV file from an AWS S3 bucket to keep your data up to date. The integration looks for changes to the CSV file in S3, and when the file is updated it replaces the enrichment table with the new data. This also enables API updating with the S3 API once the initial enrichment table is configured.

To update enrichment tables from S3, Datadog uses the IAM role in your AWS account that you configured for the [AWS integration][1]. If you have not yet created that role, [follow these steps][2] to do so. To allow that role to update your enrichment tables, add the following permission statement to its IAM policies. Be sure to edit the bucket names to match your environment.


```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
				"arn:aws:s3:::<MY_BUCKET_NAME_2>"
			]
		}
	],
	"Version": "2012-10-17"
}
```
### Define the table

Click **New Enrichment Table +**, then add a name, select AWS S3, fill out all fields, click import, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-s3-enrichment-table.png" alt="Create an Enrichment Table" style="width:100%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

This enrichment table can now be used to add additional attributes to logs with the [Lookup Processor][1].

## Modify an enrichment table

To modify an existing enrichment table with new data, select a table then click **Update Data +** in the top right corner. The selected CSV is upserted into the table, meaning that all existing rows with the same primary key are updated, and all new rows are added. Once the table is saved, the upserted rows are processed asynchronously and updated in the preview. It may take up to 10 minutes for the updated rows to appear in affected logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/?tab=ui#lookup-processor
