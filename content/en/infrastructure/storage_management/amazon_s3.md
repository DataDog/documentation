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

{{< tabs >}}
{{% tab "Set up Inventory from Datadog" %}}

The fastest way to configure Storage Management is through the [Enable Buckets][501] page, where you can enable S3 inventory and configure monitoring for multiple buckets at once.

As an alternative, you can set up S3 inventory manually or with Terraform and enable Storage Management using your existing setup. For details, see [Existing S3 Inventory][506].

{{< img src="infrastructure/storage_management/add-bucket.png" alt="Select buckets for enabling Storage Monitoring" responsive="true">}}

{{% collapse-content title="1. Enable Amazon S3 Integration and Resource collection for all the AWS accounts you want to monitor" level="h4" expanded=false id="set-up-inventory-from-datadog-step1" %}}

Ensure all S3-related permissions are granted for [Resource Collection][509].

[509]: /integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Enable S3 Inventory to get prefix-level monitoring" level="h4" expanded=false id="set-up-inventory-from-datadog-step2" %}}

  <div class="alert alert-info">
    - Source bucket: The S3 bucket you want to monitor with Storage Management <br>
    - Destination bucket: Used to store inventory reports (one per AWS region, can be reused cross-account)
  </div>


   1. Add all S3 permissions required for Storage Management to your Datadog IAM policy. Storage Management relies on permissions in [AWS Integration IAM policy and Resource Collection IAM policy][508] to bring together bucket details. In addition, the following 3 permissions allows Datadog to enable S3 inventory on your source buckets and read the generated reports from the destination buckets.
      - `s3:PutInventoryConfiguration`
      - `s3:GetObject` (scoped to the destination bucket(s))
      - `s3:ListBucket` (scoped to the destination bucket(s))

      Example IAM policy with all required permissions for Storage Management:
        ```json
              {
                "Version": "2012-10-17",
                "Statement": [

                  {
                    "Sid": "DatadogS3BucketInfo",
                    "Effect": "Allow",
                    "Action": [
                      "s3:ListAllMyBuckets",
                      "s3:GetAccelerateConfiguration",
                      "s3:GetAnalyticsConfiguration",
                      "s3:GetBucket*",
                      "s3:GetEncryptionConfiguration",
                      "s3:GetInventoryConfiguration",
                      "s3:GetLifecycleConfiguration",
                      "s3:GetMetricsConfiguration",
                      "s3:GetReplicationConfiguration",
                      "s3:ListBucket",
                      "s3:GetBucketLocation",
                      "s3:GetBucketLogging",
                      "s3:GetBucketTagging",
                      "s3:PutInventoryConfiguration"
                    ],
                    "Resource": "*"
                  },
                  {
                    "Sid": "DatadogReadInventoryFromDestinationBucket",
                    "Effect": "Allow",
                    "Action": [
                      "s3:ListBucket",
                      "s3:GetObject"
                    ],
                    "Resource": [
                      "arn:aws:s3:::storage-management-inventory-destination",
                      "arn:aws:s3:::storage-management-inventory-destination/*"
                    ]
                  }
                ]
              }
        ```

   2. On the **Enable it for me** tab, select the regions or accounts you want to enable and assign a destination bucket per region or per account to store S3 Inventory reports. You can either use an existing bucket or create one in AWS.

      <div class="alert alert-info"><ul><li>If you select a destination bucket containing inventories from multiple source buckets, all of those source buckets become enabled for monitoring.</li><li>The destination buckets must allow the source buckets to write inventory data. See <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html#configure-inventory-destination-bucket-policy">Creating a destination bucket policy</a> in the AWS documentation for details.</li></ul></div>

       {{< img src="integrations/guide/storage_monitoring/enable-inventory.png" alt="Select buckets for enabling Storage Monitoring" responsive="true">}}

   3. Complete the inventory configuration in Datadog. The first inventory report may take up to 24 hours to generate.

   4. Navigate to **S3** > **Destination bucket** > **Permissions** > **Bucket policy**. Add or update the bucket policy on the destination bucket to allow the S3 service (`s3.amazonaws.com`) to write inventory objects from the source bucket(s). 

      Use the following example bucket policy to allow S3 to write inventory files to your destination bucket. Replace `<DESTINATION_BUCKET>`, `<DESTINATION_PREFIX>` (optional), and `<ACCOUNT_ID>` with your actual bucket name, bucket prefix, and AWS account ID. 

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

[508]: /integrations/amazon-web-services/#aws-iam-permissions
{{% /collapse-content %}}

{{% collapse-content title="3. Enable S3 Access Logs for prefix-level request and latency metrics" level="h4" expanded=false id="set-up-inventory-from-datadog-step3" %}}

