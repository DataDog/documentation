---
title: Add Custom Metadata to Logs with Reference Tables
kind: guide
beta: true
aliases:
  - /logs/guide/enrichment-tables/
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

<div class="alert alert-warning">
The Reference Tables feature is currently in public beta. There are no billing implications for defining and querying Reference Tables. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
During the beta, there is a limit of 100 Reference Tables per account.
</div>

## Overview

Define new entities in Datadog like customer details, service names and information, or IP addresses by uploading a CSV file containing a table of information. This is represented by a primary key in an Reference Table and the associated metadata. This data can be applied as tags to logs at ingest time in the [Lookup Processor][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Reference Tables" style="width:100%;">}}

## Create a Reference Table

{{< tabs >}}
{{% tab "Manual upload" %}}

Click **New Reference Table +**, then upload a CSV file, name the appropriate columns, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Create an Reference Table" style="width:100%;">}}

**Note**: The manual CSV upload method supports files up to 4MB.

{{% /tab %}}

{{% tab "AWS S3 upload" %}}

Reference Tables can automatically pull a CSV file from an AWS S3 bucket to keep your data up to date. The integration looks for changes to the CSV file in S3, and when the file is updated it replaces the Reference Table with the new data. This also enables API updating with the S3 API once the initial Reference Table is configured.

To update Reference Tables from S3, Datadog uses the IAM role in your AWS account that you configured for the [AWS integration][1]. If you have not yet created that role, [follow these steps][2] to do so. To allow that role to update your Reference Tables, add the following permission statement to its IAM policies. Be sure to edit the bucket names to match your environment.


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

Click **New Reference Table +**, then add a name, select AWS S3, fill out all fields, click import, and define the primary key for lookups.

{{< img src="logs/guide/enrichment-tables/configure-s3-reference-table.png" alt="Create an Reference Table" style="width:100%;">}}

**Note**: The upload from an S3 bucket method supports files up to 200MB.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

This Reference Table can be used to add additional attributes to logs with the [Lookup Processor][1].

## Modify a Reference Table

To modify an existing Reference Table with new data, select a table then click **Update Data +** in the top right corner.
The selected CSV is upserted into the table, meaning that:

* All existing rows with the same primary key are updated
* All new rows are added
* All old rows that are not in the new file are deleted
 
Once the table is saved, the upserted rows are processed asynchronously and updated in the preview. It may take up to 10 minutes for the update to complete. 

## Delete a Reference Table

To delete a Reference Table, select a table, click the gear icon in the top right corner, and then click **Delete Table**.
The table and all associated rows is deleted.

If there is a Lookup Processor using a Reference Table for Log enrichment, then the enrichment stops. It may take up to 10 minutes for the enrichment to stop.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/#lookup-processor
