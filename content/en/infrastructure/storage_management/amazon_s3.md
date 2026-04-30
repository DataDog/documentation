---
title: Storage Management for Amazon S3
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
---

## Setup

Set up Storage Management for Amazon S3 with one of the following methods:

- **Cloudformation**: A guided in-product setup that configures the AWS integration, enables S3 inventory on the buckets you select, and optionally enables S3 access logs. Setup launches a CloudFormation stack to apply changes in your AWS account.
- **Terraform**: Use the official Datadog Storage Management Terraform module to configure inventory and access logs as code.
- **Manual**: Set up S3 inventory and the required permissions yourself in the AWS console, then register the inventory destination with Storage Management.

{{< tabs >}}
{{% tab "Cloudformation" %}}

In-product setup walks you through three steps: configuring an AWS account, selecting buckets and enabling S3 inventory and access logs, and finishing setup. A CloudFormation stack applies the required changes in your AWS account.

To start, navigate to **Infrastructure** > [**Storage Management**][1] and click **Enable buckets**.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. Configure AWS account" level="h4" expanded=false id="datadog-ui-step1" %}}

In this step, set up the Datadog AWS integration with metric and resource collection enabled.

1. Choose whether to use an **existing AWS account** already integrated with Datadog or to **add a new account**.
   - For a new account, a CloudFormation stack creates the Datadog integration role and configures both metric and resource collection.
   - For an existing account, confirm that **metric collection** and **resource collection** are enabled. Storage Management uses resource collection to discover S3 buckets and their existing inventory configurations.
2. Select the AWS region you want to configure. One region is configured per run; repeat the steps for each additional region.

For a list of S3-related permissions used by resource collection, see [AWS Resource Collection][2].

[2]: /integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Configure Storage Management" level="h4" expanded=false id="datadog-ui-step2" %}}

In this step, select the buckets to monitor, set an inventory destination, and optionally enable access logs.

<div class="alert alert-info">
    - Source bucket: The S3 bucket you want to monitor with Storage Management. <br>
    - Destination bucket: The bucket that stores inventory reports (one per AWS region, can be reused cross-account).
</div>

1. **Select buckets**: Choose the S3 buckets you want to monitor with Storage Management. Buckets already enabled for Storage Management are hidden. Buckets with existing S3 inventory are pre-selected and keep their current destination.

2. **Set the inventory destination bucket**: For buckets without an existing inventory configuration, choose a destination bucket where daily inventory reports are delivered. You can pick an existing bucket or specify a new one. Datadog writes inventory files to the `datadog-inventories` prefix.

   **Note**: Storage Management supports CSV inventory format only.

3. **Enable S3 access logs (optional)**: Access logs surface cold data patterns, unusual access, and right-sizing opportunities for storage tiers. Toggle **Enable S3 access logs**, then:

   - Select a destination bucket for access logs. You can use the same bucket as the inventory destination.
   - If a Datadog Log Forwarder is detected in the account, it is reused. Otherwise, the CloudFormation stack deploys a new forwarder.
   - Forwarded access logs can be ingested without indexing if used only for Storage Management. See [exclusion filters][3] for details.

   <div class="alert alert-warning">Forwarding S3 access logs to Datadog incurs Log Management ingestion costs. To minimize costs, use exclusion filters so logs are ingested but not indexed if used only for Storage Management. For details, see <a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management pricing</a>.</div>

4. Click **Launch CloudFormation Template**. An AWS Quick Create stack opens, pre-filled with the bucket mappings, destination prefix, integration role name, and Datadog API key, application key, and log forwarder parameters.

5. In AWS, review the stack parameters and create the stack. The stack:

   - Enables daily S3 inventory on each selected source bucket.
   - Adds IAM permissions for Storage Management to read the S3 inventory reports from the destination buckets.
   - Adds the bucket policy to the inventory destination bucket so S3 can write inventory objects.
   - Enables S3 server access logging on selected buckets (if access logs are enabled).
   - Deploys a Datadog Log Forwarder Lambda function (if access logs are enabled and no forwarder exists).

[3]: /logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. Finish setup" level="h4" expanded=false id="datadog-ui-step3" %}}

After the CloudFormation stack completes in AWS, return to Datadog and confirm setup.

The first inventory report can take up to 24 hours to generate. After that, your buckets appear in **Infrastructure** > [**Storage Management**][1].