To get prefix-level access metrics including request counts, server-side latency, and cold data identification for cost optimization, follow these additional steps:

   1. **Set up the Datadog Lambda Forwarder** (if not already configured):
      - Follow the [Datadog Forwarder installation instructions][503] to deploy the Datadog Lambda function in your AWS account
      - This Lambda function collects and forwards your S3 access logs to Datadog

   2. **Configure S3 Access Logs** for each source bucket:
      - Go to your S3 bucket properties in the AWS Console
      - Navigate to **Server access logging**
      - Enable logging and specify your destination bucket (for simplicity, you can use the destination bucket for your inventory files)
      - Set the target prefix to `access-logs/` to organize log files separately from inventory data

   3. **Set up the Lambda trigger**:

      **Option A: Automatic (Recommended)**
        - In the Datadog AWS integration page, navigate to the **[Log Collection][504]** tab
        - Enable automatic log collection for S3 by checking the S3 Access Logs checkbox
        - Datadog [automatically configures triggers][505] on your Forwarder Lambda function for S3 access logs

       **Option B: Manual**
        - In the AWS console, go to your Datadog Forwarder Lambda function
        - Click **Add trigger** and select **S3**
        - Select the bucket containing your access logs
        - Set the event type to **All object create events**
        - Set the prefix to `access-logs/` (matching your access log prefix)

       <div class="alert alert-info"> After sending, S3 Access Logs are also available in <a href="/logs/#explore">Datadog Log Management</a>. </div>

[503]: /logs/guide/forwarder/?tab=cloudformation
[504]: https://app.datadoghq.com/integrations/amazon-web-services
[505]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
{{% /collapse-content %}}

{{% collapse-content title="4. Return to the Storage Management page to see any new buckets" level="h4" expanded=false id="set-up-inventory-from-datadog-step4" %}}

The inventory generation process starts in AWS within 24 hours of the first report. Data from your buckets is visible after this period.

{{% /collapse-content %}}

[501]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[506]: /infrastructure/storage_management/amazon_s3/?tab=existings3inventory
[507]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}
{{% tab "CloudFormation" %}}

You can also set up Storage Management using the provided CloudFormation templates. This process involves two steps:

{{% collapse-content title="1. Configure inventory generation" level="h4" expanded=false id="cloudformation-setup-step1" %}}

This template configures your existing S3 bucket to generate inventory reports, which Datadog uses to generate detailed metrics about your bucket prefixes.

1. Download the [source-bucket-inventory-cfn.yaml][101] template.
2. In [AWS CloudFormation][102], click **Create stack** in the top right corner and select **With existing resources (import resources)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `source-bucket-inventory-cfn.yaml` file, then click **Next**.
5. Enter the bucket name you want AWS to start generating inventories for, and click **Next**.

 {{< img src="infrastructure/storage_management/identify_resources.png" alt="Identify S3 resources to start generating inventory" responsive="true" style="width:90%;" >}}

6. Fill in the required parameters:
   - **DestinationBucketName**: The bucket for storing inventory files. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
   - **SourceBucketName**: The bucket you want to monitor and start generating inventory files for

   Optional parameters:
   - **SourceBucketPrefix**: (Optional) Limit monitoring to a specific path in the source bucket
   - **DestinationBucketPrefix**: Specific path within the destination bucket. Ensure this path doesn't include trailing slashes (`/`)

{{< img src="infrastructure/storage_management/specify_stack_details.png" alt="Specify stack details" responsive="true" style="width:90%;" >}}

7. Click **Next**.
8. Wait for AWS to locate your source bucket, and click **Import resources** in the bottom right corner.

**Notes**:
   - This CloudFormation template can be rolled back, but rolling back doesn't delete the created resources. This is to ensure the existing bucket doesn't get deleted. You can manually delete the inventory configurations by going on the **Management** tab in the bucket view.
   - Review [Amazon S3 pricing][106] for costs related to inventory generation.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[106]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="2. Configure required permissions" level="h4" expanded=false id="cloudformation-setup-step2" %}}

This template creates two IAM policies:
  - A policy to allow Datadog to read inventory files from the destination bucket
  - A policy to allow your source bucket to write inventory files to the destination bucket

