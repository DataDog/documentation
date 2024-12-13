---
title: Storage Monitoring for Amazon S3
private: true
---

<div class="alert alert-info">Storage Monitoring is in Preview.</div>

## Overview

Storage Monitoring for Amazon S3 provides deep, prefix-level analytics to help you understand exactly how your storage is being used, detect potential issues before they impact operations, and make data-driven decisions about storage optimization. Use these insights to help you track storage growth, investigate access patterns, and optimize costs.

This guide explains how to configure Storage Monitoring in Datadog for your S3 buckets. You can set this up either manually or using the provided CloudFormation templates. Access your Storage Monitoring data by navigating to **Infrastructure -> Resource Catalog -> Monitoring -> S3 Buckets**. 

To learn more about the Resource Catalog, see the [Resource Catalog][2] documentation.

## Setup

### Installation

{{< tabs >}}
{{% tab "CloudFormation" %}}

The fastest way to set up Storage Monitoring is using the provided CloudFormation templates. This process involves two steps:

#### Step 1: Configure inventory generation


This template configures your existing S3 bucket to generate inventory reports, which Datadog uses to generate detailed metrics about your bucket prefixes.

1. Download the [source-bucket-inventory-cfn.yaml][101] template.
2. In [AWS CloudFormation][102], click **Create stack** in the top right corner and select **With existing resources (import resources)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `source-bucket-inventory-cfn.yaml` file, then click **Next**.
5. Enter the bucket name you want AWS to start generating inventories for, and click **Next**.

 {{< img src="integrations/guide/storage_monitoring/identify_resources.png" alt="Identify S3 resources to start generating inventory" responsive="true" style="width:90%;" >}}

6. Fill in the required parameters:
   - **DestinationBucketName**: The bucket for storing inventory files. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
   - **SourceBucketName**: The bucket you want to monitor and start generating inventory files for
   - **DestinationBucketPrefix**: Specific path within the destination bucket. Ensure this path doesn't include trailing slashes (`/`)

   Optional parameters:
   - **SourceBucketPrefix**: (Optional) Limit monitoring to a specific path in the source bucket

{{< img src="integrations/guide/storage_monitoring/specify_stack_details.png" alt="Specify stack details" responsive="true" style="width:90%;" >}}

7. Click **Next**.
8. Wait for AWS to locate your source bucket, and click **Import resources** in the bottom right corner.

**Note:** This CloudFormation template can be rolled back, but rolling back doesn't delete the created resources. This is to ensure the existing bucket doesn't get deleted. You can manually delete the inventory configurations by going on the **Management** tab in the bucket view.

**Note:** Review [Amazon S3 pricing][106] for costs related to inventory generation.
#### Step 2: Configure required permissions

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
   - **DestinationBucketPrefix**: If you want to reuse an existing bucket as the destination, this parameter allows the inventory files to be shipped to a specific prefix in that bucket. Ensure that any prefixes do not include trailing slashes (`/`)

   Optional parameters:
   - **SourceBucketPrefix**: This parameter limits the inventory generation to a specific prefix in the source bucket

{{< img src="integrations/guide/storage_monitoring/bucket_policy_stack_details.png" alt="Stack parameters for bucket policy" responsive="true" style="width:90%;" >}}

6. On the **Review and create** step, verify the parameters have been entered correctly, and click **Submit**.

#### Post-setup steps

After completing the CloudFormation setup, [reach out][105] with the following information:
1. Name of the destination bucket holding the inventory files.
2. Prefix where the files are stored in the destination bucket.
3. Name of the source bucket you want to monitor (the bucket producing inventory files).
4. AWS region of the destination bucket holding the inventory files.
5. AWS account ID containing the buckets.
6. Datadog org ID.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: mailto:storage-monitoring@datadoghq.com
[106]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "AWS Console" %}}

To manually set up the required [Amazon S3 Inventory][206] and related configuration, follow these steps:

#### Step 1: Create a destination bucket

1. [Create an S3 bucket][201] to store your inventory files. This bucket acts as the central location for inventory reports. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
2. Create a prefix within the destination bucket.

#### Step 2: Configure the bucket and integration role policies

1. Follow the steps in the [Amazon S3 user guide][202] to add a bucket policy to your destination bucket allowing write access (`s3:PutObject`) from your source buckets.

2. Ensure the Datadog AWS integration role has `s3:GetObject` and `s3:ListObjects` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

#### Step 3: Configure Inventory generation

For each bucket you want to monitor:
1. Go to the [Amazon S3 buckets page][203] in the AWS console, and select the bucket.
2. Navigate to the bucket's **Management** tab.
3. Click **Create inventory configuration**.
4. Configure the following settings:
  - Set a configuration name
  - (Optional) Specify a source bucket prefix
  - **Object versions**: Datadog recommends selecting **Current Versions Only**
  - **Destination**: Select the common destination bucket for inventory files in your AWS account. For example, if the bucket is named `destination-bucket`, enter `s3://your-destination-bucket`
  **Note**: If you want to use a prefix on the destination bucket, add this as well
  - **Frequency**: Datadog recommends choosing **Daily**. This setting determines how often your prefix-level metrics are updated in Datadog
  - **Output format**: CSV
  - **Status**: Enabled
  - **Server-side encryption**: Don't specify an encryption key
  - Select the following **Additional metadata fields**:
      1. Size
      2. Last Modified
      3. Storage Class

**Note**: Review [Amazon S3 pricing][204] for costs related to inventory generation.

#### Post-setup steps

After completing the above steps, [reach out][205] with the following information:

1. Name of the destination bucket where inventories are stored.
2. Prefix where the files are stored in the destination bucket.
3. Region of the destination bucket.
4. AWS account ID containing the bucket.
5. Datadog role name that has the permissions to read objects in destination bucket.
6. Datadog org ID.

[201]: https://console.aws.amazon.com/s3/bucket/create
[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
[205]: mailto:storage-monitoring@datadoghq.com
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}
{{< /tabs >}}

### Validation

To verify your setup:
   - Wait for the first inventory report to generate (up to 24 hours for daily inventories)
   - Check the destination bucket for inventory files
   - Confirm the Datadog integration can access the files:
       - Navigate to **Infrastructure -> Resource Catalog -> Monitoring -> S3 Buckets -> Installation Recommendations** to see if the bucket you configured is showing in the list


### Troubleshooting
If you encounter any issues or need assistance:
- Verify all permissions are correctly configured
- If you're still encountering issues, [reach out][1] with your bucket details, AWS account ID, and Datadog org ID

[1]: mailto:storage-monitoring@datadoghq.com
[2]: /infrastructure/resource_catalog/