[1]: https://app.datadoghq.com/storage-management
{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Use the official [Datadog Storage Management Terraform module][1] to configure S3 inventory and forward S3 access logs. The module configures the required permissions on the AWS integration IAM role, adds a bucket policy to allow Datadog to read inventory files from the destination bucket path, and enables S3 access log collection if a Datadog Log Forwarder is already set up.

To use the example below:
- Replace `<AWS_REGION>` with your AWS region.
- Replace `<MODULE_NAME>` with a unique name for this module instance.
- Replace `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` with the name of your Datadog AWS integration IAM role.
- Replace `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, and so on with the names of the buckets to monitor.
- Replace `<DESTINATION_BUCKET_NAME>` with the name of the bucket that receives your inventory files.
- Replace `<DATADOG_FORWARDER_FUNCTION_NAME>` with the name of your Datadog Forwarder Lambda function (only required if enabling access logs).

For more options, see the [module documentation][1].

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure with environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

After enabling S3 inventory, it can take up to 24 hours for the first inventory reports to be generated. To check that inventories are being created, go to the AWS console, navigate to your destination bucket, and confirm that inventory files appear in the destination prefix you specified during setup.

After you confirm inventory files are present, verify Storage Management is enabled on your buckets by navigating to **Storage Management** > [**Enable Buckets**][2] and confirming that your destination bucket is listed and enabled.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3

{{% /tab %}}

{{% tab "Manual" %}}

To manually set up the required [Amazon S3 Inventory][206] and related configuration, follow these steps:

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. Create a destination bucket" level="h4" expanded=false id="manual-setup-step1" %}}

1. [Create an S3 bucket][201] to store your inventory files. This bucket acts as the central location for inventory reports.
   **Note**: Use only one destination bucket for all inventory files generated in an AWS account.
2. Create a prefix within the destination bucket (optional).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configure the bucket and integration role policies" level="h4" expanded=false id="manual-setup-step2" %}}

1. Confirm the Datadog AWS integration role has `s3:GetObject` and `s3:ListBucket` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

2. Confirm the destination bucket policy allows S3 to write inventory files to your destination bucket.

      Example bucket policy:
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. Follow the steps in the [Amazon S3 User Guide][202] to add a bucket policy to your destination bucket that allows Amazon S3 to write inventory objects (`s3:PutObject`) from your source bucket or buckets.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configure inventory generation" level="h4" expanded=false id="manual-setup-step3" %}}

For each bucket you want to monitor:
1. Go to the [Amazon S3 buckets page][203] in the AWS console, and select the bucket.
2. Navigate to the bucket's **Management** tab.
3. Click **Create inventory configuration**.
4. Configure the following settings:
   - Set a configuration name
   - (Optional) Specify a source bucket prefix
   - **Object versions**: Datadog recommends selecting **Include all versions** (required to see non-current version metrics)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}
   - **Destination**: Select the common destination bucket for inventory files in your AWS account. For example, if the bucket is named `destination-bucket`, enter `s3://your-destination-bucket`

      **Note**: To use a prefix on the destination bucket, add this as well.
   - **Frequency**: Datadog recommends choosing **Daily**. This setting determines how often your prefix-level metrics are updated in Datadog
   - **Output format**: CSV
   - **Status**: Enabled
   - **Server-side encryption**: Don't specify an encryption key
   - Select all the available **Additional metadata fields**. Minimally, the following fields are required:

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Additional metadata fields. Size, Last modified, Multipart upload, Replication status, Encryption, Object ACL, Storage class, Intelligent-Tiering: Access tier, ETag, and Checksum function are all selected. Bucket key status, Object owner, and All Object Lock configurations are unselected." responsive="true">}}

**Note**: Review [Amazon S3 pricing][204] for costs related to inventory generation.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. Enable S3 access logs (optional)" level="h4" expanded=false id="manual-setup-step4" %}}

To get prefix-level access metrics including request counts, server-side latency, and cold data identification, enable S3 server access logging on your source buckets and forward those logs to Datadog. For step-by-step instructions, see [Enable S3 access logs][208] in the Amazon S3 integration documentation.

<div class="alert alert-warning">Forwarding S3 access logs to Datadog incurs Log Management ingestion costs. To minimize costs, use exclusion filters so logs are ingested but not indexed if used only for Storage Management. For details, see <a href="https://www.datadoghq.com/pricing/?product=log-management">Datadog Log Management pricing</a>.</div>

[208]: /integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### Post-setup steps

After inventory files begin appearing in the destination bucket, enable Storage Management for that destination bucket by calling the following endpoint:

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/vnd.api+json" \
  -H "Content-Type: application/vnd.api+json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "aws",
      "type": "cloud_provider",
      "attributes": {
        "aws": {
          "aws_account_id": "123456789012",
          "destination_bucket_name": "my-inventory-bucket",
          "destination_bucket_region": "us-east-1",
          "destination_prefix": ""
        }
      }
    }
  }'