1. Download the [cloud-inventory-policies-cfn.yaml][103] template.
2. In [AWS CloudFormation][104], click **Create stack** in the top right corner and select **With new resources (standard)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `cloud-inventory-policies-cfn.yaml` file, then click **Next**.
5. Fill in the required parameters:
   - **DatadogIntegrationRole**: Your Datadog AWS integration role name
   - **DestinationBucketName**: The name of the bucket that receives your inventory files. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
   - **SourceBucketName**: The name of the bucket you want to start generating inventory files for

   Optional parameters:
   - **SourceBucketPrefix**: This parameter limits the inventory generation to a specific prefix in the source bucket
   - **DestinationBucketPrefix**: If you want to reuse an existing bucket as the destination, this parameter allows the inventory files to be shipped to a specific prefix in that bucket. Ensure that any prefixes do not include trailing slashes (`/`)

    {{< img src="infrastructure/storage_management/bucket_policy_stack_details.png" alt="Stack parameters for bucket policy" responsive="true" style="width:90%;" >}}

6. On the **Review and create** step, verify the parameters have been entered correctly, and click **Submit**.

### Finish setting up S3 buckets for Storage Management
  After completing the CloudFormation setup, enable buckets for Storage Management from the Datadog UI:
  - Navigate to **Storage Management** → [Enable Buckets][105].
  - In step 2, under **Enable S3 Inventory to get prefix level monitoring**, select **I enabled it myself**.
  - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**.

{{< img src="infrastructure/storage_management/enable-it-for-me.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Use the official [Datadog Storage Management Terraform module][401] to configure S3 Inventory and forward S3 Access logs for Storage Management. This module configures all required permissions on the AWS Integration IAM role, adds a bucket policy to allow Datadog to read inventory files from the destination bucket path, and enables S3 Access Log collection if you already have a Forwarder set up.

To use this example:
   - Replace `<AWS_REGION>` with your AWS region.
   - Replace `<MODULE_NAME>` with a unique name for this module instance.
   - Replace `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` with the name of your Datadog AWS Integration IAM role.
   - Replace `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, etc. with the names of the buckets to be monitored.
   - Replace `<DESTINATION_BUCKET_NAME>` with the name of the bucket that receives your inventory files.
   - Replace `<DATADOG_FORWARDER_FUNCTION_NAME>` with the name of your Datadog Forwarder Lambda function (only required if enabling access logs).

For more options, see the [module documentation][401].

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure via environment variables:
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

  # Optional: Enable S3 Access Logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

After inventories are being generated (can take up to 24 hours), verify Storage Management is enabled on your buckets by navigating to **Storage Management** > [**Enable Buckets**][402] > **Use existing inventories** and confirming your destination bucket is listed and enabled.

[401]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[402]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3

{{% /tab %}}

{{% tab "AWS Console" %}}

To manually set up the required [Amazon S3 Inventory][206] and related configuration, follow these steps:

{{% collapse-content title="1. Create a destination bucket" level="h4" expanded=false id="aws-console-setup-step1" %}}

1. [Create an S3 bucket][201] to store your inventory files. This bucket acts as the central location for inventory reports.
   **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
2. Create a prefix within the destination bucket (optional).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configure the bucket and integration role policies" level="h4" expanded=false id="aws-console-setup-step2" %}}

1. Ensure the Datadog AWS integration role has `s3:GetObject` and `s3:ListBucket` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

2. Ensure the destination bucket policy allows S3 to write inventory files to your destination bucket. 

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

{{% collapse-content title="3. Configure inventory generation" level="h4" expanded=false id="aws-console-setup-step3" %}}

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

      **Note**: If you want to use a prefix on the destination bucket, add this as well
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

### Post-setup steps

  After the inventory configuration is set up and your inventory files begin appearing in the destination bucket, enable buckets for Storage Management from the Datadog UI:
  - Navigate to **Storage Management** → [Enable Buckets][205].
  - In Step 2, under **Enable S3 Inventory to get prefix level monitoring**, select **I enabled it myself**.
  - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**.

   **Note**: If you don't see a list of your existing destination buckets under **I enabled it myself**, you need to provide required S3 permissions as part of [AWS Resource Collection][207].

{{< img src="infrastructure/storage_management/enabled-it-myself.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[205]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
[207]: /integrations/amazon-web-services/#resource-collection
{{% /tab %}}

{{% tab "Existing S3 Inventory" %}}

  If you have already configured S3 Inventory for the buckets you want to monitor, enable buckets for Storage Monitoring from the Datadog UI.

  **Note**: Storage Management only supports CSV format for inventories.

  1. Navigate to **Storage Management** > [**Enable Buckets**][603].
  2. In Step 2, under **Enable S3 Inventory to get prefix level monitoring**, select **I enabled it myself**.
  3. Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**.

**Note**: If you don't see a list of your existing destination buckets under **I enabled it myself**, you need to provide required S3 permissions as part of [AWS Resource Collection][604].

{{< img src="infrastructure/storage_management/enabled-it-myself.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[601]: https://forms.gle/dhDbSxTvCUDXg1QR7
[602]: mailto:storage-monitoring@datadoghq.com
[603]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[604]: /integrations/amazon-web-services/#resource-collection
{{% /tab %}}

{{< /tabs >}}

### Validation

To verify your setup:
1. Wait for the first inventory report to generate (up to 24 hours for daily inventories).
2. Navigate to **Infrastructure** > [**Storage Management**][3] to see if the bucket(s) you configured are showing in the explorer list when "Monitored buckets" is selected.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Validate bucket is enabled for monitoring" responsive="true">}}

### Best practices

Follow these best practices to optimize Storage Management set up:
   - **Configure lifecycle policies for inventory destination buckets**: S3 Inventory reports are generated daily and stored in your destination bucket. To prevent old inventory files from accumulating and incurring storage costs, add a lifecycle policy to automatically delete inventory reports older than 3 days.
   
   - **Configure lifecycle policies for S3 access logs**: If you have enabled S3 Access Logs for prefix-level request metrics, the raw log files accumulate in your destination bucket. After these logs are forwarded to Datadog, the raw files are no longer needed for Storage Management purposes. To automatically delete access log files after forwarding to Datadog, add a lifecycle rule. **Note**: Before enabling automatic deletion, verify that there are no compliance or audit requirements in your organization that mandate retaining raw S3 access logs for a specific period.

### Troubleshooting

If you don't see data for buckets you set up for Storage Management:
   - Check **Storage Management** > **Amazon S3** > [**Enable Buckets**][6] for any errors:
        
      - **IAM Role(s) Lacking Permissions**: Ensure `s3:GetObject` and `s3:ListBucket` permissions for the destination buckets are set on the Datadog AWS Integration Role. Verify all S3-related permissions are granted as part of [Resource Collection][2].
        
      - **Problem reading inventory**: Ensure the destination bucket policy allows S3 to write inventory files. See [Example Bucket Policy][5]. **Note**: This error may also appear if the first inventory file has not yet been generated (takes up to 24 hours) or if the buckets you are enabling are empty.
      
   - If you're still encountering issues, [contact Datadog][1].

## Visualize granular S3 usage with inventory metrics

| Metric Name                                            | Notable Tags                                                                                  | Description                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Total amount of data, in bytes, stored in a prefix.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Average object size, in bytes, for objects in a prefix.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | The total number of objects stored in a prefix.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Object counts aggregated to hierarchical prefix levels, used for treemap visualizations.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Prefix size aggregated to hierarchical prefix levels, used for treemap visualizations.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Age, in days, of the oldest object in the bucket or prefix.                                                                                    |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Total number of requests for objects in a prefix, optionally split by request method (for example, GET or PUT). Requires S3 Access Logs in Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Server response time for requests in a prefix, optionally split by request method. Requires S3 Access Logs in Datadog.                          |

  *`prefixN` refers to prefix levels such as `prefix0`, `prefix1`, `prefix2`, and so on.

  **Note:** For the most accurate monitoring and visualization, ensure that S3 inventory reports use the CSV format and include all object versions if you wish to view non-current object recommendations or metrics. 


## Act on optimizations with Storage Management Recommendations

Storage Management generated recommendations are available in [Cloud Cost Recommendations][4]. Storage Management generates recommendations to reduce your S3 costs with granular details, like which prefixes you can optimize, by combining observability data with access logs. In order to see these recommendations, you must enable Storage Management for S3 buckets and enable Cloud Cost Management to see the Recommendations.

Recommendations are run on a daily basis and are automatically refreshed in your account as soon as the recommendations are released.

### Prerequisites
Seeing recommendations requires the following prerequisites:
1. Ensure you've configured S3 buckets for Storage Management by following the steps above on this page.
2. If you would like to see recommendations for moving infrequently accessed data to cheaper tiers by prefix, enable and forward S3 Access Logs to Datadog (Datadog Log Management fees apply).
3. If you would like to see recommendations for identifying non-current versions in prefixes, ensure you're including "All versions" as part of the S3 inventory configuration.

### Available recommendations
- Transition S3 bucket prefix to Infrequent Access
- Expire old non-current version objects in S3 bucket prefix
- Consolidate small files in prefix to minimize per-object storage costs

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations in CCM" responsive="true">}}

[1]: mailto:storage-monitoring@datadoghq.com
[2]: /integrations/amazon-web-services/#resource-types-and-permissions
[3]: https://app.datadoghq.com/storage-monitoring
[4]: https://docs.datadoghq.com/cloud_cost_management/recommendations
[5]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-s3-inventory
[6]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