```

Replace the request body values with:
- `aws_account_id`: The 12-digit AWS account ID that owns the destination bucket.
- `destination_bucket_name`: The name of the destination bucket holding inventory reports.
- `destination_bucket_region`: The AWS region of the destination bucket.
- `destination_prefix`: The prefix within the destination bucket where inventory files are written. Use an empty string if there is no prefix.

A `200` response confirms Storage Management is enabled for the destination bucket.

{{% /tab %}}

{{< /tabs >}}

### Validation

To verify your setup:
1. Wait for the first inventory report to generate (up to 24 hours for daily inventories).
2. Navigate to **Infrastructure** > [**Storage Management**][3] to see if the buckets you configured appear in the explorer list when **Monitored buckets** is selected.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Validate bucket is enabled for monitoring" responsive="true">}}

### Best practices

Follow these best practices to optimize Storage Management setup:
- **Configure lifecycle policies for inventory destination buckets**: S3 inventory reports are generated daily and stored in your destination bucket. To prevent old inventory files from accumulating and incurring storage costs, add a lifecycle policy to automatically delete inventory reports older than three days.

- **Configure lifecycle policies for S3 access logs**: If you have enabled S3 access logs for prefix-level request metrics, the raw log files accumulate in your destination bucket. After these logs are forwarded to Datadog, the raw files are no longer needed for Storage Management purposes. To automatically delete access log files after forwarding to Datadog, add a lifecycle rule.

  **Note**: Before enabling automatic deletion, verify that there are no compliance or audit requirements in your organization that mandate retaining raw S3 access logs for a specific period.

- **Create exclusion filters for S3 access logs**: If S3 access logs are forwarded to Datadog only for Storage Management and don't need to be indexed for search or analytics, add an [exclusion filter][10] to keep them out of indexed log volume.

[10]: /logs/log_configuration/indexes/#exclusion-filters

### Troubleshooting

If you don't see data for buckets you set up for Storage Management, use the [Storage Management Settings][9] page to view all configured buckets, their inventory status, and any configuration errors. The page surfaces issues with actionable remediation steps.
If you have any questions, [contact Datadog][1].

## Visualize granular S3 usage with inventory metrics

| Metric Name                                            | Notable Tags                                                                                  | Description                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Total amount of data, in bytes, stored in a prefix.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Average object size, in bytes, for objects in a prefix.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | The total number of objects stored in a prefix.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Object counts aggregated to hierarchical prefix levels, used for treemap visualizations.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Prefix size aggregated to hierarchical prefix levels, used for treemap visualizations.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Age, in days, of the oldest object in the bucket or prefix.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Total size, in bytes, of objects smaller than 128KB in a prefix. Helps identify overhead costs on storage tiers like Glacier and Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Number of objects smaller than 128KB in a prefix. Helps identify overhead costs on storage tiers like Glacier and Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Total number of requests for objects in a prefix, optionally split by request method (for example, GET or PUT). Requires S3 access logs in Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Server response time for requests in a prefix, optionally split by request method. Requires S3 access logs in Datadog.                          |

  *`prefixN` refers to prefix levels such as `prefix0`, `prefix1`, `prefix2`, and so on.

  **Note:** Use the right metric for the question you're answering:
  - `aws.s3.inventory.prefix_object_count` and `aws.s3.inventory.total_prefix_size` (with the `prefix` tag) include everything inside a folder and all its subfolders. Use these when you want the total count or size for a specific folder (for example, "how much is in `logs/2024/`?").
  - `aws.s3.inventory.prefix_object_count.levels` and `aws.s3.inventory.total_prefix_size.levels` (with `prefix1`, `prefix2`, `prefix3`, and so on) count or size objects only at that exact depth. Use these when you want to build a treemap or compare folder sizes across levels (for example, "which top-level folders are the biggest?").

  **Note:** For the most accurate monitoring and visualization, use CSV inventory format and include all object versions to see non-current object recommendations or metrics.

An out-of-the-box [Storage Management S3 dashboard template][8] is available to help you visualize these metrics. You can clone and customize it to fit your needs.

## Act on optimizations with Storage Management Recommendations

Storage Management analyzes your inventory data and access logs to surface prefix-level recommendations for reducing S3 storage costs. These recommendations are available to all Storage Management customers. Potential savings are estimated using AWS list prices. If you have [Cloud Cost Management][7] enabled, recommendations also appear in Cloud Cost Recommendations, and you can track actual savings from optimizations.

Recommendations are run on a daily basis and are automatically refreshed in your account as soon as the recommendations are released.

### Prerequisites
Seeing recommendations requires the following prerequisites:
1. Configure S3 buckets for Storage Management by following the steps above on this page.
2. To see recommendations for moving infrequently accessed data to cheaper tiers by prefix, enable and forward S3 access logs to Datadog (Datadog Log Management fees apply).
3. To see recommendations for identifying non-current versions in prefixes, include "All versions" as part of the S3 inventory configuration.

### Available recommendations
- Transition unaccessed S3 data in prefix to Infrequent Access
- Expire old non-current version objects in S3 bucket prefix
- Consolidate small files in prefix to minimize per-object storage costs

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations" responsive="true">}}

[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[7]: /cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
